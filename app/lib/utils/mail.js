import { transporter } from "../config/NodeMailler";

export const mail = async ({ to, subject, body, from }) => {
  try {
    await transporter.sendMail({
      from,
      to,
      subject,
      html: body,
    });
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};
