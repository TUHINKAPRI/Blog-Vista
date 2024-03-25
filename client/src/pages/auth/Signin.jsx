import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signin } from "services/slices/authSlice";
import { HiInformationCircle } from "react-icons/hi";
import { toast } from "react-toastify";
import OAuth from "components/OAuth";
function Signin() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loading = useSelector((state) => state.auth.loading);
  const error = useSelector((state) => state.auth.error);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const changeHandler = (e) => {
    setFormData((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };
  const clickHanlder = (e) => {
    e.preventDefault();
    dispatch(signin(formData)).then((res) => {
      if (res?.payload?.status === "success") {
        toast.success(res?.payload?.message);
        navigate("/");
      }
    });
  };
  return (
    <div className="min-h-screen mt-20">
      <div className="flex mx-auto max-w-3xl gap-5 justify-between">
        <div className="">
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
          <form className=" ">
            <div>
              <Label htmlFor="email" value="Your email" />
              <TextInput
                sizing="sm"
                id="email"
                type="email"
                name="email"
                placeholder="Enter your email"
                required
                className="my-1 "
                value={formData.email}
                onChange={(e) => {
                  changeHandler(e);
                }}
              />
            </div>

            <div>
              <Label htmlFor="password1" value="Your password" />
              <TextInput
                sizing="sm"
                className="my-1"
                id="password1"
                type="password"
                name="password"
                required
                placeholder="Enter your password"
                onChange={(e) => {
                  changeHandler(e);
                }}
                value={formData.password}
              />
            </div>

            <div className="mx-auto my-1 flex items-center justify-center">
              <Button
                type="submit"
                className=" mt-3 h-9 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg px-3   text-white"
                onClick={(e) => clickHanlder(e)}
              >
                {loading ? (
                  <>
                    <Spinner aria-label="Spinner button example" size="sm" />
                    <span className="pl-3">Loading...</span>
                  </>
                ) : (
                  <span>SignIn</span>
                )}
              </Button>
              
            </div>
            <div className="mx-auto my-1 flex items-center justify-center">
            <OAuth/>
            </div>
          </form>
          <div className="mx-auto flex items-center justify-center">
            <Link to="/sign-up" className="text-sm my-1">
              Have an accout ? <span className="text-blue-700"> Sign up </span>
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

export default Signin;
