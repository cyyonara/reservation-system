import { useAccountSetupStore } from "../../zustand-store/accountSetupStore";
import { BiSolidCamera } from "react-icons/bi";
import { SignUpForm } from "./UserSignUp";
import { useFormik } from "formik";
import { useEffect, useRef, useState } from "react";
import { Navigate, useNavigate, Link } from "react-router-dom";
import { signupFormSchema } from "../../form-schema/signupFormSchema";
import { UploadTaskSnapshot, getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../../firebase-config";
import { FirebaseError } from "firebase/app";
import { toast } from "sonner";
import { useSetup } from "../../hooks/useSetup";
import { useAuthStore } from "../../zustand-store/authStore";
import { v4 as uuid } from "uuid";
import UserRootLayout from "../../shared/layout/UserRootLayout";

const UserAccountSetup: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [temporaryUrl, setTemporaryUrl] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const { accountSetupForm, clearAccountSetupForm } = useAccountSetupStore((state) => state);
  const { setCredential } = useAuthStore((state) => state);

  const setup = useSetup();
  const navigate = useNavigate();
  const inputAvatarRef = useRef<HTMLInputElement | null>(null);
  const { setFieldValue, values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik<SignUpForm>({
      initialValues: {
        name: "",
        username: "",
        email: "",
        password: "",
      },
      validationSchema: signupFormSchema,

      onSubmit: (formValues) => {
        if (selectedImage) {
          setLoading(true);
          const fileName = uuid() + selectedImage.name;
          const storageRef = ref(storage, `avatars/${fileName}`);
          const uploadTask = uploadBytesResumable(storageRef, selectedImage);

          uploadTask.on(
            "state_changed",
            (snapshot: UploadTaskSnapshot) => {
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            },
            (err: FirebaseError) => {
              switch (err.code) {
                case "storage/unauthorized":
                  toast.error("Unauthorized", { position: "top-right" });
                  break;
                default:
                  toast.error("Something went wrong", { position: "top-right" });
              }
            },
            () => {
              getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
                setup.mutate(
                  { ...formValues, avatar: downloadUrl, isAdmin: false },
                  {
                    onSuccess: (data) => {
                      setCredential(data);
                      clearAccountSetupForm();
                      toast.success("Account successfully created!", {
                        position: "top-right",
                        duration: 3000,
                      });
                      navigate("/h");
                    },
                    onError: (err) => {
                      setLoading(false);
                      toast.error(err.response!.data.message, { position: "top-right" });
                    },
                  }
                );
              });
            }
          );
        } else {
          setup.mutate(
            { ...formValues, avatar: accountSetupForm!.avatar, isAdmin: false },
            {
              onSuccess: (data) => {
                setCredential(data);
                clearAccountSetupForm();
                toast.success("Account successfully created", {
                  position: "top-right",
                  duration: 3000,
                });
                navigate("/h");
              },
              onError: (err) => {
                setLoading;
                toast.error(err.response!.data.message, { position: "top-right" });
              },
            }
          );
        }
      },
    });

  const browseAvatar = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      const tempUrl = URL.createObjectURL(selectedFile);
      setSelectedImage(selectedFile);
      setTemporaryUrl(tempUrl);
    }
  };

  if (!accountSetupForm) return <Navigate to="/" />;

  useEffect(() => {
    setFieldValue("name", accountSetupForm.name);
    setFieldValue("email", accountSetupForm.email);
  }, []);

  return (
    <UserRootLayout>
      <main className="flex-1 flex px-7 mb-8">
        <section className="flex flex-col mt-6 lg:mt-[50px] m-auto w-[80vh] max-w-[500px]">
          <div className="mb-8">
            <h1 className="text-3xl text-center font-bold">Finish Account Setup</h1>
            <p className="text-center text-c-blue">Complete your account setup</p>
          </div>
          <div className="flex flex-col items-center gap-y-4">
            <input
              type="file"
              hidden
              accept="image/*"
              ref={inputAvatarRef}
              onChange={browseAvatar}
            />
            <span>
              <img
                src={temporaryUrl || accountSetupForm.avatar}
                className="m-auto rounded-full h-[110px] w-[110px] object-cover"
              />
            </span>
            <button
              className="bg-c-blue text-white flex items-center gap-x-1 py-1 px-3 rounded-md text-xs"
              disabled={loading}
              onClick={() => {
                if (inputAvatarRef.current) {
                  inputAvatarRef.current.click();
                }
              }}
            >
              <span>Change your avatar</span>
              <BiSolidCamera className="mt-[1px]" />
            </button>
          </div>
          <form className="flex flex-col gap-y-4 mt-10" onSubmit={handleSubmit}>
            <div className="flex flex-col lg:flex-row  gap-4">
              <div className="custom-input-container flex flex-col flex-1">
                <label htmlFor="name" className="text-lg font-semibold">
                  Name
                </label>
                <span className="rounded-[13px] flex flex-col p-[3px] duration-150 hover:bg-blue-300 focus-within:bg-blue-200 mt-1">
                  <input
                    id="name"
                    type="text"
                    className="border-[2px] relative w-full py-3 px-4 rounded-[10px] focus:outline-none focus:border-c-blue border-gray-300"
                    value={values.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    disabled={loading}
                  />
                </span>
                {errors.name && touched.name && (
                  <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                )}
              </div>
              <div className="custom-input-container flex flex-col flex-1 gap-y-1">
                <label htmlFor="username" className="text-lg font-semibold">
                  Username
                </label>
                <span className="rounded-[13px] p-[3px] duration-150 hover:bg-blue-300 focus-within:bg-blue-200">
                  <input
                    id="username"
                    type="text"
                    className="border-[2px] border-gray-300 relative w-full py-3 px-4 rounded-[10px] focus:outline-none focus:border-c-blue"
                    value={values.username}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    disabled={loading}
                  />
                </span>
                {errors.username && touched.username && (
                  <p className="text-red-500 text-sm mt-1">{errors.username}</p>
                )}
              </div>
            </div>
            <div className="custom-input-container flex flex-col flex-1 gap-y-1">
              <label htmlFor="email" className="text-lg font-semibold">
                Email
              </label>
              <span className="rounded-[13px] p-[3px] duration-150 ">
                <input
                  id="email"
                  type="text"
                  value={values.email}
                  className="border-[2px] border-gray-300 relative w-full py-3 px-4 rounded-[10px]"
                  disabled
                />
              </span>
            </div>
            <div className="custom-input-container flex flex-col flex-1 gap-y-1">
              <label htmlFor="name" className="text-lg font-semibold">
                Password
              </label>
              <span className="rounded-[13px] p-[3px] duration-150 hover:bg-blue-300 focus-within:bg-blue-200">
                <input
                  id="password"
                  type="password"
                  placeholder="+8 characters"
                  className="border-[2px] border-gray-300 relative w-full py-3 px-4 rounded-[10px] focus:outline-none focus:border-c-blue"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  disabled={loading}
                />
              </span>
              {errors.password && touched.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password}</p>
              )}
            </div>
            <button
              type="submit"
              className="text-white bg-c-blue py-3 px-4 rounded-full mt-3 duration-150 hover:bg-blue-400 disabled:bg-c-blue/50 disabled:cursor-wait"
              disabled={loading}
            >
              {loading ? "Setting up your account..." : "Sign up"}
            </button>
          </form>
          <p className="text-center mt-3 text text-sm">
            Already have an account?{" "}
            <Link to="/sign-in" className="text-c-blue hover:underline">
              Sign in
            </Link>
          </p>
        </section>
      </main>
    </UserRootLayout>
  );
};

export default UserAccountSetup;
