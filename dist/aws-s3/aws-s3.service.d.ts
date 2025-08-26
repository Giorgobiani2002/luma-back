export declare class AwsS3Service {
    private storageService;
    private bucketName;
    constructor();
    uploadFile(filePath: string, file: any): Promise<string>;
    getFileById(filePath: any): Promise<string>;
    deleteFileById(fileId: string): Promise<string>;
    generateSignedUrl(filePath: string): Promise<string>;
}
