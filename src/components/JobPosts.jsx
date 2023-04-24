import { useState, useEffect } from "react";
import { supabase } from "../client";
import { Link } from "react-router-dom";
import { BsFillChatHeartFill } from "react-icons/bs";

const JobPosts = () => {
    const [jobDiscussions, setJobDiscussions] = useState([]);

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
        <div className="post-container md:p-32 p-16 flex flex-col w-full items-center min-h-screen font-sans-pro">
            <h1 className="text-8xl font-extrabold mb-20">Discussions</h1>
            {jobDiscussions &&
                jobDiscussions.map((post) => (
                    <Link to={`/discussion/${post.id}`} className="w-5/6">
                        <button className="flex flex-col items-start w-full post-card bg-white py-3 px-5 mb-3 border-neutral-500 border hover:bg-cyan-700/20 rounded-lg hover:scale-110 transition ease-in-out">
                            <div className="flex flex-row items-center w-full">
                                <img
                                    src="../src/img/suitcase.png"
                                    className="w-10 h-10 rounded-full border border-black"
                                    alt="Website Logo"
                                />
                                <div className="flex flex-col text-left ml-4">
                                    <h3 className="font-bold">Jane Doe</h3>
                                    <span className="font-medium text-black/70">
                                        {post.created_at}
                                    </span>
                                </div>

                                <span className="flex flex-row items-center justify-center ml-auto font-extrabold text-cyan-700 text-3xl">
                                    {post.likes} &nbsp;
                                    <BsFillChatHeartFill
                                        onClick={() =>
                                            onClickUpvote(post.likes, post.id)
                                        }
                                    />
                                </span>
                            </div>

                            <div className="flex flex-col ml-14 text-left">
                                <h2 className="font-extrabold text-4xl">
                                    {post.title}
                                </h2>
                                <div className="mt-1 flex flex-row space-x-4 text-cyan-700">
                                    <span className="p-1 rounded hover:bg-cyan-700 hover:text-white transition ease-in">
                                        #waw
                                    </span>
                                </div>
                            </div>
                        </button>
                    </Link>
                ))}
        </div>
    );
};

export default JobPosts;
