import { useQuery } from "@apollo/client";

import { GET_MOVIES } from "../../graphql/queries";
import Icon, {
  AimOutlined,
  EyeOutlined,
  WifiOutlined,
} from "@ant-design/icons";
import { Card, Avatar, Row, Col } from "antd";

function Movies() {
  const { loading, error, data } = useQuery(GET_MOVIES);
  const { Meta } = Card;
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
                  actions={[<WifiOutlined />, <EyeOutlined />, <AimOutlined />]}
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
    </>
  );
}

export default Movies;
