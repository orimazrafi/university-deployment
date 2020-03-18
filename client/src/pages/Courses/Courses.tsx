import React from "react";
import { useDispatch, useSelector } from 'react-redux';
import { reduxGetCourses } from "../../features/Courses/CourseSlice";
import { CoursesList } from './../../components/CoursesList/CoursesList';
import { reduxGetStudentCourses } from "../../features/Students/StudentsSlice";
import { CourseInterface } from './../../interfaces';
import { ClipLoaderComponent } from "../../components/ClipLoaderComponent/ClipLoaderComponent";
import "./Courses.css";


export const Courses = ({ userId, role }: { userId: string, role: string }) => {
    const { courses, loading } = useSelector((state: { course: { courses: CourseInterface[], loading: boolean } }) => state.course)
    const dispatch = useDispatch();
    React.useEffect(() => {
        const fetchCourses = async () => {
            await dispatch(reduxGetCourses(userId))
            await dispatch(reduxGetStudentCourses(userId))

        }
        fetchCourses()
    }, [userId, dispatch])

    return (
        <React.Fragment>
            {loading ?
                <ClipLoaderComponent loading={loading} />
                :
                <div className="courses__container" >
                    {courses.length > 0 &&
                        <CoursesList courses={courses} userId={userId} role={role} />
                    }
                </div>
            }
        </React.Fragment>
    )
}
