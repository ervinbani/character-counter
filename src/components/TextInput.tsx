import React, { useState } from "react";
import type { TextInputProps } from "../types";

function TextInput({
  onTextChange,
  placeholder = "Enter text...",
  initialValue = "",
  maxLength,
  onClear,
}: TextInputProps) {
  const [text, setText] = useState<string>(initialValue);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value;
    
    // Respect maxLength if provided
    if (maxLength && newText.length > maxLength) {
      return;
    }
    
    setText(newText);
    onTextChange(newText);
  };

  const handleClear = () => {
    setText("");
    onTextChange("");
    if (onClear) {
      onClear();
    }
  };

  return (
    <div className="text-input-container">
      <textarea
        value={text}
        onChange={handleChange}
        placeholder={placeholder}
        className="text-input"
        rows={6}
      />
      {maxLength && (
        <div className="character-limit">
          {text.length} / {maxLength} characters
        </div>
      )}
      {onClear && text.length > 0 && (
        <button onClick={handleClear} className="clear-button">
          Clear Text
        </button>
      )}
    </div>
  );
}

export default TextInput;
