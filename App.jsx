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

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages((prev) => [
      ...prev,
      { sender: "user", text: input },
      { sender: "bot", text: `You said: "${input}"` },
    ]);
    setSearchHistory((prev) => [...prev, input]);
    setInput("");
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
        display: "flex",
        height: "100vh",
        backgroundImage:
          "url(https://r2.erweima.ai/i/2eL3ODvJS0Ool5VMJeyieA.png)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        overflow: "hidden",
      }}
    >
      {/* Sidebar */}
      <div
        ref={sidebarRef}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          height: "100%",
          width: "240px",
          backgroundColor: "#222",
          color: "#fff",
          transform: sidebarOpen ? "translateX(0)" : "translateX(-100%)",
          transition: "transform 0.3s ease",
          padding: "1rem",
          zIndex: 10,
        }}
      >
        <h2 style={{ marginBottom: "1rem", color: "#ffcccb" }}>
          Doctor Prescription
        </h2>
        <button style={sidebarButtonStyle}>💊 Simple Medicines</button>
        <button style={sidebarButtonStyle}>💊 Complex Medicines</button>

        <h3 style={{ marginTop: "2rem", color: "#ffcccb" }}>Search History</h3>
        <ul style={{ paddingLeft: "20px" }}>
          {searchHistory.map((item, i) => (
            <li key={i} style={{ color: "#fff", marginBottom: "0.5rem" }}>
              {item}
            </li>
          ))}
        </ul>
      </div>

      {/* Chat Area */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          backdropFilter: "blur(5px)",
          backgroundColor: "rgba(255, 255, 255, 0.3)",
          padding: "1rem",
        }}
      >
        {/* Toggle Sidebar Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setSidebarOpen((prev) => !prev);
          }}
          style={{
            backgroundColor: "#fff",
            border: "1px solid #ccc",
            padding: "0.5rem",
            marginBottom: "1rem",
            borderRadius: "6px",
            width: "40px",
            cursor: "pointer",
            zIndex: 20,
          }}
        >
          ☰
        </button>

        {/* Doctor Avatar */}
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

        {/* Messages Display */}
        <div
          style={{
            flex: 1,
            overflowY: "auto",
            backgroundColor: "rgba(255, 255, 255, 0.85)",
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

        {/* Input Box & Buttons */}
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

          {/* Mic Button with Language Dropdown */}
          <div style={{ position: "relative" }}>
            <button
              title="Voice Input"
              onClick={() =>
                setLanguageDropdownOpen((prev) => !prev)
              }
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
                {["English", "Hindi", "Tamil", "Telugu", "Kannada", "Bengali"].map((lang) => (
                  <div
                    key={lang}
                    onClick={() => {
                      setSelectedLanguage(lang);
                      setLanguageDropdownOpen(false);
                    }}
                    style={{
                      padding: "0.5rem 1rem",
                      cursor: "pointer",
                      backgroundColor: selectedLanguage === lang ? "#f0f0f0" : "#fff",
                    }}
                  >
                    {lang}
                  </div>
                ))}
              </div>
            )}
            {/* Show Selected Language */}
            <p style={{ fontSize: "0.7rem", color: "#333", marginTop: "0.2rem", textAlign: "center" }}>
              {selectedLanguage}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// Sidebar Button Style
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