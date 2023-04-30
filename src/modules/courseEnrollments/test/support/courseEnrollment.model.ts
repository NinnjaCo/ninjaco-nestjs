import { CourseEnrollment } from '../../../courseEnrollments/schemas/courseEnrollment.schema'
import { MockModel } from '../../../../database/test/support/mock.model'
import { courseEnrollmentStub } from '../stubs/courseEnrollment.stub'

export class CourseEnrollmentModel extends MockModel<CourseEnrollment> {
  create() {
    return courseEnrollmentStub()
  }
  protected entityStub = courseEnrollmentStub()
}
