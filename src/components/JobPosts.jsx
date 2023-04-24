import { useState, useEffect } from "react";
import { supabase } from "../client";
import { BsFillChatHeartFill } from "react-icons/bs";
import { Link } from "react-router-dom";

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
    <div>
      <h1>Discussions</h1>

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
    </div>
  );
};

export default JobPosts;
