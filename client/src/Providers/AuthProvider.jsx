import { createContext, useEffect, useState } from "react";
import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { app } from "../firebase/firebase.config";
import useAxiosPublic from './../Hooks/useAxiosPublic';

export const AuthContext=createContext(null)

const auth = getAuth(app);

const AuthProvider = ({children}) => {
    const [user,setUser]=useState(null)
    const [loading,setLoading]=useState(true)
    const googleProvider = new GoogleAuthProvider();
    const axiosPublic=useAxiosPublic()
const createUser=(email,password)=>{
    setLoading(true)
   return createUserWithEmailAndPassword(auth, email, password)
}
const logIn=(email,password)=>{
    setLoading(true)
   return signInWithEmailAndPassword(auth, email, password)
}
const googleLogIn=()=>{
    setLoading(true)
    return  signInWithPopup(auth, googleProvider)
}
const logOut=()=>{
    setLoading(true)
   return signOut(auth)
}
const updateUserProfile=(name,photo)=>{
   return updateProfile(auth.currentUser, {
        displayName: name, 
        photoURL: photo
      })
}
  useEffect(()=>{
   const unsubscribe= onAuthStateChanged(auth, currentUser => {
         
            setUser(currentUser)
            // console.log('currentUser',currentUser);
            if(currentUser){
//get token and store client
const userInfo={
    email:currentUser.email
}
axiosPublic.post('jwt',userInfo)
.then(res=>{
    if(res.data.token){
        localStorage.setItem("access-token",res.data.token)
    }
})
            }
            else{
//remove token(if token stored inthe client side :local storage,caching,in memory)
localStorage.removeItem("access-token")
            }
            
            setLoading(false)
       
      });
      return ()=>{
        return unsubscribe()
      }
  },[axiosPublic])
    const authInfo={
        user,
        loading,
        createUser,
        logIn,
        googleLogIn,
        logOut,
        updateUserProfile
    }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;