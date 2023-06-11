import React from 'react'

// Context
import { AppContext } from '@context/WindowPageContext';

// Material UI
import { Backdrop, Divider } from '@mui/material'
import { LeftColumn, WelcomePage, RightColumn } from '@components/index'

// Styles
import styles from './App.module.scss'

// Components
import { DialogCreateChat } from '@components/LeftColumn/DialogCreateChat/DialogCreateChat';
import { DialogQuit } from '@components/LeftColumn/DialogQuit/DialogQuit';
import { RegisteredPage } from '@components/RegisteredPage';

// Helpers
import { getToken } from '@helpers/token';
import { getContacts } from '@helpers/getContacts';

const App = () => {
  const { state, dispatch } = React.useContext(AppContext);
  const token = getToken();

  React.useEffect(() => {
    getContacts().then((res: any) => {
      setContacts([...res.data.data])
    })
  }, [])

  return (
    <>
      {
        state.isRegistered || token !== null ?
          <>
            {
              state.isLoginIn ?
                <WelcomePage />
                :
                <div className={styles.main_container}>
                  <div className={styles.left_column}>
                    <LeftColumn />
                  </div>
                  <div className={styles.right_column}>
                    <RightColumn />
                  </div>
                  <Backdrop
                    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                    open={state.isDialogCreateChat}
                  >
                    <DialogCreateChat />
                  </Backdrop>
                  <Backdrop
                    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                    open={state.isDialogQuit}
                  >
                    <DialogQuit />
                  </Backdrop>
                </ div>
            }
          </>
          :
          <RegisteredPage />
      }
    </>
  )
}

export default App
