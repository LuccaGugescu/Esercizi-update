import SignUp from "../Components/SignUp"
import { useState } from 'react'
import Main from "../Components/Main";

function signUp() {
    const [date, setDate] = useState("");
    const [user, setUser] = useState(null);
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    return (
        <>
        {!user ?
            <SignUp user={user} date={date} name={name} email={email} password={password} surname={surname}  setDate={setDate} setUser={setUser} setName={setName} setSurname={setSurname} setEmail={setEmail} setPassword={setPassword} />
            : <Main date={date} name={name} email={email} password={password} surname={surname} user={user} />
        }
        </>
        )
}

export default signUp
