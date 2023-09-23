import styles from './time-table.module.css';

export const TimeTable = () => {
  const date = new Date();
  if (date.getMinutes() > 30) {
    date.setMinutes(30);
  } else if (date.getMinutes() < 30) {
    date.setMinutes(0);
  }

  const dateUntil = new Date(date.toISOString());
  dateUntil.setHours(date.getHours()+12);

  const timePeriods = [];
  while (date < dateUntil) {
    timePeriods.push(new Date(date));
    date.setMinutes(date.getMinutes() + 30);
    console.log(date.toISOString());
  }

  return <dl className={styles.timeTable}>
    {timePeriods.map((timePeriod) => <>
      <dt>{String(timePeriod.getHours()).padStart(2, '0')}:{String(timePeriod.getMinutes()).padStart(2, '0')}:</dt>
      <dd>16.23p</dd>
    </>)}
  </dl>;
}
