import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { INestApplication } from '@nestjs/common'

const title = 'NinjaCo Backend API'
const description =
  'This api is used by the NinjaCo frontend app to provide communication link between the frontend and the database'

/**
 * Setup swagger in the application
 * @param app {INestApplication}
 */
export const SwaggerConfig = (app: INestApplication, apiVersion: string) => {
  const options = new DocumentBuilder()
    .setTitle(title)
    .setDescription(description)
    .setVersion(apiVersion)
    .build()

  const document = SwaggerModule.createDocument(app, options)

  SwaggerModule.setup(`/api/doc`, app, document)
}
