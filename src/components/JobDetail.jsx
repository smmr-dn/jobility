import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const JobDetail = () => {
  const postID = useParams();
  const [comments, setComments] = useState([]);
  const [post, setPost] = useState();

  useEffect(() => {
    const getById = async () => {
      const { data, error } = await supabase
        .from("Post")
        .select()
        .eq("id", postID.id);

      setPost(data[0]);
    };
  }, []);

  return <div>{post && <h1>{post.title}</h1>}</div>;
};

export default JobDetail;
