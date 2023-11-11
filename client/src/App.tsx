import { Routes, Route } from "react-router-dom";
import UserIndex from "./pages/user/UserIndex";
import UserSignIn from "./pages/user/UserSignIn";
import UserSignUp from "./pages/user/UserSignUp";
import UserAccountSetup from "./pages/user/UserAccountSetup";
import Home from "./pages/user/Home";
import AdminSignin from "./pages/admin/AdminSignin";
import Protected from "./components/user/Protected";
import Dashboard from "./pages/admin/Dashboard";
import AdminProtected from "./components/admin/AdminProtected";
import Services from "./pages/admin/Services";
import CreateService from "./pages/admin/CreateService";
import EditService from "./pages/admin/EditService";
import Messages from "./pages/admin/Messages";
import Chat from "./pages/admin/Chat";
import EmptySelectedMessage from "./components/admin/EmptySelectedMessage";
import ServicePreview from "./components/user/ServicePreview";
import Reservations from "./pages/user/Reservations";

const App: React.FC = (): React.JSX.Element => {
  return (
    <Routes>
      {/* Client Side */}
      <Route index element={<UserIndex />} />
      <Route path="/sign-in" element={<UserSignIn />} />
      <Route path="/sign-up" element={<UserSignUp />} />
      <Route path="/account/set-up" element={<UserAccountSetup />} />
      <Route
        path="/services"
        element={
          <Protected>
            <h1>Services</h1>
          </Protected>
        }
      />
      <Route
        path="/h"
        element={
          <Protected>
            <Home />
          </Protected>
        }
      />
      <Route
        path="/services/:serviceId"
        element={
          <AdminProtected>
            <ServicePreview />
          </AdminProtected>
        }
      ></Route>
      <Route path="reservations" element={<Reservations />} />
      {/* Admin Side */}
      <Route path="/admin/sign-in" element={<AdminSignin />} />
      <Route
        path="/admin/dashboard"
        element={
          <AdminProtected>
            <Dashboard />
          </AdminProtected>
        }
      />
      <Route
        path="/admin/services/*"
        element={
          <AdminProtected>
            <Services />
          </AdminProtected>
        }
      >
        <Route
          path="create"
          element={
            <AdminProtected>
              <CreateService />
            </AdminProtected>
          }
        />
      </Route>
      <Route
        path="/admin/services/:id/edit"
        element={
          <AdminProtected>
            <EditService />
          </AdminProtected>
        }
      />
      <Route
        path="/admin/messages/"
        element={
          <AdminProtected>
            <Messages />
          </AdminProtected>
        }
      >
        <Route index element={<EmptySelectedMessage />} />
        <Route
          path=":chatId"
          element={
            <AdminProtected>
              <Chat />
            </AdminProtected>
          }
        />
      </Route>
    </Routes>
  );
};

export default App;
