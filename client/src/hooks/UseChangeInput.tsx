import { ChangeEvent } from "../interfaces"

export const UseChangeInput = (event: ChangeEvent,
    setvalues: any

) => {
    const { value, name } = event.target

    setvalues((prevValue: any) => (
        {
            ...prevValue,
            [name]: value
        }
    ))
}