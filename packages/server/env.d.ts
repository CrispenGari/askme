
  // types for your environmental variables
  declare namespace NodeJS {
    export interface ProcessEnv {
      TWILIO_ACCOUNT_SID : string;
			TWILIO_AUTH_TOKEN : string;
			TRIAL_PHONE_NUMBER : string;
			NODE_ENV : string;
			JWT_SECRETE : string;
			DB_HOST : string;
			DB_PORT : string;
			DB_USER : string;
			DB_PASSWORD : string;
			DB_NAME : string;
			DB_CONNECTION_LIMIT : string;
			PORT : string;

    }
  }
  