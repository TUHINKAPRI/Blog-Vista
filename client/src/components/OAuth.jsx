import { Button } from "flowbite-react";
import { FcGoogle } from "react-icons/fc";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from "../firebas";
import { useDispatch } from "react-redux";
import { signupwithGoogle } from "services/slices/authSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
function OAuth() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const clickHandler = () => {
    const provider = new GoogleAuthProvider();
    const auth = getAuth(app);
    signInWithPopup(auth, provider)
      .then((res) => {
        console.log(res);
        const formData = {
          username: res.user.displayName,
          email: res.user.email,
          profilePicture: res.user.photoURL,
        };
        dispatch(signupwithGoogle(formData)).then((res) => {
          if (res?.payload?.status === "success") {
            navigate("/");
            toast.success(res?.payload?.message);
          }
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <Button
      gradientDuoTone="purpleToBlue"
      className="my-2 h-9"
      onClick={clickHandler}
    >
      <FcGoogle
        className="
    h-5 w-5"
      />
      <span className="mx-3"> Continue with Google</span>
    </Button>
  );
}
export default OAuth;
