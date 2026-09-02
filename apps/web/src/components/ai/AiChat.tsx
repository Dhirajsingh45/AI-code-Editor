import { Bot, Send } from "lucide-react";
import { useState } from "react";

function AIChat() {
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (!message.trim()) return;

    console.log("User:", message);
    setMessage("");
  };

  return (
    <aside className="ai-panel">
      <div className="panel-title">
        <Bot size={16} />
        AI ASSISTANT
      </div>

      <div className="ai-messages">
        <div className="ai-welcome">
          <Bot size={28} />

          <h3>CodeForge AI</h3>

          <p>
            Ask me to explain, modify, debug,
            or generate code.
          </p>
        </div>
      </div>

      <div className="chat-input">
        <input
          type="text"
          placeholder="Ask CodeForge AI..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSend();
            }
          }}
        />

        <button onClick={handleSend}>
          <Send size={16} />
        </button>
      </div>
    </aside>
  );
}

export default AIChat;