import React from "react";
import { cloudinaryFetchUrl } from "../../helpers";
import { reduxRegisterStudentInCourse } from "./../../features/Courses/CourseSlice";
import { reduxRegisterCourseInStudent } from "./../../features/Students/StudentsSlice";
import { useDispatch } from "react-redux";
import { CourseInterface } from "../../interfaces";
import "./Course.css";

export const Course = ({
  name,
  points,
  description,
  courseId,
  userId,
  courses,
  length,
  role,
  publicId
}: {
  name: string;
  points: number;
  description: string;
  courseId: string;
  userId: string;
  courses: CourseInterface[];
  length: number;
  role: string;
  publicId: string;
}) => {
  const [coursesRegister, setCoursesRegister] = React.useState<any>([]);
  React.useEffect(() => {
    courses.forEach((course: CourseInterface) => {
      if (course.registerStudents.indexOf(userId) !== -1) {
        setCoursesRegister((prevState: any) => [...prevState, course.courseId]);
      }
    });
  }, [courses, userId]);

  const dispatch = useDispatch();
  const handleRegister = async () => {
    if (
      window.confirm(
        "Are you sure you wish to sign to this course? this is cost 2000$"
      )
    ) {
      await dispatch(reduxRegisterStudentInCourse(courseId, userId));
      await dispatch(reduxRegisterCourseInStudent(userId, courseId));
    }
  };
  return (
    <React.Fragment>
      <div className=" card card-course" key={name}>
        <h5 className="card-title" style={{ textAlign: "center" }}>
          {name}{" "}
        </h5>
        {publicId !== null ? (
          <img
            className="courses__list__image"
            src={`${cloudinaryFetchUrl}/${publicId}`}
            alt="profile"
            height="100"
            width="200"
          />
        ) : (
          <img
            className="courses__list__image"
            src={`${cloudinaryFetchUrl}/download_nljny4`}
            alt="profile"
            height="100"
            width="200"
          />
        )}{" "}
        <div className="card-body card__course__body">
          <p className="card-title">
            points : <b>{points}</b>{" "}
          </p>
          <div>
            <small className="card-title" style={{ fontSize: "12px" }}>
              description : {description}
            </small>
          </div>
          <div className="card__small__register">
            {role === "Student" &&
              (coursesRegister.indexOf(courseId) !== -1 ? (
                <p style={{ fontSize: "14px" }} className="text-success">
                  <b>you already register for this course</b>
                </p>
              ) : (
                <button
                  className="btn btn-success"
                  disabled={coursesRegister.indexOf(courseId) !== -1}
                  onClick={handleRegister}
                >
                  sign up
                </button>
              ))}
            <div className="sweet-loading"></div>
          </div>
          {role !== "Student" && (
            <small className="card__small__register">
              {length === 0 && (
                <p>
                  There are <b>no</b> Register Students yet!
                </p>
              )}
              {length === 1 && (
                <p>
                  <b>1</b> student is register
                </p>
              )}
              {length > 1 && (
                <p>
                  <b>{length}</b> students are register
                </p>
              )}
            </small>
          )}
        </div>
      </div>
    </React.Fragment>
  );
};
