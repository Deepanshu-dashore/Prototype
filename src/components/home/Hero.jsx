'use client'

import { motion } from 'framer-motion'
import { Suspense, useRef, useLayoutEffect, useState, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, useGLTF } from '@react-three/drei'
import * as THREE from 'three'
import ABTestCTA from '../share/ABTestCTA'
import { trackFormOpen } from '../../utils/analytics'
import Image from 'next/image'
import Link from 'next/link'
import { useContactForm } from '../share/ContactFormContext'

// Orbit Controls with Mouse Interaction
function InteractiveOrbitControls({ mouseX, fixedRotationAmount = 0.15, modelGroupRef }) {
  const controlsRef = useRef()
  const previousMouseX = useRef(0.5)
  const targetRotation = useRef(0)
  const currentRotation = useRef(0)

  useFrame(() => {
    if (controlsRef.current) {
      // Calculate mouse movement delta
      const mouseDelta = mouseX - previousMouseX.current

      // Apply fixed rotation amount based on mouse X movement
      if (Math.abs(mouseDelta) > 0.001) {
        if (mouseDelta > 0) {
          // Mouse moving left to right: rotate in positive direction
          targetRotation.current = fixedRotationAmount
        } else {
          // Mouse moving right to left: rotate in negative direction
          targetRotation.current = -fixedRotationAmount
        }
      } else {
        // Gradually return to center when mouse stops
        targetRotation.current = 0
      }

      // Smooth interpolation
      currentRotation.current += (targetRotation.current - currentRotation.current) * 0.1

      // Apply rotation to model group (rotate around Y axis)
      if (modelGroupRef.current && Math.abs(currentRotation.current) > 0.0001) {
        modelGroupRef.current.rotation.y += currentRotation.current * 0.01
      }

      // Update previous mouse position
      previousMouseX.current = mouseX
    }
  })

  return (
    <OrbitControls
      ref={controlsRef}
      enableDamping
      dampingFactor={0.05}
      minPolarAngle={Math.PI / 2}
      maxPolarAngle={Math.PI / 2}
      enableRotate={false}
      enablePan={false}
      enableZoom={false}
    />
  )
}

// Carpet Model Component - Using carpet.glb instead of corrupted Carpet2.glb
function CarpetModel({ groupRef }) {
  const internalGroupRef = useRef()
  const initializedRef = useRef(false)
  const initialXPosition = useRef(0)

  // Use external ref if provided, otherwise use internal
  const modelRef = groupRef || internalGroupRef

  // Use carpet.glb instead of corrupted Carpet2.glb
  const gltf = useGLTF('/carpet.glb')

  // Center and scale the model on mount
  useLayoutEffect(() => {
    if (gltf?.scene && modelRef.current && !initializedRef.current) {
      try {
        console.log('Loading carpet model...', gltf)

        // Calculate bounding box of the original scene
        const box = new THREE.Box3().setFromObject(gltf.scene)

        if (!box.isEmpty()) {
          const center = box.getCenter(new THREE.Vector3())
          const size = box.getSize(new THREE.Vector3())
          const maxDim = Math.max(size.x, size.y, size.z)

          console.log('Model dimensions:', size, 'Max:', maxDim, 'Center:', center)

          if (maxDim > 0) {
            // Scale to fit in view (target size around 3-4 units)
            const targetSize = 3.5
            const scale = targetSize / maxDim

            console.log('Calculated scale:', scale)

            // Apply transformations to the group wrapper
            // Center the group (move it to negative center to center the model)
            modelRef.current.position.set(-center.x, -center.y, -center.z)
            // Store initial X position for levitation animation
            initialXPosition.current = modelRef.current.position.x
            // Scale the group
            modelRef.current.scale.set(scale, scale, scale)

            console.log('Group positioned at:', modelRef.current.position, 'Scale:', modelRef.current.scale)
          }
        } else {
          console.warn('Model bounding box is empty')
        }

        initializedRef.current = true
      } catch (error) {
        console.error('Error processing model:', error)
      }
    }
  }, [gltf, modelRef])

  // Rotate and levitate animation
  useFrame((state) => {
    if (modelRef.current && initializedRef.current) {
      // Levitation animation on X axis (side to side floating)
      const time = state.clock.elapsedTime
      const levitationAmount = 0.1 // Amplitude of movement
      const levitationSpeed = 0.8 // Speed of levitation
      modelRef.current.position.x = initialXPosition.current + Math.sin(time * levitationSpeed) * levitationAmount
    }
  })

  if (!gltf?.scene) {
    console.log('Scene not loaded yet')
    return null
  }

  return (
    <group ref={modelRef}>
      <primitive object={gltf.scene} />
    </group>
  )
}

export default function Hero({ onSecondaryClick }) {
  const [mouseX, setMouseX] = useState(0.5)
  const [ceImageError, setCeImageError] = useState(false)
  const canvasContainerRef = useRef(null)
  const modelGroupRef = useRef(null)
  const { openContactForm } = useContactForm()

  const handlePrimaryClick = () => {
    trackFormOpen('hero')
    openContactForm()
  }

  // Track mouse position over the canvas
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (canvasContainerRef.current) {
        const rect = canvasContainerRef.current.getBoundingClientRect()
        // Normalize mouse X position to 0-1 range (0 = left, 1 = right)
        const normalizedX = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width))
        setMouseX(normalizedX)
      }
    }

    const handleMouseLeave = () => {
      // Reset to center when mouse leaves
      setMouseX(0.5)
    }

    const container = canvasContainerRef.current
    if (container) {
      container.addEventListener('mousemove', handleMouseMove)
      container.addEventListener('mouseleave', handleMouseLeave)
      return () => {
        container.removeEventListener('mousemove', handleMouseMove)
        container.removeEventListener('mouseleave', handleMouseLeave)
      }
    }
  }, [])

  return (
    <section
      id="home"
      className="relative min-h-[80dvh] flex items-center overflow-hidden bg-neutral-50 pt-2 lg:pt-8"
    >
      {/* Dynamic Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[20%] -left-[10%] w-[70%] h-[70%] rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute top-[20%] -right-[10%] w-[60%] h-[60%] rounded-full bg-blue-400/5 blur-3xl" />
        <div className="absolute bottom-[10%] left-[20%] w-[50%] h-[50%] rounded-full bg-accent/5 blur-3xl" />
      </div>

      <div className="xl:max-w-[1300px] lg:max-w-[1000px] mx-auto px-4 sm:px-6 md:px-8 lg:px-2 py-10  md:py-14 lg:py-10 w-full relative z-10 pb-65">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-10 xl:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="text-left space-y-4 sm:space-y-5 md:space-y-6 mt-0 sm:-mt-6 lg:-mt-12"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="inline-flex items-center gap-2 px-3 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-neutral-200/60 shadow-sm"
            >
              <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse"></span>
              <span className="text-[10px] sm:text-xs font-bold text-neutral-600 uppercase tracking-wider">
                Advanced Technology
              </span>
            </motion.div>

            {/* Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-bold text-neutral-900 leading-[1.1] tracking-tight"
            >
              Contamination Control{" "}
              <span className="text-transparent bg-clip-text bg-linear-to-r from-primary to-blue-600">
                Matting
              </span>
            </motion.h1>

            {/* description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="text-base sm:text-lg text-justify text-neutral-600 max-w-xl leading-relaxed font-medium "
            >
              CC Matting manufacture, distribute & install class leading advanced high-tech polymeric matting that eradicates <span className="text-neutral-900 font-semibold">up to 99%</span> of harmful floor based particulate from entering your critical areas. Engineered for excellence and scientifically proven <span className="text-neutral-900 font-semibold">with a 2-Yr replacement warranty.</span>
            </motion.p>


            {/* Key Highlights - CE Marking, BPR-EPA, Zero VOCs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.35 }}
              className="grid grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-6 xl:gap-8 mb-6 pr-10"
            >
              {/* CE Marking */}
              <div className="group w-full inline-flex items-center gap-2 px-3 py-2 rounded-md bg-white/60 backdrop-blur-sm border border-neutral-200/60 shadow-sm hover:shadow-md hover:border-neutral-300/80 transition-all duration-300">
                <div className="relative w-6 h-6 bg-primary/8 p-1 border border-primary/40 rounded-full flex items-center justify-center shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3 text-primary/70" viewBox="0 0 48 48"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M22 42c-9.941 0-18-8.059-18-18S12.059 6 22 6m22 36c-9.941 0-18-8.059-18-18S34.059 6 44 6M26 24h11"></path></svg>
                </div>
                <span className="lg:text-xs text-[10px] font-medium text-neutral-700 tracking-wide">CE Marking</span>
              </div>

              {/* BPR - EPA Compliance */}
              <div className="group w-full text-nowrap inline-flex items-center gap-2 px-3 py-2 rounded-md bg-white/60 backdrop-blur-sm border border-neutral-200/60 shadow-sm hover:shadow-md hover:border-neutral-300/80 transition-all duration-300">
                <div className=" w-6 h-6 bg-primary/8 p-1 border border-primary/40 rounded-full flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-primary/70" viewBox="0 0 16 16">
                    <path fill="currentColor" d="M7.657 6.247c.11-.33.576-.33.686 0l.645 1.937a2.89 2.89 0 0 0 1.829 1.828l1.936.645c.33.11.33.576 0 .686l-1.937.645a2.89 2.89 0 0 0-1.828 1.829l-.645 1.936a.361.361 0 0 1-.686 0l-.645-1.937a2.89 2.89 0 0 0-1.828-1.828l-1.937-.645a.361.361 0 0 1 0-.686l1.937-.645a2.89 2.89 0 0 0 1.828-1.828zM3.794 1.148a.217.217 0 0 1 .412 0l.387 1.162c.173.518.579.924 1.097 1.097l1.162.387a.217.217 0 0 1 0 .412l-1.162.387A1.73 1.73 0 0 0 4.593 5.69l-.387 1.162a.217.217 0 0 1-.412 0L3.407 5.69A1.73 1.73 0 0 0 2.31 4.593l-1.162-.387a.217.217 0 0 1 0-.412l1.162-.387A1.73 1.73 0 0 0 3.407 2.31zM10.863.099a.145.145 0 0 1 .274 0l.258.774c.115.346.386.617.732.732l.774.258a.145.145 0 0 1 0 .274l-.774.258a1.16 1.16 0 0 0-.732.732l-.258.774a.145.145 0 0 1-.274 0l-.258-.774a1.16 1.16 0 0 0-.732-.732L9.1 2.137a.145.145 0 0 1 0-.274l.774-.258c.346-.115.617-.386.732-.732z"></path>
                  </svg>
                </div>
                <span className="lg:text-xs text-[10px] font-medium text-neutral-700 tracking-wide">REACH Compliance</span>
              </div>

              {/* Zero VOCs */}
              <div className="group w-full inline-flex items-center gap-2 px-5 py-2 rounded-md bg-white/60 backdrop-blur-sm border border-neutral-200/60 shadow-sm hover:shadow-md hover:border-neutral-300/80 transition-all duration-300">
                <div className=" w-6 h-6 bg-primary/8 p-1 border border-primary/40 rounded-full flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4.5 h-4.5 text-primary/70" viewBox="0 0 512 512">
                    <path fill="currentColor" d="M161.563 19.28c10.093 10.734 16.743 23.678 20.562 37.657c6.202 22.707 5.806 48.148 3.72 74.094c-4.176 51.894-14.58 106.512-2.44 140.407c11.396 31.814 29.668 50.71 49.94 60c8.72 3.998 17.9 6.21 27.186 6.782c22.195-65.084 17.46-148.144-19.06-204.283c48.352 48.234 71.19 121.068 56.436 197.407l-8.78 3.53a90 90 0 0 0 8.093-2.843c41.783-16.87 75.975-66.253 61.75-138.655c-6.536-33.265-28.966-80.165-66.5-116.5c-32.472-31.432-75.827-55.212-130.908-57.594zM445.53 202.813c-.84 12.1-4.638 23.528-10.56 33.907c-10.353 18.14-26.448 33.757-43.876 48.593c-34.856 29.67-75.057 57.156-88.313 85.218c-12.555 26.583-12.884 49.252-6.186 67.283a65.9 65.9 0 0 0 12.625 20.968c53.708-26.787 101.73-80.91 113.81-138.03c.076 59.646-30.63 118.687-86.624 156.906c35.802 14.545 86.282 5.034 121.72-47.75c16.418-24.456 31.558-67.3 30.812-112.875c-.634-38.688-12.264-79.23-43.407-114.217zm-424.874 73.47c-9.483 45.878.708 86.832 19.5 120.656c22.136 39.84 56.682 69.376 83.125 82.343c57.07 27.988 105.514 10.968 129.25-19.53c-67.59-5.1-123.692-40.873-153.436-92.563c39.02 43.428 107.658 66.29 167.562 62.625a65.8 65.8 0 0 0 .47-24.468c-3.214-18.965-14.87-38.447-39.032-55.188c-25.505-17.67-74.045-21.36-119.063-29.625c-22.508-4.13-44.247-9.59-62.28-20.124c-10.323-6.03-19.314-14.06-26.094-24.125z" strokeWidth={13} stroke="currentColor"></path>
                  </svg>
                </div>
                <span className="lg:text-xs text-[10px] font-medium text-neutral-700 tracking-wide">VOCs tested</span>
              </div>
            </motion.div>

            {/* Enhanced CTA buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="flex gap-3 sm:gap-4 mb-6 sm:mb-7 md:mb-8"
            >
              <ABTestCTA
                onClick={handlePrimaryClick}
                location="hero"
                className="btn-primary inline-flex items-center justify-center px-6 py-2.5 sm:px-7 sm:py-3 md:px-8 md:py-3.5 text-xs sm:text-base font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
              />
              <Link
                href="/videos"
                onClick={onSecondaryClick}
                className="btn-secondary inline-flex items-center justify-center px-6 py-2.5 sm:px-7 sm:py-3 md:px-8 md:py-3.5 text-xs sm:text-base font-semibold border-2 hover:border-primary/50 transition-all duration-300"
              >
                <svg
                  className="w-4 h-4 sm:w-5 sm:h-5 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                Watch Demo
              </Link>
            </motion.div>

            {/* Stats / Trust Indicators */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.5 }}
              className="flex justify-between items-center pr-5 gap-10 pt-8 border-t border-neutral-200/60"
            >
              <div className=''>
                <div className="lg:text-xl text-nowrap md:text-xl text-sm xl:text-xl font-bold text-neutral-900">Up to 99%</div>
                <div className="md:text-xs text-[8px] text-nowrap font-medium text-neutral-500 mt-1">Protection Rate</div>
              </div>
              <div>
                <div className="lg:text-xl text-nowrap md:text-xl text-sm xl:text-xl font-bold text-neutral-900">2 Years</div>
                <div className="md:text-xs text-[8px] text-nowrap font-medium text-neutral-500 mt-1">Warranty</div>
              </div>
              <div className="">
                <Image src="/new-iso-1.png" alt="ISO 9001" width={430} height={180} className="h-14 w-28 object-contain" />
              </div>
              <div className="">
                <Image src="/new-iso-2.png" alt="ISO 14001" width={418} height={180} className="h-14 w-28 object-contain" />
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            className="relative flex flex-col justify-start items-start lg:items-end"
            aria-hidden="true"
          >
            {/* Informational Card - Upper Right */}
            {/* <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="mb-6 lg:mb-8 lg:ml-auto lg:mr-0 xl:block hidden"
            >
              <div className="bg-white rounded-xl shadow-lg border border-neutral-dark/10 px-5 py-2 flex items-center gap-4">
                <div className="w-5 h-5 rounded-full animate-pulse bg-primary/20 shrink-0 flex items-center justify-center">
                  <div className="w-3 h-3 rounded-full bg-primary shrink-0"></div>
                </div>
                <div>
                  <div className="text-base lg:text-sm font-bold text-neutral-dark">
                    High Performance
                  </div>
                  <div className="text-xs text-neutral-dark/70">
                    Multi-layer Protection
                  </div>
                </div>
              </div>
            </motion.div> */}

            {/* <div className="flex lg:w-1/3 sm:w-1/3 md:w-1/3 w-1/2 absolute group hover:border-blue-500 hover:border-solid transition-all duration-300 text-center top-1/4 sm:top-[22%] md:top-[37%] lg:top-1/4 z-30 rotate-40 right-10 sm:right-[28%] md:right-32 lg:right-10 border-[1.3px] border-rose-700 border-dashed shadow-2xl items-center justify-center">
              <div className="w-1/2 h-1/2 rounded-full">
                <div className="absolute w-8/12 md:w-10/12 capitalize border-2 border-primary/20 bg-white px-3 py-2 group-hover:scale-105 transition-all duration-300 rounded-md shadow-lg cursor-pointer text-neutral-dark  right-30 md:-right-30 -bottom-10 -rotate-40">
                  <div className='flex bg-gray-100 py-1 rounded-sm  items-center justify-center gap-2'>
                    <h1 className='xl:text-2xl text-base font-bold group-hover:text-primary transition-all duration-300'>Up to 99%</h1>
                    <h2 className='lg:text-sm text-xs font-bold text-gray-600 mt-2'>effective</h2>
                  </div>
                  <p className='text-[8px] lg:text-[10px] text-xs text-gray-400'>After 7 footfalls and 3 wheel rotations</p>
                </div>
              </div>
            </div>
            <div className="flex lg:w-10/12 w-6/12 md:w-8/12 absolute group hover:border-blue-500 hover:border-solid transition-all duration-300 text-center top-1/2 z-30 rotate-48 left-[30%] sm:left-[25%] border-[1.3px] border-rose-700 border-dashed shadow-2xl items-center justify-center">
              <div className="md:w-1/2 w-5/12 h-1/2 rounded-full">
                <div className="absolute md:w-1/2 w-10/12 capitalize border-2 border-primary/20 bg-white px-3 py-2 group-hover:scale-105 transition-all duration-300 rounded-md shadow-lg cursor-pointer text-neutral-dark -right-32 md:-right-22 md:-bottom-10 -bottom-1 -rotate-48">
                  <p className='lg:text-[10px] text-[8px] text-gray-400'>After 4 footfalls and 2 wheel rotations</p>
                  <div className='flex bg-gray-100 py-1 rounded-sm  items-center justify-center gap-2'>
                    <h1 className='xl:text-3xl text-lg font-bold group-hover:text-primary transition-all duration-300'>66.6%</h1>
                    <h2 className='lg:text-sm text-xs font-bold text-gray-600 mt-2'>effective</h2>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex sm:w-6/12 md:w-1/3 w-7/12 lg:w-1/2 absolute group hover:border-blue-500 hover:border-solid transition-all duration-300 text-center top-7/12 lg:top-1/2 z-30 rotate-58 sm:rotate-61 lg:rotate-58 left-0 sm:left-10 md:left-30 lg:left-0 border-[1.3px] border-rose-700 border-dashed shadow-2xl items-center justify-center">
              <div className="w-1/2 h-1/2 rounded-full">
                <div className="absolute md:w-8/12 w-11/12 sm:w-7/12 capitalize border-2 border-primary/20 bg-white px-3 py-2 group-hover:scale-105 transition-all duration-300 rounded-md shadow-lg cursor-pointer text-neutral-dark md:-right-30 -right-30 -bottom-16 md:-bottom-5 -rotate-58 sm:-rotate-61 lg:-rotate-58">
                  <div className='flex bg-gray-100 py-1 rounded-sm items-center justify-center gap-2'>
                    <h1 className='xl:text-3xl text-lg font-bold group-hover:text-primary transition-all duration-300'>33.3%</h1>
                    <h2 className='lg:text-sm text-xs font-bold text-gray-600 mt-2'>effective</h2>
                  </div>
                  <p className='lg:text-[10px] text-[8px] text-gray-400'>After 4 footfalls and 1 wheel rotations</p>
                </div>
              </div>
            </div> */}


            {/* <div
              ref={canvasContainerRef}
              className="relative -mt-30 lg:-mt-80 w-full max-w-full h-[700px] xl:h-[800px]"
            >
              Decorative frame effect
              <div className="absolute inset-0 rounded-3xl bg-linear-to-br from-primary/10 via-transparent to-primary/5 -z-10 blur-2xl "></div>
              <Canvas
                camera={{ position: [-0.5, 0, 5], fov: 75 }}
                gl={{ antialias: true, alpha: true, preserveDrawingBuffer: true }}
                className="w-full h-full"
                dpr={[1, 2]}
              >
                <ambientLight intensity={0.4} />
                <directionalLight position={[5, 5, 5]} intensity={1.5} castShadow />
                <directionalLight position={[-5, 5, -5]} intensity={1} color="#e0e7ff" />
                <spotLight position={[0, 10, 0]} intensity={0.8} angle={0.5} penumbra={1} />

                <InteractiveOrbitControls
                  mouseX={mouseX}
                  fixedRotationAmount={0.15}
                  modelGroupRef={modelGroupRef}
                />
                <Suspense
                  fallback={
                    <mesh>
                      <boxGeometry args={[1, 1, 1]} />
                      <meshStandardMaterial color="gray" />
                    </mesh>
                  }
                >
                  <CarpetModel groupRef={modelGroupRef} />
                </Suspense>
              </Canvas>

   
            </div> */}

          </motion.div>
        </div>

        {/* Video Animation */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="
            md:absolute max-w-full h-auto bottom-10 left-1/2 md:-translate-x-1/2
            w-auto
            z-0
            md:w-auto md:top-[-130px] md:left-[430px] md:translate-x-0 md:bottom-auto md:z-auto
          "
        >
          <source src="/mateMovement.webm" type="video/webm" />
        </video>
      </div>

    </section>
  )
}

