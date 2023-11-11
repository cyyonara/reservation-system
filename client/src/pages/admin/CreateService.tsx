import React, { useEffect, useState, useCallback } from "react";
import CreateServiceImagePicker from "../../components/admin/CreateServiceImagePicker";
import { IoMdClose } from "react-icons/io";
import { useSearchParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useFormik } from "formik";
import { toast } from "sonner";
import { createServiceFormSchema } from "../../form-schema/createServiceFormSchema";
import { useAddService } from "../../hooks/useAddService";
import { v4 as uuid } from "uuid";
import { storage } from "../../firebase-config";
import { UploadTaskSnapshot, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { FirebaseError } from "firebase/app";
import { QueryClient, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";

export type Image = { id: string; url: string; file: File };

type F_CreateService = { name: string; description: string; price: number };

const CreateService: React.FC = (): React.JSX.Element => {
  const [searchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [images, setImages] = useState<Image[]>([]);
  const { mutate } = useAddService();
  const queryClient: QueryClient = useQueryClient();

  const {
    values,
    errors,
    handleChange,
    handleSubmit,
    touched,
    handleBlur,
    resetForm,
    setFieldValue,
  } = useFormik<F_CreateService>({
    initialValues: {
      name: "",
      description: "",
      price: 0,
    },
    validationSchema: createServiceFormSchema,
    onSubmit: async ({ name, description, price }): Promise<void> => {
      if (!images.length) {
        toast.error("Select atleast 1 image to proceed");
      } else {
        toast.promise(
          new Promise<string>(async (resolve, reject): Promise<void> => {
            try {
              setIsLoading(true);
              const uploadPromise: Promise<string>[] = new Array();
              for (const image of images) {
                uploadPromise.push(uploadImage(image));
              }
              const imageLinks = await Promise.all(uploadPromise);
              mutate(
                {
                  serviceId: uuid(),
                  name,
                  description,
                  price,
                  imageLinks,
                  isAvailable: true,
                  reviews: [],
                },
                {
                  onSuccess: () => {
                    resetForm();
                    setImages([]);
                    queryClient.invalidateQueries(["a-service-list"]);
                    resolve("Service successfully created");
                  },
                  onError: (err: AxiosError<{ message: string }>) =>
                    reject(err.response!.data.message),
                }
              );
            } catch (err) {
              reject("Something went wrong");
            } finally {
              setIsLoading(false);
            }
          }),
          {
            loading: "Creating your service. Please wait...",
            success: (data) => data,
            error: (err: string) => err,
            position: "top-right",
            duration: 2000,
          }
        );
      }
    },
  });

  const addSelectedImage = useCallback((image: Image): ReturnType<typeof toast.error> | void => {
    if (images.length === 8)
      return toast.error("You can only select a maximum of 8 images", {
        position: "top-right",
        duration: 2000,
      });
    setImages((state) => [...state, image]);
  }, []);

  const deleteSelectedImage = useCallback((id: string): void => {
    setImages((state) => state.filter((image) => image.id !== id));
  }, []);

  const uploadImage = async (image: Image): Promise<string> => {
    return new Promise((resolve, reject) => {
      const fileName = uuid() + image.file.name;
      const storageRef = ref(storage, `service-images/${fileName}`);
      const uploadTask = uploadBytesResumable(storageRef, image.file);

      uploadTask.on(
        "state_changed",
        (snapshot: UploadTaskSnapshot): void => {
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        },
        (err: FirebaseError): void => {
          switch (err.code) {
            case "storage/unauthorized":
              toast.error("Unauthorized", { position: "top-right" });
              reject();
              break;
            default:
              toast.error("Something went wrong", { position: "top-right" });
              reject();
          }
        },
        async (): Promise<void> => {
          const downloadURl = await getDownloadURL(uploadTask.snapshot.ref);
          resolve(downloadURl);
        }
      );
    });
  };

  const { name, description, price } = values;

  useEffect(() => {
    const body = document.body as HTMLBodyElement;
    body.style.overflow = "hidden";
    document.title = "Create Service";

    return () => {
      body.style.overflow = "auto";
    };
  }, []);

  return (
    <motion.div
      className="bg-black/40 fixed inset-0 flex backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="flex-1 flex flex-col bg-white-smoke mt-[50px] relative shadow-2xl overflow-auto py-8">
        <Link
          to={`/admin/services?${searchParams.toString()}`}
          className="absolute right-3 top-2 md:right-6 md:top-5"
        >
          <IoMdClose className="text-2xl sm:text-3xl" />
        </Link>
        <header className="mb-8 sm:mb-12 xl:mb-16 px-4 flex">
          <h2 className="m-auto text-2xl sm:text-[30px] font-semibold">Create a Service</h2>
        </header>
        <form
          className="flex flex-col-reverse xl:flex-row flex-1 px-4 items-center justify-end xl:justify-center xl:items-start gap-8"
          onSubmit={handleSubmit}
        >
          <div className="flex flex-col w-full xl:w-auto">
            <div className="flex flex-col mx-auto gap-y-6 w-full max-w-[500px]">
              <span className="flex flex-col w-full">
                <label
                  htmlFor="name"
                  className="mb-1 after:content-['*'] after:text-red-500 after:ml-1 text-sm sm:text-base"
                >
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  disabled={isLoading}
                  className="border border-gray-400 w-full p-3 outline-none rounded-md text-sm sm:text-base disabled:bg-gray-200"
                />
                {errors.name && touched.name && (
                  <p className="mt-[6px] text-xs sm:text-sm text-red-500">{errors.name}</p>
                )}
              </span>
              <span className="flex flex-col">
                <label
                  htmlFor="description"
                  className="mb-1 after:content-['*'] after:text-red-500 after:ml-1 text-sm sm:text-base"
                >
                  Description
                </label>
                <textarea
                  id="description"
                  cols={50}
                  rows={8}
                  className="resize-none border border-gray-400 rounded-md outline-none p-3 text-sm sm:text-base disabled:bg-gray-200"
                  value={description}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  disabled={isLoading}
                ></textarea>
                {errors.description && touched.description && (
                  <p className="mt-[6px] text-xs sm:text-sm text-red-500">{errors.description}</p>
                )}
              </span>
              <span className="flex flex-col">
                <label
                  htmlFor="Price"
                  className="mb-1 after:content-['*'] after:text-red-500 after:ml-1 text-sm sm:text-base"
                >
                  Price
                </label>
                <span className="w-full relative">
                  <span className="absolute top-[19%] left-4">&#8369;</span>
                  <input
                    id="price"
                    type="number"
                    maxLength={12}
                    className="border border-gray-400 py-3 pr-3 outline-none rounded-md min-w-full pl-10 text-sm sm:text-base disabled:bg-gray-200"
                    value={price || ""}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    disabled={isLoading}
                  />
                  {errors.price && touched.price && (
                    <p className="mt-[6px] text-xs sm:text-sm text-red-500">{errors.price}</p>
                  )}
                </span>
              </span>
              <button
                type="submit"
                className="xl:hidden bg-c-blue rounded-md text-white py-2 uppercase"
              >
                Create Service
              </button>
            </div>
          </div>
          <CreateServiceImagePicker
            images={images}
            addImage={addSelectedImage}
            deleteImage={deleteSelectedImage}
            isLoading={isLoading}
          />
        </form>
      </div>
    </motion.div>
  );
};

export default CreateService;
