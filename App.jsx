import React, { useState, useRef, useEffect } from "react";

function App() {
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hi! How can I help you today?" },
  ]);
  const [input, setInput] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchHistory, setSearchHistory] = useState([]);
  const [languageDropdownOpen, setLanguageDropdownOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("English");

  const bottomRef = useRef(null);
  const sidebarRef = useRef(null);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = input;
    const aiResponse = `You said: "${input}"`;

    setMessages((prev) => [
      ...prev,
      { sender: "user", text: userMessage },
      { sender: "bot", text: aiResponse },
    ]);

    setSearchHistory((prev) => [
      ...prev,
      { text: userMessage, timestamp: new Date().toLocaleString() },
    ]);
    setInput("");

    try {
      const res = await fetch("http://localhost:5000/api/save-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userMessage, aiResponse }),
      });
      const data = await res.json();
      console.log("✅ API Response:", data);
    } catch (error) {
      console.error("❌ Error saving chat:", error);
    }
  };

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });

    const handleClickOutside = (e) => {
      if (sidebarRef.current && !sidebarRef.current.contains(e.target)) {
        setSidebarOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundImage:
          "url(https://r2.erweima.ai/i/2eL3ODvJS0Ool5VMJeyieA.png)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        overflow: "hidden",
      }}
    >
      {/* Main Container */}
      <div
        style={{
          display: "flex",
          width: "95%",
          maxWidth: "1200px",
          height: "95%",
          boxShadow: "0 0 30px rgba(0,0,0,0.2)",
          borderRadius: "16px",
          overflow: "hidden",
        }}
      >
        {/* Sidebar */}
        <div
          ref={sidebarRef}
          style={{
            width: sidebarOpen ? "240px" : "0",
            transition: "width 0.3s ease",
            overflow: "hidden",
            backgroundColor: "#222",
            color: "#fff",
            padding: sidebarOpen ? "1rem" : "0",
            zIndex: 10,
          }}
        >
          {sidebarOpen && (
            <>
              <h2 style={{ marginBottom: "1rem", color: "#ffcccb" }}>
                Doctor Prescription
              </h2>
              <button style={sidebarButtonStyle}>💊 Simple Medicines</button>
              <button style={sidebarButtonStyle}>💊 Complex Medicines</button>

              <h3 style={{ marginTop: "2rem", color: "#ffcccb" }}>
                Search History
              </h3>
              <div
                style={{ marginTop: "1rem", maxHeight: "300px", overflowY: "auto" }}
              >
                {searchHistory.map((item, i) => (
                  <div
                    key={i}
                    style={{
                      backgroundColor: "#2e2e2e",
                      padding: "0.5rem",
                      borderRadius: "8px",
                      marginBottom: "0.5rem",
                      boxShadow: "0 0 5px rgba(255,255,255,0.1)",
                    }}
                  >
                    <p style={{ margin: 0, color: "#fff" }}>{item.text}</p>
                    <p
                      style={{
                        margin: 0,
                        fontSize: "0.75rem",
                        color: "#aaa",
                      }}
                    >
                      🕒 {item.timestamp}
                    </p>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Chat Area */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            backdropFilter: "blur(6px)",
            backgroundColor: "rgba(255, 255, 255, 0.2)",
            padding: "1rem",
          }}
        >
          <button
  onClick={(e) => {
    e.stopPropagation();
    setSidebarOpen((prev) => !prev);
  }}
  style={{
    backgroundColor: "#007bff", // Blue background
    color: "#fff",              // White ☰ icon
    border: "none",
    padding: "0.5rem",
    marginBottom: "1rem",
    borderRadius: "6px",
    width: "40px",
    height: "40px",
    fontSize: "20px",
    cursor: "pointer",
    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.3)", // subtle shadow
    transition: "background-color 0.3s ease",
  }}
  onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#0056b3")}
  onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#007bff")}
>
  ☰
</button>

          {/* Avatar & Title */}
          <div style={{ textAlign: "center", marginBottom: "0.5rem" }}>
            <img
              src="https://cdn.pixabay.com/photo/2016/09/16/19/19/icon-1674909_1280.png"
              alt="Doctor"
              style={{
                width: "100px",
                height: "100px",
                borderRadius: "50%",
                objectFit: "cover",
                border: "3px solid white",
              }}
            />
          </div>
          <h1
            style={{
              color: "#fff",
              textAlign: "center",
              textShadow: "1px 1px 4px rgba(0,0,0,0.6)",
              marginBottom: "1rem",
            }}
          >
            DOCTOR I
          </h1>

          {/* Chat Messages */}
          <div
            style={{
              flex: 1,
              overflowY: "auto",
              backgroundColor: "rgba(255, 255, 255, 0.9)",
              padding: "1rem",
              borderRadius: "8px",
              marginBottom: "1rem",
            }}
          >
            {messages.map((msg, i) => (
              <div
                key={i}
                style={{
                  textAlign: msg.sender === "user" ? "right" : "left",
                  marginBottom: "0.5rem",
                }}
              >
                <span
                  style={{
                    display: "inline-block",
                    padding: "0.5rem 1rem",
                    borderRadius: "12px",
                    backgroundColor:
                      msg.sender === "user" ? "#007bff" : "#e5e5ea",
                    color: msg.sender === "user" ? "white" : "black",
                  }}
                >
                  {msg.text}
                </span>
              </div>
            ))}
            <div ref={bottomRef} />
          </div>

          {/* Input Row */}
          <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Type your message..."
              style={{
                flex: 1,
                padding: "0.5rem",
                borderRadius: "6px",
                border: "1px solid #ccc",
                fontSize: "1rem",
              }}
            />
            <button
              onClick={handleSend}
              style={{
                padding: "0.5rem 1.5rem",
                borderRadius: "50px",
                backgroundColor: "#007bff",
                color: "white",
                border: "none",
                cursor: "pointer",
              }}
            >
              Send
            </button>

            {/* Language Dropdown */}
            <div style={{ position: "relative" }}>
              <button
                title="Voice Input"
                onClick={() => setLanguageDropdownOpen((prev) => !prev)}
                style={{
                  backgroundColor: "#007bff",
                  border: "none",
                  color: "white",
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  fontSize: "18px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 2px 5px rgba(0,0,0,0.3)",
                  cursor: "pointer",
                }}
              >
                🎤
              </button>

              {languageDropdownOpen && (
                <div
                  style={{
                    position: "absolute",
                    top: "45px",
                    right: 0,
                    backgroundColor: "#fff",
                    border: "1px solid #ccc",
                    borderRadius: "6px",
                    boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
                    zIndex: 5,
                  }}
                >
                  {["English", "Hindi", "Tamil", "Telugu", "Kannada", "Bengali"].map(
                    (lang) => (
                      <div
                        key={lang}
                        onClick={() => {
                          setSelectedLanguage(lang);
                          setLanguageDropdownOpen(false);
                        }}
                        style={{
                          padding: "0.5rem 1rem",
                          cursor: "pointer",
                          backgroundColor:
                            selectedLanguage === lang ? "#f0f0f0" : "#fff",
                        }}
                      >
                        {lang}
                      </div>
                    )
                  )}
                </div>
              )}
              <p
                style={{
                  fontSize: "0.7rem",
                  color: "#333",
                  marginTop: "0.2rem",
                  textAlign: "center",
                }}
              >
                {selectedLanguage}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const sidebarButtonStyle = {
  backgroundColor: "#444",
  color: "#fff",
  border: "none",
  padding: "10px",
  marginBottom: "0.5rem",
  borderRadius: "6px",
  textAlign: "left",
  cursor: "pointer",
  width: "100%",
};

export default App;

