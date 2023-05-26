import { Chats } from './Chats';
import { LeftNavBar } from './LeftNavBar';
import { Search } from './Search';

import styles from './LeftColumn.module.scss'
  
export const LeftColumn = () => {
  return (
    <div className={styles.main_container}>
        <LeftNavBar />
        <Search />
        <Chats />
    </div>
  )
}