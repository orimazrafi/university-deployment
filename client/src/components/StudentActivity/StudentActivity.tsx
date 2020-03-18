import React from "react";
import { reduxGetStudentCourses } from "../../features/Students/StudentsSlice";
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";
import { cloudinaryFetchUrl } from "../../helpers";

import "./StudentActivity.css";
import { StudentCourses } from "../../interfaces";

export const StudentActivity = ({ studentId, name, publicId }: { studentId: string, name: string, publicId: string }) => {
    const history = useHistory()
    const dispatch = useDispatch()
    const { studentCourses } = useSelector((state: { student: { studentCourses: StudentCourses[] } }) => state.student)
    React.useEffect(() => {
        const onLoad = async () => {
            await dispatch(reduxGetStudentCourses(studentId))

        }
        onLoad()
    }, [dispatch, studentId])

    const handleChat = (courseId: string) => {
        history.push(`/chat/${courseId}`, { studentId, courseId, name, publicId })
    }

    return (
        <div className="student__activity__wrapper">
            <div className="student__activity__headline" >
                <h1>my courses!</h1>
                <h3>
                    currently you are learning
                    {" " + studentCourses.length} courses
                    <br />
                    and a total of
                {" "}{studentCourses && studentCourses.reduce((acc: number, cur: StudentCourses) => {
                        let sum = acc + cur.points;
                        return sum
                    }, 0)} points to your degree
                </h3>
            </div>
            <div className="student__activity__container">
                <div className="student__activity__courses">
                    {studentCourses.length > 0 &&
                        studentCourses.map((course: StudentCourses) => (
                            <div className="card" key={course.name}>
                                <img className="student__activity" src={`${cloudinaryFetchUrl}/${course.publicId}`} alt="profile" height="100" width="200" />
                                <div className="card-body student__activity__card__body">
                                    <p className="card-title">name : {course.name}</p>
                                    <b><p className="card-title">points : {course.points}</p></b>
                                    <p className="card-title">description : {course.description}</p>
                                    <button className="btn btn-success" onClick={
                                        () => handleChat(course.courseId)}>course chat</button>
                                </div>
                            </div>
                        ))}
                </div>
            </div>
        </div>

    )
}