import { useEffect, useState } from "react";
import AuthService from "../services/auth.service";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import { useAuthContext } from "../context/AuthContext";

const Register = () => {
  const { user: loggedUser } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (loggedUser) {
      navigate("/");
    }
  }, [loggedUser]);

  const [user, setUser] = useState({
    username: "",
    password: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((user) => ({ ...user, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      const currentUser = await AuthService.register(
        user.username,
        user.password
      );
      console.log(currentUser);
      if (currentUser.status === 200) {
        Swal.fire({
          title: "User Registration",
          text: currentUser.data.message,
          icon: "success",
        });
        setUser({
          username: "",
          password: "",
        });
        navigate("/login");
      }
    } catch (error) {
      Swal.fire({
        title: "User Registration",
        text: error?.response?.data?.message || error.message,
        icon: "error",
      });
    }
  };

  return (
    <section className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="w-[30rem] bg-white p-8 rounded-lg shadow-lg space-y-6">
        <div className="text-center text-4xl font-medium text-[#CC99FF]">
          Create Account
        </div>

        {/* Full Name input */}
        <div className="w-full transform border-b-2 bg-transparent text-lg duration-300 focus-within:border-[#CC99FF]">
          <input
            type="text"
            placeholder="Full Name"
            value={user.username}
            name="username"
            onChange={handleChange}
            className="w-full border-none bg-transparent outline-none placeholder:text-gray-400 focus:outline-none py-2 px-3"
          />
        </div>
        {/* Password input */}
        <div className="w-full transform border-b-2 bg-transparent text-lg duration-300 focus-within:border-[#CC99FF]">
          <input
            type="password"
            placeholder="Password"
            value={user.password}
            name="password"
            onChange={handleChange}
            className="w-full border-none bg-transparent outline-none placeholder:text-gray-400 focus:outline-none py-2 px-3"
          />
        </div>

        {/* Register button */}
        <button
          className="w-full transform rounded-sm bg-[#CC99FF] py-2 text-white font-bold duration-300 hover:bg-[#CC88EE] focus:outline-none"
          onClick={handleSubmit}
        >
          CREATE ACCOUNT
        </button>

        {/* Already have an account link */}
        <div className="text-center">
          <p className="text-sm">
            Already have an account?{" "}
            <a href="/login" className="text-indigo-500 hover:text-indigo-400">
              Log In
            </a>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Register;
