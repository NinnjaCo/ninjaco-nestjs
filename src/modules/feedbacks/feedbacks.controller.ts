import { ApiGlobalResponse } from 'common/decorators/api-global-response.decorators'
import { ApiTags } from '@nestjs/swagger'
import { ArraySchema } from 'swagger/swagger-primitive-type'
import { Body, Controller, Get, Post } from '@nestjs/common'
import { CreateFeedbackDto } from './dto/create-feedback.dto'
import { Feedback } from './schemas/feedbacks.schema'
import { FeedbacksService } from './feedbacks.service'
import { GetCurrentUserId } from 'common/decorators/get-current-user-id.decorator'

@ApiTags('Feedbacks')
@Controller('feedbacks')
export class FeedbacksController {
  constructor(private readonly feedbacksService: FeedbacksService) {}
  @ApiGlobalResponse(ArraySchema, {
    description: 'Get all feedbacks',
    isArray: true,
  })
  @Get()
  findAll(): Promise<Feedback[]> {
    return this.feedbacksService.findAll()
  }

  @ApiGlobalResponse(Feedback, {
    description: 'create feedback',
  })
  @Post()
  create(
    @GetCurrentUserId() userId: string,
    @Body() feedbackDto: CreateFeedbackDto
  ): Promise<Feedback> {
    return this.feedbacksService.createFeedback(userId, feedbackDto)
  }
}
