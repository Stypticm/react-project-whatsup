import React from 'react';

//Material UI
import { Box, Stack, IconButton, InputBase } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import CloseIcon from '@mui/icons-material/Close';
import { AccountCircle } from '@mui/icons-material';

//Styles
import styles from './RightNavBar.module.scss'
import { AppContext } from '../../../context/WindowPageContext';
import { Types } from '../../../context/types';

export const RightNavBar = () => {

  const { state, dispatch } = React.useContext(AppContext);

  // Search button
  const [searchBtn, setSearchBtn] = React.useState(false);
  const [searchText, setSearchText] = React.useState('');

  const searchButton = () => {
    setSearchBtn((prev) => !prev);
  }

  const closeButton = () => {
    setSearchText('');
    setSearchBtn(false);
  }

  const dialogDeleteWindow = () => {
    dispatch({ type: Types.DELETE_ALL })
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
          <IconButton>
            <AccountCircle />
          </IconButton>
        </Box>
        <Box>
          {
            state.chatIndex !== null ?
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                sx={{ mr: 1 }}
                onClick={dialogDeleteWindow}
              >
                <DeleteForeverIcon />
              </IconButton> : ''
          }
          {
            searchBtn ?
              <InputBase
                placeholder="Search words or text"
                onFocus={() => setSearchBtn(true)}
                onChange={(e) => setSearchText(e.target.value)}
              /> : ''
          }
          {
            !searchBtn ?
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                sx={{ mr: 1 }}
                onClick={searchButton}
              >
                <SearchIcon />
              </IconButton> : <IconButton
                size="large"
                edge="start"
                color="inherit"
                sx={{ mr: 1 }}
                onClick={closeButton}
              >
                <CloseIcon
                />
              </IconButton>
          }
        </Box>
      </Stack>
    </div>
  )
}