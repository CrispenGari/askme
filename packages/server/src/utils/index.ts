import { User } from "@prisma/client";
import jwt from "jsonwebtoken";
import { client } from "../twilio";

export const sendVerificationCode = async (
  phoneNumber: string,
  code: string
) => {
  const msg = await client.messages.create({
    to: phoneNumber,
    from: process.env.TRIAL_PHONE_NUMBER,
    body: `Your verification code for registering to "askme" is: ${code}.`,
  });
  return msg;
};

export const signJwt = async ({
  phoneNumber,
  id,
  nickname,
}: User): Promise<string> => {
  return await jwt.sign(
    {
      id,
      phoneNumber,
      nickname,
    },
    process.env.JWT_SECRETE
  );
};

export const verifyJwt = async (token: string) => {
  return jwt.verify(token, process.env.JWT_SECRETE) as {
    nickname: string;
    phoneNumber: string;
    id: string;
  };
};
