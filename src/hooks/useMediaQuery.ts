import { useState, useEffect } from 'react';

/**
 * メディアクエリの状態を管理するカスタムフック
 * @param query - メディアクエリ文字列（例：'(max-width: 768px)'）
 * @returns メディアクエリにマッチするかどうかのboolean値
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches !== matches) {
      setMatches(media.matches);
    }

    const listener = () => setMatches(media.matches);
    media.addEventListener('change', listener);
    return () => media.removeEventListener('change', listener);
  }, [matches, query]);

  return matches;
}