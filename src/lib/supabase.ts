import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(
  supabaseUrl,
  supabaseAnonKey
);

// --------------------------------------
// Daily Editorial
// --------------------------------------

export interface DailyEditItem {
  id: string;
  num: string;
  tag: string;
  timeAgo: string;
  readTime: string;
  title: string;
  description: string;
}

export async function getDailyEditItems(): Promise<DailyEditItem[]> {
  const { data, error } = await supabase
    .from("articles")
    .select("*")
    .eq("status", "published")
    .order("created_at", { ascending: false })
    .limit(5);

  if (error) {
    console.error("Error loading Daily Editorial:", error);
    return [];
  }

  return (data ?? []).map((article, index) => ({
    id: article.id,
    num: String(index + 1).padStart(2, "0"),
    tag: article.category ?? "General",
    timeAgo: formatTimeAgo(article.created_at),
    readTime: article.read_time ?? "3 min read",
    title: article.title ?? "",
    description:
      article.excerpt ??
      article.description ??
      "",
  }));
}

function formatTimeAgo(dateString: string): string {
  if (!dateString) return "";

  const date = new Date(dateString);
  const now = new Date();

  const difference = Math.floor(
    (now.getTime() - date.getTime()) / 1000
  );

  const minutes = Math.floor(difference / 60);

  if (minutes < 60) {
    return `${Math.max(minutes, 1)}m ago`;
  }

  const hours = Math.floor(minutes / 60);

  if (hours < 24) {
    return `${hours}h ago`;
  }

  const days = Math.floor(hours / 24);

  return `${days}d ago`;
}

export interface DailyEditSettings {
  id?: string;

  eyebrow: string | null;
  title: string | null;
  description: string | null;
  subscriber_text: string | null;

  morning_name: string | null;
  morning_description: string | null;

  telemetry_name: string | null;
  telemetry_description: string | null;

  monographs_name: string | null;
  monographs_description: string | null;

  email_label: string | null;
  email_placeholder: string | null;
  button_text: string | null;

  privacy_text: string | null;
  unsubscribe_text: string | null;
}

export async function getDailyEditSettings(): Promise<DailyEditSettings | null> {
  const { data, error } = await supabase
    .from("daily_edit_settings")
    .select("*")
    .limit(1)
    .maybeSingle();

  if (error) {
    console.error("Error loading Daily Edit settings:", error);
    return null;
  }

  return data;
}
export interface LatestArticle {
  id: string;
  title: string;
  category: string;
  description: string;
  timeAgo: string;
  readTime: string;
  type: string;
  topic: string;
  created_at: string;
}

export async function getLatestArticles(): Promise<LatestArticle[]> {
  const { data, error } = await supabase
    .from("articles")
    .select("*")
    .eq("status", "published")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error loading latest articles:", error);
    return [];
  }

  return (data ?? []).map((article) => ({
    id: article.id,
    title: article.title ?? "",
    category: article.category ?? "General",
    description:
      article.excerpt ??
      article.description ??
      "",
    timeAgo: formatTimeAgo(article.created_at),
    readTime: article.read_time ?? "3 min read",
    type: article.type ?? "Dispatches",
    topic: article.topic ?? article.category ?? "General",
    created_at: article.created_at,
  }));
}
export async function getArticleById(id: string) {
  const { data, error } = await supabase
    .from("articles")
    .select("*")
    .eq("id", id)
    .eq("status", "published")
    .single();

  if (error) {
    console.error("Error loading article:", error);
    return null;
  }

  return data;
}
