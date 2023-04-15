import styles from './../Calendar/Calendar.module.sass';
const { weekDay } = styles;

const TableHead = () => {
  const weekDays = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

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
