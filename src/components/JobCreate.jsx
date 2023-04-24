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
        <div className="md:p-32 p-16 flex flex-col w-full items-center min-h-screen font-sans-pro">
            <h1 className="text-8xl font-extrabold text-cyan-700">
                Create New Post
            </h1>
            <form
                className="mt-20 lg:w-1/2 w-full items-start justify-center flex space-y-10 flex-col p-10 bg-cyan-700 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] create-post-container"
                onSubmit={onSubmit}
            >
                <input
                    type="text"
                    id="title"
                    className="py-5 px-5 w-5/6 border-b-2 text-xl border-white bg-transparent text-white placeholder:text-white focus:outline-none"
                    name="title"
                    placeholder="Title Name"
                    onChange={onValueChange}
                />

                <textarea
                    name="content"
                    id="content"
                    className="py-5 px-5 w-5/6 border-b-2 text-xl border-white bg-transparent placeholder:text-white text-white focus:outline-none"
                    cols="30"
                    rows="1"
                    placeholder="What's cooking?"
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

                    <h2 className="text-2xl font-extrabold mb-5 text-white">
                        Choose a picture
                    </h2>
                    <input
                        type="file"
                        className="text-white text-xl mb-10"
                        onChange={(event) =>
                            handleImageUpload(event.target.files[0])
                        }
                    />
                </div>

                <button
                    id="submit-btn"
                    className="bg-white text-black text-xl px-20 self-center py-3 rounded transition hover:scale-110 duration-200"
                    type="submit"
                >
                    Submit
                </button>
            </form>
        </div>
    );
};

export default JobCreate;
