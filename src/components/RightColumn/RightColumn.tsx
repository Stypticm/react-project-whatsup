import { RightNavBar } from "./RightNavBar";
import { MainContent } from "./MainContent";
import { InputMessage } from "./InputMessage";

import styles from './RightColumn.module.scss';

export const RightColumn = () => {

  return (
    <div className={styles.main_container}>
      <RightNavBar />
      <MainContent />
      <InputMessage />
    </div>
  )
}