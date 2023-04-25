import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import Layout from "./Layout";
import JobCreate from "./components/JobCreate";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import JobPosts from "./components/JobPosts";
import JobDetail from "./components/JobDetail";
import Articles from "./components/Articles";
import JobEdit from "./components/JobEdit";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<App />}></Route>
          <Route path="/create" element={<JobCreate />}></Route>
          <Route path="/articles" element={<Articles />}></Route>
          <Route path="/discussion" element={<JobPosts />}></Route>
          <Route path="/discussion/:id" element={<JobDetail />}></Route>
          <Route path="/discussion/edit/:id" element={<JobEdit />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
