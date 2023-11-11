import { Carousel } from "@material-tailwind/react";
import { motion } from "framer-motion";

type Props = { images: string[]; closeCarousel: () => void };

const ImageCarousel: React.FC<Props> = ({ images, closeCarousel }: Props) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.15 }}
      className="fixed inset-0 bg-black/90 z-[100] flex items-center justify-center px-3 sm:px-8"
      onClick={closeCarousel}
    >
      <div onClick={(e: React.SyntheticEvent) => e.stopPropagation()}>
        <Carousel className="max-w-[1000px]">
          {images.map((image) => (
            <div className="flex justify-center">
              <img
                src={image}
                alt={image}
                className="object-center min-h-[200px] object-cover max-h-[800px] rounded-sm shadow-lg"
              />
            </div>
          ))}
        </Carousel>
      </div>
    </motion.div>
  );
};

export default ImageCarousel;
