import { gql, useMutation } from "@apollo/client";
import React from "react";
import { AddUserResponse, AddUserVariables } from "../types/GlobalType";
import { Button, Form, Input, Row } from "antd";
import { yupResolver } from "@hookform/resolvers/yup";

import { Controller, useForm } from "react-hook-form";
import schema from "../schema";

const ADD_USER = gql`
  mutation AddUser($name: String!, $email: String!) {
    addUser(name: $name, email: $email) {
      id
      name
      email
    }
  }
`;

const AddUser: React.FC = () => {
  const [addUser, { data, loading, error }] = useMutation<
    AddUserResponse,
    AddUserVariables
  >(ADD_USER);

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: AddUserVariables) => {
    console.log(data, "Salam");

    addUser({
      variables: data,
    });
  };

  return (
    <Row
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Form
        onFinish={handleSubmit(onSubmit)}
        style={{ width: "500px", display: "flex", flexDirection: "column" }}
      >
        {/* Name Field */}
        <Form.Item
          label="Ad"
          validateStatus={errors.name ? "error" : ""}
          help={errors.name ? errors.name.message : ""}
          labelCol={{ span: 24 }} // This ensures the label takes a full row
          wrapperCol={{ span: 24 }} // This ensures the input takes a full row
        >
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <Input {...field} placeholder="İstifadəçi adını daxil edin" />
            )}
          />
        </Form.Item>

        {/* Email Field */}
        <Form.Item
          label="Email"
          validateStatus={errors.email ? "error" : ""}
          help={errors.email ? errors.email.message : ""}
          labelCol={{ span: 24 }} // This ensures the label takes a full row
          wrapperCol={{ span: 24 }} // This ensures the input takes a full row
        >
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <Input {...field} placeholder="İstifadəçi emailini daxil edin" />
            )}
          />
        </Form.Item>

        {/* Submit Button */}
        <Button
          type="primary"
          disabled={loading}
          onClick={handleSubmit(onSubmit)}
        >
          {loading ? "Əlavə edilir..." : "Əlavə et"}
        </Button>
      </Form>

      {/* Error Message */}
      {error && <p>Error: {error.message}</p>}

      {/* Display Added User Data */}
      {data && (
        <div>
          <h3>User Added:</h3>
          <p>Name: {data.addUser.name}</p>
          <p>Email: {data.addUser.email}</p>
        </div>
      )}
    </Row>
  );
};

export default AddUser;
