import React, { useState, useRef, useEffect } from "react";
import "../css/SingleSelect.css";

const SingleSelect = ({ options, placeholder = "Select an option", onChange, optionStatus }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(null);
  const dropdownRef = useRef(null);

  // Toggle dropdown open/close
  const toggleDropdown = () => setIsOpen(!isOpen);

  // Handle option click
  const handleOptionClick = (option, isAvailable) => {
    if (!isAvailable) return; // Prevent clicking unavailable options
    setSelectedValue(option);
    setIsOpen(false);
    if (onChange) onChange(option);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className="custom-select" ref={dropdownRef}>
      <div className="custom-select-header" onClick={toggleDropdown}>
        <span>
          {selectedValue ? (
            <div className="selected-option">
              {selectedValue}
              <span
                className="remove-icon"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedValue(null);
                  if (onChange) onChange(null);
                }}
              >
                ✖
              </span>
            </div>
          ) : (
            placeholder
          )}
        </span>
        <span className={`arrow ${isOpen ? "open" : ""}`}>
          <i className="fa-solid fa-chevron-down"></i>
        </span>
      </div>
      {isOpen && (
        <ul className="custom-select-dropdown">
          {options.map((option) => {
            const isAvailable = optionStatus(option) !== "unavailable";
            return (
              <li
                key={option}
                className={`custom-select-option ${!isAvailable ? "unavailable" : ""}`}
                style={{
                  opacity: isAvailable ? 1 : 0.5,
                  pointerEvents: isAvailable ? "auto" : "none",
                }}
                onClick={() => handleOptionClick(option, isAvailable)}
              >
                {option}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default SingleSelect;
