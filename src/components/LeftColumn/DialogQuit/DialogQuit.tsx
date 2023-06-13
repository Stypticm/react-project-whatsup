import React from 'react'
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';

// Material UI
import { Button, Card, CardActions, CardContent, TextField, Typography } from '@mui/material'

// Styles
import styles from './DialogQuit.module.scss';

// Context
import { Types } from '../../../context/types';
import { AppContext } from '../../../context/WindowPageContext';

// Helpers
import { removeToken } from '../../../helpers/token';


export const DialogQuit = () => {
    const { state, dispatch } = React.useContext(AppContext);
    

    const agreedButton = (): void => {
        dispatch({ type: Types.DIALOG_QUIT, payload: false })
        dispatch({ type: Types.LOGIN_IN, payload: false })
        dispatch({ type: Types.SET_AUTH, payload: null })
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