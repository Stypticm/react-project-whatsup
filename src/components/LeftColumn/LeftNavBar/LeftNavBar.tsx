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

// Firebase
import { getCurrentUser } from '../../../firebase/firebase';
import { User } from '@helpers/interfaces';

export const LeftNavBar = () => {

  const { state, dispatch } = React.useContext(AppContext);
  const [currentUser, setCurrentUser] = React.useState({ firstName: '', lastName: '' });

  const dialogQuitWindow = () => {
    dispatch({ type: Types.DIALOG_QUIT })
  }

  const result = async () => {
    const user = await getCurrentUser(state.current_email) as User;
    setCurrentUser({ firstName: user.firstName, lastName: user.lastName });
  }

  React.useEffect(() => {
    result();
  }, [])

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
          {
            currentUser.firstName && currentUser.lastName ? (
              <p>{currentUser.firstName} {currentUser.lastName}</p>
            ) : (
              null
            )
          }
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