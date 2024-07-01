import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../../App";

const PrivateRoute = ({ Component }) => {

    const [loggedInUser, setLoggedInUser] = useContext(UserContext);

    // Your authentication logic goes here...

    return loggedInUser.email ? <Component /> : <Navigate to="/login" />;
};
export default PrivateRoute;