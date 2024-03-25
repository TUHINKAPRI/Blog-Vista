import React, { useEffect, useState } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import DashSidebar from "./DashSidebar/DashSidebar";
import DashProfile from "./dashContent/profile/DashProfile";
import DashBoardContent from "./dashContent/dashChart/DashBoardContent";
import DashPost from "./dashContent/dashPosts/DashPost";
import DashAllPost from "./dashContent/dashPosts/DashAllPost";
import DashAllUsers from "./dashContent/dashUsers/DashAllUsers";
function Dashboard() {
  const loaction = useLocation();
  const [tab, setTab] = useState();
  useEffect(() => {
    const searchParams = new URLSearchParams(loaction.search);
    setTab(searchParams.get("tab"));
  }, [loaction.search]);
  return (
    <div className="min-h-screen flex w-full flex-col md:flex-row">
      <div>
        <DashSidebar />
      </div>
      {tab === "content" && <DashBoardContent />}
      {tab === "profile" && <DashProfile />}
      {tab === "posts" && <DashPost />}
      {tab === "all-posts" && <DashAllPost />}
      {tab === "all-users" && <DashAllUsers />}
    </div>
  );
}

export default Dashboard;
