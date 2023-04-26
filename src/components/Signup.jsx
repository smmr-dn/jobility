import { useEffect, useState } from "react";
import { supabase } from "../client";

const Signup = () => {
  const CDN =
    "https://kittpqlkuxmuqhschiff.supabase.co/storage/v1/object/public/images/";
  const [newUser, setNewUser] = useState({});
  const [profileURL, setProfileURL] = useState("");

  const onSubmit = async (event) => {
    event.preventDefault();

    await supabase
      .from("User")
      .insert({
        email: newUser.email,
        username: newUser.username,
        created_at: new Date(),
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        password: newUser.password,
        profileURL: profileURL,
      })
      .select();

    const { user, error } = await supabase.auth.signUp({
      email: newUser.email,
      password: newUser.password,
    });

    window.location = "/login";
  };

  const handleImageUpload = async (file) => {
    const { data, error } = await supabase.storage
      .from("images")
      .upload(file.name, file);
    if (error) {
      console.log(error);
      return;
    }

    setImageURL(`${CDN}${data.path}`);
  };

  const onValueChange = (event) => {
    const { name, value } = event.target;
    setNewUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div className="flex flex-col items-center w-full min-h-screen p-16 md:p-32 font-sans-pro">
      <h1 className="font-extrabold text-8xl text-cyan-700">Signup</h1>
      <form
        className="mt-20 lg:w-1/2 w-full items-start justify-center flex space-y-10 flex-col p-10 bg-cyan-700 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] create-post-container"
        onSubmit={onSubmit}
      >
        <input
          type="text"
          id="email"
          className="w-5/6 px-5 py-5 text-xl text-white bg-transparent border-b-2 border-white placeholder:text-white focus:outline-none"
          name="email"
          placeholder="Email"
          onChange={onValueChange}
        />

        <input
          type="text"
          id="firstName"
          className="w-5/6 px-5 py-5 text-xl text-white bg-transparent border-b-2 border-white placeholder:text-white focus:outline-none"
          name="firstName"
          placeholder="First Name"
          onChange={onValueChange}
        />

        <input
          type="text"
          id="lastName"
          className="w-5/6 px-5 py-5 text-xl text-white bg-transparent border-b-2 border-white placeholder:text-white focus:outline-none"
          name="lastName"
          placeholder="Last Name"
          onChange={onValueChange}
        />
        <input
          type="text"
          id="username"
          className="w-5/6 px-5 py-5 text-xl text-white bg-transparent border-b-2 border-white placeholder:text-white focus:outline-none"
          name="username"
          placeholder="Username"
          onChange={onValueChange}
        />

        <input
          name="password"
          id="password"
          className="w-5/6 px-5 py-5 text-xl text-white bg-transparent border-b-2 border-white placeholder:text-white focus:outline-none"
          type="password"
          placeholder="Password"
          onChange={onValueChange}
        ></input>
        <div className="pic-container">
          {profileURL && <img id="display-profile" src={profileURL} />}

          <h2 className="mb-5 text-2xl font-extrabold text-white">
            Choose a profile picture
          </h2>
          <input
            type="file"
            className="mb-10 text-xl text-white"
            onChange={(event) => handleImageUpload(event.target.files[0])}
          />
        </div>

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

export default Signup;
