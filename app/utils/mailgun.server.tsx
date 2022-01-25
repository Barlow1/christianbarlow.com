import mailgun from 'mailgun-js';
export interface IMailgunMessage {
    name: string;
    email: string;
    message: string;
}

export function sendEmail({name, email, message}: IMailgunMessage) {
    let DOMAIN = "DOMAIN_EXAMPLE";
    let API_KEY = "KEY_EXAMPLE";

    if (process.env.MAILGUN_DOMAIN) {
        DOMAIN = process.env.MAILGUN_DOMAIN
    }
    if(process.env.MAILGUN_API_KEY) {
        API_KEY = process.env.MAILGUN_API_KEY;
    }
    const mg = mailgun({ apiKey: API_KEY, domain: DOMAIN });
    const data = {
      from: `${name} <${email}>`,
      to: "cbarlow@uzervision.com",
      subject: "christianbarlow.com Contact Form",
      text: message,
    };
    mg.messages().send(data);
}