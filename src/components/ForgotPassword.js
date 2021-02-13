import React, {useRef, useState} from 'react';
import {Form, Button, Card, Alert} from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';
import {Link } from 'react-router-dom'

function ForgotPassword() {

    const emailRef=useRef();
    const { resetPassword} = useAuth();
    const [err,setErr] = useState('');
    const [message,setMessage] = useState('');
    const [loading,setLoading] = useState(false);

    async function handleSubmit(e){
        e.preventDefault();

        try{
            setMessage('')
            setErr('');
            setLoading(true);
            await resetPassword(emailRef.current.value);
            setMessage('Check your inbox');
        }catch{
            setErr('Failed to reset password.');
        }
        setLoading(false);
    }

    return (
        <>
           <Card>
               <Card.Body>
                   <h2 className="text-center mb-4">
                       Reset password
                   </h2>
                   {err && <Alert variant="danger">{err}</Alert>}
                   {message && <Alert variant="success">{message}</Alert>}
                   <Form onSubmit={handleSubmit}>
                       <Form.Group id="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" ref={emailRef} required />
                       </Form.Group>
                       <Button disabled={loading} type="submit" className="w-100">Forgot Password</Button>
                   </Form>
                    <div className="w-100 text-center mt-3">
                        <Link to="/login">Log In</Link>
                    </div>
               </Card.Body>
           </Card>
           <div className="w-100 text-center mt-2">
               Need an account? <Link to="/signup">Sign Up</Link>
           </div> 
        </>
    )
}

export default ForgotPassword
