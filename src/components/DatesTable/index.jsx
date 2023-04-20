import classNames from 'classnames';
import {
  format,
  getDate,
  startOfMonth,
  startOfWeek,
  getWeek,
  getYear,
  addDays,
  parse,
  getWeeksInMonth,
  isSameDay,
  isSameMonth,
} from 'date-fns';

import styles from './DatesTable.module.sass';

const { tbody, selected, anotherMonth } = styles;

const DatesTable = ({ stateDate, setInputValue }) => {
  const getMonthDays = (selectedDate) => {
    const startWeek = getWeek(startOfMonth(selectedDate));
    const endWeek = startWeek + getWeeksInMonth(selectedDate) - 1;
    const monthDays = [];

    for (let i = startWeek; i <= endWeek; i++) {
      const weekDays = [];

      let startWeekDay = startOfWeek(
        parse(`${i}`, 'w', new Date(getYear(selectedDate), 0, 1))
      );

      for (let j = 0; j < 7; j++) {
        weekDays.push(getDate(addDays(startWeekDay, j)));
      }
      monthDays.push(weekDays);
    }
    return monthDays;
  };

  const startWeek = getWeek(startOfMonth(stateDate));

  const setClass = (w, d) => {
    const genDate = parse(
      `${stateDate.getFullYear()} ${startWeek + w}`,
      'Y w',
      new Date()
    );
    const currentDate = addDays(genDate, d);
    return classNames({
      [anotherMonth]: !isSameMonth(currentDate, stateDate),
      [selected]: isSameDay(currentDate, stateDate),
    });
  };

  const daysArray = getMonthDays(stateDate);

  return (
    <tbody className={tbody}>
      {daysArray.map((w, weekIndex) => (
        <tr key={weekIndex}>
          {w.map((d, dayIndex) => (
            <td
              className={setClass(weekIndex, dayIndex)}
              key={dayIndex}
              onClick={() =>
                setInputValue(
                  format(
                    new Date(stateDate.getFullYear(), stateDate.getMonth(), d),
                    'yyyy-MM-dd'
                  )
                )
              }
            >
              <div>{d}</div>
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  );
};

export default DatesTable;
