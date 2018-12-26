import { flow } from "mobx-state-tree";
import request from "superagent";

const BATCH = 10;

export default self => ({
  getInjectors: flow(function*() {
    self.busy = true;
    for (let i = 0; i < self.sites.length; i += BATCH) {
      self.status = `getting injectors from site ${i + 1} to ${i +
        BATCH +
        1}...`;
      try {
        const results = yield Promise.all(
          self.sites.slice(i, i + BATCH).map(async site => {
            try {
              const result = await request(
                `https://frontity-cdn-cloud.now.sh/${site.url}`
              );
              return /window\['wp-pwa'\]=/.test(result.text)
                ? "found"
                : "not-found";
            } catch (error) {
              return Promise.resolve("not-found");
            }
          })
        );
        results.forEach((result, index) => {
          self.sites[i + index].injector = result;
        });
      } catch (error) {
        console.error(error);
      }
    }
    self.status = "Versions finished.";
    self.busy = false;
  }),
  getWpPluginVersion: flow(function*() {
    self.busy = true;
    for (let i = 0; i < self.sites.length; i += BATCH) {
      self.status = `getting versions from site ${i + 1} to ${i +
        BATCH +
        1}...`;
      try {
        const results = yield Promise.all(
          self.sites.slice(i, i + BATCH).map(async site => {
            try {
              const result = await request(
                `https://frontity-cdn-cloud.now.sh/${
                  site.url
                }?rest_route=/wp-pwa/v1/plugin-version`
              );
              return result.body.plugin_version;
            } catch (error) {
              return Promise.resolve("not-found");
            }
          })
        );
        results.forEach((result, index) => {
          self.sites[i + index].pluginVersion = result;
        });
      } catch (error) {
        console.error(error);
      }
    }
    self.status = "Versions finished.";
    self.busy = false;
  })
});
