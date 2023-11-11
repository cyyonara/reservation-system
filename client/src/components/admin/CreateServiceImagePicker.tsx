import React, { useRef } from "react";
import { Image } from "../../pages/admin/CreateService";
import { BiImageAdd } from "react-icons/bi";
import { v4 as uuid } from "uuid";
import SelectedImage from "./SelectedImage";

type Props = {
   images: Image[];
   addImage: (image: Image) => void;
   deleteImage: (id: string) => void;
   isLoading: boolean;
};

const CreateServiceImagePicker: React.FC<Props> = ({
   images,
   addImage,
   deleteImage,
   isLoading,
}: Props) => {
   const inputFileRef = useRef<HTMLInputElement | null>(null);
   const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files[0]) {
         const file = e.target.files[0];
         const url = URL.createObjectURL(file);
         addImage({ id: uuid(), file, url });
      }
   };

   return (
      <div className="flex flex-col w-full xl:w-auto max-w-[500px]">
         <p className="text-xs sm:text-base">
            <span className="font-[500] mr-1">Images:</span> The first image will be the cover (max
            8)
         </p>
         <div className="flex flex-col gap-y-3 bg-white p-3 rounded-md shadow-sm mt-6">
            <div className="flex flex-1 items-center">
               <span className="text-xs sm:text-base">
                  {images.length ? `${images.length} file chosen` : "No file chosen"}
               </span>
               {images.length !== 8 && (
                  <button
                     className="flex items-center text-white bg-green-500 ml-auto p-2 gap-1 rounded-md duration-150 hover:bg-green-400"
                     onClick={() => inputFileRef.current!.click()}
                     type="button"
                  >
                     <BiImageAdd />
                     <span className="text-xs sm:text-sm hidden md:block">Choose an image</span>
                  </button>
               )}
               <input
                  type="file"
                  accept="image/*"
                  hidden
                  ref={inputFileRef}
                  onChange={handleFileSelect}
               />
            </div>
            {images.length > 0 && (
               <div className="grid grid-cols-1 auto-rows-[minmax(60,80px)] gap-1">
                  {images.map((image) => (
                     <SelectedImage
                        key={image.id}
                        imageID={image.id}
                        imageURL={image.url}
                        imageName={image.file.name}
                        deleteImage={() => deleteImage(image.id)}
                        isLoading={isLoading}
                     />
                  ))}
               </div>
            )}
            <button
               className="mt-2 hidden xl:block bg-c-blue text-white text-sm py-[6px] rounded-md uppercase font-[500] duration-150 hover:bg-c-blue/80 disabled:bg-gray-300 disabled:text-gray-700"
               disabled={images.length > 0 ? false : true}
               type="submit"
            >
               Create Service
            </button>
         </div>
      </div>
   );
};

export default React.memo(CreateServiceImagePicker);
