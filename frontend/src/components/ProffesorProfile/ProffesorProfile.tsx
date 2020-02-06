import React from "react";
import "./ProffesorProfile.css"
import { Input } from './../../common/Input/Input';
import { reduxCreateCourse, reduxGetProffesorCourses } from "../../features/Courses/CourseSlice";
import { reduxSetProfessor } from "../../features/Proffesors/ProffesorSlice";
import { useDispatch, useSelector } from 'react-redux';
import { defaultImg, defaultCourseImg } from "../../helpers";
export const ProffesorProfile = ({ proffesorId }: { proffesorId: string }) => {
    const { proffesorCourses } = useSelector((state: any) => state.course)
    const { user } = useSelector((state: any) => state.proffesor)
    React.useEffect(() => {
        onLoad()
    }, [])

    const dispatch = useDispatch()
    const [toggleCourses, setToggleCourses] = React.useState(false);
    const [course, setCourse] = React.useState({
        name: "",
        points: 0,
        description: "",
        proffesorId
    });


    const onLoad = async () => {
        await dispatch(reduxGetProffesorCourses(proffesorId))
        await dispatch(reduxSetProfessor(proffesorId))

    }
    const handleToggle = async () => {
        setToggleCourses(prevState => !prevState)

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
                <button className="btn btn-primary" onClick={handleToggle}>Toggle</button>
                {toggleCourses ?

                    <div className="professor__profile__courses">

                        {proffesorCourses.length > 0 &&
                            proffesorCourses.map((c: any) => (
                                <div className="card" key={c.name}>
                                    <img src={defaultCourseImg} className="card-img-top" height="200" width="100" alt="proffesor" />
                                    <div className="card-body">
                                        <p className="card-title">name : {c.name}</p>
                                        <p className="card-title">points : {c.points}</p>
                                        <p className="card-title">description : {c.description}</p>
                                        <button className="btn btn-primary">Edit</button>
                                    </div>
                                </div>
                            ))}
                    </div>
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