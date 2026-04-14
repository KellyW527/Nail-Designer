import type { DesignDraft, PreferencesState } from "@/types";

const DRAFT_KEY = "nail-designer:drafts";
const PREFERENCES_KEY = "nail-designer:preferences";

const isBrowser = () => typeof window !== "undefined";

const readJson = <T,>(key: string, fallback: T): T => {
  if (!isBrowser()) return fallback;

  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
};

const writeJson = <T,>(key: string, value: T) => {
  if (!isBrowser()) return;
  window.localStorage.setItem(key, JSON.stringify(value));
};

export const storageService = {
  draftKey: DRAFT_KEY,
  preferencesKey: PREFERENCES_KEY,

  listDrafts() {
    return readJson<DesignDraft[]>(DRAFT_KEY, []);
  },

  loadDraft(id: string) {
    return storageService.listDrafts().find((draft) => draft.id === id) ?? null;
  },

  saveDraft(draft: DesignDraft) {
    const drafts = storageService.listDrafts();
    const nextDrafts = drafts.some((item) => item.id === draft.id)
      ? drafts.map((item) => (item.id === draft.id ? draft : item))
      : [draft, ...drafts];

    writeJson(DRAFT_KEY, nextDrafts);
    return nextDrafts;
  },

  deleteDraft(id: string) {
    const nextDrafts = storageService.listDrafts().filter((draft) => draft.id !== id);
    writeJson(DRAFT_KEY, nextDrafts);
    return nextDrafts;
  },

  savePreferences(preferences: PreferencesState) {
    writeJson(PREFERENCES_KEY, preferences);
    return preferences;
  },

  loadPreferences() {
    return readJson<PreferencesState | null>(PREFERENCES_KEY, null);
  },
};
