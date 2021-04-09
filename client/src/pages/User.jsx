import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from '../UserContext'

const User = () => {

    const {user, setUser} = useContext(UserContext) 

    //? Fonction Log Out qui va déconnecter l'utilisateur actuel
    const logOut = async (e)=>{

        await fetch('http://localhost:8000/api/user/logout', 
            {
                method: 'POST',
                headers: {'Content-Type' : 'application/json'},
                credentials:'include'
            }
        )
        setUser(null);
    }


    let link;

    if(!user){
        link = (
            <Link to="/login" className="btn btn-success">LogIn</Link>
        )
    }else{
        link = (
            <button onClick={logOut} className="btn btn-danger">
                <Link to="/user">LogOut</Link>
            </button>

        )
    }

    return (
        <div>
            <h2>
                {user ? `Welcome ${user.username}` : `Log-in to see your page`}
            </h2>

            {link}
        </div>
    )
}

export default User