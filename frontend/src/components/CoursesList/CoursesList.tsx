import React from "react";
import { Course } from "../Course/Course";
import { CourseInterface } from "../../interfaces";
import "./CoursesList.css";

export const CoursesList = ({ courses, role, userId }: { courses: CourseInterface[], role: string, userId: string }) => {
    return (
        <div className="courses__list__container">
            {courses && courses.map((course: CourseInterface) => (
                <Course
                    length={course.registerStudents.length}
                    courses={courses}
                    userId={userId}
                    role={role}
                    courseId={course.courseId}
                    key={course.name}
                    name={course.name}
                    points={course.points}
                    description={course.description}
                    publicId={course.publicId}
                />
            ))}
        </div>
    )
}