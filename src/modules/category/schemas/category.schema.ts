import { ApiProperty } from '@nestjs/swagger'
import { BaseEntity } from 'database/base.entity'
import { HydratedDocument } from 'mongoose'
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'

export type CategorieDocument = HydratedDocument<Categorie>

@Schema({ collection: 'categories' })
export class Categorie extends BaseEntity {
  @ApiProperty()
  @Prop({ required: true })
  categoryName: string

  @ApiProperty()
  @Prop({ required: true })
  missionId: string[]
}

export const CategorieSchema = SchemaFactory.createForClass(Categorie)
