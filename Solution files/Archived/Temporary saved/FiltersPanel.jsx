import React from 'react';

const FiltersPanel = ({
    filters,
    setFilters,
    searchQuery,
    setSearchQuery,
    handleStartDateChange,
    handleEndDateChange,
    handleAllowExtendedIntervalChange,
    handleAllowMixedDirectionsChange,
    handleShowIncludedChange,
    handleShowInRouteChange,
    handleOnlyActiveChange,
    handleDirectionChange,
    fetchFilters,
    clearSavedFilters,
    directionFilter,
    t
}) => {
    return (
        <div>
            {/* Кнопки для оновлення та очищення фільтрів */}
            <button className="nav-button" onClick={fetchFilters}>
                🔄 {t("Update Filters")}
            </button>
            <button onClick={clearSavedFilters} className="nav-button">
                {t("clear_filters")}
            </button>

            {/* Блок фільтрів */}
            <div className="filter-container">
                <label>{t("start_time")}</label>
                <input
                    type="datetime-local"
                    value={filters.start_date ? new Date(filters.start_date).toISOString().slice(0, 16) : ""}
                    onChange={(e) => handleStartDateChange(new Date(e.target.value))}
                    className="form-control"
                />

                <label>{t("end_time")}</label>
                <input
                    type="datetime-local"
                    value={filters.end_date ? new Date(filters.end_date).toISOString().slice(0, 16) : ""}
                    onChange={(e) => handleEndDateChange(new Date(e.target.value))}
                    className="form-control"
                    disabled={!filters.allow_extended_interval}
                />

                <input
                    type="text"
                    placeholder={t("Search...")}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="form-control"
                    style={{ marginBottom: "10px" }}
                />

                <label>
                    <input
                        type="checkbox"
                        checked={filters.allow_extended_interval}
                        onChange={handleAllowExtendedIntervalChange}
                    />
                    {t("allow_extended_interval")}
                </label>

                <label>
                    <input
                        type="checkbox"
                        checked={filters.allow_mixed_directions}
                        onChange={handleAllowMixedDirectionsChange}
                    />
                    {t("allow_mixed_directions")}
                </label>

                <label>
                    <input
                        type="checkbox"
                        checked={filters.show_included}
                        onChange={handleShowIncludedChange}
                    />
                    {t("show_included_in_list")}
                </label>

                <label>
                    <input
                        type="checkbox"
                        checked={filters.show_in_route}
                        onChange={handleShowInRouteChange}
                    />
                    {t("show_included_in_route")}
                </label>

                <label>
                    <input
                        type="checkbox"
                        checked={filters.onlyActive}
                        onChange={handleOnlyActiveChange}
                    />
                    {t("is_active_only")}
                </label>

                {/* Фільтр за напрямком */}
                <div className="filters">
                    <label>
                        <input
                            type="radio"
                            name="directionFilter"
                            checked={directionFilter === "WORK_TO_HOME"}
                            onChange={() => handleDirectionChange("WORK_TO_HOME")}
                        />
                        {t("to_home")}
                    </label>

                    <label>
                        <input
                            type="radio"
                            name="directionFilter"
                            checked={directionFilter === "HOME_TO_WORK"}
                            onChange={() => handleDirectionChange("HOME_TO_WORK")}
                        />
                        {t("to_work")}
                    </label>

                    {filters.allow_mixed_directions && (
                        <label>
                            <input
                                type="radio"
                                name="directionFilter"
                                checked={directionFilter === "ALL"}
                                onChange={() => handleDirectionChange("ALL")}
                            />
                            {t("show_all_requests")}
                        </label>
                    )}
                </div>
            </div>
        </div>
    );
};

export default FiltersPanel;

