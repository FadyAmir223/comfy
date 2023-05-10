import nodemailer from 'nodemailer';
import { EMAIL_APP_PASSWORD } from '../../utils/loadEnv.js';
async function handleMailSend(req, res) {
    const options = {
        from: 'fadyamir223@gmail.com',
        to: 'fadytgk@gmial.com',
        subject: 'title',
        text: 'body',
    };
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: options.from,
            pass: EMAIL_APP_PASSWORD,
        },
        tls: {
            rejectUnauthorized: false,
        },
    });
    await transporter.sendMail(options, (error, info) => res.json({ message: error ? error : info.response }));
}
export { handleMailSend };
