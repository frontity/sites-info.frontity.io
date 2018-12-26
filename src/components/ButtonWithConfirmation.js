import React, { useState } from 'react';
import { Box, Button, Layer, Heading, Text } from 'grommet';
import { observer } from 'mobx-react-lite';
import store from '../store';

const Migration = observer(({ func }) => {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);
  return (
    <>
      <Button
        onClick={() => setOpen(true)}
        label={func}
        disabled={store.busy}
      />
      {open && (
        <Layer responsive={false} modal onClickOutside={close} onEsc={close}>
          <Box pad="medium" gap="small" width="medium" margin="medium">
            <Heading level={3} margin="none">
              Attention!
            </Heading>
            <Text>Are you sure you want to do "{func}"?</Text>
            <Box
              tag="footer"
              gap="small"
              direction="row"
              align="center"
              justify="end"
              pad={{ top: 'medium', bottom: 'small' }}
            >
              <Button
                label="Yes"
                onClick={() => {
                  close();
                  store[func]();
                }}
                color="dark-6"
              />
              <Button
                label={
                  <Text color="white">
                    <strong>No!</strong>
                  </Text>
                }
                onClick={close}
                primary
                color="status-critical"
              />
            </Box>
          </Box>
        </Layer>
      )}
    </>
  );
});

export default Migration;
