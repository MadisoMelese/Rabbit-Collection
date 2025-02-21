import { useNavigate } from "react-router-dom";

const Table = ({ orders }) => {
  const navigate = useNavigate();
  const handleRowClick = (id) => {
    navigate(`/order/${id}`);
  };
  return (
    <table className="min-w-full text-left text-gray-500">
      <thead className="bg-gray-300 text-xs uppercase text-gray-700">
        <tr>
          <th className="py-2 px-4 sm:py-3">Image</th>
          <th className="py-2 px-4 sm:py-3">Order ID</th>
          <th className="py-2 px-4 sm:py-3">Order Created At</th>
          <th className="py-2 px-4 sm:py-3">Items</th>

          <th className="py-2 px-4 sm:py-3">Shipping Address</th>
          <th className="py-2 px-4 sm:py-3">Price</th>
          <th className="py-2 px-4 sm:py-3">Status</th>
        </tr>
      </thead>

      <tbody>
        {orders.length > 0 ? (
          orders.map((order) => (
            <tr
              key={order._id}
              onClick={() => handleRowClick(order._id)}
              className="border-b hover:border-teal-700 cursor-pointer hover:text-black hover:translate-1"
            >
              {/* order image */}
              <td className="py-2 px-2 sm:py-4 sm:px-4">
                <img
                  src={order.orderItems[0].image}
                  alt={order.name}
                  className="size-10 sm:size-12 object-cover rounded-lg"
                />
              </td>

              {/* order id */}
              <td className="p-2 sm:p-4 font-medium text-gray-900 whitespace-nowrap">
                #{order._id}
              </td>

              {/* order created date */}
              <td className="p-2 sm:py-4 sm:px-4">
                {new Date(order.createdAt).toLocaleDateString()}{" "}
                {new Date(order.createdAt).toLocaleTimeString()}
              </td>
              {/* product/order name */}
              <td className="p-2 sm:py-4 sm:px-4">
                {order?.orderItems?.length}
              </td>

              {/* order created date */}
              <td className="p-2 sm:py-4 sm:px-4">
                {order?.shippingAddress?.city || "addis Ababa"},{" "}
                {order?.shippingAddress?.country || "Ethiopia"}
              </td>

              {/* order price */}
              <td className="p-2 sm:py-4 sm:px-4 font-semibold">
                ${order?.totalPrice}
              </td>
              {/* order created date */}
              <td className="p-2 sm:py-4 sm:px-4">
                <span
                  className={`py-1 px-4 rounded text-white text-sm ${
                    order.isPaid ? "bg-teal-500" : "bg-red-500"
                  }`}
                >
                  {order?.isPaid ? "paid" : "pending"}
                </span>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td
              colSpan={7}
              className="p-4 text-center text-gray-500 capitalize"
            >
              You have no orders
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default Table;
