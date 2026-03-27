import { Resend } from 'resend';

// Replace 're_your_api_key' with your actual Resend API Key
export const resend = new Resend(process.env.RESEND_API_KEY || 're_wqeabbqpvjtmkias'); 

export const transporter = {
  sendMail: async ({ from, to, subject, html }) => {
    try {
      // If from is not verified, use onboarding@resend.dev for testing
      const sender = from || 'onboarding@resend.dev'; 
      
      const { data, error } = await resend.emails.send({
        from: sender,
        to: Array.isArray(to) ? to : [to],
        subject: subject,
        html: html,
      });

      if (error) {
        throw error;
      }
      return data;
    } catch (error) {
      console.error("Resend Send Error:", error);
      throw error;
    }
  }
};
