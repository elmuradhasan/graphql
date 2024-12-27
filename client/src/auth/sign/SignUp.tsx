import { gql, useMutation } from "@apollo/client";
import { AddUserVariables } from "../../types/GlobalType";
import { Button, Form, Input, Row } from "antd";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import { SIGNUP_MUTATION } from "../../graphql/queries";
import { Link, useNavigate } from "react-router-dom";
import signUpSchema from "../../schema/signUpSchema";
import "../../style/style.css";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { toast } from "react-toastify";
const SignUp: React.FC = () => {
  const navigate = useNavigate();
  const notify = () => toast.success("Qeydiyyatdan ugurla kecdiniz!");

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
      }, 3000);
    } catch (err) {
      console.error(err, "error");
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
        backgroundImage: `url("https://wallpapers.com/images/hd/website-background-sdki780prxb1nfs5.jpg")`,
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
    >
      <div className="mainRow">
        <h2>Elmuradhasan saytında qeydiyyat formu</h2>
        <Form
          onFinish={handleSubmit(onSubmit)}
          style={{ width: "500px", display: "flex", flexDirection: "column" }}
        >
          <Form.Item
            label="İstifadəçi adı"
            validateStatus={errors.username ? "error" : ""}
            help={errors.username ? errors.username?.message : ""}
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
                />
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
                  type="password"
                  placeholder="İstifadəçi parolunu daxil edin"
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
            <span>Artıq hesabın var?</span> <Link to="/login">Daxil ol</Link>
          </div>
          <Button
            type="primary"
            disabled={loading}
            size="large"
            onClick={handleSubmit(onSubmit)}
          >
            {loading ? "Qeydiyyat..." : "Qeydiyyat"}
          </Button>
        </Form>

        {error && <p>Error: {error.message}</p>}
      </div>
    </Row>
  );
};

export default SignUp;
