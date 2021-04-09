import React, { useContext } from 'react'
import { UserContext } from '../UserContext'

const Home = () => {

    const {user} = useContext(UserContext);
    
    return (
        <div>
            <h1>Home</h1>
            {user ? (<h2>Welcome back {user.username}</h2>) : (<h2>Welcome to our website, please login to see your page</h2>)}
        </div>
    )
}

export default Home
