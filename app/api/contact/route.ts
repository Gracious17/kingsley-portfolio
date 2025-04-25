import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
const { name, phone, email, message ,subject } = await req.json();
const headers = new Headers();
  headers.set('Access-Control-Allow-Origin', '*'); // Allow cross-origin requests

  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
    },
  });
    const mailOptions = {
        from: email,
        to: process.env.GMAIL_USER,
        subject: `New message from ${name}`,
        html: `
        <h1>Message from ${name}</h1>
        <p><strong>Subjext:</strong>${subject|| "No subject provided"}</p>
        <p>${message}</p>
        <hr/>
        <h2>Contact Details</h2>
            <p>Phone: ${phone}</p>
            <p>Email: ${email}</p>
        `,
    };
    try{
        await transporter.sendMail(mailOptions);
        return NextResponse.json({message:"Email sent successfully!"}, {status: 200});
    }catch (error) {
        console.error('Error sending email',error);
        return NextResponse.json({message:"Error sending email"}, {status: 500});
        
    }
}