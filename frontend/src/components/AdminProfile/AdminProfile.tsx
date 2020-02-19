import React, { useState, useCallback, useEffect } from "react";

import { useSelector, useDispatch } from 'react-redux';
import { reduxSetAdmin, reduxUpdateAdmin } from "../../features/Admin/AdminSlice";
import { UseCloudinaryUpload } from '../../hooks/UseCloudinaryUpload';
import { UseFormData } from './../../hooks/UseFormData';
import { setCloudinaryUserObject } from "../../helpers";
import { UseChangeInput } from "../../hooks/UseChangeInput";
import { ModalComponent } from './../ModalComponent/ModalComponent';
import { ProfileCard } from './../ProfileCard/ProfileCard';
import { UserObjectImage } from "../../interfaces";
export const AdminProfile = ({ userId, role }: { userId: string, role: string }) => {
    const { admin } = useSelector((state: any) => state.admin)
    const dispatch = useDispatch();
    const [cloudinaryImage, setCloudinaryImage] = useState(admin.publicId)
    const [modal, setModal] = useState(false);
    const [user, setvalues] = useState({ name: "", image: "" });

    useEffect(() => {
        const onLoad = async () => {
            await dispatch(reduxSetAdmin(userId))
        }
        onLoad()
    }, [dispatch, userId])

    const handleClose = () => {
        setModal(false);
        setCloudinaryImage(() => (admin.publicId))
    }

    const handleModal = () => {
        setModal(true);
        setvalues(() => ({ name: admin.name, image: admin.publicId }))
    }


    const onDrop = useCallback(async (acceptedFiles: File[]) => {
        const formData = UseFormData(acceptedFiles[0])
        const { data } = await UseCloudinaryUpload(formData)
        setCloudinaryImage(() => (data.public_id))
    }, [])


    const handleSave = async () => {
        const userObj: UserObjectImage = setCloudinaryUserObject(
            { name: user.name || admin.name, userId: admin.userId },
            cloudinaryImage || admin.publicId
        )
        await dispatch(reduxUpdateAdmin(userObj));
        setTimeout(() => {

            setModal(false);
        }, 1000)

    }
    const handleChange = (event: any) => {
        UseChangeInput(event, setvalues)
    }
    return (
        <React.Fragment>
            <ProfileCard
                user={admin}
                handleModal={handleModal}
                role={role}
            />
            <ModalComponent
                modal={modal}
                handleClose={handleClose}
                handleModal={handleModal}
                userRole={admin.role}
                cloudinaryImage={cloudinaryImage}
                onDrop={onDrop}
                user={user}
                handleChange={handleChange}
                handleSave={handleSave}
            />
        </React.Fragment >
    );
}
