import { useEffect, useState } from "react";
// import Table from "../components/Products/Table";

const MyOrderPage = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    setTimeout(() => {
      const mockOrders = [
        {
          _id: 1234,
          createdAt: new Date(),
          shippingAddress: {
            city: "Hossana",
            country: "Ethiopia",
          },
          orderItems: [
            {
              name: "Product 1",
              image: "https://picsum.photos/500/500?random=1",
            },
          ],
          totalPrice: 100,
          isPaid: true,
        },

        {
          _id: 3456,
          createdAt: new Date(),
          shippingAddress: {
            city: "Bonga",
            country: "Ethiopia",
          },
          orderItems: [
            {
              name: "Product 2",
              image: "https://picsum.photos/500/500?random=2",
            },
          ],
          totalPrice: 100,
          isPaid: false,
        },
        {
          _id: 5678,
          createdAt: new Date(),
          shippingAddress: {
            city: "Addis Ababa",
            country: "Ethiopia",
          },
          oredsItems: [
            {
              name: "Product 3",
              image: "https://picsum.photos/500/500?random=3",
            },
          ],
          totalPrice: 300,
          isPaid: true,
        },
      ];

      setOrders(mockOrders);
    }, 2000);
  });
  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6">
      <h2 className="text-xl sm:text-xl font-bold mb-6">My Orders</h2>
      <div className="relative shadow-md sm:rounded-lg overflow-hidden">
      <table className="min-w-full text-left text-gray-500">
      <thead className="bg-gray-300 text-xs uppercase text-gray-700">
        <tr>
          <th className="py-2 px-4 sm:py-3">Image</th>
          <th className="py-2 px-4 sm:py-3">Order ID</th>
          <th className="py-2 px-4 sm:py-3">Order Created At</th>
          <th className="py-2 px-4 sm:py-3">Shipping 
            Address
          </th>
          <th className="py-2 px-4 sm:py-3">Items</th>
          <th className="py-2 px-4 sm:py-3">Price</th>
          <th className="py-2 px-4 sm:py-3">Status</th>
        </tr>
      </thead>

      <tbody>
        {orders.length>0?(
          orders.map((order)=>(
            <tr
            key={order._id} className="border-b hover:border-gray-50 cursor-pointer">
              <td

               className="py-2 px-2 sm:py-4 sm:px-4">
                <img src={order.oredsItems[0].image} 
                alt={order.name} className="size-10 sm:size-12 object-cover rounded-lg" />
                </td>
                <td className="p-2 sm:p-4 font-medium text-gray-900 whitespace-nowrap">#{order._id}</td>
            </tr>
          ))
        ):(
          <tr>
            <td colSpan={7} className="p-4 text-center text-gray-500 capitalize">
              You have no orders
            </td>
          </tr>
        )
        }
      </tbody>
    </table>
      </div>
    </div>
  );
};

export default MyOrderPage;
