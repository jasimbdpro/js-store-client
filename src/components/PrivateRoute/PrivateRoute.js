import { useContext, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { UserContext } from "../../App";

const PrivateRoute = ({ Component, ...rest }) => {
    const location = useLocation();
    const navigate = useNavigate();
    // eslint-disable-next-line no-unused-vars
    const [loggedInUserShared, setLoggedInUserShared] = useContext(UserContext);
    console.log(loggedInUserShared)

    useEffect(() => {
        if (!loggedInUserShared.email) {
            navigate('/login', { state: { from: location } });
        }
    }, [loggedInUserShared, location, navigate]);


    return loggedInUserShared.email ? <Component /> : null
};


export default PrivateRoute;