import SignInSvg from "../../components/admin/SignInSvg";
import { Input } from "@material-tailwind/react";
import { Link, useNavigate, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAdminSignin } from "../../hooks/useAdminSignin";
import { useAdminAuthStore } from "../../zustand-store/adminAuthStore";
import { toast } from "sonner";

export type AdminSigninData = { username: string; password: string };

const AdminSignin: React.FC = () => {
   const [signInForm, setSignInForm] = useState<AdminSigninData>({ username: "", password: "" });
   const { setAdminCredential, c_admin } = useAdminAuthStore();
   const { mutate, isLoading } = useAdminSignin();
   const navigate = useNavigate();

   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setSignInForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
   };

   const onAdminSignin = (e: React.FormEvent) => {
      e.preventDefault();
      mutate(signInForm, {
         onSuccess: (data) => {
            setAdminCredential(data);
            toast.success("Welcome back admin!", { position: "top-right", duration: 2000 });
            navigate("/admin/dashboard");
         },
         onError: (err) => {
            toast.error(err.response!.data.message || "Something went wrong", {
               position: "top-right",
               duration: 2000,
            });
         },
      });
   };

   useEffect(() => {
      document.title = "Admin - Sign in";
   }, []);

   if (c_admin) return <Navigate to="/admin/dashboard" />;

   return (
      <div className="min-h-screen flex items-center py-10 px-4 sm:px-[6rem]">
         <div className="hidden xl:flex justify-center flex-1">
            <SignInSvg />
         </div>
         <div className="flex-1 flex justify-center">
            <div className="flex-1 flex flex-col max-w-[380px]">
               <h1 className="mb-6 text-center font-acme text-3xl">Welcome Admin!</h1>
               <form className="w-full flex flex-col gap-4" onSubmit={onAdminSignin}>
                  <Input
                     name="username"
                     type="text"
                     label="Username"
                     size="lg"
                     color="blue"
                     crossOrigin={undefined}
                     value={signInForm.username}
                     onChange={handleChange}
                     disabled={isLoading}
                  />
                  <Input
                     name="password"
                     type="password"
                     label="Password"
                     size="lg"
                     color="blue"
                     crossOrigin={undefined}
                     value={signInForm.password}
                     onChange={handleChange}
                     disabled={isLoading}
                  />
                  <button
                     className="bg-c-blue p-2 text-white rounded-md mt-2 duration-150 hover:bg-blue-400 disabled:bg-blue-300"
                     disabled={isLoading}
                  >
                     <span>{isLoading ? "Signing in..." : "Sign in"}</span>
                  </button>
               </form>
               <Link
                  to="/forgot-password"
                  className="font-roboto mx-auto text-sm mt-4 hover:underline"
               >
                  Forgot Password?
               </Link>
            </div>
         </div>
      </div>
   );
};

export default AdminSignin;
