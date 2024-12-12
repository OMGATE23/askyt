import { useEffect, useState } from 'react';

interface Props {
  text: string;
  className?: string;
}

export default function StaggeredText(props: Props) {
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    const delay = 5;
    let index = 0;

    setIsTyping(true);
    const interval = setInterval(() => {
      if (index < props.text.length - 1) {
        setDisplayedText((prev) => prev + props.text[index]);
        index++;
      } else {
        clearInterval(interval);
        setIsTyping(false);
      }
    }, delay);

    return () => clearInterval(interval);
  }, [props.text]);

  return (
    <div className={`staggered-text ${props.className || ''}`}>
      {displayedText.split('').map((char, index) => (
        <span
          key={index}
          className={`char char-${index + 1} ${isTyping ? 'typing' : ''}`}
        >
          {char}
        </span>
      ))}
    </div>
  );
};
