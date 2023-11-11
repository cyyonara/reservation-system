import { PiSwimmingPoolBold } from "react-icons/pi";
import { AiFillFacebook, AiFillInstagram, AiOutlineTwitter } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useAuthStore } from "../../zustand-store/authStore";

const U_Footer: React.FC = () => {
  const { user } = useAuthStore();

  return (
    <footer className="flex flex-col gap-y-4 absolute inset-x-0 top-full pt-8 pb-[80px] px-[6vw] border-t border-gray-300">
      <header className="flex justify-between items-center border-b border-gray-300 pb-4">
        <div className="flex items-center text-c-blue">
          <h6 className="font-gabarito font-bold text-xs sm:text-sm md:text-lg">HACIENDA DAVENA</h6>
        </div>
        {!user && (
          <div className="flex gap-x-1 sm:gap-x-2">
            <Link to="/sign-in">
              <button className="text-white text-xs sm:text-sm uppercase bg-c-blue px-2 py-1 rounded-sm transition-colors hover:bg-blue-300">
                Sign In
              </button>
            </Link>
            <Link to="/sign-up">
              <button className="text-black text-xs sm:text-sm uppercase bg-gray-300 px-2 py-1 rounded-sm transition-colors hover:bg-gray-400">
                Sign up
              </button>
            </Link>
          </div>
        )}
      </header>
      <div className="flex flex-wrap justify-between gap-x-[5vw] gap-y-[35px]">
        <div className="flex flex-col justify-center gap-y-1 mx-auto">
          <div className="flex justify-center items-center gap-x-1 text-sm">
            <PiSwimmingPoolBold className="text-c-blue" />
            <span className="uppercase">Hacienda Davena</span>
          </div>
          <span className="text-xs">Copyright &#169; Hacienda.Davena 2023 </span>
        </div>
        <div className="mx-auto flex">
          <ul className="text-xs sm:text-sm m-auto">
            <li className="transition-transform hover:translate-x-2">
              <Link to="/services">Services</Link>
            </li>
            <li className="transition-transform hover:translate-x-2">
              <Link to="/about-us">About Us</Link>
            </li>
            <li className="transition-transform hover:translate-x-2">
              <Link to="/contact-us">Contact Us</Link>
            </li>
          </ul>
        </div>
        <div className="mx-auto flex">
          <ul className="text-xs sm:text-sm m-auto">
            <li className="transition-transform hover:translate-x-2">
              <Link to="/" className="flex items-center gap-x-1">
                <AiFillFacebook />
                <span>Facebook</span>
              </Link>
            </li>
            <li className="transition-transform hover:translate-x-2">
              <Link to="/" className="flex items-center gap-x-1">
                <AiFillInstagram />
                <span>Instagram</span>
              </Link>
            </li>
            <li className="transition-transform hover:translate-x-2">
              <Link to="/" className="flex items-center gap-x-1">
                <AiOutlineTwitter />
                <span>Twitter</span>
              </Link>
            </li>
          </ul>
        </div>
        <div className="flex items-center flex-col gap-1 mx-auto text-xs sm:text-sm">
          <span>Subscribe to get our updates</span>
          <form
            className="flex gap-2 p-2 border rounded-md"
            onSubmit={(e: React.SyntheticEvent) => e.preventDefault()}
          >
            <input
              type="text"
              maxLength={30}
              placeholder="Enter your email"
              className="focus:outline-none text-sm leading-none"
            />
            <button className="bg-c-blue hover:bg-blue-400 transition-colors text-white px-3 py-1 inset-y-0 right-0 rounded-md text-xs uppercase">
              Ok
            </button>
          </form>
        </div>
        <div className="flex flex-col mx-auto text-xs sm:text-sm">
          <span>San Jose Del Monte, Bulacan, Philippines</span>
          <span className="text-center">T.+9089172593</span>
          <span className="text-c-blue text-center">E.hacienda_davena23@gmail.com</span>
        </div>
      </div>
    </footer>
  );
};

export default U_Footer;
