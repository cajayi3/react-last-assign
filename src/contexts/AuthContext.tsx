import React, { createContext, useContext, ReactNode, useMemo } from "react";
import { useAuth0, User as Auth0User } from "@auth0/auth0-react";
import { User as CustomUser } from "../models/User";
import { convertAuth0UserToCustomerUser } from "../utils/convert.User";

interface AuthContextType {
    currentUser: CustomUser | null;
    loading: boolean;
}

interface AuthProviderProps {
    children : ReactNode;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if(!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const { user, isAuthenticated, isLoading} = useAuth0();

    const currentUser = useMemo<CustomUser | null>(() => {
        if (isAuthenticated && user) {
            return convertAuth0UserToCustomerUser(user as Auth0User);
        } 
        return null;
    }, [isAuthenticated, user]);

    const value = useMemo(
        () => ({ 
            currentUser, 
            loading: isLoading 
        }),
        [currentUser, isLoading]
    );

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};
