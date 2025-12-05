import { useState } from "react";
import TextInput from "./TextInput";
import StatsDisplay from "./StatsDisplay";
import type { CharacterCounterProps, TextStats } from "../types";
import "./CharacterCounter.css";

function CharacterCounter({
  minWords,
  maxWords,
  targetReadingTime,
}: CharacterCounterProps) {
  const [text, setText] = useState<string>("");
  const [stats, setStats] = useState<TextStats>({
    characterCount: 0,
    wordCount: 0,
    readingTime: 0,
  });

  const calculateStats = (inputText: string): TextStats => {
    // Handle empty input
    if (!inputText || inputText.trim() === "") {
      return {
        characterCount: 0,
        wordCount: 0,
        readingTime: 0,
      };
    }

    const characterCount = inputText.length;

    // Count words (split by whitespace and filter empty strings)
    // Handle special characters and multiple spaces properly
    const words = inputText
      .trim()
      .split(/\s+/)
      .filter((word) => word.length > 0);
    const wordCount = words.length;

    // Calculate reading time (average reading speed: 200 words per minute)
    // Always show at least 1 minute if there are words
    const readingTime = wordCount > 0 ? Math.max(1, Math.ceil(wordCount / 200)) : 0;

    return {
      characterCount,
      wordCount,
      readingTime,
    };
  };

  const handleTextChange = (newText: string) => {
    // Handle very long text by limiting to reasonable size
    const maxAllowedLength = 50000; // 50k characters max
    const textToProcess = newText.length > maxAllowedLength 
      ? newText.substring(0, maxAllowedLength) 
      : newText;
    
    setText(textToProcess);
    const newStats = calculateStats(textToProcess);
    setStats(newStats);
  };

  const getValidationMessage = (): string | null => {
    if (minWords && stats.wordCount < minWords) {
      return `Minimum ${minWords} words required (current: ${stats.wordCount})`;
    }
    if (maxWords && stats.wordCount > maxWords) {
      return `Maximum ${maxWords} words allowed (current: ${stats.wordCount})`;
    }
    if (targetReadingTime && stats.readingTime > targetReadingTime) {
      return `Target reading time: ${targetReadingTime} minutes (current: ${stats.readingTime})`;
    }
    return null;
  };

  const validationMessage = getValidationMessage();

  const handleClear = () => {
    setText("");
    setStats({
      characterCount: 0,
      wordCount: 0,
      readingTime: 0,
    });
  };

  return (
    <div className="character-counter">
      <h1>Character Counter</h1>

      <TextInput
        onTextChange={handleTextChange}
        placeholder="Start typing..."
        initialValue={text}
        onClear={handleClear}
      />

      <StatsDisplay
        stats={stats}
        showReadingTime={true}
        minWords={minWords}
        maxWords={maxWords}
      />

      {validationMessage && (
        <div className="validation-message">{validationMessage}</div>
      )}
    </div>
  );
}

export default CharacterCounter;
