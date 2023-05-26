import React from 'react'

// Context
import { AppContext } from './context/WindowPageContext';

// Material UI
import { Backdrop, Divider } from '@mui/material'
import { LeftColumn, WelcomePage, RightColumn } from './components'

// Styles
import styles from './App.module.scss'
import { Types } from './context/reducers';
import DialogCreateChat from './components/LeftColumn/DialogCreateChat.tsx/DialogCreateChat';

const App = () => {
  const { state, dispatch } = React.useContext(AppContext);

  const handleClickClose = () => {
    dispatch({ type: Types.OFF_BLUR })
  }

  return (
    <div className={styles.main_container}>
      {
        state.isOpen ?
          <WelcomePage />
          :
          <>
            <div className={styles.left_column}>
              <LeftColumn />
            </div>
            <Divider orientation="vertical" variant="middle" flexItem />
            <div className={styles.right_column}>
              <RightColumn />
            </div>
            <Backdrop
              sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
              open={state.isBlur}
            >
              <DialogCreateChat />
            </Backdrop>
          </>
      }
    </div>
  )
}

export default App
