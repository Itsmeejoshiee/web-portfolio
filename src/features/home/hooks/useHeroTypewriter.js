import { useEffect, useRef, useState } from 'react';

// Hex literals (not CSS vars) since accent/accentTint feed the three.js
// sticker materials as well as the DOM caret — keep in sync with tokens.css.
const LANGS = [
  { word: 'Hello', color: '#2C2418', caret: '#D85A30', tint: '#F5C4B3' },
  { word: '안녕하세요', color: '#7F77DD', tint: '#CECBF6', font: 'var(--font-kr)' },
  { word: '你好', color: '#5DCAA5', tint: '#9FE1CB', font: 'var(--font-sc)' },
  { word: 'Kamusta', color: '#D85A30', tint: '#F5C4B3' },
];

const START_DELAY_MS = 1200;
const ERASE_SPEED_MS = 40;
const SWITCH_PAUSE_MS = 400;
const TYPE_SPEED_MS = 80;
const HOLD_MS = 1600;
const FINAL_HOLD_MS = 3200;

const INITIAL_LANG = LANGS[LANGS.length - 1];

function caretColorFor(lang) {
  return lang.caret ?? lang.color;
}

export function useHeroTypewriter() {
  const [text, setText] = useState(INITIAL_LANG.word);
  const [lang, setLang] = useState(INITIAL_LANG);
  const [idle, setIdle] = useState(true);
  const aliveRef = useRef(true);
  const timeoutRef = useRef(null);

  useEffect(() => {
    aliveRef.current = true;

    const wait = (ms) =>
      new Promise((resolve) => {
        timeoutRef.current = setTimeout(resolve, ms);
      });

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return () => {
        aliveRef.current = false;
        clearTimeout(timeoutRef.current);
      };
    }

    // The typed word is threaded through this local variable, not read back
    // from React state, so there's no stale-closure risk across the awaits.
    let word = INITIAL_LANG.word;

    async function runCycle() {
      await wait(START_DELAY_MS);

      while (aliveRef.current) {
        for (let i = 0; i < LANGS.length && aliveRef.current; i++) {
          const nextLang = LANGS[i];

          setIdle(false);
          while (word.length > 0 && aliveRef.current) {
            word = word.slice(0, -1);
            setText(word);
            await wait(ERASE_SPEED_MS);
          }
          if (!aliveRef.current) return;

          await wait(SWITCH_PAUSE_MS);
          if (!aliveRef.current) return;

          setLang(nextLang);
          for (let c = 1; c <= nextLang.word.length && aliveRef.current; c++) {
            word = nextLang.word.slice(0, c);
            setText(word);
            const jitter = (Math.random() - 0.5) * 40;
            await wait(TYPE_SPEED_MS + jitter);
          }
          if (!aliveRef.current) return;

          setIdle(true);
          await wait(i === LANGS.length - 1 ? FINAL_HOLD_MS : HOLD_MS);
        }
      }
    }

    runCycle();

    return () => {
      aliveRef.current = false;
      clearTimeout(timeoutRef.current);
    };
  }, []);

  const caretColor = caretColorFor(lang);

  return {
    text,
    font: lang.font ?? 'var(--font-display)',
    caretColor,
    caretAnim: idle ? 'dopBlink 1s step-end infinite' : 'none',
    accent: caretColor,
    accentTint: lang.tint,
  };
}
