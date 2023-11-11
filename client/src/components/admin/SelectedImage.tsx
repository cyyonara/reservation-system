import { AiFillCloseCircle } from "react-icons/ai";

type Props = {
   imageID: string;
   imageURL: string;
   imageName: string;
   deleteImage: () => void;
   isLoading: boolean;
};

const SelectedImage: React.FC<Props> = ({
   imageID,
   imageURL,
   imageName,
   deleteImage,
   isLoading,
}: Props) => {
   return (
      <div
         key={imageID}
         className="flex shadow-[1px_2px_4px_var(--shadow-clr)] p-2 rounded-md items-center gap-x-3 relative"
      >
         <img
            src={imageURL}
            alt={imageName}
            className="h-[40px] min-w-[40px] max-w-[42px] sm:h-[45px] sm:min-w-[45px] sm:max-w-[47px] rounded-md object-cover object-center text-xs truncate"
         />
         <p className="truncate text-xs sm:text-sm mr-4">{imageName}</p>
         {!isLoading && (
            <span className="ml-auto cursor-pointer text-gray-700" onClick={deleteImage}>
               <AiFillCloseCircle size={18} />
            </span>
         )}
      </div>
   );
};

export default SelectedImage;
