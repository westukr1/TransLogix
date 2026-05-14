import React, { useEffect, useRef } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import { apiFetch } from "./apiFetch";

function Auth0LoginButton() {
  const { isAuthenticated, isLoading, loginWithRedirect, user } = useAuth0();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const auth0ExchangeStarted = useRef(false);

  useEffect(() => {
    const shouldExchangeAuth0Login =
      sessionStorage.getItem("auth0_login_pending") === "true";

    if (
      isLoading ||
      !isAuthenticated ||
      !user?.email ||
      !shouldExchangeAuth0Login ||
      auth0ExchangeStarted.current
    ) {
      return;
    }

    auth0ExchangeStarted.current = true;

    async function exchangeAuth0UserForDjangoJwt() {
      try {
        // Auth0 has authenticated the browser user. Now Django decides whether
        // that email belongs to a user allowed to work in this app.
        // TODO: send and validate the Auth0 ID token on Django before issuing
        // the existing Django JWT in production.
        const response = await apiFetch("/auth0-login/", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: user.email }),
        });

        const data = await response.json().catch(() => ({}));

        if (!response.ok) {
          sessionStorage.removeItem("auth0_login_pending");
          localStorage.removeItem("access_token");
          localStorage.removeItem("refresh_token");
          localStorage.removeItem("user_id");
          localStorage.removeItem("allowed_apps");
          toast.error(
            data.detail ||
              "У вас немає прав на роботу в додатку, зверніться до адміністратора."
          );
          return;
        }

        sessionStorage.removeItem("auth0_login_pending");
        localStorage.setItem("access_token", data.access);
        localStorage.setItem("refresh_token", data.refresh);
        localStorage.setItem("user_id", data.user_id);
        localStorage.setItem("allowed_apps", JSON.stringify(data.allowed_apps || {}));
        navigate("/app-selection");
      } catch {
        auth0ExchangeStarted.current = false;
        toast.error("Не вдалося перевірити права доступу. Спробуйте ще раз.");
      }
    }

    exchangeAuth0UserForDjangoJwt();
  }, [isAuthenticated, isLoading, navigate, user?.email]);

  const handleAuth0Login = () => {
    // Auth0 Universal Login flow: redirect the browser to Auth0, then return
    // to this React app. Existing username/password JWT login remains unchanged.
    sessionStorage.setItem("auth0_login_pending", "true");
    loginWithRedirect();
  };

  return (
    <div className="auth0-login-button-container">
      <button
        className="auth-button auth0-login-button"
        type="button"
        onClick={handleAuth0Login}
        disabled={isLoading}
      >
        {t("other_login_methods")}
      </button>

      {isAuthenticated && (
        <div style={{ opacity: 0.8, fontSize: 12, marginTop: 8 }}>
          <div>Auth0 authenticated: {String(isAuthenticated)}</div>
          <div>Auth0 user: {user?.email || "email not provided"}</div>
        </div>
      )}

      {/* TODO: Send an Auth0 access token to Django and exchange it for the existing Django JWT. */}
    </div>
  );
}

export default Auth0LoginButton;
