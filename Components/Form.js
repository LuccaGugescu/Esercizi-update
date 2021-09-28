import { useState, useEffect } from 'react';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import Link from 'next/link';

function Form({setUser}) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    
    function login(email, password, e) {
        e.preventDefault();
        const auth = getAuth();
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            setUser(userCredential.user);
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            alert(errorMessage);
        });
    }

    return (
        <div>
            <form className="bg-gray-50 w-96 h-64 flex flex-col rounded-md p-3 mt-32">
                <input type="email" className="mt-2 p-3 rounded-md" placeholder="E-mail" onChange={(e) => setEmail(e.target.value)} />
                <input type="password" className="mt-2 p-3 rounded-md" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                <hr />
                <button onClick={(e) => login(email, password, e)} className="bg-green-300 mt-3 rounded-md p-2">Accedi</button>
                <Link href="/signUp"><a className="bg-blue-300 mt-3 rounded-md p-2 text-center" >Crea nuovo account</a></Link>
            </form>
        </div>
    )
}

export default Form
