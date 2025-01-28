import React, { useState, useRef, useEffect } from "react";
import "../css/MultiSelect.css"
import { ToastContainer, toast } from 'react-toastify';


const MultiSelect = ({ options, placeholder = "Select an option", add_item }) => {
  const [dropdownOptions, setDropdownOptions] = useState(options)
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [newItem, setNewItem] = useState()
  const dropdownRef = useRef(null);

  const notify = () =>
    toast("New option added", {
      position: "top-right", // You can customize the position
      autoClose: 3000, // Time in milliseconds (e.g., 5000ms = 5 seconds)
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      style: {
        backgroundColor: "#4CAF50", // Set background color (e.g., green)
        color: "white", // Set text color
      },
    });


  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  const handleOptionClick = (option) => {
    if (selectedOptions.includes(option)) {
      setSelectedOptions(selectedOptions.filter((item) => item !== option));
    } else {
      setSelectedOptions([...selectedOptions, option]);
    }
  };

  const handleRemoveOption = (optionToRemove) => {
    setSelectedOptions(selectedOptions.filter((option) => option !== optionToRemove));
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Check if the click is outside the dropdown container
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  //add new item
  const addNewItem = () => {
    if (newItem) {
      setDropdownOptions([...dropdownOptions, newItem])
      setNewItem("");
      notify()
    }
  }


  return (
    <div className="multi-select-container" ref={dropdownRef}>
      {/* Display Selected Options */}
      <div className="multi-select-input" onClick={toggleDropdown}>
        {selectedOptions.length === 0 ? (
          <span className="placeholder">Select options...</span>
        ) : (<div style={{display:"flex", gap:5}}>
          {
            selectedOptions.map((option, index) => (
              <div key={index} className="selected-option">
                {option}
                <span
                  className="remove-icon"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemoveOption(option);
                  }}
                >
                  ✖
                </span>
              </div>
            ))
          }
        </div>

        )}
        <span className={`arrow ${isDropdownOpen ? "open" : ""}`}><i className="fa-solid fa-chevron-down"></i></span>
      </div>

      {/* Dropdown Options with Checkboxes */}
      {isDropdownOpen && (
        <div className="multi-select-dropdown">
          <div className="scrollable-dropdown">
            {dropdownOptions.map((option, index) => (
              <span key={index} className="multi-select-option">
                <label className="option-label">
                  <input
                    type="checkbox"
                    checked={selectedOptions.includes(option)}
                    onChange={() => handleOptionClick(option)}
                  />
                  <span
                    className="checkbox-label"
                  >
                    {option}
                  </span>
                </label>
              </span>
            ))}
          </div>
          {/* <hr/> */}
          {add_item && <div className="multi-select-add-option">
            <input
              type="text"
              placeholder="Add new option"
              value={newItem}
              onChange={(e) => setNewItem(e.target.value)}
              className="add-option-input"
            />
            <button className="add-option-button" onClick={addNewItem}>
              + Add
            </button>
          </div>}
        </div>
      )}
      <ToastContainer />
    </div>
  );
};

export default MultiSelect;
