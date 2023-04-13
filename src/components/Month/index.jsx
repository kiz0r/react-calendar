import { format } from 'date-fns';
import styles from './../Calendar/Calendar.module.sass';

const Month = ({ activeDate }) => {
  return <p className={styles.monthField}>{format(activeDate, 'MMMM yyyy')}</p>;
};

export default Month;
