import { useState } from "react";
import { BiNews } from "react-icons/bi";
import { CgFeed } from "react-icons/cg";
import { AiFillFileAdd } from "react-icons/ai";

function App() {
    return (
        <div className="p-32 flex flex-col font-sans-pro items-center justify-center min-h-screen">
            <h1 className="font-extrabold text-8xl text-cyan-700">Welcome!</h1>

            <h3 className="mt-10 font-light text-4xl">
                What do you want to do today?
            </h3>

            <div className="mt-32 flex flex-row w-full space-x-8 items-stretch justify-center">
                <button className="flex flex-col w-1/3 p-5 border-2 border-cyan-700 rounded-xl hover:scale-110 transition duration-200">
                    <CgFeed size="100px" className="mb-5 text-cyan-700" />
                    <h3 className="text-3xl font-extrabold">
                        Check the Home Feed
                    </h3>
                    <p className="text-xl">
                        Look at all the currently available jobs on the market
                        right now!
                    </p>
                </button>
                <button className="flex flex-col w-1/3 p-5 border-cyan-700 border-2 rounded-xl hover:scale-110 transition duration-200">
                    <BiNews size="100px" className="text-cyan-700 mb-5" />
                    <h3 className="text-3xl font-extrabold">
                        Browse Current News
                    </h3>
                    <p className="text-xl">
                        Be updated with the latest news that are happening
                        around the world!
                    </p>
                </button>
                <button className="flex flex-col w-1/3 p-5 border-cyan-700 border-2 rounded-xl hover:scale-110 transition duration-200">
                    <AiFillFileAdd
                        size="100px"
                        className="text-cyan-700 mb-5"
                    />
                    <h3 className="text-3xl font-extrabold">Add a Job Post</h3>
                    <p className="text-xl">
                        Are you currently Looking for people to be in your
                        business? Create a post now and let people reach out to
                        you!
                    </p>
                </button>
            </div>
        </div>
    );
}

export default App;
