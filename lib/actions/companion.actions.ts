"use server";
import { auth } from "@clerk/nextjs/server";
import { defaultCompanions, getGuestCompanionTemplate } from "@/constants";
import {
  createSupabaseClient,
  createSupabaseClientWithAuth,
} from "@/lib/supabase";

let hasLoggedCompanionFetchNetworkIssue = false;
let hasLoggedUserSessionsNetworkIssue = false;

const normalizeFilter = (value?: string | string[]) =>
  (Array.isArray(value) ? value[0] : value)?.trim() ?? "";

const isNetworkFetchFailure = (value: unknown) => {
  if (typeof value !== "object" || value === null) return false;
  if (!("message" in value)) return false;
  const message = String(value.message ?? "");
  return message.toLowerCase().includes("fetch failed");
};

const getFallbackCompanions = ({
  limit = 10,
  page = 1,
  subject,
  topic,
}: GetAllCompanions) => {
  const normalizedSubject = normalizeFilter(subject).toLowerCase();
  const normalizedTopic = normalizeFilter(topic).toLowerCase();

  let companions = [...defaultCompanions];

  if (normalizedSubject) {
    companions = companions.filter((companion) =>
      companion.subject.toLowerCase().includes(normalizedSubject)
    );
  }

  if (normalizedTopic) {
    companions = companions.filter(
      (companion) =>
        companion.topic.toLowerCase().includes(normalizedTopic) ||
        companion.name.toLowerCase().includes(normalizedTopic)
    );
  }

  return companions.slice((page - 1) * limit, page * limit);
};

export const createCompanion = async (formData: CreateCompanion) => {
  const { userId: author } = await auth();
  const supabase = await createSupabaseClientWithAuth();

  const { data, error } = await supabase
    .from("companions")
    .insert({ ...formData, author })
    .select();

  if (error || !data)
    throw new Error(error?.message || "Could not create companion");
  return data[0];
};

export const getAllCompanions = async ({
  limit = 10,
  page = 1,
  subject,
  topic,
}: GetAllCompanions) => {
  const supabase = createSupabaseClient();
  const normalizedSubject = normalizeFilter(subject);
  const normalizedTopic = normalizeFilter(topic);

  // console.log(supabase)
  try {
    let query = supabase.from("companions").select();

    if (normalizedSubject && normalizedTopic) {
      query = query
        .ilike("subject", `%${normalizedSubject}%`)
        .or(
          `topic.ilike.%${normalizedTopic}%,name.ilike.%${normalizedTopic}%`
        );
    } else if (normalizedSubject) {
      query = query.ilike("subject", `%${normalizedSubject}%`);
    } else if (normalizedTopic) {
      query = query.or(
        `topic.ilike.%${normalizedTopic}%,name.ilike.%${normalizedTopic}%`
      );
    }

    query = query.range((page - 1) * limit, page * limit - 1);

    const { data: companions = [], error } = await query;

    if (error) {
      if (isNetworkFetchFailure(error)) {
        if (!hasLoggedCompanionFetchNetworkIssue) {
          hasLoggedCompanionFetchNetworkIssue = true;
          console.warn(
            "Supabase unreachable. Serving fallback companions for now."
          );
        }
        return getFallbackCompanions({ limit, page, subject, topic });
      }
      console.error("Failed to fetch companions", {
        message: error.message,
        details: error.details,
        hint: error.hint,
        code: error.code,
      });
      return getFallbackCompanions({ limit, page, subject, topic });
    }

    return companions;
  } catch (error) {
    if (isNetworkFetchFailure(error)) {
      if (!hasLoggedCompanionFetchNetworkIssue) {
        hasLoggedCompanionFetchNetworkIssue = true;
        console.warn(
          "Supabase unreachable. Serving fallback companions for now."
        );
      }
      return getFallbackCompanions({ limit, page, subject, topic });
    }
    console.error("Unexpected error while fetching companions", error);
    return getFallbackCompanions({ limit, page, subject, topic });
  }
};

export const getCompanion = async (id: string) => {
  const supabase = createSupabaseClient();

  const { data, error } = await supabase
    .from("companions")
    .select()
    .eq("id", id);

  if (error) return console.log(error);

  return data[0];
};

export const addToSessionHistory = async (companionId: string) => {
  const { userId } = await auth();

  const supabase = await createSupabaseClientWithAuth();

  const { data, error } = await supabase
    .from("session_history")
    .insert({ companion_id: companionId, user_id: userId });

  if (error) throw new Error(error.message);

  return data;
};

export const getRecentSessions = async (limit = 10) => {
  const supabase = createSupabaseClient();
  try {
    const { data = [], error } = await supabase
      .from("session_history")
      .select(`companions:companion_id (*)`)
      .order("created_at", { ascending: false })
      .limit(limit);

    if (error) {
      console.error("Failed to fetch recent sessions", {
        message: error.message,
        details: error.details,
        hint: error.hint,
        code: error.code,
      });
      return [];
    }

    return data?.map(({ companions }) => companions);
  } catch (error) {
    console.error("Unexpected error while fetching recent sessions", error);
    return [];
  }
};

export const getUserSessions = async (userId: string, limit = 10) => {
  try {
    const supabase = await createSupabaseClientWithAuth();
    const { data = [], error } = await supabase
      .from("session_history")
      .select(`companions:companion_id (*)`)
      .eq("user_id", userId)
      .order("created_at", { ascending: false })
      .limit(limit);

    if (error) {
      if (isNetworkFetchFailure(error)) {
        if (!hasLoggedUserSessionsNetworkIssue) {
          hasLoggedUserSessionsNetworkIssue = true;
          console.warn(
            "Supabase unreachable. Returning empty recent sessions for now."
          );
        }
        return [];
      }

      console.error("Failed to fetch user sessions", {
        message: error.message,
        details: error.details,
        hint: error.hint,
        code: error.code,
      });
      return [];
    }

    return data?.map(({ companions }) => companions);
  } catch (error) {
    if (isNetworkFetchFailure(error)) {
      if (!hasLoggedUserSessionsNetworkIssue) {
        hasLoggedUserSessionsNetworkIssue = true;
        console.warn(
          "Supabase unreachable. Returning empty recent sessions for now."
        );
      }
      return [];
    }

    console.error("Unexpected error while fetching user sessions", error);
    return [];
  }
};

export const getUserCompanions = async (userId: string) => {
  const supabase = await createSupabaseClientWithAuth();
  const { data = [], error } = await supabase
    .from("companions")
    .select()
    .eq("author", userId);

  if (error) throw new Error(error.message);

  return data;
};

export const newCompanionPermissions = async () => {
  const { userId, has } = await auth();
  const supabase = await createSupabaseClientWithAuth();

  let limit = 0;
  if (has({ plan: "pro" })) {
    return true;
  } else if (has({ feature: "3_companion_limit" })) {
    limit = 3;
  } else if (has({ feature: "10_companion_limit" })) {
    limit = 10;
  }


  const { data = [], error } = await supabase
    .from("companions")
    .select('id', { count: 'exact'})
    .eq("author", userId);

  if (error) throw new Error(error.message);

  const companionCount = data?.length ?? 0;

  if(companionCount >=  limit) {
    return false
  }
  else{
     return true
  }
};

export const getOrCreateCompanionFromTemplate = async (templateId: string) => {
  const { userId: author } = await auth();
  if (!author) throw new Error("User must be signed in to launch a template.");

  const template = getGuestCompanionTemplate(templateId);
  if (!template) throw new Error(`Unknown companion template: ${templateId}`);

  const supabase = await createSupabaseClientWithAuth();

  const { data: existing, error: fetchError } = await supabase
    .from("companions")
    .select()
    .eq("author", author)
    .eq("name", template.name)
    .eq("subject", template.subject)
    .eq("topic", template.topic)
    .eq("duration", template.duration)
    .eq("voice", template.voice)
    .eq("style", template.style)
    .limit(1);

  if (fetchError) throw new Error(fetchError.message);
  if (existing?.[0]) return existing[0];

  const { data, error } = await supabase
    .from("companions")
    .insert({
      author,
      name: template.name,
      subject: template.subject,
      topic: template.topic,
      duration: template.duration,
      voice: template.voice,
      style: template.style,
    })
    .select();

  if (error || !data?.[0]) {
    throw new Error(error?.message || "Failed to create companion from template.");
  }

  return data[0];
};
