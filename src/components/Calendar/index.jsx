import { useState } from 'react';
import { format } from 'date-fns';
import TableHead from '../TableHead';
import Month from '../Month';
import DatesTable from '../DatesTable';
import styles from './Calendar.module.sass';
import classNames from 'classnames';
import WEEK_DAYS from '../../constants';

const {
  dateInput,
  calendarWrapper,
  sideWrapper,
  calendarContainer,
  leftSide,
  showedDate,
  showedWeekDay,
} = styles;

const Calendar = () => {
  const [inputValue, setInputValue] = useState(
    format(new Date(), 'yyyy-MM-dd')
  );

  const stateDate = new Date(inputValue);

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
          <p className={showedWeekDay}>{WEEK_DAYS[stateDate.getDay()]}</p>
          <p className={showedDate}>{stateDate.getDate()}</p>
        </div>
        <div className={sideWrapper}>
          <Month activeDate={stateDate} />
          <table>
            <TableHead />
            <DatesTable stateDate={stateDate} setInputValue={setInputValue} />
          </table>
        </div>
      </div>
    </article>
  );
};

export default Calendar;
