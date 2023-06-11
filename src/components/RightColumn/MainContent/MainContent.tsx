import React from 'react'

//Material UI
import { Box, Card, CardContent, Typography } from '@mui/material';

//Styles
import styles from './MainContent.module.scss'

//Context
import { AppContext } from '../../../context/WindowPageContext';
import { ChatType } from '../../../context/types';

export const MainContent: React.FC = () => {

  const { state } = React.useContext(AppContext)

  const [messages, setMessages] = React.useState<ChatType[]>([])

  React.useEffect(() => {
    
  }, [state.chatId])

  return (
    <div className={styles.main_content}>
      {
        messages.map((item: ChatType) =>
          item.chatId === `${state.chatId}@c.us` ?
            <div key={item.chatId}>
              {
                item.type === 'outgoing' ?
                  <div className={styles.blockMyMessage} key={item.idMessage}>
                    <Box display='inline-block'>
                      <Card className={styles.myMessageCard}>
                        <CardContent>
                          <Typography variant="body2">
                            {item.textMessage}
                            <br />
                          </Typography>
                          <Typography sx={{ mb: 1.5 }} color="text.secondary">
                          </Typography>
                        </CardContent>
                      </Card>
                    </Box>
                  </div>
                  :
                  <div className={styles.blockFriendsMessage} key={item.idMessage}>
                    <Box display='inline-block'>
                      <Card>
                        <CardContent>
                          <Typography variant="body2">
                            {item.textMessage}
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