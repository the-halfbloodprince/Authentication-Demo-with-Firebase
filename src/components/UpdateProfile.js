import React, {useRef, useState} from 'react';
import {Form, Button, Card, Alert} from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';
import {Link, useHistory } from 'react-router-dom'

function UpdateProfile() {

    const emailRef=useRef();
    const passwordRef=useRef();
    const { currentUser, updateEmail, updatePassword} = useAuth();
    const [err,setErr] = useState('');
    const passwordConfirmRef=useRef();
    const [loading,setLoading] = useState(false);
    const history = useHistory()

    function handleSubmit(e){
            e.preventDefault();

            if(passwordConfirmRef.current.value !== passwordRef.current.value){
            return setErr('Passwords do not match!');
            }

            const promises = []

            setErr('');
            setLoading(true);

            if(emailRef.current.value!=currentUser.email){
                promises.push(updateEmail(emailRef.current.value))
            }

            if(passwordRef.current.value){
                promises.push(updatePassword(passwordRef.current.value))
            }
            
            Promise.all(promises).then(()=>{
                history.push('/')
            }).catch(()=>{
                setErr('Failed to update profile.')
            }).finally(()=>{
                setLoading(false)
            })
                }
    
    

    return (
        <>
           <Card>
               <Card.Body>
                   <h2 className="text-center mb-4">
                       Update Profile
                   </h2>
                   {err && <Alert variant="danger">{err}</Alert>}
                   <Form onSubmit={handleSubmit}>
                       <Form.Group id="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control defaultValue={currentUser.email} type="email" ref={emailRef} required />
                       </Form.Group>
                       <Form.Group id="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" ref={passwordRef} placeholder="Leave blank to keep the same" />
                       </Form.Group>
                       <Form.Group id="password-confirm">
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control type="password" ref={passwordConfirmRef} placeholder="Leave blank to keep the same" />
                       </Form.Group>
                       <Button disabled={loading} type="submit" className="w-100">Update</Button>
                   </Form>
                    <div className="w-100 text-center mt-3">
                        <Link to="/">Cancel</Link>
                    </div>
               </Card.Body>
           </Card>
           <div className="w-100 text-center mt-2">
               Need an account? <Link to="/signup">Sign Up</Link>
           </div> 
        </>
    )
}

export default UpdateProfile
