import * as Unicons from "@iconscout/react-unicons";
import styles from "./side-tabs.module.css";

export const SideTabs = () => {
  return (
    <nav className={styles.sideTabs}>
      <button className="active">
        <Unicons.UilCalender />
      </button>
      <button>
        <Unicons.UilSearch />
      </button>
      <button>
        <Unicons.UilLightbulbAlt />
      </button>
    </nav>
  );
};
