import React from 'react'

// Context
import { AppContext } from '@context/WindowPageContext';

// Types context
import { Types } from '@context/types';

// Material UI
import { Alert, Button, Card, CardContent, Typography } from '@mui/material'

// Styles
import styles from './WelcomePage.module.scss';

// React form
import { SubmitHandler, useForm } from 'react-hook-form';

// Firebase
import { getContacts, logInWithEmailAndPassword } from '../../firebase/firebase';

// Helpers
import { ContactProps, User, IFormProps } from '@helpers/interfaces';

export const WelcomePage = () => {
    const { dispatch } = React.useContext(AppContext);

    const [error, setError] = React.useState<boolean>(false);

    const { register, handleSubmit } = useForm({
        defaultValues: {
            email: '',
            password: ''
        }
    });

    const singUp = (): void => {
        dispatch({
            type: Types.SET_AUTH,
            payload: false
        })
    }

    const onSubmit: SubmitHandler<IFormProps> = async ({ password, email }) => {
        const user = await logInWithEmailAndPassword(email, password) as User;

        const contacts = await getContacts(email).then((res: any) => {
            return res.contacts;
        }) as ContactProps[];

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
                        <form className={styles.sign_up_form} onSubmit={handleSubmit(onSubmit)}>
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