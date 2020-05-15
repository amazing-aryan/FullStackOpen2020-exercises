import React from 'react'

const Course = ({course}) => {
    return (
      <>
        <Header course={course} />
        <Content course={course} />
        <Total course={course} />
      </>
    )
  }
  
  const Header = ({ course }) => {
    return (
      <h2>{course.name}</h2>
    )
  }
  
  const Total = ({ course }) => {
    const total = course.parts.reduce( (s, part) => s + part.exercises , 0)
    return(
      <p><b>Number of exercises {total}</b></p>
    ) 
  }
  
  const Part = (props) => {
    return (
      <p>
        {props.part.name} {props.part.exercises}
      </p>    
    )
  }
  
  const Content = ({ course }) => {
    return (
      <>
      {course.parts.map( (part) => <div key={part.id}><Part part={part}/></div>)}
      </>
    )
  }

  export default Course
  