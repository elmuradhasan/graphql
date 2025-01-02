import {  useMutation } from "@apollo/client";
import React, { useEffect, useState } from "react";
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
import FullPage from "../../app/loading/FullPage";
const Login: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [x, setx] = useState(true)
  const notify = () => toast.success("Uğurla daxil olundu!");
  const notifyError = (value: any) => toast.error(value);
  useEffect(() => {
  const fullShow = setTimeout(()=>{
    setx(false)
   },4000)
   return () => {
    clearTimeout(fullShow)
  }
  }, [])

  
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
      dispatch(saveInfo(response.data?.login.user));
      localStorage.setItem("user", JSON.stringify(response.data?.login.user));
      dispatch(logins());
      notify();
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (err) {
      console.error(err);
     notifyError(error?.message)
    }
    setValue("email", "");
    setValue("password", "");
  };

  return (
    <div className="flex flex-col lg:flex-row w-full h-screen">
       {
        x ? <FullPage /> : <>
             <div className="flex flex-col items-center justify-center lg:w-1/2 bg-white-100 text-blue-600 p-6">
        <h1  className="text-3xl  mb-[2em]">Elmuradhasan saytına giriş</h1>
        <img src="./images/login.svg" alt="login" className="w-80 mb-[2em]" />
        <p className="lg:text-lg  ">Xəyallarına gedəcək yolda sənə dəstək olacaq</p>
      </div>

      {/* Right Section */}
      <div className="flex flex-col items-center justify-center bg-gray-100 lg:w-1/2 p-6">
        <h2 className="text-3xl mb-6 text-[#FF5722]">Xoş gəlmisən, Dost:)</h2>
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
            help={errors.password ? errors.password?.message : ""}
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
            style={{backgroundColor:"#FF5722",color:"#fff"}}
            size="large"
            disabled={loading}
            className="w-full border-none"
            onClick={handleSubmit(onSubmit)}
          >
            {loading ? "Daxil olunur..." : "Daxil ol"}
          </Button>
        </Form>
      </div>
        </>
       }
    </div>
  );
};

export default Login;
