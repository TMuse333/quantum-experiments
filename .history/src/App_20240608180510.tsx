import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import SineWave from './components/wave/wave'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <div className='bg-blue-800 absolute top-0 left-0
    flex items-center justify-center'>

    
     <SineWave/>
     </div>
    </>
  )
}

export default App
