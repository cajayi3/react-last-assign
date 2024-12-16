import { User as Auth0User } from '@auth0/auth0-react';
import { User as CustomUser } from '../models/User'

export const convertAuth0UserToCustomerUser = (auth0User?: Auth0User): CustomUser | null => {
    if (!auth0User) {
        throw new Error("Auth0 user is missing");
    }

    return {
        id: auth0User.sub || '',
        name: auth0User.name || '',
        email: auth0User.email || '',
    };
};