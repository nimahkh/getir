import 'dotenv/config';
const config = {
    mongo_url : process.env.DATABASE_URL,
    port: process.env.PORT,
    database: process.env.DATABASE
}

export default config