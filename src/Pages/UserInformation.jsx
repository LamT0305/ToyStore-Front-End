import React, { useEffect } from 'react';
import useAuth from '../hooks/useAuth';
import Loading from '../components/Loading';
const UserInformation = () => {
    const { handleGetCurrentUser, user, isLoading } = useAuth();
    useEffect(() => {
        handleGetCurrentUser();
    }, [])
    return (
        <div>
            {isLoading ? <Loading /> : (
                <>
                    <div className="container mx-auto p-4">
                        <h1 className="text-2xl font-bold mb-4">User Information</h1>
                        <div className="bg-gray-100 p-4 rounded-lg">
                            <div className="flex flex-col mb-2">
                                <span className="font-bold">Email:</span>
                                <span>{user.email}</span>
                            </div>
                            <div className="flex flex-col mb-2">
                                <span className="font-bold">ID:</span>
                                <span>{user.id}</span>
                            </div>
                            <div className="flex flex-col mb-2">
                                <span className="font-bold">Role:</span>
                                <span>{user.role}</span>
                            </div>
                            <div className="flex flex-col mb-2">
                                <span className="font-bold">User:</span>
                                <span>{user.user}</span>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default UserInformation;