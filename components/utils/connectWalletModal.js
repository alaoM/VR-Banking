import React from "react";
import Image from "next/image";

export const ConnectWalletModal = () => {
  return (
    <>
      <div
        className="modal fade"
        id="connectWallet"
        tabIndex={-1}
        role="dialog"
        aria-labelledby="connectWalletTitle-2"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5
                className="modal-title text-dark"
                id="connectWalletTitle-2"
              >
                Select preferred wallet
              </h5>
              <button
                className="close"
                type="button"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div className="modal-body">
              <div className="row">
                <div className="col-md-6">
                  <div className="card card-icon mb-4">
                    <div className="card-body text-center">
                      <Image
                        src="/assets/img/metamask-icon.png"
                        height={80}
                        width={80}
                        alt="metamask_icon"
                      />
                      <p className="lead text-22 m-0">MetaMask</p>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="card card-icon mb-4">
                    <div className="card-body text-center">
                      <Image
                        src="/assets/img/logo.png"
                        layout="intrinsic"
                        height={80}
                        width={150}
                        alt="msme_wallet"
                      />

                      <p className="lead text-22 m-0">Msme Wallet</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
