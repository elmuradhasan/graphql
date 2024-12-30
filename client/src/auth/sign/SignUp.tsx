import { gql, useMutation } from "@apollo/client";
import { AddUserVariables } from "../../types/GlobalType";
import { Button, Form, Input, Row } from "antd";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import { SIGNUP_MUTATION } from "../../graphql/queries";
import { Link, useNavigate } from "react-router-dom";
import signUpSchema from "../../schema/signUpSchema";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { toast } from "react-toastify";

const SignUp: React.FC = () => {
  const navigate = useNavigate();
  const notify = () => toast.success("Qeydiyyatdan ugurla kecdiniz!");
  const notifyError = (value: any) => toast.error(value);

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
      await signup({ variables: datas });
      notify();
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err) {
      console.log(err);
    }
    setValue("email", "");
    setValue("password", "");
    setValue("username", "");
  };

  return (
    <Row
      className="w-full h-screen bg-cover bg-center flex justify-center items-center"
      style={{
        backgroundImage: `url("/images/image.png")`,
      }}
    >
      <div className="bg-white p-8 rounded-lg shadow-lg lg:w-[45%] md:w-[80%]   ">
        <h2 className="lg:text-2xl font-semibold text-center mb-6">Elmuradhasan saytında qeydiyyat formu</h2>
        <Form
          onFinish={handleSubmit(onSubmit)}
          className="space-y-6"
        >
          {/* Username Field */}
          <Form.Item
            label="İstifadəçi adı"
            validateStatus={errors.username ? "error" : ""}
            help={errors.username ? errors.username?.message : ""}
            className="text-left"
            labelCol={{ span: 24 }} // This ensures the label takes a full row
            wrapperCol={{ span: 24 }}
          >
            <Controller
              name="username"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  placeholder="İstifadəçi adını daxil edin"
                  size="large"
                  className="border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              )}
            />
          </Form.Item>

          {/* Email Field */}
          <Form.Item
            label="Email"
            validateStatus={errors.email ? "error" : ""}
            help={errors.email ? errors.email?.message : ""}
            className="text-left"
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
                  className="border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              )}
            />
          </Form.Item>

          {/* Password Field */}
          <Form.Item
            label="Parol"
            validateStatus={errors.password ? "error" : ""}
            help={errors.password ? errors.password.message : ""}
            className="text-left"
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
                  type="password"
                  placeholder="İstifadəçi parolunu daxil edin"
                  size="large"
                  className="border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              )}
            />
          </Form.Item>

          {/* Extra Link */}
          <div className="flex justify-between mb-4 text-sm">
            <span>Artıq hesabın var?</span>
            <Link to="/login" className="text-[#FF5722] hover:text-blue-800">
              Daxil ol
            </Link>
          </div>

          {/* Submit Button */}
          <Button
            size="large"
            className="w-full border-none "
            style={{backgroundColor:"#FF5722",color:"#fff"}}
            disabled={true}
            onClick={handleSubmit(onSubmit)}
          >
            {loading ? "Qeydiyyat..." : "Qeydiyyat"}
          </Button>
        </Form>
      </div>
      {error && notifyError(error.message)}
    </Row>
  );
};

export default SignUp;
