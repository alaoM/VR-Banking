import React, { useState, useEffect } from "react";
import Link from "next/link";
import styles from "../styles/Home.module.css";
import { useForm } from "react-hook-form";

import { useRouter } from "next/router";
import { biodata } from "@/utils/biodata";
import VoiceRecognition from "@/components/VoiceRecorgnition";
import { handleSpeak } from "@/utils/handleSpeak";

import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

export default function Transfer() {
  const router = useRouter();
  const [user, setUser] = useState("");
  const [showAcc, setshowAcc] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [showBalance, setShowBalance] = useState(false);
  const [resp, setResp] = useState({ type: "", message: "" });

  useEffect(() => {
    const fetchData = async () => {
      if (typeof window !== "undefined") {
        let menu = localStorage.getItem("__z__");
        if (menu != null) {
          let obj = JSON.parse(menu);
          setUser(obj);
        } else {
          router.push("./login");
        }
      }
    };
    fetchData();
  }, []);
  const balState = (data) => {
    setShowBalance(data);
  };
  const showB = () => {
    if (showBalance) {
      setShowBalance(false);
    } else if (!showAcc) {
      setShowBalance(true);
    }
  };
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    const matchingEntry = biodata.find(
      (entry) =>
        entry.password === data.password && entry.username === data.username
    );
    console.log(matchingEntry);
    if (!matchingEntry) {
      setResp({
        type: "error",
        message: "Username or Password does not exist",
      });
      setLoading(false);
    } else {
      const { password, ...__xyz } = matchingEntry;
      const lData = JSON.stringify(__xyz);
      localStorage.setItem("__z__", lData);
      const { name } = __xyz;
      let text = `Welcome ${name}, Please what would you like to do today?`;
      handleSpeak(text);
      router.push("/dashboard");
    }
  };
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentAccount, setCurrentAccount] = useState(null);
  const { transcript, resetTranscript } = useSpeechRecognition();

  useEffect(() => {
    SpeechRecognition.startListening({ continuous: true });
    speak("Please state the account number for transfer");
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
      speak("Please enter an amount you want to transfer");
    } else {
      speak(`Account, ${accountNumber} not found`);
    }
  };

  const handleAmount = (data) => {
    let { amount } = data;
    amount = parseFloat(amount);
    const accountBalance = parseFloat(currentAccount.bal);
    if (accountBalance >= amount) {
      setIsSubmitting(true);
      speak("Processing transaction...");
      setTimeout(() => {
        speak(`Transaction to ${currentAccount.name} is successful`);
        speak(`Transfer details: 
          Bank Name: ${currentAccount.bankName},
          Receipient Name: ${currentAccount.name},
          Account Number: ${currentAccount.accountNumber},
          Amount: ${amount} Naira`);
        setIsSubmitting(false);
        router.push("/");
      }, 3000);

      // Perform the transfer logic here
    } else {
      speak("Insufficient account balance");
    }
  };

  const speak = (text) => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      const synthesis = window.speechSynthesis;
      const utterance = new SpeechSynthesisUtterance(text);

      const handleVoicesChanges = () => {
        const voices = synthesis.getVoices();

        const femaleVoice = voices.find((voice) =>
          voice.name.includes("Female")
        );
        if (femaleVoice) {
          synthesis.voice = femaleVoice;
        } else {
          console.warn("No female voice");
        }
        synthesis.speak(utterance);
      };

      synthesis.addEventListener("voiceschanged", handleVoicesChanges);

      if (synthesis.getVoices().length > 0) {
        handleVoicesChanges();
      } else {
        console.error("Speech synthesis is not supported in this browser.");
      }

      /*    synthesis.speak(utterance); */
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
  function account(e){
    e.preventDefault()
    console.log(e.taret.value)
  }

  return (
    <div className="main">
      <section className="hero-section ptb-100 full-screen">
        <div className="container">
          <div className="row d-flex align-items-center justify-content-center pt-5 pt-sm-5 pt-md-5 pt-lg-0">
            <div className="col-md-5 col-lg-5">
              <div className="card shadow-lg mb-0">
                <div className="card-body px-md-5 py-5">
                  <div className="mb-2"></div>
                  <div className="card ">
                    <div className="card-body">
                      <h3 className="h5 card-title">Welcome, {user.name}</h3>
                      <div className="d-flex justify-content-between align-items-center">
                        <div>
                          <p className="card-text">
                            &#8358;{showBalance ? user.bal : `xxxxxxxx`}
                          </p>
                        </div>
                        <div className="h5 card-title">
                          {showAcc ? (
                            <span className="fa fa-eye" onClick={showB}></span>
                          ) : (
                            <span
                              className="fa fa-eye-slash"
                              onClick={showB}
                            ></span>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="card ">
                      <div className="card-body">
                        {!currentAccount && (
                          <form
                            className="login-signup-form"
                            onSubmit={handleSubmit(handleAccountNumber)}
                          >
                            <div className="row mb-0">
                              <div className="col">
                                <label htmlFor="accountNumber" className="pb-1">
                                  Receipient
                                </label>
                              </div>
                            </div>
                            <input
                              className="form-control"
                              id="accountNumber"
                              maxLength={10}
                              type="text"
                              onChange={() => account()}
                              {...register("accountNumber")}
                            />

                            <button
                              className={`btn ${styles.solidbtn}  btn btn-lg d-block w-100 border-radius mt-4 mb-3`}
                              type="submit"
                            >
                              Proceed
                            </button>
                          </form>
                        )}
                        {currentAccount && (
                          <form
                            className="login-signup-form"
                            onSubmit={handleSubmit(handleAmount)}
                          >
                            {resp.type && (
                              <p className="text-danger text-center">
                                {resp.message}
                              </p>
                            )}
                            <div className="row mb-0">
                              <div className="col">
                                <label htmlFor="accountNumber" className="pb-1">
                                  Receipient
                                </label>
                              </div>
                              <div className="col-auto">
                                {currentAccount && (
                                  <p className="text-muted text-end m-0">
                                    {currentAccount.name}
                                  </p>
                                )}
                              </div>
                            </div>

                            <input
                              className="form-control"
                              id="accountNumber"
                              type="text"
                              {...register("accountNumber")}
                            />
                            {currentAccount && (
                              <>
                                <p className="text-muted text-end p-0">
                                  Bank: {currentAccount.bankName}
                                </p>
                              </>
                            )}

                            <div className="form-group">
                              <div className="row">
                                <div className="col">
                                  <label htmlFor="password" className="pb-1">
                                    Amount
                                  </label>
                                </div>
                              </div>

                              <div className="input-group input-group-merge">
                                <div className="input-icon">
                                  <span className="fa fa-money-bills color-primary" />
                                </div>
                                <input
                                  type="text"
                                  className="form-control"
                                  {...register("amount", {
                                    required: "Amount is required",
                                  })}
                                  onChange={() => {
                                    if (!isSubmitting) {
                                      SpeechRecognition.startListening({
                                        continuous: true,
                                      });
                                    }
                                  }}
                                />
                              </div>
                              {errors.password && (
                                <p className="text-danger text-end">
                                  {errors.amount.message}
                                </p>
                              )}
                            </div>
                            {isLoading ? (
                              <button
                                className="btn ${styles.solidbtn}  btn btn-lg d-block w-100 border-radius mt-4 mb-3"
                                type="button"
                                disabled={isLoading}
                              >
                                <span
                                  className="spinner-border spinner-border-sm mx-2"
                                  role="status"
                                  aria-hidden="true"
                                >
                                  {" "}
                                </span>{" "}
                                Sign in
                              </button>
                            ) : (
                              <button
                                disabled={isSubmitting}
                                className={`btn ${styles.solidbtn}  btn btn-lg d-block w-100 border-radius mt-4 mb-3`}
                              >
                                {isSubmitting ? "Submitting..." : "Transfer"}
                              </button>
                            )}
                          </form>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
