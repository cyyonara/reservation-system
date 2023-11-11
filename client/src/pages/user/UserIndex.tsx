import bg1 from "../../assets/bg1.jpg";
import U_Footer from "../../shared/partials/U_Footer";
import { PiSwimmingPoolBold } from "react-icons/pi";
import { BiSolidRightArrowCircle } from "react-icons/bi";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../../zustand-store/authStore";

const UserIndex: React.FC = () => {
  const { user } = useAuthStore((state) => state);

  useEffect(() => {
    document.title = "Hacienda Davena";
  }, []);

  return (
    <div
      className="flex-col flex min-h-screen bg-cover bg-center relative after:content-[''] after:absolute after:inset-0 after:bg-black/20"
      style={{ backgroundImage: `url(${bg1})` }}
    >
      <header className="flex items-stretch justify-between h-[76px] bg-black/40 backdrop-blur-[2px] text-white z-[50] px-[5vw]">
        <Link to="/" className="flex items-center gap-x-1">
          <PiSwimmingPoolBold className="text-lg text-c-blue" />
          <h5 className="font-gabarito font-[900] text-sm md:text-xl">HACIENDA DAVENA</h5>
        </Link>
      </header>
      <main className="flex items-center flex-1 px-[20px]">
        <section className="flex flex-col text-white z-20 mx-auto">
          <div className="flex flex-col items-center">
            <h1 className="uppercase leading-[55px] font-bold text-center text-[clamp(35px,12vw,50px)]">
              Welcome to <span className="text-blue-500">Hacienda Davena</span>
            </h1>
            <p className="uppercase leading-[40px] text-center text-[clamp(15px,8vw,40px)]">
              Book your reservations now!
            </p>
            <p className="w-[70vw] mt-3 md:w-[60vw] lg:w-[40vw] text-center text-xs md:text-sm">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem dignissimos illum
              labore aut, similique eos fuga aliquid tempora saepe, animi quod nisi hic ea? Itaque
              consectetur cupiditate molestias facilis. Maiores.
            </p>
            <Link to={user ? "/h" : "/services"}>
              <button className="group mt-4 bg-c-blue flex items-center gap-x-2 px-3 py-2 transition-colors rounded-sm text-sm hover:bg-blue-400 md:text-base lg:text-lg">
                <span>BOOK NOW</span>
                <BiSolidRightArrowCircle className="group-hover:translate-x-1 duration-300" />
              </button>
            </Link>
          </div>
        </section>
      </main>
      <U_Footer />
    </div>
  );
};

export default UserIndex;
