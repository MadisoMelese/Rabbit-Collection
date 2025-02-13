import { useEffect, useRef, useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
const NewArrivals = () => {
  const scrollRef = useRef(null)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [scrollLeft, setScrollLeft] = useState(false)
  const [scrollRight, setScrollRight] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)
  const [canScrollLeft, setCanScrollLeft] = useState(false)

  const newArraivals = [
    {
      _id: "1",
      name: "Stylish Jackect",
      price: 90,
      images: [
        {
          url: "https://picsum.photos/500/500?random=1",
          altText: "Stylish Jackect",
        },
      ],
    },

    {
      _id: "2",
      name: "Stylish Jackect",
      price: 90,
      images: [
        {
          url: "https://picsum.photos/500/500?random=2",
          altText: "Stylish Jackect",
        },
      ],
    },

    {
      _id: "3",
      name: "Stylish Jackect",
      price: 90,
      images: [
        {
          url: "https://picsum.photos/500/500?random=3",
          altText: "Stylish Jackect",
        },
      ],
    },

    {
      _id: "4",
      name: "Stylish Jackect",
      price: 90,
      images: [
        {
          url: "https://picsum.photos/500/500?random=4",
          altText: "Stylish Jackect",
        },
      ],
    },

    {
      _id: "5",
      name: "Stylish Jackect",
      price: 90,
      images: [
        {
          url: "https://picsum.photos/500/500?random=5",
          altText: "Stylish Jackect",
        },
      ],
    },

    {
      _id: "6",
      name: "Stylish Jackect",
      price: 90,
      images: [
        {
          url: "https://picsum.photos/500/500?random=6",
          altText: "Stylish Jackect",
        },
      ],
    },

    {
      _id: "7",
      name: "Stylish Jackect",
      price: 90,
      images: [
        {
          url: "https://picsum.photos/500/500?random=7",
          altText: "Stylish Jackect",
        },
      ],
    },


    {
      _id: "9",
      name: "Stylish Jackect",
      price: 90,
      images: [
        {
          url: "https://picsum.photos/500/500?random=9",
          altText: "Stylish Jackect",
        },
      ],
    },

    {
      _id: "10",
      name: "Stylish Jackect",
      price: 90,
      images: [
        {
          url: "https://picsum.photos/500/500?random=10",
          altText: "Stylish Jackect",
        },
      ],
    },

    {
      _id: "11",
      name: "Stylish Jackect",
      price: 90,
      images: [
        {
          url: "https://picsum.photos/500/500?random=11",
          altText: "Stylish Jackect",
        },
      ],
    },
  ];

  const scroll = (direction)=>{
    const scrollAmount = direction==='left'?-500:500;
    scrollRef.current.scrollBy({
      left:scrollAmount,
      behaviour:'smooth'
    })
  }

  const updateScrollButtons = () =>{
    const container = scrollRef.current;
      if(container){
        const leftScroll = container.scrollLeft;
        const rightScrollable= container.scrollWidth >leftScroll + container.clientWidth;

        setCanScrollLeft(leftScroll >0)
        setCanScrollRight(rightScrollable)
      }
  }

  useEffect(()=>{
    const container = scrollRef.current;
    if(container){
      container.addEventListener('scroll', updateScrollButtons)
      updateScrollButtons();
    }
  })
  
  return (
    <section className="py-16 px-4 lg:px-0">
      <div className="container mx-auto text-center mb-10 relative">
        <h2 className="text-3xl font-bold mb-4">Explore New Arraivals</h2>
        <p className="text-lg text-gray-600 mb-8">
          Discover the latest styles straight off the runway, freshly added to
          keep your wardrobe on the cutting edge of fashion
        </p>
        <div className="absolute right-0 bottom-[-30px] flex space-x-2 ">
          <button
          onClick={()=>scroll("left")} 
          disabled={!canScrollLeft}
          className={`p-2 rounded border border-gray-500 ${canScrollLeft?'bg-white text-black':"bg-gray-200 text-gray-400"}`}>
            <FiChevronLeft className="text-2xl"/>
          </button>
          <button
                    onClick={()=>scroll("right")} 
                    disabled={!canScrollRight} 
          className={`p-2 rounded border border-gray-500 ${canScrollRight?'bg-white text-black':"bg-gray-200 text-gray-400"}`}>
            <FiChevronRight className="text-2xl"/>
          </button>
        </div>
      </div>

      {/* Scrollable contents  */}
      <div ref={scrollRef}
      className="container mx-auto overflow-x-scroll flex space-x-6 relative">
        {newArraivals.map((product)=>(
          <div key={product._id} className="min-w-[100%] sm:min-w-[50%] md:min-w-[30%] relative">
            <img 
            src={product.images[0].url} 
            alt={product.images.altText|| product.name } 
            className="w-full h-[500px] object-cover rounded-lg"
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default NewArrivals;
