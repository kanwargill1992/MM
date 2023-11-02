import { Suspense, useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Preload, useGLTF } from '@react-three/drei';

import CanvasLoader from '../Loader';

const Computers = ({ isMobile }) => {
  const { scene } = useGLTF('./planet/scene.gltf');

  return (
    <>
      <hemisphereLight intensity={0.3} groundColor='black' />
      <pointLight intensity={1} />
      <spotLight
        position={[20, 80, 20]}
        angle={0.1}
        penumbra={1}
        intensity={1}
        castShadow
        shadow-mapSize={1024}
      />
      <primitive
        object={scene}
        scale={isMobile ? 1.75 : 2.5}
        position-y={-1.5}
        rotation-y={0}
      />
    </>
  );
};

const ComputersCanvas = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    //Add a Listener for changes to the screen size
    const mediaQuery = window.matchMedia('(max-width: 500px)');

    //Set the initial value of the 'isMobile' state state variable
    setIsMobile(mediaQuery.matches);

    //Define a callback function to handle changes to the media query
    const handleMediaQueryChange = (e) => {
      setIsMobile(e.matches);
    };

    // Add the callback function as a Listener for changes to the media query
    mediaQuery.addEventListener('change', handleMediaQueryChange);

    //Remove the Listener when the component is unmounted
    return () => {
      mediaQuery.removeEventListener('change', handleMediaQueryChange);
    };
  }, []);

  return (
    <Canvas
      frameloop='demand'
      shadows
      camera={{ position: [30, 5, 5], fov: 25 }}
      gl={{ preserveDrawingBuffer: true }}
    >
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls
          enableZoom={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
        <Computers isMobile={isMobile} />
      </Suspense>
      <Preload all />
    </Canvas>
  );
};

export default ComputersCanvas;
