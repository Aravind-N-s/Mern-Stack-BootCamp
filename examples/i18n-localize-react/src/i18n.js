import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import Backend from "i18next-locize-backend";
import LastUsed from "locize-lastused";
import Editor from "locize-editor";

const locizeOptions = {
  projectId: "ce0cf818-32e5-44a5-b7f0-4ea9e840d962",
  apiKey: "89bf4422-eb05-493c-8116-feff73450552",
  referenceLng: "en"
};

i18n
  .use(Backend)
  .use(LastUsed)
  .use(Editor)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: "en",
    debug: true,
    saveMissing: true,

    interpolation: {
      escapeValue: false
    },
    backend: locizeOptions,
    locizeLastUsed: locizeOptions,
    editor: {
      ...locizeOptions,
      onEditorSaved: async (lng, ns) => {
        await i18n.reloadResources(lng, ns);
        i18n.emit("editorSaved");
      }
    },
    react: {
      bindI18n: "languageChanged editorSaved"
    }
  });

export default i18n;
