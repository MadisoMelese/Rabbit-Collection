import { TbBrandMeta } from "react-icons/tb";
import { IoLogoInstagram, IoLogoLinkedin, IoLogoTwitter } from "react-icons/io";
const TopBar = () => {
  return (
    <div className="bg-[#ea2e0e] top-0  text-white">
      <div className="container mx-auto flex items-center sm:justify-between justify-center py-3 px-5">
        {/* Social Media Icons */}
        <div className="hidden items-center space-x-4 md:flex">
          <a href="#" className="hover:text-gray-300">
            <TbBrandMeta className="size-5" />
          </a>
          <a href="#" className="hover:text-gray-300">
            <IoLogoInstagram className="size-5" />
          </a>
          <a href="#" className="hover:text-gray-300">
            <IoLogoLinkedin className="size-5" />
          </a>
          <a href="#" className="hover:text-gray-300">
            <IoLogoTwitter className="size-5" />
          </a>
        </div>

        {/* Motivation  */}
        <div className="sm:text-sm text-lg">
          <span className="">
            We ship world-wide - Fast and reliable shipping!
          </span>
        </div>

        {/* Contact */}
        <div className="text-sm hidden sm:flex">
          <a href="tel:+251954233154" className="hover:text-gray-300">
            (+251) 954233154
          </a>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
