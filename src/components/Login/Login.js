import React, { useContext, useState } from 'react';

import { UserContext } from '../../App';
import { useLocation, useNavigate } from 'react-router-dom';
import { GoogleSignInHandler, GoogleSignOutHandler, signInWithEmailAndPasswordRefactored } from './loginManager';
import { createUserWithEmailAndPassword } from 'firebase/auth';



const Login = () => {

    const location = useLocation();
    const navigate = useNavigate();

    const [loggedInUserShared, setLoggedInUserShared] = useContext(UserContext);
    const [newUser, setNewUser] = useState(false);
    const [accountUser, setAccountUser] = useState({
        isSignedIn: false,
        newUserInfo: false,
        name: '',
        email: '',
        password: '',
        photo: '',
        success: false,
        error: '',
    });
    const GoogleSignInHandlerImprted = () => {
        GoogleSignInHandler()
            .then(response => {
                setAccountUser(response)
                setLoggedInUserShared(response)
                navigate(location.state?.from || "/", { replace: true });
            })
    }
    const GoogleSignOutHandlerImported = () => {
        GoogleSignOutHandler()
            .then(response => {
                setAccountUser(response)
                setLoggedInUserShared(response)
            })
    }
    const newCreateUserWithEmailAndPasswordImported = () => {
        createUserWithEmailAndPassword(accountUser, setAccountUser)
    }
    const signInWithEmailAndPasswordRefactoredImported = (accountUser, setAccountUser) => {
        signInWithEmailAndPasswordRefactored()
            .then(response => {
                setAccountUser(response)
                setLoggedInUserShared(response)
                navigate(location.state?.from || "/", { replace: true });
            })
    }

    const InputTextBlurHandler = (event) => {
        let isFieldValid = true;
        if (event.target.name === 'email') {
            isFieldValid = /^\S+@\S+\.\S+$/.test(event.target.value)
        }
        if (event.target.name === 'password') {
            const isPasswordValid = event.target.value.length > 5
            const passwordHasNumber = /\d{1}/.test(event.target.value)
            isFieldValid = isPasswordValid && passwordHasNumber
        }
        if (isFieldValid) {
            const newUserInfo = { ...accountUser }
            newUserInfo[event.target.name] = event.target.value
            setAccountUser(newUserInfo)

        }
    }


    //Declaring Submit button for Password Authentication
    const PasswordSubmitHandler = (e) => {
        e.preventDefault();
        // console.log("Submit button clicked");

        if (newUser && accountUser.email && accountUser.password) {
            newCreateUserWithEmailAndPasswordImported()
        }
        if (!newUser && accountUser.email && accountUser.password) {
            signInWithEmailAndPasswordRefactoredImported()
        }
    };

    console.log(location.state?.from)
    return (
        <div style={{ textAlign: 'center' }} >


            {/* Google Login Info Part */}
            {
                accountUser.isSignedIn ?
                    <button onClick={GoogleSignOutHandlerImported}>Sign out</button> :
                    <button onClick={GoogleSignInHandlerImprted}>Sign in with Google</button>
            }

            {
                accountUser.isSignedIn &&
                <div>
                    <p> {accountUser.name}, You are successfully Logged in. </p>
                    <p>Your email: {accountUser.email} </p>
                    <img src={accountUser.photo && accountUser.photo} alt="" />
                </div>
            }

            <h1>Our Password Authentication System</h1>

            <input type="checkbox" onChange={() => setNewUser(!newUser)} name="newUser" id="newUser22" />
            <label htmlFor="newUser22">New User Sign Up</label>

            {/* Form Started */}

            <form onSubmit={PasswordSubmitHandler}>
                {newUser && <input type="text" required name="name" onBlur={InputTextBlurHandler} id="" placeholder='your name' />}
                <br />
                <input type="text" name='email' onBlur={InputTextBlurHandler} required placeholder='Enter your email' />
                <br />
                <input type="password" name='password' onBlur={InputTextBlurHandler} required placeholder='Enter your passoword' />
                <br />
                <input type="submit" value={newUser ? 'Sign up' : 'Sign in'} />

            </form>
            <p style={{ color: 'red' }} >{accountUser.error}</p>
            {
                accountUser.success && <p style={{ color: 'green' }} > {accountUser.name}, Account {newUser ? 'created' : 'logged in'} successfully</p>
            }

        </div>
    );
};


export default Login;