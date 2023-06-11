import React from 'react'
import axios from 'axios'

//Material UI
import { Box, Card, CardContent, Divider, Typography } from '@mui/material';
import { AccountCircle } from '@mui/icons-material';

//Styles
import styles from './Chats.module.scss';

// Context
import { AppContext } from '../../../context/WindowPageContext';

// Types
import { Types } from '../../../context/types';

// Components
import { Search } from '../Search';

// Helpers
import { getContacts } from '../../../helpers/getContacts';

interface ContactsProps {
    id: string;
    attributes: {
        name: string;
        phone: string;
    }
}

export const Chats = () => {

    const { state, dispatch } = React.useContext(AppContext)
    
    const handleClickGetChat = (id: string) => {
        dispatch({ type: Types.CHAT_ID, payload: id })
        dispatch({ type: Types.CHAT_IS_OPEN })
    }

    return (
        <div className={styles.chats_container}>
            <Search />
            <div className={styles.chats_group}>
                <>
                    <Divider />
                    {/* {
                        chats.map((item: ContactsProps) => (
                            <Box key={item.id} sx={{ cursor: 'pointer' }} onClick={() => handleClickGetChat(item.id)}>
                                <Card>
                                    <CardContent className={styles.chatContent}>
                                        <AccountCircle color='secondary' fontSize='large' />
                                        <div className={styles.nicknameMessage}>
                                            <Typography variant="body1">
                                                {item.attributes.name}
                                                <br />
                                            </Typography>
                                            <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                                {item.attributes.phone}
                                            </Typography>
                                        </div>
                                    </CardContent>
                                </Card>
                            </Box>
                        ))
                    } */}
                </>
            </div>
        </div>
    )
}