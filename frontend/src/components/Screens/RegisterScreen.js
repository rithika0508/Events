import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const RegisterScreen = () => {
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmpassword, setConfirmPassword] = useState("")
    const [error, setError] = useState("")
    const history = useNavigate()
    useEffect(() => {
        if(localStorage.getItem("auth")) {
            history("/")
        }
    },[])
    const register = async (e) => {
        e.preventDefault()
        const config = {
            headers: {
                "Content-Type":"application/json"
            }
        }
        if(password!==confirmpassword) {
            setPassword("")
            setConfirmPassword("")
            return setError("Password do not match")
        }
        try {
            setError("")
            const {data} = await axios.post("/api/auth/register", {
                username,
                email,
                password
            }, config)
            localStorage.setItem("auth", data.token)
            history("/")
        } catch (error) {
            
        }
    }
    return (
        <div className='register'>
            <form onSubmit={register} className='register__form'>
                <h3 className='register__title'>Register</h3>
                <div>
                    <label htmlFor='name'>Username</label>
                    <input 
                    type="text" 
                    placeholder="Enter Username" 
                    id="name" 
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required/>
                </div>

                <div>
                    <label htmlFor='email'>Email</label>
                    <input 
                    type="email" 
                    placeholder="Enter Email" 
                    id="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required/>
                </div>

                <div>
                    <label htmlFor='password'>Password:</label>
                    <input 
                    type="password" 
                    placeholder="Enter Password" 
                    id="password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required/>
                </div>

                <div>
                    <label htmlFor='confirmPassword'>Confirm Password:</label>
                    <input 
                    type="password" 
                    placeholder="Confirm Password" 
                    id="confirmpassword" 
                    value={confirmpassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required/>
                </div>
                {error && <div>Passwords do not match</div>}
                <button type="Submit" className='btn'>Register</button>
                <span className='register__subtext'>Already have an Account? <Link to="/login">Login</Link></span>
            </form>
        </div>
    )
}
export default RegisterScreen;