import React from "react";
import "./ProffesorsList.css";
import { defaultImg } from "../../helpers"

export const ProffesorsList = ({ proffesorsList }: any) => {
    return (
        <div className="proffesor__list__container">
            {proffesorsList.map((proffesor: any) =>
                <div className="card" key={proffesor.email}>
                    <img src={defaultImg} className="card-img-top" height="200" width="100" alt="proffesor" />
                    <div className="card-body">
                        <p className="card-title">name : {proffesor.name}</p>
                        <p className="card-title">email : {proffesor.email}</p>
                    </div>
                </div>
            )}
        </div>
    )
}

