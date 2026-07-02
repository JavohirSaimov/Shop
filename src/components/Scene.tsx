import { useRef, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Float, Environment } from "@react-three/drei";
import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Shirt, Pants, Sock, Beanie, Dress, Shoe } from "./ClothingModels";

gsap.registerPlugin(ScrollTrigger);

export default function Scene() {
  const { camera } = useThree();
  const groupRef = useRef<THREE.Group>(null);
  
  const item1Ref = useRef<THREE.Group>(null); // Shirt
  const item2Ref = useRef<THREE.Group>(null); // Pants
  const item3Ref = useRef<THREE.Group>(null); // Sock
  const item4Ref = useRef<THREE.Group>(null); // Beanie
  const item5Ref = useRef<THREE.Group>(null); // Dress
  const item6Ref = useRef<THREE.Group>(null); // Shoe
  const item7Ref = useRef<THREE.Group>(null); // Extra Shirt
  const item8Ref = useRef<THREE.Group>(null); // Extra Pants
  const item9Ref = useRef<THREE.Group>(null); // Extra Sock
  const item10Ref = useRef<THREE.Group>(null); // Extra Beanie

  useEffect(() => {
    if (!groupRef.current) return;

    // Reset camera position initially
    camera.position.set(0, 0, 8);
    camera.lookAt(0, 0, 0);

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "body",
        start: "top top",
        end: "bottom bottom",
        scrub: 1.5,
      }
    });

    // 1. Group rotation and rising
    tl.to(groupRef.current.rotation, {
      y: Math.PI * 2,
      ease: "none",
      duration: 6
    }, 0);
    
    tl.to(groupRef.current.position, {
      y: 0,
      ease: "power1.inOut",
      duration: 6
    }, 0);

    // 2. Cinematic Camera Pan & Zoom sequence
    // Start -> zoom into item1 (Shirt)
    tl.to(camera.position, {
      x: -1,
      y: 0,
      z: 5,
      ease: "power1.inOut",
      duration: 1.5
    }, 0);
    
    // Pan to item5 (Dress)
    tl.to(camera.position, {
      x: 2,
      y: 1,
      z: 6,
      ease: "power2.inOut",
      duration: 1.5
    }, 1.5);

    // Zoom back out slightly and pan to item2 (Pants)
    tl.to(camera.position, {
      x: -2,
      y: 2,
      z: 7,
      ease: "power1.inOut",
      duration: 1.5
    }, 3.0);

    // Final wide shot looking down slightly
    tl.to(camera.position, {
      x: 0,
      y: 1,
      z: 9,
      ease: "power3.inOut",
      duration: 1.5
    }, 4.5);


    // 3. Dynamic floating and spiraling animations for items
    if (item1Ref.current) {
        tl.to(item1Ref.current.position, { y: 4, x: 3, z: 4, ease: "sine.inOut", duration: 6 }, 0);
        tl.to(item1Ref.current.rotation, { x: "+=3", y: "+=2", ease: "none", duration: 6 }, 0);
    }
    if (item2Ref.current) {
        tl.to(item2Ref.current.position, { y: -3, x: -4, z: 0, ease: "power2.out", duration: 6 }, 0);
        tl.to(item2Ref.current.rotation, { x: "-=2.5", z: "+=3", ease: "none", duration: 6 }, 0);
    }
    if (item3Ref.current) {
        tl.to(item3Ref.current.position, { y: 5, x: -3, z: 2, ease: "sine.inOut", duration: 6 }, 0);
        tl.to(item3Ref.current.rotation, { y: "+=4", z: "-=2", ease: "none", duration: 6 }, 0);
    }
    if (item4Ref.current) {
        tl.to(item4Ref.current.position, { y: -4, x: 5, z: 2, ease: "power1.inOut", duration: 6 }, 0);
        tl.to(item4Ref.current.rotation, { x: "+=2", y: "-=4", ease: "none", duration: 6 }, 0);
    }
    if (item5Ref.current) {
        tl.to(item5Ref.current.position, { y: 3, x: -5, z: 3, ease: "sine.inOut", duration: 6 }, 0);
        tl.to(item5Ref.current.rotation, { x: "-=1", y: "+=3", ease: "none", duration: 6 }, 0);
    }
    if (item6Ref.current) {
        tl.to(item6Ref.current.position, { y: 2, x: 4, z: -2, ease: "power2.inOut", duration: 6 }, 0);
        tl.to(item6Ref.current.rotation, { x: "+=3", z: "-=2", ease: "none", duration: 6 }, 0);
    }
    if (item7Ref.current) {
        tl.to(item7Ref.current.position, { y: -2, x: 0, z: 4, ease: "sine.inOut", duration: 6 }, 0);
        tl.to(item7Ref.current.rotation, { y: "-=3", z: "+=1", ease: "none", duration: 6 }, 0);
    }
    if (item8Ref.current) {
        tl.to(item8Ref.current.position, { y: 6, x: 6, z: 1, ease: "power1.out", duration: 6 }, 0);
        tl.to(item8Ref.current.rotation, { x: "+=2", z: "-=1.5", ease: "none", duration: 6 }, 0);
    }
    if (item9Ref.current) {
        tl.to(item9Ref.current.position, { y: 1, x: -6, z: 1, ease: "power2.inOut", duration: 6 }, 0);
        tl.to(item9Ref.current.rotation, { y: "+=3.5", z: "+=2", ease: "none", duration: 6 }, 0);
    }
    if (item10Ref.current) {
        tl.to(item10Ref.current.position, { y: 7, x: 2, z: -3, ease: "sine.inOut", duration: 6 }, 0);
        tl.to(item10Ref.current.rotation, { x: "-=2", y: "-=3", ease: "none", duration: 6 }, 0);
    }
    
    return () => {
        tl.kill();
    };
  }, [camera]);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    const refs = [item1Ref, item2Ref, item3Ref, item4Ref, item5Ref, item6Ref, item7Ref, item8Ref, item9Ref, item10Ref];
    
    refs.forEach((ref, index) => {
      if (ref?.current) {
        const offset = index * 0.5;
        ref.current.rotation.x = (index % 2 === 0 ? 0.2 : -0.2) + Math.sin(time * 0.4 + offset) * 0.15;
        ref.current.rotation.y = (index % 3 === 0 ? 0.5 : -0.3) + Math.cos(time * 0.3 + offset) * 0.2;
      }
    });
  });

  return (
    <>
      <Environment preset="studio" />
      <ambientLight intensity={0.6} color="#ffe8d6" />
      <spotLight position={[10, 15, 10]} angle={0.4} penumbra={1} intensity={2.5} color="#ffb6c1" castShadow />
      <spotLight position={[-10, -10, -5]} angle={0.5} penumbra={1} intensity={2} color="#add8e6" />
      <pointLight position={[0, 0, 5]} intensity={1.5} color="#ffffff" />

      <group ref={groupRef}>
        
        {/* Item 1 - Shirt */}
        <group ref={item1Ref} position={[-2.5, 0, -2]} rotation={[0.2, 0.5, -0.2]}>
          <Float speed={2.5} rotationIntensity={1.5} floatIntensity={2}>
            <Shirt color="#F472B6" />
          </Float>
        </group>

        {/* Item 2 - Pants */}
        <group ref={item2Ref} position={[3, -2, -1]} rotation={[0.5, -0.5, 0.3]} scale={0.8}>
          <Float speed={2} rotationIntensity={2} floatIntensity={1.5}>
            <Pants color="#60A5FA" />
          </Float>
        </group>
        
        {/* Item 3 - Sock */}
        <group ref={item3Ref} position={[1.5, -4, 1.5]} rotation={[-0.2, -0.4, 0.1]} scale={1.2}>
          <Float speed={3} rotationIntensity={2.5} floatIntensity={2}>
            <Sock color="#FBCFE8" />
          </Float>
        </group>
        
        {/* Item 4 - Beanie */}
        <group ref={item4Ref} position={[-3, -6, 2]} rotation={[-0.5, 0.5, 0.2]}>
          <Float speed={3.5} rotationIntensity={2} floatIntensity={2.5}>
            <Beanie color="#93C5FD" />
          </Float>
        </group>

        {/* Item 5 - Dress */}
        <group ref={item5Ref} position={[2, 1, -4]} rotation={[0.1, -0.2, 0.1]} scale={0.9}>
          <Float speed={2.2} rotationIntensity={1.8} floatIntensity={1.8}>
            <Dress color="#FDE047" />
          </Float>
        </group>

        {/* Item 6 - Shoe */}
        <group ref={item6Ref} position={[-1.5, -3, -3]} rotation={[-0.4, 0.8, -0.2]} scale={1.1}>
          <Float speed={2.8} rotationIntensity={2.2} floatIntensity={2.2}>
            <Shoe color="#F87171" />
          </Float>
        </group>
        
        {/* Item 7 - Extra Shirt */}
        <group ref={item7Ref} position={[0, -7, 0]} rotation={[0.3, -0.6, 0.4]} scale={0.85}>
          <Float speed={2.4} rotationIntensity={1.6} floatIntensity={2.1}>
            <Shirt color="#A78BFA" />
          </Float>
        </group>

        {/* Item 8 - Extra Pants */}
        <group ref={item8Ref} position={[-4, -1, 3]} rotation={[-0.2, 0.4, 0.5]} scale={0.9}>
          <Float speed={2.1} rotationIntensity={1.4} floatIntensity={1.7}>
            <Pants color="#FBBF24" />
          </Float>
        </group>

        {/* Item 9 - Extra Sock */}
        <group ref={item9Ref} position={[5, -5, -2]} rotation={[0.4, -0.1, -0.3]} scale={1.1}>
          <Float speed={2.7} rotationIntensity={1.9} floatIntensity={2.3}>
            <Sock color="#34D399" />
          </Float>
        </group>

        {/* Item 10 - Extra Beanie */}
        <group ref={item10Ref} position={[-2, -8, -4]} rotation={[-0.5, 0.3, 0.2]} scale={1.2}>
          <Float speed={3.2} rotationIntensity={2.1} floatIntensity={1.9}>
            <Beanie color="#F472B6" />
          </Float>
        </group>
      </group>
    </>
  );
}

