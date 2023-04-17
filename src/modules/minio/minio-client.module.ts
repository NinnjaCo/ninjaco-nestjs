import { ConfigService } from '@nestjs/config'
import { MinioClientService } from './minio-client.service'
import { MinioModule } from 'nestjs-minio-client'
import { Module } from '@nestjs/common'
@Module({
  imports: [
    MinioModule.registerAsync({
      useFactory: (configService: ConfigService) => ({
        endPoint:
          configService.get('PROVIDER') === 'local'
            ? configService.get('STACKHERO_MINIO_HOST')
            : configService.get('STACKHERO_MINIO_HOST'),
        port: configService.get('PROVIDER') === 'local' ? configService.get('MINIO_API_PORT') : 443,
        useSSL: configService.get('PROVIDER') === 'local' ? false : true,
        accessKey: configService.get('STACKHERO_MINIO_ACCESS_KEY'),
        secretKey: configService.get('STACKHERO_MINIO_SECRET_KEY'),
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
