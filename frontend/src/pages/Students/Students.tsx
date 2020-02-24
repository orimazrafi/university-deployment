import React from "react";
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { reduxGetStudentsWithCousesName } from "../../features/Students/StudentsSlice";
import { cloudinaryFetchUrl } from "../../helpers";
import { StudentList } from "../../interfaces"
import "./Students.css";

export const Students = () => {
    const dispatch = useDispatch()
    const { students } = useSelector((state: { student: { students: any[] } }) => state.student)
    React.useEffect(() => {
        dispatch(reduxGetStudentsWithCousesName())
    }, [dispatch])


    return (
        <div className="students__wrapper" >
            <div className="students__list__container">
                {students.length && students.map((student: any) => {
                    return (
                        <div className="card" key={student.email}>
                            <h5 className="card-title"> {student.name} </h5 >
                            <img
                                src={`${cloudinaryFetchUrl}/${student.publicId}`} alt="profile" />
                            <div className="card-body card__student__courses____body">
                                <h6 className="text-primary">Register courses</h6>
                                <small className="card__small__register" >
                                    {student.registerCourses && student.registerCourses.map(
                                        (course: any) =>
                                            <p key={course.name}><b>{course.name}</b></p>
                                    )}
                                </small>
                            </div>
                        </div>
                    )
                }
                )}
            </div>
        </div>
    )

}



