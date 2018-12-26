import React from "react";
import { Box } from "grommet";

const Item = props => (
  <Box
    gap="small"
    background="light-2"
    pad="medium"
    margin="xsmall"
    elevation="xsmall"
    wrap
    {...props}
  >
    {props.children}
  </Box>
);

export default Item;
