import { User } from "@prisma/client";
import EventEmitter from "events";
import jwt from "jsonwebtoken";
import { client } from "../twilio";
import nodemailer from "nodemailer";

export type Coord = {
  lon: number;
  lat: number;
};

export const calculateDistance = (a: Coord, b: Coord) => {
  const R = 6371; // km
  const dLat = toRad(b.lat - a.lat);
  const dLon = toRad(b.lon - a.lon);
  const lat1 = toRad(a.lat);
  const lat2 = toRad(b.lat);
  const x =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
  const c = 2 * Math.atan2(Math.sqrt(x), Math.sqrt(1 - x));
  const d = R * c;
  return d;
};

// Converts numeric degrees to radians
const toRad = (value: number) => {
  return (value * Math.PI) / 180;
};

export const sendVerificationCodeAsTxt = async (
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

export const sendVerificationCodeAsEmail = async (
  email: string,
  code: string
) => {
  const testAccount = await nodemailer.createTestAccount();
  const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false,
    auth: {
      user: testAccount.user,
      pass: testAccount.pass,
    },
  });
  const info = await transporter.sendMail({
    from: '"Admin" <askme@askme.com>',
    to: email,
    subject: "Verify Email",
    html: `<p>Please verify your email address the verification code is: <u><b>${code}</b></u></p>`,
  });

  console.log("Message sent: %s", info.messageId);
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
};
export const signJwt = async ({
  phoneNumber,
  id,
  nickname,
  email,
}: User): Promise<string> => {
  return await jwt.sign(
    {
      id,
      phoneNumber,
      nickname,
      email,
    },
    process.env.JWT_SECRETE
  );
};

export const verifyJwt = async (token: string) => {
  return jwt.verify(token, process.env.JWT_SECRETE) as {
    nickname: string;
    phoneNumber?: string;
    id: string;
    email?: string;
  };
};

export const ee = new EventEmitter({
  captureRejections: true,
});
