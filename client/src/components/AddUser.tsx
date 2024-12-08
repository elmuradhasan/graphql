import { gql, useMutation } from "@apollo/client";
import React from "react";
import { AddUserResponse, AddUserVariables, User } from "../types/GlobalType";
import { Button, Form, Input, Row } from "antd";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import schema from "../schema";
import { ADD_USER, GET_USERS } from "../graphql/queries";

const AddUser: React.FC = () => {
  // Mutation hook with Apollo Client
  const [addUser, { loading, error }] = useMutation<
    AddUserResponse,
    AddUserVariables
  >(ADD_USER, {
    update(cache, { data }) {
      if (!data) return;

      // Update the cache for the users query
      const existingUsers = cache.readQuery<{ users: User[] }>({
        query: GET_USERS,
      });

      if (existingUsers) {
        // Append the new user to the existing users list
        cache.writeQuery({
          query: GET_USERS,
          data: {
            users: [...existingUsers.users, data.addUser],
          },
        });
      }
    },
  });

  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: AddUserVariables) => {
    addUser({
      variables: data,
    });
    setValue("name", "");
    setValue("email", "");
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
        <Form.Item
          label="Ad"
          validateStatus={errors.name ? "error" : ""}
          help={errors.name ? errors.name.message : ""}
          labelCol={{ span: 24 }} // This ensures the label takes a full row
          wrapperCol={{ span: 24 }}
        >
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <Input {...field} placeholder="İstifadəçi adını daxil edin" />
            )}
          />
        </Form.Item>

        <Form.Item
          label="Email"
          validateStatus={errors.email ? "error" : ""}
          help={errors.email ? errors.email.message : ""}
          labelCol={{ span: 24 }} // This ensures the label takes a full row
          wrapperCol={{ span: 24 }}
        >
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <Input {...field} placeholder="İstifadəçi emailini daxil edin" />
            )}
          />
        </Form.Item>

        <Button
          type="primary"
          disabled={loading}
          onClick={handleSubmit(onSubmit)}
        >
          {loading ? "Əlavə edilir..." : "Əlavə et"}
        </Button>
      </Form>

      {error && <p>Error: {error.message}</p>}
    </Row>
  );
};

export default AddUser;
