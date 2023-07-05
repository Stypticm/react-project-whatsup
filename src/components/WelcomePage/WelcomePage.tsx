import React from 'react'

// Context
import { AppContext } from '@context/WindowPageContext';
import { Types } from '@context/types';

// Material UI
import { Alert, Button, Card, CardContent, Typography } from '@mui/material'

// Styles
import styles from './WelcomePage.module.scss';

// React form
import { useForm } from 'react-hook-form';

// Firebase
import { getContacts, logInWithEmailAndPassword } from '../../firebase/firebase';


export const WelcomePage = () => {
    const { dispatch } = React.useContext(AppContext);

    const [err, setError] = React.useState<boolean>(false);

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
                        err ? <Alert severity="error">Incorrect email or password!</Alert> : ''
                    }
                    <div className={styles.page}>
                        <form className={styles.sign_up_form} onSubmit={handleSubmit(
                            async ({ password, email }) => {
                                const user = await logInWithEmailAndPassword(email, password);

                                const contacts = await getContacts(email).then((res: any) => {
                                    return res.contacts;
                                });

                                if (user.email) {
                                    dispatch({
                                        type: Types.LOGIN_IN
                                    })
                                    dispatch({
                                        type: Types.SET_USER,
                                        payload: email
                                    })
                                    dispatch({
                                        type: Types.SET_CONTACTS,
                                        payload: contacts
                                    })
                                } else {
                                    setError(true);
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