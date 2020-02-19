import React from "react"
import { ProffesorActivity } from "../../components/ProffesorActivity/ProffesorActivity";
import { StudentActivity } from "../../components/StudentActivity/StudentActivity";
import { proffesor, student } from "../../helpers";
import "./Activity.css";


export const Activity = ({ role, userId }: { role: string, name: string, userId: string }) => {
    return (
        <div className="activity__container">
            {role === proffesor && (
                <ProffesorActivity proffesorId={userId} />
            )}
            {role === student &&
                <StudentActivity
                    studentId={userId} />
            }
        </div>
    )
}