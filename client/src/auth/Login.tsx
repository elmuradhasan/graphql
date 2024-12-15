import { gql, useMutation } from "@apollo/client";
import React, { Dispatch, SetStateAction } from "react";
import { AddUserVariables } from "../types/GlobalType";
import { Button, Form, Input, Row } from "antd";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import { LOGIN_MUTATION } from "../graphql/queries";
import { Link, useNavigate } from "react-router-dom";
import loginSchema from "../schema/loginSchema";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { logins } from "../slices/authSlice";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const notify = () => toast.success("Uğurla daxil olundu!");
  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });
  const [login, { data, loading, error }] = useMutation(LOGIN_MUTATION);
  const onSubmit = async (datas: AddUserVariables) => {
    try {
      const response = await login({ variables: datas });
      localStorage.setItem("token", response.data?.login.token || "");
      dispatch(logins());
      notify();
      setTimeout(() => {
        navigate("/");
      }, 3000);
    } catch (err) {
      console.error(err, "Salam");
    }
    setValue("email", "");
    setValue("password", "");
  };

  return (
    <Row
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        backgroundImage: `url("https://wallpaperaccess.com/full/3239480.jpg")`,
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
    >
      <div className="mainRow">
        <h2>Elmuradhasan saytına giriş</h2>
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
                <Input
                  {...field}
                  placeholder="İstifadəçi emailini daxil edin"
                  size="large"
                />
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
                <Input.Password
                  iconRender={(visible) =>
                    visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                  }
                  {...field}
                  placeholder="İstifadəçi parolunu daxil edin"
                  type="password"
                  size="large"
                />
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
            <span>Hesabin yoxdur?</span> <Link to="/signup">Qeydiyyat</Link>
          </div>
          <Button
            type="primary"
            size="large"
            disabled={loading}
            onClick={handleSubmit(onSubmit)}
          >
            {loading ? "Daxil olunur..." : "Daxil ol"}
          </Button>
        </Form>
      </div>
      ;{/* {error && <p>Error: {error.message}</p>} */}
    </Row>
  );
};

export default Login;
