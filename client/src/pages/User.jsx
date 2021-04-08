import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'


const User = () => {

    const [username,setUsername] = useState("");


    useEffect(()=>{
        ( 
            async ()=> {
            const response = await fetch('http://localhost:8000/api/user/', 
            {
                headers: {'Content-Type':'application/json'},
                credentials:'include'
            })

            const content = await response.json();

            setUsername(content.username);

            }
        )()
    }, []); 

    //? Fonction Log Out qui va déconnecter l'utilisateur actuel
    const logOut = async (e)=>{

        await fetch('http://localhost:8000/api/user/logout', 
            {
                method: 'POST',
                headers: {'Content-Type' : 'application/json'},
                credentials:'include'
            }
        )
        // setRedirect(true)
        setUsername('');
    }

    // if(redirect){
    //     return <Redirect to='/user'/>;
    // }


    let link;

    if(!username){
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
                {username ? `Welcome ${username}` : `Log-in to see your page`}
            </h2>

            {link}
            {/* <div>
                <button
                    className="w-100 btn btn-lg btn-primary"
                    type="submit"
                    onClick={logOut}
                >
                    Log Out
                </button>
            </div>  */}
        </div>
    )
}

export default User