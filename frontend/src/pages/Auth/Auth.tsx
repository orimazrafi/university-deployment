import React, { useState } from "react";
import "./Auth.css";
import { useDispatch } from "react-redux"
import { reduxAuth } from "../../features/Users/UserSlice"


export const Auth = (props: any) => {
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
        event.preventDefault();
        await dispatch(reduxAuth(user, isLogin))
        console.log(props.history.location)
        return window.location.replace("/")

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
            <div className="form-control">
                <label>
                    Email:
                    </label>
                <input
                    type="text"
                    placeholder="Email..."
                    name="email"
                    value={user.email}
                    onChange={handleChange} />
            </div>
            <div className="form-control">
                <label>
                    Password:
                    </label>

                <input
                    type="password"
                    placeholder="Password..."
                    name="password"
                    value={user.password}
                    onChange={handleChange} />
            </div>
            {!isLogin
                &&
                <div className="form-control">
                    <label>
                        Name:
                        </label>
                    <input
                        type="name"
                        placeholder="Name..."
                        name="name"
                        value={user.name}
                        onChange={handleChange} />
                </div>
            }
            <div className={handleClassName()}>
                <button type="submit">{isLogin ? 'isLogin' : 'Signup'}</button>
                <button onClick={handleForm} type="button">change signin method </button>
            </div>
        </form>
    )

}

