import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const storeUser = (data: any) => {
  localStorage.setItem(
    "user",
    JSON.stringify({
      username: data.user.username,
      email: data.user.email,
      jwt: data.jwt,
    })
  );
};

export const userData = () => {
  const stringifiedUser = localStorage.getItem("user") || '""';
  return JSON.parse(stringifiedUser);
};

const Protector = ({ Component }: any) => {
  const navigate = useNavigate();
  const { jwt } = userData(); // Assuming userData is a function that returns the user's data

  useEffect(() => {
    if (!jwt) {
      navigate("/login");
    }
  }, [navigate, jwt]);

  return Component;
};
export default Protector;
