import React, { useEffect } from "react";
import { reduxGetProfessors } from "../../features/Proffesors/ProffesorSlice";
import { useDispatch, useSelector } from 'react-redux';
import { ProffesorsList } from "../../components/ProffesorsList/ProffesorsList";
import { UseChangeInput } from "../../hooks/UseChangeInput";
import { FormComponent } from './../../components/FormComponent/FormComponent';
import { UseProffesorAuth } from './../../hooks/UseProffesorAuth';
import { admin } from "../../helpers";
import { ProffesorProfileI } from "../../interfaces";
import "./Proffesores.css";

export const Proffesores = () => {

    const dispatch = useDispatch()
    const { proffesors } = useSelector((state: { proffesor: { proffesors: ProffesorProfileI[] } }) => state.proffesor)

    const [user, setvalues] = React.useState({ email: "", password: "", name: "" });
    const [displayProffesors, setDisplayProffesors] = React.useState(true)

    useEffect(() => {
        const onLoad = async () => {
            await dispatch(reduxGetProfessors())
        }
        onLoad()
    }, [displayProffesors, dispatch])


    const handleChange = (event: React.ChangeEvent<HTMLFormElement>) => {
        UseChangeInput(event, setvalues)
    }
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {

            let isAuth = await UseProffesorAuth(user, false, admin)

            await dispatch(reduxGetProfessors())
            if (isAuth) {
                setDisplayProffesors(true);
                setvalues({ email: "", password: "", name: "" })
            }

        } catch (ex) {
            console.error(ex.message)
        }

    }
    const handleToggle = () => {
        setDisplayProffesors(prevState => !prevState)
    }

    return (
        <div className="proffesors__container">
            <button className="btn btn-primary add-proffesor" onClick={handleToggle}>{displayProffesors ? `Add proffesor` : `display Proffesors`}</button>
            {displayProffesors ?
                <React.Fragment>
                    {proffesors && <ProffesorsList proffesorsList={proffesors} />
                    }
                </React.Fragment>
                :
                <FormComponent
                    handleSubmit={handleSubmit}
                    data={user}
                    handleChange={handleChange}
                />
            }
        </div>

    )
}