import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import NewProjectForm from "./components/NewProjectForm";

const SaveProjectApp = () => {
  const [saveTriggered, setSaveTriggered] = useState(false);

  const handleSave = () => {
    console.log("Save Project button clicked!");
    setSaveTriggered(true);
    // Add additional save logic here
  };

  React.useEffect(() => {
    const saveButton = document.getElementById("save-project-button");
    if (saveButton) {
      saveButton.addEventListener("click", handleSave);
    }
    return () => {
      if (saveButton) {
        saveButton.removeEventListener("click", handleSave);
      }
    };
  }, []);

  return <NewProjectForm saveTriggered={saveTriggered} />;
};

document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("root");
  if (container && (container.nodeType === 1 || container.nodeType === 9 || container.nodeType === 11)) {
    const root = createRoot(container);
    root.render(<SaveProjectApp />);
  } else {
    console.error("Invalid or missing container element for createRoot.");
  }
});