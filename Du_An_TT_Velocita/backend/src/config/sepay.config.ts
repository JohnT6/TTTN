import dotenv from 'dotenv';
dotenv.config();

export const SEPAY_CONFIG = {
  BANK_ID: process.env.SEPAY_BANK_ID || '',
  ACCOUNT_NO: process.env.SEPAY_ACCOUNT_NO || '',
  ACCOUNT_NAME: process.env.SEPAY_ACCOUNT_NAME || '',
  WEBHOOK_SECRET: process.env.SEPAY_WEBHOOK_SECRET || '',
  QR_TEMPLATE: 'compact',
};
