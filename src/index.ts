import './alias';
import app from './app';
import dotenv from 'dotenv';

dotenv.config();
const PORT = process.env.PORT || "8000";

app.listen(PORT, () => {
  console.log(`server running on port: ${PORT}`);
}).on("error", (error) => {
  throw new Error(error.message);
});
