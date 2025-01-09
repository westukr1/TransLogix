import React, { useState, useEffect } from "react";
// eslint-disable-next-line
import axios from "axios";
import "./AdminPage.css";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { FaFilter, FaUndo, FaSave, FaCheck } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AdminPage = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [filters, setFilters] = useState({
    logisticOperator: false,
    financialManager: false,
    admin: false,
    isStaff: false,
    isSuperuser: false,
    blocked: false,
  });
  const [searchTerms, setSearchTerms] = useState({
    username: "",
    fullName: "",
    email: "",
  });

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/user-list/", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setUsers(data);
          setFilteredUsers(data);
        } else {
          console.error("Error fetching users:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  const handleAdminPanelRedirect = () => {
    window.location.href =
      "http://localhost:8000/admin/TransLogix_djangoProject/user/";
  };

  const handleCreateNewUser = () => {
    navigate("/new-user");
  };

  const handleFilterChange = (filterName) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterName]: !prevFilters[filterName],
    }));
  };

  useEffect(() => {
    const applyFilters = () => {
      let updatedUsers = users;

      if (filters.logisticOperator) {
        updatedUsers = updatedUsers.filter((user) => user.is_logistic_operator);
      }
      if (filters.financialManager) {
        updatedUsers = updatedUsers.filter((user) => user.is_financial_manager);
      }
      if (filters.admin) {
        updatedUsers = updatedUsers.filter((user) => user.is_admin);
      }
      if (filters.isStaff) {
        updatedUsers = updatedUsers.filter((user) => user.is_staff);
      }
      if (filters.isSuperuser) {
        updatedUsers = updatedUsers.filter((user) => user.is_superuser);
      }
      if (filters.blocked) {
        updatedUsers = updatedUsers.filter((user) => user.blocked);
      }

      // Пошук по полях
      updatedUsers = updatedUsers.filter(
        (user) =>
          user.username
            .toLowerCase()
            .includes(searchTerms.username.toLowerCase()) &&
          user.first_name
            .toLowerCase()
            .includes(searchTerms.fullName.toLowerCase()) &&
          user.email.toLowerCase().includes(searchTerms.email.toLowerCase())
      );

      setFilteredUsers(updatedUsers);
    };

    applyFilters();
  }, [filters, users, searchTerms]);

  const resetFilters = () => {
    setFilters({
      logisticOperator: false,
      financialManager: false,
      admin: false,
      isStaff: false,
      isSuperuser: false,
      blocked: false,
    });
    setSearchTerms({
      username: "",
      fullName: "",
      email: "",
    });
    setFilteredUsers(users);
  };

  const handleSave = async () => {
    // console.log('Users being sent to backend:', JSON.stringify(users)); // Логування даних перед відправкою
    // console.log(users); // Перевірка: виводимо в консоль усіх користувачів перед відправкою
    try {
      const response = await fetch("http://localhost:8000/api/user-update/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
        body: JSON.stringify(
          users.map((user) => ({
            ...user,
            is_blocked: user.is_blocked,
            is_logistic_operator: user.is_logistic_operator, // Відправляємо поле "is_logistic_operator"
            is_financial_manager: user.is_financial_manager, // Відправляємо поле "is_financial_manager"
            is_admin: user.is_admin, // Відправляємо поле "is_admin"
            is_staff: user.is_staff, // Відправляємо поле "is_staff"
            is_superuser: user.is_superuser, // Відправляємо поле "is_superuser"
          }))
        ), // Дані, які потрібно відправити
      });

      if (response.ok) {
        // Виведення відповіді від сервера
        // eslint-disable-next-line
        const data = await response.json();
        // console.log('Response data from server:', data);

        // Якщо запит успішний, отримуємо оновлений список користувачів
        const updatedUsersResponse = await fetch(
          "http://localhost:8000/api/user-list/",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
          }
        );

        const updatedUsersData = await updatedUsersResponse.json();
        // console.log('Updated users data:', updatedUsersData); // Логування для перевірки отриманих даних

        // Оновлюємо стан користувачів з отриманих даних
        setUsers((prevUsers) => {
          return prevUsers.map((prevUser) => {
            const updatedUser = updatedUsersData.find(
              (user) => user.username === prevUser.username
            );
            return updatedUser
              ? { ...prevUser, is_blocked: updatedUser.is_blocked }
              : prevUser;
          });
        });

        toast.success(t("changes_saved_successfully")); // Показуємо сповіщення про успішне збереження
      } else {
        toast.error(t("failed_to_save_changes")); // Сповіщення про помилку
      }
    } catch (error) {
      toast.error(t("failed_to_save_changes")); // Сповіщення про помилку
    }
  };
  const handleFieldChange = (username, field) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.username === username ? { ...user, [field]: !user[field] } : user
      )
    );
  };

  const handleSearch = (e, field) => {
    setSearchTerms((prev) => ({ ...prev, [field]: e.target.value }));
  };

  return (
    <div className="two-column-template">
      <div className="top-nav-bar">
        <div className="logo">
          <img src="/logo.png" alt="NextPointLogix" />
        </div>

        <div className="nav-buttons">
          <button
            className="nav-button"
            onClick={() => navigate("/appselectionpage")}
          >
            {t("back")}
          </button>
        </div>
      </div>
      <div className="template2s-content">
        <div className="template2s-left-column">
          <h3>{t("admin_tools")}</h3>

          <button className="ap-auth-button" onClick={handleCreateNewUser}>
            {t("create_new_user")}
          </button>
          <button className="ap-auth-button" onClick={handleAdminPanelRedirect}>
            {t("manage_users")}
          </button>
          <button className="ap-auth-button">{t("view_logs")}</button>
          <button className="ap-auth-button">{t("system_settings")}</button>
          <button className="ap-auth-button">{t("permissions")}</button>
        </div>
        <div className="ap-template2s-right-column">
          <div className="ap-template2s-upper-right">
            <h3>{t("user_list")}</h3>
            <div className="ap-button-container">
              <button className="ap-save-button" onClick={handleSave}>
                <FaSave /> {t("save")}
              </button>
              <button className="filter-reset-button" onClick={resetFilters}>
                <FaUndo /> {t("reset_filters")}
              </button>
            </div>
            <div className="user-table">
              <table>
                <thead>
                  <tr>
                    <th>
                      {t("username")}
                      <input
                        type="text"
                        placeholder="Search"
                        onChange={(e) => handleSearch(e, "username")}
                        value={searchTerms.username}
                      />
                    </th>
                    <th>
                      {t("full_name")}
                      <input
                        type="text"
                        placeholder="Search"
                        onChange={(e) => handleSearch(e, "fullName")}
                        value={searchTerms.fullName}
                      />
                    </th>
                    <th>
                      {t("email")}
                      <input
                        type="text"
                        placeholder="Search by email"
                        onChange={(e) => handleSearch(e, "email")}
                        value={searchTerms.email}
                      />
                    </th>
                    <th>
                      {t("logistics_operator")}
                      {filters.logisticOperator ? (
                        <FaCheck
                          onClick={() => handleFilterChange("logisticOperator")}
                          style={{ color: "darkgreen" }}
                        />
                      ) : (
                        <FaFilter
                          onClick={() => handleFilterChange("logisticOperator")}
                          style={{ color: "inherit" }}
                        />
                      )}
                    </th>
                    <th>
                      {t("financial_manager")}
                      {filters.financialManager ? (
                        <FaCheck
                          onClick={() => handleFilterChange("financialManager")}
                          style={{ color: "darkgreen" }}
                        />
                      ) : (
                        <FaFilter
                          onClick={() => handleFilterChange("financialManager")}
                          style={{ color: "inherit" }}
                        />
                      )}
                    </th>
                    <th>
                      {t("admin")}
                      {filters.admin ? (
                        <FaCheck
                          onClick={() => handleFilterChange("admin")}
                          style={{ color: "darkgreen" }}
                        />
                      ) : (
                        <FaFilter
                          onClick={() => handleFilterChange("admin")}
                          style={{ color: "inherit" }}
                        />
                      )}
                    </th>
                    <th>
                      {t("is_staff")}
                      {filters.isStaff ? (
                        <FaCheck
                          onClick={() => handleFilterChange("isStaff")}
                          style={{ color: "darkgreen" }}
                        />
                      ) : (
                        <FaFilter
                          onClick={() => handleFilterChange("isStaff")}
                          style={{ color: "inherit" }}
                        />
                      )}
                    </th>
                    <th>
                      {t("is_superuser")}
                      {filters.isSuperuser ? (
                        <FaCheck
                          onClick={() => handleFilterChange("isSuperuser")}
                          style={{ color: "darkgreen" }}
                        />
                      ) : (
                        <FaFilter
                          onClick={() => handleFilterChange("isSuperuser")}
                          style={{ color: "inherit" }}
                        />
                      )}
                    </th>
                    <th>
                      {t("blocked")}
                      {filters.blocked ? (
                        <FaCheck
                          onClick={() => handleFilterChange("blocked")}
                          style={{ color: "darkgreen" }}
                        />
                      ) : (
                        <FaFilter
                          onClick={() => handleFilterChange("blocked")}
                          style={{ color: "inherit" }}
                        />
                      )}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((user) => (
                    <tr key={user.username}>
                      <td>{user.username}</td>
                      <td>{user.first_name || "--"}</td>
                      <td>{user.email || "--"}</td>
                      <td>
                        <input
                          type="checkbox"
                          checked={user.is_logistic_operator || false}
                          onChange={() =>
                            handleFieldChange(
                              user.username,
                              "is_logistic_operator"
                            )
                          }
                        />
                      </td>
                      <td>
                        <input
                          type="checkbox"
                          checked={user.is_financial_manager || false}
                          onChange={() =>
                            handleFieldChange(
                              user.username,
                              "is_financial_manager"
                            )
                          }
                        />
                      </td>
                      <td>
                        <input
                          type="checkbox"
                          checked={user.is_admin || false}
                          onChange={() =>
                            handleFieldChange(user.username, "is_admin")
                          }
                        />
                      </td>
                      <td>
                        <input
                          type="checkbox"
                          checked={user.is_staff || false}
                          onChange={() =>
                            handleFieldChange(user.username, "is_staff")
                          }
                        />
                      </td>
                      <td>
                        <input
                          type="checkbox"
                          checked={user.is_superuser || false}
                          onChange={() =>
                            handleFieldChange(user.username, "is_superuser")
                          }
                        />
                      </td>

                      <td>
                        <input
                          type="checkbox"
                          checked={user.is_blocked || false}
                          onChange={() =>
                            handleFieldChange(user.username, "is_blocked")
                          }
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="template2s-lower-right">
            <h2>{t("other_info")}</h2>
            <p>{t("other_info_details")}</p>
          </div>
        </div>
        <ToastContainer />
      </div>
    </div>
  );
};

export default AdminPage;
