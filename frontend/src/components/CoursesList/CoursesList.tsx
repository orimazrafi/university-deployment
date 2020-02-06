import React from "react";
import { Course } from "../Course/Course";
import "./CoursesList.css";

export const CoursesList = ({ courses }: { courses: any }) => {
    return (
        <div className="courses__list__container">
            {courses && courses.map((course: any) => (
                <Course
                    key={course.name}
                    name={course.name}
                    points={course.points}
                    description={course.description} />
            ))}
        </div>
    )
}