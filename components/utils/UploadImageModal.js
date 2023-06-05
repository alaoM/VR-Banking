import axios from "axios";
import React, { useState } from "react";

function ImageUploadModal() {
  const [isLoading, setLoading] = useState(false);
  const [Resp, setResp] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileInput = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", selectedFile);
   
    try {
      const res = await axios.post("/api/voucherpay/disputes", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setResp({
        respType: "Success",
        message: res.data.message,
      });
      console.log(res.data);
    } catch (err) {
      setResp({
        respType: "Error",
        message: err?.response.data.message,
      });
      console.error(err?.response.data.message);
    }
    setLoading(false);
  };
  return (
    <>
      {/* Modal */}
      <div className="modal fade" id="cameraModal">
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Upload images</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
              ></button>
            </div>
            <div className="modal-body">
              <div className="input-group mb-3">
                {Resp.respType === "Success" ? (
                  <div className="alert alert-primary   fade show">
                    <strong>Success!</strong> {Resp.message}
                  </div>
                ) : Resp.respType === "Error" ? (
                  <div className="alert alert-danger   fade show">
                    <strong>Error!</strong> {Resp.message}
                  </div>
                ) : (
                  ""
                )}
                <div className="basic-form custom_file_input">
                  <form onSubmit={handleSubmit}>
                    <div className="input-group mb-3">
                      <div className="form-file">
                        <input
                          onChange={handleFileInput}
                          type="file"
                          className="form-file-input form-control"
                        />
                      </div>

                      {isLoading === true ? (
                        <button
                          className="fs-14 btn btn-xs btn-primary light me-1"
                          type="button"
                          disabled
                        >
                          <span
                            className="spinner-border spinner-border-sm mx-2"
                            role="status"
                            aria-hidden="true"
                          >
                            {" "}
                          </span>{" "}
                          Uploading...
                        </button>
                      ) : (
                        <button className="fs-14 btn btn-xs btn-primary light me-1">
                       Upload
                        </button>
                      )}
                  {/*     <button type="submit" className="btn btn-primary btn-sm">
                        Upload
                      </button> */}
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ImageUploadModal;
