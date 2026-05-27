export const verificationEmailTemplate = (verificationCode) => `
  <div style="
    font-family: Arial, sans-serif;
    background: #0f172a;
    padding: 40px 0;
  ">
    <div style="
      max-width: 500px;
      margin: auto;
      background: #111827;
      padding: 30px;
      border-radius: 12px;
      text-align: center;
      color: #ffffff;
      border: 1px solid #1f2937;
    ">
      
      <h1 style="
        color: #22c55e;
        margin-bottom: 10px;
      ">
        Chat App
      </h1>

      <p style="
        font-size: 16px;
        color: #d1d5db;
        margin-bottom: 25px;
      ">
        Verify your email to continue
      </p>

      <div style="
        font-size: 28px;
        letter-spacing: 6px;
        font-weight: bold;
        background: #0b1220;
        padding: 15px;
        border-radius: 10px;
        display: inline-block;
        color: #ffffff;
        border: 1px solid #22c55e;
      ">
        ${verificationCode}
      </div>

      <p style="
        margin-top: 25px;
        font-size: 13px;
        color: #9ca3af;
      ">
        This code will expire soon. If you didn’t request this, ignore this email.
      </p>

    </div>
  </div>
`;
export const resetPasswordEmailTemplate = (resetToken, API_URL) => `
  <div style="
    font-family: Arial, sans-serif;
    background: #0f172a;
    padding: 40px 0;
  ">
    <div style="
      max-width: 500px;
      margin: auto;
      background: #111827;
      padding: 30px;
      border-radius: 12px;
      text-align: center;
      color: #ffffff;
      border: 1px solid #1f2937;
    ">
      
      <h1 style="
        color: #22c55e;
        margin-bottom: 10px;
      ">
        Chat App
      </h1>

      <p style="
        font-size: 16px;
        color: #d1d5db;
        margin-bottom: 25px;
      ">
        Reset your password
      </p>

      <p style="
        font-size: 14px;
        color: #9ca3af;
        margin-bottom: 25px;
      ">
        We received a request to reset your password. Click the button below to continue.
      </p>

      <a href="${API_URL}/reset-password/${resetToken}"
        style="
          display: inline-block;
          padding: 14px 24px;
          background: #22c55e;
          color: #0b1220;
          text-decoration: none;
          border-radius: 10px;
          font-weight: bold;
          font-size: 15px;
        ">
        Reset Password
      </a>

      <p style="
        font-size: 12px;
        color: #6b7280;
        margin-top: 15px;
      ">
        Or copy and paste this link:
      </p>

      <p style="
        font-size: 12px;
        color: #22c55e;
        word-break: break-all;
      ">
        http://localhost:5173/reset-password/${resetToken}
      </p>

      <p style="
        margin-top: 25px;
        font-size: 13px;
        color: #9ca3af;
      ">
        This link will expire soon. If you didn’t request this, ignore this email.
      </p>

    </div>
  </div>
`;

export const passwordChangedEmailTemplate = () => `
  <div style="
    font-family: Arial, sans-serif;
    background: #0f172a;
    padding: 40px 0;
  ">
    <div style="
      max-width: 500px;
      margin: auto;
      background: #111827;
      padding: 30px;
      border-radius: 12px;
      text-align: center;
      color: #ffffff;
      border: 1px solid #1f2937;
    ">
      
      <h1 style="
        color: #22c55e;
        margin-bottom: 10px;
      ">
        Chat App
      </h1>

      <p style="
        font-size: 18px;
        font-weight: bold;
        color: #22c55e;
        margin-bottom: 15px;
      ">
        Password Updated Successfully
      </p>

      <p style="
        font-size: 14px;
        color: #d1d5db;
        margin-bottom: 25px;
        line-height: 1.5;
      ">
        Your password has been successfully changed.  
        If this was you, you can safely ignore this email.
      </p>

      <div style="
        width: 100%;
        padding: 14px;
        background: #0b1220;
        border-radius: 10px;
        border: 1px solid #22c55e;
        color: #9ca3af;
        font-size: 13px;
      ">
        If you did NOT make this change, please reset your password immediately.
      </div>

      <p style="
        margin-top: 25px;
        font-size: 12px;
        color: #6b7280;
      ">
        This is an automated security message from Chat App.
      </p>

    </div>
  </div>
`;
