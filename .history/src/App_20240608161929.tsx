import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import SineWave from './components/wave/wave'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <div className='bg-red-200'>

    
     <SineWave/>
     </div>
    </>
  )
}

export default App
