import { useEffect, useState } from 'react';

interface Props {
  text: string;
  className?: string;
  delay?: number;
}

export default function StaggeredText({ text, className, delay = 50 }: Props): JSX.Element {
  const [displayedWords, setDisplayedWords] = useState<string[]>([]);

  useEffect(() => {
    const words = text.split(' ');
    let index = 0;

    const interval = setInterval(() => {
      if (index < words.length) {
        setDisplayedWords((prev) => [...prev, words[index]]);
        index++;
      } else {
        clearInterval(interval);
      }
    }, delay);

    return () => clearInterval(interval);
  }, [text, delay]);

  return (
    <div className={`staggered-text ${className || ''}`}>
      {displayedWords.map((word, idx) => (
        <span key={idx} className={`word word-${idx}`}>
          {word}{' '}
        </span>
      ))}
    </div>
  );
}
