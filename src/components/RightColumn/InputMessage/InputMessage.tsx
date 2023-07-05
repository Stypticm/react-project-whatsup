import React from 'react';
import axios from 'axios';

// Material UI
import InputBase from '@mui/material/InputBase';
import { Grid, IconButton, Stack } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

// Styles
import styles from './InputMessage.module.scss'

// Context
import { AppContext } from '../../../context/WindowPageContext';

// Helpers
import { API, BEARER } from '../../../helpers/constants';
import { getToken } from '../../../helpers/token';
import { MessageType } from '../../../context';

export const InputMessage = () => {
  const { state } = React.useContext(AppContext)
  const token = getToken();
  const userId = localStorage.getItem('userId');

  const [sendBtn, setSendBtn] = React.useState(false);
  const [inputText, setInputText] = React.useState('');

  const handleSendMessage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const message: MessageType = {
      senderId: userId?.toString() || "",
      textMessage: inputText,
      timestamp: new Date()
    }

    axios.put(`${API}/contacts/${state.chatId}?populate[0]=messages`, {
      data: {
        messages: message
      }
    }, {
      headers: {
        'Authorization': `${BEARER} ${token}`,
        'Content-Type': 'application/json'
      }
    }).then(res => {
      console.log(res.data.data.attributes)
    }).catch(err => {
      console.log(err)
    })
    setInputText('')
  }

  return (
    <div className={styles.input_container}>
      {
        state.chatId !== null ?
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