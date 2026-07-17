import nodemailer from 'nodemailer'
import { env, isSmtpConfigured } from '../config/env.ts'
import { logger } from '../utils/logger.ts'

const transporter = isSmtpConfigured
  ? nodemailer.createTransport({
      host: env.SMTP_HOST,
      port: env.SMTP_PORT,
      auth: { user: env.SMTP_USER, pass: env.SMTP_PASS },
    })
  : null

export async function notifyNewSubmission(subject: string, lines: string[]) {
  if (!transporter) {
    logger.debug({ subject }, 'SMTP not configured — skipping email notification')
    return
  }

  try {
    await transporter.sendMail({
      from: env.SMTP_FROM,
      to: env.NOTIFY_TO_EMAIL,
      subject,
      text: lines.join('\n'),
    })
  } catch (error) {
    logger.warn({ error }, 'Failed to send notification email')
  }
}
