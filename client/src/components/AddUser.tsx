import { gql, useMutation } from "@apollo/client";
import React, { useState } from "react";
import { AddUserResponse, AddUserVariables } from "../types/GlobalType";
import {Input} from "antd"
// Define the GraphQL mutation
const ADD_USER = gql`
  mutation AddUser($name: String!, $email: String!) {
    addUser(name: $name, email: $email) {
      id
      name
      email
    }
  }
`;

// Define the TypeScript types for mutation variables and response

const AddUser: React.FC = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
  
    // Use mutation hook with TypeScript generics
    const [addUser, { data, loading, error }] = useMutation<
      AddUserResponse,
      AddUserVariables
    >(ADD_USER);
  
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
  
      if (name && email) {
        addUser({
          variables: {
            name,
            email,
          },
        });
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Input onChange={(e)=>setName(e.target.value)} placeholder="Name" />
        <Input onChange={(e)=>setEmail(e.target.value)} placeholder="Email" />
        <button type="submit" disabled={loading}>
          {loading ? "Adding..." : "Add User"}
        </button>
      </form>
      {error && <p>Error: {error.message}</p>}
      {data && (
        <div>
          <h3>User Added:</h3>
          <p>Name: {data.addUser.name}</p>
          <p>Email: {data.addUser.email}</p>
        </div>
      )}
    </div>
  );
};

export default AddUser;
