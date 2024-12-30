import { WifiOutlined, EyeOutlined, AimOutlined } from "@ant-design/icons";
import { useQuery } from "@apollo/client";
import { Modal } from "antd";
import React, { useState } from "react";
import { GET_MOVIES } from "../../graphql/queries";
import Loading from "../loading/Loading";


function Projects() {
  const { loading, error, data } = useQuery(GET_MOVIES);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  if (loading) return <Loading />;
  if (error) return <p className="text-center text-red-500">Error: {error.message}</p>;

  return (
    <>
      <h1 className="text-2xl font-bold text-center mt-4">Bu modulun məqsədi</h1>
      <p className="text-center text-gray-600 mt-2">
        müxtəlif bilikləri bir arada tətbiq etməkdir. Məsələn burda olan məlumatlar api-dən gəlir və müxtəlif funksionallıqlar var
      </p>
      <div className="flex flex-wrap justify-center gap-6 mt-6">
        {data.movies.map(
          (movie: { title: string; poster: string; rating: string }, index: number) => (
            <div
              key={index}
              className="bg-white shadow-lg rounded-lg w-72 overflow-hidden"
            >
              <img
                alt="example"
                src={movie.poster}
                className="w-full h-64 object-cover"
              />
              <div className="p-4">
                <div className="flex items-center mb-2">
                  <img
                    src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                    alt="Avatar"
                    className="w-8 h-8 rounded-full mr-3"
                  />
                  <h2 className="font-semibold text-lg">{movie.title}</h2>
                </div>
                <p className="text-gray-500">IMDB {movie.rating}</p>
              </div>
              <div className="flex justify-around py-2 border-t">
                <WifiOutlined className="text-blue-500 text-xl cursor-pointer" />
                <EyeOutlined
                  className="text-green-500 text-xl cursor-pointer"
                  onClick={showModal}
                />
                <AimOutlined className="text-red-500 text-xl cursor-pointer" />
              </div>
            </div>
          )
        )}
      </div>
      <Modal
        title="Basic Modal"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        width={"70%"}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
    </>
  );
}

export default Projects;
