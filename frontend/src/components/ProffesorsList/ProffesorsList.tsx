import React from "react";

export const ProffesorsList = ({ proffesorsList }: any) => {
    return (
        <React.Fragment>
            {proffesorsList.map((proffesor: any) =>
                <div key={proffesor.email}>
                    name: {proffesor.name}
                    email:{proffesor.email}
                </div>)}
        </React.Fragment>
    )
}

