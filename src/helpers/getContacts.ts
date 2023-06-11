import axios from 'axios'
import { getToken } from './token'

export const getContacts = async () => {
    const token = getToken();
    const userId = localStorage.getItem('userId');

    const data = await axios.get(`http://localhost:1337/api/contacts?filters[user][id][$eq]=${userId}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }).then((res) => {
        return res
    }).catch((err) => {
        console.log(err)
    })

    return data
}