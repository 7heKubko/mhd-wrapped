import { loadRides } from "./storage.js";

// Supabase client initialization (singleton)
// Use UMD CDN version loaded in HTML
const SUPABASE_URL = "https://xnvsdyzsavhmlzoevjqg.supabase.co";
const SUPABASE_KEY = "sb_publishable_wKjDkYyoZSK3eHZ-gaKdwA_EUXvXkl_";

let _supabase = null;
export function getSupabase() {
  if (!_supabase) {
    if (window.supabase) {
      _supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY, {
        auth: {
          persistSession: true,
          autoRefreshToken: true,
          storage: window.localStorage,
        },
      });
    } else {
      throw new Error("Supabase client not loaded");
    }
  }
  return _supabase;
}

export function getCurrentUser() {
  const supabase = getSupabase();
  // Prefer local session to avoid unnecessary network calls and ensure persistence
  return supabase.auth
    .getSession()
    .then(({ data }) => data.session?.user || null)
    .catch(async () => {
      const { data } = await supabase.auth.getUser();
      return data.user || null;
    });
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

// Upload all local rides to Supabase for the current user (if logged in)
// Returns { ok: boolean, reason?: string, error?: any }
export async function uploadRidesIfLoggedIn() {
  try {
    const user = await getCurrentUser();
    if (!user) return { ok: false, reason: "not-logged-in" };

    const rides = loadRides();
    const supabase = getSupabase();

    // Replace user data entirely to keep cloud in sync with local
    await supabase.from("rides").delete().eq("user_id", user.id);

    if (rides.length > 0) {
      // Whitelist only known safe columns to prevent 400 on unknown fields
      const safeRows = rides.map((r) => ({
        line: r.line,
        number: r.number,
        vehicle: r.vehicle,
        vehicleMode: r.vehicleMode,
        date: r.date,
        time: r.time,
        user_id: user.id,
      }));
      const { error } = await supabase
        .from("rides")
        .insert(safeRows, { returning: "minimal" });
      if (error) throw error;
    }
    return { ok: true };
  } catch (error) {
    return { ok: false, error };
  }
}

// Insert a single ride immediately for the current user (if logged in)
// Returns { ok: boolean, reason?: string, error?: any }
export async function saveRideToCloudIfLoggedIn(ride) {
  try {
    const user = await getCurrentUser();
    if (!user) return { ok: false, reason: "not-logged-in" };

    const supabase = getSupabase();
    const row = {
      line: ride.line,
      number: ride.number,
      vehicle: ride.vehicle,
      vehicleMode: ride.vehicleMode,
      date: ride.date,
      time: ride.time,
      user_id: user.id,
    };
    const { error } = await supabase
      .from("rides")
      .insert([row], { returning: "minimal" });
    if (error) throw error;
    return { ok: true };
  } catch (error) {
    return { ok: false, error };
  }
}

// --- Favorites sync ---
// Load favorites for current user (if logged in)
// Returns { ok: boolean, favorites?: { lines: string[], numbers: string[] }, reason?: string, error?: any }
export async function loadFavoritesFromCloudIfLoggedIn() {
  try {
    const user = await getCurrentUser();
    if (!user) return { ok: false, reason: "not-logged-in" };

    const supabase = getSupabase();
    const { data, error } = await supabase
      .from("favorites")
      .select("lines,numbers")
      .eq("user_id", user.id)
      .single();

    if (error) {
      // If table doesn't exist or row not found, treat as empty
      if (error.code === "PGRST116" /* JSON object requested, multiple (or no) rows returned */ || error.message?.includes("relation \"favorites\" does not exist")) {
        return { ok: true, favorites: { lines: [], numbers: [] } };
      }
      return { ok: false, error };
    }
    return {
      ok: true,
      favorites: {
        lines: Array.isArray(data?.lines) ? data.lines : [],
        numbers: Array.isArray(data?.numbers) ? data.numbers : [],
      },
    };
  } catch (error) {
    return { ok: false, error };
  }
}

// Save favorites for current user (if logged in)
// Returns { ok: boolean, reason?: string, error?: any }
export async function saveFavoritesToCloudIfLoggedIn(favorites) {
  try {
    const user = await getCurrentUser();
    if (!user) return { ok: false, reason: "not-logged-in" };

    const supabase = getSupabase();
    const row = {
      user_id: user.id,
      lines: Array.isArray(favorites?.lines) ? favorites.lines : [],
      numbers: Array.isArray(favorites?.numbers) ? favorites.numbers : [],
      updated_at: new Date().toISOString(),
    };
    const { error } = await supabase
      .from("favorites")
      .upsert(row, { onConflict: "user_id" });
    if (error) throw error;
    return { ok: true };
  } catch (error) {
    return { ok: false, error };
  }
}
