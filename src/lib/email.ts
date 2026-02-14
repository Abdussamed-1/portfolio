import { Resend } from "resend";
import { baseURL, person } from "@/resources";

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

const FROM_EMAIL = process.env.NEWSLETTER_FROM_EMAIL || "onboarding@resend.dev";
const FROM_NAME = person.name;

export function isEmailConfigured() {
  return Boolean(process.env.RESEND_API_KEY && resend);
}

export async function sendBulkEmails(to: string[], subject: string, html: string) {
  if (!resend) {
    return { success: false, error: "Email service not configured (RESEND_API_KEY)." };
  }
  const results = await Promise.allSettled(
    to.map((email) =>
      resend.emails.send({
        from: `${FROM_NAME} <${FROM_EMAIL}>`,
        to: [email],
        subject,
        html,
      })
    )
  );
  const failed = results.filter((r) => r.status === "rejected").length;
  return { success: failed === 0, sent: results.length - failed, total: results.length };
}

export function buildWeeklyDigestHtml(newsSummary?: string): string {
  const newsSection = newsSummary
    ? `<p><strong>This week's highlights</strong></p><p>${newsSummary}</p>`
    : "<p>Check the latest updates on the News page.</p>";
  return `
    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
      <h1>Weekly update from ${person.name}</h1>
      <p>Here's your weekly digest.</p>
      ${newsSection}
      <p><a href="${baseURL}/news">Read the full news</a></p>
      <p><a href="${baseURL}/blog">Visit the blog</a></p>
      <hr style="border: none; border-top: 1px solid #eee;" />
      <p style="color: #888; font-size: 12px;">You received this because you subscribed at ${baseURL}/blog</p>
    </div>
  `;
}

export function buildNewPostHtml(postTitle: string, postUrl: string): string {
  return `
    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
      <h1>New blog post</h1>
      <p>${person.name} published a new post:</p>
      <p><strong><a href="${postUrl}">${postTitle}</a></strong></p>
      <p><a href="${baseURL}/blog">See all posts</a></p>
      <hr style="border: none; border-top: 1px solid #eee;" />
      <p style="color: #888; font-size: 12px;">You received this because you subscribed at ${baseURL}/blog</p>
    </div>
  `;
}
