import React from "react"
import { ProffesorProfile } from "../../components/ProffesorProfile/ProffesorProfile";
import "./Profile.css";

export const Profile = ({ role, name, userId }: { role: string, name: string, userId: string }) => {
    return (
        <div className="profile__container">
            {role === 'Admin' && <div>Admin</div>}
            {role === 'Proffesor' && (
                <ProffesorProfile proffesorId={userId} />
            )}
            {role === 'Student' && <div>Student</div>}
        </div>
    )
}