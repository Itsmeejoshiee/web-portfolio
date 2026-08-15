import { useEffect, useRef, useState } from 'react';

// Hex literals (not CSS vars) since these feed the three.js sticker
// materials as well as the DOM caret — keep in sync with tokens.css.
// Each language gets its own 4-color set (accent, tint, swatchC, swatchD)
// so every sticker in the hero cluster re-colors together, and no two
// languages share the same accent (Hello and Kamusta used to collide).
const LANGS = [
  { word: 'Hello,', accent: '#D85A30', tint: '#F5C4B3', swatchC: '#F3DFB6', swatchD: '#ED93B1' },
  {
    word: '안녕하세요,',
    accent: '#7F77DD',
    tint: '#CECBF6',
    swatchC: '#9FE1CB',
    swatchD: '#F4C0D1',
    font: 'var(--font-kr)',
  },
  {
    word: '你好,',
    accent: '#5DCAA5',
    tint: '#9FE1CB',
    swatchC: '#CECBF6',
    swatchD: '#F3DFB6',
    font: 'var(--font-sc)',
  },
  { word: 'Kamusta,', accent: '#ED93B1', tint: '#F4C0D1', swatchC: '#F5C4B3', swatchD: '#7F77DD' },
];

const START_DELAY_MS = 1200;
const ERASE_SPEED_MS = 40;
const SWITCH_PAUSE_MS = 400;
const TYPE_SPEED_MS = 80;
const HOLD_MS = 1600;
const FINAL_HOLD_MS = 3200;

const INITIAL_LANG = LANGS[LANGS.length - 1];

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

  return {
    text,
    font: lang.font ?? 'var(--font-display)',
    caretColor: lang.accent,
    caretAnim: idle ? 'dopBlink 1s step-end infinite' : 'none',
    accent: lang.accent,
    accentTint: lang.tint,
    swatchC: lang.swatchC,
    swatchD: lang.swatchD,
  };
}
