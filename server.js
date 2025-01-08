import express, { urlencoded } from "express";
import cors from "cors";
import { initializePaystackTransaction } from "./initializeReq.js";

const app = express();

const corsOptions = {
  origin: process.env.ALLOWED_SERVER,
  methods: "GET,POST,OPTIONS",
  allowedHeaders: "Content-Type,Authorization",
};

app.use(cors(corsOptions));
app.use(urlencoded({ extended: true }));
app.use(express.json());

app
  .route("/initialize-payment")
  .post(initializePaystackTransaction, async (req, res) => {
    if (req?.initSuccessful) {
      return res.json(await JSON.parse(req?.initData));
    }
    res.json({ status: "false", message: "unsuccessful" });
  });

app.use("/", (req, res) => {
  res.json({ status: "false", message: "invalid route" });
});

app.listen(process.env.PORT || 3200, () => {
  console.log("app is live");
});
