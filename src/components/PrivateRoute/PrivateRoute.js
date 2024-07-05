import { useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { UserContext } from "../../App";

const PrivateRoute = ({ Component, ...rest }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);

    if (!loggedInUser) {
        navigate('/login', { state: { from: location } })
        // return <Navigate to="login" state={{ from: location }} replace></Navigate>
    }
    return loggedInUser ? <Component /> : null;
}


export default PrivateRoute;