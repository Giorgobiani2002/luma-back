"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailSenderService = void 0;
const mailer_1 = require("@nestjs-modules/mailer");
const common_1 = require("@nestjs/common");
let EmailSenderService = class EmailSenderService {
    emailService;
    constructor(emailService) {
        this.emailService = emailService;
    }
    async sendEmailHtmltoAdmin(to, subject, donorForEmail) {
        const html = `
    <div style="border: 2px solid #333; padding: 20px; font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #333; text-align: center; margin-bottom: 20px;">ახალი დონორის რეგისტრაცია</h2>
      
      <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px; margin-bottom: 20px;">
        <h3 style="color: #555; margin-top: 0;">პერსონალური ინფორმაცია:</h3>
        <p><strong>სახელი:</strong> ${donorForEmail.name}</p>
        <p><strong>გვარი:</strong> ${donorForEmail.lastName}</p>
        <p><strong>ასაკი:</strong> ${donorForEmail.age}</p>
        <p><strong>სიმაღლე:</strong> ${donorForEmail.height}</p>
        <p><strong>წონა:</strong> ${donorForEmail.weight}</p>
        <p><strong>მობილური:</strong> ${donorForEmail.mobileNumber}</p>
        <p><strong>განათლება:</strong> ${donorForEmail.education}</p>
      </div>

      <div style="background-color: #f0f8ff; padding: 15px; border-radius: 5px;">
        <h3 style="color: #555; margin-top: 0;">ატვირთული ფოტოები:</h3>
        
        ${donorForEmail.photo1.length > 0
            ? `
          <div style="margin-bottom: 15px;">
            <h4 style="color: #666;">ფოტო 1:</h4>
            ${donorForEmail.photo1
                .map((url) => `
              <div style="margin-bottom: 10px;">
                <img src="${url}" alt="Photo 1" style="max-width: 200px; height: auto; border: 1px solid #ddd; border-radius: 4px;">
                <br>
                <a href="${url}" target="_blank" style="font-size: 12px; color: #007bff;">ფოტოს ნახვა</a>
              </div>
            `)
                .join('')}
          </div>
        `
            : ''}

        ${donorForEmail.photo2.length > 0
            ? `
          <div style="margin-bottom: 15px;">
            <h4 style="color: #666;">ფოტო 2:</h4>
            ${donorForEmail.photo2
                .map((url) => `
              <div style="margin-bottom: 10px;">
                <img src="${url}" alt="Photo 2" style="max-width: 200px; height: auto; border: 1px solid #ddd; border-radius: 4px;">
                <br>
                <a href="${url}" target="_blank" style="font-size: 12px; color: #007bff;">ფოტოს ნახვა</a>
              </div>
            `)
                .join('')}
          </div>
        `
            : ''}

        ${donorForEmail.photo3.length > 0
            ? `
          <div style="margin-bottom: 15px;">
            <h4 style="color: #666;">ფოტო 3:</h4>
            ${donorForEmail.photo3
                .map((url) => `
              <div style="margin-bottom: 10px;">
                <img src="${url}" alt="Photo 3" style="max-width: 200px; height: auto; border: 1px solid #ddd; border-radius: 4px;">
                <br>
                <a href="${url}" target="_blank" style="font-size: 12px; color: #007bff;">ფოტოს ნახვა</a>
              </div>
            `)
                .join('')}
          </div>
        `
            : ''}
      </div>

      <div style="text-align: center; margin-top: 20px; padding-top: 20px; border-top: 1px solid #ddd;">
        <p style="color: #666; font-size: 12px;">
          ეს ემაილი გაიგზავნა ${new Date().toLocaleString('ka-GE')} თარიღს
        </p>
      </div>
    </div>
  `;
        const options = {
            from: 'luma',
            to,
            subject,
            html,
        };
        try {
            const info = await this.emailService.sendMail(options);
            console.log('Email Sent Successfully', info);
        }
        catch (error) {
            console.error('Error sending email:', error);
        }
    }
};
exports.EmailSenderService = EmailSenderService;
exports.EmailSenderService = EmailSenderService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [mailer_1.MailerService])
], EmailSenderService);
//# sourceMappingURL=email-sender.service.js.map