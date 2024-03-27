import "dotenv/config";
import Express from "express";
import cors from "cors";
import { router } from "./routes";
import cookieParser from "cookie-parser"
import { jwtVerifier } from "./middlewares/session";

const PORT = process.env.PORT;
const app = Express();
app.use(Express.json());
app.use(cookieParser())

app.use(cors());

app.use(router);


app.listen(PORT, () => console.log(`App corriendo en el puerto ${PORT}`));
