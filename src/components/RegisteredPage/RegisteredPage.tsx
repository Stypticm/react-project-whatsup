import React, { useEffect } from 'react'

// Context
import { AppContext } from '../../context/WindowPageContext';
import { Types } from '../../context/types';

// Material UI
import { Button, Card, CardContent, Typography } from '@mui/material'

// Styles
import styles from './RegisteredPage.module.scss';

// React form
import { useForm } from 'react-hook-form';

// Firebase
import { registerWithEmailAndPassword } from '../../firebase/firebase';
import { User } from '@helpers/interfaces';

// interface WelcomePageProps extends React.ComponentPropsWithRef<'button'> {
// textStatus: boolean;
// }

interface SignUpFormValues extends User {
    password: string;
}

export const RegisteredPage = () => {
    const { dispatch } = React.useContext(AppContext);
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
                            <input type="phone" {...register("phone")} placeholder='Phone number' />
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