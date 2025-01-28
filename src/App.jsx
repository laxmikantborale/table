import SingleSelect from "./components/SingleSelect";
import MultiSelect from "./components/MultiSelect";
import { useForm, useFieldArray } from "react-hook-form";
import { useState } from "react";

function App() {

  //useForm and  useFieldArray to add rows to table

  const { control } = useForm({
    defaultValues: {
      rows: [{ singleSelect: null, multiSelect: [] }, { singleSelect: null, multiSelect: [] }], // Initial rows
    },
  });


  const { fields, append } = useFieldArray({
    control,
    name: "rows",
  });

  // State to track selected values for SingleSelects
  const [selectedValues, setSelectedValues] = useState([]);

  // Handle changes to SingleSelect
  const handleSingleSelectChange = (index, selectedOption) => {
    const updatedValues = [...selectedValues];
    updatedValues[index] = selectedOption;
    setSelectedValues(updatedValues);
  };

  // Highlight unavailable options dynamically
  const countries = ["India", "USA", "China", "Japan", "UK", "Russia"];
  const getOptionStatus = (option, index) => {
    const isSelectedInOtherRow = selectedValues.includes(option) && selectedValues[index] !== option;
    return isSelectedInOtherRow ? "unavailable" : "available";
  };

  return (
    <div className="main">
      <div className="table-container">
      <table>
        <thead>
          <tr>
            <th style={{ width: "40%" }}>Label 1</th>
            <th style={{ width: "60%" }}>Label 2</th>
          </tr>
        </thead>
        <tbody>
          {fields.map((field, index) => (
            <tr key={field.id} style={{ height: "120px" }}>
              <td>
                <div className="select-container">
                  <SingleSelect
                    options={countries}
                    placeholder="Select a country"
                    optionStatus={(option) => getOptionStatus(option, index)} // Pass option status
                    onChange={(selectedOption) =>
                      handleSingleSelectChange(index, selectedOption)
                    }
                  />
                </div>
              </td>
              <td>
                <div className="select-container">
                  <MultiSelect options={countries} add_item={index === 0 ? false : true} />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button
        type="button"
        className="add_row_btn"
        onClick={() =>
          append({ singleSelect: null, multiSelect: [] }) // Add a new row
        }
      >
        + Add New Row
      </button>
      </div>
     
    </div>
  );
}

export default App;
