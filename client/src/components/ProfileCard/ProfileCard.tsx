import React from "react";
import { proffesor, cloudinaryFetchUrl } from "../../helpers";
import { Admin, ProffesorProfileI, Student } from "../../interfaces";

import "./ProfileCard.css";

export const ProfileCard = ({ handleModal, user, role }:
    { handleModal: () => void, user: ProffesorProfileI | Admin | Student, role: string }
) => {
    return (
        <div className="profile__container">
            <h4>{user.name}</h4>
            <div className="card profile__card">
                {user && user.publicId &&
                    <img className="proffesor__profile"
                        src={`${cloudinaryFetchUrl}/${user.publicId}`} alt="profile" />
                }
                <div className="card-body">
                    <div>
                        {role === proffesor &&
                            <p className="proffesor__register__courses text-primary" >
                                {user.registerCourses && <small>currently you have <b> {user.registerCourses.length} </b> courses that students can register to</small>}
                            </p>
                        }
                    </div>
                    <div className="row flex-spaces child-borders">
                        <label className="paper-btn margin" onClick={handleModal}>Update</label>
                    </div>
                </div>
            </div>
        </div>
    )
}