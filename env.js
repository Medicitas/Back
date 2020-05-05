import dotenv from 'dotenv';

dotenv.config();


export default {
  database_url: process.env.DATABASE_URL || 'postgres://postgres:admin@localhost:5432/medicitasdb',
  test_database_url: process.env.TEST_DATABASE_URL || 'postgres://postgres:admin@localhost:5432/medicitasdb',
  secret: process.env.SECRET || "carlospapasitoasaustretodoloriko",
  port: process.env.PORT || 7777,
  environment: process.env.NODE_ENV,

}
