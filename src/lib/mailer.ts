import nodemailer from "nodemailer";

if (!process.env.APP_EMAIL || !process.env.APP_PASSWORD) {
    throw new Error("Email configuration is missing.");
}

export const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: process.env.APP_EMAIL,
        pass: process.env.APP_PASSWORD,
    },
});

type Message = {
    fullName: string;
    senderEmail: string;
    subject: string;
    text: string;
};

export const sendMessage = async ({
    fullName,
    senderEmail,
    subject,
    text,
}: Message) => {
    const mailOptions = {
        from: {
            name: "Portfolio Message",
            address: process.env.APP_EMAIL as string,
        },
        to: "almonsoursalida@gmail.com",
        subject: subject,
        html: `
            <div style="font-family: Arial, sans-serif; padding: 20px;">
                <h2 style="color: #333;">New Message from ${fullName}</h2>
                <p><strong>Email:</strong> ${senderEmail}</p>
                <p><strong>Subject:</strong> ${subject}</p>
                <p style="margin-top: 16px; line-height: 1.6;"><strong>Message:</strong><br/>${text}</p>
            </div>
        `,
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log("Message sent: %s", info.messageId);
        return { success: true };
    } catch (error) {
        console.error("Error sending email:", error);
        return { success: false, error };
    }
};
