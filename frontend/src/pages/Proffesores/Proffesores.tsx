import React from "react";
import { Input } from './../../common/Input/Input';
import { reduxProfessoerAuth } from "../../features/Proffesors/ProffesorSlice";
import { useDispatch } from 'react-redux';

export const Proffesores = () => {
    const dispatch = useDispatch()

    const [user, setvalues] = React.useState({ email: "", password: "", name: "" });

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
        console.log(user)


        try {
            const isAuth: any = await dispatch(reduxProfessoerAuth(user, true));
            console.log(isAuth)
        } catch (ex) {
            console.log(ex)
        }
        //     if (isAuth) {
        //         window.location.replace("/")
        //     }
        // } catch (ex) {
        //     console.log(ex.message)
        // }

    }
    return (
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
        </form>)
}