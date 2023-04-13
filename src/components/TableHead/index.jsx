import { startOfWeek, format, addDays } from 'date-fns';

import styles from './../Calendar/Calendar.module.sass';
const { weekDay } = styles;

const TableHead = () => {
  // const weekStartDate = startOfWeek(activeDate);
  const weekDays = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  // for (let day = 0; day < 7; day++) {
  //   weekDays.push(format(addDays(weekStartDate, day), 'EEEEE'));
  // }

  return (
    <thead>
      <tr className={weekDay}>
        {weekDays.map((day, index) => (
          <th key={index}>{day}</th>
        ))}
      </tr>
    </thead>
  );
};

export default TableHead;
