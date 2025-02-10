import { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FaHeart } from "react-icons/fa";
import { supabase } from "./supabaseClient";
import { div } from "framer-motion/client";

export default function ValentineResponse() {
  // const location = useLocation();
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);

  const arrButton = [
    "No",
    "Are you sure? 🤔",
    "Pretty sure? 😳",
    "Please? 🥺",
    "Think about it again! 🤞",
    "Don't break my heart 💔",
    "What if I say pretty please? 🥺✨",
    "I'll write you poems! ✍️📜",
    "You're my favorite person 😍",
    "I'll love you forever ❤️",
    "Yes?",
  ];

  const currentButtonTextIndex = useRef(0);
  const noButtonRef = useRef(null);

  const query = new URLSearchParams(useLocation().search);

  useEffect(() => {
    const fetchData = async () => {
      const shortId = query.get("id");
      if (!shortId) return;

      try {
        // Fetch data from Supabase using the short ID
        const { data, error } = await supabase
          .from("valentine_messages")
          .select("*")
          .eq("short_id", shortId.trim())
          .maybeSingle();

        if (error) {
          console.error("Error fetching message:", error.message);
        } else if (!data) {
          console.log("No message found for this ID.");
        } else {
          console.log("Fetched message:", data);
        }

        setName(data.name);
        setMessage(data.message);
      } catch (error) {
        console.error("Error fetching message:", error);
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  const handleNoClick = () => {
    if (currentButtonTextIndex.current < arrButton.length - 1) {
      currentButtonTextIndex.current += 1;
      if (noButtonRef.current) {
        noButtonRef.current.textContent =
          arrButton[currentButtonTextIndex.current];
      }
    } else {
      handleResponse("accepted");
    }
  };

  const handleResponse = async (answer) => {
    setResponse(answer);
    setShowModal(true);

    const shortId = query.get("id");
    if (!shortId) {
      return;
    }

    try {
      const { error } = await supabase
        .from("valentine_messages")
        .update({ response: answer })
        .eq("short_id", shortId);

      if (error) {
        console.error("Error saving response:", error.message);
      }
    } catch (error) {
      console.error("Error updating response:", error.message);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center h-screen">
        <div className="text-pink-500 text-6xl animate-pulse">❤️</div>
        <p className="mt-4 text-pink-500 text-lg animate-pulse">
          Loading your message...
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-pink-100 to-red-100 text-center p-6">
      {/* Floating hearts background */}
      {[...Array(50)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatType: "reverse",
            delay: i * 0.1,
          }}
          className="text-red-600 absolute"
          style={{
            top: `${Math.random() * 90}%`,
            left: `${Math.random() * 90}%`,
          }}
        >
          <FaHeart size={Math.random() * 20 + 20} />
        </motion.div>
      ))}

      {/* Main Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white p-8 rounded-2xl shadow-lg max-w-md w-full relative overflow-hidden"
      >
        <h1 className="text-4xl font-bold text-red-500 mb-4">Hi, {name}</h1>
        <p className="text-gray-600 mt-2 italic">{message}</p>
        <p className="text-lg text-gray-700">Will you be my Valentine?</p>

        {/* Buttons */}
        {!response ? (
          <div className="flex w-full justify-center space-x-32 mt-6">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="bg-gradient-to-r from-pink-500 to-red-500 cursor-pointer text-white px-6 py-1 rounded-lg hover:shadow-lg transition-all"
              onClick={() => {
                handleResponse("accepted");
              }}
            >
              Yes
            </motion.button>

            <button
              ref={noButtonRef}
              className="border px-6 py-1 rounded-lg hover:bg-red-600 hover:text-white hover:border-red-600 hover:shadow-lg duration-500 cursor-pointer transition-all"
              onClick={handleNoClick}
            >
              {arrButton[currentButtonTextIndex.current]}
            </button>
          </div>
        ) : null}
      </motion.div>

      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="bg-white p-8 rounded-2xl shadow-lg max-w-md w-full text-center relative overflow-hidden"
            >
              <h2 className="text-3xl font-bold text-red-500 mb-4">
                Yay! 🎉 You said Yes!
              </h2>
              <p className="text-lg text-gray-700 mb-4">
                Get ready for a special day together! 💕
              </p>

              <motion.img
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
                src="https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExZ3gzNTBtdzhuejlpaXNvdGRvNjNpcmltYjhzeW5wa3oxeHd2MjJnNyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/gDfteqLchLcRTtjAD7/giphy.gif"
                alt="Celebration"
                className="w-full h-64 object-cover rounded-lg"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
