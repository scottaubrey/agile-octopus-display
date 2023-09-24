import { NextResponse } from "next/server";
import { Client } from "@/agile-octopus-api/client";
import { config } from "@/config";
import { createApiTariffChargeRepository } from "@/infrastructure/tariff-charge/api";

export const GET = async (request: Request) => {
  const tariffRepo = createApiTariffChargeRepository(
    new Client(config.octopus.apiKey),
    config.octopus.productCode,
    config.octopus.regionCode,
  );

  const start = new Date();
  const end = new Date(start);
  end.setHours(start.getHours()+12);
  const tariffs = await tariffRepo.getChargesBetween(start, end);

  return NextResponse.json(tariffs);
}
