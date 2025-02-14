
const Table = (orders) => {
  return (
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
                <img src={order.orderItems[0].image} 
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
  )
}

export default Table
