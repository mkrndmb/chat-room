import {Route,Routes} from 'react-router-dom'
import Home from './components/Home'
import Chat from './components/Chat'
import { useState } from 'react'
// let c=0

function App(props) {
  
  const [name, setName] = useState('')
  // console.log('APP',++c)

  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Home name={name} setName={setName}/>}/>
        <Route path='/chat' element={<Chat name={name}/>}/>
      </Routes>
    </div>
  );
}

export default App;
