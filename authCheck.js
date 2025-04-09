import { supabase } from './supabaseClient.js';
<script type="module" src="authCheck.js"></script>

window.addEventListener("DOMContentLoaded", async () => {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  const authModal = document.getElementById("authModal");

  if (!session) {
    // User not logged in → show login modal
    authModal.classList.remove("hidden");
    document.body.style.overflow = "hidden";
  } else {
    // Optional: redirect to dashboard if user is already logged in
    window.location.href = "dashboard.html";
  }
});
