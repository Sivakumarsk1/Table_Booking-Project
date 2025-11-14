import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

function Home() {
  const [chatOpen, setChatOpen] = useState(false);
  const [chatHistory, setChatHistory] = useState([]);
  const [userInput, setUserInput] = useState("");

  const handleSendMessage = () => {
    if (!userInput.trim()) return;

    const userMessage = { sender: "user", text: userInput };
    const botMessage = getBotReply(userInput);

    setChatHistory((prev) => [...prev, userMessage, botMessage]);
    setUserInput("");
  };

  const getBotReply = (input) => {
    const lowerInput = input.toLowerCase();

    if (lowerInput.includes("table") || lowerInput.includes("book")) {
      return {
        sender: "bot",
        text:
          "To book a table:\n1. Select a date\n2. Choose a time\n3. Pick a table\n4. Click Confirm Reservation",
      };
    } else if (lowerInput.includes("menu")) {
      return {
        sender: "bot",
        text: "You can view our menu on the 'Menu' page in the navigation bar.",
      };
    } else if (lowerInput.includes("hi") || lowerInput.includes("hello")) {
      return { sender: "bot", text: "Hello! How can I assist you today? 😊" };
    } else {
      return {
        sender: "bot",
        text:
          "Sorry, I didn't understand that. Please ask about table booking, menu, or opening hours.",
      };
    }
  };

  return (
    <div className="relative min-h-screen">
      {/* Hero Section */}
      <div
        className="h-screen bg-cover bg-center relative"
        style={{
          backgroundImage:
            'linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url("https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80")',
        }}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-5xl md:text-7xl font-bold text-primary mb-6"
            >
              Latheef Bhai Biryani Restaurant
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl md:text-2xl text-white mb-8"
            >
              Experience romance in every bite
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <Link
                to="/reservation"
                className="bg-primary text-dark px-8 py-3 rounded-full text-lg font-semibold hover:bg-primary/90 transition"
              >
                Make a Reservation
              </Link>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="py-20 bg-secondary">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="text-center"
              >
                <div className="text-4xl text-primary mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Floating Chat Icon */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setChatOpen(!chatOpen)}
          className="bg-primary text-white w-14 h-14 rounded-full shadow-lg flex items-center justify-center text-2xl hover:bg-primary/90 transition"
        >
          💬
        </button>
      </div>

      {/* Chatbot */}
      {chatOpen && (
        <div className="fixed bottom-24 right-6 w-80 bg-white rounded-lg shadow-lg p-4 z-50">
          <div className="flex justify-between items-center border-b pb-2 mb-2">
            <h4 className="font-semibold text-primary">Chat with us</h4>
            <button onClick={() => setChatOpen(false)} className="text-sm text-gray-500">
              ✖
            </button>
          </div>
          <div className="h-56 overflow-y-auto text-sm text-gray-800 mb-2 space-y-2">
            {chatHistory.map((msg, idx) => (
              <div
                key={idx}
                className={`p-2 rounded-md max-w-xs ${
                  msg.sender === "user"
                    ? "bg-blue-100 text-right self-end ml-auto"
                    : "bg-gray-100"
                }`}
              >
                {msg.text}
              </div>
            ))}
          </div>
          <div className="flex space-x-2">
            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
              placeholder="Type your message..."
              className="flex-1 px-3 py-2 border rounded text-sm focus:outline-none"
            />
            <button
              onClick={handleSendMessage}
              className="px-3 py-2 bg-primary text-white rounded text-sm"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

const features = [
  {
    icon: "🕯️",
    title: "Romantic Atmosphere",
    description: "Carefully curated ambiance for the perfect date night",
  },
  {
    icon: "🍷",
    title: "Fine Dining",
    description: "Exquisite cuisine prepared by world-class chefs",
  },
  {
    icon: "🎵",
    title: "Live Music",
    description: "Soft melodies to enhance your dining experience",
  },
];

export default Home;
