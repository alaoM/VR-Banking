import React, { useState, useEffect } from "react";
import Link from "next/link";
import styles from "../styles/Home.module.css";
import { useForm } from "react-hook-form";

import { useRouter } from "next/router";
import { biodata } from "@/utils/biodata";
import VoiceRecognition from "@/components/VoiceRecorgnition";

export default function Home() {
  const router = useRouter();
  const [user, setUser] = useState("");
  const [showAcc, setshowAcc] = useState(false);
  const [showBalance, setShowBalance] = useState(false);

 
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
    if (showBalance && showAcc) {
      setshowAcc(false);
      setShowBalance(false);
    } else if (!showBalance && !showAcc) {
      setshowAcc(true);
      setShowBalance(true);
    }
  };

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
                      <div className="post-meta mb-2"></div>
                      <h3 className="h5 card-title">Welcome, {user.name}</h3>
                      <div className="d-flex justify-content-between align-items-center text-center">
                        <div>
                          {" "}
                          <p className="card-text">{showAcc? user.accountNumber: "xxxxxxxxxxx"}</p>
                          <p className="card-text">&#8358;{showBalance? user.bal: `xxxxxxxx`}</p>
                        </div>
                        <div className="h5 card-title">
                          {showAcc ? (                          
                             
                              <span
                                className="fa fa-eye"
                                onClick={showB}
                              > 
                            </span>
                          ) : (
                            <span
                              className="fa fa-eye-slash"
                              onClick={showB}
                            ></span>
                          )}
                        </div>
                      </div>
                
                    </div>
                  </div>
                </div> 
                <VoiceRecognition balanceState={balState} />                   
              
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
