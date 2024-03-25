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
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { fetchCategory } from "services/slices/categorySlice";
import {
  createPost,
  fetchSinglePost,
  updatePost,
} from "services/slices/postSlice";
import { getStorage, ref, getDownloadURL, uploadBytes } from "firebase/storage";
import { app } from "firebas";
import { HiInformationCircle } from "react-icons/hi";
import { picture } from "services/helper";
function UpdatePost() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const storage = getStorage(app);
  const navigate = useNavigate();
  const { category } = useSelector((state) => state.category);
  const { singlePost } = useSelector((state) => state.post);
  const { user } = useSelector((state) => state.auth);
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
    setLoading(true);
    e.preventDefault();

    if (
      !postData.title ||
      !postData.content ||
      !postData.category ||
      !postData.image
    ) {
      return setError(true);
    }


      const fs=new FormData();
      fs.append('title',postData.title);
      fs.append('content',postData.content);
      fs.append('category',postData.category);
      fs.append('image',img?(img):(postData.image))

    dispatch(
      updatePost({ postId: id, formData: fs })
    ).then((res) => {
      console.log(res)
      if (res?.payload?.status === "success") {
        navigate(-1);
      }
    });
  };
  useEffect(() => {
    dispatch(fetchSinglePost(id)).then((res) => {
      if (res.payload.data[0]) {
        setPostData({
          title: res.payload.data[0].title,
          content: res.payload.data[0].content,
          category: res.payload.data[0].category._id,
          image: res.payload.data[0].image,
        });
      }
    });
  }, [id]);
  useEffect(() => {
    dispatch(fetchCategory());
  }, [dispatch]);
  return (
    <div className="p-3 max-w-2xl mx-auto min-h-screen">
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
              value={postData.title}
              placeholder="Enter Title"
              required
              onChange={(e) => changeHandler(e)}
            />
            <Select
              id="countries"
              required
              name="category"
              value={postData.category}
              onChange={(e) => changeHandler(e)}
            >
              <option>Select a Category</option>
              {category?.map((ele) => {
                return <option value={ele._id}>{ele.title}</option>;
              })}
            </Select>
          </div>
          <div className="w-2/3 self-center">
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
              {img ? (
                <img src={URL.createObjectURL(img)} alt="img" />
              ) : (
                <img src={picture(postData.image)} alt="img"></img>
              )}
            </div>
          </div>
          <div className="w-2/3 self-center">
            <div className="mb-2 block">
              <Label htmlFor="comment" value="Your message" />
            </div>
            <Textarea
              id="comment"
              placeholder="Enter the post..."
              required
              value={postData.content}
              name="content"
              rows={4}
              onChange={(e) => {
                changeHandler(e);
              }}
            />
          </div>
          <Button
            className="w-1/2 self-center my-4"
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

export default UpdatePost;
