import React from "react";
import ReactDOM from "react-dom";
import { observer } from "mobx-react-lite";
import { Grommet, Button, Grid, Text, Box, TextInput } from "grommet";
import { grommet } from "grommet/themes";
import store from "./store";
import Panel from "./components/Panel";
import Packages from "./components/Packages";
import Sites from "./components/Sites";

const App = observer(() => (
  <Grommet theme={grommet}>
    <Panel>
      <Text>GraphQL token</Text>
      <TextInput name="token" onChange={store.setToken} value={store.token} />
    </Panel>
    {store.token !== "" && (
      <>
        <Panel direction="row">
          <Grid
            rows={["fill", "auto"]}
            columns={["auto"]}
            areas={[
              { name: "row1", start: [0, 0], end: [0, 0] },
              { name: "row2", start: [0, 1], end: [0, 1] }
            ]}
            gap="small"
          >
            <Box gridArea="row1" direction="row" gap="small">
              <Button
                onClick={store.populate}
                label="Populate"
                disabled={store.busy}
              />
              <Button
                onClick={store.getWpPluginVersion}
                label="Get wp-plugin version"
                disabled={store.busy}
              />
              <Button
                onClick={store.getInjectors}
                label="Get injectors"
                disabled={store.busy}
              />
            </Box>
          </Grid>
        </Panel>
        <Panel>
          <Text>Status: {store.status}</Text>
        </Panel>
        <Packages />
        <Sites />
      </>
    )}
  </Grommet>
));

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
