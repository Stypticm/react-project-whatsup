import React from 'react';

// Material UI
import InputBase from '@mui/material/InputBase';
import { Grid, IconButton, Stack } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

// Styles
import styles from './InputMessage.module.scss'

// Context
import { AppContext } from '../../../context/WindowPageContext';
import { ContactProps, MessageProps } from '@helpers/interfaces';

// UUID
import { v4 as uuid } from 'uuid';
import { addMessage } from '../../../firebase/firebase';
import { Types } from '../../../context/index';

export const InputMessage = () => {
  const { state, dispatch } = React.useContext(AppContext)

  const [sendBtn, setSendBtn] = React.useState(false);
  const [inputText, setInputText] = React.useState('');

  const handleSendMessage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const date = new Date().toLocaleString();

    const message: MessageProps = {
      contactName: state.current_email,
      timestamp: date,
      textMessage: inputText,
      uid: uuid()
    }

    const contact: ContactProps = state.contacts[state.chatIndex as number];

    addMessage(state.current_email, state.chatIndex, message, contact)
    dispatch({ type: Types.SET_MESSAGES, payload: [...state.messages, message] })

    setInputText('')
  }

  return (
    <div className={styles.input_container}>
      {
        state.chatIndex !== null ?
          <form onSubmit={handleSendMessage}>
            <Stack
              className={styles.input_content}
            >
              <Grid container spacing={2}>
                <Grid item xs={10}>
                  <InputBase
                    sx={{ ml: 1, flex: 1 }}
                    placeholder="Send message"
                    onFocus={() => setSendBtn(true)}
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={2}>
                  <IconButton
                    type='submit'
                  >
                    <SendIcon />
                  </IconButton>
                </Grid>
              </Grid>

            </Stack>
          </form>
          :
          ''
      }

    </div>
  )
}