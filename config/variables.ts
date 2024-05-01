import dotenv from 'dotenv';
dotenv.config();

export const config = {
    port: process.env.PORT,
    base_url: process.env.BASE_URL,

    database: {
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        db_name: process.env.DB_NAME,
        db_cnn: process.env.DB_CNN
    },

    token: {
        secret_jwt_seed: process.env.SECRET_JWT_SEED,
        expires_in: process.env.EXPIRES_IN
    }
}