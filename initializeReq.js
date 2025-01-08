import { config } from "dotenv";
config();
import https from "https";
import currencyapi from "@everapi/currencyapi-js";

const converterClient = new currencyapi(process.env.FX_API_KEY);

export const initializePaystackTransaction = async (req, res, next) => {};
