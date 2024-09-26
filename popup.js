document.addEventListener("DOMContentLoaded", () => {
  // Load resumes into the select dropdown when the popup opens
  const resumes = JSON.parse(localStorage.getItem("resumes")) || [];
  const resumeSelect = document.getElementById("resumeSelect");

  console.log("Loaded Resumes:", resumes);

  resumes.forEach((resume) => {
    const option = document.createElement("option");
    option.value = resume.file; // Store base64 data as value
    option.textContent = resume.tag; // Display tag
    resumeSelect.appendChild(option);
  });

  const sendButton = document.getElementById("sendButton");
  console.log("Send Button Element:", sendButton);

  if (sendButton) {
    sendButton.addEventListener("click", async () => {
      const email = document.getElementById("email").value;
      const name = document.getElementById("name").value;
      const position = document.getElementById("position").value;
      const company = document.getElementById("company").value;
      const selectedResume = resumeSelect.value;

      console.log("Sending email with the following details:", {
        email,
        name,
        position,
        company,
        selectedResume,
      });

      if (!email || !name || !position || !company) {
        alert("Please fill all the fields.");
        return;
      }

      const formData = new FormData();
      formData.append("email", email);
      formData.append("name", name);
      formData.append("position", position);
      formData.append("company", company);

      if (selectedResume) {
        formData.append("resume", selectedResume); // Send base64 data
        console.log("Selected resume:", selectedResume); // Log the selected resume

        // Check base64 length and prefix for debugging
        if (!selectedResume.startsWith("data:application/pdf;base64,")) {
          console.error("Invalid base64 format for PDF.");
        }
        console.log("Base64 Length:", selectedResume.length); // Log base64 length
      }

      // Log formData contents
      formData.forEach((value, key) => {
        console.log(key, value);
      });

      try {
        const response = await fetch("http://localhost:3300/send-email", {
          method: "POST",
          body: formData,
        });

        if (response.ok) {
          alert("Email sent successfully!");
        } else {
          console.error("Failed to send email."); // Log the error
          alert("Failed to send email.");
        }
      } catch (error) {
        alert("Error occurred while sending email.");
        console.error("Error:", error); // Log the error
      }
    });
  } else {
    console.error("Send Button not found in the DOM.");
  }
});
