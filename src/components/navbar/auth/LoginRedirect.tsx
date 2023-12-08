import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useLocation, useParams } from "react-router-dom";

const backendUrl = process.env.REACT_APP_BACKEND_URL;

const LoginRedirect = () => {
  const [text, setText] = useState("Loading...");
  const location = useLocation();
  const params = useParams<{ providerName?: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    // Successfully logged with the provider
    // Now logging with Strapi by using the access_token (given by the provider) in location.search
    axios
      .get(`${backendUrl}/api/auth/google/callback${location.search}`)
      .then((res) => {
        if (res.status !== 200) {
          throw new Error(`Couldn't login to Strapi. Status: ${res.status}`);
        }
        return res.data;
      })
      .then((data) => {
        console.log(data.user);

        // Successfully logged with Strapi
        // Now saving the jwt to use it for future authenticated requests to Strapi
        localStorage.setItem(
          "user",
          JSON.stringify({
            username: data.user.username,
            jwt: data.jwt,
          })
        );
        const stringifiedUser = localStorage.getItem("user") || '""';
        setText(
          "You have been successfully logged in. You will be redirected in a few seconds..."
        );
        navigate("/shop");
        window.location.reload();
        return JSON.parse(stringifiedUser);
      })
      .catch((err) => {
        console.error(err);
        setText("An error occurred, please see the developer console.");
      });
  }, [navigate, location.search, params.providerName]);

  return <p>{text}</p>;
};

export default LoginRedirect;
