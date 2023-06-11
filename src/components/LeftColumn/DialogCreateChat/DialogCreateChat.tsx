import React from 'react'
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';

// Material UI
import { Button, Card, CardActions, CardContent, TextField, Typography } from '@mui/material'

// Styles
import styles from './DialogCreateChat.module.scss';

// Context
import { AppContext } from '../../../context/WindowPageContext';

// Types
import { Types } from '../../../context/types';

// Helpers
import { getToken } from '../../../helpers/token';
import { API, BEARER } from '../../../helpers/constants';
import { getContacts } from '../../../helpers/getContacts';

interface formProps {
    phoneNumber: string;
    contactName: string;
}

export const DialogCreateChat = () => {
    const { state, dispatch } = React.useContext(AppContext);

    const [formInput, setFormInput] = React.useState<formProps>({
        phoneNumber: '',
        contactName: ''
    });

    const handleInput: React.ChangeEventHandler<HTMLInputElement> = (e): void => {
        setFormInput({ ...formInput, [e.target.name]: e.target.value })
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
        event.preventDefault();

        const userId = localStorage.getItem('userId') || '';
        const token = getToken();
        
        const newContact: any = {
            name: formInput.contactName,
            contactId: uuidv4(),
            phone: formInput.phoneNumber,
            messages: [],
            user: {
                set: [
                    { id: userId }
                ]
            }
        }

        axios.post(`${API}/contacts`, {
            data: newContact
        }, {
            headers: {
                'Authorization': `${BEARER} ${token}`,
                'Content-Type': 'application/json'
            }
        }).then((res) => {
            getContacts().then((res: any) => {
                // setContacts([...res.data.data])
            })
        }).catch((err) => {
            console.log(err)
        })

        setFormInput({ phoneNumber: '', contactName: '' });
        dispatch({ type: Types.DIALOG_CREATE_CHAT })

    }

    const cancelButton = (): void => {
        dispatch({ type: Types.DIALOG_CREATE_CHAT })
    }

    return (
        <div className={styles.container}>
            <Card className={styles.dialogWindow}>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div" align='center'>
                        Create Chat
                    </Typography>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            name="phoneNumber"
                            helperText="Please enter phone number"
                            label="Phone Number"
                            value={formInput.phoneNumber}
                            onChange={handleInput}
                            fullWidth
                        />
                        <TextField
                            name="contactName"
                            helperText="Please enter name of contact"
                            label="Contact Name"
                            value={formInput.contactName}
                            onChange={handleInput}
                            fullWidth
                        />
                        <CardActions className={styles.buttons}>
                            <Button size="small" type='submit'>Create</Button>
                            <Button size="small" type='button' onClick={cancelButton}>Cancel</Button>
                        </CardActions>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}