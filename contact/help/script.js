/* ── Help Form ── */
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("getInTouchForm");
  const statusDiv = document.getElementById("contactFormStatus");

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

      const name = document.getElementById("contactName").value.trim();
      const mobile = document.getElementById("contactMobile").value.trim();
      const email = document.getElementById("contactEmail").value.trim();
      const rawMessage = document.getElementById("contactMessage").value.trim();
      const subject = document.getElementById("contactSubject").value;

      const message = mobile ? `[Sender Mobile: ${mobile}]\n\n${rawMessage}` : rawMessage;

      try {
        const FORMS_EP = "https://afooyyydhlwngzssgqih.supabase.co/functions/v1/af-website-forms";
        const response = await fetch(FORMS_EP, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            action: "submit_help",
            name: name,
            email: email,
            subject: subject,
            type: "general",
            message: message,
            page: window.location.pathname
          })
        });

        const data = await response.json();

        statusDiv.style.display = "block";
        if (response.ok && data.ok !== false) {
          statusDiv.textContent = data.message || "Message sent successfully! We'll respond within 24-48 hours.";
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
