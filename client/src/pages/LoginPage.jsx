import React, { useState } from "react";
import * as Components from "../styles/components.jsx";
import { Flex, useToast } from "@chakra-ui/react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import GoogleLoginButton from "../components/login_buttons/GoogleLoginButton.jsx";
import FaceBookLoginButton from "../components/login_buttons/FaceBookLoginButton.jsx";
import GitHubLoginButton from "../components/login_buttons/GitHubLoginButton.jsx";

import { useDispatch, useSelector } from "react-redux";
import {
  signInFailure,
  signInStart,
  signInSuccess,
} from "../redux/slices/userSlice.js";

const Login = () => {
  const [formData, setFormData] = useState({});
  // const {loading, error} = useSelector((state) => state.user);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const [signIn, toggle] = useState(true);

  const toast = useToast();
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const submitHandlerLogin = async (e) => {
    e.preventDefault();

    const { signinEmail, signinPassword } = formData;

    if (!signinEmail || !signinPassword) {
      toast({
        title: "Please Fill all the Fields",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }

    try {
      dispatch(signInStart());
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const { data } = await axios.post("/api/auth/signin", formData, {
        ...config,
        withCredentials: true,
      });

      toast({
        title: "Login Successful",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      if (data.success === false) {
        dispatch(signInFailure(data));
        return;
      }
      dispatch(signInSuccess(data));

      navigate("/profile");
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: error.response.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      dispatch(signInFailure(error));
    }
  };

  const submitHandlerSignup = async (e) => {
    e.preventDefault();
    const { signupName, signupEmail, signupPassword, signupConfirmPassword } =
      formData;

    if (
      !signupName ||
      !signupEmail ||
      !signupPassword ||
      !signupConfirmPassword
    ) {
      toast({
        title: "Please Fill all the Required Fields",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }

    if (signupPassword !== signupConfirmPassword) {
      toast({
        title: "Passwords Do Not Match",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }

    try {
      dispatch(signInStart());
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const { data } = await axios.post("/api/auth/signup", formData, {
        ...config,
        withCredentials: true,
      });
      toast({
        title: "Registration Successful",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      if (data.success === false) {
        dispatch(signInFailure(data));
        setError(true);
        return;
      }
      dispatch(signInSuccess(data));
      navigate("/profile");
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: error.response.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      setError(true);
    }
  };
  return (
    <Components.Container>
      <Components.SignUpContainer signinflag={signIn}>
        <Components.Form>
          <Components.Title>Create Account</Components.Title>
          <Components.Input
            name="signupName"
            type="text"
            placeholder="Name"
            onChange={handleChange}
          />
          <Components.Input
            name="signupEmail"
            type="email"
            placeholder="Email"
            onChange={handleChange}
          />
          <Components.Input
            name="signupPassword"
            type="password"
            placeholder="Password"
            onChange={handleChange}
          />
          <Components.Input
            name="signupConfirmPassword"
            type="password"
            placeholder="Confirm Password"
            onChange={handleChange}
          />
          <Components.SignUpButton onClick={submitHandlerSignup}>
            Sign Up
          </Components.SignUpButton>
        </Components.Form>
      </Components.SignUpContainer>

      <Components.SignInContainer signinflag={signIn}>
        <Components.Form>
          <Components.Title>Login to your account</Components.Title>
          <Components.Input
            name="signinEmail"
            type="email"
            placeholder="Email"
            onChange={handleChange}
          />
          <Components.Input
            name="signinPassword"
            type="password"
            placeholder="Password"
            onChange={handleChange}
          />
          <Components.Anchor href="#">Forgot your password?</Components.Anchor>

          <Components.SignInButton onClick={submitHandlerLogin}>
            Sign In
          </Components.SignInButton>

          <Flex justify="space-between" mt="6" gap="6">
            <GoogleLoginButton />
            <FaceBookLoginButton />
            <GitHubLoginButton />
          </Flex>
        </Components.Form>
      </Components.SignInContainer>

      <Components.OverlayContainer signinflag={signIn}>
        <Components.Overlay signinflag={signIn}>
          <Components.LeftOverlayPanel signinflag={signIn}>
            <Components.Title>Welcome Back!</Components.Title>
            <Components.Paragraph>
              To keep connected with us please login with your personal info
            </Components.Paragraph>
            <Components.GhostButton onClick={() => toggle(true)}>
              Sign In
            </Components.GhostButton>
          </Components.LeftOverlayPanel>

          <Components.RightOverlayPanel signinflag={signIn}>
            <Components.Title>Hello, Friend!</Components.Title>
            <Components.Paragraph>
              Enter Your personal details and start your journey with us
            </Components.Paragraph>
            <Components.GhostButton onClick={() => toggle(false)}>
              Sign Up
            </Components.GhostButton>
          </Components.RightOverlayPanel>
        </Components.Overlay>
      </Components.OverlayContainer>
    </Components.Container>
  );
};

export default Login;
