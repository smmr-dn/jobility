import { useState, useEffect } from "react";
import { supabase } from "../client";
import { Link } from "react-router-dom";
import { BsFillChatHeartFill } from "react-icons/bs";
import { AiFillEdit } from "react-icons/ai";
import { AiFillDelete } from "react-icons/ai";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";

const API_KEY = import.meta.env.VITE_NEWS_API_KEY;
const Articles = () => {
  const [topHeadlines, setTopHeadlines] = useState(false);
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    fetchByFilter(topHeadlines);
  }, []);

  const fetchByFilter = async (topHeadlines) => {
    let url = "";
    if (topHeadlines) {
      url = "https://newsapi.org/v2/top-headlines?country=us";
    } else {
      url = "https://newsapi.org/v2/everything?q=hiring";
    }

    const response = await fetch(url + `&apiKey=${API_KEY}`);
    const detailJSON = await response.json();
    setArticles(detailJSON.articles);
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
    if (minutesDifference >= 1440)
      return (
        Math.floor(minutesDifference / 1440) +
        (Math.floor(minutesDifference / 1440) == 1 ? " day ago" : " days ago")
      );
    return minutesDifference == 1
      ? minutesDifference + " minute ago"
      : minutesDifference + " minutes ago";
  };

  useEffect(() => {
    fetchByFilter(topHeadlines);
  }, [topHeadlines]);

  return (
    <div className="flex flex-col items-start w-full min-h-screen p-16 post-container md:p-32 font-sans-pro">
      <h1 className="mb-20 font-extrabold text-8xl text-cyan-700">Articles</h1>

      <div className="flex flex-row items-center justify-start w-full mb-5 space-x-8 text-3xl">
        <div className="flex flex-row items-center justify-start w-full mb-5 space-x-8 text-3xl">
          <button
            className={`${
              topHeadlines ? "font-extrabold" : ""
            } p-3 hover:bg-white hover:text-cyan-700 rounded-xl transition cursor-pointer ease-in`}
            onClick={() => setTopHeadlines(true)}
          >
            Top Headlines
          </button>
          <h3
            className={`${
              topHeadlines ? "" : "font-extrabold"
            } p-3 hover:bg-white hover:text-cyan-700 rounded-xl cursor-pointer transition ease-in`}
            onClick={() => setTopHeadlines(false)}
          >
            Everything
          </h3>

          <form className="float-right">
            <input className="p-1" type="text" placeholder="Search"></input>
          </form>
        </div>
      </div>

      {articles &&
        articles.map((article) => (
          <div className="flex flex-col items-start w-full px-5 py-3 mb-3 transition ease-in-out bg-white border rounded-lg post-card border-neutral-500 hover:scale-110">
            <div className="flex flex-row items-center w-full">
              <img
                src={article.urlToImage}
                className="w-10 h-10 border border-black rounded-full"
                alt="Article Image"
              />
              <div className="flex flex-col ml-4 text-left">
                <h3 className="font-bold">{article.author}</h3>
                <div className="flex flex-row">
                  <span className="font-medium text-black/70">
                    {getTimeDifference(article.publishedAt)}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex flex-col text-left ml-14">
              <h2 className="text-4xl font-extrabold">{article.title}</h2>

              <div className="flex flex-row mt-1 space-x-4 text-cyan-700">
                <span className="p-1 transition ease-in rounded">
                  {article.description}
                </span>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default Articles;
