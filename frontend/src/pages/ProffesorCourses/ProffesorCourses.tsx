import React from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { reduxSetProfessor } from './../../features/Proffesors/ProffesorSlice';
import { defaultImg } from './../../helpers';
export const ProffesorCourses = ({ proffesorId }: { proffesorId: string }) => {
    const dispatch = useDispatch()
    const { user } = useSelector((state: any) => state.proffesor)

    React.useEffect(() => {
        onLoad()
    }, [])

    const onLoad = async () => {
        await dispatch(reduxSetProfessor(proffesorId))

    }

    return (<div>
        <h4>my Profile</h4>
        <div className="card" >
            <img src={defaultImg} className="card-img-top" height="200" width="100" alt="proffesor" />
            <div className="card-body">
                <p className="card-title">name : {user.name}</p>
                <p className="card-title">token : {user.token}</p>
                <button className="btn btn-primary">Edit</button>
            </div>
        </div>
    </div>)
}