import { WifiOutlined, EyeOutlined, AimOutlined } from "@ant-design/icons";
import { useQuery } from "@apollo/client";
import { Avatar, Card, Col, Modal, Row } from "antd";
import React, { useState } from "react";
import { GET_MOVIES } from "../../graphql/queries";


function Projects() {

  const { loading, error, data } = useQuery(GET_MOVIES);
  const { Meta } = Card;
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
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  return (
    <>
      <Row  style={{display:"flex",justifyContent:"space-between",flexWrap:"wrap"}}>
          {data.movies.map(
            (movie: { title: string; poster: string ,rating:string}, index: number) => (
                <Card
                  style={{ width: 300,height:500 }}
                  cover={<img alt="example" src={movie.poster} style={{height:400}} />}
                  actions={[<WifiOutlined />, <EyeOutlined onClick={showModal}  />, <AimOutlined />]}
                >
                  <Meta
                    avatar={
                      <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                    }
                    title={movie.title}
                    description={"IMDB "+`${ movie.rating}`}
                  />
                </Card>
            )
          )}

      </Row>
      <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} width={"70%"}>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
    </>
  );
}

export default Projects;
