import React, { useState, useCallback } from "react";
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { reduxSetProfessor, reduxUpdateProffesor } from '../../features/Proffesors/ProffesorSlice';
import { UseFormData } from './../../hooks/UseFormData';
import { UseCloudinaryUpload } from './../../hooks/UseCloudinaryUpload';
import { setCloudinaryUserObject } from "../../helpers";
import { UseChangeInput } from "../../hooks/UseChangeInput";
import { ModalComponent } from './../ModalComponent/ModalComponent';
import { ProfileCard } from './../ProfileCard/ProfileCard';
import { ChangeEvent, ProffesorProfileI } from "../../interfaces";

export const ProffesorProfile = ({ userId, role }: { userId: string, role: string }) => {
    const dispatch = useDispatch()
    const { proffesor } = useSelector((state: { proffesor: { proffesor: ProffesorProfileI } }) => state.proffesor)
    React.useEffect(() => {
        const onLoad = async () => {
            await dispatch(reduxSetProfessor(userId))
        }
        onLoad()
    }, [dispatch, userId])

    const [modal, setModal] = useState(false);

    const [user, setvalues] = useState({ name: "", image: proffesor.publicId, email: proffesor.email });
    const handleClose = () => {
        setModal(false);
        setCloudinaryImage(() => (proffesor.publicId))
    }

    const handleModal = () => {
        setModal(true);

        setvalues(() => ({ name: proffesor.name, image: proffesor.publicId, email: proffesor.email }))
    }

    const [cloudinaryImage, setCloudinaryImage] = useState(proffesor.publicId)

    const onDrop = useCallback(async (acceptedFiles: File[]) => {
        const formData = UseFormData(acceptedFiles[0])
        const { data } = await UseCloudinaryUpload(formData)
        setCloudinaryImage(() => (data.public_id))
    }, [])

    const handleSave = async () => {
        const userObj = setCloudinaryUserObject(
            { name: user.name || proffesor.name, userId: proffesor.userId }
            , cloudinaryImage || proffesor.publicId
        )

        await dispatch(reduxUpdateProffesor(userObj));

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
                role={role}
                user={proffesor}
                handleModal={handleModal}
            />
            <ModalComponent
                modal={modal}
                handleClose={handleClose}
                handleModal={handleModal}
                userRole={"proffesor"}
                cloudinaryImage={cloudinaryImage}
                onDrop={onDrop}
                user={user}
                handleChange={handleChange}
                handleSave={handleSave}
            />
        </React.Fragment>
    )
}