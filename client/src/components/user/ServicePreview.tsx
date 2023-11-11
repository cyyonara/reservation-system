import U_Header from "../../shared/partials/U_Header";
import { useParams } from "react-router-dom";
import { useServicePreview } from "../../hooks/useServicePreview";
import { Carousel } from "@material-tailwind/react";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import ImageCarousel from "./ImageCarousel";
import DatePicker from "./DatePicker";
import { currenyFormatter } from "../../utils/currencyFormatter";

const ServicePreview: React.FC = () => {
  const { serviceId } = useParams();
  const { data: service, isLoading } = useServicePreview(serviceId as string);
  const [showImageCarousel, setShowImageCarousel] = useState<boolean>(false);

  const closeCarousel = (): void => setShowImageCarousel(false);

  if (isLoading) return;

  return (
    <>
      <div className="min-h-screen flex flex-col">
        <U_Header />
        <Carousel transition={{ duration: 0.8 }}>
          {service!.imageLinks.map((image) => (
            <img
              key={image}
              src={image}
              alt={image}
              className="object-center object-cover w-full h-[36vw] max-h-[650px] min-h-[300px]"
              onClick={() => setShowImageCarousel(!showImageCarousel)}
            />
          ))}
        </Carousel>
        <AnimatePresence>
          {showImageCarousel && (
            <ImageCarousel images={service!.imageLinks} closeCarousel={closeCarousel} />
          )}
        </AnimatePresence>
        <div className="flex flex-row h-max flex-1 justify-center bg-white mt-2 px-4 sm:px-8 md:px-14">
          <div className="flex-1 items-start flex flex-col lg:flex-row gap-8 h-max max-w-[1500px] mt-2 sm:mt-6 md:mt-10 rounded-sm ">
            <div className="flex flex-col">
              <div className="flex flex-col gap-y-3 mb-2 border-b border-gray-300 py-4">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-gray-900">
                  {service!.name}
                </h2>
                <span className="text-white hidden lg:block bg-c-blue w-min text-lg px-5 py-2 rounded-full font-normal">
                  {currenyFormatter(service!.price)}
                </span>
              </div>
              <p className="mt-4 text-sm md:text-base text-gray-600">
                {service!.description}Lorem Lorem ipsum dolor sit amet consectetur, adipisicing
                elit. Sunt at veritatis pariatur quas repudiandae repellendus necessitatibus
                nesciunt voluptatem tempora laudantium corporis reiciendis iure, quisquam,
                excepturi, suscipit doloremque quos amet vel?
              </p>
            </div>
            <DatePicker />
          </div>
        </div>
        <div className="flex flex-1 h-max justify-center bg-white mt-10 px-4 sm:px-8 md:px-14 pb-20">
          <div className="flex-1 flex flex-col max-w-[1500px] rounded-sm">
            <span className="text-gray-600 py-3 text-sm md:text-base"></span>
          </div>
        </div>
      </div>
      <div className="fixed flex items-center lg:hidden justify-between bottom-0 inset-x-0 border-t border-gray-400 z-50 p-5 bg-white-smoke">
        <span>
          Price: <span className="font-semibold">{currenyFormatter(service!.price)}</span>
        </span>
        <button className="bg-c-blue text-white py-2 px-4 rounded-lg text-sm">Reserve</button>
      </div>
    </>
  );
};

export default ServicePreview;
