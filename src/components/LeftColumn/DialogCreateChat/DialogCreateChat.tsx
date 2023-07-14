import React from 'react'

// Material UI
import { Button, Card, CardActions, CardContent, TextField, Typography } from '@mui/material'

// Styles
import styles from './DialogCreateChat.module.scss';

// Context
import { AppContext } from '@context/WindowPageContext';

// Types context
import { Types } from '@context/types';

// Interfaces
import { ContactProps, User, DialogCreateFormProps } from '@helpers/interfaces';

// Firebase
import { addContact, getAllUsers, getContacts } from '../../../firebase/firebase';
import { DocumentData } from 'firebase/firestore';

// Generate ID
import { generateId } from '@helpers/generateId';


export const DialogCreateChat = () => {
    const { state, dispatch } = React.useContext(AppContext);

    const [formInput, setFormInput] = React.useState<DialogCreateFormProps>({
        phoneNumber: ''
    });

    const handleInput: React.ChangeEventHandler<HTMLInputElement> = (e): void => {
        setFormInput({ ...formInput, [e.target.name]: e.target.value })
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
        event.preventDefault();

        const contact: ContactProps = {
            contactName: '',
            contactPhone: formInput.phoneNumber,
            contactEmail: '',
            uid: generateId(),
            messages: []
        }


        await getAllUsers().then((res: DocumentData[] | undefined) => {
            
            const user = res?.find((item: DocumentData) => {
                return item.phone === contact.contactPhone
            }) as User | undefined;

            if (user !== undefined) {
                if (user.email === state.current_email) {
                    alert('You can\'t add yourself')
                } else {
                    const addedContact: ContactProps = contact;
                    if (state.contacts.find((item: ContactProps) => item.contactPhone === addedContact.contactPhone)) {
                        alert('This contact already exists')
                    } else {
                        addContact(state.current_email, {
                            ...contact, contactName: user.firstName, contactEmail: user.email
                        });
                        dispatch({
                            type: Types.SET_CONTACTS, payload: [...state.contacts, {
                                ...contact, contactName: user.firstName
                            }]
                        })
                    }
                }
            } else {
                alert('User not found')
            }
        })

        setFormInput({ phoneNumber: '' });
        dispatch({ type: Types.DIALOG_CREATE_CHAT })
        getContacts(state.current_email)
    }

    const cancelButton = (): void => {
        setFormInput({ phoneNumber: '' });
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