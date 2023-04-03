import {
  ApiConsumes,
  ApiExtraModels,
  ApiForbiddenResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiResponseOptions,
  ApiUnauthorizedResponse,
  getSchemaPath,
} from '@nestjs/swagger'
import {
  FORBIDDEN_EXCEPTION_MESSAGE,
  INTERNAL_SERVER_EXCEPTION_MESSAGE,
  NOT_FOUND_EXCEPTION_MESSAGE,
  UNAUTHORIZED_EXCEPTION_MESSAGE,
} from '../constants'
import { ResponseDto } from '../dtos/response.dto'
import { Type, applyDecorators } from '@nestjs/common'

type ApiOkResponseOptions = Omit<ApiResponseOptions, 'schema'> & {
  isArray?: boolean
}

export const ApiGlobalResponse = <TModel extends Type<any>>(
  model: TModel,
  options?: ApiOkResponseOptions
) => {
  return applyDecorators(
    ApiExtraModels(ResponseDto, model),
    ApiConsumes('application/json', 'application/x-www-form-urlencoded'),
    ApiOkResponse({
      schema: {
        allOf: [
          { $ref: getSchemaPath(ResponseDto) },
          {
            properties: {
              payload: {
                type: 'array',
                $ref: getSchemaPath(model),
              },
              timestamp: {
                type: 'number',
              },
            },
          },
        ],
      },
      ...options,
    }),
    ApiUnauthorizedResponse({
      description: UNAUTHORIZED_EXCEPTION_MESSAGE,
      status: 401,
      schema: {
        properties: {
          error: {
            properties: {
              statusCode: {
                type: 'number',
                example: 401,
              },
              message: {
                type: 'string',
                example: UNAUTHORIZED_EXCEPTION_MESSAGE,
              },
              error: {
                type: 'string',
                example: 'Unauthorized',
              },
            },
          },
          timestamp: {
            type: 'number',
            example: 1617826799860,
          },
        },
      },
    }),
    ApiForbiddenResponse({
      description: FORBIDDEN_EXCEPTION_MESSAGE,
      status: 403,
      schema: {
        properties: {
          error: {
            properties: {
              statusCode: {
                type: 'number',
                example: 403,
              },
              message: {
                type: 'string',
                example: FORBIDDEN_EXCEPTION_MESSAGE,
              },
              error: {
                type: 'string',
                example: 'Forbidden',
              },
            },
          },
          timestamp: {
            type: 'number',
            example: 1617826799860,
          },
        },
      },
    }),
    ApiNotFoundResponse({
      description: NOT_FOUND_EXCEPTION_MESSAGE,
      status: 404,
      schema: {
        properties: {
          error: {
            properties: {
              statusCode: {
                type: 'number',
                example: 404,
              },
              message: {
                type: 'string',
                example: NOT_FOUND_EXCEPTION_MESSAGE,
              },
              error: {
                type: 'string',
                example: 'Not Found',
              },
            },
          },
          timestamp: {
            type: 'number',
            example: 1617826799860,
          },
        },
      },
    }),
    ApiInternalServerErrorResponse({
      description: INTERNAL_SERVER_EXCEPTION_MESSAGE,
      status: 500,
      schema: {
        properties: {
          error: {
            properties: {
              statusCode: {
                type: 'number',
                example: 500,
              },
              message: {
                type: 'string',
                example: INTERNAL_SERVER_EXCEPTION_MESSAGE,
              },
              error: {
                type: 'string',
                example: 'Internal Server Error',
              },
            },
          },
          timestamp: {
            type: 'number',
            example: 1617826799860,
          },
        },
      },
    })
  )
}
