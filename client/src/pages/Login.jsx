import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'

const Login = ()=> {
    
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");

    const [redirect,setRedirect] = useState(false);

    const submit = async (e)=>{
        e.preventDefault();

        await fetch('http://localhost:8000/api/user/login', 
            {
                method: 'POST',
                headers: {'Content-Type' : 'application/json'},
                credentials: 'include',
                body: JSON.stringify({
                    email,
                    password
                })
            }
        )
        setRedirect(true);
    }

    if(redirect){
        return <Redirect to='/user'/>;
    }

    return (
        <form onSubmit={submit}>
                <h1 className="h3 mb-3 fw-normal">Please sign in</h1>

                    <input type="text" className="form-control form-floating" id="email-input" placeholder="email@example.com"
                        required
                        value={email}
                        onChange={e=> setEmail(e.target.value)}
                    />

                    <input type="password" className="form-control form-floating" id="password-input" placeholder="Password"
                        required
                        value={password}
                        onChange={e=> setPassword(e.target.value)}
                    />

                <button className="w-100 btn btn-lg btn-primary" type="submit">Sign in</button>
            </form>
    )
}

export default Login;