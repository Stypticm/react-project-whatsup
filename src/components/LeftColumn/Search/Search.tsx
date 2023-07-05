import React from 'react';

// Material UI
import { Paper, InputBase, IconButton, Grow } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CloseIcon from '@mui/icons-material/Close';
import AddCircleIcon from '@mui/icons-material/AddCircle';

// Styles
import styles from './Search.module.scss';

// Context
import { AppContext } from '@context/WindowPageContext';

// Types context
import { Types } from '@context/types';

export const Search = () => {
  const { state, dispatch } = React.useContext(AppContext);

  const [searchBtn, setSearchBtn] = React.useState(false);
  const [searchText, setSearchText] = React.useState('');


  const handleClickSearchBtn = () => {
    setSearchBtn((prev) => !prev);
  }

  const clearInputField = () => {
    setSearchText('');
  }

  const createChat = () => {
    dispatch({ type: Types.DIALOG_CREATE_CHAT })
  }

  return (
    <div className={styles.search_container}>
      <div className={styles.container_content}>
        <Paper
          component="form"
          sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: '100%', backgroundColor: '#e4e4e4' }}
        >
          <IconButton type="button" sx={{ p: '10px' }} aria-label="search" onClick={handleClickSearchBtn}>
            {searchBtn ?
              <Grow
                in={searchBtn}
                style={{ transformOrigin: '0 0 0' }}
                {...(searchBtn ? { timeout: 1000 } : {})}
              >
                <ArrowBackIcon color="success" onClick={clearInputField} />
              </Grow>
              :
              <SearchIcon />
            }
          </IconButton>
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="Search or start new chat"
            onFocus={() => setSearchBtn(true)}
            onChange={(e) => setSearchText(e.target.value)}
            value={searchText}
          />
          {searchText.length > 0 &&
            <IconButton onClick={clearInputField}>
              <CloseIcon />
            </IconButton>}
          <IconButton onClick={createChat}>
            <AddCircleIcon />
          </IconButton>
        </Paper>
      </div>
    </div >
  )
}