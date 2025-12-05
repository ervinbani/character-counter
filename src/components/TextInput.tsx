import React, { useState } from "react";
import type { TextInputProps } from "../types";

function TextInput({
  onTextChange,
  placeholder = "Enter text...",
  initialValue = "",
}: TextInputProps) {
  const [text, setText] = useState<string>(initialValue);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value;
    setText(newText);
    onTextChange(newText);
  };

  return (
    <textarea
      value={text}
      onChange={handleChange}
      placeholder={placeholder}
      className="text-input"
      rows={6}
    />
  );
}

export default TextInput;
