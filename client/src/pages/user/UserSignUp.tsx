import UserRootLayout from "../../shared/layout/UserRootLayout";
import ErrorSignup from "../../components/user/ErrorSignup";
import fbLogo from "../../assets/facebook.png";
import { useEffect } from "react";
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import { signupFormSchema } from "../../form-schema/signupFormSchema";
import { useSignUp } from "../../hooks/useSignUp";
import { useAuthStore } from "../../zustand-store/authStore";
import { Navigate } from "react-router-dom";

export interface SignUpForm {
  name: string;
  username: string;
  email: string;
  password: string;
}

const UserSignUp: React.FC = () => {
  const { setCredential, user } = useAuthStore((state) => state);
  const signUp = useSignUp();
  const { handleChange, handleBlur, handleSubmit, values, errors, touched } = useFormik<SignUpForm>(
    {
      initialValues: {
        name: "",
        username: "",
        email: "",
        password: "",
      },
      validationSchema: signupFormSchema,
      onSubmit(values: SignUpForm) {
        signUp.mutate(
          { ...values, isAdmin: false },
          {
            onSuccess: (data) => {
              setCredential(data);
            },
          }
        );
      },
    }
  );

  useEffect(() => {
    document.title = "Sign-up";
    window.scrollTo(0, 0);
  }, []);

  if (user) return <Navigate to="/h" />;

  return (
    <UserRootLayout>
      <main className="flex-1 flex relative mb-14">
        {signUp.error && <ErrorSignup message={signUp.error!.response!.data.message} />}
        <section className="mx-auto mt-[40px] lg:mt-[90px] flex flex-col w-[80vw] max-w-[460px]">
          <h1 className="text-2xl font-bold mb-8">Create an account</h1>
          <form className="flex flex-col gap-y-4" onSubmit={handleSubmit}>
            <div className="flex flex-col lg:flex-row  gap-4">
              <div className="custom-input-container flex flex-col flex-1">
                <label htmlFor="name" className="text-lg font-semibold">
                  Name
                </label>
                <span className="rounded-[13px] flex flex-col p-[3px] duration-150 hover:bg-blue-300 focus-within:bg-blue-200 mt-1">
                  <input
                    id="name"
                    type="text"
                    value={values.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="border-[2px] relative w-full py-3 px-4 rounded-[10px] focus:outline-none focus:border-c-blue border-gray-300"
                    disabled={signUp.isLoading}
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
                    value={values.username}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="border-[2px] border-gray-300 relative w-full py-3 px-4 rounded-[10px] focus:outline-none focus:border-c-blue"
                    disabled={signUp.isLoading}
                  />
                </span>
                {errors.username && touched.username && (
                  <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                )}
              </div>
            </div>
            <div className="custom-input-container flex flex-col flex-1 gap-y-1">
              <label htmlFor="email" className="text-lg font-semibold">
                Email
              </label>
              <span className="rounded-[13px] p-[3px] duration-150 hover:bg-blue-300 focus-within:bg-blue-200">
                <input
                  id="email"
                  type="text"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="border-[2px] border-gray-300 relative w-full py-3 px-4 rounded-[10px] focus:outline-none focus:border-c-blue"
                  disabled={signUp.isLoading}
                />
              </span>
              {errors.email && touched.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
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
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="border-[2px] border-gray-300 relative w-full py-3 px-4 rounded-[10px] focus:outline-none focus:border-c-blue"
                  disabled={signUp.isLoading}
                />
              </span>
              {errors.password && touched.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password}</p>
              )}
            </div>
            <button
              type="submit"
              className="text-white bg-c-blue py-3 px-4 rounded-full mt-3 duration-150 hover:bg-blue-400 disabled:bg-c-blue/50 disabled:cursor-wait"
              disabled={signUp.isLoading}
            >
              Sign up
            </button>
          </form>
          <div className="flex items-center gap-x-2 my-5">
            <span className="h-[1px] bg-gray-300 flex-1"></span>
            <span className="text-gray-400 text-sm">or sign up with</span>
            <span className="h-[1px] bg-gray-300 flex-1"></span>
          </div>
          <div className="flex gap-x-4">
            <button className="flex items-center justify-center flex-1 gap-x-3 border border-gray-300 p-3 rounded-md duration-150 hover:bg-gray-100 active:bg-gray-200">
              <FcGoogle />
              <span>Google</span>
            </button>
            <button className="flex items-center justify-center flex-1 gap-x-3 border border-gray-300 p-3 rounded-md duration-150 hover:bg-gray-100 active:bg-gray-200">
              <img src={fbLogo} alt="facebook logo" className="w-[18px]" />
              <span>Facebook</span>
            </button>
          </div>
          <p className="mt-6 text-center text-sm">
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

export default UserSignUp;
