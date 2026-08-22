import React, { useEffect } from "react";
import QRCode from "react-qr-code";
import certficateLogo from "../../assets/vibrex.png";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchCertificate } from "../../store/Api/certficateApi";
import { Loader2, XCircle } from "lucide-react";

const formatDate = (d) =>
  new Date(d).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

const VerifyCertificate = () => {
  const { certificateId, token } = useParams();
  const dispatch = useDispatch();
  const { certificate, loading, error } = useSelector(
    (state) => state.certificates,
  );

  useEffect(() => {
    dispatch(fetchCertificate({ certificateId, token }));
  }, [certificateId, token, dispatch]);

  // ---- Loading state ----
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
        <div className="flex flex-col items-center gap-3 bg-white rounded-2xl shadow-lg px-8 py-10 w-full max-w-sm text-center">
          <Loader2 className="w-8 h-8 text-gray-400 animate-spin" />
          <p className="text-sm text-gray-500">Checking certificate...</p>
        </div>
      </div>
    );
  }

  // ---- Error / not found state ----
  if (error || !certificate) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
        <div className="flex flex-col items-center gap-3 bg-white rounded-2xl shadow-lg px-8 py-10 w-full max-w-sm text-center">
          <XCircle className="w-10 h-10 text-red-500" />
          <h1 className="text-base font-semibold text-gray-800">
            Certificate Not Found
          </h1>
          <p className="text-sm text-gray-500">
            This link is invalid, expired, or the certificate has been
            revoked.
          </p>
        </div>
      </div>
    );
  }

  const verifyUrl = `https://vibrex.tech/verify/${certificate.certificateId}/${certificate.verifyToken}`;

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4 py-10">
      <div className="relative w-full max-w-3xl bg-[#FAF8F3] shadow-2xl overflow-hidden aspect-auto sm:aspect-[1122/793]">
        <div className="absolute inset-[18px] border-[1.5px] border-[#12141A]" />
        <div className="absolute inset-[23px] border border-[#D8D3C5]" />

        <div className="relative z-10 h-full flex flex-col items-center text-center px-6 py-8 sm:px-16 sm:py-10">
          {/* Logo */}
          <img
            src={certficateLogo}
            alt="Vibrex Tech"
            className="h-8 sm:h-10 object-contain mb-1"
          />
          <div className="font-mono font-bold text-sm sm:text-base tracking-widest">
            VIBREX <span className="text-[#1FB9A3]">TECH</span>
          </div>

          {/* Cert number / location */}
          <div className="flex items-center gap-2 mt-4">
            <span className="font-mono text-[9px] sm:text-[10px] tracking-[2px] text-gray-500 uppercase">
              {certificate.certificateId}
            </span>
            <span className="w-1 h-1 rounded-full bg-[#1FB9A3]" />
            <span className="font-mono text-[9px] sm:text-[10px] tracking-[2px] text-gray-500 uppercase">
              Islamabad, Pakistan
            </span>
          </div>

          {/* Title */}
          <h1 className="font-serif text-xl sm:text-4xl mt-2">
            Certificate of Internship
          </h1>

          {/* Intern name */}
          <h2 className="font-serif font-semibold text-xl sm:text-4xl mt-5 pb-2 border-b-2 border-[#12141A] min-w-0 sm:min-w-[260px] max-w-full break-words px-2">
            {certificate.name}
          </h2>

          {/* Description */}
          <p className="text-xs sm:text-sm leading-relaxed text-gray-700 max-w-md mt-5">
            This is to certify that{" "}
            <span className="font-semibold">{certificate.name}</span> has
            successfully completed an internship with{" "}
            <span className="font-semibold">Vibrex Tech</span> in the field of{" "}
            <span className="text-[#1FB9A3] font-semibold">
              {certificate.track}
            </span>
            , spanning from{" "}
            <span className="font-semibold">
              {formatDate(certificate.startDate)}
            </span>{" "}
            to{" "}
            <span className="font-semibold">
              {formatDate(certificate.endDate)}
            </span>
            , demonstrating consistent commitment and professional growth
            throughout the program.
          </p>

          <p className="font-mono text-[10px] text-gray-400 mt-2">
            Issued on {formatDate(certificate.issuedDate)}
          </p>

          {/* Footer: QR + verify link (no signature section) */}
          <div className="mt-8 sm:mt-auto w-full flex flex-wrap items-center justify-center gap-3 pb-2 sm:pt-6 sm:pb-0">
            <div className="bg-white p-1.5 border-[1.5px] border-[#12141A]">
              <QRCode value={verifyUrl} size={56} />
            </div>
            <div className="text-left font-mono">
              <div className="text-[8px] tracking-widest text-gray-500 uppercase">
                Scan to verify
              </div>
              <div className="text-[9px] sm:text-[10px] break-all max-w-[220px]">
                {verifyUrl}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyCertificate;