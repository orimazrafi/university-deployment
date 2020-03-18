import React, { useState, useCallback } from "react";

import { Input } from "../../common/Input/Input";
import { UseCloudinaryUpload } from "./../../hooks/UseCloudinaryUpload";
import { UseFormData } from "./../../hooks/UseFormData";
import { UseChangeInput } from "../../hooks/UseChangeInput";
import { DropzoneImage } from "../../components/DropzoneImage/DropzoneImage";
import { student, admin, proffesor } from "../../helpers";
import { UseProffesorAuth } from "./../../hooks/UseProffesorAuth";
import { UseStudentAuth } from "./../../hooks/UseStudentAuth";
import { UseAdminAuth } from "../../hooks/UseAdminAuth";
import "./Auth.css";

export const Auth = () => {
  const [user, setvalues] = useState({
    email: "",
    password: "",
    name: "",
    image: ""
  });
  const [cloudinaryImage, setCloudinaryImage] = useState(
    "default_avatar_k049ck"
  );
  const [isLogin, setAuth] = useState<boolean>(true);
  const [role, setRole] = useState(student);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const formData = UseFormData(acceptedFiles[0]);
    const { data } = await UseCloudinaryUpload(formData);
    setCloudinaryImage(() => data.public_id);
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLFormElement>) => {
    UseChangeInput(event, setvalues);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    let isAuth;
    try {
      if (role === admin) {
        isAuth = await UseAdminAuth(user, isLogin);
      }
      if (role === proffesor) {
        isAuth = await UseProffesorAuth(user, isLogin, proffesor);
      }
      if (role === student) {
        isAuth = await UseStudentAuth(user, isLogin, cloudinaryImage);
      }
      if (typeof isAuth === "boolean" && isAuth) {
        window.location.replace("/");
      }
    } catch (ex) {
      console.log(ex.message);
    }
  };

  const handleForm = () => {
    setAuth(prevState => !prevState);
  };

  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setRole(e.target.value);
  };

  const handleClassName = () => {
    let className = "form-actionsw";
    return (className += isLogin ? " isLogin" : " signup");
  };
  const handleDisabled = () => {
    let disabled = false;
    if (!isLogin && role === proffesor) disabled = true;
    if (!isLogin && role === admin) disabled = true;
    return disabled;
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <Input
        label="Email"
        value={user.email}
        handleChange={handleChange}
        name="email"
        placeholder="Email..."
        type="text"
      />
      <Input
        label="Password"
        value={user.password}
        handleChange={handleChange}
        name="password"
        placeholder="password..."
        type="password"
      />
      {!isLogin && (
        <React.Fragment>
          <DropzoneImage
            cloudinaryImage={cloudinaryImage}
            onDrop={onDrop}
            image={user.image}
          />

          <Input
            label="Name"
            value={user.name}
            handleChange={handleChange}
            name="name"
            placeholder="name..."
            type="text"
          />
        </React.Fragment>
      )}

      <div className={handleClassName()}>
        <button type="submit" className="btn-secondary">
          {isLogin ? "Login" : "Signup"}
        </button>
        <button onClick={handleForm} className="btn-warning" type="button">
          {" "}
          method{" "}
        </button>
        <select value={role} onChange={handleSelect} className="role__select">
          <option value={admin}>Admin</option>
          <option value={proffesor}>Proffesor</option>
          <option value={student}>Student</option>
        </select>
      </div>
    </form>
  );
};
