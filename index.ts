import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import { createProxyMiddleware } from "http-proxy-middleware";

const PORT: number = parseInt(process.env.PORT as string, 10);
const HOST: string = process.env.HOST as string;
const CAT_API_URL: string = process.env.CAT_API_URL as string;
const CAT_API_KEY: string = process.env.CAT_API_KEY as string;
const CLIENT_BASE_URL: string = process.env.APP_BASE_URL as string;

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

app.listen(PORT, HOST, () => {
  console.log(`Starting Proxy at ${HOST}:${PORT}`);
});
