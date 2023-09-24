import { SideTabs } from "@/components/side-tabs/side-tabs";
import styles from "./page.module.css";
import { TimeTable } from "@/components/time-table/time-table";

export default async function Home() {
  const data = await fetch('http://localhost:3000/api/tariff').then(async (response) => response.json()) as TariffCharge[];
  const mappedDate = data.map((tariff) => ({
    period: `${String(new Date(tariff.start).getHours()).padStart(2, '0')}:${String(new Date(tariff.start).getMinutes()).padStart(2, '0')}`,
    amount: tariff.amount,
  }));
  return (
    <>
      <main className={styles.display}>
        <SideTabs />
        <section className={styles.mainView}>
          <TimeTable data={mappedDate} />
        </section>
      </main>
    </>
  );
}
