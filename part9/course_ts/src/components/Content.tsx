import { CoursePart } from '../App'
import Part from './Part'

const Content = ({ courseParts }: { courseParts: CoursePart[] }) => {
  return (
    <>
      {courseParts.map((course: CoursePart) => (
        <Part key={course.name} course={course} />
      ))}
    </>
  )
}

export default Content
