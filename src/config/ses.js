import { SESClient } from '@aws-sdk/client-ses'
import config from './config.js'

const ses = new SESClient({
    region: config.AWS_SES_REGION,
    credentials: {
        accessKeyId: config.AWS_ACCESS_KEY,
        secretAccessKey: config.AWS_SECRET_KEY,
    },
})

export default ses
