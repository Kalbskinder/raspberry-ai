"use client";

import Image from "next/image";
import ChatInput from "./components/ChatInput";
import { useState } from "react";

export default function Home() {
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([]);

  const handleSend = async (message: string) => {
    // User message
    setMessages((prev) => [...prev, { role: "user", content: message }]);

    // Placeholder
    const thinkingMessage = { role: "assistant", content: "Thinking ..." };
    setMessages((prev) => [...prev, thinkingMessage]);

    try {
      console.log("Sending message to API:", message);
      
      const res = await fetch(`http://localhost:8000/chat`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
          prompt: message,
        }),
      });

      console.log("API Response status:", res.status);

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();
      console.log("API Response data:", data);

      // Update the placeholder message with the actual response
      setMessages((prev) =>
        prev.map((msg, idx) =>
          idx === prev.length - 1 && msg.role === "assistant"
            ? { ...msg, content: data.reply || "No response received" }
            : msg
        )
      );
    } catch (err) {
      console.error("API Error:", err);
      const errorMessage = err instanceof Error 
        ? `Connection Error: ${err.message}. Make sure the Python API is running on http://localhost:8000`
        : "Unknown error occurred";
      
      setMessages((prev) =>
        prev.map((msg, idx) =>
          idx === prev.length - 1 && msg.role === "assistant"
            ? { ...msg, content: errorMessage }
            : msg
        )
      );
    }
  }

  return (
    <div>
      {/* Navbar */}
      <nav className="navbar">
        <div className="left">
          <Image
            src="/llama-logo.png"
            alt="Raspberry Ai Logo"
            width={34}
            height={42}
          />
          <h1 className="name">raspberry-ai</h1>
        </div>
        <div className="right">
          <select name="models" id="models">
            <option value="tinyllama">tiny-llama</option>
          </select>
        </div>
      </nav>

      {/* Chat Window */}
      <main>
        <div className="chat-container">
          <div className="chat-window">
            <div className="chat-message-container">
              {messages.map((msg, idx) => (
                <div className={`chat-message ${msg.role === "user" ? "user-message" : "assistant-message"}`} key={idx}>
                  {msg.role === "assistant" && (
                    <img
                      src="/llama-portrait.png"
                      alt="AI Avatar"
                      className="ai-avatar"
                    />
                  )}
                  <div className="message-content">
                    {msg.content}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Chat Input */}
      <div className="chat-input-container">
        <ChatInput onSend={handleSend} />
      </div>
    </div>
  );
}
