import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { biodata } from "@/utils/biodata.js";

const VoiceBankingApp = () => {
  const { register, handleSubmit, setValue } = useForm();
  const [currentAccount, setCurrentAccount] = useState(null);
  const { transcript, resetTranscript } = useSpeechRecognition();
 
  useEffect(() => {
    SpeechRecognition.startListening({ continuous: true });
    return () => {
      SpeechRecognition.stopListening();
    };
  }, []);

  const findAccount = (accountNumber) => {
    return biodata.find((data) => data.accountNumber === accountNumber);
  };

  const handleAccountNumber = (data) => {
    const { accountNumber } = data;
    const account = findAccount(accountNumber);

    if (account) {
      setCurrentAccount(account);
      setValue("bankName", account.bankName);
      setValue("userName", account.username);
    } else {
      speak("Account not found");
    }
  };

  const handleAmount = (data) => {
    const { amount } = data;

    if (currentAccount.bal >= amount) {
      speak("Transaction successful");
      // Perform the transfer logic here
    } else {
      speak("Insufficient amount");
    }
  };

  const speak = (text) => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      const synthesis = window.speechSynthesis;
      const utterance = new SpeechSynthesisUtterance(text);
      synthesis.speak(utterance);
    } else {
      console.log("Text-to-speech is not supported in this environment");
    }
  };

  const handleResult = () => {
    if (transcript) {
      const result = transcript.toLowerCase();

      if (result.includes("transfer")) {
        handleSubmit(handleAmount)();
      } else {
        speak("Invalid command");
      }

      resetTranscript();
    }
  };

  return (
    <div>
      <h1>Voice-based Banking Application</h1>
      <form onSubmit={handleSubmit(handleAccountNumber)}>
        <label htmlFor="accountNumber">Account Number:</label>
        <input id="accountNumber" type="text" {...register("accountNumber")} />
        <button type="submit">Proceed</button>
      </form>

      {currentAccount && (
        <form onSubmit={handleSubmit(handleAmount)}>
          <label htmlFor="bankName">Bank Name:</label>
          <input
            id="bankName"
            type="text"
            defaultValue={currentAccount.bankName}
            disabled
          />
          <label htmlFor="userName">User Name:</label>
          <input
            id="userName"
            type="text"
            defaultValue={currentAccount.username}
            disabled
          />
          <label htmlFor="amount">Amount:</label>
          <input id="amount" type="number" {...register("amount")} />
          <button type="submit">Transfer</button>
        </form>
      )}

      <div>
        <h2>Voice Commands:</h2>
        <p>- To initiate transfer, say "Transfer"</p>
      </div>
    </div>
  );
};

export default VoiceBankingApp;
