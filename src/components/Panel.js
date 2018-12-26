import React from 'react';
import { Box } from 'grommet';

const Panel = props => (
  <Box
    background="light-1"
    pad="medium"
    margin="medium"
    elevation="xsmall"
    wrap
    round="small"
    alignContent="center"
    animation="fadeIn"
    border={{ side: 'all', color: 'light-4', size: 'small' }}
    {...props}
  >
    {props.children}
  </Box>
);

export default Panel;
