import AudioVisuals from "@/components/AudioVisuals";
import { handleSpeak } from "@/utils/handleSpeak";
import React, { useEffect, useRef, useState } from "react";

const SpeechRecognitionTest = () => {
  const [transcript, setTranscript] = useState("");
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef(null);
  const transcriptRef = useRef(null);

  useEffect(() => {
    let recognition;
    let SpeechRecognition;

    if (typeof window !== "undefined") {
      SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;
      recognition = new SpeechRecognition();
      recognitionRef.current = recognition;
    }

    if (recognition) {
      recognition.lang = "en-US";

      recognition.onstart = () => {
        setIsListening(true);
        console.log("Speech recognition started");
      };

      recognition.onresult = (event) => {
        const { transcript } = event.results[0][0];
        setTranscript(transcript);
        console.log("Transcript:", transcript);
        processTranscript(transcript);
      };

      recognition.onend = () => {
        setIsListening(false);
        console.log("Speech recognition ended");
        recognition.stop();
      };

      recognition.onerror = (event) => {
        console.error("Speech recognition error:", event.error);
      };
    } else {
      console.error("Speech recognition is not supported in this browser.");
    }
  }, []);

  const startListening = () => {
    const recognition = recognitionRef.current;
    if (recognition) {
      recognition.lang = "en-US";
      recognition.start();
    } else {
      console.error("Speech recognition is not supported in this browser.");
    }
  };

  const stopListening = () => {
    const recognition = recognitionRef.current;
    if (recognition) {
      recognition.stop();
    }
  };

  const processTranscript = (transcript) => {
    const sanitizedTranscript = transcript.toLowerCase();

    console.log("sanitizedTranscript", sanitizedTranscript)

  
    if (sanitizedTranscript.includes("get account balance")) {
      // Perform logic to get the account balance
      console.log("Getting account balance...");
    }
  
    if (sanitizedTranscript.includes("create account")) {
      // Perform logic to create a new account
      console.log("Creating account...");
    }
  
    if (
      sanitizedTranscript.includes("money transfer") ||
      sanitizedTranscript.includes("send money") ||
      sanitizedTranscript.includes("transfer funds")
    ) {
      // Perform logic to initiate a money transfer
      handleSpeak("Initiating money transfer...")
      console.log("Initiating money transfer...");
    }
  
    // Add more keywords and corresponding actions as needed
  };
  

  useEffect(() => {
    transcriptRef.current.textContent = transcript;
  }, [transcript]);

  return (
    <div>
      <p ref={transcriptRef}>Transcript: {transcript}</p>
      <p>{isListening && <AudioVisuals />}</p>
      <button onClick={startListening} disabled={isListening}>
        Start Listening
      </button>
      <button onClick={stopListening} disabled={!isListening}>
        Stop Listening
      </button>
    </div>
  );
};

export default SpeechRecognitionTest;
