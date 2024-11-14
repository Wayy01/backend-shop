'use client'

// Import necessary hooks from React
import { createContext, useContext, useReducer } from 'react'

// Create a new context for managing cart state
const CartContext = createContext()

// Reducer function to handle cart state updates
const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      // Check if item already exists in cart by matching ticketId
      const existingItem = state.items.find(
        item => item.ticketId === action.payload.ticketId
      )

      // If item exists, increment its quantity
      if (existingItem) {
        return {
          ...state,
          items: state.items.map(item =>
            item.ticketId === action.payload.ticketId
              ? { ...item, quantity: item.quantity + 1 } // Increment quantity for matching item
              : item // Keep other items unchanged
          ),
        }
      }

      // If item doesn't exist, add it to cart with quantity 1
      return {
        ...state,
        items: [...state.items, { ...action.payload, quantity: 1 }],
      }

    case 'REMOVE_FROM_CART':
      // Remove item from cart by filtering out matching ticketId
      return {
        ...state,
        items: state.items.filter(item => item.ticketId !== action.payload),
      }

    case 'CLEAR_CART':
      // Reset cart to empty state
      return {
        ...state,
        items: [],
      }

    default:
      // Return unchanged state for unknown actions
      return state
  }
}

// Provider component that wraps app to provide cart context
export function CartProvider({ children }) {
  // Initialize cart state with useReducer
  // Initial state has empty items array
  const [state, dispatch] = useReducer(cartReducer, {
    items: [],
  })

  // Provide cart state and dispatch function to children
  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  )
}

// Custom hook to access cart context
export const useCart = () => {
  // Get context value
  const context = useContext(CartContext)

  // Throw error if hook is used outside of CartProvider
  if (!context) {
    throw new Error('useCart must be used within a CartProvider')
  }

  // Return context containing state and dispatch
  return context
}
