import { useState, useEffect } from "react";
import { supabase } from "../client";
import { Link } from "react-router-dom";
import { BsFillChatHeartFill } from "react-icons/bs";

const JobPosts = () => {
  const [jobDiscussions, setJobDiscussions] = useState([]);

  const [filterByTime, setFilterByTime] = useState(true);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    const { data } = await supabase.from("Post").select();

    // set state of posts
    setJobDiscussions(data);
  };

  const onClickUpvote = async (likes, id) => {
    const { data } = await supabase
      .from("Post")
      .update({
        likes: likes + 1,
      })
      .eq("id", id);

    fetchPosts();
  };

  return (
    <>
      <div className="flex flex-col items-center w-full min-h-screen p-16 post-container md:p-32 font-sans-pro">
        <h1 className="mb-20 font-extrabold text-8xl">Discussions</h1>
        {jobDiscussions &&
          jobDiscussions.map((post) => (
            <Link to={`/discussion/${post.id}`} className="w-5/6">
              <button className="flex flex-col items-start w-full px-5 py-3 mb-3 transition ease-in-out bg-white border rounded-lg post-card border-neutral-500 hover:bg-cyan-700/20 hover:scale-110">
                <div className="flex flex-row items-center w-full">
                  <img
                    src="../src/img/suitcase.png"
                    className="w-10 h-10 border border-black rounded-full"
                    alt="Website Logo"
                  />
                  <div className="flex flex-col ml-4 text-left">
                    <h3 className="font-bold">Jane Doe</h3>
                    <span className="font-medium text-black/70">
                      {post.created_at}
                    </span>
                  </div>
                  <span className="flex flex-row items-center justify-center ml-auto text-3xl font-extrabold text-cyan-700">
                    {post.likes} &nbsp;
                    <BsFillChatHeartFill />
                  </span>
                </div>

                <div className="flex flex-col text-left ml-14">
                  <h2 className="text-4xl font-extrabold">{post.title}</h2>
                  <div className="flex flex-row mt-1 space-x-4 text-cyan-700">
                    <span className="p-1 transition ease-in rounded hover:bg-cyan-700 hover:text-white">
                      #waw
                    </span>
                  </div>
                </div>
              </button>
            </Link>
          ))}
      </div>

      <div className="post-container">
        {jobDiscussions &&
          jobDiscussions.map((post) => (
            <div className="post-card">
              <p>{post.created_at}</p>
              <Link to={`/discussion/${post.id}`}>
                <h2>{post.title}</h2>
              </Link>
              <p>{post.likes} likes</p>
              <BsFillChatHeartFill
                onClick={() => onClickUpvote(post.likes, post.id)}
              ></BsFillChatHeartFill>
            </div>
          ))}
      </div>
    </>
  );
};

export default JobPosts;
