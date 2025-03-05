// Wait for DOM to fully load
document.addEventListener("DOMContentLoaded", () => {
  // Elements
  const profileUsername = document.getElementById("profileUsername");
  const profileBio = document.getElementById("profileBio");
  const profilePic = document.getElementById("profilePic");

  const newBioInput = document.getElementById("newBio");
  const newProfilePicInput = document.getElementById("newProfilePic");
  const updateProfileButton = document.getElementById("updateProfileButton");

  const homeButton = document.getElementById("homeButton");
  const logoutButton = document.getElementById("logoutButton");
  const themeToggle = document.getElementById("themeToggle");

  // Check if themeToggle button exists before using it
  if (themeToggle) {
      // Apply saved theme on page load
      if (localStorage.getItem("theme") === "light") {
          document.body.classList.add("light-theme");
      }

      // Toggle Theme
      themeToggle.addEventListener("click", () => {
          document.body.classList.toggle("light-theme");
          localStorage.setItem("theme", document.body.classList.contains("light-theme") ? "light" : "dark");
          console.log("Theme changed to:", localStorage.getItem("theme"));
      });
  } else {
      console.error("Theme toggle button not found!");
  }

  // Update Profile
  if (updateProfileButton) {
      updateProfileButton.addEventListener("click", async () => {
          if (!newBioInput || !newProfilePicInput) {
              console.error("Profile input elements not found!");
              return;
          }

          const formData = new FormData();
          formData.append("newBio", newBioInput.value.trim());

          if (newProfilePicInput.files.length > 0) {
              formData.append("newProfilePic", newProfilePicInput.files[0]);
          }

          try {
              const response = await fetch("update_profile.php", {
                  method: "POST",
                  body: formData
              });

              const result = await response.json();
              if (result.success) {
                  if (profileBio) profileBio.textContent = result.bio;
                  if (profilePic && result.profilePic) profilePic.src = result.profilePic;
                  alert("Profile updated successfully!");
              } else {
                  alert("Error: " + result.message);
              }
          } catch (error) {
              console.error("Update error:", error);
              alert("Failed to update profile. Try again.");
          }
      });
  } else {
      console.error("Update profile button not found!");
  }

  // Home & Logout Buttons
  if (homeButton) {
      homeButton.addEventListener("click", () => {
          window.location.href = "index.php";
      });
  } else {
      console.error("Home button not found!");
  }

  if (logoutButton) {
      logoutButton.addEventListener("click", () => {
          window.location.href = "logout.php";
      });
  } else {
      console.error("Logout button not found!");
  }
});
