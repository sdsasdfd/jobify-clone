import React from "react";
import Logo from "../components/Logo";
import FormRow from "../components/FormRow";
import Wrapper from "../assets/wrappers/RegisterAndLoginPage";
import {
  Link,
  Form,
  useNavigation,
  redirect,
  useNavigate,
} from "react-router-dom";
import { toast } from "react-toastify";

import customFetch from "../utils/customFetch";
import SubmitBtn from "../components/SubmitBtn";

const Login = () => {
  const navigate = useNavigate();

  const loginDemoUser = async () => {
    const data = {
      email: "test@test.com",
      password: "secret123",
    };
    try {
      await customFetch.post("/auth/login", data);
      toast.success("Test the App");
      navigate("/dashboard");
    } catch (error) {
      toast.error(error?.response?.data?.msg);
    }
  };
  return (
    <Wrapper>
      <Form method="post" className="form">
        <Logo />
        <h4>Login</h4>
        <FormRow type="email" name="email" defaultValue="unas@gmail.com" />
        <FormRow type="password" name="password" defaultValue="1" />
        <SubmitBtn />
        <button type="button" className="btn btn-block" onClick={loginDemoUser}>
          explore the app
        </button>
        <p>
          Not a member yet?
          <Link to="/register">Register</Link>`
        </p>
      </Form>
    </Wrapper>
  );
};

export default Login;

export const action = async ({ request }) => {
  const formData = await request.formData();

  const data = Object.fromEntries(formData);

  try {
    await customFetch.post("/auth/login", data);
    toast.success("Login successfull..");
    return redirect("/dashboard");
  } catch (error) {
    toast.error(error?.response?.data?.msg);

    return error;
  }
};
