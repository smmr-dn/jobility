import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../client";
import { comment } from "postcss";

const JobDetail = () => {
  const postID = useParams();
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [post, setPost] = useState();

  useEffect(() => {
    const getById = async () => {
      const { data, error } = await supabase
        .from("Post")
        .select()
        .eq("id", postID.id);

      setPost(data[0]);
    };

    getById();
  }, []);

  useEffect(() => {
    const getCommentByPostId = async () => {
      const { data, error } = await supabase
        .from("Comment")
        .select("*")
        .eq("postID", postID.id);

      setComments(data);
    };

    getCommentByPostId();
  }, [post]);

  const onSubmit = async (event) => {
    event.preventDefault();

    await supabase
      .from("Comment")
      .insert({
        postID: postID.id,
        created_at: new Date(),
        comment: newComment,
      })
      .select();

    setNewComment("");
  };

  const getTimeDifference = (time) => {
    const today = new Date();
    const orderDateTime = new Date(time);

    const timeDifference = Math.abs(today - orderDateTime);
    const minutesDifference = Math.floor(timeDifference / 60000);

    if (minutesDifference >= 60)
      return (
        Math.floor(minutesDifference / 60) +
        (Math.floor(minutesDifference / 60) == 1 ? " hour ago" : " hours ago")
      );
    else if (minutesDifference >= 1440)
      return (
        Math.floor(minutesDifference / 1440) +
        (Math.floor(minutesDifference / 1440) == 1 ? " day ago" : " days ago")
      );
    return minutesDifference == 1
      ? minutesDifference + " minute ago"
      : minutesDifference + " minutes ago";
  };

  return (
    <div>
      {post && (
        <div id="post-container">
          <img src={post.imageURL} />
          <h1>{post.title}</h1>
          <p>{post.content}</p>

          <div id="comment-section">
            <h1>Comments</h1>
            <form onSubmit={onSubmit}>
              <input
                type="text"
                name="comment"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
              />
              <button>Submit</button>
            </form>

            {comments &&
              comments.map((comment) => (
                <div>
                  <h1>{comment.comment}</h1>
                  <p>{getTimeDifference(comment.created_at)}</p>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default JobDetail;
