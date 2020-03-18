import axios from 'axios';
import { graphqlconfiguration } from '../helpers';
export const UseUpdateCourse = async (course: any, cloudinaryImage: string) => {
    if (typeof course.points === 'number') {
        course.points = Number(course.points);
    }
    let isSuccess = false
    try {
        let requestBody = {
            query: `
                    mutation {
                        updateCourse(
                            courseUpdateInput: {
                            courseId: "${course.courseId}"
                            name: "${course.name}", 
                            points: ${course.points}, 
                            description: "${course.description}",
                            publicId: "${cloudinaryImage}"
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
        if (!data.data.updateCourse) return console.error(new Error(data.errors[0].message))
        isSuccess = true;
    } catch (ex) {
        return console.error(ex.message)
    }
    return isSuccess
}
