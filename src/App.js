import React, { useState } from 'react';
import 'rbx/index.css';
import { Button, Container, Title } from 'rbx';

const terms = { F: 'Fall', W: 'Winter', S: 'Spring'};

const Banner = ({ title }) => (
  <h1 className="title">{ title }</h1>
);

const getCourseTerm = course => (
  terms[course.id.charAt(0)]
);

const getCourseNumber = course => (
  course.id.slice(1, 4)
)
  
const Course = ({ course }) => (
  <button className="button">
    { getCourseTerm(course) } CS { getCourseNumber(course) }: { course.title }
  </button>
);

const CourseList = ({ courses }) => (
  <div className="buttons">
    {courses.map(course => <Course key={course.id} course={ course } />)}
  </div>
);

const App = () => {
  const [schedule, setSchedule] = React.useState({ title: '', courses: [] });
  const url = 'https://courses.cs.northwestern.edu/394/data/cs-courses.php';

  React.useEffect(() => {
    
    const fetchSchedule = async () => {
      const response = await fetch(url);
      if (!response.ok) throw response;
      const json = await response.json();
      setSchedule(json);
    }
    
    fetchSchedule();
  }, []);

  return (
    <div className="container">
      <Banner title={ schedule.title } />
      <CourseList courses={ schedule.courses } />
    </div>
  );
};


export default App;