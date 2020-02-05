import React, { useEffect } from "react";
import { Input } from './../../common/Input/Input';
import { reduxProfessorAuth, reduxGetProfessors } from "../../features/Proffesors/ProffesorSlice";
import { useDispatch, useSelector } from 'react-redux';
import { ProffesorsList } from "../../components/ProffesorsList/ProffesorsList";
import "./Proffesores.css"

export const Proffesores = () => {
    const dispatch = useDispatch()
    const { proffesors } = useSelector((state: any) => state.proffesor)

    const [user, setvalues] = React.useState({ email: "", password: "", name: "" });
    const [displayProffesors, setDisplayProffesors] = React.useState(true)
    useEffect(() => {
        dispatch(reduxGetProfessors())
    }, [displayProffesors, dispatch])

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value, name } = event.currentTarget
        setvalues(prevValue => (
            {
                ...prevValue,
                [name]: value
            }
        ))
    }
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            const isAuth: any = await dispatch(reduxProfessorAuth(user, false));
            if (isAuth) {
                setDisplayProffesors(true);
                setvalues({ email: "", password: "", name: "" })
            }

        } catch (ex) {
            console.log(ex)
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
                <div className="form__wrapper">
                    <form onSubmit={handleSubmit} className="form-container">
                        <Input
                            label="Email"
                            value={user.email}
                            handleChange={handleChange}
                            name="email"
                            placeholder="Email..."
                            type="text" />
                        <Input
                            label="Password"
                            value={user.password}
                            handleChange={handleChange}
                            name="password"
                            placeholder="password..."
                            type="password" />
                        <Input
                            label="Name"
                            value={user.name}
                            handleChange={handleChange}
                            name="name"
                            placeholder="name..."
                            type="text" />

                        <div >
                            <button type="submit" className="btn btn-primary">Submit</button>
                        </div>
                    </form>
                </div>

            }
        </div>

    )
}