import React from "react";
import "./Courses.css";
import { useDispatch, useSelector } from 'react-redux';
import { reduxGetCourses } from "../../features/Courses/CourseSlice";
import { CoursesList } from './../../components/CoursesList/CoursesList';
export const Courses = ({ userId }: { userId: string }) => {
    const { courses } = useSelector((state: any) => state.course)
    React.useEffect(() => {
        handlecourses()
    }, [])
    const dispatch = useDispatch();
    const handlecourses = async () => {
        await dispatch(reduxGetCourses(userId))
    }
    console.log('courses', courses)
    return (
        <div className="courses__container" >
            {courses.length > 0 &&
                <CoursesList courses={courses} />
            }
        </div>
    )
}
