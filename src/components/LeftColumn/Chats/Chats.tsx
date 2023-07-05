import React from 'react'

//Material UI
import { Box, Card, CardContent, Divider, Typography } from '@mui/material';
import { AccountCircle, CatchingPokemonSharp } from '@mui/icons-material';

//Styles
import styles from './Chats.module.scss';

// Context
import { AppContext } from '../../../context/WindowPageContext';

// Types
import { Types } from '../../../context/types';

// Components
import { Search } from '../Search';
import { ContactProps } from '@helpers/interfaces';
import { getMessages } from '../../../firebase/firebase';

export const Chats = () => {

    const { state, dispatch } = React.useContext(AppContext)

    const handleClickGetChat = async (id: string, index: number) => {
        dispatch({ type: Types.CHAT_INDEX, payload: index })
        dispatch({ type: Types.CHAT_IS_OPEN })

        await getMessages(state.current_email, index).then((res) => {
            dispatch({ type: Types.SET_MESSAGES, payload: res })
        })
    }

    return (
        <div className={styles.chats_container}>
            <Search />
            <div className={styles.chats_group}>
                <>
                    <Divider />
                    {
                        state.contacts.map((item: ContactProps, index) => (
                            <Box key={item.uid} sx={{ cursor: 'pointer' }} onClick={() => handleClickGetChat(item.uid, index)}>
                                <Card>
                                    <CardContent className={styles.chatContent}>
                                        <AccountCircle color='secondary' fontSize='large' />
                                        <div className={styles.nicknameMessage}>
                                            <Typography variant="body1">
                                                {item.contactName}
                                                <br />
                                            </Typography>
                                            <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                                {item.contactPhone}
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