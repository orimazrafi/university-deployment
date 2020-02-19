import React, { useCallback, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { reduxSetStudent, reduxUpdateStudent } from './../../features/Students/StudentsSlice';
import { UseFormData } from './../../hooks/UseFormData';
import { UseCloudinaryUpload } from './../../hooks/UseCloudinaryUpload';
import { setCloudinaryUserObject } from "../../helpers";
import { UseChangeInput } from "../../hooks/UseChangeInput";
import { ModalComponent } from './../ModalComponent/ModalComponent';
import { ProfileCard } from './../ProfileCard/ProfileCard';
import { ChangeEvent, Student } from "../../interfaces";
import "./StudentProfile.css";

export const StudentProfile = ({ userId, role }: { userId: string, role: string }) => {
    const { student } = useSelector((state: { student: { student: Student } }) => state.student)
    const dispatch = useDispatch()

    const [cloudinaryImage, setCloudinaryImage] = useState(student.publicId)
    const [modal, setModal] = useState(false);
    const [user, setvalues] = useState({ name: "", image: "" });

    React.useEffect(() => {
        const onLoad = async () => {
            await dispatch(reduxSetStudent(userId))
        }
        onLoad()
    }, [dispatch, userId])
    const handleClose = () => {
        setModal(false);
        setCloudinaryImage(() => (""))
    }

    const handleModal = () => {
        setvalues(() => ({ name: student.name, image: student.publicId }))
        setCloudinaryImage(() => (student.publicId))

        setModal(true);
    }



    const onDrop = useCallback(async (acceptedFiles: File[]) => {
        const formData = UseFormData(acceptedFiles[0])
        const { data } = await UseCloudinaryUpload(formData)
        setCloudinaryImage(() => (data.public_id))
    }, [])


    const handleSave = async () => {
        const userObj = setCloudinaryUserObject(
            { name: user.name || student.name, userId: student.userId }
            , cloudinaryImage || student.publicId)
        await dispatch(reduxUpdateStudent(userObj));
        setTimeout(() => {

            setModal(false);
        }, 1000)
    }
    const handleChange = (event: ChangeEvent) => {
        UseChangeInput(event, setvalues)
    }

    return (
        <React.Fragment>

            <ProfileCard
                user={student}
                handleModal={handleModal}
                role={role}
            />
            <ModalComponent
                handleModal={handleModal}
                modal={modal}
                handleClose={handleClose}
                userRole={student.role}
                cloudinaryImage={cloudinaryImage}
                onDrop={onDrop}
                user={user}
                handleChange={handleChange}
                handleSave={handleSave}
            />
        </React.Fragment>
    )
}