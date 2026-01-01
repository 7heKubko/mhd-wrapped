// Supabase client initialization (singleton)
// Use UMD CDN version loaded in HTML
const SUPABASE_URL = "https://xnvsdyzsavhmlzoevjqg.supabase.co";
const SUPABASE_KEY = "sb_publishable_wKjDkYyoZSK3eHZ-gaKdwA_EUXvXkl_";

let _supabase = null;
export function getSupabase() {
  if (!_supabase) {
    if (window.supabase) {
      _supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
    } else {
      throw new Error("Supabase client not loaded");
    }
  }
  return _supabase;
}

export function getCurrentUser() {
  const supabase = getSupabase();
  return supabase.auth.getUser().then(({ data }) => data.user);
}

export function signInWithEmail(email, password) {
  const supabase = getSupabase();
  return supabase.auth.signInWithPassword({ email, password });
}

export function signUpWithEmail(email, password) {
  const supabase = getSupabase();
  return supabase.auth.signUp({ email, password });
}

export function signOut() {
  const supabase = getSupabase();
  return supabase.auth.signOut();
}
