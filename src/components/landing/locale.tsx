import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react';
import type {Locale} from '@site/src/data/portfolio';

type LocaleContextValue = {
  locale: Locale;
  setLocale: (l: Locale) => void;
  toggle: () => void;
};

const LocaleContext = createContext<LocaleContextValue | null>(null);
const STORAGE_KEY = 'lp-locale';

/**
 * Provider de idioma client-side da landing. Persiste em localStorage e troca
 * instantaneamente, sem reload — mesmo comportamento do toggle de tema.
 */
export function LocaleProvider({children}: {children: ReactNode}): ReactNode {
  const [locale, setLocaleState] = useState<Locale>('en');

  // SSR renderiza 'en' (defaultLocale); aplica o valor salvo após hidratar.
  useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved === 'pt' || saved === 'en') setLocaleState(saved);
  }, []);

  const setLocale = (l: Locale) => {
    setLocaleState(l);
    try {
      window.localStorage.setItem(STORAGE_KEY, l);
    } catch {
      /* localStorage indisponível — ignora. */
    }
  };

  const toggle = () => setLocale(locale === 'en' ? 'pt' : 'en');

  return (
    <LocaleContext.Provider value={{locale, setLocale, toggle}}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale(): LocaleContextValue {
  const ctx = useContext(LocaleContext);
  if (!ctx) {
    // Fora do provider (não esperado na landing) → fallback seguro.
    return {locale: 'en', setLocale: () => {}, toggle: () => {}};
  }
  return ctx;
}
