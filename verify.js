// verify.js
import { supabase } from './supabaseClient.js';

document.getElementById("verifyBtn").addEventListener("click", async () => {
  const code = document.getElementById("otp").value.trim();
  const userId = localStorage.getItem("user_id");

  const { data, error } = await supabase
    .from("verifications")
    .select("*")
    .eq("user_id", userId)
    .eq("otp_code", code)
    .gt("expires_at", new Date().toISOString())
    .limit(1);

  if (error || !data || data.length === 0) {
    return alert("Invalid or expired OTP.");
  }

  alert("Login verified! Redirecting...");
  window.location.href = "dashboard.html";
});
