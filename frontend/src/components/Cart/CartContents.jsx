import { RiDeleteBin3Line } from "react-icons/ri";
import { useDispatch } from "react-redux";
import { removeFromCart, updateCartItemQuantity } from "../../redux/slice/cart.Slice";
const CartContents = ({cart, userId, guestId}) => {
  const dispatch = useDispatch()
  const productPrice = cart?.products?.reduce((total, product)=>product.quantity*product.price, 1) || 0

  // handle add to the cart
  const handleAddToCart = (productId, delta, quantity, size, color)=>{
    const newQuantity = quantity + delta;
    if (newQuantity >= 1) {
      dispatch(updateCartItemQuantity({
        productId,
        quantity:newQuantity,
        guestId,
        userId,
        size,
        color,
      }))
    }
  };

  // handle remove from the cart
  const handleRemoveFromCart = (productId, size, color)=>{
    dispatch(removeFromCart({productId, guestId, userId, size, color}))
  }
  // const cartProducts = [
  //   {
  //     productId: 1,
  //     name: "T-shirt",
  //     size: "xl",
  //     color: "white",
  //     quantity: 1,
  //     price: 32,
  //     image: "https://picsum.photos/200?random=1",
  //   },
  //   {
  //     productId: 2,
  //     name: "Jeans",
  //     size: "L",
  //     color: "Black",
  //     quantity: 1,
  //     price: 50,
  //     image: "https://picsum.photos/200?random=2",
  //   },
  // ];
  return (
    <div>
      {cart.products.map((product, index) => (
        <div
          key={index}
          className="flex items-start justify-between py-4 border-b"
        >
          <div className="flex items-center">
            <img
              src={product.image}
              alt={product.name}
              className="w-20 h-24 object-cover mr-4 rounded"
            />
            <div>
              <h3>{product.name}</h3>
              <p className="text-sm text-gray-500">
                Size: {product.size} | Color: {product.color}
              </p>
              <div className="flex items-center mt-2">
                <button 
               onClick={
                ()=>handleAddToCart(
                  product.productId,
                  -1,
                  product.quantity,
                  product.size,
                  product.color
                )
              }
                className="border border-gray-400 rounded px-2 py-1 text-xl font-medium">
                  -
                </button>
                <span className="mx-2">{product.quantity}</span>
                <button 
                onClick={
                  ()=>handleAddToCart(
                    product.productId,
                    1,
                    product.quantity,
                    product.size,
                    product.color
                  )
                }
                className="border-gray-400 border rounded px-2 py-1 text-xl font-medium">
                  +
                </button>
              </div>
            </div>
          </div>
          <div>
            <p>${productPrice.toLocaleString()}</p>
            <button
            onClick={
              ()=>handleRemoveFromCart(
                product.productId,
                product.size,
                product.color
              )
            }
            >
              <RiDeleteBin3Line
               className="size-6 mt-2 text-red-600" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CartContents;
