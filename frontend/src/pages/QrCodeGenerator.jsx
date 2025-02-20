
import { QRCodeCanvas } from "qrcode.react";

const QRCodeGenerator = () => {
  const text  = window.location.href;;

  return (
    <div className="hidden md:flex flex-col items-center space-y-4 p-5">
      <h2 className="text-xl font-bold">QR Code </h2>
      {text && (
        <QRCodeCanvas
          value={text}
          size={200}
          bgColor="#ffffff"
          fgColor="#000000"
          level="H"
          className="border p-2"
        />
      )}
    </div>
  );
};

export default QRCodeGenerator;
