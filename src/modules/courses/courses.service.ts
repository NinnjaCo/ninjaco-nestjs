import { Categorie, CategorieDocument } from './schemas/categorie.schema'
import { Course } from './schemas/course.schema'
import { CoursesRepository } from './courses.repository'
import { InjectModel } from '@nestjs/mongoose'
import { Injectable } from '@nestjs/common'
import { Level, LevelDocument } from './schemas/level.schema'
import { Model } from 'mongoose'
import { RolesService } from 'modules/roles/roles.service'

@Injectable()
export class CoursesService {
  constructor(
    private readonly courseRepository: CoursesRepository,
    private readonly roleService: RolesService
  ) {}
  // ma tensa thota async
  findAll(): string {
    return 'Hello World!'
    // return await this.courseRepository.find({})
  }
}
