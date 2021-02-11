import React, {useRef, useState} from 'react';
import {Form, Button, Card, Alert} from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';
import {Link, useHistory } from 'react-router-dom'

function Login() {

    const emailRef=useRef();
    const passwordRef=useRef();
    const { login} = useAuth();
    const [err,setErr] = useState('');
    const [loading,setLoading] = useState(false);
    const history = useHistory()

    async function handleSubmit(e){
        e.preventDefault();

        try{
            setErr('');
            setLoading(true);
            await login(emailRef.current.value,passwordRef.current.value);
            history.push('/')
        }catch{
            setErr('Failed to log in.');
        }
        setLoading(false);
    }

    return (
        <>
           <Card>
               <Card.Body>
                   <h2 className="text-center mb-4">
                       Log In
                   </h2>
                   {err && <Alert variant="danger">{err}</Alert>}
                   <Form onSubmit={handleSubmit}>
                       <Form.Group id="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" ref={emailRef} required />
                       </Form.Group>
                       <Form.Group id="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" ref={passwordRef} required />
                       </Form.Group>
                       <Button disabled={loading} type="submit" className="w-100">Log In</Button>
                   </Form>
               </Card.Body>
           </Card>
           <div className="w-100 text-center mt-2">
               Need an account? <Link to="/signup">Sign Up</Link>
           </div> 
        </>
    )
}

export default Login
