import * as Unicons from "@iconscout/react-unicons";
import styles from "./side-tabs.module.css";

export const SideTabs = () => {
  return (
    <nav className={styles.sideTabs}>
      <button className={[styles.tab, styles.activeTab].join(' ')}>
        <Unicons.UilCalender />
      </button>
      <button className={styles.tab}>
        <Unicons.UilSearch />
      </button>
      <button className={styles.tab}>
        <Unicons.UilLightbulbAlt />
      </button>
    </nav>
  );
};
