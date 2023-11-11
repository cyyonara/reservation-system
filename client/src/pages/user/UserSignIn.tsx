import UserRootLayout from "../../shared/layout/UserRootLayout";
import fbLogo from "../../assets/facebook.png";
import { useEffect, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router-dom";
import { google_auth } from "../../firebase-service/google-auth";
import { useGoogleSignIn } from "../../hooks/useGoogleSignIn";
import { useNavigate, Navigate } from "react-router-dom";
import { useAccountSetupStore } from "../../zustand-store/accountSetupStore";
import { UserCredential } from "firebase/auth";
import { useAuthStore } from "../../zustand-store/authStore";
import { useSignIn } from "../../hooks/useSignIn";
import { toast } from "sonner";

interface SignInInput {
  email: string;
  password: string;
}

const isUser = (user: UserCredential["user"] | Error): user is UserCredential["user"] => {
  return (user as UserCredential["user"]).email !== undefined;
};

const UserSignIn: React.FC = () => {
  const [signInForm, setSignInForm] = useState<SignInInput>({ email: "", password: "" });
  const { setCredential, user } = useAuthStore((state) => state);
  const { setAccountSetupForm } = useAccountSetupStore((state) => state);
  const signInWithGoogle = useGoogleSignIn();
  const signIn = useSignIn();
  const navigate = useNavigate();

  const onGoogleSignIn = async (): Promise<void> => {
    try {
      const g_user = await google_auth();
      if (isUser(g_user)) {
        signInWithGoogle.mutate(g_user, {
          onSuccess: (data) => {
            if ("email" in data) {
              setCredential(data);
            } else {
              setAccountSetupForm({
                email: g_user.email as string,
                name: g_user.displayName as string,
                avatar: g_user.photoURL as string,
              });
              navigate("/account/set-up");
            }
          },
        });
      } else {
        throw new Error();
      }
    } catch (err) {
      toast.error("Something went wrong", {
        position: "top-right",
        duration: 1500,
      });
    }
  };

  const onDirectSignIn = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    signIn.mutate(signInForm, {
      onSuccess: (data) => {
        toast.success(`Welcome back ${data.name}!`, {
          position: "top-right",
          duration: 2000,
        });
        setCredential(data);
      },
      onError: (err) => {
        toast.error(err.response?.data.message || "Something went wrong", {
          duration: 2000,
          position: "top-right",
        });
      },
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setSignInForm((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  useEffect(() => {
    document.title = "Sign In";
    window.scrollTo(0, 0);
  }, []);

  if (user) return <Navigate to="/h" />;

  return (
    <UserRootLayout>
      <main className="flex flex-1 relative">
        <section className="flex flex-col mx-auto mt-[80px] w-[80vw] max-w-[430px] z-10">
          <h1 className="text-2xl font-bold mb-6 text-center">Sign in to book now</h1>
          <div className="flex flex-col gap-4">
            <button
              className="border border-gray-300 hover:bg-gray-100 active:bg-gray-200 duration-50 p-[14px] rounded-full flex items-center justify-center gap-x-4"
              onClick={onGoogleSignIn}
            >
              <FcGoogle className="text-xl" />
              <span>Continue with Google</span>
            </button>
            <button className="border border-gray-300 hover:bg-gray-100 active:bg-gray-200 duration-50 p-[14px] rounded-full flex items-center justify-center gap-x-4">
              <img src={fbLogo} alt={fbLogo} className="w-[21px] h-[21px]" />
              <span>Continue with Facebook</span>
            </button>
          </div>
          <div className="flex items-center mt-4 mb-6 gap-x-2">
            <span className="h-[1px] flex-1 bg-gray-300"></span>
            <span className="text-gray-500 text-sm">or sign in with email</span>
            <span className="h-[1px] flex-1 bg-gray-300"></span>
          </div>
          <form className="flex flex-col gap-y-3" onSubmit={onDirectSignIn}>
            <div className="custom-input-container flex flex-col gap-y-1">
              <label htmlFor="email" className="text-lg font-semibold">
                Email
              </label>
              <span className="rounded-[13px] p-[3px] duration-150 hover:bg-blue-300 focus-within:bg-blue-200">
                <input
                  id="email"
                  type="text"
                  className="border-[2px] border-gray-300 relative w-full py-3 px-4 rounded-[10px] focus:outline-none focus:border-c-blue"
                  maxLength={50}
                  value={signInForm.email}
                  onChange={handleChange}
                  disabled={signIn.isLoading}
                />
              </span>
            </div>
            <div className="custom-input-container flex flex-col gap-y-1">
              <label htmlFor="password" className="text-lg font-semibold">
                Password
              </label>
              <span className="rounded-[13px] p-[3px] duration-150 hover:bg-blue-300 focus-within:bg-blue-200">
                <input
                  id="password"
                  type="password"
                  className="border-[2px] border-gray-300 relative w-full py-3 px-4 rounded-[10px] focus:outline-none focus:border-c-blue"
                  maxLength={50}
                  value={signInForm.password}
                  onChange={handleChange}
                  disabled={signIn.isLoading}
                />
              </span>
            </div>
            <button
              className="bg-c-blue rounded-full p-3 text-white mt-4 duration-150 hover:bg-blue-400 disabled:bg-c-blue/50 disabled:cursor-wait"
              disabled={signIn.isLoading}
            >
              Sign in
            </button>
          </form>
          <p className="mt-4 text-sm text-center">
            Don't have an account?{" "}
            <span className="text-c-blue hover:underline">
              <Link to="/sign-up">Sign up</Link>
            </span>
          </p>
        </section>
        <svg
          className="absolute bottom-0 wave-svg"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
        >
          <path
            fill="#0099ff"
            fillOpacity="1"
            d="M0,160L48,186.7C96,213,192,267,288,256C384,245,480,171,576,170.7C672,171,768,245,864,256C960,267,1056,213,1152,192C1248,171,1344,181,1392,186.7L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>
      </main>
    </UserRootLayout>
  );
};

export default UserSignIn;
