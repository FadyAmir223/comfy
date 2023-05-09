import nodemailer from 'nodemailer';
async function handleMailSend(req, res) {
    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: 'fezza@gmail.com',
            pass: '1234',
        },
    });
    let info = await transporter.sendMail({
        from: '"Fezza" <fezza@gmail.com>',
        to: 'jessy@gmail.com',
        subject: 'Hello from Nodemailer',
        text: 'Hello world?',
        html: '<b>Hello world?</b>',
    });
    console.log('Message sent: %s', info.messageId);
}
export { handleMailSend };
