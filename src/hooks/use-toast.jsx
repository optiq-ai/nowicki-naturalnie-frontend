"use client"

// Inspired by react-hot-toast library
import * as React from "react"

const TOAST_LIMIT = 1
const TOAST_REMOVE_DELAY = 5000 // Zmniejszono czas do 5 sekund

// Kontekst React do zarządzania stanem toastów
const ToastContext = React.createContext(undefined)

// Początkowy stan
const initialState = {
  toasts: [],
}

// Reducer do obsługi akcji toastów
const toastReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TOAST":
      return {
        ...state,
        toasts: [action.toast, ...state.toasts].slice(0, TOAST_LIMIT),
      }

    case "UPDATE_TOAST":
      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === action.toast.id ? { ...t, ...action.toast } : t
        ),
      }

    case "DISMISS_TOAST": {
      const { toastId } = action
      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === toastId || toastId === undefined
            ? {
                ...t,
                open: false,
              }
            : t
        ),
      }
    }
    case "REMOVE_TOAST":
      if (action.toastId === undefined) {
        return {
          ...state,
          toasts: [],
        }
      }
      return {
        ...state,
        toasts: state.toasts.filter((t) => t.id !== action.toastId),
      }
    default:
      return state
  }
}

// Generator ID dla toastów
let count = 0
function genId() {
  count = (count + 1) % Number.MAX_SAFE_INTEGER
  return count.toString()
}

// Provider komponentu
export function ToastProvider({ children }) {
  const [state, dispatch] = React.useReducer(toastReducer, initialState)
  const toastTimeoutsRef = React.useRef(new Map())

  // Funkcja dodająca toast do kolejki usuwania
  const addToRemoveQueue = React.useCallback((toastId) => {
    if (toastTimeoutsRef.current.has(toastId)) {
      return
    }

    const timeout = setTimeout(() => {
      toastTimeoutsRef.current.delete(toastId)
      dispatch({
        type: "REMOVE_TOAST",
        toastId: toastId,
      })
    }, TOAST_REMOVE_DELAY)

    toastTimeoutsRef.current.set(toastId, timeout)
  }, [])

  // Funkcja do tworzenia toastów
  const toast = React.useCallback((props) => {
    const id = genId()

    const update = (props) =>
      dispatch({
        type: "UPDATE_TOAST",
        toast: { ...props, id },
      })
    
    const dismiss = () => dispatch({ type: "DISMISS_TOAST", toastId: id })

    dispatch({
      type: "ADD_TOAST",
      toast: {
        ...props,
        id,
        open: true,
        onOpenChange: (open) => {
          if (!open) dismiss()
        },
      },
    })

    return {
      id: id,
      dismiss,
      update,
    }
  }, [])

  // Funkcja do usuwania toastów
  const dismissToast = React.useCallback((toastId) => {
    dispatch({ type: "DISMISS_TOAST", toastId })
    
    // Dodaj do kolejki usuwania po zamknięciu
    if (toastId) {
      addToRemoveQueue(toastId)
    } else {
      state.toasts.forEach((toast) => {
        addToRemoveQueue(toast.id)
      })
    }
  }, [state.toasts, addToRemoveQueue])

  // Efekt czyszczący timeouty przy odmontowaniu
  React.useEffect(() => {
    return () => {
      toastTimeoutsRef.current.forEach((timeout) => {
        clearTimeout(timeout)
      })
      toastTimeoutsRef.current.clear()
    }
  }, [])

  const value = React.useMemo(() => ({
    toasts: state.toasts,
    toast,
    dismiss: dismissToast,
  }), [state.toasts, toast, dismissToast])

  return (
    <ToastContext.Provider value={value}>
      {children}
    </ToastContext.Provider>
  )
}

// Hook do używania toastów
export function useToast() {
  const context = React.useContext(ToastContext)
  
  if (context === undefined) {
    throw new Error("useToast must be used within a ToastProvider")
  }
  
  return context
}

// Eksportuj funkcję toast dla wygody
export const toast = (props) => {
  // Zwróć pustą funkcję jeśli używana poza kontekstem
  // To zapobiega błędom podczas renderowania statycznego
  if (typeof window === "undefined") {
    return {
      id: "static-toast",
      dismiss: () => {},
      update: () => {},
    }
  }
  
  // Sprawdź czy provider jest dostępny
  const context = React.useContext(ToastContext)
  if (context === undefined) {
    console.warn("Toast used outside of ToastProvider. Toast will not be displayed.")
    return {
      id: "no-provider",
      dismiss: () => {},
      update: () => {},
    }
  }
  
  return context.toast(props)
}
