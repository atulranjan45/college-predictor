import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/Logo.png";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../services/operations/authAPI";
import { FaCaretDown } from "react-icons/fa";
import Profile from "./Profile";
import { useState } from "react";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [profileState, setProfileState] = useState(false);

  const { token } = useSelector((state) => state.auth);

  const logoutHandler = () => {
    dispatch(logout(navigate));
  };

  return (
    <div className="w-full flex bg-richblack-900 fixed h-14 z-10">
      <div className="flex justify-between items-center w-11/12 max-w-[1160px] py-4 mx-auto">
        <Link to="/">
          <img src={logo} alt="Logo" width={240} height={32} loading="lazy" />
        </Link>

        <nav>
          <ul className="flex gap-x-6 text-white font-bold">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
          </ul>
        </nav>

        <div className="flex items-center gap-x-4">
          {token === null && (
            <>
              <Link to="/login">
                <button className="bg-gray-700 text-white font-bold py-[8px] px-[12px] rounded-[8px] border border-gray-400">
                  Login
                </button>
              </Link>
              <Link to="/signup">
                <button className="bg-gray-700 text-white font-bold py-[8px] px-[12px] rounded-[8px] border border-gray-400">
                  Sign Up
                </button>
              </Link>
            </>
          )}

          {token !== null && (
            <div className="flex gap-2 items-center">
              <Link to="/dashboard">
                <button className="bg-gray-700 text-white font-bold py-[8px] px-[12px] rounded-[8px] border border-gray-400">
                  Dashboard
                </button>
              </Link>

              <button
                className="bg-gray-700 text-white font-bold py-[8px] px-[12px] rounded-[8px] border border-gray-400 flex items-center"
                onClick={() => setProfileState(!profileState)}
              >
                Profile <FaCaretDown className="text-white ml-1" />
              </button>

              <button
                className="bg-gray-700 text-white font-bold py-[8px] px-[12px] rounded-[8px] border border-gray-400"
                onClick={logoutHandler}
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>

      {profileState && (
        <div className="absolute top-14 right-0 mr-4 z-20">
          <Profile />
        </div>
      )}
    </div>
  );
};

export default Navbar;