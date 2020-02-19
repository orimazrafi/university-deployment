import React from "react";
import { useSelector, useDispatch } from 'react-redux';
import { reduxGetProfessorAndCourses } from './../../features/Proffesors/ProffesorSlice';
import { cloudinaryFetchUrl } from "../../helpers";
import { ProffesorProfileI, ProffesorIntegrateCourses, ProffesorIntegrateCoursesObject } from "../../interfaces";
import "./ProffesorsList.css";

export const ProffesorsList = ({ proffesorsList }: { proffesorsList: ProffesorProfileI[] }) => {
    let groupedProffesorAndCourses: any;
    const dispatch = useDispatch()
    const { proffesorCourses } = useSelector((state: { proffesor: { proffesorCourses: ProffesorIntegrateCourses[] } }) => state.proffesor)
    React.useEffect(() => {
        const onLoad = async () => {
            await dispatch(reduxGetProfessorAndCourses())
        }
        onLoad()
    }, [dispatch])
    if (proffesorCourses) {
        groupedProffesorAndCourses = proffesorCourses.reduce((acc: any, item: ProffesorIntegrateCoursesObject) => {
            (acc[item.proffesorId] || (acc[item.proffesorId] = [])).push({ courseId: item.courseId, name: item.name });
            return acc;
        }, {});
    }

    return (
        <div className="proffesor__list__container">
            {proffesorsList.map((proffesor: ProffesorProfileI) => {
                return (
                    <div className="card" key={proffesor.email}>
                        <h5 className="card-title" > {proffesor.name}</h5>
                        <img src={`${cloudinaryFetchUrl}/${proffesor.publicId}`} alt="profile" />
                        <div className="card-body card__proffesor__body" >
                            <h5 >proffesor courses:</h5>
                            <div className="card__small__register" >
                                {groupedProffesorAndCourses[proffesor.userId] &&
                                    groupedProffesorAndCourses[proffesor.userId]
                                        .map((c: { name: string }) => <h6 key={c.name} ><b> {c.name}</b></h6>)}
                            </div>
                        </div>
                    </div>
                )
            }
            )}
        </div>
    )
}

