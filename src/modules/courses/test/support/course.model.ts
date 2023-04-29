import { Course } from '../../../courses/schemas/course.schema'
import { MockModel } from '../../../../database/test/support/mock.model'
import { courseStub } from '../stubs/course.stub'

export class CourseModel extends MockModel<Course> {
  protected entityStub = courseStub()
}
