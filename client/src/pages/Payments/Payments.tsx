import React from "react";
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { reduxGetCourses } from "../../features/Courses/CourseSlice";
export const Payments = () => {
    const { courses } = useSelector((state: any) => state.course)
    const dispatch = useDispatch()
    React.useEffect(() => {
        const fetchCourses = async () => {
            await dispatch(reduxGetCourses('userId'))
        }
        fetchCourses()
    }, [dispatch])
    return (
        <div style={{ width: '100%' }}>
            <div style={{ textAlign: 'center' }}>
                <h4>
                    currently you have
            <b>

                        {courses && " " + courses.reduce((acc: any, cur: any) => {
                            return acc = acc + cur.registerStudents.length
                        }, 0) + " "}
                    </b>
                    courses that are register
                    </h4>
                <h2>Your university as income of{" " + 2000 * courses.reduce((acc: any, cur: any) => {
                    return acc = acc + cur.registerStudents.length
                }, 0)}$</h2>
            </div>
        </div>
    )
}