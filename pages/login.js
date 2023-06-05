import React, { useState, useEffect } from "react";
 
import styles from "../styles/Home.module.css";
import { useForm } from "react-hook-form";

import { useRouter } from "next/router";
import { biodata } from "@/utils/biodata";
import { handleSpeak } from "@/utils/handleSpeak";

export default function Login() {
  const router = useRouter();
  const [isLoading, setLoading] = useState(false);
  const [resp, setResp] = useState({ type: "", message: "" });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  useEffect(() => {
    const fetchData = async () => {
      if (typeof window !== "undefined") {
        let menu = localStorage.getItem("__z__");
        if (menu != null) {
         localStorage.removeItem("__z__")
        }
      }
    };
    fetchData();
  }, []);

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
      handleSpeak(text)
      router.push("/");
  
    } 
  };
  return (
    <div className="main">
      <section className="hero-section ptb-100 full-screen">
        <div className="container">
          <div className="row d-flex align-items-center justify-content-center pt-5 pt-sm-5 pt-md-5 pt-lg-0">
            <div className="col-md-5 col-lg-5">
              <div className="card login-signup-card shadow-lg mb-0">
                <div className="card-body px-md-5 py-5">
                  <div className="mb-2">
                    <h5 className="h3 text-center">Login</h5>
                  </div>
                  <form
                    className="login-signup-form"
                    onSubmit={handleSubmit(onSubmit)}
                  >
                    {resp.type && (
                      <p className="text-danger text-center">
                       {resp.message}
                    </p>
                      
                    )}
                    <div className="form-group mb-3">
                      <label htmlFor="username" className="pb-1">
                        Username
                      </label>

                      <div className="input-group input-group-merge">
                        <div className="input-icon">
                          <span className="ti-email color-primary" />
                        </div>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Username"
                          {...register("username", {
                            required: "Username is required",
                          })}
                          id="username"
                        />
                      </div>
                      {errors.username && (
                        <p className="text-danger text-end">
                          {errors.username.message}
                        </p>
                      )}
                    </div>
                    <div className="form-group">
                      <div className="row">
                        <div className="col">
                          <label htmlFor="password" className="pb-1">
                            Password
                          </label>
                        </div>
                      </div>

                      <div className="input-group input-group-merge">
                        <div className="input-icon">
                          <span className="ti-lock color-primary" />
                        </div>
                        <input
                          type="password"
                          className="form-control"
                          placeholder="Enter your password"
                          maxLength={4}
                          id="password"
                          {...register("password", {
                            required: "Password is required",
                          })}
                        />
                      </div>
                      {errors.password && (
                        <p className="text-danger text-end">
                          {errors.password.message}
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
                        className={`btn ${styles.solidbtn}  btn btn-lg d-block w-100 border-radius mt-4 mb-3`}
                      >
                        Sign in
                      </button>
                    )}
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
