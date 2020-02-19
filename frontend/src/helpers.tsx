import config from "./config/default";

export const cloudinaryUrl = `https://api.cloudinary.com/v1_1/${config.couldinaryName}/image/upload`;
export const cloudinaryFetchUrl = `https://res.cloudinary.com/${config.couldinaryName}/image/upload`;
export const courseAvatar = 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRd-roLsuU5Ctl3dEDcm87Wl8dGQBslplw9F7ArVcFNPMnmOs_d';
export function setCloudinaryUserObject(user: { name: string, userId: string }, cloudinaryImage: string) {
    const userObj = {
        name: user.name,
        publicId: cloudinaryImage,
        userId: user.userId
    }
    return userObj
}
export function graphqlconfiguration(requestBody: { query: string }) {
    return {
        method: "POST",
        url: "http://localhost:8000/graphql-university",
        data: requestBody
    }
}

export const student = "Student";
export const admin = "Admin";
export const proffesor = "Proffesor";