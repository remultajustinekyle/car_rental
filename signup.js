// register.js
import { supabase } from './supabaseClient.js';

document.getElementById("signUpForm").addEventListener("submit", async (e) => {
  e.preventDefault(); // 🛑 Prevent form from refreshing

  const email = document.getElementById("signUpEmail").value;
  const password = document.getElementById("signUpPassword").value;
  const confirmPassword = document.getElementById("signUpConfirmPassword").value;
  const name = document.getElementById("signUpName").value;
  const agree = document.getElementById("termsAgreement").checked;


  const lastSent = localStorage.getItem("otpLastSent");
  const now = Date.now();
  
  if (lastSent && now - lastSent < 60000) {
    alert(`For security, wait ${60 - Math.floor((now - lastSent)/1000)}s before requesting again.`);
    return;
  }
  
  localStorage.setItem("otpLastSent", now);
  
  // Send OTP now
  

  // ✅ Basic Validation
  if (!agree) return alert("You must agree to the Terms and Privacy Policy.");
  if (password !== confirmPassword) return alert("Passwords do not match.");

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) return alert("Error: " + error.message);

  // Add user to 'users' table
  await supabase.from("users").insert([
    {
      id: data.user.id,
      email,
      name,
      role: "student"
    }
  ]);

  alert("Registration successful! Please verify your email.");
});
