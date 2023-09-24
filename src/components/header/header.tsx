import styles from "./header.module.css";

export const Header = ({
  additionalClasses,
}: {
  additionalClasses?: string[];
}) => {
  const classes = additionalClasses
    ? [styles.header, ...additionalClasses]
    : [styles.header];
  return (
    <header className={classes.join(" ")}>
      <aside>Current Price: £0.00</aside>
      <h1>Agile Octopus Display</h1>
      <aside>Cheapest time: 10.30am</aside>
    </header>
  );
};
