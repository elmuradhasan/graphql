// import { gql, useQuery } from "@apollo/client";
// import { User } from "../types/GlobalType";
// import { GET_USERS } from "../graphql/queries";

const UserList: React.FC = () => {
  // const { loading, error, data } = useQuery(GET_USERS);

  // if (loading) return <p>Loading...</p>;
  // if (error) return <p>Error :(</p>;

  return (
    <ul>
      {/* {data.users.map((user: User) => (
        <li key={user.id}>
          {user.name} - {user.email}
        </li>
      ))} */}
      <h2>Salam</h2>
    </ul>
  );
};

export default UserList;
