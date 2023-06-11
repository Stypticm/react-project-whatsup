import React from 'react';

// Components
import { LeftNavBar } from './LeftNavBar';
import { Chats } from './Chats';

// Styles
import styles from './LeftColumn.module.scss'

export const LeftColumn = () => {

  return (
    <div className={styles.main_container}>
      <LeftNavBar />
      <Chats />
    </div>
  )
}