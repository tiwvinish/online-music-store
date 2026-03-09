import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { Product } from '@/data/products';

export interface CartItem {
  product: Product;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  wishlist: string[];
}

type CartAction =
  | { type: 'ADD_TO_CART'; product: Product; quantity?: number }
  | { type: 'REMOVE_FROM_CART'; productId: string }
  | { type: 'UPDATE_QUANTITY'; productId: string; quantity: number }
  | { type: 'CLEAR_CART' }
  | { type: 'TOGGLE_WISHLIST'; productId: string }
  | { type: 'LOAD_STATE'; state: CartState };

const initialState: CartState = {
  items: [],
  wishlist: [],
};

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const existingItem = state.items.find(
        (item) => item.product.id === action.product.id
      );
      if (existingItem) {
        return {
          ...state,
          items: state.items.map((item) =>
            item.product.id === action.product.id
              ? { ...item, quantity: item.quantity + (action.quantity || 1) }
              : item
          ),
        };
      }
      return {
        ...state,
        items: [...state.items, { product: action.product, quantity: action.quantity || 1 }],
      };
    }
    case 'REMOVE_FROM_CART':
      return {
        ...state,
        items: state.items.filter((item) => item.product.id !== action.productId),
      };
    case 'UPDATE_QUANTITY':
      if (action.quantity <= 0) {
        return {
          ...state,
          items: state.items.filter((item) => item.product.id !== action.productId),
        };
      }
      return {
        ...state,
        items: state.items.map((item) =>
          item.product.id === action.productId
            ? { ...item, quantity: action.quantity }
            : item
        ),
      };
    case 'CLEAR_CART':
      return { ...state, items: [] };
    case 'TOGGLE_WISHLIST': {
      const isInWishlist = state.wishlist.includes(action.productId);
      return {
        ...state,
        wishlist: isInWishlist
          ? state.wishlist.filter((id) => id !== action.productId)
          : [...state.wishlist, action.productId],
      };
    }
    case 'LOAD_STATE':
      return action.state;
    default:
      return state;
  }
}

interface CartContextType {
  items: CartItem[];
  wishlist: string[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  totalItems: number;
  totalPrice: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // Load state from localStorage on mount
  useEffect(() => {
    const savedState = localStorage.getItem('guitarShopCart');
    if (savedState) {
      try {
        const parsed = JSON.parse(savedState);
        dispatch({ type: 'LOAD_STATE', state: parsed });
      } catch (e) {
        console.error('Failed to load cart state');
      }
    }
  }, []);

  // Save state to localStorage on change
  useEffect(() => {
    localStorage.setItem('guitarShopCart', JSON.stringify(state));
  }, [state]);

  const addToCart = (product: Product, quantity?: number) => {
    dispatch({ type: 'ADD_TO_CART', product, quantity });
  };

  const removeFromCart = (productId: string) => {
    dispatch({ type: 'REMOVE_FROM_CART', productId });
  };

  const updateQuantity = (productId: string, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', productId, quantity });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const toggleWishlist = (productId: string) => {
    dispatch({ type: 'TOGGLE_WISHLIST', productId });
  };

  const isInWishlist = (productId: string) => {
    return state.wishlist.includes(productId);
  };

  const totalItems = state.items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = state.items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        items: state.items,
        wishlist: state.wishlist,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        toggleWishlist,
        isInWishlist,
        totalItems,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
