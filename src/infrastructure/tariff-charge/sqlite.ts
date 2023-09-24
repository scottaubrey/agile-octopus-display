import { Database, SQLQueryBindings } from "bun:sqlite";

const Sql = {
  schema: [
    `CREATE TABLE IF NOT EXISTS tariff_charge (
      id INTEGER PRIMARY KEY,
      start TEXT,
      end TEXT,
      amount DECIMAL
    )`,
  ],
  addCharge: "INSERT INTO tariff_charge (start, end, amount) VALUES (?, ?, ?)",
  getChargesForDay: "SELECT * FROM tariff_charge WHERE start > ? AND end < ?",
  getMostRecentDay: "SELECT * FROM tariff_charge ORDER BY end DESC LIMIT 1",
};

type TariffChargeTableRow = {
  id: number;
  start: string;
  end: string;
  amount: number;
};

class SqliteTariffChargeRepository implements TariffChargeRepository {
  constructor(private db: Database) {}

  async getChargesForDay(day: Date): Promise<TariffCharge[]> {
    throw new Error("Method not implemented.");
  }

  async addCharges(charges: TariffCharge[]): Promise<boolean> {
    throw new Error("Method not implemented.");
  }

  async getMostRecentDay(): Promise<Date> {
    const query = this.db.query<TariffChargeTableRow, []>(Sql.getMostRecentDay);
    const latestCharge = query.get();
    if (latestCharge === null) {
      throw new Error("Cannot find any data");
    }

    return new Date(latestCharge.end);
  }
}

export const createSqliteTariffChargeRepository = (database: Database) => {
  database.exec(Sql.schema[0]);

  return new SqliteTariffChargeRepository(database);
};
