import React from 'react'

// Material UI
import { Button, Card, CardActions, CardContent, TextField, Typography } from '@mui/material'

// Styles
import styles from './DialogCreateChat.module.scss';
import { AppContext } from '../../../context/WindowPageContext';
import { Types, ChatType } from '../../../context/reducers';

interface formProps {
    phoneNumber: string;
    message: string;
}

const DialogCreateChat: React.FC = () => {
    let data = localStorage.getItem('chats')
    let chatData: ChatType[] = data ? JSON.parse(data) : []

    const { state, dispatch } = React.useContext(AppContext);

    const [formInput, setFormInput] = React.useState<formProps>({
        phoneNumber: '',
        message: ''
    });

    const handleInput: React.ChangeEventHandler<HTMLInputElement> = (e): void => {
        setFormInput({ ...formInput, [e.target.name]: e.target.value })
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
        event.preventDefault();
        let newChat: ChatType = {
            id: formInput.phoneNumber,
            contactName: formInput.phoneNumber,
            avatar: 'avatar',
            lastMessage: 'lastMessage',
            timestamp: new Date(),
            messages: {
                message: {
                    id: new Date().getTime().toString(),
                    message: formInput.message,
                    type: 1
                }
            }

        }
        chatData.push(newChat)
        localStorage.setItem('chats', JSON.stringify(chatData))
        setFormInput({ phoneNumber: '', message: '' });
        dispatch({ type: Types.OFF_BLUR })
        // axios.post(`https://api.green-api.com/waInstance1101822196/SendMessage/98010bc4555d4ab9952d5d19ac1c07e6d49bde15f64f487987`, {
        //     chatId: `${formInput.phoneNumber}@c.us`,
        //     message: formInput.message
        // }).then((res) => {
        //     console.log(res.data)
        // }).catch((err) => {
        //     console.log(err)
        // })

    }

    const cancelButton = (): void => {
        dispatch({ type: Types.OFF_BLUR })
    }

    return (
        <div className={styles.container}>
            <Card className={styles.dialogWindow}>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        Start chat
                    </Typography>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            name="phoneNumber"
                            helperText="Please enter phone number"
                            label="Phone Number"
                            value={formInput.phoneNumber}
                            onChange={handleInput}
                        />
                        <br />
                        <TextField
                            name='message'
                            helperText="Please enter your message"
                            label="Message"
                            value={formInput.message}
                            onChange={handleInput}
                        />
                        <CardActions className={styles.buttons}>
                            <Button size="small" type='submit'>Send</Button>
                            <Button size="small" type='button' onClick={cancelButton}>Cancel</Button>
                        </CardActions>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}

export default DialogCreateChat