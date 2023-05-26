import React from 'react'

//Material UI
import { Box, Card, CardContent, Typography } from '@mui/material';

//Styles
import styles from './MainContent.module.scss'

//Context
import { AppContext, } from '../../../context/WindowPageContext';
import { ChatType } from '../../../context/reducers';

export const MainContent: React.FC = () => {

  const { state } = React.useContext(AppContext)

  let data = localStorage.getItem('chats')

  const [messages, setMessages] = React.useState<ChatType[]>(data ? JSON.parse(data) : [])

  return (
    <div className={styles.main_content}>
      {
        messages.map((item: ChatType) =>
          item.id === state.chatId ?
            <div key={item.id}>
              {
                item.messages.message.type === 1 ?
                  <div className={styles.blockMyMessage} key={item.id}>
                    <Box display='inline-block'>
                      <Card className={styles.myMessageCard}>
                        <CardContent>
                          <Typography variant="body2">
                            {item.messages.message.message}
                            <br />
                          </Typography>
                          <Typography sx={{ mb: 1.5 }} color="text.secondary">
                          </Typography>
                        </CardContent>
                      </Card>
                    </Box>
                  </div>
                  :
                  <div className={styles.blockFriendsMessage} key={item.messages.message.id}>
                    <Box display='inline-block'>
                      <Card>
                        <CardContent>
                          <Typography variant="body2">
                            {item.messages.message.message}
                            <br />
                          </Typography>
                          <Typography sx={{ mb: 1.5 }} color="text.secondary">
                          </Typography>
                        </CardContent>
                      </Card>
                    </Box>
                  </div>
              }
            </div>
            : ''
        )
      }
    </div>
  )
}