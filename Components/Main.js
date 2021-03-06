import { doc, setDoc, getDoc, collection } from "firebase/firestore";
import { useState, useEffect } from "react";
import { getAuth, signOut } from "firebase/auth"
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../utils/slices/userSlice";
import db from "../utils/firebase";
function Main() {
    const user = useSelector((state) => state.auth.user);
    const dispatch = useDispatch();
    const [localName, setLocalName] = useState("");
    const [localSurname, setLocalSurname] = useState("");
    const [localDate, setLocalDate] = useState("");
    const [localEmail, setLocalEmail] = useState("");
    function disconnect() {
        const auth = getAuth();
        signOut(auth).then(() => {
            dispatch(logout());
        }).catch((error) => {
            alert(error);
        });
    }
    useEffect(() => {
        if (user) {
            console.log("new user logged in: " + user.uid);
            fetchData();   
        }
    } ,[])

    async function fetchData() {
        try {
            //get data from firestore on load
            const docRef = doc(db, "users" , user.uid);
            const docSnap = await getDoc(docRef);
            if(docSnap.exists()) {
                console.log(docSnap.data());
                setLocalName(docSnap.data().name);
                setLocalSurname(docSnap.data().surname);
                setLocalDate(docSnap.data().date);
                setLocalEmail(docSnap.data().email);
            } else {
                console.log("No such document!");
            }
        } catch (e) {
            alert("loading error: " + e);
        }
    }


    async function updateData() {
        const usersRef = collection(db, "users");
        try {
            await setDoc(doc(usersRef, user.uid), {
                name: localName,
                email: localEmail,
                date: localDate,
                surname: localSurname,
            });
            alert("User updated");
        } catch (err) {
            alert(err);
        }
        
    }

    return (
        <div className="flex justify-center align-content items-align">
            <div className="flex align-content items-center justify-center flex-col"> 
                <img className="w-48 h-48"  src="/avataaars.png" alt="avatar" />
                <div className="flex mt-3 align-center items-center">
                    <h2>NAME: </h2>
                    <input value={localName} onChange={(e) => setLocalName(e.target.value)} className="p-2 ml-4 rounded-xl bg-red-50"  />
                </div>
                <div className="flex mt-3 align-center items-center">
                    <h2>SURNAME: </h2>
                    <input value={localSurname} onChange={(e) => setLocalSurname(e.target.value)} className="p-2 ml-4 rounded-xl bg-red-50" />
                </div>
                <div className="flex mt-3 align-center items-center">
                    <h2>DATE: </h2>
                    <input onChange={(e) => setLocalDate(e.target.value)} className="p-2 ml-4 rounded-xl bg-red-50" type="date" value={localDate} />
                </div>
                <div className="flex mt-3 align-center items-center">
                    <h2>EMAIL: </h2>
                    <input value={localEmail} onChange={(e) => setLocalEmail(e.target.value)} className="p-2 ml-4 rounded-xl bg-red-50"  />
                </div>
                <div className="flex-col md:flex-row flex mt-3 align-center items-center ">
                    <button className="bg-green-200 hover:bg-green-400 rounded-xl p-2" onClick={() => {updateData()}}>Update</button>
                    <button className="bg-red-200 hover:bg-red-400 rounded-xl p-2" onClick={() => {disconnect()}}>Logout</button>
                </div>
            </div>
        </div>
    )
}

export default Main
