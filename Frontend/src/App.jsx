import React from "react";
import { useState } from "react";
import axios from "axios"

const App = () => {
  const [originalUrl, setOriginalUrl] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      console.log(originalUrl);
      

      const res = await axios.post("http://localhost:8000/api/shortener", {
        originalUrl,
      } );
      console.log(res.data.data.shortUrl);
      
      setOriginalUrl("");
    } catch (error) {
       console.error("Error while creating url",error)

    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col sm:flex-row w-full max-w-xl gap-2 mb-6"
    >
      <input
        type="text"
        value={originalUrl}
        onChange={(e) => setOriginalUrl(e.target.value)}
        placeholder="Enter URL"
        className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        type="submit"
        className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition"
        
      >click</button>
    </form>
  );
};

export default App;
