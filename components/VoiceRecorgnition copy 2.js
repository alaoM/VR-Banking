import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import AudioVisuals from "./AudioVisuals";

const VoiceRecognition = ({ balanceState }) => {
  const [message, setMessage] = useState("");
  const router = useRouter();
  const [listen, setListen] = useState(false);

  const commands = [
    {
      command: "reset",
      callback: () => resetTranscript(),
    },
    {
      command: "transfer",
      callback: () => router.push("/transfer"),
    },
    {
      command: ["go back", "home"],
      callback: () => router.push("/"),
    },
    {
      command: "shut up",
      callback: () => setMessage("I wasn't talking."),
    },
    {
      command: "Hello",
      callback: () => setMessage("Hi there!"),
    },
    {
      command: [
        "get balance",
        "my balance",
        "account balance",
        "display balance",
        "reveal balance",
        "Show Balance",
        "display my balance",
        "reveal my balance",
        "Show My Balance",
        "How much is my balance",
      ],
      callback: () => {
        setMessage("Show Balance");
        handleBalance(true);
      },
    },
    {
      command: [
        "Hide Balance",
        "Hide my Balance",
        "close my balance",
        "close Balance",
      ],
      callback: () => {
        setMessage("Hide Balance");
        handleBalance(false);
      },
    },
  ];

  const { transcript, resetTranscript, listening } = useSpeechRecognition({
    commands,
  });

  useEffect(() => {
    if (transcript !== "") {
      console.log("Transcript:", transcript);
      processTranscript(transcript);
    }
  }, [transcript]);

  const processTranscript = (transcript) => {
    const sentences = transcript.split("."); // Split transcript into individual sentences

    sentences.forEach((sentence) => {
      const sanitizedSentence = sentence.trim().toLowerCase();
      if (sanitizedSentence !== "") {
        processVoiceCommand(sanitizedSentence);
      }
    });
  };

  const processVoiceCommand = (command) => {
    // Modify the logic based on the recognized voice command
    if (command === "reset") {
      resetTranscript();
    } else if (command === "transfer") {
      router.push("/transfer");
    } else if (command === "go back" || command === "home") {
      router.push("/");
    } else if (command === "shut up") {
      setMessage("I wasn't talking.");
    } else if (command === "hello") {
      setMessage("Hi there!");
    } else if (
      [
        "get balance",
        "my balance",
        "account balance",
        "display balance",
        "reveal balance",
        "show balance",
        "display my balance",
        "reveal my balance",
        "show my balance",
        "how much is my balance",
      ].includes(command)
    ) {
      setMessage("Show Balance");
      handleBalance(true);
    } else if (
      [
        "hide balance",
        "hide my balance",
        "close my balance",
        "close balance",
      ].includes(command)
    ) {
      setMessage("Hide Balance");
      handleBalance(false);
    }
  };

  const handleBalance = (showBalance) => {
    balanceState(showBalance);
  };

  const startListening = () => {
    setListen(true);
    SpeechRecognition.startListening({
      continuous: true,
      language: "en-GB",
    });
  };

  const stopListening = () => {
    SpeechRecognition.stopListening();
    resetTranscript();
    setListen(false);
  };

  return (
    <div>
      <p>Message: {message}</p>
      <p>Transcript: {transcript}</p>
      <div className="card-footer bg-transparent border-top px-md-5 text-center">
        <p> {listening && <AudioVisuals />}</p>
        <div className="d-flex justify-content-center align-items-center">
          {listening ? (
            <div className="me-3 icon-box text-danger">
              <span
                className="fa fa-microphone-slash h1"
                onClick={stopListening}
              ></span>
            </div>
          ) : (
            <div className="me-3 icon-box">
              <span
                className="fa fa-microphone h1"
                onClick={startListening}
              ></span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VoiceRecognition;
