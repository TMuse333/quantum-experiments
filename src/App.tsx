import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import SineWave from './components/sineWave/sineWave'
import ThreeJSWave from './components/threeeJsWave/threeJsWave'
import CircularWave from './components/circularWave/circularWave'
import Cloud from './components/cloud/cloud'
import FloatingAura from './components/floatingAura/floatingAura'
import RotatingCircle from './components/rotatingCircle.tsx/rotatingCircle'
import PulsatingCircle from './components/pulsatingCircle/pulsatingCircle'
import CircularOrbit from './components/circularOrbit/circularOrbit'
import ConcentricCircles from './components/concentricCircles/concentricCircles'
import SpinningSpiral from './components/spinningSpiral/spinningSpiral'
import Calendar from './components/calendar/calendar'
import Calendar2 from './components/calendar2/calendar2'
import Carousel from './components/dateCarousel/dateCarosuel'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <div className='bg-gray-400 absolute top-0 left-0
    flex items-center flex-col justify-center w-screen'>
    {/* <Carousel/> */}
    <Calendar/>
     {/* <SineWave/> */}
     {/* <ThreeJSWave/> */}
     {/* <CircularWave/> */}
     {/* <Cloud/> */}
     {/* <FloatingAura/>
     <RotatingCircle/>
     <PulsatingCircle/>
     <CircularOrbit/>
     <ConcentricCircles/>
     <SpinningSpiral/> */}
     </div>
    </>
  )
}

export default App
