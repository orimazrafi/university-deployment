import React, { useState, useEffect } from "react";
import { DropzoneImage } from "../DropzoneImage/DropzoneImage";
import { Input } from './../../common/Input/Input';
import "./ModalComponent.css";
import { ChangeEvent, ProffesorProfileI } from "../../interfaces";
export const ModalComponent = (
    { modal,
        handleClose,
        userRole,
        cloudinaryImage,
        onDrop,
        user,
        handleChange,
        handleSave
    }: {
        modal: boolean,
        handleModal: () => void,
        handleClose: () => void,
        userRole: string,
        cloudinaryImage: string,
        onDrop: (file: File[]) => Promise<void>,
        user: ProffesorProfileI | any,
        handleChange: (event: ChangeEvent) => void,
        handleSave: () => Promise<void>
    }

) => {
    const [className, setClassName] = useState("modal")

    useEffect(() => {
        document.addEventListener('mousedown', handleClick, false)

        setClassName(() => modal ? "modal modal-open" : "modal modal-close")
        return (() => {
            document.removeEventListener('mousedown', handleClick, false)
        })
    }, [modal])

    const handleClick = (e: any
    ) => {
        const { className } = e.target
        if (className === "modal-bg" ||
            className === "btn-close" ||
            className === "paper-btn"
        ) {
            handleClose()
        }
        if (className === "paper-btn save") {
            handleSave()
        }
    }

    return (
        <React.Fragment>
            <div className={className}    >
                <label className="modal-bg" htmlFor="modal-1"></label>
                <div className="modal-body">
                    <h4 className="modal-title">{user.name ? "Update " : "Add "}{userRole}</h4>
                    <DropzoneImage
                        cloudinaryImage={cloudinaryImage}
                        onDrop={onDrop}
                        image={user.publicId}
                    />
                    <label className="btn-close" onClick={handleClick}>X</label>
                    <h5 className="modal-subtitle">
                        <Input
                            label="Name"
                            value={user.name}
                            handleChange={handleChange}
                            name="name"
                            placeholder="Name..."
                            type="text" />
                        {userRole === 'proffesor' &&
                            <div>

                                <p>Email</p>
                                <div className="sm-2 col border">{user.email}</div>
                            </div>

                        }


                        {userRole === 'course' &&
                            <Input
                                label="Points"
                                value={user.points}
                                handleChange={handleChange}
                                name="points"
                                type={"number"} />
                        }
                        {userRole === 'course' &&
                            <div className="form-group">
                                <label>Description</label>
                                <textarea className="input-block"
                                    placeholder="Description..."
                                    value={user.description}
                                    onChange={handleChange}
                                    name="description"
                                ></textarea>
                            </div>
                        }
                    </h5>

                    <label className="paper-btn" onClick={handleClick}>close!</label>
                    <button className="paper-btn btn-secondary" onClick={handleSave} disabled={
                        (userRole === 'course'
                            &&
                            !user.name &&
                            !user.points &&
                            !user.description
                            && true
                        )
                        ||
                        (userRole === 'proffesor' &&
                            !user.name &&
                            !user.publicId &&
                            true)
                    } >Save!</button>
                </div>
            </div>
        </React.Fragment >
    )
}