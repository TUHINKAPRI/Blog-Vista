import Comments from "components/Comments";
import { Button, Spinner } from "flowbite-react";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { picture } from "services/helper";
import { fetchSinglePost } from "services/slices/postSlice";

function PostPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { singlePost, loading } = useSelector((state) => state.post);

  console.log(singlePost);

  useEffect(() => {
    dispatch(fetchSinglePost(id));
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spinner aria-label="Center-aligned spinner example" size="xl" />
      </div>
    );
  }
  return (
    <div className="p-3 flex flex-col mx-auto max-w-6xl min-h-screen">
      <h1 className="text-3xl mt-10 p-3 text-center max-w-2xl mx-auto">
        {singlePost && singlePost.title}
      </h1>
      <Link to={`/search?category=${singlePost && singlePost.category.title}`} className="mt-5 self-center">
        <Button  color="gray" pill size="xs" >
          {singlePost && singlePost.category.title}
        </Button>
      </Link>
      <img src={picture(singlePost&&singlePost.image)} alt='hi' className="max-h-[300px]  max-w-4xl w-full self-center p-3 mt-10 object-cover "/>
      <div className="">
        {/* <span>{singlePost&& new Date(singlePost.createdAt)}</span> */}
      </div>
      <div className="p-3 max-w-2xl mx-auto w-full" dangerouslySetInnerHTML={{ __html: singlePost?.content }} >
        {/* {singlePost && singlePost.content} */}
      </div>
      
        <Comments postId={singlePost._id}/>
      
    </div>
  );
}
export default PostPage;
