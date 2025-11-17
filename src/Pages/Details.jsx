import { useParams } from "react-router-dom";
import movies from "../movies";
import ReactPlayer from "react-player";
import { useState } from "react";
import MovieCard from "../components/MovieCard";
import { Link } from "react-router-dom";

function Details() {
  let { slug } = useParams();
  let movie = movies.find((movie) => {
    return movie.slug == slug;
  });
  let [volume, setVol] = useState(true);
  let mediaHandler = () => {
    setVol((prev) => !prev);
  };
  let [volDisplay, setVolDisplay] = useState(false);
  let volumeDisplayHandler = () => {
    setVolDisplay((prev) => !prev);
  };

  let suggestions = movies.filter((data) => {
    return data.genre == movie.genre;
  });

  let finalSugg = suggestions.filter((data) => {
    return data.title !== movie.title;
  });

  let MuteIcon = () => {
    return (
      <>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          fill="currentColor"
          class="bi bi-volume-mute-fill"
          viewBox="0 0 16 16"
        >
          <path d="M6.717 3.55A.5.5 0 0 1 7 4v8a.5.5 0 0 1-.812.39L3.825 10.5H1.5A.5.5 0 0 1 1 10V6a.5.5 0 0 1 .5-.5h2.325l2.363-1.89a.5.5 0 0 1 .529-.06m7.137 2.096a.5.5 0 0 1 0 .708L12.207 8l1.647 1.646a.5.5 0 0 1-.708.708L11.5 8.707l-1.646 1.647a.5.5 0 0 1-.708-.708L10.793 8 9.146 6.354a.5.5 0 1 1 .708-.708L11.5 7.293l1.646-1.647a.5.5 0 0 1 .708 0" />
        </svg>
      </>
    );
  };

  let UnmuteIcon = () => {
    return (
      <>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          fill="currentColor"
          class="bi bi-volume-up"
          viewBox="0 0 16 16"
        >
          <path d="M11.536 14.01A8.47 8.47 0 0 0 14.026 8a8.47 8.47 0 0 0-2.49-6.01l-.708.707A7.48 7.48 0 0 1 13.025 8c0 2.071-.84 3.946-2.197 5.303z" />
          <path d="M10.121 12.596A6.48 6.48 0 0 0 12.025 8a6.48 6.48 0 0 0-1.904-4.596l-.707.707A5.48 5.48 0 0 1 11.025 8a5.48 5.48 0 0 1-1.61 3.89z" />
          <path d="M10.025 8a4.5 4.5 0 0 1-1.318 3.182L8 10.475A3.5 3.5 0 0 0 9.025 8c0-.966-.392-1.841-1.025-2.475l.707-.707A4.5 4.5 0 0 1 10.025 8M7 4a.5.5 0 0 0-.812-.39L3.825 5.5H1.5A.5.5 0 0 0 1 6v4a.5.5 0 0 0 .5.5h2.325l2.363 1.89A.5.5 0 0 0 7 12zM4.312 6.39 6 5.04v5.92L4.312 9.61A.5.5 0 0 0 4 9.5H2v-3h2a.5.5 0 0 0 .312-.11" />
        </svg>
      </>
    );
  };

  return (
    <>
      <div
        className={`relative w-full h-[50vw] lg:h-[80vh] overflow-hidden transition-all duration-300 ease-in-out ${
          volDisplay ? "custom-shadow" : ""
        }`}
        onMouseEnter={volumeDisplayHandler}
        onMouseLeave={volumeDisplayHandler}
      >
        <ReactPlayer
          width="100vw"
          height="100%"
          className="scale-[1.50] -z-30"
          muted={volume}
          loop={true}
          playing={true}
          controls={false}
          src={movie.youtube_trailer}
        />
        <Link
          to="/"
          className={`border-neutral-100 border py-3 px-4 rounded-lg absolute top-16 right-40 transition-all duration-300 ease-in-out bg-none text-white hover:bg-white hover:text-black ${
            volDisplay ? "block" : "hidden"
          }`}
        >
          Go Back
        </Link>
        <div className="absolute left-40 bottom-36 w-[400px] ">
          <div className="bg-orange-500 inline-block px-4 py-1 rounded text-sm mb-3">
            IMDB Rating {movie.imdb_rating}
          </div>
          <h1 className="text-5xl font-black mb-5">{movie.title}</h1>
          <p className="">{movie.description}</p>
          <button className="px-8 py-4 mt-3 rounded-lg bg-red-600 cursor-pointer hover:bg-white hover:text-black transition-all duration-300 ease-in-out">
            Add to watchlist
          </button>
        </div>
        <button
          onClick={mediaHandler}
          className={`absolute bottom-36 right-40 rounded-full p-3 border-2 border-white cursor-pointer transition-all duration-300 ease-in-out
        ${volDisplay ? "block" : "hidden"}`}
        >
          {volume ? <MuteIcon /> : <UnmuteIcon />}
        </button>
      </div>

      <div className="my-24 w-[80vw] mx-auto">
        <h1 className="text-3xl font-bold">More like this:</h1>
        <div className="flex flex-wrap gap-6 mt-10 w-[90vw] mx-auto">
          {finalSugg.map((movie) => (
            <MovieCard img={movie.img} slug={movie.slug} />
          ))}
        </div>
      </div>
    </>
  );
}

export default { Details, wishlist };
