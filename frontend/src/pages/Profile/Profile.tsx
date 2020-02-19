import React from 'react';

import "./Profile.css";
import { ProffesorProfile } from '../../components/ProffesorProfile/ProffesorProfile';
import { StudentProfile } from '../../components/StudentProfile/StudentProfile';
import { AdminProfile } from './../../components/AdminProfile/AdminProfile';
import { admin, proffesor, student } from '../../helpers';
export const Profile = ({ userId, role }: { userId: string, role: string }) => {



    return (
        <React.Fragment>
            {role === admin &&
                <AdminProfile userId={userId} role={role} />
            }
            {role === proffesor &&
                <ProffesorProfile userId={userId} role={role} />
            }
            {role === student &&
                <StudentProfile userId={userId} role={role} />
            }
        </React.Fragment>

    )
}