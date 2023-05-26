import React, { useEffect } from 'react'
import axios from 'axios'

// Context
import { AppContext } from '../../context/WindowPageContext';
import { Types } from '../../context/reducers';

// Material UI
import { Box, Button, Card, CardActions, CardContent, TextField, Typography } from '@mui/material'

// Styles
import styles from './WelcomePage.module.scss';


// interface WelcomePageProps extends React.ComponentPropsWithRef<'button'> {
// textStatus: boolean;
// }

interface formProps {
    idInstance: string;
    apiTokenInstance: string;
}

export const WelcomePage: React.FC = () => {
    const { state, dispatch } = React.useContext(AppContext);
    const [receiptId, setReceiptId] = React.useState<number>(0);

    const [formInput, setFormInput] = React.useState<formProps>({
        idInstance: '',
        apiTokenInstance: ''
    });

    const handleInput: React.ChangeEventHandler<HTMLInputElement> = (e): void => {
        setFormInput({ ...formInput, [e.target.name]: e.target.value })
    };

    useEffect(() => {
        axios.get(`https://api.green-api.com/waInstance1101822196/receiveNotification/98010bc4555d4ab9952d5d19ac1c07e6d49bde15f64f487987`).then((res) => {
            console.log(res.data)
            setReceiptId(res.data.receiptId)
        }).catch((err) => {
            console.log(err)
        })
    }, [])

    const handleSubmitLogin = async (event: React.FormEvent<HTMLFormElement>): Promise<any> => {
        event.preventDefault();
        // axios.get(`https://api.green-api.com/waInstance${formInput.idInstance}/GetSettings/${formInput.apiTokenInstance}`).then((res) => {
        axios.get(`https://api.green-api.com/waInstance1101822196/GetSettings/98010bc4555d4ab9952d5d19ac1c07e6d49bde15f64f487987`).then((res) => {
            if (res.status === 200) {
                dispatch({ type: Types.OPEN_CLOSE })
            }
        }).then(() => {
            axios.delete(`https://api.green-api.com/waInstance1101822196/deleteNotification/98010bc4555d4ab9952d5d19ac1c07e6d49bde15f64f487987/${receiptId}`).then((res) => {
                
            }).catch((err) => {
                
            })
        }).then(() => {
            axios.get(`https://api.green-api.com/waInstance1101822196/receiveNotification/98010bc4555d4ab9952d5d19ac1c07e6d49bde15f64f487987`).then((res) => {
               
                setReceiptId(res.data.receiptId)
            }).catch((err) => {
                
            })
        }).catch((err) => {
            console.log(err);
        })

        setFormInput({ idInstance: '', apiTokenInstance: '' });
    }

    return (
        <div className={styles.welcomePage}>
            <Card className={styles.dialogWindow}>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        Welcome to the chat!
                    </Typography>
                    <form onSubmit={handleSubmitLogin}>
                        <TextField
                            name="idInstance"
                            helperText="Please enter your idInstance"
                            label="Id Instance"
                            defaultValue={formInput.idInstance}
                            onChange={handleInput}
                            fullWidth
                        />
                        <br />
                        <TextField
                            name='apiTokenInstance'
                            helperText="Please enter your apiTokenInstance)"
                            label="Token Instance"
                            defaultValue={formInput.apiTokenInstance}
                            onChange={handleInput}
                            fullWidth
                        />
                        <CardActions className={styles.buttons}>
                            <Button size="small" type='submit'>Login</Button>
                        </CardActions>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}