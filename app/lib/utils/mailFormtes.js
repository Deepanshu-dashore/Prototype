export const otpVerificationTemplate = ({
  otp,
  expire,
  name,
  logoUrl = "https://prototype-alpha-six.vercel.app/CCMate-Logo.jpg",
  companyName = "CC Matting",
  supportEmail = "support@ccmatting.com",
}) => {
  return `
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" 
  "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html lang="en">
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
  <meta name="x-apple-disable-message-reformatting" />
  <title>Email Verification</title>
</head>

<body style="margin:0;padding:0;background-color:#eeeeee;
font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:#212121;">

<table width="100%" cellpadding="0" cellspacing="0" role="presentation" align="center">
  <tr>
    <td align="center" style="padding:24px 12px;">

      <!-- Outer container -->
      <table width="600" cellpadding="0" cellspacing="0" role="presentation"
        style="background:#ffffff;border-radius:6px;overflow:hidden;">

        <!-- Header -->
        <tr>
          <td style="background:#0b3aa4;padding:20px;text-align:center;">
            <img src="${logoUrl}" alt="${companyName}"
              width="150"
              style="display:block;border:none;outline:none;text-decoration:none;margin:auto;" />
          </td>
        </tr>

        <!-- Body -->
        <tr>
          <td style="padding:32px 36px 20px 36px;">

            <h1 style="font-size:20px;font-weight:700;margin:0 0 16px 0;color:#333;">
              Verify your email address
            </h1>

            <p style="font-size:14px;line-height:22px;margin:0 0 14px 0;">
              Hello <strong>${name || "User"}</strong>,
            </p>

            <p style="font-size:14px;line-height:22px;margin:0 0 20px 0;">
              We received a request to verify your email address for your
              <strong>${companyName}</strong> account.
              Please enter the verification code below to continue.
            </p>

            <!-- OTP Section -->
            <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
              <tr>
                <td align="center" style="padding:20px 0;">
                  <p style="font-size:13px;font-weight:600;margin:0 0 8px 0;">
                    Verification Code
                  </p>
                  <div style="
                    display:inline-block;
                    padding:14px 26px;
                    font-size:32px;
                    font-weight:700;
                    letter-spacing:6px;
                    background:#eef3ff;
                    color:#0b3aa4;
                    border-radius:6px;">
                    ${otp || "XXXXXX"}
                  </div>
                  <p style="font-size:12px;margin:10px 0 0 0;color:#555;">
                    (This code is valid for ${expire || "a limited time"})
                  </p>
                </td>
              </tr>
            </table>

            <p style="font-size:13px;line-height:20px;margin:20px 0 0 0;">
              If you did not request this verification, you can safely ignore
              this email. No further action is required.
            </p>

          </td>
        </tr>

        <!-- Divider -->
        <tr>
          <td>
            <hr style="border:none;border-top:1px solid #e6e6e6;margin:0;" />
          </td>
        </tr>

        <!-- Security note -->
        <tr>
          <td style="padding:18px 36px;">
            <p style="font-size:12px;line-height:18px;color:#555;margin:0;">
              ${companyName} will never ask you to share your password, OTP,
              credit card, or banking details via email.
            </p>
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="background:#f8f9fb;padding:16px;text-align:center;">
            <p style="font-size:12px;color:#777;margin:0;">
              Need help? Contact us at
              <a href="mailto:${supportEmail}" style="color:#0b3aa4;text-decoration:underline;">
                ${supportEmail}
              </a>
            </p>
            <p style="font-size:11px;color:#999;margin:8px 0 0 0;">
              © 2026 ${companyName}. All rights reserved.
            </p>
          </td>
        </tr>

      </table>
    </td>
  </tr>
</table>

</body>
</html>
`;
};
