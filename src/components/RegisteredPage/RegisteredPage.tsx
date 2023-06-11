import React, { useEffect } from 'react'
import axios from 'axios'

// Context
import { AppContext } from '../../context/WindowPageContext';
import { Types } from '../../context/types';

// Material UI
import { Box, Button, Card, CardActions, CardContent, TextField, Typography } from '@mui/material'

// Styles
import styles from './RegisteredPage.module.scss';

// React form
import { useForm, SubmitHandler } from 'react-hook-form';

// Firebase
import { registerWithEmailAndPassword, User } from '../../firebase/firebase';

// interface WelcomePageProps extends React.ComponentPropsWithRef<'button'> {
// textStatus: boolean;
// }

interface SignUpFormValues extends User {
    password: string;
}

export const RegisteredPage: React.FC = () => {
    const { state, dispatch } = React.useContext(AppContext);
    const { register, handleSubmit, formState: { errors } } = useForm<SignUpFormValues>({
        defaultValues: {
            contacts: []
        }
    });

    const login = (): void => {
        dispatch({
            type: Types.SET_AUTH,
            payload: true
        })
    }

    return (
        <div className={styles.registeredPage}>
            <Card className={styles.dialogWindow}>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div" align='center'>
                        Registration
                    </Typography>
                    <div className={styles.page}>
                        <form className={styles.sign_up_form} onSubmit={handleSubmit(
                            ({ password, ...user }) => {
                                registerWithEmailAndPassword(user, password)
                            }
                        )}>
                            <input type="firstName" {...register("firstName")} placeholder='First name' />
                            <input type="lastName" {...register("lastName")} placeholder='Last name' />
                            <input type="email" {...register("email")} placeholder='Email' />
                            <input type="password" {...register("password")} placeholder='Password' />
                            <div className={styles.buttons}>
                                <Button size="small" variant="outlined" onClick={login}>Login</Button>
                                <Button size="small" variant='outlined' type='submit'>Sign Up</Button>
                            </div>
                        </form>
                    </div>

                </CardContent>
            </Card>
        </div>
    )
}