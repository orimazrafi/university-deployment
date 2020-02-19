
export interface AdminAuth {
    email: String,
    password: string,
    name: string
}
export interface Admin {
    email: string,
    role: string,
    name: string,
    publicId: string,
    registerCourses?: [string]

}
export interface StudentCourses {
    courseId: string,
    name: string,
    points: number,
    description: string,
    proffesorId: string,
    registerStudents: string[],
    publicId: string
}





export interface ProffesorIntegrateCourses {
    courseId: string,
    name: string,
    proffesorId: string

}
export interface ProffesorIntegrateCoursesObject {
    courseId: string,
    name: string,
    proffesorId: string

}
export interface ProffesorIntegrateCoursesArray {
    courseId: string | string[],
    name: string,
    proffesorId: string | string[]

}
export interface Proffesor {
    email: string,
    name: string,
    role: string,
    publicId: string,
    registerCourses: [string]

}
export interface ProffesorProfileI {
    userId: string,
    name: string,
    registerCourses: string[],
    email: string,
    publicId: string,

}
export interface ProffesorWithCourses {
    courseId: string,
    name: string,
    points: number,
    description: string,
    proffesorId: string,
    role: string,
    registerStudents: string[]
    publicId: string,
}


export interface ProffesorAuth {
    email: String,
    password: string,
    name?: string
}
export interface Course {
    courseId?: string,
    publicId: string
    name: String,
    points: number,
    description: string,
    registerStudents?: [string],
    proffesorId?: string,
}
//when i had course component name!
export interface CourseInterface {
    courseId: string,
    publicId: string
    name: string,
    points: number,
    description: string,
    registerStudents: [string],
    proffesorId?: string,
}





export interface UserObjectImage {
    name: string;
    publicId: string;
    userId: string;

}


export interface StudentAuth {
    email: String,
    password: string,
    name?: string
}
export interface Student {
    userId: string,
    name: string
    email: string,
    role: string,
    publicId: string,
    registerCourses?: []
}
export interface StudentList {
    name: string
    email: string,
    role: string,
    registerCourses: string[]
    publicId: string,
}


export interface Credentials {
    userId: null | string,
    token: string,
    name: string,
    email: string
}
export type ChangeEvent = React.ChangeEvent<HTMLFormElement> | React.ChangeEvent<HTMLTextAreaElement>;
