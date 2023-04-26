import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../client";
import { comment } from "postcss";
import { RxDotFilled } from "react-icons/rx";

const JobDetail = () => {
  const postID = useParams();
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [post, setPost] = useState();
  const [currentUser, setCurrentUser] = useState(null);

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
    getCurrentUser();
  }, []);

  const getCurrentUser = async () => {
    const email = localStorage.getItem("email");
    const { data } = await supabase.from("User").select().eq("email", email);
    setCurrentUser(data[0]);
  };

  const getCommentByPostId = async () => {
    const { data, error } = await supabase
      .from("Comment")
      .select("*")
      .eq("postID", postID.id);

    setComments(data);
  };

  useEffect(() => {
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
    getCommentByPostId();
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
        <div className="p-16 md:p-32 font-sans-pro">
          <div className="flex flex-col items-start w-full p-32 text-left bg-white border rounded-xl border-neutral-400">
            <img src={post.imageURL} className="self-center mb-10" />
            <h1 className="mb-5 text-6xl font-extrabold">{post.title}</h1>
            <div className="flex flex-row space-x-4">
              <img
                src={currentUser.profileURL}
                className="mt-2 border border-black rounded-full w-9 h-9"
                alt="Website Logo"
              />
              <div className="flex flex-col text-left">
                <span className="text-xl">{currentUser.username}</span>
                <span className="text-black/70">
                  Posted on: {getTimeDifference(post.created_at)}
                </span>
              </div>
            </div>

            <p className="mt-20 text-xl">{post.content} </p>

            <div className="w-full mt-20">
              <h3 className="mb-5 text-3xl font-extrabold">Comments</h3>

              <div className="flex flex-row space-x-4">
                <img
                  src={currentUser.profileURL}
                  className="mt-2 border border-black rounded-full w-9 h-9"
                  alt="Website Logo"
                />
                <form onSubmit={onSubmit} className="w-full">
                  <textarea
                    type="text"
                    rows="5"
                    name="comment"
                    className="w-full px-5 py-3 border-2 rounded border-neutral-200"
                    placeholder="Insert Comment Here..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                  />
                  <button className="flex px-5 py-3 mt-2 mb-20 ml-auto text-white transition ease-in border-2 border-transparent rounded bg-cyan-700 hover:bg-white hover:border-cyan-700 hover:text-cyan-700">
                    Submit
                  </button>
                </form>
              </div>

              {comments &&
                comments.map((comment) => (
                  <div className="flex flex-row space-x-4">
                    <img
                      src="../src/img/suitcase.png"
                      className="mt-2 border border-black rounded-full w-9 h-9"
                      alt="Website Logo"
                    />
                    <div className="w-full px-5 py-3 mb-3 border-2 rounded border-neutral-200">
                      <div className="flex flex-row items-center mb-2 space-x-1">
                        <span className="font-extrabold">Sample Username</span>

                        <RxDotFilled />

                        <span className="text-black/70">
                          {getTimeDifference(comment.created_at)}
                        </span>
                      </div>

                      <p>{comment.comment}</p>
                      <p></p>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobDetail;
