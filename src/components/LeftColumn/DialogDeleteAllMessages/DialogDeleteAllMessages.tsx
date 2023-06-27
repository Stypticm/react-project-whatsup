import React from 'react'

// Material UI
import { Button, Card, CardActions, CardContent, Typography } from '@mui/material'

// Styles
import styles from './DialogDeleteAllMessages.module.scss';

// Context
import { Types } from '../../../context/types';
import { AppContext } from '../../../context/WindowPageContext';
import { deleteAllMessages } from '../../../firebase/firebase';


export const DialogDeleteAllMessages = () => {
    const { state, dispatch } = React.useContext(AppContext);

    const agreedButton = (): void => {
        dispatch({ type: Types.SET_MESSAGES, payload: [] });
        deleteAllMessages(state.current_email, state.chatIndex as number);
        dispatch({ type: Types.DELETE_ALL });
    }

    const cancelButton = (): void => {
        dispatch({ type: Types.DELETE_ALL })
    }

    return (
        <div className={styles.container}>
            <Card className={styles.dialogWindow}>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        Are you sure you want to delete all messages?
                    </Typography>
                    <CardActions className={styles.buttons}>
                        <Button size="small" type='button' onClick={agreedButton}>Yes</Button>
                        <Button size="small" type='button' onClick={cancelButton}>No</Button>
                    </CardActions>
                </CardContent>
            </Card>
        </div>
    )
}

export default DialogDeleteAllMessages;