import { useState, useEffect } from "react";
import { supabase } from "../client";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import { useParams } from "react-router-dom";

const JobEdit = () => {
  const params = useParams();
  const CDN =
    "https://kittpqlkuxmuqhschiff.supabase.co/storage/v1/object/public/images/";
  const [newPost, setNewPost] = useState({});
  const [tag, setTag] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [currentPost, setCurrentPost] = useState({});

  const options = [
    { value: "agriculture", label: "Agriculture" },
    { value: "engineering", label: "Engineering" },
    { value: "mathematics", label: "Mathematics" },
    { value: "fine arts", label: "Fine Arts" },
    { value: "music", label: "Music" },
    { value: "education", label: "Education" },
    { value: "human development", label: "Human Development" },
    { value: "business", label: "Business" },
  ];

  useEffect(() => {
    fetchPostById();
  }, [params]);

  const fetchPostById = async () => {
    const { data } = await supabase.from("Post").select().eq("id", params.id);
    setNewPost(data[0]);
    console.log(data[0]);
    setImageURL(currentPost.imageURL);
  };

  const onValueChange = (event) => {
    const { name, value } = event.target;
    setNewPost((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  //HANDLE IMAGE UPLOADED
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

  //SUBMIT FORM
  const onSubmit = async (event) => {
    event.preventDefault();

    await supabase
      .from("Post")
      .update({
        title: newPost.title,
        created_at: new Date(),
        content: newPost.content,
        imageURL: imageURL,
        tag: tag,
        edited: true,
      })
      .eq("id", params.id);

    window.location = "/";
  };

  useEffect(() => {
    //console.log(imageURL);
  }, [imageURL]);

  return (
    <div className="flex flex-col items-center w-full min-h-screen p-16 md:p-32 font-sans-pro">
      <h1 className="font-extrabold text-8xl text-cyan-700">Edit Post</h1>
      {newPost && (
        <form
          className="mt-20 lg:w-1/2 w-full items-start justify-center flex space-y-10 flex-col p-10 bg-cyan-700 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] create-post-container"
          onSubmit={onSubmit}
        >
          <input
            type="text"
            id="title"
            className="w-5/6 px-5 py-5 text-xl text-white bg-transparent border-b-2 border-white placeholder:text-white focus:outline-none"
            name="title"
            value={newPost.title}
            onChange={onValueChange}
          />

          <textarea
            name="content"
            id="content"
            className="w-5/6 px-5 py-5 text-xl text-white bg-transparent border-b-2 border-white placeholder:text-white focus:outline-none"
            cols="30"
            rows="1"
            value={newPost.content}
            onChange={onValueChange}
          ></textarea>

          <div className="drop-down">
            <Dropdown
              options={options}
              onChange={(option) => setTag(option.value)}
              placeholder="Select an option"
            />
          </div>

          <div className="pic-container">
            {imageURL && <img id="display-profile" src={imageURL} />}

            <h2 className="mb-5 text-2xl font-extrabold text-white">
              Choose a picture
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
      )}
    </div>
  );
};

export default JobEdit;
