import { CoursePart } from '../App'

const style = {
  headingStyle: {
    marginBottom: 0,
  },
  paragraphStyle: {
    marginTop: 0,
  },
}

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  )
}

const Part = ({ course }: { course: CoursePart }) => {
  switch (course.type) {
    case 'normal':
      return (
        <div>
          <h3 style={style.headingStyle}>
            {course.name} {course.exerciseCount}
          </h3>
          <i>{course.description}</i>
        </div>
      )

    case 'groupProject':
      return (
        <div>
          <h3 style={style.headingStyle}>
            {course.name} {course.exerciseCount}
          </h3>
          <i>project exercises {course.groupProjectCount}</i>
        </div>
      )

    case 'submission':
      return (
        <div>
          <h3 style={style.headingStyle}>
            {course.name} {course.exerciseCount}
          </h3>
          <i>{course.description}</i>
          <p style={style.paragraphStyle}>
            submit to {course.exerciseSubmissionLink}
          </p>
        </div>
      )

    case 'special':
      return (
        <div>
          <h3 style={style.headingStyle}>
            {course.name} {course.exerciseCount}
          </h3>
          <i>{course.description}</i>
          <p style={style.paragraphStyle}>
            required skills: {' '}
            {course.requirements.map((r, index) => (
              <span key={r}>
                {r}
                {index === course.requirements.length - 1 ? '' : ', '}
              </span>
            ))}
          </p>
        </div>
      )

    default:
      return assertNever(course)
  }
}

export default Part
