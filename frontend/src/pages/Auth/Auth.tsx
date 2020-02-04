import React, { useState } from "react";
import "./Auth.css";
import { useDispatch } from "react-redux"
import { reduxAuth } from "../../features/Users/UserSlice"
import { Input } from "../../common/Input/Input";


export const Auth = () => {
    const dispatch = useDispatch()
    const [user, setvalues] = useState({ email: "", password: "", name: "" });
    const [isLogin, setAuth] = useState<boolean>(true)

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
        try {
            event.preventDefault();
            const isAuth: any = await dispatch(reduxAuth(user, isLogin));
            if (isAuth) {
                window.location.replace("/")
            }
        } catch (ex) {
            console.log(ex.message)
        }

    }

    const handleForm = () => {
        setAuth(prev => !prev)
    }

    const handleClassName = () => {
        let className = 'form-actions';
        return className += isLogin ? ' isLogin' : ' signup'

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
                <button type="submit">{isLogin ? 'Login' : 'Signup'}</button>
                <button onClick={handleForm} type="button">change signin method </button>
            </div>
        </form>
    )

}

