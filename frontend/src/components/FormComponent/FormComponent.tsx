import React from "react";
import { Input } from './../../common/Input/Input';

export const FormComponent = (
    {
        handleSubmit,
        data,
        handleChange,

    }: {
        handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void,
        data: {
            email: string,
            password: string,
            name: string
            points?: string,
            description?: string,

        },
        handleChange: (event: React.ChangeEvent<HTMLFormElement>) => void,

    }

) => {


    return (
        <div className="form__wrapper">
            <form onSubmit={handleSubmit} className="form-container">
                {data.email !== undefined &&
                    <Input
                        label="Email"
                        value={data.email}
                        handleChange={handleChange}
                        name="email"
                        placeholder="Email..."
                        type="text" />
                }
                {data.password !== undefined &&
                    <Input
                        label="Password"
                        value={data.password}
                        handleChange={handleChange}
                        name="password"
                        placeholder="password..."
                        type="password" />
                }
                {data.name !== undefined &&
                    <Input
                        label="Name"
                        value={data.name}
                        handleChange={handleChange}
                        name="name"
                        placeholder="name..."
                        type="text" />
                }
                {data.points !== undefined &&
                    <Input
                        label="Points"
                        value={data.points}
                        handleChange={handleChange}
                        name="points"
                        type={"number"} />
                }
                {data.description !== undefined &&

                    <Input
                        label="Description"
                        value={data.description}
                        handleChange={handleChange}
                        name="description"
                        placeholder="Description..."
                        type={"text"}

                    />

                }

                <div >
                    <button type="submit" className="btn btn-primary">Submit</button>
                </div>
            </form>
        </div>

    )
}