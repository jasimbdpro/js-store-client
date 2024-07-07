import { initializeApp } from 'firebase/app'
import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import firebaseConfig from './firebaseConfig';
export const app = initializeApp(firebaseConfig)
export const auth = getAuth(app);

export const GoogleSignInHandler = () => {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider)
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
                return signedInUser;
            }

        })
        .catch((error) => {
            // Handle Errors here.
            const errorMessage = error.message;
            console.log(errorMessage)
        })
}

export const GoogleSignOutHandler = () => {
    return signOut(auth)
        .then(() => {

            const signedOutUser = {
                inSignedIn: false,
                name: '',
                email: '',
                photo: ''
            }
            return signedOutUser

        })
        .catch((error) => {
            // An error happened.

        })
}
export const newCreateUserWithEmailAndPassword = (demoUser, setDemoUser) => {
    return createUserWithEmailAndPassword(auth, demoUser.email, demoUser.password)
        .then((userCredential) => {
            console.log("User created:", userCredential.user);

            const newUserInfo = { ...demoUser, success: true, error: '' };
            setDemoUser(newUserInfo);

            // Signed up
            const user = userCredential.user;
            console.log(user.email, user.displayName);
            updateNameOfUser(demoUser.name)
        })
        .catch((error) => {
            console.log("Error creating users:", error.message);

            const newUserInfo = { ...demoUser, error: error.message, success: false };
            setDemoUser(newUserInfo);
        });
}
export const updateNameOfUser = name => {
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
export const signInWithEmailAndPasswordRefactored = (demoUser, setDemoUser) => {
    return signInWithEmailAndPassword(auth, demoUser.email, demoUser.password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            const newUserInfo = { ...demoUser, name: user.displayName, success: true, error: '' }
            return newUserInfo;



            // ...
        })
        .catch((error) => {
            const newUserInfo = { ...demoUser, success: false, error: error.message }
            setDemoUser(newUserInfo)
        });
}