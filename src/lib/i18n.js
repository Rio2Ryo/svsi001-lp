"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

const I18nContext = createContext({
  t: (k) => k,
  lang: "ja",
  setLang: () => {},
});

const LS_KEY = "siteLang";

function get(obj, path) {
  return path.split(".").reduce((o, k) => (o && o[k] != null ? o[k] : null), obj);
}

export function I18nProvider({ children }) {
  // ① 初回SSRは必ず "ja" で描画して水和ずれ回避
  const [lang, setLangState] = useState("ja");
  const [messages, setMessages] = useState({});

  // ② クライアントでユーザーの希望言語に合わせて上書き
  useEffect(() => {
    if (typeof window === "undefined") return;

    // localStorage > <html lang> > navigator.language の順に推定
    const saved = localStorage.getItem(LS_KEY);
    const htmlLang = document.documentElement.lang;
    const nav = (navigator.language || "").toLowerCase();

    const initial =
      saved === "en"
        ? "en"
        : saved === "ja"
        ? "ja"
        : htmlLang === "en"
        ? "en"
        : htmlLang === "ja"
        ? "ja"
        : nav.startsWith("en")
        ? "en"
        : "ja";

    setLangState(initial);
    document.documentElement.lang = initial;
  }, []);

  // ③ 言語切替ごとに辞書を動的ロード
  useEffect(() => {
    let cancelled = false;
    (async () => {
      const mod = await import(`../locales/${lang}.json`);
      const dict = mod.default || mod;
      if (!cancelled) {
        setMessages(dict);
        try {
          localStorage.setItem(LS_KEY, lang);
        } catch {}
        document.documentElement.lang = lang;
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [lang]);

  // ④ ヘッダーなど外部からの切替イベント
  useEffect(() => {
    const onEvt = (e) => {
      if (e instanceof CustomEvent && e.detail?.lang) {
        const next = e.detail.lang === "en" ? "en" : "ja";
        setLangState(next);
      }
    };
    window.addEventListener("app:langChange", onEvt);
    return () => window.removeEventListener("app:langChange", onEvt);
  }, []);

  const t = useMemo(() => {
    return (key) => {
      const v = get(messages, key);
      return typeof v === "string" ? v : key;
    };
  }, [messages]);

  const setLang = (l) => setLangState(l);

  const value = useMemo(() => ({ t, lang, setLang }), [t, lang]);

  return (
    <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
  );
}

export const useI18n = () => useContext(I18nContext);
