import { Button, Modal, Table } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { picture } from "services/helper";
import { deletePost, fetchAllpost } from "services/slices/postSlice";

function DashAllPost() {
  const dispatch = useDispatch();
  const { post } = useSelector((state) => state.post);
  const { user } = useSelector((state) => state.auth);
  const [openModal, setOpenModal] = useState(false);
  const [currentPost, setCurrentPost] = useState("");
  const deleteHandler = () => {
    dispatch(deletePost({ postId: currentPost, userId: user._id })).then(
      (res) => {
        if (res.payload.status === "success") {
          dispatch(fetchAllpost());
        }
        setOpenModal(false);
      }
    );
  };
  useEffect(() => {
    dispatch(fetchAllpost());
  }, [dispatch]);
  return (
    <div className="w-full m-3">
      <div>
        {user && post.length > 0 ? (
          <>
            <div className="overflow-x-auto">
              <Table hoverable>
                <Table.Head>
                  <Table.HeadCell>user-Id</Table.HeadCell>
                  <Table.HeadCell>Post Image</Table.HeadCell>
                  <Table.HeadCell>post Title</Table.HeadCell>
                  <Table.HeadCell>Category</Table.HeadCell>
                  <Table.HeadCell>
                    <span className="">Delete</span>
                  </Table.HeadCell>
                  <Table.HeadCell>
                    <span className="">Edit</span>
                  </Table.HeadCell>
                </Table.Head>

                <Table.Body className="divide-y">
                  {post?.map((ele, index) => {
                    return (
                      <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                        <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                          {ele.userId}
                        </Table.Cell>
                        <Table.Cell>
                          <Link to={`/post/${ele._id}`}>
                            <img
                              src={picture(ele?.image)}
                              alt=""
                              className="w-20 h-10"
                            />
                          </Link>
                        </Table.Cell>
                        <Table.Cell>{ele?.title}</Table.Cell>
                        <Table.Cell>{ele?.category?.title}</Table.Cell>
                        <Table.Cell>
                          <span
                            className="text-red-500 hover:underline cursor-pointer"
                            onClick={() => {
                              setOpenModal(true);
                              setCurrentPost(ele._id);
                            }}
                          >
                            Delete
                          </span>
                        </Table.Cell>
                        <Table.Cell>
                          <Link to={`/update-post/${ele._id}`}>
                            <span className="text-slate-500 hover:underline ">
                              Edit
                            </span>
                          </Link>
                        </Table.Cell>
                      </Table.Row>
                    );
                  })}
                </Table.Body>
              </Table>
            </div>
          </>
        ) : (
          <div>
            <p>You have no post</p>
            <p>create a new post</p>
          </div>
        )}
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

export default DashAllPost;
