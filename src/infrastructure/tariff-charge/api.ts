import { Client, ProductCode, TariffCode } from "../../agile-octopus-api/client";

`E-1R-$OCTOPUS_PRODUCTCODE-$OCTOPUS_REGIONCODE`

const tariffSort = (a: TariffCharge, b: TariffCharge) => {
  if (a.start < b.start) {
    return -1;
  }
  if (a.start > b.start) {
    return 1;
  }
  return 0
}

class ApiTariffChargeRepository implements TariffChargeRepository {
  constructor(
    private api: Client,
    private productCode: ProductCode,
    private regionCode: string
  ) {}

  getTariffCode(): string {
    return `E-1R-${this.productCode}-${this.regionCode}`;
  }

  async getChargesBetween(start: Date, end: Date): Promise<TariffCharge[]> {
    return (await this.api.listTarrifCharges(
      this.productCode,
      this.getTariffCode(),
      {
        periodFrom: start,
        periodTo: end
      }
    )).map(({amountIncVat, start, end}) => ({ amount: amountIncVat, start, end }))
    .sort(tariffSort);
  }

  async getMostRecentDay(): Promise<Date> {
    const result = await this.api.listTarrifCharges(
      this.productCode,
      this.getTariffCode(),
      { pageSize: 1 }
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
  tariffCode: TariffCode
) => new ApiTariffChargeRepository(api, productCode, tariffCode);
