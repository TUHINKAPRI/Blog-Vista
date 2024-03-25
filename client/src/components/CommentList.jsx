import moment from "moment";
import { Textarea, Button, Modal } from "flowbite-react";
import { FaThumbsUp } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { picture } from "services/helper";
import { addLikeToAComments } from "services/slices/likeSlice";
import { editAComment, deleteComment } from "services/slices/commentSlice";
import { useState } from "react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function CommentList({ comments }) {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [editedComment, setEditedComment] = useState(comments?.content);
  const [openModal, setOpenModal] = useState(false);
  function likeHandler() {
    dispatch(addLikeToAComments(comments._id));
  }
  function editHandler() {
    setEditedComment(comments?.content)
    setIsEditing(true);
    
  }

  function deleteHandler() {
    dispatch(deleteComment(comments._id)).then((res) => {
      if (res.payload.status === "success") {
        toast.success(res.payload.message);
        setOpenModal(false);
      }
    });
  }

  function saveHandler() {
    console.log(editedComment);
    dispatch(
      editAComment({ id: comments._id, body: { content: editedComment } })
    ).then((res) => {
      if (res.payload.status ==="success") {
        toast.success(res.payload.message)
        setIsEditing(false);
      }
    });
  }
  return (
    <div className="flex p-4 border-b text-sm">
      <div className="mr-3">
        <img
          src={picture(comments?.userId?.profilePicture)}
          alt=""
          className="w-10 h-10 rounded-full object-cover bg-gray-200"
        />
      </div>
      <div className="flex-1">
        <div className="flex items-center mb-1">
          <span className="mr-2 font-bold truncate text-xs">{`@${comments?.userId?.username}`}</span>
          <span className="text-xs text-gray-500">
            {moment(comments.createdAt).fromNow()}
          </span>
        </div>
        {isEditing ? (
          <>
            <Textarea
              value={editedComment}
              calssName="mb-2"
              onChange={(e) => setEditedComment(e.target.value)}
            />
            <div className="flex justify-end gap-2 mt-2">
              <Button
                gradientDuoTone="purpleToPink"
                size="sm"
                onClick={saveHandler}
              >
                Save
              </Button>
              <Button
                gradientDuoTone="purpleToPink"
                outline
                size="sm"
                onClick={() => {
                  setIsEditing(false);
                  setEditedComment(comments.content);
                }}
              >
                Cancel
              </Button>
            </div>
          </>
        ) : (
          <>
            <p className="text-gray-500 text-sm pb-2">{comments.content}</p>
            <div className="flex gap-2 items-center">
              <button
                className={`text-gray-400 hover:text-blue-500 ${
                  user &&
                  comments.likes.find((ele) => ele.userId === user._id) &&
                  "!text-blue-500"
                }`}
                onClick={likeHandler}
              >
                <FaThumbsUp className="text-sm" />
              </button>
              <p className="text-xs text-gray-400">
                {comments.numberOfLikes > 0
                  ? `${comments.numberOfLikes} ${
                      comments.numberOfLikes === 1 ? "Like" : "Likes"
                    }`
                  : ""}
              </p>
              <div>
                {user && (user._id === comments.userId._id || user.isAdmin) && (
                  <>
                    <button
                      className="text-gray-400 hover:text-blue-500 "
                      onClick={editHandler}
                    >
                      Edit
                    </button>
                    <button
                      className="text-gray-400 ml-2 hover:text-red-500 "
                      onClick={() => setOpenModal(true)}
                    >
                      Delete
                    </button>
                  </>
                )}
              </div>
            </div>
          </>
        )}
      </div>
      <>
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
                Are you sure you want to delete this comments?
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
      </>
    </div>
  );
}

export default CommentList;
