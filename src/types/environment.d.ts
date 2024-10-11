/* eslint-disable @typescript-eslint/consistent-type-definitions */

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      MONGODB_URI: string;
      NEXTAUTH_URL: string;
      NEXTAUTH_SECRET: string;
      SCF_GMAIL: string;
      SCF_GMAIL_APP_PASSWORD: string;
    }
  }
}

export {};
