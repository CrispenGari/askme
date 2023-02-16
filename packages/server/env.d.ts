
  // types for your environmental variables
  declare namespace NodeJS {
    export interface ProcessEnv {
      TWILIO_ACCOUNT_SID : string;
			TWILIO_AUTH_TOKEN : string;
			TRIAL_PHONE_NUMBER : string;
			NODE_ENV : string;
			JWT_SECRETE : string;
			DATABASE_USER : string;
			DATABASE_PASSWORD : string;
			DATABASE_HOST : string;
			DATABASE_NAME : string;
			DATABASE_PORT : string;
			REDIS_HOST : string;
			PORT : string;

    }
  }
  