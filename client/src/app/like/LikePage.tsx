import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { Button } from "antd";
import {  EyeOutlined, HeartFilled, WifiOutlined } from "@ant-design/icons";
import { toggleLike } from "../../slices/moviesSlice";
import { useNavigate } from "react-router-dom";

function LikedMovies() {
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const {  likedMovies } = useSelector((state: RootState) => state.movies);
  const handleLike = (title: string) => {
    dispatch(toggleLike(title)); // Toggle the like state
  };
  return (
    <div>
    <h1 className="text-2xl font-bold text-center mt-4">Bəyənilən Filmlər</h1>
    <Button onClick={()=>navigate("/projects")} className="mt-4 lg:mt-0"> Geri qayıt</Button>
      {likedMovies.length === 0 ? (
        <p>Bəyənilən film yoxdur!</p>
      ) : 
      <>
      
      <div className="flex flex-wrap justify-center gap-6 mt-6">
        {likedMovies.map((movie:any) =>{
          return   (
          
            <div key={movie.id} className="bg-white shadow-lg rounded-lg w-72 h-[430px] flex flex-col	aligin-center justify-center">
              <img alt={movie.title} src={movie.poster} className="w-full h-[300px] object-fit" />
              <div className=" p-4">
                <h2 className="font-semibold text-md">{movie.title}</h2>
                <p className="text-gray-500">IMDB {movie.rating}</p>
              </div>
              <div className="flex justify-around  border-t p-2">
                <WifiOutlined className="text-blue-500 text-xl cursor-pointer" />
                <EyeOutlined className="text-green-500 text-xl cursor-pointer" />
                <HeartFilled
                className="text-red-500 text-xl cursor-pointer"
                onClick={() => handleLike(movie.title)}
              />
              </div>
            </div>
          )
        })}
      </div>
    </>}
    </div>
  );
}

export default LikedMovies;
