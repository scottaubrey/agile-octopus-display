type TariffCharge = {
  start: Date,
  end: Date,
  amount: number,
};

interface TariffChargeRepository {
  addCharges(charges: TariffCharge[]): Promise<boolean>;
  getChargesForDay(day: Date): Promise<TariffCharge[]>;
  getMostRecentDay(): Promise<Date>;
}
