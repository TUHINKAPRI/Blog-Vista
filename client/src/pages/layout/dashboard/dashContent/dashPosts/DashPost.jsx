import { Button, Spinner, Table } from "flowbite-react";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { picture } from "services/helper";
import {
  deletePost,
  fetchAllpost,
  fetchUserPost,
} from "services/slices/postSlice";

function DashPost() {
  const dispatch = useDispatch();
  const { post, loading } = useSelector((state) => state.post);
  const { user } = useSelector((state) => state.auth);
  console.log(post);
  const deleteHandler = (postId) => {
    dispatch(deletePost({ postId: postId, userId: user._id })).then((res) => {
      if (res?.payload?.status === "success") {
        dispatch(fetchUserPost(user._id));
      }
    });
  };
  useEffect(() => {
    dispatch(fetchUserPost(user?._id));
  }, [user._id, dispatch]);
  return (
    <div className="w-full m-3">
      {loading ? (
        <div className="w-full">
          <div className="flex flex-wrap gap-2">
            <div className="text-center">
              <Spinner aria-label="Center-aligned spinner example" />
            </div>
          </div>
        </div>
      ) : (
        <div>
          {user && post.length > 0 ? (
            <>
              <div className="overflow-x-auto">
                <Table hoverable>
                  <Table.Head>
                    <Table.HeadCell>No.</Table.HeadCell>
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
                            {index + 1}
                          </Table.Cell>
                          <Table.Cell>
                            <Link to={`/post/${ele._id}`}><img
                              src={picture(ele?.image)}
                              alt=""
                              className="w-20 h-10"
                            /></Link>
                          </Table.Cell>
                          <Table.Cell>{ele?.title.slice(0,30)}..</Table.Cell>
                          <Table.Cell>{ele?.category?.title}</Table.Cell>
                          <Table.Cell>
                            <span
                              onClick={() => deleteHandler(ele._id)}
                              className="text-red-500 hover:underline cursor-pointer"
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
            <div className="w-full h-screen flex justify-center items-center">
              <div className="">
                <p className="mb-4">You have no post yet !</p>
                <Link to="/create-post">
                  <Button gradientDuoTone="purpleToBlue">
                    Create a mew post
                  </Button>
                </Link>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default DashPost;
