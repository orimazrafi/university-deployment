import React from "react";
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { reduxGetStudents } from "../../features/Students/StudentsSlice";
import { cloudinaryFetchUrl } from "../../helpers";
import { StudentList } from "../../interfaces"
import "./Students.css";

export const Students = () => {
    const dispatch = useDispatch()
    const { students } = useSelector((state: { student: { students: StudentList[] } }) => state.student)
    React.useEffect(() => {
        dispatch(reduxGetStudents())
    }, [dispatch])


    return (
        <div className="students__wrapper" >
            <div className="students__list__container">
                {students.length && students.map((student: StudentList) => {
                    const { length } = student.registerCourses
                    return (
                        <div className="card" key={student.email}>
                            <h5 className="card-title"> {student.name} </h5 >
                            <img
                                src={`${cloudinaryFetchUrl}/${student.publicId}`} alt="profile" />
                            <div className="card-body card__course__body">
                                <small className="card__small__register" >
                                    register to  <b>
                                        {
                                            length > 1 ? ` ${length} courses` : ` ${length} course`}
                                    </b>
                                </small>
                            </div>
                        </div>)
                }
                )}
            </div>
        </div>
    )

}