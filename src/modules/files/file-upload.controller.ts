import { ApiTags } from '@nestjs/swagger'
import { BufferedFile } from '../minio/file.model'
import { Controller, Post, UploadedFile, UploadedFiles, UseInterceptors } from '@nestjs/common'
import { FileFieldsInterceptor, FileInterceptor } from '@nestjs/platform-express'
import { FileUploadService } from './file-upload.service'
import { Throttle } from '@nestjs/throttler'

@ApiTags('File Upload')
@Controller('file-upload')
export class FileUploadController {
  constructor(private fileUploadService: FileUploadService) {}

  @Post('single')
  @Throttle(5, 60) // 5 requests per minute
  @UseInterceptors(FileInterceptor('image'))
  async uploadSingle(@UploadedFile() image: BufferedFile) {
    return await this.fileUploadService.uploadSingle(image)
  }

  @Post('many')
  @Throttle(5, 60) // 5 requests per minute
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'image1', maxCount: 1 },
      { name: 'image2', maxCount: 1 },
    ])
  )
  async uploadMany(@UploadedFiles() files: BufferedFile) {
    return this.fileUploadService.uploadMany(files)
  }
}
