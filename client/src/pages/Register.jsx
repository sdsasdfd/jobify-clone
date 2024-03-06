import React from "react";
import Logo from "../components/Logo";
import FormRow from "../components/FormRow";
import { Link, Form, redirect } from "react-router-dom";
import { toast } from "react-toastify";
import Wrapper from "../assets/wrappers/RegisterAndLoginPage";
import customFetch from "../utils/customFetch";
import SubmitBtn from "../components/SubmitBtn";

const Register = () => {
  return (
    <Wrapper>
      <Form method="post" className="form">
        <Logo />
        <h4>Register</h4>

        <FormRow type="text" defaultValue="unas" name="name" />
        <FormRow
          type="text"
          defaultValue="mirza"
          name="lastName"
          labelText="last name"
        />
        <FormRow type="text" defaultValue="jhelum" name="location" />
        <FormRow type="email" defaultValue="unas@gmail.com" name="email" />
        <FormRow type="password" defaultValue="1" name="password" />
        <SubmitBtn />
        <p>
          Already a member?
          <Link to="/login">Login</Link>`
        </p>
      </Form>
    </Wrapper>
  );
};

export default Register;

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  try {
    await customFetch.post("/auth/register", data);
    toast.success("Registration successfull");
    return redirect("/login");
  } catch (error) {
    console.log(error);
    toast.error(error?.response?.data?.msg);

    return error;
  }
};
