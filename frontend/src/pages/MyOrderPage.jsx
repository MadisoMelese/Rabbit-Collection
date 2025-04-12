import { useEffect } from "react";
import Table from "../components/Products/Table";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserOrders } from "../redux/slice/order.Slice";

const MyOrderPage = () => {
const dispatch = useDispatch()
const {orders, loading, error} = useSelector((state) => state.orders)

useEffect(()=>{
  dispatch(fetchUserOrders())
}, [dispatch])

if(loading){
  return <p>Loading...</p>
  
}
if(error){
  return <p>Error: {error}</p>
}

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6">
      <h2 className="text-xl sm:text-xl font-bold mb-6">My Orders</h2>
      <div className="relative shadow-md sm:rounded-lg overflow-x-scroll">
        <Table orders={orders} />
      </div>
    </div>
  );
};

export default MyOrderPage;
