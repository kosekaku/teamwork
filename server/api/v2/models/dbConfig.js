import { Pool, Client } from 'pg';
import dotenv from 'dotenv';

dotenv.config();
// heroku style connection string
// const connectionString = 'postgresql://dbuser:secretpassword@dsomehost:port/mydb'
const pool = new Pool({
  connectionString: process.env.DB_Connection_String,
});

export default pool;