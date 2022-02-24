import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import './home.css'

export default function Home({name,setName}) {
    
    // const [name, setName] = useState('')

    useEffect(() => {
        
        return () => {
            
        }
    }, [name])

    return(
        <>
        <div className='home' >
            <h2 style={{color:'white'}}>Live Chat</h2>
            <form onSubmit={(e)=>e.preventDefault()}>
                <input type='text' placeholder={'Name'} value={name} onChange={(e)=>setName(e.target.value)}/>
            </form>
        <Link onClick={!name ? (e)=>e.preventDefault() : null} to={`/chat`}>
            <button type='button'>Join</button>
        </Link>
        </div>
        </>
    )
};
