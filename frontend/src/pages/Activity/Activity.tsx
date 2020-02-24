import React from "react"
import { ProffesorActivity } from "../../components/ProffesorActivity/ProffesorActivity";
import { StudentActivity } from "../../components/StudentActivity/StudentActivity";
import { proffesor, student } from "../../helpers";
import "./Activity.css";


export const Activity = ({ role, userId, name, publicId }: { role: string, name: string, userId: string, publicId: string }) => {
    return (
        <div className="activity__container">
            {role === proffesor && (
                <ProffesorActivity proffesorId={userId} publicId={publicId} name={name} />
            )}
            {role === student &&
                <StudentActivity
                    studentId={userId} name={name} publicId={publicId} />
            }
        </div>
    )
}