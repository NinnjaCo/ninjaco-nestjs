import * as crypto from 'crypto'
import { BufferedFile } from './file.model'
import { ConfigService } from '@nestjs/config'
import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common'
import { MinioClient, MinioService } from 'nestjs-minio-client'

@Injectable()
export class MinioClientService {
  private readonly logger = new Logger(MinioClientService.name)
  private readonly baseBucket: string
  private readonly client: MinioClient

  constructor(private readonly minio: MinioService, private readonly config: ConfigService) {
    this.baseBucket = this.config.get('BUCKET_NAME')
    this.client = this.minio.client

    const policy = {
      Version: '2012-10-17',
      Statement: [
        {
          Effect: 'Allow',
          Principal: {
            AWS: ['*'],
          },
          Action: ['s3:ListBucketMultipartUploads', 's3:GetBucketLocation', 's3:ListBucket'],
          Resource: [`arn:aws:s3:::${this.baseBucket}`],
        },
        {
          Effect: 'Allow',
          Principal: {
            AWS: ['*'],
          },
          Action: [
            's3:PutObject',
            's3:AbortMultipartUpload',
            's3:DeleteObject',
            's3:GetObject',
            's3:ListMultipartUploadParts',
          ],
          Resource: [`arn:aws:s3:::${this.baseBucket}/*`],
        },
      ],
    }

    this.client.setBucketPolicy(this.baseBucket, JSON.stringify(policy), function (err, res) {
      if (err) throw new HttpException('Error setting bucket policy', HttpStatus.BAD_REQUEST)
    })
  }

  public async upload(file: BufferedFile, baseBucket: string = this.baseBucket) {
    this.logger.log('Uploading file to minio')

    if (!(file.mimetype.includes('jpeg') || file.mimetype.includes('png'))) {
      throw new HttpException('Error uploading file', HttpStatus.BAD_REQUEST)
    }
    const temp_filename = Date.now().toString()
    const hashedFileName = crypto.createHash('md5').update(temp_filename).digest('hex')
    const ext = file.originalname.substring(
      file.originalname.lastIndexOf('.'),
      file.originalname.length
    )
    const metaData = {
      'Content-Type': file.mimetype,
      'X-Amz-Meta-Testing': 1234,
    }
    const filename = hashedFileName + ext
    const fileName = `${filename}`
    const fileBuffer = file.buffer

    this.client.putObject(baseBucket, fileName, fileBuffer, metaData, function (err, res) {
      if (err) throw new HttpException('Error uploading file' + err, HttpStatus.BAD_REQUEST)
    })

    const minioEndpoint = 'http://localhost'
    const minioPort = this.config.get('MINIO_API_PORT')
    return {
      url: `${minioEndpoint}:${minioPort}/${baseBucket}/${filename}`,
    }
  }

  async delete(objetName: string, baseBucket: string = this.baseBucket) {
    this.client.removeObject(baseBucket, objetName, function (err, res) {
      if (err) throw new HttpException('Oops Something wrong happend', HttpStatus.BAD_REQUEST)
    })
  }
}
