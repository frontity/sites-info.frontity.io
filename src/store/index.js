import { types, onSnapshot } from "mobx-state-tree";
import { Lokka } from "lokka";
import { Transport } from "lokka-transport-http";
import { Site, Package } from "./graphql-models";
import populate from "./populate-actions";
import wpInfo from "./wp-info-actions";

const Store = types
  .model("Store", {
    sites: types.array(Site),
    packages: types.array(Package),
    busy: false,
    status: "not started",
    token: ""
  })
  .views(self => ({
    get graphql() {
      return self.token !== ""
        ? new Lokka({
            transport: new Transport(
              "https://api.graph.cool/simple/v1/frontity-v1",
              { headers: { Authorization: `Bearer ${self.token}` } }
            )
          })
        : null;
    }
  }))
  .actions(self => ({
    setToken: e => {
      self.token = e.target.value;
    }
  }))
  .actions(populate)
  .actions(wpInfo);

const store = Store.create({
  token: window.localStorage.getItem("token") || ""
});

onSnapshot(store, snapshot => {
  window.localStorage.setItem("token", snapshot.token);
});

export default store;
