import i18next from "i18next";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const localesDir = path.join(__dirname, "../../public/locales");

function loadResources() {
  const en = JSON.parse(fs.readFileSync(path.join(localesDir, "en/translation.json"), "utf-8"));
  const zh = JSON.parse(fs.readFileSync(path.join(localesDir, "zh/translation.json"), "utf-8"));
  return { en, zh };
}

function resolveByPath(obj: unknown, key: string): unknown {
  return key.split(".").reduce((acc: any, part) => {
    if (acc == null) return undefined;
    const index = Number(part);
    if (Array.isArray(acc) && Number.isInteger(index)) {
      return acc[index];
    }
    return acc[part];
  }, obj as any);
}

export function ensureI18n(locale: "en" | "zh") {
  const resources = loadResources();
  const currentDict = resources[locale];

  i18next.language = locale;
  i18next.languages = [locale, locale === "en" ? "zh" : "en"];

  i18next.t = ((key: string) => {
    const value = resolveByPath(currentDict, key);
    if (typeof value === "string") return value;
    if (typeof value === "number" || typeof value === "boolean") return String(value);
    return key;
  }) as typeof i18next.t;
}