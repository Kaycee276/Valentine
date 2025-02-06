import { useState } from "react";
import { motion } from "framer-motion";

export default function ValentineInvite() {
  const [sent, setSent] = useState(false);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [link, setLink] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  const generateLink = () => {
    if (!name || !message) {
      setShowAlert(true);
      return;
    }
    const uniqueId = Math.random().toString(36).substring(7);
    const inviteLink = `${
      window.location.origin
    }/invite/${uniqueId}?name=${encodeURIComponent(
      name
    )}&message=${encodeURIComponent(message)}`;
    setLink(inviteLink);
    setSent(true);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#FFACAC] text-center p-6">
      <motion.div
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ repeat: Infinity, duration: 1.5 }}
        className="absolute transform translate-x-60 top-10 text-red-500"
      >
        <img src="/3d-heart.png" alt="" className="w-24 h-auto" />
      </motion.div>
      {showAlert && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="bg-red-500 text-white px-4 py-2 rounded-md mb-4 shadow-lg"
        >
          Please enter name and message!
          <button
            className="ml-2 text-white cursor-pointer font-bold"
            onClick={() => setShowAlert(false)}
          >
            ✖
          </button>
        </motion.div>
      )}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white p-8 rounded-2xl shadow-lg max-w-md w-full"
      >
        <h1 className="text-3xl font-bold text-red-500 mb-4">
          Be My Valentine? 💖
        </h1>
        {!sent ? (
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Your Valentine's Name"
              className="w-full p-3 border rounded-lg"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <textarea
              placeholder="Write a short romantic message"
              className="w-full p-3 border resize-none rounded-lg h-24"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            ></textarea>
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="absolute transform -translate-x-14 text-red-600"
            >
              <img src="/3d-heart.png" alt="" className="w-18 h-auto" />
            </motion.div>
            <button
              className="bg-[#DB005B] text-white px-6 py-3 rounded-full cursor-pointer hover:bg-red-600 transition"
              onClick={generateLink}
            >
              Generate Invitation Link 💌
            </button>
          </div>
        ) : (
          <div>
            <h2 className="text-xl font-semibold text-green-500">
              Invitation Created! 🎉
            </h2>
            <p className="text-gray-700 mt-2">
              Share this link with your Valentine:
            </p>
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 underline mt-2 block"
            >
              {link.length > 50 ? `${link.substring(0, 50)}...` : link}
            </a>

            <button
              onClick={() => {
                navigator.clipboard.writeText(link);
                alert("Link copied to clipboard!");
              }}
              className="mt-4 bg-blue-500 text-white px-3 py-1 rounded-full hover:bg-blue-600 transition cursor-pointer"
            >
              Copy Link 📋
            </button>
          </div>
        )}
      </motion.div>
    </div>
  );
}
