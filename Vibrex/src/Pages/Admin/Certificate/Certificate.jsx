import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { User, Mail, Layers, Calendar, Loader2 } from "lucide-react";
import { createCertificate } from "../../../store/Api/certficateApi";
import { clearCreateStatus } from "../../../store/Slices/Certificate";

const TRACKS = ["Frontend Development", "Backend Development", "UI/UX Design"];

const initialState = {
  internName: "",
  internEmail: "",
  track: TRACKS[0],
  startDate: "",
  endDate: "",
  issueDate: new Date().toISOString().slice(0, 10),
};

const Certificate = () => {
  const dispatch = useDispatch();
  const { creating, createError, createdCertificate } = useSelector(
    (state) => state.certificates
  );

  const [form, setForm] = useState(initialState);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: null }));
  };

  const validate = () => {
    const next = {};
    if (!form.internName.trim()) next.internName = "Intern name is required";
    if (!form.internEmail.trim()) next.internEmail = "Email is required";
    else if (!/^\S+@\S+\.\S+$/.test(form.internEmail)) next.internEmail = "Enter a valid email";
    if (!form.startDate) next.startDate = "Start date is required";
    if (!form.endDate) next.endDate = "End date is required";
    if (form.startDate && form.endDate && form.endDate < form.startDate)
      next.endDate = "End date can't be before start date";
    return next;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    // backend schema field names
    const payload = {
      name: form.internName.trim(),
      email: form.internEmail.trim(),
      track: form.track,
      startDate: form.startDate,
      endDate: form.endDate,
      issuedDate: form.issueDate,
    };

    dispatch(clearCreateStatus());
    const result = await dispatch(createCertificate(payload));

    if (createCertificate.fulfilled.match(result)) {
      setForm(initialState);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4 py-10">
      <div className="w-full max-w-lg bg-white shadow-lg rounded-2xl p-8">
        <h1 className="text-2xl font-bold text-gray-800 text-center mb-1">
          Add Certificate
        </h1>
        <p className="text-sm text-gray-500 text-center mb-6">
          Enter intern details to issue a new internship certificate
        </p>

        {createdCertificate && (
          <div className="mb-4 p-3 rounded-lg bg-green-50 border border-green-200 text-sm text-green-700">
            Certificate {createdCertificate.certificate.certificateId} created.
            <div className="mt-1 break-all text-xs text-green-600">
              {createdCertificate.verifyUrl}
            </div>
          </div>
        )}

        {createError && (
          <div className="mb-4 p-3 rounded-lg bg-red-50 border border-red-200 text-sm text-red-600">
            {createError}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          <FormField
            label="Intern full name"
            name="internName"
            value={form.internName}
            onChange={handleChange}
            placeholder="e.g. Ayesha Khan"
            icon={User}
            error={errors.internName}
          />

          <FormField
            label="Intern email"
            name="internEmail"
            type="email"
            value={form.internEmail}
            onChange={handleChange}
            placeholder="ayesha@example.com"
            icon={Mail}
            error={errors.internEmail}
          />

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Track</label>
            <div className="relative">
              <Layers className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <select
                name="track"
                value={form.track}
                onChange={handleChange}
                className="w-full pl-9 pr-3 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-800 bg-white focus:outline-none focus:ring-2 focus:ring-gray-800 focus:border-transparent"
              >
                {TRACKS.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <FormField
              label="Start date"
              name="startDate"
              type="date"
              value={form.startDate}
              onChange={handleChange}
              icon={Calendar}
              error={errors.startDate}
            />
            <FormField
              label="End date"
              name="endDate"
              type="date"
              value={form.endDate}
              onChange={handleChange}
              icon={Calendar}
              error={errors.endDate}
            />
          </div>

          <FormField
            label="Issue date"
            name="issueDate"
            type="date"
            value={form.issueDate}
            onChange={handleChange}
            icon={Calendar}
          />

          <button
            type="submit"
            disabled={creating}
            className="w-full mt-2 bg-gray-900 hover:bg-gray-800 disabled:opacity-60 disabled:cursor-not-allowed text-white font-medium py-2.5 rounded-lg text-sm flex items-center justify-center gap-2 transition-colors"
          >
            {creating && <Loader2 className="w-4 h-4 animate-spin" />}
            {creating ? "Saving..." : "Add Certificate"}
          </button>
        </form>
      </div>
    </div>
  );
};

const FormField = ({ label, name, type = "text", value, onChange, placeholder, icon: Icon, error }) => (
  <div>
    <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
      {label}
    </label>
    <div className="relative">
      {Icon && <Icon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />}
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`w-full ${Icon ? "pl-9" : "pl-3"} pr-3 py-2.5 border rounded-lg text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-800 focus:border-transparent ${
          error ? "border-red-400" : "border-gray-300"
        }`}
      />
    </div>
    {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
  </div>
);

export default Certificate;