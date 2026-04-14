export const verificationEmail = `
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
        {verificationCode}
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

export const resetPasswordEmail = () => `
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
        color: #ef4444;
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
        margin-bottom: 20px;
      ">
        We received a request to reset your password. Click the button below to continue.
      </p>

      <a href="http://localhost:5173/reset-password/{resetToken}"
        style="
          display: inline-block;
          padding: 12px 20px;
          background: #ef4444;
          color: #ffffff;
          text-decoration: none;
          border-radius: 8px;
          font-weight: bold;
          margin-bottom: 20px;
        ">
        Reset Password
      </a>

      <p style="
        margin-top: 25px;
        font-size: 12px;
        color: #6b7280;
      ">
        This link will expire soon. If you didn’t request this, you can ignore this email.
      </p>

    </div>
  </div>
`;
