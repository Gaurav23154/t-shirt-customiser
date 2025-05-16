import { useCart } from '../context/CartContext';

export default function Cart() {
  const { cartItems, removeFromCart, getTotalPrice } = useCart();

  return (
    <div className="fixed right-4 top-4 w-80 bg-white rounded-lg shadow-lg p-4">
      <h2 className="text-xl font-bold mb-4">Shopping Cart</h2>
      
      {cartItems.length === 0 ? (
        <p className="text-gray-500">Your cart is empty</p>
      ) : (
        <>
          <div className="space-y-4">
            {cartItems.map(item => (
              <div key={item.id} className="flex items-center justify-between border-b pb-2">
                <div>
                  <h3 className="font-medium">{item.name}</h3>
                  <p className="text-sm text-gray-500">Size: {item.size}</p>
                </div>
                <div className="flex items-center space-x-4">
                  <span className="font-medium">${item.price}</span>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-4 pt-4 border-t">
            <div className="flex justify-between font-bold">
              <span>Total:</span>
              <span>${getTotalPrice()}</span>
            </div>
            
            <button
              className="w-full mt-4 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
              onClick={() => {/* Implement checkout */}}
            >
              Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
} 