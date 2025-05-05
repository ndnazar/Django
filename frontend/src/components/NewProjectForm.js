import React, { useState } from "react";
import axios from "axios";
import MultilineTextBox from "./MultilineTextBox";
import ProjectID from "./ProjectID";
import TransactionTypeDropdown from "./TransactionTypeDropdown";
import IndustryDropdown from "./IndustryDropdown";
import DealStageDropdown from "./DealStageDropdown";
import ProjectedClosingDate from "./ProjectedClosingDate";

const NewProjectForm = () => {
  const [formData, setFormData] = useState({
    project_name: "", // Added
    industry: "",
    transaction_type: "", // Renamed
    deal_stage: "",
    projected_close_date: "", // Renamed
    projectId: "",
  });

  const handleChange = (field, value) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [field]: value,
    }));
  };

  const handleSave = async () => {
    try {
      // Validate and format projected_close_date
      let formattedDate = formData.projected_close_date;
      if (formattedDate) {
        const date = new Date(formData.projected_close_date);
        if (isNaN(date.getTime())) {
          throw new Error("Invalid date format for projected_close_date");
        }
        formattedDate = date.toISOString().split("T")[0];
      }

      // Validate and convert projectId
      const projectId = formData.projectId ? Number(formData.projectId) : null;
      if (formData.projectId && isNaN(projectId)) {
        throw new Error("Invalid project ID. It must be a number.");
      }

      // Ensure required fields are not blank
      const requiredFields = ["industry", "transaction_type", "deal_stage"];
      for (const field of requiredFields) {
        if (!formData[field]) {
          throw new Error(`The field "${field}" is required.`);
        }
      }

      const updatedFormData = {
        ...formData,
        projected_close_date: formattedDate,
        projectId: projectId,
      };

      const response = await axios.post("/api/projects/", updatedFormData);
      alert("Project saved successfully!");
    } catch (error) {
      if (error.response) {
        console.error("Server error:", error.response.data);
        alert(`Failed to save project: ${JSON.stringify(error.response.data)}`);
      } else if (error.message.startsWith("The field") || error.message.startsWith("Invalid")) {
        alert(`Failed to save project: ${error.message}`);
      } else {
        console.error("Error:", error.message);
        alert(`Failed to save project: ${error.message}`);
      }
    }
  };

  return (
    <div>
      <MultilineTextBox
        value={formData.project_name} // Updated
        onChange={(value) => handleChange("project_name", value)} // Updated
      />
      <ProjectID
        value={formData.projectId}
        onChange={(value) => handleChange("projectId", value)}
      />
      <TransactionTypeDropdown
        value={formData.transaction_type} // Updated
        onChange={(value) => handleChange("transaction_type", value)} // Updated
      />
      <IndustryDropdown
        value={formData.industry}
        onChange={(value) => handleChange("industry", value)}
      />
      <DealStageDropdown
        value={formData.deal_stage}
        onChange={(value) => handleChange("deal_stage", value)}
      />
      <ProjectedClosingDate
        value={formData.projected_close_date} // Updated
        onChange={(value) => handleChange("projected_close_date", value)} // Updated
      />
      <button onClick={handleSave}>Save Project</button>
    </div>
  );
};

export default NewProjectForm;