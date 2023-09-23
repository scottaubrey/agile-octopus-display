import { SideTabs } from '@/components/side-tabs/side-tabs'
import styles from './page.module.css'
import { TimeTable } from '@/components/time-table/time-table'

export default function Home() {
  return (
    <>
    <main className={styles.display}>
      <SideTabs/>
      <section className={styles.mainView}>
        <TimeTable/>
      </section>
    </main>
    </>
  )
}
