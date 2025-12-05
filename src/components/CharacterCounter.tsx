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
    const characterCount = inputText.length;

    // Count words (split by whitespace and filter empty strings)
    const words = inputText
      .trim()
      .split(/\s+/)
      .filter((word) => word.length > 0);
    const wordCount = inputText.trim() === "" ? 0 : words.length;

    // Calculate reading time (average reading speed: 200 words per minute)
    const readingTime = Math.ceil(wordCount / 200);

    return {
      characterCount,
      wordCount,
      readingTime,
    };
  };

  const handleTextChange = (newText: string) => {
    setText(newText);
    const newStats = calculateStats(newText);
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

  return (
    <div className="character-counter">
      <h1>Character Counter</h1>

      <TextInput
        onTextChange={handleTextChange}
        placeholder="Start typing..."
        initialValue={text}
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
