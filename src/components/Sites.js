import React, { useState } from "react";
import { Heading, Text, Button, Box } from "grommet";
import { observer } from "mobx-react-lite";
import Panel from "./Panel";
import Item from "./Item";
import store from "../store";

const initialFilters = [
  { name: "only-demos", regexp: "^demo", field: "siteId", active: false },
  { name: "no-demos", regexp: "^(?!demo)", field: "siteId", active: false },
  {
    name: "only-plugin",
    regexp: "^1",
    field: "pluginVersion",
    active: false
  },
  {
    name: "only-injector",
    regexp: "^found",
    field: "injector",
    active: false
  },
  {
    name: "no-injector",
    regexp: "^not-found",
    field: "injector",
    active: false
  }
];

const Filter = ({ name, filters, toggleFilter }) => (
  <Button
    onClick={() => toggleFilter(name)}
    label={name}
    primary={filters.find(filter => filter.name === name).active}
  />
);

const Sites = observer(() => {
  const [filters, setFilters] = useState(initialFilters);
  const toggleFilter = name =>
    setFilters(
      filters.map(filter =>
        filter.name === name ? { ...filter, active: !filter.active } : filter
      )
    );
  const clearFilters = () =>
    setFilters(filters.map(filter => ({ ...filter, active: false })));
  return (
    <Panel>
      <Box gap="small">
        <Heading level={2}>
          Sites{" "}
          <Text>
            (total: {store.sites.length}, filtered:{" "}
            {
              store.sites.filter(site =>
                filters.reduce(
                  (prev, filter) =>
                    prev &&
                    !(
                      filter.active &&
                      !new RegExp(filter.regexp).test(site[filter.field])
                    ),
                  true
                )
              ).length
            }
            )
          </Text>
        </Heading>
        <Box gap="small">
          <Box direction="row" gap="small">
            <Button onClick={() => clearFilters()} label="Clear filters" />
          </Box>
          <Box direction="row" gap="small">
            <Filter
              name="no-demos"
              filters={filters}
              toggleFilter={toggleFilter}
            />
            <Filter
              name="only-demos"
              filters={filters}
              toggleFilter={toggleFilter}
            />
            <Filter
              name="only-plugin"
              filters={filters}
              toggleFilter={toggleFilter}
            />
            <Filter
              name="only-injector"
              filters={filters}
              toggleFilter={toggleFilter}
            />
            <Filter
              name="no-injector"
              filters={filters}
              toggleFilter={toggleFilter}
            />
          </Box>
        </Box>
        {store.sites.map(site =>
          filters.reduce(
            (prev, filter) =>
              prev &&
              !(
                filter.active &&
                !new RegExp(filter.regexp).test(site[filter.field])
              ),
            true
          ) ? (
            <Item key={site.id}>
              <Text>
                <strong>{site.url}</strong>: {site.siteId}
              </Text>
              {site.pluginVersion && (
                <Text>Plugin version: {site.pluginVersion}</Text>
              )}
              {site.injector !== "unknown" && (
                <Text>Injector: {site.injector}</Text>
              )}
            </Item>
          ) : null
        )}
      </Box>
    </Panel>
  );
});

export default Sites;
