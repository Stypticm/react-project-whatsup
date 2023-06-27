import React from 'react'

//Material UI
import { Box, Card, CardContent, Typography } from '@mui/material';

//Styles
import styles from './MainContent.module.scss'

//Context
import { AppContext } from '../../../context/WindowPageContext';
import { MessageProps } from '@helpers/interfaces';

export const MainContent = () => {

  const { state } = React.useContext(AppContext)

  const sortedMessages = state.messages.sort((a: MessageProps, b: MessageProps) => {
    return new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
  })

  return (
    <div className={styles.main_content}>
      {
        sortedMessages.map((item: MessageProps) =>
          <div key={item.uid}>
            {
              item.contactName === `${state.current_email}` ?
                <div className={styles.blockMyMessage} key={item.uid}>
                  <Box display='inline-block'>
                    <Card className={styles.myMessageCard}>
                      <CardContent>
                        <Typography variant="body2">
                          {item.textMessage}
                          <br />
                        </Typography>
                        <Typography sx={{ mb: 1.5 }} color="text.secondary">
                          {item.timestamp}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Box>
                </div>
                :
                <div className={styles.blockFriendsMessage} key={item.uid}>
                  <Box display='inline-block'>
                    <Card>
                      <CardContent>
                        <Typography variant="body2">
                          {item.textMessage}
                          <br />
                        </Typography>
                        <Typography sx={{ mb: 1.5 }} color="text.secondary">
                          {item.timestamp}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Box>
                </div>
            }
          </div>
        )
      }
    </div>
  )
}