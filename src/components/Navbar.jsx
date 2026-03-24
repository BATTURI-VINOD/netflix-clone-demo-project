import { useEffect, useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useTheme } from "../contexts/ThemeContext";

function Navbar({ searchQuery, setSearchQuery }) {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showComingSoon, setShowComingSoon] = useState(false);
  const searchInputRef = useRef(null);
  const navigate = useNavigate();

  const handleSearch = () => {
    const query = searchQuery.trim();
    if (query) {
      setSearchQuery(query);
      navigate(`/?q=${encodeURIComponent(query)}`);
    } else {
      setSearchQuery("");
      navigate("/");
    }
  };
  const location = useLocation();
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();

  const isHomePage = location.pathname === "/";

  useEffect(() => {
    // Listen for coming soon event
    const handleComingSoon = () => setShowComingSoon(true);
    window.addEventListener("showComingSoon", handleComingSoon);

    return () => {
      window.removeEventListener("showComingSoon", handleComingSoon);
    };
  }, []);

  return (
    <>
      <div className="navbar navbar__black">
        <div
          className="navbar__logoContainer"
          onClick={() => {
            navigate("/");
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        >
          <img
            className="navbar__logo"
            src="https://assets.nflxext.com/us/ffe/siteui/common/icons/nficon2016.png"
            alt="Netflix Logo"
          />
          {user && (
            <span
              style={{
                color: "white",
                fontSize: "14px",
                marginTop: "2px",
                fontWeight: "600",
              }}
            >
              Welcome{user.email ? `, ${user.email.split("@")[0]}` : ""}
            </span>
          )}
        </div>

        <div className="navbar__search">
          <div className="navbar__searchContainer">
            <span className="navbar__searchIcon" onClick={handleSearch}>
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M21 21L16.5 16.5M19 11C19 15.4183 15.4183 19 11 19C6.58172 19 3 15.4183 3 11C3 6.58172 6.58172 3 11 3C15.4183 3 19 6.58172 19 11Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            <input
              ref={searchInputRef}
              type="text"
              placeholder="Search movies..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSearch();
                  setTimeout(() => {
                    window.scrollTo({
                      top: document.body.scrollHeight,
                      behavior: "smooth",
                    });
                  }, 50);
                }
              }}
              className="navbar__searchInput"
            />
            {searchQuery && (
              <span
                className="navbar__clearIcon"
                onClick={() => {
                  setSearchQuery("");
                  navigate("/");
                  searchInputRef.current?.focus();
                }}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M18 6L6 18M6 6L18 18"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            )}
          </div>
        </div>

        <div className="navbar__actions">
          <button
            className="navbar__subscribe"
            onClick={() => navigate("/subscription")}
          >
            Subscribe
          </button>
          {user && (
            <button
              className="navbar__signout"
              onClick={() => {
                logout();
                navigate("/login");
              }}
            >
              Sign Out
            </button>
          )}
          <button className="navbar__theme" onClick={toggleTheme}>
            {theme === "dark" ? "☀️" : "🌙"}
          </button>

          <div
            className="navbar__profile"
            onClick={() => setShowProfileMenu(!showProfileMenu)}
          >
            <img
              className="navbar__avatar"
              src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"
              alt="Profile Avatar"
            />
            {showProfileMenu && (
              <div className="profile__dropdown">
                <div
                  className="profile__item"
                  onClick={() => setShowComingSoon(true)}
                >
                  Account
                </div>
                <div
                  className="profile__item"
                  onClick={() => setShowComingSoon(true)}
                >
                  Settings
                </div>
                <div
                  className="profile__item"
                  onClick={() => setShowComingSoon(true)}
                >
                  Help Center
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {showComingSoon && (
        <div className="coming-soon-modal">
          <div className="coming-soon-content">
            <h3>This Feature will be available soon</h3>
            <button
              className="coming-soon-close"
              onClick={() => setShowComingSoon(false)}
            >
              OK
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default Navbar;
