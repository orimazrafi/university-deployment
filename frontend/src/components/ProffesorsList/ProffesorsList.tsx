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
                        <h5 className="card-title">name : {proffesor.name}</h5>
                        <h5 className="card-title">email : {proffesor.email}</h5>
                    </div>
                </div>
            )}
        </div>
    )
}

