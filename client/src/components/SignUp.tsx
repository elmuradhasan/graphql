import { gql, useMutation } from "@apollo/client";
import React, { Dispatch, SetStateAction } from "react";
import { AddUserVariables } from "../types/GlobalType";
import { Button, Form, Input, Row } from "antd";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import { LOGIN_MUTATION, SIGNUP_MUTATION } from "../graphql/queries";
import { Link, useNavigate } from "react-router-dom";
import signUpSchema from "../schema/signUpSchema";

const SignUp: React.FC = () => {
  const navigate = useNavigate();
  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(signUpSchema),
  });
  const [signup, { data, loading, error }] = useMutation(SIGNUP_MUTATION);
  const onSubmit = async (datas: AddUserVariables) => {
    try {
      const response = await signup({ variables: datas });

      alert("Qeydiyyatdan ugurla kecdiniz");

      setTimeout(() => {
        navigate("/login");
      }, 1000);
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
        flexDirection: "column",
        height: "100vh",
      }}
    >
      <h2>Elmuradhasan saytında qeydiyyat formu</h2>
      <Form
        onFinish={handleSubmit(onSubmit)}
        style={{ width: "500px", display: "flex", flexDirection: "column" }}
      >
        <Form.Item
          label="Username"
          validateStatus={errors.email ? "error" : ""}
          help={errors.username ? errors.username?.message : ""}
          labelCol={{ span: 24 }} // This ensures the label takes a full row
          wrapperCol={{ span: 24 }}
        >
          <Controller
            name="username"
            control={control}
            render={({ field }) => (
              <Input {...field} placeholder="İstifadəçi adini daxil edin" />
            )}
          />
        </Form.Item>
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
          label="Parol"
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
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "10px",
          }}
        >
          <span>Artıq hesabın var?</span> <Link to="/login">Daxil ol</Link>
        </div>
        <Button
          type="primary"
          disabled={loading}
          onClick={handleSubmit(onSubmit)}
        >
          {loading ? "Qeydiyyat..." : "Qeydiyyat"}
        </Button>
      </Form>

      {error && <p>Error: {error.message}</p>}
    </Row>
  );
};

export default SignUp;
