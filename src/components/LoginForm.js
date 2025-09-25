import { useState } from "react";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux"
import { login } from "../../src/services/operations/authAPI"

function LoginForm() {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    })
    const [showPassword, setShowPassword] = useState(false);

    const { email, password } = formData;

    function changeHandler(event) {
        setFormData((prevData) => (
            {
                ...prevData, [event.target.name]: event.target.value
            }
        ))
    }

    function submitHandler(event) {
        event.preventDefault();
        dispatch(login(email, password, navigate))
    }
    return (
        <form onSubmit={submitHandler}
            className="flex flex-col w-full gap-y-4 mt-6 ">
            <label className="w-full">
                <p className="text-[0.875rem] text-white mb-1 leading-[1.375rem]">
                    Email Address<sup className=" text-pink-600">*</sup>
                </p>
                <input
                    required
                    type="email"
                    value={formData.email}
                    name="email"
                    onChange={changeHandler}
                    placeholder="Enter Email id"
                    className=" bg-gray-600 rounded-[0.5rem] text-richblack-800 w-full p-[12px]"
                />
            </label>

            <label className="w-full relative">
                <p className="text-[0.875rem] text-white mb-1 leading-[1.375rem]">
                    Password<sup className=" text-pink-600">*</sup>
                </p>
                <input
                    required
                    type={showPassword ? ("text") : ("password")}
                    value={formData.password}
                    name="password"
                    onChange={changeHandler}
                    placeholder="Enter Password"
                    className=" bg-gray-600 rounded-[0.5rem] text-richblack-800 w-full p-[12px]"
                />

                <span
                    className="absolute right-3 top-[38px] cursor-pointer text-richblack-900"
                    onClick={() => setShowPassword((prev) => !prev)}>
                    {
                        showPassword ? (
                            <AiOutlineEye fontSize={24} />) :
                            (<AiOutlineEyeInvisible fontSize={24} />)
                    }
                </span>

                <Link to="#">
                    <p className="text-xs mt-1 text-blue-300 w-full max-w-max ml-auto">
                        Forgot Password
                    </p>
                </Link>
            </label>

            <button className=" bg-yellow-50 rounded-[8px] font-semibold text-black px-[12px] py-[8px] mt-6">
                Sign In
            </button>
        </form>
    );
}

export default LoginForm;