import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import { createProxyMiddleware } from "http-proxy-middleware";

const PORT = process.env.PORT;
const CAT_API_URL = process.env.CAT_API_URL;
const CAT_API_KEY = process.env.CAT_API_KEY!;
const CLIENT_BASE_URL = process.env.APP_BASE_URL;

const app = express();

app.get("/", (req: Request, res: Response, next: NextFunction) => {
  res.send("This is a proxy service which proxies to The Cat API.");
});

app.use("/thecatapi", createProxyMiddleware({
  target: CAT_API_URL,
  changeOrigin: true,
  headers: {
    "x-api-key": CAT_API_KEY
  },
  pathRewrite: {
    [`^/thecatapi`]: "",
  },
}));

app.use(cors({
  origin: CLIENT_BASE_URL,
  optionsSuccessStatus: 200,
}));

app.listen(PORT, () => {
  console.log(`Starting Proxy at ${PORT}`);
});
