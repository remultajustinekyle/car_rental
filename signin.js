// login.js
import { supabase } from './supabaseClient.js';

const signInForm = document.getElementById("signInForm");
const verificationForm = document.getElementById("verificationForm");
const userEmailDisplay = document.getElementById("userEmailDisplay");

signInForm?.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("signInEmail").value.trim();
  const password = document.getElementById("signInPassword").value.trim();

  const { data, error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) return alert(error.message);
  if (!data.user.email_confirmed_at) return alert("Please confirm your email first.");

  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  const { error: otpError } = await supabase.from("verifications").insert([{
    user_id: data.user.id,
    otp_code: otp,
    expires_at: new Date(Date.now() + 10 * 60 * 1000).toISOString(),
  }]);

  if (otpError) return alert("OTP Error: " + otpError.message);

  // ✅ Log or send OTP via EmailJS
  console.log("Your OTP:", otp);
  alert("A code has been sent to your email (check console for now).");

  localStorage.setItem("user_id", data.user.id);
  signInForm.classList.add("hidden");
  verificationForm.classList.remove("hidden");
  userEmailDisplay.textContent = email;
});
