import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";

// pages
import AppSelectionPage from "./pages/AppSelectionPage";
import GuestAccess from "./pages/GuestAccess";
import NewUser from "./pages/NewUser";
import AdminPage from "./pages/AdminPage";
import ResetPassword from "./pages/ResetPassword";
import ForgotPassword from "./pages/ForgotPassword";

import { useTranslation } from "react-i18next";
import "./i18n";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { BUILD_INFO } from "./buildInfo";

// ✅ API wrapper that uses runtime config (public/config.json)
import { apiFetch } from "./apiFetch";

function OperatorUiRedirect() {
  useEffect(() => {
    // TODO: потім винесемо в config.json як operatorUiUrl
    window.location.href = "http://localhost:3003/";
  }, []);
  return null;
}

function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { t, i18n } = useTranslation();
  // eslint-disable-next-line
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const fmt = (iso) => {
    if (!iso || iso === "unknown") return "unknown";
    return new Date(iso).toLocaleString("uk-UA", { hour12: false });
  };

  useEffect(() => {
    const savedLanguage = localStorage.getItem("language");
    if (savedLanguage) i18n.changeLanguage(savedLanguage);
  }, [i18n]);

  useEffect(() => {
    console.log(
      "BUILD:",
      process.env.REACT_APP_VERSION,
      process.env.REACT_APP_GIT_SHA,
      process.env.REACT_APP_BUILD_TIME
    );
  }, []);

  const handleGuestAccess = () => {
    navigate("/guest-access");
  };

  const handleLogin = async () => {
    console.log("Відправляємо дані:", { username, password });

    try {
      // ✅ було: fetch("http://localhost:8000/api/custom-login/", ...)
      const response = await apiFetch("/api/custom-login/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("access_token", data.access);
        localStorage.setItem("refresh_token", data.refresh);

        const token = data.access;

        // ✅ було: fetch("http://localhost:8000/api/me/", ...)
        const profileResponse = await apiFetch("/api/me/", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!profileResponse.ok) {
          console.error("Помилка при отриманні профілю користувача");
          throw new Error("Error fetching user profile");
        }

        const profileData = await profileResponse.json();
        localStorage.setItem("user_id", profileData.id);

        // ✅ було: fetch("http://localhost:8000/api/allowed-apps/", ...)
        const rolesResponse = await apiFetch("/api/allowed-apps/", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!rolesResponse.ok) {
          throw new Error("Error fetching allowed apps");
        }

        const allowedApps = await rolesResponse.json();
        localStorage.setItem("allowed_apps", JSON.stringify(allowedApps));
        navigate("/app-selection");
        return;
      }

      if (response.status === 403) {
        console.log("користувач заблокований");
        toast.error(t("blocked_message"));
        return;
      }

      console.log("невірні логін чи пароль для авторизації");
      toast.error(t("unauthorized_message"));
    } catch (error) {
      console.log("невідома помилка авторизації", error);
      toast.error("An error occurred. Please try again later.");
    }
  };

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    localStorage.setItem("language", lng);
  };

  return (
    <div className="container">
      <div
        className="app-left-column"
        style={{ backgroundImage: "url('/Background.png')" }}
      >
        <img src="/logo.png" alt="Logo" className="logo" />
      </div>

      <div className="right-column">
        <div className="top-buttons">
          <button className="auth-button" onClick={handleGuestAccess}>
            {t("guest_access")}
          </button>

          <button className="auth-button" onClick={() => navigate("/forgot-password")}>
            {t("forgot_password")}
          </button>
        </div>

        <div className="auth-fields">
          <input
            type="text"
            placeholder="Username"
            className="auth-input"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="auth-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button className="auth-button" onClick={handleLogin}>
            {t("login")}
          </button>
        </div>

        <ToastContainer autoClose={5000} />

        <div className="language-select">
          <button className="auth-button" onClick={() => changeLanguage("en")}>
            English
          </button>
          <button className="auth-button" onClick={() => changeLanguage("uk")}>
            Українська мова
          </button>
        </div>

        <div style={{ opacity: 0.6, fontSize: 12 }}>
          {`Build: ${BUILD_INFO.version} | Built: ${fmt(BUILD_INFO.builtAt)} | Commit: ${BUILD_INFO.commit.slice(
            0,
            7
          )} (${fmt(BUILD_INFO.commitAt)})`}
        </div>
      </div>
    </div>
  );
}

function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />} />

        <Route path="/app-selection" element={<AppSelectionPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/guest-access" element={<GuestAccess />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/new-user" element={<NewUser />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/appselectionpage" element={<AppSelectionPage />} />

        <Route path="/operator-ui" element={<OperatorUiRedirect />} />
      </Routes>
    </Router>
  );
}

export default AppRouter;