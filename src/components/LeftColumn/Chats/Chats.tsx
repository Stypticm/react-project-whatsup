import React from 'react'
import axios from 'axios'

//Material UI
import { Box, Card, CardContent, Divider, Typography } from '@mui/material';

//Styles
import styles from './Chats.module.scss';
import { AccountCircle } from '@mui/icons-material';
import { AppContext, ChatType } from '../../../context/WindowPageContext';
import { Types } from '../../../context/reducers';

export const Chats: React.FC = () => {

    let data = localStorage.getItem('chats')

    const { state, dispatch } = React.useContext(AppContext)
    const [chats, setChats] = React.useState<ChatType[]>(data ? JSON.parse(data) : [])

    const handleClickGetChat = (id: string) => {
        dispatch({ type: Types.CHAT_ID, payload: id })
        dispatch({ type: Types.CHAT_IS_OPEN })
    }

    return (
        <div className={styles.chats_container}>
            <div className={styles.chats_group}>
                <>
                    <Divider />
                    {
                        chats.map((item: ChatType) => (
                            <Box key={item.id} sx={{ cursor: 'pointer' }} onClick={() => handleClickGetChat(item.id)}>
                                <Card>
                                    <CardContent className={styles.chatContent}>
                                        <AccountCircle color='secondary' fontSize='large' />
                                        <div className={styles.nicknameMessage}>
                                            <Typography variant="body1">
                                                {item.contactName}
                                                <br />
                                            </Typography>
                                            <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                                {item.lastMessage}
                                            </Typography>
                                        </div>
                                    </CardContent>
                                </Card>
                            </Box>
                        ))
                    }
                </>
            </div>
        </div>
    )
}