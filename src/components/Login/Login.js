import React, { useContext, useState } from 'react';
import { initializeApp } from 'firebase/app'
import { createUserWithEmailAndPassword, FacebookAuthProvider, getAuth, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import { UserContext } from '../../App';
import { useLocation } from 'react-router-dom';


const Login = () => {
    const location = useLocation()
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
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);

    const provider = new GoogleAuthProvider();

    const firebaseConfig = {
        apiKey: "AIzaSyCCuIunyXGA3Qxv8dJusKOPtr3BEkpxMYQ",
        authDomain: "ema-john-simple-905c1.firebaseapp.com",
        databaseURL: "https://ema-john-simple-905c1-default-rtdb.firebaseio.com",
        projectId: "ema-john-simple-905c1",
        storageBucket: "ema-john-simple-905c1.appspot.com",
        messagingSenderId: "620555579422",
        appId: "1:620555579422:web:4f78697948a35cb4ab7e0f"
    }
    const app = initializeApp(firebaseConfig)
    const auth = getAuth(app);


    const handleSignIn = () => {
        signInWithPopup(auth, provider)
            .then((result) => {
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                console.log(token)
                if (result.accountUser) {
                    const { displayName, photoURL, email } = result.accountUser;
                    const signedInUser = {
                        isSignedIn: true,
                        name: displayName,
                        email: email,
                        photo: photoURL,
                    }
                    setAccountUser(signedInUser)
                }

            })
            .catch((error) => {

                const errorMessage = error.message;
                console.log(errorMessage)
            })
    }

    const handleFbSignIn = () => {
        const provider = new FacebookAuthProvider();
        const auth = getAuth();
        signInWithPopup(auth, provider)
            .then((result) => {
                // The signed-in user info.
                const user = result.user;

                // This gives you a Facebook Access Token. You can use it to access the Facebook API.
                const credential = FacebookAuthProvider.credentialFromResult(result);
                const accessToken = credential.accessToken;

                // IdP data available using getAdditionalUserInfo(result)
                // ...
            })
            .catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                // The email of the user's account used.
                const email = error.customData.email;
                // The AuthCredential type that was used.
                const credential = FacebookAuthProvider.credentialFromError(error);

                // ...
            });
    }

    const handleSignOut = () => {
        const auth = getAuth()
        signOut(auth)
            .then(() => {

                const accountUser = {
                    inSignedIn: false,
                    name: '',
                    email: '',
                    photo: ''
                }
                setAccountUser(accountUser)
            })
            .catch((error) => {
                console.log(error)
            })
    }
    const handleBlur = (event) => {
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
    const handleSubmit = (e) => {
        e.preventDefault();
        // console.log("Submit button clicked");

        if (newUser && accountUser.email && accountUser.password) {
            const auth = getAuth();
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
            const auth = getAuth();
            signInWithEmailAndPassword(auth, accountUser.email, accountUser.password)
                .then((userCredential) => {
                    // Signed in 
                    const user = userCredential.user;
                    const newUserInfo = { ...accountUser, name: user.displayName, success: true, error: '' }
                    setAccountUser(newUserInfo)
                    setLoggedInUser(newUserInfo)

                    // ...
                })
                .catch((error) => {
                    const newUserInfo = { ...accountUser, success: false, error: error.message }
                    setAccountUser(newUserInfo)
                });
        }
    };
    const updateNameOfUser = name => {
        const auth = getAuth();
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
    console.log(location)

    return (
        <div style={{ textAlign: 'center' }} >
            {
                accountUser.isSignedIn ?
                    <button onClick={handleSignOut}>Sign out</button> :
                    <button onClick={handleSignIn}>Sign in with Google</button>
            }
            <br />
            <button onClick={handleFbSignIn}>Login using facebook</button>
            <br />

            {
                accountUser.isSignedIn && <div> <p> {accountUser.name}, You are successfully Logged in. </p> <p>Your email: {accountUser.email} </p> <img src={accountUser.photo && accountUser.photo} alt="" /></div>
            }

            <h1>Our Authentication System</h1>

            <input type="checkbox" onChange={() => setNewUser(!newUser)} name="newUser" id="newUser22" />
            <label htmlFor="newUser22">New User Sign Up</label>

            {/* Form Started */}

            <form onSubmit={handleSubmit}>
                {newUser && <input type="text" required name="name" onBlur={handleBlur} id="" placeholder='your name' />}
                <br />
                <input type="text" name='email' onBlur={handleBlur} required placeholder='Enter your email' />
                <br />
                <input type="password" name='password' onBlur={handleBlur} required placeholder='Enter your passoword' />
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