
  // types for your environmental variables
  declare namespace NodeJS {
    export interface ProcessEnv {
      TWILIO_ACCOUNT_SID : string;
			TWILIO_AUTH_TOKEN : string;
			TRIAL_PHONE_NUMBER : string;
			NODE_ENV : string;

    }
  }
  