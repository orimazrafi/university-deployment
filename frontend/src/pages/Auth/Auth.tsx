import React, { useState } from "react";
import "./Auth.css";
import { AuthHook } from "../../Hooks/AuthHook"
export const Auth = () => {

    const [user, setvalues] = useState({ email: "", password: "", name: "" });
    const [login, setAuth] = useState<boolean>(true)
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value, name } = event.currentTarget
        setvalues(prevValue => (
            {
                ...prevValue,
                [name]: value
            }
        ))
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const { res }: any = AuthHook(user, login);
        console.log(user, login)
    }

    const handleForm = () => {
        setAuth(prev => !prev)
    }

    const handleClassName = () => {
        let className = 'form-actions';
        return className += login ? ' login' : ' signup'

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
            {!login
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
                <button type="submit">{login ? 'Login' : 'Signup'}</button>
                <button onClick={handleForm} type="button">change signin method </button>
            </div>
        </form>
    )

}

