import Express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import "dotenv/config";
import { router } from "./routes";

const PORT = process.env.PORT || 3001;
export const app = Express();
app.use(Express.json());

const corsOptions = {
  origin: true,
  credentials: true,
};
app.use(cors(corsOptions));

app.use(cookieParser());

app.get("/test", (req, res) => {
  res.send("Test route working");
});

app.use(router);

app.listen(PORT, () => console.log(`App corriendo en el puerto ${PORT}`));

export default app;
