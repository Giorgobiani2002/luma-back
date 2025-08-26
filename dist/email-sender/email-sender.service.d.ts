import { MailerService } from '@nestjs-modules/mailer';
export declare class EmailSenderService {
    private emailService;
    constructor(emailService: MailerService);
    sendEmailHtmltoAdmin(to: string, subject: string, donorForEmail: {
        name: string;
        lastName: string;
        age: string;
        height: string;
        weight: string;
        mobileNumber: string;
        education: string;
        photo1: string[];
        photo2: string[];
        photo3: string[];
    }): Promise<void>;
}
