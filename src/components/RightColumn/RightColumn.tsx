import { RightNavBar } from "./RightNavBar";
import { MainContent } from "./MainContent";
import { InputMessage } from "./InputMessage";

import styles from './RightColumn.module.scss';
import { Divider } from "@mui/material";

export const RightColumn:React.FC = () => {

  return (
    <div className={styles.main_container}>
      <RightNavBar />
      <MainContent />
      <Divider sx={{ backgroundColor: '#e4e4e4' }} />
      <InputMessage />
    </div>
  )
}