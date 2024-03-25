import { Button } from "flowbite-react";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchUserPost } from "services/slices/postSlice";

function DashBoardContent() {
  const dispatch = useDispatch();
  

 
 
  return (
    <div className="max-w-3xl">
      <div>
        <div className="flex w-full mt-3 text-center  justify-center">
          <div className="flex w-2/3 ">
            <Link className="w-full" to="/create-post">
              <Button
                className="w-full"
                size="sm"
                gradientDuoTone="purpleToBlue"
              >
                Create a post
              </Button>
            </Link>
          </div>
        </div>
        <div></div>
      </div>
    </div>
  );
}

export default DashBoardContent;
