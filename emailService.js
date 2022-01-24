const { EmailAddress } = require('@sendgrid/helpers/classes')
const sendGridMail = require('@sendgrid/mail')
require('dotenv').config()

sendGridMail.setApiKey(process.env.SENDGRID_KEY)

const sendEmail = async (userEmail) => {
    try {
        const message = {
            to: userEmail,
            from: 'lukitmate@gmail.com',
            subject: 'Welcome',
            text: 'Welcome to Disney API',
            html: '<h2>Welcome to Disney API</h2>'
        }
        await sendGridMail.send(message)
        
    } catch (error) {
        throw error
    }
}

module.exports = sendEmail
