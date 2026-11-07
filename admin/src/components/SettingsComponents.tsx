import Toggle from "./Toggle";

export const SettingRow = ({
  title,
  description,
  checked,
  onChange,
  disabled = false,
}) => (
  <div className="flex items-start justify-between gap-4 py-5">
    <div className="min-w-0">
      <h3 className="text-sm font-semibold text-gray-800">{title}</h3>
      <p className="mt-1 max-w-xl text-sm leading-6 text-gray-500">
        {description}
      </p>
    </div>

    <div className="pt-0.5">
      <Toggle checked={checked} onChange={onChange} disabled={disabled} />
    </div>
  </div>
);

export const Field = ({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
}) => (
  <div className="space-y-2">
    <label className="block text-sm font-medium text-gray-700">{label}</label>
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full rounded-lg border border-gray-200 bg-white px-3.5 py-2.5 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-red-500 focus:ring-2 focus:ring-red-100"
    />
  </div>
);
