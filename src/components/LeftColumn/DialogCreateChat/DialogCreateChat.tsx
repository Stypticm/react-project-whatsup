import React from 'react'

// Material UI
import { Button, Card, CardActions, CardContent, TextField, Typography } from '@mui/material'

// Styles
import styles from './DialogCreateChat.module.scss';

// Context
import { AppContext } from '../../../context/WindowPageContext';

// Types
import { Types } from '../../../context/types';

// Interfaces
import { ContactProps, User } from '@helpers/interfaces';

// Firebase
import { addContact, auth, db, getAllUsers, getContacts } from '../../../firebase/firebase';

// Hooks
import { useAuthState } from 'react-firebase-hooks/auth';

// UUID
import { v4 as uuid } from 'uuid';


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

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
        event.preventDefault();

        const contact: ContactProps = {
            contactName: formInput.contactName,
            contactPhone: formInput.phoneNumber,
            uid: uuid(),
            messages: []
        }

        
        await getAllUsers().then((res: any) => {
            const user = res.find((item: User) => {
                return item.phone === contact.contactPhone
            })

            if (user !== undefined) {
                if (user.email === state.current_email) {
                    alert('You can\'t add yourself')
                } else {
                    addContact(state.current_email, contact);
                    dispatch({ type: Types.SET_CONTACTS, payload: [...state.contacts, contact] })
                }
            } else {
                alert('User not found')
            }
        })

        setFormInput({ phoneNumber: '', contactName: '' });
        dispatch({ type: Types.DIALOG_CREATE_CHAT })
        getContacts(state.current_email)
    }

    const cancelButton = (): void => {
        setFormInput({ phoneNumber: '', contactName: '' });
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