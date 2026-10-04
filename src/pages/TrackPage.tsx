import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { motion } from "motion/react";
import {
  Search,
  CheckCircle2,
  Plane,
  AlertCircle,
  MessageCircle,
  Lock,
} from "lucide-react";
import { findRequestByReference, updateRequestStatus } from "../services/storageService";
import type { SourcingRequest } from "../types";
import { siteConfig } from "../config/siteConfig";

export const TrackPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const refQuery = searchParams.get("ref") || "";

  const [inputRef, setInputRef] = useState(refQuery);
  const [verificationKey, setVerificationKey] = useState("");
  const [requestData, setRequestData] = useState<SourcingRequest | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isSearching, setIsSearching] = useState(false);

  // Quote action state
  const [quoteActionMessage, setQuoteActionMessage] = useState<string | null>(null);
  const [isRevisionModalOpen, setIsRevisionModalOpen] = useState(false);
  const [revisionNotes, setRevisionNotes] = useState("");

  const handleSearch = (referenceToSearch?: string) => {
    const target = referenceToSearch || inputRef;
    if (!target.trim()) {
      setErrorMsg("Please enter a valid request reference number (e.g. TGS-8492).");
      return;
    }

    setIsSearching(true);
    setErrorMsg(null);
    setQuoteActionMessage(null);

    setTimeout(() => {
      const result = findRequestByReference(target, verificationKey);
      setIsSearching(false);

      if (result.success && result.data) {
        setRequestData(result.data);
        const newParams = new URLSearchParams(searchParams);
        newParams.set("ref", target.toUpperCase());
        setSearchParams(newParams);
      } else {
        setRequestData(null);
        setErrorMsg(result.error || "Request not found.");
      }
    }, 400);
  };

  useEffect(() => {
    if (refQuery) {
      handleSearch(refQuery);
    }
  }, [refQuery]);

  const handleAcceptQuote = () => {
    if (!requestData) return;
    const ok = updateRequestStatus(requestData.referenceNumber, "AWAITING_PAYMENT");
    if (ok) {
      setQuoteActionMessage(
        "Quotation approved! Our Dubai finance concierge will contact you on WhatsApp with verified bank transfer & card payment instructions."
      );
      // Reload updated request
      const updated = findRequestByReference(requestData.referenceNumber);
      if (updated.data) setRequestData(updated.data);
    }
  };

  const handleRequestRevision = () => {
    if (!requestData || !revisionNotes.trim()) return;
    updateRequestStatus(
      requestData.referenceNumber,
      "REVIEWING",
      `Client revision request: ${revisionNotes}`
    );
    setIsRevisionModalOpen(false);
    setRevisionNotes("");
    setQuoteActionMessage("Revision request submitted. Our team will review your notes and update the quotation.");
    const updated = findRequestByReference(requestData.referenceNumber);
    if (updated.data) setRequestData(updated.data);
  };

  return (
    <div className="py-12 bg-ivory min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-semibold uppercase tracking-widest text-olive block mb-2">
            Order & Quotation Portal
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-tgs-black mb-3">
            Track Sourcing Request
          </h1>
          <p className="text-sm sm:text-base text-text-secondary">
            Check the real-time status of your Dubai product inquiry, review your itemised quotation, or monitor dispatch milestones.
          </p>
        </div>

        {/* Lookup Box */}
        <div className="bg-white rounded-3xl border border-border-tgs p-6 sm:p-8 shadow-elevated mb-10 max-w-2xl mx-auto">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSearch();
            }}
            className="space-y-4"
          >
            <div>
              <label
                htmlFor="req-ref"
                className="block text-xs font-semibold uppercase tracking-wider text-tgs-black mb-1.5"
              >
                Request Reference Number
              </label>
              <div className="relative">
                <Search className="w-4 h-4 text-text-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  id="req-ref"
                  type="text"
                  value={inputRef}
                  onChange={(e) => setInputRef(e.target.value)}
                  placeholder="e.g. TGS-8492 or your submitted reference"
                  className="w-full pl-10 pr-4 py-3 bg-ivory/60 rounded-xl border border-border-tgs text-sm text-tgs-black font-mono placeholder:text-text-muted focus:ring-2 focus:ring-olive/40 focus:outline-none"
                />
              </div>
            </div>

            {/* Verification Security Layer */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label
                  htmlFor="req-verify"
                  className="text-xs font-semibold uppercase tracking-wider text-tgs-black flex items-center gap-1.5"
                >
                  <Lock className="w-3.5 h-3.5 text-olive" />
                  <span>Security Verification (Optional / Contact match)</span>
                </label>
                <span className="text-[10px] text-text-muted">
                  Email or WhatsApp number on request
                </span>
              </div>
              <input
                id="req-verify"
                type="text"
                value={verificationKey}
                onChange={(e) => setVerificationKey(e.target.value)}
                placeholder="Enter email or WhatsApp number to unlock private details"
                className="w-full px-4 py-2.5 bg-ivory/60 rounded-xl border border-border-tgs text-xs text-tgs-black placeholder:text-text-muted focus:ring-2 focus:ring-olive/40 focus:outline-none"
              />
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
              <button
                type="submit"
                disabled={isSearching}
                className="w-full sm:w-auto flex-1 py-3 px-6 rounded-xl bg-tgs-black text-ivory text-xs font-semibold uppercase tracking-wider hover:bg-olive transition-colors flex items-center justify-center gap-2 shadow-xs"
              >
                {isSearching ? <span>Searching...</span> : <span>Lookup Request</span>}
              </button>

              <button
                type="button"
                onClick={() => {
                  setInputRef("TGS-8492");
                  handleSearch("TGS-8492");
                }}
                className="w-full sm:w-auto px-4 py-3 rounded-xl border border-border-tgs text-xs font-medium text-text-secondary hover:text-tgs-black hover:bg-beige transition-colors"
              >
                Try Demo: TGS-8492 (Quote Ready)
              </button>

              <button
                type="button"
                onClick={() => {
                  setInputRef("TGS-7210");
                  handleSearch("TGS-7210");
                }}
                className="w-full sm:w-auto px-4 py-3 rounded-xl border border-border-tgs text-xs font-medium text-text-secondary hover:text-tgs-black hover:bg-beige transition-colors"
              >
                Try Demo: TGS-7210 (Shipped)
              </button>
            </div>
          </form>

          {errorMsg && (
            <div className="mt-4 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}
        </div>

        {/* REQUEST DETAILS VIEW */}
        {requestData && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            {/* Top Status Header */}
            <div className="bg-white rounded-3xl border border-border-tgs p-6 sm:p-8 shadow-elevated flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <span className="font-mono text-2xl font-bold text-tgs-black">
                    {requestData.referenceNumber}
                  </span>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider ${
                      requestData.status === "QUOTE_READY"
                        ? "bg-amber-100 text-amber-900 border border-amber-200"
                        : requestData.status === "SHIPPED"
                        ? "bg-blue-100 text-blue-900 border border-blue-200"
                        : requestData.status === "DELIVERED"
                        ? "bg-green-100 text-green-900 border border-green-200"
                        : "bg-beige text-tgs-black border border-border-tgs"
                    }`}
                  >
                    {requestData.status.replace("_", " ")}
                  </span>
                </div>
                <p className="text-xs text-text-secondary">
                  Logged on {new Date(requestData.createdAt).toLocaleDateString()} • Destination:{" "}
                  <strong>{requestData.delivery.city}, {requestData.delivery.countryName}</strong>
                </p>
              </div>

              {/* WhatsApp Support CTA */}
              <a
                href={`https://wa.me/${siteConfig.brand.whatsappNumber.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
                  `Hello The Gulf Store team! Inquiring regarding my request ${requestData.referenceNumber}.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-ivory border border-border-tgs text-xs font-semibold text-tgs-black hover:bg-beige transition-colors"
              >
                <MessageCircle className="w-4 h-4 text-olive" />
                <span>Concierge Chat</span>
              </a>
            </div>

            {quoteActionMessage && (
              <div className="p-4 rounded-2xl bg-green-50 border border-green-200 text-green-800 text-xs sm:text-sm flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 shrink-0 text-green-600" />
                <span>{quoteActionMessage}</span>
              </div>
            )}

            {/* STATUS TIMELINE */}
            <div className="bg-white rounded-3xl border border-border-tgs p-6 sm:p-8 shadow-elevated">
              <h2 className="font-serif text-2xl font-medium text-tgs-black mb-6">
                Request Milestone Timeline
              </h2>

              <div className="relative pl-6 sm:pl-8 border-l-2 border-border-tgs space-y-8">
                {requestData.timeline.map((step, idx) => (
                  <div key={idx} className="relative">
                    {/* Step marker node */}
                    <div
                      className={`absolute -left-[31px] sm:-left-[39px] top-0 w-6 h-6 rounded-full flex items-center justify-center border-2 ${
                        step.completed
                          ? "bg-tgs-black border-tgs-black text-ivory"
                          : step.current
                          ? "bg-olive border-olive text-ivory ring-4 ring-olive/20"
                          : "bg-white border-border-tgs text-text-muted"
                      }`}
                    >
                      {step.completed ? (
                        <CheckCircle2 className="w-3.5 h-3.5" />
                      ) : (
                        <span className="w-2 h-2 rounded-full bg-current" />
                      )}
                    </div>

                    <div className="bg-ivory/60 p-4 sm:p-5 rounded-2xl border border-border-tgs/70">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1">
                        <span className="font-serif text-base font-semibold text-tgs-black">
                          {step.label}
                        </span>
                        <span className="text-[11px] font-mono text-text-muted">
                          {step.date}
                        </span>
                      </div>
                      <p className="text-xs text-text-secondary leading-relaxed font-sans">
                        {step.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* OFFICIAL QUOTE BREAKDOWN (If Available) */}
            {requestData.quote && (
              <div className="bg-white rounded-3xl border-2 border-olive/30 p-6 sm:p-8 shadow-elevated relative overflow-hidden">
                <div className="absolute top-0 right-0 px-6 py-1.5 bg-olive text-ivory text-[11px] font-bold uppercase tracking-wider rounded-bl-2xl">
                  Official Itemised Quotation
                </div>

                <div className="mb-6">
                  <h3 className="font-serif text-2xl font-medium text-tgs-black mb-1">
                    Cost & Sourcing Breakdown
                  </h3>
                  <p className="text-xs text-text-secondary">
                    Valid until:{" "}
                    <strong>{new Date(requestData.quote.quoteExpiresAt).toLocaleDateString()}</strong>{" "}
                    • Guaranteed original boutique stock
                  </p>
                </div>

                {/* Breakdown items */}
                <div className="bg-ivory/70 rounded-2xl border border-border-tgs p-5 space-y-3 mb-6">
                  <div className="flex items-center justify-between text-xs sm:text-sm text-text-secondary pb-2 border-b border-border-tgs/60">
                    <span>Dubai Boutique Retail Price (UAE Dirhams):</span>
                    <span className="font-medium text-tgs-black">
                      AED {requestData.quote.itemCostAED.toLocaleString()}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-xs sm:text-sm text-text-secondary pb-2 border-b border-border-tgs/60">
                    <span>Retail Equivalent ({requestData.quote.currency}):</span>
                    <span className="font-medium text-tgs-black">
                      {requestData.quote.currency}{" "}
                      {requestData.quote.itemCostLocal.toLocaleString()}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-xs sm:text-sm text-text-secondary pb-2 border-b border-border-tgs/60">
                    <span>Concierge & Sourcing Service Fee:</span>
                    <span className="font-medium text-tgs-black">
                      {requestData.quote.currency}{" "}
                      {requestData.quote.serviceFeeLocal.toLocaleString()}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-xs sm:text-sm text-text-secondary pb-2 border-b border-border-tgs/60">
                    <span>Express Insured Air Courier (Dubai → Pakistan):</span>
                    <span className="font-medium text-tgs-black">
                      {requestData.quote.currency}{" "}
                      {requestData.quote.shippingFeeLocal.toLocaleString()}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-xs sm:text-sm text-text-secondary pb-2 border-b border-border-tgs/60">
                    <span className="flex items-center gap-1.5">
                      <span>Import Customs & Clearance:</span>
                      <span className="px-2 py-0.5 rounded text-[10px] uppercase font-semibold bg-beige border border-border-tgs">
                        {requestData.quote.taxTreatment}
                      </span>
                    </span>
                    <span className="font-medium text-tgs-black">
                      {requestData.quote.currency}{" "}
                      {requestData.quote.dutiesAndTaxesLocal.toLocaleString()}
                    </span>
                  </div>

                  {/* Total Row */}
                  <div className="pt-2 flex items-center justify-between text-base sm:text-lg font-bold text-tgs-black">
                    <span>All-Inclusive Total ({requestData.quote.currency}):</span>
                    <span className="font-serif text-2xl text-olive">
                      {requestData.quote.currency}{" "}
                      {requestData.quote.totalLocal.toLocaleString()}
                    </span>
                  </div>
                </div>

                {/* Delivery window statement */}
                <div className="p-4 bg-beige/60 rounded-xl border border-border-tgs text-xs text-text-secondary space-y-1 mb-6">
                  <p>
                    <strong>Estimated Delivery Window:</strong>{" "}
                    {requestData.quote.deliveryWindowText}
                  </p>
                  <p className="text-[11px] text-text-muted">
                    {requestData.quote.deliveryStartsNote}
                  </p>
                </div>

                {/* Quote Action Buttons */}
                {requestData.status === "QUOTE_READY" && (
                  <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
                    <button
                      onClick={handleAcceptQuote}
                      className="w-full sm:w-auto flex-1 py-3.5 px-6 rounded-full bg-tgs-black text-ivory text-xs font-semibold uppercase tracking-wider hover:bg-olive transition-colors flex items-center justify-center gap-2 shadow-sm"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Accept Quotation & Proceed to Payment</span>
                    </button>

                    <button
                      onClick={() => setIsRevisionModalOpen(true)}
                      className="w-full sm:w-auto px-6 py-3.5 rounded-full border border-border-tgs text-xs font-semibold uppercase tracking-wider text-tgs-black hover:bg-beige transition-colors"
                    >
                      <span>Request a Change</span>
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* REAL CARRIER TRACKING (Only shown when real tracking data exists) */}
            {requestData.carrierTracking && (
              <div className="bg-white rounded-3xl border border-border-tgs p-6 sm:p-8 shadow-elevated">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-olive mb-2">
                  <Plane className="w-4 h-4" />
                  <span>Real Air Courier Consignment</span>
                </div>
                <h3 className="font-serif text-2xl font-medium text-tgs-black mb-4">
                  Active Air Shipment Details
                </h3>

                <div className="p-4 rounded-2xl bg-ivory border border-border-tgs space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    <div>
                      <span className="text-text-muted block">Carrier Partner:</span>
                      <strong className="text-tgs-black">
                        {requestData.carrierTracking.carrierName}
                      </strong>
                    </div>
                    <div>
                      <span className="text-text-muted block">Air Waybill / Tracking Number:</span>
                      <strong className="text-tgs-black font-mono">
                        {requestData.carrierTracking.trackingCode}
                      </strong>
                    </div>
                  </div>

                  {requestData.carrierTracking.lastCheckpoint && (
                    <div className="pt-2 border-t border-border-tgs/60 text-xs text-text-secondary">
                      <span className="font-medium text-tgs-black block mb-0.5">
                        Latest Waypoint:
                      </span>
                      <p>{requestData.carrierTracking.lastCheckpoint}</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* REQUESTED ITEMS LIST */}
            <div className="bg-white rounded-3xl border border-border-tgs p-6 sm:p-8 shadow-elevated">
              <h3 className="font-serif text-xl font-medium text-tgs-black mb-4">
                Items on this Request ({requestData.items.length})
              </h3>
              <div className="space-y-4">
                {requestData.items.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-2xl bg-ivory/60 border border-border-tgs"
                  >
                    <div className="flex items-center gap-3">
                      {item.imageUrl ? (
                        <img
                          src={item.imageUrl}
                          alt={item.productName}
                          className="w-14 h-14 rounded-xl object-cover border border-border-tgs"
                        />
                      ) : (
                        <div className="w-14 h-14 rounded-xl bg-beige flex items-center justify-center font-mono text-xs text-text-muted">
                          #{idx + 1}
                        </div>
                      )}
                      <div>
                        <h4 className="text-sm font-semibold text-tgs-black">{item.productName}</h4>
                        <div className="text-[11px] text-text-secondary flex flex-wrap gap-2 mt-0.5">
                          {item.brand && <span>Brand: {item.brand}</span>}
                          <span>Qty: {item.quantity}</span>
                          {item.size && <span>Size: {item.size}</span>}
                          {item.color && <span>Color: {item.color}</span>}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* Change Request Modal */}
        {isRevisionModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-tgs-black/60 backdrop-blur-sm">
            <div className="bg-ivory rounded-2xl border border-border-tgs max-w-md w-full p-6 shadow-2xl">
              <h3 className="font-serif text-xl font-bold text-tgs-black mb-2">
                Request a Change to Quote
              </h3>
              <p className="text-xs text-text-secondary mb-4">
                Specify what you would like changed (e.g. alternative size, different color, or alternate brand edition).
              </p>
              <textarea
                rows={4}
                value={revisionNotes}
                onChange={(e) => setRevisionNotes(e.target.value)}
                placeholder="Describe your desired adjustment..."
                className="w-full p-3 bg-white rounded-xl border border-border-tgs text-xs text-tgs-black focus:outline-none focus:ring-2 focus:ring-olive/40 mb-4"
              />
              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsRevisionModalOpen(false)}
                  className="px-4 py-2 border border-border-tgs rounded-full text-xs font-semibold text-text-secondary hover:bg-beige"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleRequestRevision}
                  className="px-5 py-2 bg-tgs-black text-ivory rounded-full text-xs font-semibold uppercase tracking-wider hover:bg-olive"
                >
                  Submit Revision
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
