"use client";
import { useState, useRef, useEffect } from "react";
import styles from "./ChatInput.module.css";

interface ChatInputProps {
  onSend?: (message: string) => void;
}

export default function ChatInput({ onSend }: ChatInputProps) {
  const [message, setMessage] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    // initial height
    if (textareaRef.current) {
      const ta = textareaRef.current;
      ta.style.height = "auto";
      ta.style.height = Math.min(ta.scrollHeight, 200) + "px";
    }
  }, []);

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const ta = textareaRef.current;
    if (!ta) return;
    ta.style.height = "auto";
    ta.style.height = Math.min(ta.scrollHeight, 200) + "px";
    setMessage(e.target.value);
  };

  const handleSend = () => {
    if (!message.trim()) return;
    onSend?.(message);
    setMessage("");

    const ta = textareaRef.current;
    if (ta) ta.style.height = "40px";
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className={styles.container}>
      <textarea
        ref={textareaRef}
        className={styles.textarea}
        value={message}
        onChange={handleInput}
        onKeyDown={handleKeyDown}
        rows={1}
        placeholder="Ask a question ..."
        aria-label="Chat input"
      />
      <button
        type="button"
        className={styles.sendButton}
        onClick={handleSend}
        aria-label="Send"
      >
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M22 12L11 3 2 12"></path>
          <path d="M11 3v18"></path>
        </svg>
      </button>
    </div>
  );
}
