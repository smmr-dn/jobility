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
    getCommentByPostId();
  }, [post]);

  const getCommentByPostId = async () => {
    const { data, error } = await supabase
      .from("Comment")
      .select("*")
      .eq("postID", postID.id);

    setComments(data);
  };

  getCommentByPostId();

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

    if (minutesDifference >= 60 && minutesDifference < 1440)
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
        <div className="flex flex-col items-center w-full min-h-screen p-16 post-container md:p-32 font-sans-pro">
          <img src={post.imageURL} className="mb-10" />
          <h1 className="mb-10 font-extrabold text-8xl">{post.title}</h1>
          <p className="flex items-start justify-start text-xl">
            {post.content}
          </p>

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
