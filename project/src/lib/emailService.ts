import brevo from '@getbrevo/brevo';

// Brevo Configuration
const transactionalEmailApi = new brevo.TransactionalEmailsApi();
transactionalEmailApi.setApiKey(brevo.TransactionalEmailsApiApiKeys.apiKey, import.meta.env.VITE_BREVO_API_KEY);

export async function sendEmailNotification(queryData: {
  name: string;
  email: string;
  phone: string;
  package_interest: string;
  message: string;
}) {
  try {
    const recipientEmail = import.meta.env.VITE_RECIPIENT_EMAIL;
    if (!recipientEmail) {
      throw new Error('RECIPIENT_EMAIL not configured');
    }

    const emailContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #2c5aa0;">New Query from Serenity Haven</h2>
        
        <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <p><strong>Name:</strong> ${queryData.name}</p>
          <p><strong>Email:</strong> <a href="mailto:${queryData.email}">${queryData.email}</a></p>
          <p><strong>Package Interest:</strong> ${queryData.package_interest || 'Not specified'}</p>
        </div>

        <div style="margin: 20px 0;">
          <h3>Message:</h3>
          <p style="white-space: pre-wrap; background-color: #f9f9f9; padding: 15px; border-left: 4px solid #2c5aa0;">
            ${queryData.message}
          </p>
        </div>

        <hr style="border: none; border-top: 1px solid #ddd; margin: 30px 0;" />
        <p style="color: #666; font-size: 12px;">
          <em>Submitted at: ${new Date().toLocaleString()}</em>
        </p>
      </div>
    `;

    const sendSmtpEmail = {
      to: [{ email: recipientEmail }],
      replyTo: { email: queryData.email, name: queryData.name },
      sender: { name: 'Serenity Haven', email: import.meta.env.VITE_EMAIL_USER },
      subject: `New Query: ${queryData.name} - ${queryData.package_interest}`,
      htmlContent: emailContent
    };

    await transactionalEmailApi.sendTransacEmail(sendSmtpEmail);

    console.log('Email sent successfully via Brevo');
    return { success: true };
  } catch (error) {
    console.error('Email sending error:', error);
    throw new Error('Failed to send email notification');
  }
}