import PropTypes from "prop-types";

type Props = {
  children: any;
};

const PrivateRoute = ({ children }: Props): JSX.Element => {
  return children;
};

PrivateRoute.propTypes = {
  children: PropTypes.any,
};

export default PrivateRoute;
