import React, { useEffect } from 'react'
import axios from 'axios'

// Context
import { AppContext } from '@context/WindowPageContext';
import { Types } from '@context/types';

// Material UI
import { Alert, Box, Button, Card, CardActions, CardContent, TextField, Typography } from '@mui/material'

// Styles
import styles from './WelcomePage.module.scss';

// React form
import { useForm, SubmitHandler } from 'react-hook-form';

// Firebase
import { logInWithEmailAndPassword } from '../../firebase/firebase';

type formProps = {
    email: string;
    password: string;
}

export const WelcomePage= () => {
    const { state, dispatch } = React.useContext(AppContext);
    const [receiptId, setReceiptId] = React.useState<number>(0);
    const [error, setError] = React.useState<boolean>(false);
    const { register, handleSubmit, formState: { errors } } = useForm();

    const singUp = (): void => {
        dispatch({
            type: Types.SET_AUTH,
            payload: false
        })
    }

    return (
        <div className={styles.welcomePage}>
            <Card className={styles.dialogWindow}>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div" align='center'>
                        Welcome to the chat!
                    </Typography>
                    {
                        error ? <Alert severity="error">Incorrect email or password!</Alert> : ''
                    }
                    <div className={styles.page}>
                        <form className={styles.sign_up_form} onSubmit={handleSubmit(
                            async ({ password, email }) => {
                                const user = await logInWithEmailAndPassword(email, password);
                                
                                if (user.email) {
                                    dispatch({
                                        type: Types.LOGIN_IN,
                                        payload: true
                                    })
                                }
                            }
                        )}>
                            <input type="email" {...register("email")} placeholder='Email' />
                            <input type="password" {...register("password")} placeholder='Password' />
                            <div className={styles.buttons}>
                                <Button size='small' type="submit" variant="outlined">Login</Button>
                                <Button size='small' variant='outlined' onClick={singUp}>Sign Up</Button>
                            </div>
                        </form>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}