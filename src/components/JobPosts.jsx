import { useState, useEffect } from "react";
import { supabase } from "../client";
import { IonIcon } from "@ionic/react";
import { Link } from "react-router-dom";

const JobPosts = () => {
  useEffect(() => {
    const fetchPosts = async () => {
      const { data } = await supabase.from("Post").select();

      // set state of posts
      setJobDiscussions(data);
    };

    fetchPosts();
  }, []);
  const [jobDiscussions, setJobDiscussions] = useState([]);

  return (
    <div>
      <h1>Discussions</h1>

      <div className="post-container">
        {jobDiscussions &&
          jobDiscussions.map((post) => (
            <Link to={`/discussion/${post.id}`}>
              <div className="post-card">
                <p>{post.created_at}</p>
                <h2>{post.title}</h2>
                <p>{post.likes} likes</p>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
};

export default JobPosts;
