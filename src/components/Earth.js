import React, { useRef } from 'react';
import { useLoader, useFrame } from '@react-three/fiber'
import { OrbitControls, Stars } from '@react-three/drei'
import { TextureLoader } from 'three'


import EarthDayMap from '../assets/textures/8k_earth_daymap.jpg'
import EarthNormalMap from '../assets/textures/8k_earth_normal_map.jpg'
import EarthSpecMap from '../assets/textures/8k_earth_specular_map.jpg'
import EarthClouds from '../assets/textures/8k_earth_clouds.jpg'
import EarthNightMap from '../assets/textures/8k_earth_nightmap.jpg'
import MoonMap from '../assets/textures/lroc_color_poles_4k.jpg'

export function Earth(props) {

  const [dayMap, nightMap, moonMap, normalMap, specularMap, cloudsMap] = useLoader(TextureLoader,
    [EarthDayMap, EarthNightMap, MoonMap,EarthNormalMap, EarthSpecMap, EarthClouds])

  const earthRef = useRef()
  const cloudsRef = useRef()
  const moonRef = useRef()

  useFrame(({clock})=>{
    const elapsedTime = clock.getElapsedTime();
    earthRef.current.rotation.y = elapsedTime / 6;
    cloudsRef.current.rotation.y = elapsedTime / 6;
    moonRef.current.rotation.y = elapsedTime / 12


  })

  return (
    <>
      <mesh ref={moonRef} position={[0,0,5]}>
        <sphereGeometry args={[.6, 32, 32]}/>
        <meshPhongMaterial specularMap={specularMap}/>
        <meshStandardMaterial map={moonMap} normalMap={normalMap} metalness={.4} roughness={.7}/>
        <OrbitControls enableZoom={true} enableRotate={true} zoomSpeed={.5} rotateSpeed={.4}
                       enablePan={true} minDistance={1.5} maxDistance={4}/>
      </mesh>
      <mesh ref={earthRef} position={[0,0,0]}>
        <sphereGeometry args={[1, 32, 32]}/>
        <meshPhongMaterial specularMap={specularMap}/>
        <meshStandardMaterial map={dayMap} normalMap={normalMap} metalness={.4} roughness={.7}/>
        <OrbitControls autoRotate={true} enableZoom={true} enableRotate={true} zoomSpeed={.5} rotateSpeed={.4}
                       enablePan={true} minDistance={1.5} maxDistance={4}/>
      </mesh>
      <mesh ref={cloudsRef}>
        <sphereGeometry args={[1.005, 32, 32]}/>
        <meshPhongMaterial map={cloudsMap} opacity={.4} transparent={true} depthWrite={true}/>
      </mesh>
      <Stars radius={300} depth={20} count={10000} factor={4} saturation={0} fade={true}/>
    </>
  )
}
