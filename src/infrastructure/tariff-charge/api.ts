import { Database } from "bun:sqlite";
import { Client, ProductCode, TariffCode } from "../../api/client";

class ApiTariffChargeRepository implements TariffChargeRepository {
  constructor(
    private api: Client,
    private productCode: ProductCode,
    private tariffCode: TariffCode,
  ) {}

  async getChargesForDay(day: Date): Promise<TariffCharge[]> {
    throw new Error("Method not implemented.");
  }
  async addCharges(charges: TariffCharge[]): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
  async getMostRecentDay(): Promise<Date> {
    const result = await this.api.listTarrifCharges(
      this.productCode,
      this.tariffCode,
      { pageSize: 1 },
    );

    if (result[0].start.toDateString() !== result[0].end.toDateString()) {
      throw new Error("Cannot determine latest day");
    }

    return new Date(result[0].start.toISOString());
  }
}

export const createApiTariffChargeRepository = (
  api: Client,
  productCode: ProductCode,
  tariffCode: TariffCode,
) => new ApiTariffChargeRepository(api, productCode, tariffCode);
