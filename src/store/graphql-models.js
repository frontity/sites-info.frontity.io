import { types } from "mobx-state-tree";

export const Package = types.model("Package", {
  id: types.identifier,
  name: types.string,
  namespace: types.string
});

export const Setting = types.model("Setting", {
  id: types.identifier,
  active: types.boolean,
  package: types.reference(Package),
  site: types.reference(types.late(() => Site)),
  data: types.frozen()
});

export const User = types.model("User", {
  id: types.identifier,
  name: types.string,
  email: types.string,
  sites: types.array(types.reference(types.late(() => Site)))
});

export const Site = types.model("Site", {
  id: types.identifier,
  siteId: types.string,
  url: types.string,
  users: types.array(User),
  settings: types.array(Setting),
  pluginVersion: types.maybe(types.string),
  injector: types.optional(
    types.enumeration(["unknown", "found", "not-found"]),
    "unknown"
  )
});
