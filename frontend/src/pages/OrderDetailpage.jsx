import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const OrderDetailpage = () => {
  const { id } = useParams();
  const [orderDetail, setOrderDetail] = useState(null);

  useEffect(() => {
    const mockOrderDeatail = {
      _id: id,
      createdAt: new Date(),
      isPaid: true,
      isDelivered: false,
      paymentMethod: "paypal",
      shippingMethod: "standard",
      shippingAddress: {
        city: "San Francisco",
        country: "USA",
      },
      orderItems: [
        {
          productId: "1",
          name: "Product 1",
          price: 120,
          quantity: 1,
          image: "https://picsum.photos/500/500?random=1",
        },

        {
          productId: "2",
          name: "Product 2",
          price: 220,
          quantity: 2,
          image: "https://picsum.photos/500/500?random=2",
        },

        {
          productId: "3",
          name: "Product 3",
          price: 320,
          quantity: 3,
          image: "https://picsum.photos/500/500?random=3",
        },
        {
          productId: "4",
          name: "Product 4",
          price: 420,
          quantity: 4,
          image: "https://picsum.photos/500/500?random=4",
        },

        {
          productId: "5",
          name: "Product 5",
          price: 520,
          quantity: 5,
          image: "https://picsum.photos/500/500?random=5",
        },
        {
          productId: "6",
          name: "Product 6",
          price: 620,
          quantity: 6,
          image: "https://picsum.photos/500/500?random=6",
        },
      ],
    };
    setOrderDetail(mockOrderDeatail);
  }, [id]);
  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6">
      <h2 className="text-2xl md:text-3xl font-bold mb-6">Order Details</h2>
      {!orderDetail ? (
        <p>No Order details found</p>
      ) : (
        <div className="p-4 sm:p-6 rounded-lg border">
          {/* Order ID and date */}
          <div className="flex flex-col sm:flex-row justify-between mb-8">

            <div>
              <h3 className="text-lg md:text-xl font-semibold">Order ID: #{orderDetail._id}</h3>
              <p className="text-gray-600">{new Date(orderDetail.createdAt).toLocaleDateString()}</p>
            </div>

            <div className="fle flex-col items-start sm:items-end mt-4 sm:mt-0">
              <span className={`${orderDetail.isPaid?"bg-green-100 text-green-700 ":"bg-red-100 text-red-700"} px-3 py-1 rounded-full text-sm font-medium mb-2`}>
                {orderDetail.isPaid?"Approved":"Pending"}
              </span>

              <span className={`${orderDetail.isDelivered?"bg-green-100 text-green-700 ":"bg-yellow-100 text-yellow-700"} px-3 py-1 rounded-full text-sm font-medium mb-2`}>{" "}
                {orderDetail.isDelivered?"Delivered":"Pending"}
              </span>
            </div>
          </div>

          {/* Customer, payment, shipping info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mb-8">
            <div>
              <h4 className="text-lg font-semibold mb-2">Payment Info</h4>
              <p>Payment Method: {orderDetail.paymentMethod}</p>
              <p>Status: {orderDetail.isPaid? "Paid":"UnPaid"}</p>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-2">Shipping Info</h4>
              <p>Shipping Method: {orderDetail.shippingMethod}</p>
              <p>Address: {orderDetail?.shippingAddress?.city}, {orderDetail?.shippingAddress?.country}</p>
            </div>
          </div>

          {/* Product list */}
          <div className="overflow-x-auto">
            <h4 className="text-lg font-semibold mb-4">Products</h4>
            <div className="relative shadow-md sm:rounded-lg overflow-x-scroll">
            <table className="min-w-full text-gray-600 mb-4 bg-gray-100">
              <thead className="bg-gray-200">
                <tr>
                  <th className="py-2 px-4">Name</th>
                  <th className="py-2 px-4">Unit Price</th>
                  <th className="py-2 px-4">Quantity</th>
                  <th className="py-2 px-4">Total Price</th>
                </tr>
              </thead>
              <tbody>
                {orderDetail.orderItems.map((item) => (
                  <tr key={item.productId} className="border-b border-gray-300 hover:bg-gray-300">
                    <td className="py-2 px-4 flex items-center">
                     
                      <Link 
                      to={`/product/${item.productId}`}
                      className="text-blue-500 flex hover:underline"
                      >
                         <img 
                      src={item.image} 
                      alt={item.name}
                      className="size-12 object-cover rounded-lg mr-4 " 
                      />
                        {item.name}</Link>
                    </td>

                    <td className="py-2 px-4 text-center ">${item.price}</td>
                    <td className="py-2 px-4 text-center ">{item.quantity}</td>
                    <td className="py-2 px-4 text-center ">${item.price * item.quantity}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderDetailpage;
