import { Avatar, Button, Dropdown, Navbar, TextInput } from "flowbite-react";
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";
import { FaMoon, FaSun } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { toggleTheme } from "services/slices/themeSlice";
import { signOut } from "services/slices/authSlice";
import { picture } from "services/helper";

function Header() {
  const user = useSelector((state) => state.auth.user);
  const { theme } = useSelector((state) => state.theme);
  const path = useLocation().pathname;
  const dispatch = useDispatch();

  return (
    <Navbar className="border-b-2 ">
      <Link
        to="/"
        className="text-sm sm:text-xl font-medium dark:text-white bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg px-3 py-1  text-white"
      >
        BlogVista
      </Link>
      <form>
        <TextInput
          type="text"
          placeholder="Search..."
          rightIcon={AiOutlineSearch}
          className="hidden sm:inline"
        />
      </form>
      <Button className="w-12  h-10 sm:hidden rounded-lg" color="gray">
        <AiOutlineSearch />
      </Button>
      <div className="flex gap-2 md:order-2">
        <Button
          pill
          className="w-12 h-10 hidden sm:inline"
          color="gray"
          onClick={() => {
            dispatch(toggleTheme());
          }}
        >
          {theme === "light" ? <FaSun /> : <FaMoon />}
        </Button>

        {user ? (
          <div>
            <Dropdown
              label={
                <Avatar
                  alt="User settings"
                  img={picture(user?.profilePicture)}
                  rounded
                />
              }
              arrowIcon={false}
              inline
            >
              <Dropdown.Header>
                <span className="block text-sm">Hi {user.username}</span>
              </Dropdown.Header>
              <Link to="/dashboard?tab=content">
                <Dropdown.Item as="div">Dashboard</Dropdown.Item>
              </Link>
              <Link to="/dashboard?tab=profile">
                <Dropdown.Item as="div">Profile</Dropdown.Item>
              </Link>
              <Dropdown.Divider />
              <Dropdown.Item
                onClick={() => {
                  dispatch(signOut());
                }}
              >
                Sign out
              </Dropdown.Item>
            </Dropdown>
          </div>
        ) : (
          <Link to="sign-in">
            <Button gradientDuoTone="purpleToBlue" outline>
              Sign In
            </Button>
          </Link>
        )}
      </div>

      <Navbar.Toggle />
      <Navbar.Collapse>
        <Navbar.Link active={path === "/"} as={"div"}>
          <Link to="/">Home</Link>
        </Navbar.Link>
        <Navbar.Link active={path === "/about"} as={"div"}>
          <Link to="/about">About</Link>
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
}
export default Header;
