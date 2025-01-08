import { config } from "dotenv";
config();
import https from "https";
import currencyapi from "@everapi/currencyapi-js";

const converterClient = new currencyapi(process.env.FX_API_KEY);

export const initializePaystackTransaction = async (req, res, next) => {
  //redirect, amount, email
  const amount = Math.round(Number(req?.body?.amount));
  if (!amount || amount === NaN || amount === null)
    return res.json({ status: "false", message: "invalid amount format" });

  const { email } = req?.body;
  if (!email)
    return res.json({
      status: "false",
      message: "invalid or absent email address",
    });

  const { data: fxData } = await converterClient.latest({
    base_currency: "GBP",
    currencies: "NGN",
  });

  const convertedAmount = Math.round(fxData["NGN"].value * amount);

  const params = {
    email,
    amount: `${convertedAmount}00`,
  };

  const options = {
    hostname: "api.paystack.co",
    port: 443,
    path: "/transaction/initialize",
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
      "Content-Type": "application/json",
    },
  };

  const transactionReq = https
    .request(options, (res) => {
      let data = "";

      res.on("data", (chunk) => {
        data += chunk;
      });

      res.on("end", () => {
        req.initSuccessful = true;
        req.initData = data;
        req.initData = { ...req.initData, status: true, message: "successful" };
        next();
      });
    })
    .on("error", (error) => {
      console.error(error);
      req.initSuccessful = false;
      req.initData = { data: false };
      next();
    });

  transactionReq.write(JSON.stringify(params));
  transactionReq.end();
};
