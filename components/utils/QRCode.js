import QRCode from "qrcode.react";

function QRCodeGenerator() {
  const downloadQRCode = () => {
    const canvas = document.getElementById("qrcode");
    const pngUrl = canvas.toDataURL("image/png");
    const downloadLink = document.createElement("a");
    downloadLink.href = pngUrl;
    downloadLink.download = "qrcode.png";
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };
  const qrCodeData = "https://github.com/Bunlong/next-qrcode";
  const qrCodeOptions = {
    level: "L",
    margin: 2,
    scale: 5,
    width: 300,
    width: 300,
    color: {
      dark: "#010599FF",
      light: "#ffffff",
    },
    logo: {
      src: "https://next-qrcode.js.org/github.png",
      width: 35,
      x: 58,
      y: 58,
    },
  };

  return (
    <>
      <QRCode value={qrCodeData} {...qrCodeOptions}>
        <img
          src="https://next-qrcode.js.org/github.png"
          alt="logo"
          className="qrcode-logo"
        />
      </QRCode>
    
    </>
  );
}

export default QRCodeGenerator;
