import dotenv from "dotenv";
import path from "path";

// DB Connection 전에 환경변수 설정을 위해 파일 분리
const __dirname = path.resolve();
dotenv.config({ path: path.join(__dirname, ".env.local") });
