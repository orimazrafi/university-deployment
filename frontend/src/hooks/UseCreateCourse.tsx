import { Course } from '../interfaces';
import axios from 'axios';
import { graphqlconfiguration } from '../helpers';
export const UseCreateCourse = async (course: Course, cloudinaryImage: string) => {
    course.points = Number(course.points);
    let isSuccess = false
    try {
        let requestBody = {
            query: `
                    mutation {
                        createCourse(courseInput: {name: "${course.name}", points: ${course.points}, description: "${course.description}"
                        , proffesorId: "${course.proffesorId}"
                        , publicId: "${cloudinaryImage}"
                    }) {
                            _id
                    }
                }
                `
        };
        const configure: any = graphqlconfiguration(requestBody)
        const { data } = await axios(
            configure
        );
        if (!data.data.createCourse) return console.error(new Error(data.errors[0].message))
        isSuccess = true;
    } catch (ex) {
        return console.error(ex.message)
    }
    return isSuccess
}
