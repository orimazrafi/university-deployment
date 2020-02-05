import React, { useState } from "react";
import "./Auth.css";
import { useDispatch } from "react-redux"
import { reduxAdminAuth } from "../../features/Users/UserSlice"
import { Input } from "../../common/Input/Input";
import { reduxProfessorAuth } from './../../features/Proffesors/ProffesorSlice';
import { reduxStudentAuth } from "../../features/Students/StudentsSlice";

export const Auth = () => {
    const dispatch = useDispatch()
    const [user, setvalues] = useState({ email: "", password: "", name: "" });
    const [isLogin, setAuth] = useState<boolean>(true)
    const [role, setRole] = useState('student')

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
        let isAuth;
        try {
            if (role === 'admin') {
                isAuth = await dispatch(reduxAdminAuth(user, isLogin));

            }
            if (role === 'proffesor') {
                isAuth = await dispatch(reduxProfessorAuth(user, isLogin));
            }
            if (role === 'student') {
                isAuth = await dispatch(reduxStudentAuth(user, isLogin));
            }
            if (typeof isAuth === 'boolean' && isAuth) {
                window.location.replace("/")

            }
            // if (isAuth) {
            // }
        } catch (ex) {
            console.log(ex.message)
        }

    }

    const handleForm = () => {
        setAuth(prev => !prev)
    }
    const handleRole = () => {
        setRole(prev => prev === 'student' ? 'proffesor' : 'student')
    }
    const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setRole(e.currentTarget.value)

    }


    const handleClassName = () => {
        let className = 'form-actionsw';
        return className += isLogin ? ' isLogin' : ' signup'

    }
    const handleDisabled = () => {
        let disabled = false;
        if (!isLogin && role === 'proffesor')
            disabled = true
        if (!isLogin && role === 'admin')
            disabled = true;
        return disabled

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
            {!isLogin &&
                <Input
                    label="Name"
                    value={user.name}
                    handleChange={handleChange}
                    name="name"
                    placeholder="name..."
                    type="text" />
            }

            <div className={handleClassName()}>
                <button type="submit" className="btn btn-primary" disabled={handleDisabled()}
                >{isLogin ? 'Login' : 'Signup'}</button>
                <button onClick={handleForm} className="btn btn-primary" type="button">change signin method </button>
                <select value={role} onChange={handleSelect} >
                    <option value="admin">Admin</option>
                    <option value="proffesor">Proffesor</option>
                    <option value="student">Student</option>
                </select>
                <button onSelect={handleRole} type="button"
                    className="btn btn-primary">{role}</button>
            </div>
        </form>
    )

}

