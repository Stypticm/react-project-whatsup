import React from 'react';

//Material UI
import { Box, Stack, AppBar, IconButton } from '@mui/material';
import { AccountCircle } from '@mui/icons-material';
import LogoutIcon from '@mui/icons-material/Logout';

//Styles
import styles from './LeftNavBar.module.scss'

// Types context
import { Types } from '@context/types';

// Context
import { AppContext } from '../../../context/WindowPageContext';


export const LeftNavBar = () => {
  const { dispatch } = React.useContext(AppContext);

  const dialogQuitWindow = () => {
    dispatch({ type: Types.DIALOG_QUIT })
  }

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
            onClick={dialogQuitWindow}
          >
            <LogoutIcon />
          </IconButton>
        </Box>
      </Stack>
    </div>
  )
}