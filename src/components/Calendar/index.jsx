import { useState } from 'react';
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
} from 'date-fns';
import TableHead from '../TableHead';
import Month from '../Month';
import DatesTable from '../DatesTable';
import styles from './Calendar.module.sass';
import classNames from 'classnames';

const {
  dateInput,
  calendarWrapper,
  sideWrapper,
  calendarContainer,
  leftSide,
  showedDate,
  showedWeekDay,
} = styles;

const WEEK_DAYS = [
  'SUNDAY',
  'MONDAY',
  'TUESDAY',
  'WEDNESDAY',
  'THURSDAY',
  'FRIDAY',
  'SATURDAY',
];

const Calendar = () => {
  const [inputValue, setInputValue] = useState(
    format(new Date(), 'yyyy-MM-dd')
  );

  const stateDate = new Date(inputValue);

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

  const leftSideClassName = classNames(leftSide, sideWrapper);

  return (
    <article className={calendarContainer}>
      <label>
        <input
          className={dateInput}
          type="date"
          value={inputValue}
          onChange={({ target: { value } }) => setInputValue(value)}
        />
      </label>
      <div className={calendarWrapper}>
        <div className={leftSideClassName}>
          <p className={showedWeekDay}>
            {WEEK_DAYS[new Date(inputValue).getDay()]}
          </p>
          <p className={showedDate}>{new Date(inputValue).getDate()}</p>
        </div>
        <div className={sideWrapper}>
          <Month activeDate={new Date(inputValue)} />
          <table>
            <TableHead />
            <DatesTable
              stateDate={stateDate}
              setInputValue={setInputValue}
              daysArray={getMonthDays(new Date(inputValue))}
            />
          </table>
        </div>
      </div>
    </article>
  );
};

export default Calendar;
