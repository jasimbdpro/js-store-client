import { useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { UserContext } from "../../App";

const PrivateRoute = ({ Component, ...rest }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const [loggedInUserShared, setLoggedInUserShared] = useContext(UserContext);
    console.log(loggedInUserShared)

    if (!loggedInUserShared) {
        navigate('/login', { state: { from: location } })
    }
    return loggedInUserShared ? <Component /> : null;
}


export default PrivateRoute;