import React, { Component } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import Home from "./Home";
import Login from "./Login";
import Subscription from "./Subscription";
import Navbar from "./components/Navbar";
import { useAuth } from "./contexts/AuthContext";
import "./App.css";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: 24, color: "#fff", background: "#000" }}>
          <h1>Something went wrong.</h1>
          <pre style={{ whiteSpace: "pre-wrap" }}>
            {this.state.error?.toString()}
          </pre>
        </div>
      );
    }
    return this.props.children;
  }
}

function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>; // Or a proper loading spinner
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

function App() {
  const location = useLocation();
  const hideNavbar = location.pathname === "/login";
  const [searchQuery, setSearchQuery] = React.useState("");

  React.useEffect(() => {
    const params = new URLSearchParams(location.search);
    const q = params.get("q") || "";
    setSearchQuery(q);
  }, [location.search]);

  return (
    <>
      {!hideNavbar && (
        <Navbar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      )}
      <ErrorBoundary>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home searchQuery={searchQuery} />
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/subscription" element={<Subscription />} />
        </Routes>
      </ErrorBoundary>
    </>
  );
}

export default App;
