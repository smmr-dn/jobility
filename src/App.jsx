import { useState } from "react";
import { BiNews } from "react-icons/bi";
import { CgFeed } from "react-icons/cg";
import { AiFillFileAdd } from "react-icons/ai";
import { Link } from "react-router-dom";

function App() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-32 font-sans-pro">
            <h1 className="font-extrabold text-8xl text-cyan-700">Welcome!</h1>

            <h3 className="mt-10 text-4xl font-light">
                What do you want to do today?
            </h3>

            <div className="flex flex-row items-stretch justify-center w-full mt-32 space-x-8">
                <Link
                    to="/discussion"
                    className="flex flex-col w-1/3 p-5 text-left transition duration-200 border-2 hover:bg-cyan-300/20 border-cyan-700 rounded-xl hover:scale-110"
                >
                    <CgFeed size="100px" className="mb-5 text-cyan-700" />
                    <h3 className="text-3xl font-extrabold">
                        Check the Home Feed
                    </h3>
                    <p className="text-xl">
                        Look at all the currently available jobs on the market
                        right now!
                    </p>
                </Link>
                <Link
                    to="/articles"
                    className="flex flex-col w-1/3 p-5 text-left transition duration-200 border-2 hover:bg-cyan-300/20 border-cyan-700 rounded-xl hover:scale-110"
                >
                    <BiNews size="100px" className="mb-5 text-cyan-700" />
                    <h3 className="text-3xl font-extrabold">
                        Browse Current News
                    </h3>
                    <p className="text-xl">
                        Be updated with the latest news that are happening
                        around the world!
                    </p>
                </Link>
                <Link
                    to="/create"
                    className="flex flex-col w-1/3 p-5 text-left transition duration-200 border-2 hover:bg-cyan-300/20 border-cyan-700 rounded-xl hover:scale-110"
                >
                    <AiFillFileAdd
                        size="100px"
                        className="mb-5 text-cyan-700"
                    />
                    <h3 className="text-3xl font-extrabold">Add a Job Post</h3>
                    <p className="text-xl">
                        Are you currently Looking for people to be in your
                        business? Create a post now and let people reach out to
                        you!
                    </p>
                </Link>
            </div>
        </div>
    );
}

export default App;
