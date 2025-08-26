import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { from } from 'rxjs';

@Injectable()
export class EmailSenderService {
  constructor(private emailService: MailerService) {}

  async sendEmailHtmltoAdmin(
    to: string,
    subject: string,
    donorForEmail: {
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
    },
  ) {
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
        
        ${
          donorForEmail.photo1.length > 0
            ? `
          <div style="margin-bottom: 15px;">
            <h4 style="color: #666;">ფოტო 1:</h4>
            ${donorForEmail.photo1
              .map(
                (url) => `
              <div style="margin-bottom: 10px;">
                <img src="${url}" alt="Photo 1" style="max-width: 200px; height: auto; border: 1px solid #ddd; border-radius: 4px;">
                <br>
                <a href="${url}" target="_blank" style="font-size: 12px; color: #007bff;">ფოტოს ნახვა</a>
              </div>
            `,
              )
              .join('')}
          </div>
        `
            : ''
        }

        ${
          donorForEmail.photo2.length > 0
            ? `
          <div style="margin-bottom: 15px;">
            <h4 style="color: #666;">ფოტო 2:</h4>
            ${donorForEmail.photo2
              .map(
                (url) => `
              <div style="margin-bottom: 10px;">
                <img src="${url}" alt="Photo 2" style="max-width: 200px; height: auto; border: 1px solid #ddd; border-radius: 4px;">
                <br>
                <a href="${url}" target="_blank" style="font-size: 12px; color: #007bff;">ფოტოს ნახვა</a>
              </div>
            `,
              )
              .join('')}
          </div>
        `
            : ''
        }

        ${
          donorForEmail.photo3.length > 0
            ? `
          <div style="margin-bottom: 15px;">
            <h4 style="color: #666;">ფოტო 3:</h4>
            ${donorForEmail.photo3
              .map(
                (url) => `
              <div style="margin-bottom: 10px;">
                <img src="${url}" alt="Photo 3" style="max-width: 200px; height: auto; border: 1px solid #ddd; border-radius: 4px;">
                <br>
                <a href="${url}" target="_blank" style="font-size: 12px; color: #007bff;">ფოტოს ნახვა</a>
              </div>
            `,
              )
              .join('')}
          </div>
        `
            : ''
        }
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
    } catch (error) {
      console.error('Error sending email:', error);
    }
  }
}
