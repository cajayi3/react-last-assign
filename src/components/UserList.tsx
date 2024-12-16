import React, {useEffect, useState} from 'react';
import { User } from '../models/User';
import { useGetData } from '../custom-hooks/FetchData'

const UserList: React.FC = () => {
    const { MarvelData, loading } = useGetData();
    const [users, setUsers] = useState<User[]>([]);
    const [selectedUser, setSelectedUser] = useState<User | null>(null)

    useEffect(() => {
        if (MarvelData) {
            setUsers(MarvelData);
        }
    }, [MarvelData]);

const handleUserSelect = (user: User) => {
    setSelectedUser(user);
};

if (loading) {
    return <div>Loading...</div>;
}

return (
    <div>
        <h1>User List</h1>
        <ul>
            {users.map((user) => (
                <li key={user.id} onClick={() => handleUserSelect(user)}>
                    {user.name} ({user.email})
                </li>
            ))}
        </ul>
        {selectedUser && (
            <div>
                <h2>Selected User</h2>
                <p>Name: {selectedUser.name}</p>
                <p>Email: {selectedUser.email}</p>
            </div>
        )}
    </div>
    );
};

export default UserList;