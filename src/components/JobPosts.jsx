import { useState, useEffect } from "react";
import { supabase } from "../client";
import { Link } from "react-router-dom";
import { BsFillChatHeartFill } from "react-icons/bs";
import { AiFillEdit } from "react-icons/ai";
import { AiFillDelete } from "react-icons/ai";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";

const JobPosts = () => {
  const [jobDiscussions, setJobDiscussions] = useState([]);
  const options = [
    { value: "", label: "-" },
    { value: "agriculture", label: "Agriculture" },
    { value: "engineering", label: "Engineering" },
    { value: "mathematics", label: "Mathematics" },
    { value: "fine arts", label: "Fine Arts" },
    { value: "music", label: "Music" },
    { value: "education", label: "Education" },
    { value: "human development", label: "Human Development" },
    { value: "business", label: "Business" },
  ];
  const [filterByTag, setTag] = useState("");
  const [filterByTime, setFilterByTime] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    fetchWithCondition(filterByTime);
  }, []);

  useEffect(() => {
    getCurrentUser();
  }, []);

  const getCurrentUser = async () => {
    const email = localStorage.getItem("email");
    const { data } = await supabase.from("User").select().eq("email", email);
    setCurrentUser(data[0]);
  };

  const fetchWithCondition = async (filterByTime) => {
    let filter = "";

    if (filterByTime) {
      filter = "created_at";
    } else {
      filter = "likes";
    }
    const { data } = await supabase
      .from("Post")
      .select()
      .order(filter, { ascending: false });
    setJobDiscussions(data);
  };

  const fetchWithTag = async (filterByTag) => {
    const { data } = await supabase
      .from("Post")
      .select()
      .eq("tag", filterByTag);
    setJobDiscussions(data);
  };

  const onClickUpvote = async (likes, id) => {
    const { data } = await supabase
      .from("Post")
      .update({
        likes: likes + 1,
      })
      .eq("id", id);

    fetchWithCondition(filterByTime);
  };

  useEffect(() => {
    fetchWithCondition(filterByTime);
  }, [filterByTime]);

  useEffect(() => {
    fetchWithTag(filterByTag);
  }, [filterByTag]);

  const getTimeDifference = (time) => {
    const today = new Date();
    const orderDateTime = new Date(time);

    const timeDifference = Math.abs(today - orderDateTime);
    const minutesDifference = Math.floor(timeDifference / 60000);

    if (minutesDifference >= 60 && minutesDifference < 1440)
      return (
        Math.floor(minutesDifference / 60) +
        (Math.floor(minutesDifference / 60) == 1 ? " hour ago" : " hours ago")
      );
    if (minutesDifference >= 1440)
      return (
        Math.floor(minutesDifference / 1440) +
        (Math.floor(minutesDifference / 1440) == 1 ? " day ago" : " days ago")
      );
    return minutesDifference == 1
      ? minutesDifference + " minute ago"
      : minutesDifference + " minutes ago";
  };

  const onDeletePost = async (id) => {
    await supabase.from("Post").delete().eq("id", id);
    fetchWithCondition(filterByTime);
  };

  return (
    <div className="flex flex-col items-start w-full min-h-screen p-16 post-container md:p-32 font-sans-pro">
      <h1 className="mb-20 font-extrabold text-8xl text-cyan-700">
        Discussions
      </h1>

      <div className="flex flex-row items-center justify-start w-full mb-5 space-x-8 text-3xl">
        <button
          className={`${
            filterByTime ? "font-extrabold" : ""
          } p-3 hover:bg-white hover:text-cyan-700 rounded-xl transition cursor-pointer ease-in`}
          onClick={() => setFilterByTime(true)}
        >
          Latest
        </button>
        <h3
          className={`${
            filterByTime ? "" : "font-extrabold"
          } p-3 hover:bg-white hover:text-cyan-700 rounded-xl cursor-pointer transition ease-in`}
          onClick={() => setFilterByTime(false)}
        >
          Upvotes
        </h3>

        <form className="float-right">
          <input className="p-1" type="text" placeholder="Search"></input>
        </form>
        <Dropdown
          options={options}
          onChange={(option) => setTag(option.value)}
          placeholder="Select a tag"
        />
      </div>
      {jobDiscussions &&
        currentUser &&
        jobDiscussions.map((post) => (
          <div className="flex flex-col items-start w-full px-5 py-3 mb-3 transition ease-in-out bg-white border rounded-lg post-card border-neutral-500 hover:scale-110">
            <div className="flex flex-row items-center w-full">
              <img
                src={currentUser.profileURL}
                className="w-10 h-10 border border-black rounded-full"
                alt="Website Logo"
              />
              <div className="flex flex-col ml-4 text-left">
                <h3 className="font-bold">{currentUser.username}</h3>
                <div className="flex flex-row">
                  <span className="font-medium text-black/70">
                    {getTimeDifference(post.created_at)}
                  </span>
                  {post.edited && (
                    <span className="font-medium text-black/70">
                      {post.edited ? " - (edited)" : ""}
                    </span>
                  )}
                </div>
              </div>

              <span className="flex flex-row items-center justify-center gap-3 ml-auto text-3xl font-extrabold text-cyan-700">
                {post.likes} &nbsp;
                <BsFillChatHeartFill
                  onClick={() => onClickUpvote(post.likes, post.id)}
                  className="transition-transform transform outline-none hover:text-cyan-500 focus:ring-4 active:scale-75"
                />
                {currentUser.email === localStorage.getItem("email") && (
                  <Link to={`/discussion/edit/${post.id}`}>
                    <AiFillEdit className="transition-transform transform outline-none hover:text-cyan-500 focus:ring-4 active:scale-75" />
                  </Link>
                )}
                {currentUser.email === localStorage.getItem("email") && (
                  <AiFillDelete
                    onClick={() => onDeletePost(post.id)}
                    className="transition-transform transform outline-none hover:text-cyan-500 focus:ring-4 active:scale-75"
                  />
                )}
              </span>
            </div>

            <div className="flex flex-col text-left ml-14">
              <Link
                to={`/discussion/${post.id}`}
                className="hover:text-cyan-700"
              >
                <h2 className="text-4xl font-extrabold">{post.title}</h2>
              </Link>
              {post.tag && (
                <div className="flex flex-row mt-1 space-x-4 text-cyan-700">
                  <span className="p-1 transition ease-in rounded hover:bg-cyan-700 hover:text-white">
                    #{post.tag}
                  </span>
                </div>
              )}
            </div>
          </div>
        ))}
    </div>
  );
};

export default JobPosts;
