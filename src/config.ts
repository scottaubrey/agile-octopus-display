if (process.env.OCTOPUS_APIKEY === undefined) {
  console.log(`env var "OCTOPUS_APIKEY" not set`);
  process.exit(1);
}
if (process.env.OCTOPUS_PRODUCT_KEY === undefined) {
  console.log(`env var "OCTOPUS_PRODUCT_KEY" not set`);
  process.exit(1);
}
if (process.env.OCTOPUS_REGION_CODE === undefined) {
  console.log(`env var "OCTOPUS_REGION_CODE" not set`);
  process.exit(1);
}
if (process.env.OCTOPUS_MPAN === undefined) {
  console.log(`env var "OCTOPUS_MPAN" not set`);
  process.exit(1);
}
if (process.env.OCTOPUS_SERIAL_NUMBER === undefined) {
  console.log(`env var "OCTOPUS_SERIAL_NUMBER" not set`);
  process.exit(1);
}

export const config = {
  octopus: {
    apiKey: process.env.OCTOPUS_APIKEY,
    productCode: process.env.OCTOPUS_PRODUCT_KEY,
    regionCode: process.env.OCTOPUS_REGION_CODE,
    mpan: process.env.OCTOPUS_MPAN,
    serialNumber: process.env.OCTOPUS_SERIAL_NUMBER,
  },
};
