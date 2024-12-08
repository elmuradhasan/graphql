import { gql, useMutation } from "@apollo/client";
import React from "react";
import { AddUserVariables } from "../types/GlobalType";
import { Button, Form, Input, Row } from "antd";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import schema from "../schema";
import { LOGIN_MUTATION } from "../graphql/queries";

const SignUp: React.FC = () => {
  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const [login, { data, loading, error }] = useMutation(LOGIN_MUTATION);
  const onSubmit = async (datas: AddUserVariables) => {
    try {
      const response = await login({ variables: datas });
      localStorage.setItem("token", response.data?.login.token || "");
      alert("Logged in successfully!");
    } catch (err) {
      console.error(err, "Salam");
    }
    setValue("email", "");
    setValue("password", "");
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
          label="Email"
          validateStatus={errors.email ? "error" : ""}
          help={errors.email ? errors.email?.message : ""}
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

        <Form.Item
          label="password"
          validateStatus={errors.password ? "error" : ""}
          help={errors.password ? errors.password.message : ""}
          labelCol={{ span: 24 }} // This ensures the label takes a full row
          wrapperCol={{ span: 24 }}
        >
          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <Input {...field} placeholder="İstifadəçi parolunu daxil edin" />
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

      {/* {error && <p>Error: {error.message}</p>} */}
    </Row>
  );
};

export default SignUp;
