"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAppModule = exports.dynamicImport = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const mongoose_1 = require("@nestjs/mongoose");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const donors_module_1 = require("./donors/donors.module");
const aws_s3_module_1 = require("./aws-s3/aws-s3.module");
const mongoose_module_1 = require("./mongoose/mongoose.module");
const mailer_1 = require("@nestjs-modules/mailer");
const path_1 = __importDefault(require("path"));
const dynamicImport = async (packageName) => new Function(`return import('${packageName}')`)();
exports.dynamicImport = dynamicImport;
const DEFAULT_ADMIN = {
    email: 'donationluma@example.com',
    password: 'luma2025',
};
const authenticate = async (email, password) => {
    if (email === DEFAULT_ADMIN.email && password === DEFAULT_ADMIN.password) {
        return Promise.resolve(DEFAULT_ADMIN);
    }
    return null;
};
const createAppModule = async () => {
    const AdminJSImport = await (0, exports.dynamicImport)('adminjs');
    const AdminJS = AdminJSImport.default;
    const ComponentLoader = AdminJSImport.ComponentLoader;
    const componentLoader = new ComponentLoader();
    const imageComponentId = componentLoader.add('ImageComponent', path_1.default.join(__dirname, './mongoose/components/ImageComponent'));
    const AdminJSMongoose = await (0, exports.dynamicImport)('@adminjs/mongoose');
    const { AdminModule } = await (0, exports.dynamicImport)('@adminjs/nestjs');
    AdminJS.registerAdapter({
        Resource: AdminJSMongoose.Resource,
        Database: AdminJSMongoose.Database,
    });
    const AdminPanelModule = AdminModule.createAdminAsync({
        imports: [mongoose_module_1.MongooseSchemasModule],
        inject: [(0, mongoose_1.getModelToken)('Donor')],
        useFactory: async (DonorModel) => {
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
    let AppModule = class AppModule {
    };
    AppModule = __decorate([
        (0, common_1.Module)({
            imports: [
                config_1.ConfigModule.forRoot({ isGlobal: true }),
                mongoose_1.MongooseModule.forRoot(process.env.MONGO_URI),
                mailer_1.MailerModule.forRoot({
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
                donors_module_1.DonorsModule,
                aws_s3_module_1.AwsS3Module,
            ],
            controllers: [app_controller_1.AppController],
            providers: [app_service_1.AppService],
        })
    ], AppModule);
    return AppModule;
};
exports.createAppModule = createAppModule;
//# sourceMappingURL=app.module.js.map