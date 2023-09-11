import React from 'react'
import { SocketProvider } from './src/context/SocketContext';
import HomePage from './src/HomePage';

export const BandNamesApp = () => {
  return (
    <SocketProvider>
        <HomePage/>
    </SocketProvider>
  )
}
