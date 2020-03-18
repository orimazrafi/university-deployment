import React from "react";
import { useDropzone } from 'react-dropzone';
import { cloudinaryFetchUrl } from "../../helpers";
import "./DropzoneImage.css";

export const DropzoneImage = ({
    cloudinaryImage,
    onDrop,
    image }:
    {
        cloudinaryImage: string,
        onDrop: (acceptedFiles: File[]) => Promise<void>,
        image: string
    }) => {
    const { getRootProps, getInputProps } = useDropzone({ onDrop })

    return (<div className="mb-2 dropzone__image__container"  {...getRootProps()}>
        <input {...getInputProps()} />

        {cloudinaryImage || image ?
            cloudinaryImage ?
                <img className="dropzone" src={`${cloudinaryFetchUrl}/${cloudinaryImage}`} alt="profile" />
                :
                <img className="dropzone" src={`${cloudinaryFetchUrl}/${image}`} alt="profile" />
            : null}
    </div>)
}