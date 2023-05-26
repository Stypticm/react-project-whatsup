import React from 'react';

// Material UI
import InputBase from '@mui/material/InputBase';
import { Grid, IconButton, Stack } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

// Styles
import styles from './InputMessage.module.scss'

export const InputMessage = () => {
  const [sendBtn, setSendBtn] = React.useState(false);
  const [inputText, setInputText] = React.useState('');

  return (
    <div className={styles.input_container}>
      <Stack
        className={styles.input_content}
      >
        <Grid container spacing={2}>
          <Grid item xs={10}>
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder="Search or start new chat"
              onFocus={() => setSendBtn(true)}
              onChange={(e) => setInputText(e.target.value)}
            />
          </Grid>
          <Grid item xs={2}>
            <IconButton
              sx={{ ml: 1, flex: 1 }}
            >
              <SendIcon />
            </IconButton>
          </Grid>
        </Grid>

      </Stack>
    </div>
  )
}