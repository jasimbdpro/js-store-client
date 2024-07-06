import React, { useContext, useState } from 'react';
import { initializeApp } from 'firebase/app'
import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import { UserContext } from '../../App';
import firebaseConfig from '../../utilities/firebaseConfig';
import { useLocation, useNavigate } from 'react-router-dom';


const Login = () => {
    const app = initializeApp(firebaseConfig)
    const location = useLocation();
    const navigate = useNavigate();
    const auth = getAuth(app);
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

    const GoogleSignInHandler = () => {
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider)
            .then((result) => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                const credential = GoogleAuthProvider.credentialFromResult(result);
                console.log(result)
                const token = credential.accessToken;
                // The signed-in user info.
                // console.log(token)
                if (result.user) {
                    // IdP data available using getAdditionalUserInfo(result)
                    //This below part ↓↓↓ is not included in firebase docs 
                    //destructing the result.user object (from the remote server)
                    const { displayName, photoURL, email } = result.user;
                    const signedInUser = {
                        isSignedIn: true,
                        name: displayName,
                        email: email,
                        photo: photoURL,
                    }
                    setAccountUser(signedInUser)
                    setLoggedInUserShared(signedInUser)
                    navigate(location.state?.from || "/", { replace: true });
                    // console.log(accountUser)
                }

            })
            .catch((error) => {
                // Handle Errors here.
                const errorMessage = error.message;
                console.log(errorMessage)
            })
    }


    const GoogleSignOutHandler = () => {
        signOut(auth)
            .then(() => {

                const signedOutUser = {
                    inSignedIn: false,
                    name: '',
                    email: '',
                    photo: ''
                }
                setAccountUser(signedOutUser)
                setLoggedInUserShared(signedOutUser)
            })
            .catch((error) => {
                // An error happened.

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
            createUserWithEmailAndPassword(auth, accountUser.email, accountUser.password)
                .then((userCredential) => {
                    console.log("User created:", userCredential.user);

                    const newUserInfo = { ...accountUser, success: true, error: '' };
                    setAccountUser(newUserInfo);

                    // Signed up
                    const user = userCredential.user;
                    console.log(user.email, user.displayName);
                    updateNameOfUser(accountUser.name)
                })
                .catch((error) => {
                    console.log("Error creating users:", error.message);

                    const newUserInfo = { ...accountUser, error: error.message, success: false };
                    setAccountUser(newUserInfo);
                });
        }
        if (!newUser && accountUser.email && accountUser.password) {
            signInWithEmailAndPassword(auth, accountUser.email, accountUser.password)
                .then((userCredential) => {
                    // Signed in 
                    const user = userCredential.user;
                    const newUserInfo = { ...accountUser, name: user.displayName, success: true, error: '' }
                    setAccountUser(newUserInfo)
                    setLoggedInUserShared(newUserInfo)
                    navigate(location.state?.from || "/", { replace: true });


                    // ...
                })
                .catch((error) => {
                    const newUserInfo = { ...accountUser, success: false, error: error.message }
                    setAccountUser(newUserInfo)
                });
        }
    };
    const updateNameOfUser = name => {
        updateProfile(auth.currentUser, {
            displayName: name
        }).then(() => {
            // Profile updated!
            // ...
        }).catch((error) => {
            // An error occurred
            // ...
        });

    }

    console.log(location.state?.from)
    return (
        <div style={{ textAlign: 'center' }} >


            {/* Google Login Info Part */}
            {
                accountUser.isSignedIn ?
                    <button onClick={GoogleSignOutHandler}>Sign out</button> :
                    <button onClick={GoogleSignInHandler}>Sign in with Google</button>
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