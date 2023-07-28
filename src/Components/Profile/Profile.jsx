import React from 'react';

const Profile = ({currentUser}) => {
    return <>
    <div className='p-5'>
        <h2 className='text-center'>Welcome {currentUser.name}</h2>
    </div>
    </>;
}



export default Profile;