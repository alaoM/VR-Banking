import React, { useEffect, useState } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import AudioVisuals from "./AudioVisuals";
import { useRouter } from "next/router";

const VoiceRecognition = ({ balanceState }) => {
  const [message, setMessage] = useState("");
  const router = useRouter();

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
      command: ["go back", "home", "balance"],
      callback: () => router.push("/dashboard"),
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
    }
  }, [transcript]);

  const handleBalance = (showBalance) => {
    balanceState(showBalance);
  };

  const startListening = () => {
    SpeechRecognition.startListening({
      continuous: true,
      language: "en-GB",
    });
  };

  const stopListening = () => {
    SpeechRecognition.stopListening();
  };

  return (
    <div>
      <p>Message: {message}</p>
      <p>Transcript: {transcript}</p>

      <div className="card-footer bg-transparent border-top px-md-5 d-flex justify-content-between align-items-center text-center">
        <div className="row d-flex align-items-center justify-content-between">
          <div className="col-9 d-block border w-75">
            
          {listening && <AudioVisuals />}
          </div>
          <div className="col-md-3">
          <span className="fa fa-eye-slash" onClick={startListening}></span>
          <span className="fa fa-eye-slash" onClick={stopListening}></span>
          </div>
        </div>

        {/*    <div>{listening && <AudioVisuals />}</div>
        <div>
          <span className="fa fa-eye-slash" onClick={startListening}></span>
        </div>
      </div> */}
        {/* <div className="row">
        <div className="col-9">
          <div className="graph">{listening && <AudioVisuals />}</div>
        </div>
        <div className="col-3">
          <div className="mic">
            <span className="fa fa-eye-slash" onClick={startListening}></span>
          </div>{" "}
          <div className="mic">
            <span className="fa fa-eye-slash" onClick={stopListening}></span>
          </div>
        </div>
      </div> */}
      </div>

      {/* Additional functionality:
      <button onClick={resetTranscript}>Reset Transcript</button>
      <button onClick={stopListening}>Stop Listening</button>
      <textarea
        value={text}
        onChange={handleInputChange}
        placeholder="Enter text to speak"
      />
      <button onClick={handleSpeak}>Speak</button>
      {speak && <Speech text={transcript} voice="Google UK English Female" />}
      */}
    </div>
  );
};

export default VoiceRecognition;
