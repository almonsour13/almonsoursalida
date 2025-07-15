import { NextResponse } from "next/server";
import { sendMessage } from "@/lib/mailer"; // adjust path as needed

export async function POST(req: Request) {
    const body = await req.json();

    const { fullName, email, subject, message } = body;

    if (!fullName || !email || !subject || !message) {
        return NextResponse.json({ error: "Missing fields." }, { status: 400 });
    }

    const result = await sendMessage({
        fullName,
        senderEmail: email,
        subject,
        text: message,
    });

    if (result.success) {
        return NextResponse.json({ success: true });
    } else {
        return NextResponse.json({ error: "Failed to send message." }, { status: 500 });
    }
}
