import { Link } from "react-router-dom";

function MovieCard({ img, slug }) {
  return (
    <>
      <Link to={`/details/${slug}`}>
        <div className="">
          <img
            src={img}
            alt=""
            className="w-40 rounded-xl h-56 object-cover grow hover:scale-[1.1] transition-all ease-in-out duration-300"
          />
        </div>
      </Link>
    </>
  );
}

export default MovieCard;
