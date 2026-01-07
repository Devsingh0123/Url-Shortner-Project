import React from "react";
import { useState } from "react";
import axios from "axios";

const App = () => {
  const [originalUrl, setOriginalUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("ssssssssssss");
  const url = import.meta.env.VITE_BASE_URL + `/api/${shortUrl}`;

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        import.meta.env.VITE_BASE_URL + "/api/shortener",
        {
          originalUrl,
        }
      );
      console.log(res.data.data);

      setShortUrl(res.data.data.shortUrl);

      setOriginalUrl("");
    } catch (error) {
      console.error("Error while creating url", error);
    }
  };

  return (
    <div className="w-screen h-screen bg-[#11092A] text-white flex flex-col items-center justify-center ">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col sm:flex-row w-full max-w-xl gap-2 mb-6"
      >
        <input
          type="text"
          value={originalUrl}
          onChange={(e) => setOriginalUrl(e.target.value)}
          placeholder="Enter URL"
          className="flex-1 px-4 py-2 bg-white text-black rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition"
        >
          click
        </button>
      </form>
      {shortUrl && (
        <div className="flex flex-col sm:flex-row w-full max-w-xl gap-2 mb-6">
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline flex-1 px-4 py-2 bg-white  rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 "
          >
            {url}
          </a>
          {/* copy button */}
          <button
            onClick={() =>{
              navigator.clipboard.writeText(url)
              alert("Link is copied");
            } }
            className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition"
          >
            Copy
          </button>
        </div>
      )}
    </div>
  );
};

export default App;
