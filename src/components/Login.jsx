import { useEffect, useState } from "react";
import { supabase } from "../client";

const Login = () => {
  const [loggedInUser, setLoggedInUser] = useState({});

  const onSubmit = async () => {
    const { user, error } = await supabase.auth.signInWithPassword({
      email: loggedInUser.email,
      password: loggedInUser.password,
    });

    localStorage.setItem("email", loggedInUser.email);
    window.location = "/";
  };
  const onValueChange = (event) => {
    const { name, value } = event.target;
    setLoggedInUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  return (
    <div className="flex flex-col items-center w-full min-h-screen p-16 md:p-32 font-sans-pro">
      <h1 className="font-extrabold text-8xl text-cyan-700">Login</h1>
      <form
        className="mt-20 lg:w-1/2 w-full items-start justify-center flex space-y-10 flex-col p-10 bg-cyan-700 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] create-post-container"
        onSubmit={onSubmit}
      >
        <input
          type="text"
          id="title"
          className="w-5/6 px-5 py-5 text-xl text-white bg-transparent border-b-2 border-white placeholder:text-white focus:outline-none"
          name="email"
          placeholder="Email"
          onChange={onValueChange}
        />

        <input
          name="password"
          id="content"
          className="w-5/6 px-5 py-5 text-xl text-white bg-transparent border-b-2 border-white placeholder:text-white focus:outline-none"
          type="password"
          placeholder="Password"
          onChange={onValueChange}
        ></input>

        <button
          id="submit-btn"
          className="self-center px-20 py-3 text-xl text-black transition duration-200 bg-white rounded hover:scale-110"
          type="submit"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Login;
