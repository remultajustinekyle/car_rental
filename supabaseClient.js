import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'

const SUPABASE_URL = 'https://flucvsqvtjugplxgcdor.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZsdWN2c3F2dGp1Z3BseGdjZG9yIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQxNjEyNjcsImV4cCI6MjA1OTczNzI2N30.dZ3dAaiQrRMQZXfQwKcmILfGIO05iBvervo-V15po9Q'; // full key

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
