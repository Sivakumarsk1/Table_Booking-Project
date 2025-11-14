import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import { ToastProvider } from "./context/ToastContext";
import { useAuthContext } from "./context/authContext";
import { ToastContainer } from "react-toastify";
import ProtectedRoute from "./components/admin/ProtectedRoute";

// Lazy load components
const Navbar = lazy(() => import("./components/Navbar"));
const Footer = lazy(() => import("./components/Footer"));
const Home = lazy(() => import("./pages/Home"));
const Signup = lazy(() => import("./pages/UserSignup"));
const UserSignIn = lazy(() => import("./pages/UserLogin"));
const SignIn = lazy(() => import("./pages/UserLogin"));
const Reservation = lazy(() => import("./pages/Reservation"));
const TableBooking = lazy(() => import("./pages/TableBooking"));
const AdminLogin = lazy(() => import("./pages/admin/AdminLogin"));
const AdminLayout = lazy(() => import("./components/admin/AdminLayout"));
const AdminDashboard = lazy(() => import("./pages/admin/AdminDashboard"));
const AdminReservations = lazy(() => import("./pages/admin/AdminReservations"));
const AdminTables = lazy(() => import("./pages/admin/AdminTables"));
const AddTime = lazy(() => import("./pages/admin/AdminTime"));
const AddFrozen = lazy(() => import("./pages/admin/AddFrozen"));
const UserOffers = lazy(() => import("./components/user/useroffer"));

// import AdminOffers from "./pages/admin/Adminoffer";

const AdminOffers = lazy(() => import("./pages/admin/Adminoffer"));

function App() {
  // Preloader component with pulsing 'Loading...' text
  const Preloader = () => (
    <div className="flex items-center justify-center h-screen">
      <h2 className="text-2xl font-bold animate-pulse text-primary">
        Loading...
      </h2>
    </div>
  );

  return (
    <ToastProvider>
      <useAuthContext>
        <Router>
          <div className="min-h-screen bg-dark text-white">
            <Suspense fallback={<Preloader />}>
              <Routes>
                {/* Public Routes */}
                <Route
                  path="/"
                  element={
                    <>
                      <Navbar />
                      <Home />
                      <Footer />
                    </>
                  }
                />
                <Route
                  path="/reservation"
                  element={
                    <>
                      <Navbar />
                      <Reservation />
                      <Footer />
                    </>
                  }
                />
                <Route
                  path="/userOffer"
                  element={
                    <>
                      <Navbar />
                      <UserOffers/>
                      <Footer />
                    </>
                  }
                />

                <Route
                  path="/table-booking"
                  element={
                    <>
                      <Navbar />
                      <TableBooking />
                      <Footer />
                    </>
                  }
                />
                <Route
                  path="/signup"
                  element={
                    <>
                      <Signup />
                    </>
                  }
                />
                <Route
                  path="/signin"
                  element={
                    <>
                      <UserSignIn />
                    </>
                  }
                />
                <Route
                  path="/signIn"
                  element={
                    <>
                      <SignIn />
                    </>
                  }
                />
                <Route path="/admin/login" element={<AdminLogin />} />

                {/* Protected Admin Routes */}
                <Route
                  path="/admin"
                  element={
                    <ProtectedRoute>
                      <AdminLayout />
                    </ProtectedRoute>
                  }
                >
                  <Route index element={<AdminDashboard />} />
                  <Route path="reservations" element={<AdminReservations />} />
                  <Route path="tables" element={<AdminTables />} />
                  <Route path="offers" element={<AdminOffers />} />
                  <Route path="timing" element={<AddTime />} />
                  <Route path="frozen" element={<AddFrozen />} />
                </Route>
              </Routes>
            </Suspense>

            {/* Toast Notification Container */}
            <ToastContainer />
          </div>
        </Router>
      </useAuthContext>
    </ToastProvider>
  );
}

export default App;
