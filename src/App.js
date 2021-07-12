import './assets/style.scss';
import { Canvas } from '@react-three/fiber'
import { Earth } from './components/Earth';
import { Suspense } from 'react';
import { Loader } from './components/Loader';

function App() {
  return (

    <Canvas>
      <Suspense fallback={<Loader/>}>
        <ambientLight intensity={.05}/>
        {/*<directionalLight color="white" position={[0, 0, 5]} />*/}
        <pointLight color="#f6f3ea" position={[2,0,2]} intensity={1.2}/>
        <Earth/>
      </Suspense>
    </Canvas>

  );
}

export default App;

