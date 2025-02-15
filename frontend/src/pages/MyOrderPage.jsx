import { useEffect, useState } from "react";
import Table from "../components/Products/Table";

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
          orderItems: [
            // Fixed the typo here
            {
              name: "Product 3",
              image: "https://picsum.photos/500/500?random=3",
            },
          ],
          totalPrice: 300,
          isPaid: true,
        },

        {
          _id: 6789,
          createdAt: new Date(),
          shippingAddress: {
            city: "Wachamo",
            country: "Ethiopia",
          },
          orderItems: [
            // Fixed the typo here
            {
              name: "Product 4",
              image: "https://picsum.photos/500/500?random=4",
            },
          ],
          totalPrice: 300,
          isPaid: false,
        },
        // 5
        {
          _id: 7890,
          createdAt: new Date(),
          shippingAddress: {
            city: "New York",
            country: "USA",
          },
          orderItems: [
            // Fixed the typo here
            {
              name: "Product 5",
              image: "https://picsum.photos/500/500?random=5",
            },
          ],
          totalPrice: 500,
          isPaid: true,
        },

// 6
        {
          _id: 8901,
          createdAt: new Date(),
          shippingAddress: {
            city: "Nairob",
            country: "Kenya",
          },
          orderItems: [
            // Fixed the typo here
            {
              name: "Product 7",
              image: "https://picsum.photos/500/500?random=7",
            },
          ],
          totalPrice: 700,
          isPaid: false,
        },
        {
          _id: 9012,
          createdAt: new Date(),
          shippingAddress: {
            city: "Cape Town",
            country: "South Africa",
          },
          orderItems: [
            // Fixed the typo here
            {
              name: "Product 6",
              image: "https://picsum.photos/500/500?random=6",
            },
          ],
          totalPrice: 600,
          isPaid: true,
        },
      ];

      setOrders(mockOrders);
    }, 2000);
  }, []);
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
