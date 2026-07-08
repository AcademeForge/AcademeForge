/* ── Suggest Form ── */
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("suggestForm");
  const statusDiv = document.getElementById("suggestFormStatus");

  if (form) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      const submitBtn = form.querySelector('button[type="submit"]');
      submitBtn.disabled = true;
      const originalText = submitBtn.textContent;
      submitBtn.textContent = "Sending...";
      statusDiv.textContent = "";
      statusDiv.style.display = "none";
      statusDiv.className = "alert";

      const name = document.getElementById("suggestName").value.trim();
      const email = document.getElementById("suggestEmail").value.trim();
      const subject = document.getElementById("suggestSubject").value.trim();
      const message = document.getElementById("suggestText").value.trim();

      try {
        const FORMS_EP = "https://afooyyydhlwngzssgqih.supabase.co/functions/v1/af-website-forms";
        const response = await fetch(FORMS_EP, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            action: "submit_suggestion",
            name: name,
            email: email,
            subject: subject,
            category: "general",
            suggestion: message,
            page: window.location.pathname
          })
        });

        const data = await response.json();

        statusDiv.style.display = "block";
        if (response.ok && data.ok !== false) {
          statusDiv.textContent = data.message || "Thank you! Your suggestion has been recorded.";
          statusDiv.className = "alert alert-success";
          statusDiv.style.backgroundColor = "rgba(16, 185, 129, 0.1)";
          statusDiv.style.color = "var(--green, #10b981)";
          form.reset();
        } else {
          statusDiv.textContent = data.error || "Failed to send message. Please try again.";
          statusDiv.className = "alert alert-danger";
          statusDiv.style.backgroundColor = "rgba(239, 68, 68, 0.1)";
          statusDiv.style.color = "var(--red, #ef4444)";
        }
      } catch (error) {
        console.error("Form submission error:", error);
        statusDiv.style.display = "block";
        statusDiv.textContent = "A network error occurred. Please try again.";
        statusDiv.className = "alert alert-danger";
        statusDiv.style.backgroundColor = "rgba(239, 68, 68, 0.1)";
        statusDiv.style.color = "var(--red, #ef4444)";
      } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;
      }
    });
  }
});
