import React from "react"
import { ProffesorProfile } from "../../components/ProffesorProfile/ProffesorProfile";
import "./Profile.css";

export const Profile = ({ role, name, userId }: { role: string, name: string, userId: string }) => {
    return (
        <div className="profile__container">
            {role === 'admin' && <div>Admin</div>}
            {role === 'proffesor' && (
                <ProffesorProfile proffesorId={userId} />
            )}
            {role === 'student' && <div>Student</div>}
        </div>
    )
}