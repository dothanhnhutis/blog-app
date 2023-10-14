import { OTPSearch } from "@/common.type";
import { generateOTPCode } from "@/util";
import { createOTP, getOTPByEmail } from "@/util/action";
import { sendMail } from "@/util/nodemailer";

export async function POST(request: Request) {
  const { email } = await request.json();
  const {
    otpSearch: { edges },
  } = (await getOTPByEmail(email)) as {
    otpSearch: { edges: { node: OTPSearch }[] };
  };
  let otp: string;
  if (edges.find((otp) => otp.node.type === "registerUser")) {
    otp = edges[0].node.code;
  } else {
    otp = generateOTPCode();
    await createOTP(
      otp,
      email,
      "registerUser",
      new Date(Date.now() + 30 * 60 * 1000).toISOString()
    );
  }
  const data = {
    from: 'I.C.H Verify Email" <gaconght@gmail.com>',
    to: email,
    subject: "I.C.H Verify Email",
    html: `<b>code: ${otp}</b>`,
  };
  const isSuccess = await sendMail(data);
  return Response.json({ okey: isSuccess });
}
