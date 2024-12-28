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
    <div className="flex flex-col lg:flex-row w-full h-screen">
      {/* Left Section */}
      <div className="flex flex-col items-center justify-center lg:w-1/2 bg-white-100 text-blue-600 p-6">
        <h1 className="text-4xl mb-4">Elmuradhasan saytına giriş</h1>
        <img src="./images/login.svg" alt="login" className="w-80 mb-4" />
        <p className="text-lg">Xəyallarına gedəcək yolda sənə dəstək olacaq</p>
      </div>

      {/* Right Section */}
      <div className="flex flex-col items-center justify-center bg-gray-100 lg:w-1/2 p-6">
        <h2 className="text-3xl mb-4">Xoş gəlmisən, Dost:)</h2>
        <Form
          onFinish={handleSubmit(onSubmit)}
          className="w-[80%] space-y-4"
        >
          {/* Email Field */}
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
                className="border-gray-300 rounded-lg shadow-sm  focus:none focus:outline-none"
              />
              )}
            />
          </Form.Item>

          {/* Password Field */}
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
                  size="large"
                  className="border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:none focus:outline-none"
                />
              )}
            />
          </Form.Item>

          {/* Extra Link */}
          <div className="flex justify-between mb-4">
            <span>Hesabin yoxdur?</span>
            <Link to="/signup" className="text-blue-600 hover:text-blue-800">
              Qeydiyyat
            </Link>
          </div>

          {/* Submit Button */}
          <Button
            type="primary"
            size="large"
            disabled={loading}
            className="w-full"
            onClick={handleSubmit(onSubmit)}
          >
            {loading ? "Daxil olunur..." : "Daxil ol"}
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default Login;
