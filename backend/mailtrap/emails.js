import { PASSWORD_RESET_REQUEST_TEMPLATE, PASSWORD_RESET_SUCCESS_TEMPLATE, VERIFICATION_EMAIL_TEMPLATE } from './emailTemplates.js'
import { mailtrapClient, sender } from './mailtrap.config.js'

const sendVerificationEmail = async(email, verificationToken)=>{
  const recipient = [{email}]

  try{
    const response = await mailtrapClient.send({
      from:sender,
      to:recipient,
      subject: "Verify your email",
      html: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", verificationToken),
      category: "Email verification"
    })

    console.log("Email sent successfully", response)
  }catch(err){

    throw new Error(err)
  }
}

const sendWelcomeEmail = async (email, name) =>{
  const recipient = [{email}]

  try{
    const response = await mailtrapClient.send({
      from: sender,
      to:recipient,
      template_uuid: "5ef74961-0bb3-48d8-b642-ea59b7cedcef",
      template_variables: {
        "company_info_name": "Madisha Code Lab",
        "name":name,
      }
    })

    console.log("Welcome Email sent successfully", response)
  }catch(err){
    console.error("Error sending welcome email: ", err);
    throw new Error(`Error:, ${err}`)
  }
}

const sendPasswordResetEmail = async (email, resetURL)=>{
  const recipient=[{email}] 
  try{
    const response = await mailtrapClient.send({
      from: sender,
      to:recipient,
      subject: "Reset your password",
      html:PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetURL),
      category: "Password Reset"

    })
  }catch(err){
    console.log(`Error sending password reset email`, err)
    throw new Error(`Error sending password reset email, ${err}`)
  }
}

const sendResetSuccessEmail = async (email)=>{
  const recipient = [{email}]
  try {
    const response = await mailtrapClient.send({
      from: sender,
      to: recipient,
      subject: "Password Reset Successfully",
      html: PASSWORD_RESET_SUCCESS_TEMPLATE,
      category: "Password Reset"
    })
    console.log("Password reset email sent successfully", response)
  } catch (err) {
    console.log("Error in sendPasswordResetEmail ", err)
    throw new Error(`Error in sendPasswordResetEmail, ${err}`)
  }
}

export { sendVerificationEmail, sendWelcomeEmail, sendPasswordResetEmail, sendResetSuccessEmail }