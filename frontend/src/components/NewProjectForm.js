import React, { useState } from "react";
import axios from "axios";
import {
  ProjectID,
  TransactionTypeDropdown,
  IndustryDropdown,
  DealStageDropdown,
  ProjectedClosingDate,
  ProjectName,
  CompanyName,
  Borrower,
  CompanyDescription,
  ProductsAndServices,
  AssetManager,
  FYE,
  Commitment,
  TTM,
} from "./NewProjectComponents";

const NewProjectForm = ({ onTtmValueChange }) => {
  const [formData, setFormData] = useState({
    project_name: "",
    company_name: "",
    primary_borrower: "",
    company_description: "",
    products_services: "",
    asset_manager: "",
    transaction_type: "",
    deal_stage: "",
    industry: "",
    FYE_date: "",
    TTM_date: "",
    projected_close_date: "",
    projectId: "",
    proposed_commitment: "",
  });

  const handleChange = (field, value) => {
    const updatedFormData = {
      ...formData,
      [field]: value,
    };

    setFormData(updatedFormData);

    // Store all form data in local storage
    localStorage.setItem("newProjectFormData", JSON.stringify(updatedFormData));
  };

  const handleSave = async () => {
    try {
      let formattedDate = formData.projected_close_date;
      if (formattedDate) {
        const date = new Date(formData.projected_close_date);
        if (isNaN(date.getTime())) {
          throw new Error("Invalid date format for projected_close_date");
        }
        formattedDate = date.toISOString().split("T")[0];
      }

      const projectId = formData.projectId ? Number(formData.projectId) : null;
      if (formData.projectId && isNaN(projectId)) {
        throw new Error("Invalid project ID. It must be a number.");
      }

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

  const generateProjectId = () => {
    const newProjectId = Math.floor(100000 + Math.random() * 900000); // Generate a 6-digit random number
    setFormData((prevFormData) => ({
      ...prevFormData,
      projectId: newProjectId.toString(),
    }));
  };

  return (
    <div>
      <div className="flex-container">
        <ProjectName
          value={formData.project_name}
          onChange={(value) => handleChange("project_name", value)}
        />
        <CompanyName
          value={formData.company_name}
          onChange={(value) => handleChange("company_name", value)}
        />
        <Borrower
          value={formData.primary_borrower}
          onChange={(value) => handleChange("primary_borrower", value)}
        />
      </div>
      <div className="sub-flex-container">
        <CompanyDescription
          value={formData.company_description}
          onChange={(value) => handleChange("company_description", value)}
        />
        <ProductsAndServices
          value={formData.products_services}
          onChange={(value) => handleChange("products_services", value)}
        />
        <AssetManager
          value={formData.asset_manager}
          onChange={(value) => handleChange("asset_manager", value)}
        />
      </div>
      <div className="sub-flex-container-2">
        <TransactionTypeDropdown
          value={formData.transaction_type}
          onChange={(value) => handleChange("transaction_type", value)}
        />
        <DealStageDropdown
          value={formData.deal_stage}
          onChange={(value) => handleChange("deal_stage", value)}
        />
        <IndustryDropdown
          value={formData.industry}
          onChange={(value) => handleChange("industry", value)}
        />
      </div>
      <div className="sub-flex-container-3">
        <FYE
          value={formData.FYE_date}
          onChange={(value) => handleChange("FYE_date", value)}
        />
        <TTM
          value={formData.TTM_date}
          onChange={(value) => handleChange("TTM_date", value)}
        />
        <ProjectedClosingDate
          value={formData.projected_close_date}
          onChange={(value) => handleChange("projected_close_date", value)}
        />
      </div>
      <div className="sub-flex-container-4">
        <div className="project-id-container">
          <ProjectID
            value={formData.projectId}
            onChange={(value) => handleChange("projectId", value)}
          />
        </div>
        <button className="generate-id-button" onClick={generateProjectId}>
          Generate Project ID
        </button>
        <Commitment
          className="proposed-commitment-textbox"
          value={formData.proposed_commitment}
          onChange={(value) => handleChange("proposed_commitment", value)}
        />
      </div>
      <div className="save-button-container">
        <button onClick={handleSave}>Save Project</button>
      </div>
    </div>
  );
};

export default NewProjectForm;