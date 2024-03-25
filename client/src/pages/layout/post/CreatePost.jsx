import {
  Alert,
  Button,
  FileInput,
  Label,
  Select,
  Spinner,
  TextInput,
  Textarea,
} from "flowbite-react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchCategory } from "services/slices/categorySlice";
import { createPost } from "services/slices/postSlice";
import { getStorage, ref, getDownloadURL, uploadBytes } from "firebase/storage";
import { app } from "firebas";
import { HiInformationCircle } from "react-icons/hi";
function CreatePost() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const storage = getStorage(app);
  const navigate = useNavigate();
  const { category } = useSelector((state) => state.category);
  const [img, setImg] = useState("");
  const [postData, setPostData] = useState({
    title: "",
    content: "",
    category: "",
  });

  const changeHandler = (e) => {
    setError(false);
    setPostData((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    postData.image = img;
    if (
      !postData.title ||
      !postData.content ||
      !postData.category ||
      !postData.image
    ) {
      return setError(true);
    }
    const fs = new FormData();
    fs.append("title", postData.title);
    fs.append("content", postData.content);
    fs.append("category", postData.category);
    fs.append("image", postData.image);
    dispatch(createPost(fs)).then((res) => {
      if (res.payload?.status === "success") {
        navigate(-1);
      }
    });
    // setError(false)
    // const storageRef = ref(storage, img.name);
    // setLoading(true);
    // await uploadBytes(storageRef, img);
    // const downloadURL = await getDownloadURL(storageRef);
    // setLoading(false);
    // if (downloadURL) {
    //   postData.image = downloadURL;
    //   dispatch(createPost(postData)).then((res) => {
    //     if (res.payload.status === "success") {
    //       navigate(-1);
    //     }
    //   });
    // }
  };
  useEffect(() => {
    dispatch(fetchCategory());
  }, [dispatch]);
  return (
    <div className="p-3 max-w-3xl border mx-auto min-h-screen">
      <h1 className="text-center text-3xl my-7">Create a post</h1>
      <div className="mb-4 w-2/3 mx-auto">
        {error ? (
          <Alert color="failure" icon={HiInformationCircle}>
            <span className="font-medium">All fields is required</span> Change a
            few things up and try submitting again.
          </Alert>
        ) : null}
      </div>
      <form className="felx flex-col gap-4 ">
        <div className="flex flex-col gap-4 ">
          <div className="flex gap-4 justify-between w-2/3 self-center ">
            <TextInput
              id="email"
              name="title"
              placeholder="Enter Title"
              required
              onChange={(e) => changeHandler(e)}
            />
            <Select
              id="countries"
              required
              name="category"
              onChange={(e) => changeHandler(e)}
            >
              <option>Select a Category</option>
              {category?.map((ele) => {
                return <option value={ele._id}>{ele.title}</option>;
              })}
            </Select>
          </div>
          <div className="w-8/12 self-center">
            <div className="mb-2 block">
              <Label htmlFor="file-upload" value="Upload file" />
            </div>
            <FileInput
              id="file-upload"
              onChange={(e) => {
                setImg(e.target.files[0]);
              }}
            />
            <div className="mt-4">
              {img ? <img src={URL.createObjectURL(img)} alt="hi"></img> : null}
            </div>
          </div>
          <div className="w-8/12 self-center">
            <div className="mb-2 block">
              <Label htmlFor="comment" value="Your message" />
            </div>

            <ReactQuill
              theme="snow"
              className="h-72 mb-12 "
              onChange={(e) => {
                setPostData({ ...postData, content: e });
              }}
              placeholder="write here..."
            />
          </div>
          <Button
            className=" w-5/12 self-center my-4"
            gradientDuoTone="purpleToPink"
            onClick={submitHandler}
          >
            {loading ? (
              <span>
                <Spinner aria-label="Spinner button example" size="sm" />
                <span className="pl-3">Loading...</span>
              </span>
            ) : (
              <span>Public Post</span>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default CreatePost;
