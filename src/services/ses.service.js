import path from 'path'
import mjml from 'mjml'
import fs from 'fs'
import mustache from 'mustache'
import { SendEmailCommand } from '@aws-sdk/client-ses'
import ses from '../config/ses.js'
import { fileURLToPath } from 'url'
import config from '../config/config.js'

// Helper to get the current directory in ES Modules
const __dirname = path.dirname(fileURLToPath(import.meta.url))

const sendEmail = async (templateName, subject, data, to = []) => {
    if (!to.length) throw new Error('Recipient list cannot be empty')

    try {
        // Read and render the email template
        const templatePath = path.join(
            __dirname,
            `../mjml/${templateName}.mjml`
        )
        const template = fs.readFileSync(templatePath, 'utf8')
        const renderedTemplate = mustache.render(template, {
            date: new Date().toDateString(),
            name: data.name,
        })

        // Convert MJML to HTML
        const { html } = mjml(renderedTemplate)

        // Email parameters
        const params = {
            Source: config.SES_SENDER,
            Destination: { ToAddresses: to },
            Message: {
                Subject: { Data: subject },
                Body: { Html: { Data: html } },
            },
        }

        // Send the email
        const response = await ses.send(new SendEmailCommand(params))
        console.log('Email sent successfully:', response)
    } catch (error) {
        console.error('Failed to send email:', error)
        throw error
    }
}

export default sendEmail
