import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { getModelToken, MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DonorsModule } from './donors/donors.module';
import { AwsS3Module } from './aws-s3/aws-s3.module';
import { MongooseSchemasModule } from './mongoose/mongoose.module';
import { Model } from 'mongoose';
import { Donor } from './mongoose/donor-model';
import { MailerModule } from '@nestjs-modules/mailer';

export const dynamicImport = async (packageName: string) =>
  new Function(`return import('${packageName}')`)();

const DEFAULT_ADMIN = {
  email: 'donationluma@example.com',
  password: 'luma2025',
};

const authenticate = async (email: string, password: string) => {
  if (email === DEFAULT_ADMIN.email && password === DEFAULT_ADMIN.password) {
    return Promise.resolve(DEFAULT_ADMIN);
  }
  return null;
};

export const createAppModule = async () => {
  const AdminJSImport = await dynamicImport('adminjs');
  const AdminJS = AdminJSImport.default;
  const ComponentLoader = AdminJSImport.ComponentLoader;
  const componentLoader = new ComponentLoader();

  const AdminJSMongoose = await dynamicImport('@adminjs/mongoose');
  const { AdminModule } = await dynamicImport('@adminjs/nestjs');

  AdminJS.registerAdapter({
    Resource: AdminJSMongoose.Resource,
    Database: AdminJSMongoose.Database,
  });

  const AdminPanelModule = AdminModule.createAdminAsync({
    imports: [MongooseSchemasModule],
    inject: [getModelToken('Donor')],
    useFactory: async (DonorModel: Model<Donor>) => {
      return {
        adminJsOptions: {
          rootPath: '/admin',
          componentLoader,
          resources: [{ resource: DonorModel }],
        },
        auth: {
          authenticate,
          cookieName: 'adminjs',
          cookiePassword: 'secret',
        },
        sessionOptions: {
          resave: true,
          saveUninitialized: true,
          secret: 'secret',
        },
      };
    },
  });

  @Module({
    imports: [
      ConfigModule.forRoot({ isGlobal: true }),
      MongooseModule.forRoot(process.env.MONGO_URI),
      MailerModule.forRoot({
        transport: {
          host: process.env.EMAIL_HOST,
          port: 465,
          secure: true,
          auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
          },
        },
      }),
      AdminPanelModule,
      DonorsModule,
      AwsS3Module,
    ],
    controllers: [AppController],
    providers: [AppService],
  })
  class AppModule {}

  return AppModule;
};
