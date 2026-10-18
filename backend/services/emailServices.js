import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const escapeHtml = (value = "") =>
  String(value).replace(
    /[&<>"']/g,
    (char) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;",
      })[char],
  );

export const sendClientEmail = async ({ to, subject, message }) => {
  const safeMessage = escapeHtml(message).replace(/\n/g, "<br>");

  const { data, error } = await resend.emails.send({
    from: process.env.EMAIL_FROM,
    to,
    subject,
    text: message,
    html: `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:auto;color:#111827;line-height:1.7">
        <h2 style="color:#dc2626">Jack Merchants Imports</h2>
        <div>${safeMessage}</div>
        <hr style="border:0;border-top:1px solid #e5e7eb;margin-top:28px" />
        <p style="font-size:12px;color:#6b7280">
          Jack Merchants Imports — Your trusted vehicle import partner.
        </p>
      </div>
    `,
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
};
