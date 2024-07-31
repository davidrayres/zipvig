'use client'
import {createContext, useContext, useState} from 'react'

// Create context
const PickContext = createContext()

// Create a provider
export function PickProvider({children}) {
  const [pickSlip, setPickSlip] = useState([])
  return <PickContext.Provider value={{pickSlip, setPickSlip}}>{children}</PickContext.Provider>
}

// Create a custom hook to access context
export function usePickContext() {
  return useContext(PickContext)
}
