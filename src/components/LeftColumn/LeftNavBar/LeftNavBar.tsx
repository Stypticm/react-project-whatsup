import React from 'react';

//Material UI
import MenuIcon from '@mui/icons-material/Menu';
import { Box, MenuItem, Stack, AppBar, IconButton } from '@mui/material';
import { AccountCircle } from '@mui/icons-material';

//Styles
import styles from './LeftNavBar.module.scss'


export const LeftNavBar = () => {

  return (
    <div className={styles.navbar_container}>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        spacing={0}
        sx={{ backgroundColor: '#e4e4e4' }}
      >
        <Box>
          <AppBar position="static" sx={{ backgroundColor: '#e4e4e4', boxShadow: 'none' }}>
            <AccountCircle fontSize='large' color='success' />
          </AppBar>
        </Box>
        <Box>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            sx={{ mr: 1 }}
          >
            <MenuIcon />
          </IconButton>
        </Box>
      </Stack>
    </div>
  )
}