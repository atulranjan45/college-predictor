import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import { useState } from "react";
import { useNavigate } from "react-router";
import {sendOtp} from "../../src/services/operations/authAPI"
import { useDispatch } from "react-redux";
import VerifyEmail from "../pages/VerifyEmail";
import toast from "react-hot-toast";



function SignupForm() {
    const navigate = useNavigate();
    const dispatch=useDispatch();

    const [cardState, setcardState]=useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
        accountType:"Student"
    })
    // const [accountType, setAccountType] = useState("Student")

    function changeHandler(event) {
        setFormData((prevData) => (
            {
                ...prevData, [event.target.name]: event.target.value
            }
        ))
    }
    async function submitHandler(event) {
        event.preventDefault();
        console.log("Printing data:");
        console.log(formData);
        if(formData.password!==formData.confirmPassword){
            toast.error("Password and Confirm Password not matching");
        }else{
            dispatch(sendOtp(formData.email, navigate, setcardState))
            // setcardState(true);
        }        
    }


    return (
        <div>
            <div className="flex bg-richblack-700 p-1 gap-x-1 my-6 rounded-full max-w-max">
                <button
                    className={`${formData.accountType === "Student" ?
                        " bg-black text-white" :
                        " bg-transparent text-white"} py-2 px-5 rounded-full transition-all duration-50`}
                    onClick={() => setFormData({...formData, accountType:"Student"})}>Student</button>
                <button
                    className={`${formData.accountType === "Admin" ?
                        " bg-black text-white" :
                        " bg-transparent text-white"} py-2 px-5 rounded-full transition-all duration-50`}
                    onClick={() => setFormData({...formData, accountType:"Admin"})}>Admin</button>
            </div>

            <form onSubmit={submitHandler}>
                {/* first & last name */}
                <div className="flex gap-3 justify-between mt-[20px]">
                    <label className="w-full">
                        <p className="text-[0.875rem] text-white mb-1 leading-[1.375rem]">First Name<sup className=" text-pink-600">*</sup></p>
                        <input
                            required
                            type="text"
                            name="firstName"
                            onChange={changeHandler}
                            value={formData.firstName}
                            placeholder="Enter First Name"
                            className=" bg-gray-600 rounded-[0.5rem] text-richblack-800 w-full p-[12px]"
                        />
                    </label>

                    <label className="w-full">
                        <p className="text-[0.875rem] text-white mb-1 leading-[1.375rem]">Last Name<sup className=" text-pink-600">*</sup></p>
                        <input
                            required
                            type="text"
                            name="lastName"
                            onChange={changeHandler}
                            value={formData.lastName}
                            placeholder="Enter Last Name"
                            className=" bg-gray-600 rounded-[0.5rem] text-richblack-800 w-full p-[12px]"
                        />
                    </label>
                </div>
                {/* email */}
                <div className=" mt-[20px]">

                    <label className="w-full">
                        <p className="text-[0.875rem] text-white mb-1 leading-[1.375rem]">Email ID<sup className=" text-pink-600">*</sup></p>
                        <input
                            required
                            type="email"
                            name="email"
                            onChange={changeHandler}
                            value={formData.email}
                            placeholder="Enter Email Address"
                            className=" bg-gray-600 rounded-[0.5rem] text-richblack-800 w-full p-[12px]"
                        />
                    </label>
                </div>
                {/* create & confirm password */}
                <div className="flex gap-3 justify-between mt-[20px]">
                    <label className="w-full relative">
                        <p className="text-[0.875rem] text-white mb-1 leading-[1.375rem]">Create Password<sup className=" text-pink-600">*</sup></p>
                        <input
                            required
                            type={showPassword ? ("text") : ("password")}
                            name="password"
                            onChange={changeHandler}
                            value={formData.password}
                            placeholder="Enter Password"
                            className=" bg-gray-600 rounded-[0.5rem] text-richblack-800 w-full p-[12px]"
                        />

                        <span
                            className="absolute right-3 top-[38px] cursor-pointer text-richblack-900"
                            onClick={
                                () => setShowPassword((prev) => !prev)}>
                            {
                                showPassword ? (
                                    <AiOutlineEye fontSize={24} />
                                ) :
                                    (<AiOutlineEyeInvisible fontSize={24} />)
                            }
                        </span>
                    </label>

                    <label className="w-full relative ">
                        <p className="text-[0.875rem] text-white mb-1 leading-[1.375rem]">Confirm Password<sup className=" text-pink-600">*</sup></p>
                        <input
                            required
                            type={showConfirmPassword ? ("text") : ("password")}
                            name="confirmPassword"
                            onChange={changeHandler}
                            value={formData.confirmPassword}
                            placeholder="Confirm Password"
                            className=" bg-gray-600 rounded-[0.5rem] text-richblack-800 w-full p-[12px]"
                        />

                        <span
                            className="absolute right-3 top-[38px] cursor-pointer text-richblack-900"
                            onClick={
                                () => setShowConfirmPassword((prev) => !prev)}>
                            {
                                showConfirmPassword ? (
                                    <AiOutlineEye fontSize={24} />) :
                                    (<AiOutlineEyeInvisible fontSize={24} />)
                            }
                        </span>
                    </label>
                </div>

                <div>
                    {
                        cardState && (
                            <div>
                                <VerifyEmail formData={formData}></VerifyEmail>
                            </div>
                        )
                    }
                </div>

                <button className="w-full bg-yellow-50 rounded-[8px] font-semibold text-black px-[12px] py-[8px] mt-6">
                    Create Account
                </button>
            </form>
        </div>
    );
}

export default SignupForm;