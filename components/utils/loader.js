export const PrimaryBtnLoader = ({ className }) => {
  return (
    <>
      <div
        className={`${className} spinner-bubble spinner-bubble-primary m-5`}
      ></div>
    </>
  );
};

export const DangerBtnLoader = () => {
  return (
    <>
      <div className="spinner-bubble spinner-bubble-danger m-5"></div>
    </>
  );
};

export const WarningBtnLoader = () => {
  return (
    <>
      <p>Loading...</p>
      <div className="spinner-bubble spinner-bubble-warning m-5"></div>
    </>
  );
};
export const GreyBtnLoader = () => {
  return (
    <>
      <div className="loader-bubble loader-bubble-light m-5"></div>
    </>
  );
};
export const DisabledBtnLoader = () => {
  return (
    <>
      <button
        className="btn btn-lg d-block w-100 outline-btn border-radius mt-4 mb-3"
        type="button"
        disabled
      >
        <span
          className="spinner-border spinner-border-sm mx-2"
          role="status"
          aria-hidden="true"
        ></span>
        Loading...
      </button>
    </>
  );
};
