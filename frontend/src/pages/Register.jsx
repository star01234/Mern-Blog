import {useState} from "react";

const Register = () => {
  const [user, setUser] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Registering user:", user);
    // Add validation and API call logic here
  };

  return (
    <section className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-[30rem] bg-white p-8 rounded-lg shadow-lg space-y-6">
        <div className="text-center text-4xl font-semibold text-purple-600">
          Create Account
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Username input */}
          <div className="w-full transform border-b-2 bg-transparent text-lg duration-300 focus-within:border-purple-500">
            <input
              type="text"
              placeholder="Username"
              name="username"
              value={user.username}
              onChange={handleChange}
              className="w-full border-none bg-transparent outline-none placeholder:text-gray-400 focus:outline-none py-2 px-3"
              required
            />
          </div>

          {/* Password input */}
          <div className="w-full transform border-b-2 bg-transparent text-lg duration-300 focus-within:border-purple-500">
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={user.password}
              onChange={handleChange}
              className="w-full border-none bg-transparent outline-none placeholder:text-gray-400 focus:outline-none py-2 px-3"
              required
            />
          </div>
          {/* Submit button */}
          <button
            type="submit"
            className="w-full transform rounded-md bg-purple-600 py-2 text-white font-semibold duration-300 hover:bg-purple-500 focus:outline-none"
          >
            Sign Up
          </button>
        </form>

        {/* Already have an account */}
        <p className="text-center text-lg">
          Already have an account?{" "}
          <a
            href="#"
            className="font-medium text-purple-500 underline hover:text-purple-400"
          >
            Log In
          </a>
        </p>
      </div>
    </section>
  );
};

export default Register;
