import Express from "express";
import cors from "cors";
import { router } from "./routes";
import cookieParser from "cookie-parser";
import "dotenv/config";

const PORT = process.env.PORT;
const app = Express();
app.use(Express.json());

const corsOptions = {
  origin: "https://tache-beta.vercel.app/",
  credentials: true,
};
app.use(cors(corsOptions));

app.use(cookieParser());

app.use(router);

app.listen(PORT, () => console.log(`App corriendo en el puerto ${PORT}`));

export default app;
