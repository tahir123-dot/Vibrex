import React, { useState } from "react";
import { User, Mail, Layers, Calendar, Hash, RefreshCw, Loader2 } from "lucide-react";

const TRACKS = ["Flutter Development", "Backend / MERN", "UI/UX Design"];

// Generates a random, unguessable code appended to the cert ID.
// Swap this for a call to your backend if you want strictly sequential,
// DB-checked numbers instead (safer against collisions across admins).
const generateCertNumber = () => {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let code = "";
  for (let i = 0; i < 6; i++) code += chars[Math.floor(Math.random() * chars.length)];
  return code;
};

const initialState = {
  internName: "",
  internEmail: "",
  track: TRACKS[0],
  startDate: "",
  endDate: "",
  issueDate: new Date().toISOString().slice(0, 10),
  sequence: generateCertNumber(),
};

const Certificate = () => {
  const [form, setForm] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

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

    const certificateId = `VXT-${new Date(form.issueDate).getFullYear()}-${form.sequence}`;
    const payload = {
      certificate_id: certificateId,
      intern_name: form.internName.trim(),
      intern_email: form.internEmail.trim(),
      track: form.track,
      start_date: form.startDate,
      end_date: form.endDate,
      issue_date: form.issueDate,
      status: "active",
      // signatory is attached server-side from a fixed config, not entered here
    };

    setSubmitting(true);
    try {
      // TODO: replace with your Redux dispatch, e.g.
      // await dispatch(createCertificate(payload)).unwrap();
      console.log("Certificate payload ready for dispatch:", payload);
      setForm(initialState);
    } finally {
      setSubmitting(false);
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

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Certificate number
            </label>
            <div className="relative">
              <Hash className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                readOnly
                value={`VXT-${new Date(form.issueDate).getFullYear()}-${form.sequence}`}
                className="w-full pl-9 pr-10 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-500 bg-gray-50 cursor-not-allowed"
              />
              <button
                type="button"
                onClick={() => setForm((prev) => ({ ...prev, sequence: generateCertNumber() }))}
                title="Generate a new number"
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700 transition-colors"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
            </div>
            <p className="text-xs text-gray-400 mt-1">Auto-generated — click the icon to regenerate if needed</p>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full mt-2 bg-gray-900 hover:bg-gray-800 disabled:opacity-60 disabled:cursor-not-allowed text-white font-medium py-2.5 rounded-lg text-sm flex items-center justify-center gap-2 transition-colors"
          >
            {submitting && <Loader2 className="w-4 h-4 animate-spin" />}
            {submitting ? "Saving..." : "Add Certificate"}
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