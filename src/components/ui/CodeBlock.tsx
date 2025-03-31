"use client";

import { CopyBlock as CopyBlockPackage, dracula } from "react-code-blocks";

interface CodeBlockProps {
  language: string;
  className?: string;
  text: string;
}

const CodeBlock = ({ text, language, className = "" }: CodeBlockProps) => {
  const copy = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
    } else {
      const textArea = document.createElement("textarea");
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
    }
  };

  return (
    <div className={`code-block relative ${className}`}>
      <CopyBlockPackage
        text={text}
        language={language}
        theme={dracula}
        onCopy={copy}
      />
      <div className="absolute top-4 right-10 flex items-center gap-2 !text-xs text-gray-100">
        <span>{language}</span>
      </div>
    </div>
  );
};

export default CodeBlock;
