import { Button, Label, Modal, Spinner, TextInput } from "flowbite-react";
import React, { useRef, useState } from "react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { picture } from "services/helper";
import { signOut } from "services/slices/authSlice";
import { deleteUser, updateUserData } from "services/slices/userSlice";

function DashProfile() {
  const { user, loading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [imageFile, setImageFile] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const filePickerRef = useRef();
  const [openModal, setOpenModal] = useState(false);
  const [formData, setFormData] = useState({});

  const changeHandler = (e) => {
    const file = e.target.files[0];
    setFormData((prev)=>{
      return({
        ...prev,
        [e.target.name]: file
      })
    })
    if (file) {
      setImageUrl(URL.createObjectURL(file));
    }
    setImageFile(file);
  };
  const HandleChange = (e) => {
    setFormData((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };
  const submitHanlder = (e) => {
    e.preventDefault();
    if (!formData.password || Object.keys(formData).length === 1) {
      if (!formData.password) {
        toast.error("password is need");
        return;
      } else {
        toast.error("Any chnages is required");
        return;
      }
    }
    const fs=new FormData();
    fs.append('username',formData.username);
    fs.append('email',formData.email);
    fs.append('profilePictute',imageFile)
    fs.append('password',formData.password);
    dispatch(updateUserData({ formData: fs, id: user._id })).then(
      (res) => {
        if (res.payload?.status === 200) {
          toast.success(res.payload.data.message);
          // window.location.reload(false);
        }
      }
    );
  };

  const deleteHandler = () => {
    dispatch(
      deleteUser({ userid: user._id, password: formData.password })
    ).then((res) => {
      if (res.payload?.status === "success") {
        toast.success(res.payload.message);
      }
    });
  };

  return (
    <div className=" max-w-lg mx-auto    w-full">
      {/* <h1 className="text-center text-3xl my-4">Profile</h1> */}
      <form className="flex flex-col">
        <input
          type="file"
          name='profilePicture'
          onChange={(e)=>{changeHandler(e)
            }}
          accept="image/*"
          ref={filePickerRef}
          style={{ display: "none" }}
        />
        <div
          className="border-4 rounded-full mt-4 w-26 h-26 aspect-square self-center cursor-pointer"
          onClick={() => filePickerRef.current.click()}
        >
          <img
            src={imageUrl ? imageUrl : picture(user?.profilePicture)}
            alt=""
            className="rounded-full aspect-square  w-26 h-26  object-cover"
            style={{ width: "100px" }}
          />
        </div>
        <div className="w-2/3 self-center">
          <div className="mb-2 block ">
            <Label htmlFor="username" value="username" />
          </div>
          <TextInput
            id="username"
            sizing="sm"
            type="text"
            placeholder="@username"
            required
            name="username"
            onChange={(e) => HandleChange(e)}
            defaultValue={user.username}
          />
        </div>
        <div className="w-2/3 self-center">
          <div className="mb-2 block">
            <Label htmlFor="email1" value="email" />
          </div>
          <TextInput
            id="email1"
            sizing="sm"
            type="email"
            placeholder="name@gamil.com"
            name="email"
            required
            onChange={(e) => HandleChange(e)}
            defaultValue={user.email}
          />
        </div>
        <div className="w-2/3 self-center">
          <div className="mb-2 block">
            <Label htmlFor="password" value="password" />
          </div>
          <TextInput
            id="password"
            sizing="sm"
            name="password"
            type="password"
            onChange={(e) => HandleChange(e)}
            placeholder="******"
            required
          />
        </div>
        <Button
          gradientDuoTone="purpleToPink"
          size="sm"
          disabled={
            Object.keys(formData).length === 0 || loading ? true : false
          }
          className="w-2/3 self-center mt-4"
          onClick={submitHanlder}
        >
          {loading ? (
            <>
              <span>
                <Spinner
                  aria-label="Default status example"
                  size="sm"
                  className="me-2"
                />
                <span>Loading...</span>
              </span>
            </>
          ) : (
            <span>Edit Profile</span>
          )}
        </Button>
      </form>
      

      <div className=" flex justify-center mt-2 ">
        <div className="flex justify-between w-2/3  text-sm text-red-600">
          <span className="cursor-pointer" onClick={() => setOpenModal(true)}>
            Delete Account
          </span>
          <span
            className="cursor-pointer"
            onClick={() => {
              dispatch(signOut());
            }}
          >
            Sign-out
          </span>
        </div>
      </div>
      <div>
        <Modal
          show={openModal}
          size="md"
          onClose={() => setOpenModal(false)}
          popup
        >
          <Modal.Header />
          <Modal.Body>
            <div className="text-center">
              <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
              <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                Are you sure you want to delete this account?
              </h3>
              <div className="flex justify-center gap-4">
                <Button color="failure" onClick={deleteHandler}>
                  {"Yes, I'm sure"}
                </Button>
                <Button color="gray" onClick={() => setOpenModal(false)}>
                  No, cancel
                </Button>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      </div>
    </div>
  );
}

export default DashProfile;
