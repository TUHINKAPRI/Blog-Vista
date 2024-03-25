import { Button, Spinner, Textarea } from "flowbite-react";
import React, { useState,useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { picture } from "services/helper";
import { createComments,getAllComments } from "services/slices/commentSlice";
import CommentList from "./CommentList";

function Comments({ postId }) {
  const { user } = useSelector((state) => state.auth);
  const { loading, comments } = useSelector((state) => state.comments);
  const dispatch = useDispatch();
  const [comment, setComments] = useState("");
  const submitHandler = (e) => {
    e.preventDefault();
    if (comment.trim() === "") {
      toast.error("Add a comments");
      return;
    }
    dispatch(createComments({ postId: postId, content: comment })).then(
      (res) => {
        if (res.payload?.status === "success") {
          toast.success(res.payload.message);
          setComments("");
        }
      }
    );
  };

  useEffect(()=>{
    dispatch(getAllComments(postId))
  },[postId,dispatch])
  return (
    <div className="max-w-2xl mx-auto w-full p-3">
      {user ? (
        <div className="flex items-center my-5 gap-1 text-gray-500 text-sm">
          <p>Signin in as : </p>
          <img
            src={picture(user.profilePicture)}
            alt=""
            className="w-6 h-6 mx-1 object-cover rounded-full"
          />
          <Link
            to={`/dashboard?tab=profile`}
            className="text-xs mx-1 text-cyan-500 hover:underline"
          >
            {user.username}
          </Link>
        </div>
      ) : (
        <div className="text-cyan-500 text-xs flex gap-1">
          you must ,me signin to comment this post
          <Link to="sign-in" className="text-blue-500">
            Signin
          </Link>
        </div>
      )}
      {user && (
        <form className="border border-teal-400 rounded-md p-3 pb-0">
          <Textarea
            placeholder="Add a comment"
            row="3"
            maxLength="200"
            value={comment}
            onChange={(e) => {
              setComments(e.target.value);
            }}
          />
          <div className="flex justify-between items-center my-2">
            <p className="text-gray-400">
              {200 - comment.length} characters remaining
            </p>
            <Button
              outline
              gradientDuoTone="purpleToBlue"
              onClick={submitHandler}
            >
              {loading ? (
                <span>
                  <Spinner className="mx-2" />
                  Loading...
                </span>
              ) : (
                <span>Submit</span>
              )}
            </Button>
          </div>
        </form>
      )}
      {
        comments.length===0?(
          <p className="my-3 text-sm">No comments yet !</p>
        ):(
          <div>
            <div className='flex text-sm my-3 gap-1'> 
              <p className="text-gray-500">Comments : </p>
              <div className='border border-gray-500  rounded-sm px-1'>
                <p>{comments.length}</p>
              </div>
            </div>
            {
              comments.map((ele,index)=>{
                return(
                  <CommentList kye={index} comments={ele}/>
                )
              })
            }
          </div>
        )
      }
    </div>
  );
}

export default Comments;
