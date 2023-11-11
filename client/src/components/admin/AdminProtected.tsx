import { Navigate } from "react-router-dom";
import { useAdminAuthStore } from "../../zustand-store/adminAuthStore";

type Props = { children: React.JSX.Element };

const AdminProtected: React.FC<Props> = ({ children }: Props): JSX.Element => {
   const { c_admin } = useAdminAuthStore();

   if (!c_admin) return <Navigate to="/admin/sign-in" />;

   return <>{children}</>;
};

export default AdminProtected;
