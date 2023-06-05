import React from "react";
import Link from "next/link";
import styles from "@/styles/Home.module.css";

export const Response = ({ resp }) => {
 
  return (
    <>
     
        <div className="container">
          <div
            className="row wow animated fadeInUp justify-content-center align-items-center"
            data-wow-duration="2000ms"
            data-wow-delay="500ms"
          >
            <div className="col-xl-10 col-md-10 ">
              <div
                className="wow animated fadeInUp justify-content-center align-items-center"
                data-wow-duration="2000ms"
                data-wow-delay="500ms"
              >
                {resp.respType === "success" ? (
                  <>
                     <div className="d-flex justify-content-center align-items-center">
                      <div className={styles.uiSuccess}>
                        <svg
                          viewBox="0 0 87 87"
                          version="1.1"
                          xmlns="http://www.w3.org/2000/svg"
                          xmlnsXlink="http://www.w3.org/1999/xlink"
                        >
                          <g
                            id="Page-1"
                            stroke="none"
                            strokeWidth={1}
                            fill="none"
                            fillRule="evenodd"
                          >
                            <g
                              id="Group-3"
                              transform="translate(2.000000, 2.000000)"
                            >
                              <circle
                                id="Oval-2"
                                stroke="rgba(165, 220, 134, 0.2)"
                                strokeWidth={4}
                                cx="41.5"
                                cy="41.5"
                                r="41.5"
                              />
                              <circle
                                className={styles.uiSuccessCircle}
                                id="Oval-2"
                                stroke="#A5DC86"
                                strokeWidth={4}
                                cx="41.5"
                                cy="41.5"
                                r="41.5"
                              />
                              <polyline
                                className={styles.uiSuccessPath}
                                id="Path-2"
                                stroke="#A5DC86"
                                strokeWidth={4}
                                points="19 38.8036813 31.1020744 54.8046875 63.299221 28"
                              />
                            </g>
                          </g>
                        </svg>
                      </div>
                    </div>
                    <h1 className="text-center">
                      {resp.application} 
                    </h1>
                    <p className="text-center">{resp.message}</p>
                  </>
                ) : (
                  <>
                    <div className="d-flex justify-content-center align-items-center">

                  
                      <div className={styles.uiError}>
                        <svg
                          viewBox="0 0 87 87"
                          version="1.1"
                          xmlns="http://www.w3.org/2000/svg"
                          xmlnsXlink="http://www.w3.org/1999/xlink"
                        >
                          <g
                            id="Page-1"
                            stroke="none"
                            strokeWidth={1}
                            fill="none"
                            fillRule="evenodd"
                          >
                            <g
                              id="Group-2"
                              transform="translate(2.000000, 2.000000)"
                            >
                              <circle
                                id="Oval-2"
                                stroke="rgba(252, 191, 191, .5)"
                                strokeWidth={4}
                                cx="41.5"
                                cy="41.5"
                                r="41.5"
                              />
                              <circle
                                className={styles.uiErrorCircle}
                                stroke="#F74444"
                                strokeWidth={4}
                                cx="41.5"
                                cy="41.5"
                                r="41.5"
                              />
                              <path
                                className={styles.uiErrorLine1}
                                d="M22.244224,22 L60.4279902,60.1837662"
                                id="Line"
                                stroke="#F74444"
                                strokeWidth={3}
                                strokeLinecap="square"
                              />
                              <path
                                className={styles.uiErrorLine2}
                                d="M60.755776,21 L23.244224,59.8443492"
                                id="Line"
                                stroke="#F74444"
                                strokeWidth={3}
                                strokeLinecap="square"
                              />
                            </g>
                          </g>
                        </svg>
                      </div>
                    </div>
                    <h1 className="text-center">
                    Unknown Error!!
                    </h1>
                    
                  </>
                )}
                <div className="d-flex justify-content-center align-items-center">
                 {/*  <Link
                    href="/"
                    className="fs-20 btn btn-xs btn-primary light me-1"
                  >
                  Go  Home
                  </Link> */}
                </div>
              </div>
            </div>
          </div>
        </div>
       
    </>
  );
};
