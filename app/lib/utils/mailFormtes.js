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

export const distributorVerificationTemplate = ({
  distributorName,
  companyName = "CC Matting",
  loginEmail,
  password,
  loginUrl,
  logoUrl = "https://prototype-alpha-six.vercel.app/CCMate-Logo.jpg",
  supportEmail = "support@ccmatting.com",
}) => {
  return `
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" 
  "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html lang="en">
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
  <meta name="x-apple-disable-message-reformatting" />
  <title>Distributor Account Approved</title>
</head>

<body style="margin:0;padding:0;background-color:#eeeeee;
font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:#212121;">

<table width="100%" cellpadding="0" cellspacing="0" role="presentation" align="center">
  <tr>
    <td align="center" style="padding:24px 12px;">

      <!-- Main Container -->
      <table width="600" cellpadding="0" cellspacing="0" role="presentation"
        style="background:#ffffff;border-radius:6px;overflow:hidden;">

        <!-- Header -->
        <tr>
          <td style="background:#0b3aa4;padding:20px;text-align:center;">
            <img src="${logoUrl}" alt="${companyName}"
              width="150"
              style="display:block;border:none;outline:none;margin:auto;" />
          </td>
        </tr>

        <!-- Content -->
        <tr>
          <td style="padding:32px 36px;">

            <h1 style="font-size:20px;font-weight:700;margin:0 0 16px 0;color:#333;">
              Distributor Account Approved
            </h1>

            <p style="font-size:14px;line-height:22px;margin:0 0 14px 0;">
              Hello <strong>${distributorName}</strong>,
            </p>

            <p style="font-size:14px;line-height:22px;margin:0 0 18px 0;">
              We are pleased to inform you that your distributor account with
              <strong>${companyName}</strong> has been successfully verified and approved by our team.
            </p>

            <p style="font-size:14px;line-height:22px;margin:0 0 22px 0;">
              You can now log in to the distributor portal using the credentials below.
            </p>

            <!-- Credentials Box -->
            <table width="100%" cellpadding="0" cellspacing="0" role="presentation"
              style="background:#f6f8fb;border-radius:6px;">
              <tr>
                <td style="padding:16px 20px;font-size:13px;">
                  <p style="margin:0 0 6px 0;">
                    <strong>Login Email:</strong> ${loginEmail}
                  </p>
                  <p style="margin:0;">
                    <strong>Password:</strong> ${password}
                  </p>
                </td>
              </tr>
            </table>

            <!-- CTA -->
            <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
              <tr>
                <td align="center" style="padding:26px 0;">
                  <a href="${loginUrl}"
                    target="_blank"
                    style="
                      background:#0b3aa4;
                      color:#ffffff;
                      padding:12px 26px;
                      font-size:14px;
                      font-weight:600;
                      text-decoration:none;
                      border-radius:4px;
                      display:inline-block;">
                    Access Distributor Portal
                  </a>
                </td>
              </tr>
            </table>

            <p style="font-size:13px;line-height:20px;margin:0;">
              For security reasons, we strongly recommend that you log in and change
              your password immediately after your first login.
            </p>

          </td>
        </tr>

        <!-- Divider -->
        <tr>
          <td>
            <hr style="border:none;border-top:1px solid #e6e6e6;margin:0;" />
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="background:#f8f9fb;padding:16px;text-align:center;">
            <p style="font-size:12px;color:#777;margin:0;">
              If you have any questions, contact us at
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

export const newDistributorApplicationTemplate = ({
  apply,
  companyName = "CC Matting",
  distributorCompany,
  distributorEmail,
  distributorPhone,
  verificationUrl,
  logoUrl = "https://prototype-alpha-six.vercel.app/CCMate-Logo.jpg",
}) => {
  return `
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" 
  "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html lang="en">
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
  <meta name="x-apple-disable-message-reformatting" />
  <title>New Distributor Application</title>
</head>

<body style="margin:0;padding:0;background-color:#eeeeee;
font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:#212121;">

<table width="100%" cellpadding="0" cellspacing="0" role="presentation" align="center">
  <tr>
    <td align="center" style="padding:24px 12px;">

      <!-- Container -->
      <table width="600" cellpadding="0" cellspacing="0" role="presentation"
        style="background:#ffffff;border-radius:6px;overflow:hidden;">

        <!-- Header -->
        <tr>
          <td style="background:#0b3aa4;padding:18px;text-align:center;">
            <img src="${logoUrl}" alt="${companyName}"
              width="150"
              style="display:block;border:none;margin:auto;" />
          </td>
        </tr>

        <!-- Content -->
        <tr>
          <td style="padding:30px 36px;">

            <h1 style="font-size:20px;font-weight:700;margin:0 0 16px;color:#333;">
              New Distributor Application Received
            </h1>

            <p style="font-size:14px;line-height:22px;margin:0 0 18px;">
              A new distributor application has been submitted and requires verification.
            </p>

            <!-- Applicant Details -->
            <table width="100%" cellpadding="0" cellspacing="0" role="presentation"
              style="background:#f6f8fb;border-radius:6px;">
              <tr>
                <td style="padding:16px 20px;font-size:13px;">
                  <p style="margin:0 0 6px;"><strong>Distributor Name:</strong> ${distributorCompany}</p>
                  <p style="margin:0 0 6px;"><strong>Email:</strong> ${distributorEmail}</p>
                  <p style="margin:0;"><strong>Contact Number:</strong> ${distributorPhone}</p>
                  <p style="margin:0 0 6px;"><strong>Apply Date:</strong> ${apply}</p>
                </td>
              </tr>
            </table>

            <!-- CTA -->
            <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
              <tr>
                <td align="center" style="padding:26px 0;">
                  <a href="${verificationUrl}"
                    target="_blank"
                    style="
                      background:#0b3aa4;
                      color:#ffffff;
                      padding:12px 28px;
                      font-size:14px;
                      font-weight:600;
                      text-decoration:none;
                      border-radius:4px;
                      display:inline-block;">
                    Review & Verify Distributor
                  </a>
                </td>
              </tr>
            </table>

            <p style="font-size:13px;line-height:20px;margin:0;">
              Please review the submitted details and proceed with approval or rejection
              as per company compliance guidelines.
            </p>

          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="background:#f8f9fb;padding:14px;text-align:center;">
            <p style="font-size:11px;color:#777;margin:0;">
              This is an automated notification from ${companyName}.
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

export const orderCreatedTemplate = ({
  orderId,
  orderDate,
  distributorName,
  totalItems,
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
  <title>Order Confirmation</title>
</head>

<body style="margin:0;padding:0;background-color:#f2f4f8;
font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:#212121;">

<table width="100%" cellpadding="0" cellspacing="0" align="center">
  <tr>
    <td align="center" style="padding:24px 12px;">

      <!-- Main Container -->
      <table width="600" cellpadding="0" cellspacing="0"
        style="background:#ffffff;border-radius:8px;overflow:hidden;">

        <!-- Header -->
        <tr>
          <td style="background:#111827;padding:20px;text-align:center;">
            <img src="${logoUrl}" alt="${companyName}"
              width="150"
              style="display:block;margin:auto;border:none;" />
          </td>
        </tr>

        <!-- Body -->
        <tr>
          <td style="padding:32px 36px;">

            <h1 style="font-size:20px;margin:0 0 16px 0;color:#111827;">
              Order Successfully Created
            </h1>

            <p style="font-size:14px;line-height:22px;margin:0 0 14px 0;">
              Hello <strong>${distributorName || "Distributor"}</strong>,
            </p>

            <p style="font-size:14px;line-height:22px;margin:0 0 20px 0;">
              Your order has been successfully created in our system.
              Below are the order details for your reference.
            </p>

            <!-- Order Summary Box -->
            <table width="100%" cellpadding="0" cellspacing="0"
              style="background:#f9fafb;border:1px solid #e5e7eb;border-radius:6px;">
              <tr>
                <td style="padding:18px;">

                  <p style="margin:0 0 10px 0;font-size:14px;">
                    <strong>Order ID:</strong> ${orderId}
                  </p>

                  <p style="margin:0 0 10px 0;font-size:14px;">
                    <strong>Order Date:</strong> ${orderDate}
                  </p>

                  <p style="margin:0 0 10px 0;font-size:14px;">
                    <strong>Total Items:</strong> ${totalItems}
                  </p>

                </td>
              </tr>
            </table>

            <p style="font-size:13px;line-height:20px;margin:20px 0 0 0;">
              Our operations team will now begin processing your order.
              You will receive further updates once it is dispatched.
            </p>

          </td>
        </tr>

        <!-- Divider -->
        <tr>
          <td>
            <hr style="border:none;border-top:1px solid #e5e7eb;margin:0;" />
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="background:#f9fafb;padding:18px 36px;text-align:center;">
            <p style="font-size:12px;color:#555;margin:0;">
              If you have any questions regarding this order, please contact
              <a href="mailto:${supportEmail}"
                 style="color:#111827;text-decoration:underline;">
                ${supportEmail}
              </a>
            </p>
            <p style="font-size:11px;color:#9ca3af;margin:8px 0 0 0;">
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

export const distributorOrderStatusTemplate = ({
  distributorName,
  orderId,
  orderDate,
  totalItems,
  status,
  logoUrl = "https://prototype-alpha-six.vercel.app/CCMate-Logo.jpg",
  companyName = "CC Matting",
  supportEmail = "support@ccmatting.com",
  brandColor = "#0b3aa4",
}) => {
  const statusStyleMap = {
    CREATED: { bg: "#e0f2fe", text: "#0369a1", border: "#bae6fd" },
    APPROVED: { bg: "#dcfce7", text: "#166534", border: "#bbf7d0" },
    PROCESSING: { bg: "#fef3c7", text: "#92400e", border: "#fde68a" },
    SHIPMENT: { bg: "#ede9fe", text: "#5b21b6", border: "#ddd6fe" },
    DELIVERED: { bg: "#d1fae5", text: "#065f46", border: "#a7f3d0" },
    RECEIVED: { bg: "#d1fae5", text: "#065f46", border: "#a7f3d0" },
    CANCELLED: { bg: "#fee2e2", text: "#991b1b", border: "#fecaca" },
  };

  const currentStatus = statusStyleMap[status?.toUpperCase()] || {
    bg: "#f3f4f6",
    text: "#374151",
    border: "#e5e7eb",
  };

  return `
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN"
  "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html lang="en">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<meta name="x-apple-disable-message-reformatting" />
<title>Order Status Update</title>
</head>

<body style="margin:0;padding:0;background-color:#f3f4f6;
font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:#111827;">

<table width="100%" cellpadding="0" cellspacing="0" align="center">
<tr>
<td align="center" style="padding:32px 12px;">

<table width="600" cellpadding="0" cellspacing="0"
style="background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 8px 28px rgba(0,0,0,0.06);">

<!-- HEADER -->
<tr>
<td style="background:${brandColor};padding:24px;text-align:center;">
  <img src="${logoUrl}" alt="${companyName}"
    width="160"
    style="display:block;margin:auto;border:none;" />
</td>
</tr>

<!-- BODY -->
<tr>
<td style="padding:40px 42px;">

  <h1 style="font-size:22px;margin:0 0 20px 0;color:#111827;">
    Order Status Notification
  </h1>

  <p style="font-size:14px;line-height:22px;margin:0 0 14px 0;">
    Dear <strong>${distributorName || "Distributor"}</strong>,
  </p>

  <p style="font-size:14px;line-height:22px;margin:0 0 24px 0;color:#374151;">
    This is to inform you that the status of your order has been updated in our system.
    Please review the summary below.
  </p>

  <!-- ORDER SUMMARY CARD -->
  <table width="100%" cellpadding="0" cellspacing="0"
    style="border:1px solid #e5e7eb;border-radius:10px;">
    <tr>
      <td style="padding:22px;">

        <table width="100%" cellpadding="0" cellspacing="0">

          <tr>
            <td style="padding-bottom:12px;font-size:12.25px;">
              <strong>Order ID:</strong> ${orderId}
            </td>
          </tr>

          <tr>
            <td style="padding-bottom:12px;font-size:12.25px;">
              <strong>Order Date:</strong> ${orderDate}
            </td>
          </tr>

          <tr>
            <td style="padding-bottom:12px;font-size:12.25px;">
              <strong>Total Items:</strong> ${totalItems}
            </td>
          </tr>

          <tr>
            <td style="padding-top:6px;font-size:12.25px;">
              <strong>Status:</strong>
              <span style="
                display:inline-block;
                min-width:90px;
                text-align:center;
                padding:3px 6px;
                margin-left:8px;
                font-size:10px;
                font-weight:600;
                border-radius:4px;
                background:${currentStatus.bg};
                color:${currentStatus.text};
                border:1px solid ${currentStatus.border};
                box-shadow:0 1px 2px rgba(0,0,0,0.05);
              ">
                ${status}
              </span>
            </td>
          </tr>

        </table>

      </td>
    </tr>
  </table>

  <p style="font-size:13px;line-height:20px;margin:24px 0 10px 0;color:#4b5563;">
    You may log in to your distributor dashboard to view full order details,
    invoices, and tracking information.
  </p>

  <!-- CTA BUTTON -->
  <table width="100%" cellpadding="0" cellspacing="0">
    <tr>
      <td align="center" style="padding:28px 0 10px 0;">
        <a href="https://prototype-alpha-six.vercel.app/distributor/dashboard/orders"
           style="
            background:${brandColor};
            color:#ffffff;
            padding:14px 30px;
            text-decoration:none;
            font-size:14px;
            font-weight:600;
            border-radius:6px;
            display:inline-block;
            letter-spacing:0.3px;">
          View Order Details
        </a>
      </td>
    </tr>
  </table>

  <p style="font-size:12px;color:#6b7280;margin-top:22px;">
    For any clarification regarding this order update, please contact our support team.
  </p>

</td>
</tr>

<!-- FOOTER -->
<tr>
<td style="background:#f9fafb;padding:20px 36px;text-align:center;border-top:1px solid #e5e7eb;">
  <p style="font-size:12px;color:#555;margin:0;">
    Support:
    <a href="mailto:${supportEmail}"
       style="color:${brandColor};text-decoration:underline;">
      ${supportEmail}
    </a>
  </p>
  <p style="font-size:11px;color:#9ca3af;margin:8px 0 0 0;">
    © ${new Date().getFullYear()} ${companyName}. All rights reserved.
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
