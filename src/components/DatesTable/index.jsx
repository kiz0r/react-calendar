import classNames from 'classnames';
import {
  format,
  startOfMonth,
  getWeek,
  addDays,
  parse,
  isSameDay,
  isSameMonth,
} from 'date-fns';

import styles from './DatesTable.module.sass';

const { tbody, selected, anotherMonth } = styles;

const DatesTable = ({ daysArray, stateDate, setInputValue }) => {
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
