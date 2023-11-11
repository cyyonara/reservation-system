import { Navigate } from "react-router-dom";
import { useAuthStore } from "../../zustand-store/authStore";

type Props = { children: React.JSX.Element };

const Protected: React.FC<Props> = ({ children }: Props) => {
   const { user } = useAuthStore();

   if (!user) return <Navigate to="/sign-in" />;

   return <>{children}</>;
};

export default Protected;
