import axios from "axios";
import { cloudinaryUrl } from '../helpers';

export const UseCloudinaryUpload = async (formData: FormData) => {
    return await axios.post(
        cloudinaryUrl,
        formData,
    );
}

