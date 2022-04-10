import dotenv from "dotenv";
import { app } from "./src/app";
dotenv.config();
console.log(process.env.PORT);
const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`정상적으로 서버를 시작하였습니다.  http://localhost:${PORT}`);
});
