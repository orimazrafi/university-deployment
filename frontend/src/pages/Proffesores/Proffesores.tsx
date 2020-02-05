import React, { useEffect } from "react";
import { Input } from './../../common/Input/Input';
import { reduxProfessorAuth, reduxGetProfessors } from "../../features/Proffesors/ProffesorSlice";
import { useDispatch, useSelector } from 'react-redux';
import { ProffesorsList } from "../../components/ProffesorsList/ProffesorsList";

export const Proffesores = () => {
    const dispatch = useDispatch()
    const { proffesors } = useSelector((state: any) => state.proffesor)

    const [user, setvalues] = React.useState({ email: "", password: "", name: "" });
    const [displayProffesors, setDisplayProffesors] = React.useState(true)
    useEffect(() => {
        dispatch(reduxGetProfessors())
    }, [displayProffesors])

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
            const isAuth: any = await dispatch(reduxProfessorAuth(user, true));
            console.log(isAuth)
            setDisplayProffesors(true)
        } catch (ex) {
            console.log(ex)
        }

    }
    const handleToggle = () => {
        setDisplayProffesors(prevState => !prevState)
    }
    return (
        <div>
            <button onClick={handleToggle}>{displayProffesors ? `Add proffesor` : `display Proffesors`}</button>
            {displayProffesors ?
                <React.Fragment>
                    {proffesors && <ProffesorsList proffesorsList={proffesors} />
                    }
                </React.Fragment>
                :
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
                        <button type="submit">Submit</button>
                    </div>
                </form>
            }
        </div>

    )
}