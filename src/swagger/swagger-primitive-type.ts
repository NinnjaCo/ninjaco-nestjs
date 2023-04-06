import { ApiProperty } from '@nestjs/swagger'

export class BooleanSchema {
  @ApiProperty({ type: Boolean })
  boolean: boolean
}

export class NumberSchema {
  @ApiProperty({ type: Number })
  number: number
}

export class StringSchema {
  @ApiProperty({ type: String })
  string: string
}

export class ArraySchema {
  @ApiProperty({ type: Array, isArray: true })
  array: []
}
