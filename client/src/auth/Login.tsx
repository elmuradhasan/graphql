import { gql, useMutation } from "@apollo/client";
import React, { Dispatch, SetStateAction } from "react";
import { AddUserVariables } from "../types/GlobalType";
import { Button, Col, Form, Input, Row } from "antd";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import { LOGIN_MUTATION } from "../graphql/queries";
import { Link, useNavigate } from "react-router-dom";
import loginSchema from "../schema/loginSchema";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { logins } from "../slices/authSlice";
import { saveInfo } from "../slices/userSlice";

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
      console.log(response);

      dispatch(saveInfo(response.data?.login.user));
      localStorage.setItem("user", JSON.stringify(response.data?.login.user));

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
    <div style={{ width: "100%", display: "flex", height: "100vh" }}>
      <div
        style={{
          width: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-evenly",
          flexDirection: "column",
          backgroundColor: "#f8f9fa",
          color:"#1677ff"
        }}
      >
        <h1 >
          Elmuradhasan saytına giriş
        </h1>
        <img src="./images/login.svg" alt="" width={450} />
        <p >Xəyallarına gedəcək yolda sənə dəstək olacaq</p>
      </div>
      <div
        style={{
          width: "50%",
          height: "100vh",
          display: "flex",
          flexDirection:"column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div className="mainRow">
          <h2>Xoş gəlmisən, Dost:)</h2>
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
      </div>
      ;{/* {error && <p>Error: {error.message}</p>} */}
    </div>
  );
};

export default Login;
