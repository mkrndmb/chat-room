export default function Input({message,setMessage,sendMessage}) {
    //const [message, setMessage] = useState('')


    return(
        <>
        <input type='text'
                value={message} 
                onChange={(e)=>setMessage(e.target.value)} 
                onKeyPress={e=> e.key==='Enter' ? sendMessage(e) : null}/>
        </>
    )
};
