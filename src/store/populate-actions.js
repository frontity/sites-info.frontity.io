import { flow } from "mobx-state-tree";

export default self => ({
  populate: flow(function* populate() {
    self.busy = true;
    self.status = "populating packages...";
    yield self.populatePackages();
    self.status = "populating sites...";
    yield self.populateSites();
    self.status = "population finished";
    self.busy = false;
  }),
  populatePackages: flow(function* populate() {
    const { allPackages } = yield self.graphql.query(`{
        allPackages {
          id
          name
          namespace
        }
      }`);
    self.packages.replace(allPackages);
  }),
  populateSites: flow(function* populate() {
    const { allSites } = yield self.graphql.query(`{
        allSites {
          id
          siteId
          url
          users {
            id
            name
            email
          }
          settings {
            id
            active
            package {
              id
            }
            data
            site {
              id
            }
          }
        }
      }`);
    const sites = allSites.map(site => ({
      ...site,
      settings: site.settings.map(setting => {
        return {
          ...setting,
          package: setting.package.id,
          site: setting.site.id
        };
      })
    }));
    self.sites.replace(sites);
  })
});
