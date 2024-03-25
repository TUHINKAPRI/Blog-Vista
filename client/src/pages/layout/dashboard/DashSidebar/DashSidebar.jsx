import { Sidebar } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { FaUsers } from "react-icons/fa";
import { HiArrowSmRight, HiChartPie, HiDocumentText, HiUser } from "react-icons/hi";
import { useDispatch,useSelector } from "react-redux";
import { Link, useLocation, useSearchParams } from "react-router-dom";
import { signOut } from "services/slices/authSlice";

function DashSidebar() {
  const location = useLocation();
  const{user}=useSelector(state=>state.auth)
  const [searchParams, setSearchParams] = useSearchParams();
  const [tab, setTab] = useState();
const dispatch=useDispatch()
  useEffect(() => {
    setTab(searchParams.get("tab"));
  }, [location.search]);
  return (
    <Sidebar aria-label="Sidebar with logo branding example" className="w-full md:w-56">
      <Sidebar.Items as='div'>
        <Sidebar.ItemGroup className="flex flex-col">
  
          <Link to="/dashboard?tab=content" >
            <Sidebar.Item icon={HiChartPie} as='div' active={tab === "content"}  >
              Dashboard
            </Sidebar.Item>
          </Link>

          <Link to="/dashboard?tab=profile" >
            <Sidebar.Item icon={HiUser} as='div' active={tab === "profile"}  label={user.isAdmin?('Admin'):('user')}>
              Profile
            </Sidebar.Item>
          </Link>

          <Link to="/dashboard?tab=posts" >
            <Sidebar.Item icon={HiDocumentText} as='div' active={tab === "posts"}  >
              Posts
            </Sidebar.Item>
          </Link>

         {
          user.isAdmin&& <Link to="/dashboard?tab=all-posts" >
            <Sidebar.Item icon={HiDocumentText} as='div' active={tab === "all-posts"}  >
             All Posts
            </Sidebar.Item>
          </Link>
         }
         {
          user.isAdmin&&<Link to="/dashboard?tab=all-users" >
            <Sidebar.Item icon={FaUsers} as='div' active={tab === "all-users"}  >
             Users
            </Sidebar.Item>
          </Link>
         }
         
          <Sidebar.Item  icon={HiArrowSmRight} onClick={()=>{dispatch(signOut())}}>
            Sign Out
          </Sidebar.Item>

        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
}

export default DashSidebar;
