import { useState } from 'react'
import TShirtCustomizer from './TshirtCustomizer'
import { CartProvider } from './context/CartContext'
import './App.css'

function App() {
  return (
    <CartProvider>
      <TShirtCustomizer/>
    </CartProvider>
  )
}

export default App
