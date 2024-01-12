
import React, { useRef } from 'react';
import { useGLTF, useAnimations } from '@react-three/drei';
import Robo from '../asset/robo/Robo';

export default function Model(props) {
  const group = useRef();
  const { nodes, materials, animations } = useGLTF('/robo.gltf');
  const { actions } = useAnimations(animations, group);

  return (
    <group ref={group} {...props} dispose={null}>
   
      
      
      <Robo/>
    </group>
  );
}