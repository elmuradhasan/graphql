import { gql, useMutation } from "@apollo/client";
import React from "react";
import { AddUserVariables } from "../../types/GlobalType";
import { Button, Form, Input } from "antd";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import { LOGIN_MUTATION } from "../../graphql/queries";
import { Link, useNavigate } from "react-router-dom";
import loginSchema from "../../schema/loginSchema";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { logins } from "../../slices/authSlice";
import { saveInfo } from "../../slices/userSlice";
import "./Login.css";

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
    <div className="login-container">
      <div className="login-left">
        <h1>Elmuradhasan saytına giriş</h1>
        <img src="./images/login.svg" alt="" className="login-image" />
        <p>Xəyallarına gedəcək yolda sənə dəstək olacaq</p>
      </div>
      <div className="login-right">
        <div className="mainRow">
          <h2>Xoş gəlmisən, Dost:)</h2>
          <Form
            onFinish={handleSubmit(onSubmit)}
            className="login-form"
          >
            <Form.Item
              label="Email"
              validateStatus={errors.email ? "error" : ""}
              help={errors.email ? errors.email?.message : ""}
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
            <div className="login-extra">
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
    </div>
  );
};

export default Login;
