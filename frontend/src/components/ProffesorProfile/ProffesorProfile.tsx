import React from "react";
import "./ProffesorProfile.css"
import { Input } from './../../common/Input/Input';
import { reduxCreateCourse, reduxGetCourses } from "../../features/Courses/CourseSlice";
import { reduxSetProfessor } from "../../features/Proffesors/ProffesorSlice";
import { useDispatch, useSelector } from 'react-redux';
export const ProffesorProfile = ({ proffesorId }: { proffesorId: string }) => {
    const { courses } = useSelector((state: any) => state.course)

    const dispatch = useDispatch()
    const [toggleCourses, setToggleCourses] = React.useState(false);
    const [course, setCourse] = React.useState({
        name: "",
        points: 0,
        description: "",
        proffesorId
    });
    React.useEffect(() => {

    }, [])
    const handleToggle = async () => {
        setToggleCourses(prevState => !prevState)
        await dispatch(reduxGetCourses(proffesorId))
        await dispatch(reduxSetProfessor(proffesorId))


    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value, name } = event.currentTarget
        setCourse(prevValue => (
            {
                ...prevValue,
                [name]: value
            }
        ))
    }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        await dispatch(reduxCreateCourse(course))
    }

    return (
        <div className="proffesorProfile__wrapper">
            <div className="proffesorProfile__container">
                <button className="btn btn-primary" onClick={handleToggle}>toggle</button>
                {toggleCourses ?
                    <div>your profile+{courses.length > 0 &&
                        courses.map((c: any) => <div key={c.name}>{c.name}</div>)}</div>
                    :
                    <form onSubmit={handleSubmit} className="form-container">
                        <Input
                            label="Name"
                            value={course.name}
                            handleChange={handleChange}
                            name="name"
                            placeholder="Name..."
                            type={"text"}
                        />
                        <Input
                            label="Points"
                            value={course.points}
                            handleChange={handleChange}
                            name="points"
                            type={"number"} />
                        <Input
                            label="Description"
                            value={course.description}
                            handleChange={handleChange}
                            name="description"
                            placeholder="Description..."
                            type={"text"}

                        />

                        <div>
                            <button type="submit" className="btn btn-primary"
                            >Submit
                            </button>
                        </div>
                    </form>
                }
            </div>
        </div>

    )
}