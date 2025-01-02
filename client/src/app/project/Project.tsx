import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useQuery } from "@apollo/client";
import { GET_MOVIES } from "../../graphql/queries";
import { toggleLike, setMovies } from "../../slices/moviesSlice";
import { RootState } from "../../store/store";
import { Modal, Carousel } from "antd";
import {
  WifiOutlined,
  EyeOutlined,
  HeartOutlined,
  HeartFilled,
} from "@ant-design/icons";
import Loading from "../loading/Loading";
import PersonalProjects from "./mypersonalprojects/PersonalPrpjects";

type Movie = {
  title: string;
  poster: string;
  rating: string;
  liked: boolean;
  description?: string;
};
function Projects(): JSX.Element {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const { movies } = useSelector((state: RootState) => state.movies);
  const { data, loading, error } = useQuery(GET_MOVIES);
  useEffect(() => {
    if (data) {
      dispatch(setMovies(data.movies));
    }
  }, [data, dispatch]);

  const handleLike = (title: string): void => {
    dispatch(toggleLike(title));
  };

  const showModal = (movie: Movie): void => {
    setSelectedMovie(movie);
    setIsModalOpen(true);
  };

  if (loading) return <Loading />;
  if (error) return <p className="text-red-500">Error: {error.message}</p>;

  return (
    <div className="p-4 lg:p-8">
      <h1 className="text-3xl font-bold text-center mt-4">Filmlər</h1>
      <p className="text-lg text-center mt-2 mb-8">
        Modulun məqsədi müxtəlif funksionallıqların tətbiq olunmasını göstərməkdir.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {movies.map((movie: Movie) => (
          <div
            key={movie.title}
            className="bg-white shadow-lg rounded-lg flex flex-col overflow-hidden"
          >
            <img
              alt={movie.title}
              src={movie.poster}
              className="w-full h-64 object-cover"
            />
            <div className="p-4 flex-1">
              <h2 className="font-semibold text-lg truncate">{movie.title}</h2>
              <p className="text-gray-500 mt-1">IMDB: {movie.rating}</p>
            </div>
            <div className="flex justify-around border-t p-2">
              <WifiOutlined className="text-blue-500 text-xl cursor-pointer" />
              <EyeOutlined
                className="text-green-500 text-xl cursor-pointer"
                onClick={() => showModal(movie)}
              />
              {movie.liked ? (
                <HeartFilled
                  className="text-red-500 text-xl cursor-pointer"
                  onClick={() => handleLike(movie.title)}
                />
              ) : (
                <HeartOutlined
                  className="text-gray-500 text-xl cursor-pointer"
                  onClick={() => handleLike(movie.title)}
                />
              )}
            </div>
          </div>
        ))}
      </div>
      <PersonalProjects />
      <Modal
        title={selectedMovie?.title || "Movie Details"}
        open={isModalOpen}
        onOk={() => setIsModalOpen(false)}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
      >
        <p>{selectedMovie?.description || "Details will go here."}</p>
      </Modal>
    </div>
  );
}

export default Projects;
