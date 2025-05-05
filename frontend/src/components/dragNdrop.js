import React from 'react';
import Uploady from "@rpldy/uploady";
import UploadDropZone from "@rpldy/upload-drop-zone";
import { useDropzone } from "react-dropzone";

const UploadDropzone = () => {
  const onDrop = (acceptedFiles) => {
    const formData = new FormData();
    acceptedFiles.forEach((file) => {
      formData.append("file", file);
    });

    fetch("http://127.0.0.1:8000/upload/", {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        if (response.ok) {
          console.log("File uploaded successfully");
        } else {
          console.error("File upload failed");
        }
      })
      .catch((error) => {
        console.error("Error uploading file:", error);
      });
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <Uploady destination={{ url: "upload/" }}>
      <UploadDropZone>
        <div {...getRootProps()} className="upload-dropzone">
          <input {...getInputProps()} />
          <p>Drag and drop files here, or click to select files</p>
        </div>
      </UploadDropZone>
    </Uploady>
  );
};

export default UploadDropzone;