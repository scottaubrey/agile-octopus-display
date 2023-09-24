type TariffCharge = {
  start: Date;
  end: Date;
  amount: number;
};

interface TariffChargeRepository {
  getChargesBetween(start: Date, end: Date): Promise<TariffCharge[]>;
  getMostRecentDay(): Promise<Date>;
}
