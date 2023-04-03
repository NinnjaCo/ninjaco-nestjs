import { Module } from '@nestjs/common'
import { MinioClientService } from './minio-client.service'
import { MinioModule } from 'nestjs-minio-client'
import { ConfigService } from '@nestjs/config'
@Module({
  imports: [
    MinioModule.registerAsync({
      useFactory: (configService: ConfigService) => ({
        endPoint: configService.get('MINIO_ENDPOINT'),
        port: parseInt(configService.get('MINIO_API_PORT')),
        useSSL: false,
        accessKey: configService.get('MINIO_ROOT_USER'),
        secretKey: configService.get('MINIO_ROOT_PASSWORD'),
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [MinioClientService],
  exports: [MinioClientService],
})
export class MinioClientModule {}

/*
s3: () => {
            const s3 = new S3Client({
              region: configService.get('file.awsS3Region'),
              credentials: {
                accessKeyId: configService.get('file.accessKeyId'),
                secretAccessKey: configService.get('file.secretAccessKey'),
              },
            });

            return multerS3({
              s3: s3,
              bucket: configService.get('file.awsDefaultS3Bucket'),
              acl: 'public-read',
              contentType: multerS3.AUTO_CONTENT_TYPE,
              key: (request, file, callback) => {
                callback(
                  null,
                  `${randomStringGenerator()}.${file.originalname
                    .split('.')
                    .pop()
                    .toLowerCase()}`,
                );
              },
            });
          },
 */
