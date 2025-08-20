import { createContext, useContext, useEffect, useMemo, useState } from "react";

const I18nContext = createContext({ t: (k)=>k, lang: "ja", setLang: ()=>{} });

export function I18nProvider({ children }) {
  const [lang, setLang] = useState("ja");
  const [messages, setMessages] = useState({});

  // 初期化（localStorage → <html lang>）
  useEffect(() => {
    const saved = localStorage.getItem("siteLang");
    const initial = saved === "en" ? "en" : "ja";
    setLang(initial);
    document.documentElement.lang = initial;
  }, []);

  // 言語切替時に辞書を動的ロード
  useEffect(() => {
    (async () => {
      const mod = await import(`../locales/${lang}.json`);
      setMessages(mod.default || mod);
      document.documentElement.lang = lang;
      localStorage.setItem("siteLang", lang);
    })();
  }, [lang]);

  // ヘッダー（既存）からのカスタムイベントも拾えるように
  useEffect(() => {
    const onEvt = (e) => setLang(e.detail?.lang === "en" ? "en" : "ja");
    window.addEventListener("app:langChange", onEvt);
    return () => window.removeEventListener("app:langChange", onEvt);
  }, []);

  const t = useMemo(() => {
    const getter = (path) => {
      return path.split(".").reduce((o, k) => (o && o[k] != null ? o[k] : null), messages) ?? path;
    };
    return getter;
  }, [messages]);

  const value = useMemo(() => ({ t, lang, setLang }), [t, lang]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export const useI18n = () => useContext(I18nContext);
