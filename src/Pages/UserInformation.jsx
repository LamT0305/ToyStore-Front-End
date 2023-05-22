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
                </>
            )}
        </div>
    );
};

export default UserInformation;