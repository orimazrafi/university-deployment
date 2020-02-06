import React from "react";
import { defaultCourseImg } from './../../helpers';

export const Course = ({ name, points, description }: {
    name: string, points: string, description: string
}) => {
    return (
        <React.Fragment>
            <div className="card" key={name}>
                <img src={defaultCourseImg} className="card-img-top" height="200" width="100" alt="proffesor" />
                <div className="card-body">
                    <p className="card-title">name : {name}</p>
                    <p className="card-title">points : {points}</p>
                    <p className="card-title">description : {description}</p>
                    <button className="btn btn-primary">Sign UP</button>
                </div>
            </div>
        </React.Fragment>
    )
}