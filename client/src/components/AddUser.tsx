import { gql, useMutation } from "@apollo/client";
import React, { useRef } from "react";
import { AddUserResponse, AddUserVariables } from "../types/GlobalType";

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
  // Use refs for the input fields
  const inputName = useRef<HTMLInputElement>(null);
  const inputEmail = useRef<HTMLInputElement>(null);

  // Use mutation hook with TypeScript generics
  const [addUser, { data, loading, error }] = useMutation<
    AddUserResponse,
    AddUserVariables
  >(ADD_USER);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (inputName.current && inputEmail.current) {
      addUser({
        variables: {
          name: inputName.current.value,
          email: inputEmail.current.value,
        },
      });

      // Clear input fields
      inputName.current.value = "";
      inputEmail.current.value = "";
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input ref={inputName} placeholder="Name" />
        <input ref={inputEmail} placeholder="Email" />
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
