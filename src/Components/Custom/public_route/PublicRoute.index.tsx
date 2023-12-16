import PropTypes from "prop-types";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Typescript Props
type Props = {
  children: any;
};

const PublicRoute = ({ children }: Props): JSX.Element => {
  const navigate = useNavigate();

  useEffect(() => {
    // const accessToken = localStorage.getItem("access_token");

    // if (accessToken) navigate("/home");
  }, []);

  return children;
};

// PropTypes
PublicRoute.propTypes = {
  children: PropTypes.any,
};

export default PublicRoute;
