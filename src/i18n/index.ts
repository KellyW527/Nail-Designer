import en from "@/i18n/messages/en";
import zh from "@/i18n/messages/zh";
import type { LocaleCode } from "@/types";

const dictionaries = { en, zh } as const;

const getValue = (obj: unknown, path: string): string => {
  return path.split(".").reduce<unknown>((acc, key) => {
    if (acc && typeof acc === "object" && key in acc) {
      return (acc as Record<string, unknown>)[key];
    }

    return path;
  }, obj) as string;
};

export const getDictionary = (locale: LocaleCode) => dictionaries[locale];

export const createTranslator = (locale: LocaleCode) => {
  const dictionary = getDictionary(locale);

  return (path: string) => getValue(dictionary, path);
};
