import React, { useEffect, useState, useCallback } from "react";
import {
  reduxGetProffesorCourses,
  reduxRemoveCourse
} from "../../features/Courses/CourseSlice";
import { reduxSetProfessor } from "../../features/Proffesors/ProffesorSlice";
import { useDispatch, useSelector } from "react-redux";
import { ModalComponent } from "./../ModalComponent/ModalComponent";
import { UseFormData } from "./../../hooks/UseFormData";
import { UseCloudinaryUpload } from "./../../hooks/UseCloudinaryUpload";
import { UseChangeInput } from "../../hooks/UseChangeInput";
import { UseCreateCourse } from "./../../hooks/UseCreateCourse";
import { UseUpdateCourse } from "../../hooks/UseUpdateCourse";
import { ChangeEvent, ProffesorWithCourses } from "../../interfaces";
import { cloudinaryFetchUrl } from "../../helpers";
import { useHistory } from "react-router-dom";

import "./ProffesorActivity.css";

export const ProffesorActivity = ({
  proffesorId,
  publicId,
  name
}: {
  proffesorId: string;
  publicId: string;
  name: string;
}) => {
  const history = useHistory();

  const { proffesorCourses } = useSelector(
    (state: { course: { proffesorCourses: ProffesorWithCourses[] } }) =>
      state.course
  );
  const dispatch = useDispatch();
  const [modal, setModal] = useState(false);
  const [isUpdateModal, setIsUpdateModal] = useState(false);
  const [course, setCourse] = useState({
    courseId: "",
    name: "",
    points: 0,
    description: "",
    proffesorId,
    publicId: ""
  });
  const [cloudinaryImage, setCloudinaryImage] = useState("download_nljny4");

  useEffect(() => {
    const onLoad = async () => {
      await dispatch(reduxGetProffesorCourses(proffesorId));
      await dispatch(reduxSetProfessor(proffesorId));
    };
    onLoad();
  }, [dispatch, proffesorId, modal]);

  const handleRemove = async (courseId: string) => {
    if (window.confirm("Are you sure you wish to delete this item?")) {
      await dispatch(reduxRemoveCourse(courseId, proffesorId));
    }
  };
  const handleClose = () => {
    setIsUpdateModal(() => false);

    setModal(false);
    setCloudinaryImage(() => "");
  };

  const handleModal = () => {
    setCourse(() => ({
      courseId: "",
      name: "",
      points: 0,
      description: "",
      proffesorId: proffesorId,
      publicId: "download_nljny4",
      role: "",
      registerStudents: []
    }));
    setTimeout(() => {
      setModal(true);
    }, 200);
  };
  const handleUpdate = (course: ProffesorWithCourses) => {
    setCloudinaryImage(() => course.publicId);
    setIsUpdateModal(() => true);
    setCourse(() => ({
      courseId: course.courseId,
      name: course.name,
      points: course.points,
      description: course.description,
      proffesorId: course.proffesorId,
      publicId: course.publicId
    }));
    setModal(true);
  };

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const formData = UseFormData(acceptedFiles[0]);
    const { data } = await UseCloudinaryUpload(formData);
    setCloudinaryImage(() => data.public_id);
  }, []);
  const handleSave = async () => {
    try {
      let isSuccess: any = false;
      if (isUpdateModal) {
        isSuccess = await UseUpdateCourse(course, cloudinaryImage);
        if (isSuccess) {
          setTimeout(() => {
            setModal(false);
          }, 1000);
        }
      } else {
        isSuccess = await UseCreateCourse(course, cloudinaryImage);
        if (isSuccess) {
          setTimeout(() => {
            setModal(false);
          }, 1000);
        }
      }
    } catch (ex) {
      console.error(ex.message);
    }
  };
  const handleChange = (event: ChangeEvent) => {
    UseChangeInput(event, setCourse);
  };
  const handleChat = (courseId: string) => {
    console.log(name);
    history.push(`/chat/${courseId}`, {
      proffesorId,
      courseId,
      name,
      publicId
    });
  };
  return (
    <div className="proffesor-activity__wrapper">
      <div className="row flex-spaces child-borders">
        <label className="paper-btn margin" onClick={handleModal}>
          Add Course
        </label>
      </div>
      <ModalComponent
        modal={modal}
        handleClose={handleClose}
        handleModal={handleModal}
        userRole={"course"}
        cloudinaryImage={cloudinaryImage}
        onDrop={onDrop}
        user={course}
        handleChange={handleChange}
        handleSave={handleSave}
      />
      <div className="proffesor-activity__container">
        <div className="professor__activity__courses">
          {proffesorCourses.length > 0 &&
            proffesorCourses.map((course: ProffesorWithCourses) => {
              const { length } = course.registerStudents;
              return (
                <div className="card" key={course.name}>
                  <h5>{course.name}</h5>
                  {course.publicId !== null ? (
                    <img
                      className="course__proffesor"
                      src={`${cloudinaryFetchUrl}/${course.publicId}`}
                      alt="profile"
                    />
                  ) : (
                    <img
                      className="course__proffesor"
                      src={`${cloudinaryFetchUrl}/download_nljny4`}
                      alt="profile"
                    />
                  )}
                  <div className="card-body proffesor_course__body">
                    <p>points : {course.points}</p>
                    <h6>
                      <b>description</b> {course.description}
                    </h6>
                    {length === 0 && (
                      <div className="course__button__container">
                        <button
                          className="btn btn-small btn-primary"
                          onClick={e => handleUpdate(course)}
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-small btn-danger"
                          onClick={e => handleRemove(course.courseId)}
                        >
                          remove
                        </button>
                      </div>
                    )}
                    <small className="proffesor__register__students__text text-primary">
                      {length > 0 ? (
                        <React.Fragment>
                          <h6>
                            {length > 1
                              ? `${length} Registered Students`
                              : `${length} Registered Student`}
                          </h6>
                          <button
                            className="btn btn-success"
                            onClick={() => handleChat(course.courseId)}
                          >
                            course chat
                          </button>
                        </React.Fragment>
                      ) : (
                        <b>No Register yet.</b>
                      )}
                    </small>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};
