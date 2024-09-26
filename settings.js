document.getElementById("uploadButton").addEventListener("click", async () => {
  const resumeFile = document.getElementById("resume").files[0];
  const tag = document.getElementById("tag").value;

  if (!resumeFile || !tag) {
    alert("Please select a file and enter a tag.");
    return;
  }

  // Create a FileReader to read the file as a data URL (base64)
  const reader = new FileReader();
  reader.onloadend = function () {
    const base64data = reader.result;

    // Log the base64 string to verify it's correct
    console.log("Base64 String:", base64data);

    // Store resume with tag in local storage
    const resumes = JSON.parse(localStorage.getItem("resumes")) || [];
    resumes.push({ tag, file: base64data, filename: resumeFile.name });
    localStorage.setItem("resumes", JSON.stringify(resumes));
    displayResumes();
  };

  // Convert the file to a data URL (base64)
  reader.readAsDataURL(resumeFile);
});

function displayResumes(filter = "") {
  const resumes = JSON.parse(localStorage.getItem("resumes")) || [];
  const resumeList = document.getElementById("resumeList");
  resumeList.innerHTML = ""; // Clear the list

  resumes.forEach((resume) => {
    // Filter resumes based on the search input
    if (resume.tag.toLowerCase().includes(filter.toLowerCase())) {
      const li = document.createElement("li");
      li.textContent = `${resume.tag} - ${resume.filename}`;
      resumeList.appendChild(li);
    }
  });
}

function filterResumes() {
  const searchInput = document.getElementById("searchInput").value;
  displayResumes(searchInput); // Display resumes filtered by search input
}

// Load resumes on page load
document.addEventListener("DOMContentLoaded", () => {
  displayResumes(); // Display all resumes initially
});
