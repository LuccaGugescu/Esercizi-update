import { useState } from 'react'
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import db from "../utils/firebase";
import { doc, setDoc } from "firebase/firestore"; 

function SignUp({setEmail, setPassword, setUser, setName, setSurname, setDate, date, name, email, password, surname}) {
    const [verifyPass, setVerifyPass] = useState("");

    async function addData(uid) {
        await setDoc(doc(db, "users", uid), {
            name: name,
            email: email,
            date: date,
            surname: surname
        });
    }

    async function signUp(email, password, e) {
        e.preventDefault();
        const auth = getAuth();
        
        if(password === verifyPass) {
            createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                console.log("user created " + userCredential.user.uid);
                setUser(userCredential.user);
                addData(userCredential.user.uid);
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                alert(errorMessage);
            });
        } else {
            alert("the password are not the same");
        }
    }
    return (
        <div className="bg-gray-100 w-full flex-col h-screen flex align-content justify-center items-center">
            <h1 className="text-4xl bold text-green-300">Sign Up</h1>
            <form className="bg-gray-50 w-96  flex flex-col rounded-md p-3 mt-4">
                <input type="text" className="mt-2 p-3 rounded-md" placeholder="Nome" onChange={(e) => setName(e.target.value)} />
                <input type="text" className="mt-2 p-3 rounded-md" placeholder="Cognome" onChange={(e) => setSurname(e.target.value)} />
                <input onChange={(e) => setDate(e.target.value)} type="date" className="mt-2 p-3 rounded-md" 
    min="1940-01-01" max="2021-9-27" value={date}/>
                <input type="email" className="mt-2 p-3 rounded-md" placeholder="E-mail" onChange={(e) => setEmail(e.target.value)} />
                <input type="password" className="mt-2 p-3 rounded-md" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                <input type="password" className="mt-2 p-3 rounded-md" placeholder="Enter the same password" onChange={(e) => setVerifyPass(e.target.value)} />
                <hr />
                <button className="bg-blue-300 mt-3 rounded-md p-2" onClick={(e) => signUp(email, password, e)}>Crea nuovo account</button>
            </form>
        </div>
    )
}

export default SignUp
