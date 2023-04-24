import { useState, useEffect } from "react";
import { supabase } from "../client";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";

const JobCreate = () => {
  const CDN =
    "https://kittpqlkuxmuqhschiff.supabase.co/storage/v1/object/public/images/";
  const [newPost, setNewPost] = useState({});
  const [tag, setTag] = useState("");
  const [imageURL, setImageURL] = useState("");

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
      .insert({
        title: newPost.title,
        created_at: new Date(),
        content: newPost.content,
        imageURL: imageURL,
        tag: tag,
      })
      .select();

    window.location = "/";
  };

  useEffect(() => {
    console.log(imageURL);
  }, [imageURL]);

  return (
    <div>
      <h1>Create New Post</h1>
      <form className="create-post-container" onSubmit={onSubmit}>
        <input
          type="text"
          id="title"
          name="title"
          placeholder="Title"
          onChange={onValueChange}
        />

        <textarea
          name="content"
          id="content"
          cols="30"
          rows="5"
          placeholder="What's cooking?"
          onChange={onValueChange}
        ></textarea>
        <br />

        <div className="drop-down">
          <Dropdown
            options={options}
            onChange={(option) => setTag(option.value)}
            placeholder="Select an option"
          />
        </div>

        <div className="pic-container">
          {imageURL && <img id="display-profile" src={imageURL} />}

          <h2>Choose a picture</h2>
          <input
            type="file"
            onChange={(event) => handleImageUpload(event.target.files[0])}
          />
        </div>

        <button id="submit-btn" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default JobCreate;
