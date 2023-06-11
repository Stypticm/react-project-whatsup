import React from 'react';
import axios from 'axios'

import { Chats } from './Chats';

// Components
import { LeftNavBar } from './LeftNavBar';

// Styles
import styles from './LeftColumn.module.scss'
import { getToken } from '../../helpers/token';
import { AppContext } from '../../context/WindowPageContext';
import { getContacts } from '../../helpers/getContacts';

interface ContactsProps {
  id: string;
  attributes: {
    name: string;
    phone: string;
  }
}

export const LeftColumn = () => {

  return (
    <div className={styles.main_container}>
      <LeftNavBar />
      <Chats />
    </div>
  )
}