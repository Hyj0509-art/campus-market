"use client";

import { createContext, useContext, useEffect, useState } from "react";

type LanguageType = "zh" | "en";

type LanguageContextType = {
  lang: LanguageType;
  setLang: (lang: LanguageType) => void;
  toggleLang: () => void;
};

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

export function LanguageProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [lang, setLangState] = useState<LanguageType>("zh");

  useEffect(() => {
    const savedLang = localStorage.getItem("lang") as LanguageType | null;
    if (savedLang === "zh" || savedLang === "en") {
      setLangState(savedLang);
    }
  }, []);

  const setLang = (newLang: LanguageType) => {
    setLangState(newLang);
    localStorage.setItem("lang", newLang);
  };

  const toggleLang = () => {
    const newLang = lang === "zh" ? "en" : "zh";
    setLang(newLang);
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggleLang }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }

  return context;
}
