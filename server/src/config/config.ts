import dotenv from 'dotenv';
import path from 'path';

// Load environment variables from .env file
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

interface Config {
  server: {
    port: number;
    host: string;
    nodeEnv: string;
  };
  database: {
    host: string;
    port: number;
    username: string;
    password: string;
    database: string;
    url?: string;
  };
  jwt: {
    secret: string;
    expiration: string;
  };
  email: {
    host: string;
    port: number;
    user: string;
    pass: string;
    from: string;
  };
}

const config: Config = {
  // server: {
  //   port: parseInt(process.env.PORT || '10000', 10),
  //   host: process.env.HOST || '0.0.0.0',
  //   nodeEnv: process.env.NODE_ENV || 'development',
  // },
  // database: {
  //   host: process.env.DB_HOST || 'localhost',
  //   port: parseInt(process.env.DB_PORT || '5432', 10),
  //   username: process.env.DB_USERNAME || 'pradeepkalyan',
  //   password: process.env.DB_PASSWORD || 'Ie4QVOtO9IPfD3NYLk0nhZLpVBx3BYrm',
  //   database: process.env.DB_DATABASE || 'leave_management_odpr',
  //   url: process.env.DATABASE_URL || 'postgresql://pradeepkalyan:Ie4QVOtO9IPfD3NYLk0nhZLpVBx3BYrm@dpg-d0qqb93uibrs73erg1eg-a.oregon-postgres.render.com/leave_management_odpr',
  // },

  server: {
    port: parseInt(process.env.PORT, 10),
    host: process.env.HOST,
    nodeEnv: process.env.NODE_ENV,
  },
  database: {
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT, 10),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
  },

  
  jwt: {
    secret: process.env.JWT_SECRET,
    expiration: process.env.JWT_EXPIRATION,
  },
  email: {
    host: process.env.EMAIL_HOST,
    port: parseInt(process.env.EMAIL_PORT),
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
    from: process.env.EMAIL_FROM,
  },
};

export default config;