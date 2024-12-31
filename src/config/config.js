import 'dotenv/config'

const _config = {
    PORT: process.env.PORT,
    DATABASE_URL: process.env.DATABASE_URL,
    JWT_SECRET: process.env.JWT_SECRET,
    AWS_SES_REGION: process.env.AWS_SES_REGION,
    AWS_ACCESS_KEY: process.env.AWS_ACCESS_KEY,
    AWS_SECRET_KEY: process.env.AWS_SECRET_KEY,
    SES_SENDER: process.env.SES_SENDER,
}

const config = Object.freeze(_config)

export default config
