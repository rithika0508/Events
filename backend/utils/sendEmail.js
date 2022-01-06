const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY)
const sendEmail = (options) => { 
    
const msg = {
    to: options.to,
    from: "rithikavijaykumar@gmail.com",
    subject: options.subject,
    text:"yep",
    html: options.text
}
sgMail
  .send(msg)
  .then(() => {
    console.log('Email sent rithika')
  })
  .catch((error) => {
    console.error(error)
  })
}

module.exports = sendEmail
