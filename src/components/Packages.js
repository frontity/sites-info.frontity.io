import React from 'react';
import { Heading, Text } from 'grommet';
import { observer } from 'mobx-react-lite';
import Panel from './Panel';
import Item from './Item';
import store from '../store';

const Packages = observer(() => (
  <Panel>
    <Heading level={2}>
      Packages <Text>(total: {store.packages.length})</Text>
    </Heading>
    {store.packages.map(pkg => (
      <Item key={pkg.id}>
        <Text>
          <strong>{pkg.name}</strong>: {pkg.namespace}
        </Text>
      </Item>
    ))}
  </Panel>
));

export default Packages;
