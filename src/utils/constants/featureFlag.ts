export const FEATURE_FLAGS = {
  EMAIL: {
    ENABLED: "isEmailEnabled",
    POSTMARK_SENDING_ENABLED: "isPostmarkSendingEnabled",
  },
  AUTOMATIC_JOBS: {
    IS_AUTOMATIC_JOBS_ENABLED: "isAutomaticJobsEnabled",
  },
} as const;
