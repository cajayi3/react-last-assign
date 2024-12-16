import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

interface Props {
    children: React.ReactNode;
}

const AuthChecker = ({ children }: Props) => {
    const navigate = useNavigate();
    const { isAuthenticated, isLoading, loginWithRedirect } = useAuth0();

    useEffect(() => {
        if (!isLoading) {
            if (!isLoading) {
                loginWithRedirect();
            } else {
                navigate('/Dashboard/Dashboard')
            }
        }
    }, [isLoading, isAuthenticated, loginWithRedirect, navigate]);

    return <>{children}</>;
};

export default AuthChecker;