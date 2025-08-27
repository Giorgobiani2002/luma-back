import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { getModelToken, MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DonorsModule } from './donors/donors.module';
import { AwsS3Module } from './aws-s3/aws-s3.module';
import { MongooseSchemasModule } from './mongoose/mongoose.module';
import { Model } from 'mongoose';
import { Donor } from './mongoose/donor-model';
import { MailerModule } from '@nestjs-modules/mailer';
import path from 'path';

export const dynamicImport = async (packageName: string) =>
  new Function(`return import('${packageName}')`)();

// const DEFAULT_ADMIN = {
//   email: process.env.ADMIN_EMAIL,
//   password: process.env.ADMIN_PASSWORD,
// };

// const authenticate = async (email: string, password: string) => {
//   if (email === DEFAULT_ADMIN.email && password === DEFAULT_ADMIN.password) {
//     return Promise.resolve(DEFAULT_ADMIN);
//   }
//   return null;
// };

export const createAppModule = async () => {
  const AdminJSImport = await dynamicImport('adminjs');
  const AdminJS = AdminJSImport.default;
  const ComponentLoader = AdminJSImport.ComponentLoader;
  const componentLoader = new ComponentLoader();

  const imageComponentId = componentLoader.add(
    'ImageComponent',
    path.join(__dirname, './mongoose/components/ImageComponent'),
  );

  const AdminJSMongoose = await dynamicImport('@adminjs/mongoose');
  const { AdminModule } = await dynamicImport('@adminjs/nestjs');

  AdminJS.registerAdapter({
    Resource: AdminJSMongoose.Resource,
    Database: AdminJSMongoose.Database,
  });

  const AdminPanelModule = AdminModule.createAdminAsync({
    imports: [ConfigModule, MongooseSchemasModule],
    inject: [ConfigService, getModelToken('Donor')],
    useFactory: async (config: ConfigService, DonorModel: Model<Donor>) => {
      const adminEmail = config.get<string>('ADMIN_EMAIL');
      const adminPassword = config.get<string>('ADMIN_PASSWORD');
      const cookieName = config.get<string>('ADMIN_COOKIE_NAME');
      const cookiePassword = config.get<string>('ADMIN_COOKIE_PASSWORD');
      const sessionSecret = config.get<string>('SESSION_SECRET');

      return {
        adminJsOptions: {
          rootPath: '/admin',
          componentLoader,
          resources: [
            {
              resource: DonorModel,
              options: {
                properties: {
                  photo1: {
                    isVisible: {
                      list: true,
                      show: true,
                      edit: false,
                      filter: false,
                    },

                    components: {
                      list: imageComponentId,
                      show: imageComponentId,
                    },
                  },
                  photo2: {
                    isVisible: {
                      list: true,
                      show: true,
                      edit: false,
                      filter: false,
                    },

                    components: {
                      list: imageComponentId,
                      show: imageComponentId,
                    },
                  },
                  photo3: {
                    isVisible: {
                      list: true,
                      show: true,
                      edit: false,
                      filter: false,
                    },

                    components: {
                      list: imageComponentId,
                      show: imageComponentId,
                    },
                  },
                },
              },
            },
          ],
        },
        auth: {
          authenticate: async (email: string, password: string) => {
            if (email === adminEmail && password === adminPassword) {
              return { email: adminEmail };
            }
            return null;
          },
          cookieName,
          cookiePassword,
        },
        sessionOptions: {
          resave: true,
          saveUninitialized: true,
          secret: sessionSecret,
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
