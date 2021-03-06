import React, {useRef, useState} from 'react';
import {Form, Button, Card, Alert} from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';
import {Link, useHistory} from 'react-router-dom'

function Signup() {

    const emailRef=useRef();
    const passwordRef=useRef();
    const passwordConfirmRef=useRef();
    const { signup} = useAuth();
    const [err,setErr] = useState('');
    const [loading,setLoading] = useState(false);
    const history = useHistory()

    async function handleSubmit(e){
        e.preventDefault();
        
        if(passwordConfirmRef.current.value !== passwordRef.current.value){
            return setErr('Passwords do not match!');
        }

        try{
            setErr('');
            setLoading(true);
            await signup(emailRef.current.value,passwordRef.current.value);
            history.push('/')
        }catch{
            setErr('Failed to create an account.');
        }
        setLoading(false);
    }

    return (
        <>
           <Card>
               <Card.Body>
                   <h2 className="text-center mb-4">
                       Sign Up
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
                       <Form.Group id="password-confirm">
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control type="password" ref={passwordConfirmRef} required />
                       </Form.Group>
                       <Button disabled={loading} type="submit" className="w-100">Sign Up</Button>
                   </Form>
               </Card.Body>
           </Card>
           <div className="w-100 text-center mt-2">
               Already have an account? <Link to="/login">Log In</Link>
           </div> 
        </>
    )
}

export default Signup
