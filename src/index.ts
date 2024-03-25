import "dotenv/config";
import Express from "express";
import cors from "cors";
import { router } from "./routes";
import { logMiddleware } from "./middlewares/log";

const PORT = process.env.PORT;
const app = Express();
app.use(Express.json());

app.use(cors());

app.use(router);

app.listen(PORT, () => console.log(`App corriendo en el puerto ${PORT}`));
