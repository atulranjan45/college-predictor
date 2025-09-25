// Profile.js
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { logout } from "../services/operations/authAPI";
import { useDispatch } from "react-redux";

const Profile = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.profile);
    
    const handleLogout = () => {
        dispatch(logout());
        navigate('/login'); // Redirect to login after logout
    };
    
    return (
        <div className="fixed top-4 right-4 bg-white shadow-md rounded-lg p-4 w-64">
            <h1 className="text-lg font-bold">User Profile</h1>
            <div className="flex flex-col mt-2">
                <p>First Name: <span className="font-medium">{user.firstName}</span></p>
                <p>Last Name: <span className="font-medium">{user.lastName}</span></p>
                <p>Mobile No: <span className="font-medium">{user.mobNo}</span></p>
                <p>Email: <span className="font-medium">{user.email}</span></p>
                <p>Account Type: <span className="font-medium">{user.accountType}</span></p>
                <button 
                    onClick={handleLogout} 
                    className="mt-2 bg-red-500 text-white rounded px-4 py-2 hover:bg-red-600"
                >
                    Logout
                </button>
            </div>
            <Link to="/dashboard" className="text-blue-500 mt-2 hover:underline">Go to Dashboard</Link>
        </div>
    );
};

export default Profile;
