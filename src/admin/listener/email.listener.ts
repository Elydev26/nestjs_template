// import { Injectable, Logger } from '@nestjs/common';
// import { OnEvent } from '@nestjs/event-emitter';
// import { SendGridEmailService } from 'src/notification/services/sendgrid.service';
// import { EmailDto } from 'src/notification/dtos/email.dto';
// import { AdminEmailEvent } from '../event/admin.event';

// @Injectable()
// export class AccountEmailListener {
//   constructor(private readonly emailService: SendGridEmailService) {}

//   @OnEvent(AdminEmailEvent.SEND_OTP)
//   async handlerOtpEmailEvent(body: EmailDto) {
//     try {
//       await this.emailService.sendMail(body);
//     } catch (e) {
//       Logger.error('otp error ', e);
//     }
//   }

//   @OnEvent(AdminEmailEvent.FORGET_PASSWORD)
//   async handlerResetPasswordEmailEvent(body: EmailDto) {
//     try {
//       await this.emailService.sendMail(body);
//     } catch (e) {
//       Logger.error('otp error ', e);
//     }
//   }

//   @OnEvent(AdminEmailEvent.REQUEST_TENDER)
//   async handlerRequestTenderEmailEvent(body: EmailDto) {
//     try {
//       await this.emailService.sendMail(body);
//     } catch (e) {
//       Logger.error('otp error ', e);
//     }
//   }

//   @OnEvent(AdminEmailEvent.REQUEST_WRITER)
//   async handlerRequestWrtierEmailEvent(body: EmailDto) {
//     try {
//       await this.emailService.sendMail(body);
//     } catch (e) {
//       Logger.error('otp error ', e);
//     }
//   }
// }
