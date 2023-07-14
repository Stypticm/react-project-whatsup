import React from 'react'

// Material UI
import { Button, Card, CardActions, CardContent, Typography } from '@mui/material'

// Styles
import styles from './DialogQuit.module.scss';

// Types context
import { Types } from '../../../context/types';

// Context
import { AppContext } from '../../../context/WindowPageContext';


export const DialogQuit = () => {
    const { dispatch } = React.useContext(AppContext);


    const agreedButton = (): void => {
        dispatch({ type: Types.DIALOG_QUIT, payload: false })
        dispatch({ type: Types.LOGIN_IN, payload: false })
        dispatch({ type: Types.SET_AUTH, payload: null })
        dispatch({ type: Types.SET_MESSAGES, payload: [] })
        dispatch({ type: Types.CHAT_INDEX, payload: null })
    }

    const cancelButton = (): void => {
        dispatch({ type: Types.DIALOG_QUIT })
    }

    return (
        <div className={styles.container}>
            <Card className={styles.dialogWindow}>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        Are you sure you want to quit?
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

export default DialogQuit