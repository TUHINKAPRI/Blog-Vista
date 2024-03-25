import { Button, Label, TextInput, Alert, Spinner } from "flowbite-react";
import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { signup } from "services/slices/authSlice";
import { HiInformationCircle, HiMail } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import { HiEye } from "react-icons/hi";
import OAuth from "components/OAuth";
function Signup() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const err = useSelector((state) => state.auth.error);
  const loading = useSelector((state) => state.auth.loading);
  const filePickerRef = useRef(null);
  const [error, setError] = useState(null);
  const [img, setImg] = useState(null);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const changeHandler = (e) => {
    setError(null);
    setFormData((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };
  const submitHandler = (e) => {
    const fd=new FormData()
    fd.append('username',formData.username)
    fd.append('email',formData.email)
    fd.append('password',formData.password)
    fd.append('profilePicture',img)
    e.preventDefault();
    console.log(fd)
    dispatch(signup(fd)).then((res) => {
      if (res.payload?.status) {
        if (res.payload?.status === "success") {
          navigate("/sign-in");
          
        }
      }
    });
  };
  useEffect(() => {
    setError(err);
  }, [err]);
  return (
    <div className="min-h-screen mt-10">
      <div className="flex mx-auto max-w-3xl gap-5 justify-between">
        <div className="justify-center items-start flex flex-col">
          <Link
            to="/"
            className="text-3xl font-medium dark:text-white bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg px-3 py-1  text-white"
          >
            BlogVista
          </Link>
          <p className="text-sm mt-5">
            You can signup with email and password or google
          </p>
        </div>
        <div className="w-4/12">
          <div
            onClick={() => {
              filePickerRef.current.click();
            }}
            className="rounded-full border-4 aspect-square mx-auto  w-26 h-26  object-cover"
            style={{ width: "100px" }}
          >
            <img
              src={
                img
                  ? URL.createObjectURL(img)
                  : "https://static.vecteezy.com/system/resources/thumbnails/002/318/271/small/user-profile-icon-free-vector.jpg"
              }
              alt="profileImage"
              className="rounded-full aspect-square  w-26 h-26  object-cover"
            style={{ width: "100px" }}
            />
          </div>
          <form className=" ">
            <div>
              <input
                type="file"
                style={{ display: "none" }}
                ref={filePickerRef}
                onChange={(e) => setImg(e.target.files[0])}
              />
            </div>
            <div>
              <Label htmlFor="username1" value="Your username" />
              <TextInput
                id="username1"
                sizing="sm"
                type="text"
                name="username"
                value={formData.username}
                placeholder="Enter your username"
                required
                onChange={(e) => {
                  changeHandler(e);
                }}
              />
            </div>
            <div>
              <Label htmlFor="email" value="Your email" />
              <TextInput
                rightIcon={HiMail}
                sizing="sm"
                id="email"
                type="email"
                name="email"
                value={formData.email}
                placeholder="Enter your email"
                required
                onChange={(e) => {
                  changeHandler(e);
                }}
              />
            </div>

            <div>
              <Label htmlFor="password1" value="Your password" />
              <TextInput
                rightIcon={HiEye}
                sizing="sm"
                className=""
                id="password1"
                type="password"
                name="password"
                value={formData.password}
                placeholder="Enter your password"
                required
                onChange={(e) => {
                  changeHandler(e);
                }}
              />
            </div>

            <div className="mx-auto my-1 flex items-center justify-center">
              <Button
                type="submit"
                className=" mt-3 h-9 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg px-3   text-white"
                onClick={submitHandler}
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Spinner aria-label="Spinner button example" size="sm" />
                    <span className="pl-3">Loading...</span>
                  </>
                ) : (
                  <span className="p-2">Sign-up</span>
                )}
              </Button>
            </div>
            <div className="mx-auto my-1 flex items-center justify-center">
              <OAuth />
            </div>
          </form>
          <div>
            <Link to="/sign-in" className="text-sm my-1">
              Have an accout ? <span className="text-blue-700"> Sign In </span>
            </Link>
          </div>

          {error ? (
            <Alert color="failure" icon={HiInformationCircle}>
              <span className="font-medium">{error}</span>
            </Alert>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default Signup;
