export type ProductCode = string;
export type TariffCode = string;
export type MeterPointAdministrationNumber = string;
export type MeterSerialNumber = string;

type GetTariffChargesParams = {
  periodFrom?: Date;
  periodTo?: Date;
  pageSize?: number;
};
type GetTariffChargesUrlParams = {
  period_from?: string;
  period_to?: string;
  page_size: number;
};
type TariffCharge = {
  amountExVar: number;
  amountIncVat: number;
  start: Date;
  end: Date;
};
type GetTariffChargesResponse = {
  results: Array<{
    value_exc_vat: number;
    value_inc_vat: number;
    valid_from: string;
    valid_to: string;
  }>;
};

type GetMeterConsumptionParams = {
  periodFrom?: Date;
  periodTo?: Date;
  groupBy?: "hour" | "day" | "week" | "month" | "quarter";
  orderBy?: "recent" | "oldest";
  pageSize?: number;
};
type GetMeterConsumptionUrlParams = {
  period_from?: string;
  period_to?: string;
  group_by?: "hour" | "day" | "week" | "month" | "quarter";
  order_by?: "recent" | "oldest";
  page_size?: number;
};
type MeterConsumption = {
  start: Date;
  end: Date;
  consumption: number;
};
type GetMeterConsumptionResponse = {
  results: MeterConsumption[];
};

export class Client {
  baseUrl = "https://api.octopus.energy";

  constructor(private apiKey: string) {}

  private getAuthorizationHeader(): string {
    return Buffer.from(this.apiKey).toString("base64");
  }

  private async makeGetRequest<ReturnType>(url: string) {
    const headers = new Headers();
    headers.set("Authorization", this.getAuthorizationHeader());
    return fetch(url, { headers }).then(
      (response) => response.json() as ReturnType
    );
  }

  public async listTarrifCharges(
    productCode: ProductCode,
    tariffCode: TariffCode,
    params?: GetTariffChargesParams
  ): Promise<TariffCharge[]> {
    const urlParams: GetTariffChargesUrlParams = {};
    if (params?.periodFrom) {
      urlParams.period_from = params.periodFrom.toISOString();
    }
    if (params?.periodTo) {
      urlParams.period_to = params.periodTo.toISOString();
    }
    if (params?.pageSize) {
      urlParams.page_size = params.pageSize;
    }

    const response = await this.makeGetRequest<GetTariffChargesResponse>(
      `${this.baseUrl}/v1/products/${productCode}/electricity-tariffs/${tariffCode}/standard-unit-rates/?${new URLSearchParams(urlParams).toString()}`
    );

    return response.results.map((tariff) => ({
      amountExVar: tariff.value_exc_vat,
      amountIncVat: tariff.value_inc_vat,
      start: new Date(tariff.valid_from),
      end: new Date(tariff.valid_to),
    }));
  }

  public async getMeterConsumption(
    mpan: MeterPointAdministrationNumber,
    serialNumber: MeterSerialNumber,
    params?: GetMeterConsumptionParams
  ): Promise<MeterConsumption[]> {
    const urlParams: GetMeterConsumptionUrlParams = {};
    if (params?.periodFrom) {
      urlParams.period_from = params.periodFrom.toISOString();
    }
    if (params?.periodTo) {
      urlParams.period_to = params.periodTo.toISOString();
    }
    if (params?.pageSize) {
      urlParams.page_size = params.pageSize;
    }

    const result = await this.makeGetRequest<GetMeterConsumptionResponse>(
      `${this.baseUrl}/v1/electricity-meter-points/${mpan}/meters/${serialNumber}/consumption/?${new URLSearchParams(urlParams).toString()}`,
    );
    return result.results;
  }
}
