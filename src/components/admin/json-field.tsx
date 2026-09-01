"use client";

import { useId } from "react";

export type JsonValue =
  | string
  | number
  | boolean
  | null
  | JsonValue[]
  | { [key: string]: JsonValue };

function emptyLike(sample: JsonValue): JsonValue {
  if (typeof sample === "string") return "";
  if (typeof sample === "number") return 0;
  if (typeof sample === "boolean") return false;
  if (Array.isArray(sample)) return [];
  if (sample && typeof sample === "object") {
    return Object.fromEntries(
      Object.entries(sample).map(([key, val]) => [key, emptyLike(val)])
    );
  }
  return "";
}

/** Recursively renders an editable form for arbitrary JSON — used by the admin content editor. */
export function JsonField({
  label,
  value,
  onChange,
}: {
  label?: string;
  value: JsonValue;
  onChange: (next: JsonValue) => void;
}) {
  const inputId = useId();

  if (Array.isArray(value)) {
    return (
      <fieldset className="rounded-xl border border-white/10 p-4">
        {label && (
          <legend className="px-1 text-sm font-bold text-panther-gold">{label}</legend>
        )}
        <div className="space-y-4">
          {value.map((item, index) => (
            <div key={index} className="rounded-lg border border-white/10 p-3">
              <div className="mb-2 flex items-center justify-between">
                <span className="text-xs font-semibold text-panther-muted">
                  Item {index + 1}
                </span>
                <button
                  type="button"
                  onClick={() => onChange(value.filter((_, i) => i !== index))}
                  className="text-xs font-semibold text-red-400 hover:text-red-300"
                >
                  Remove
                </button>
              </div>
              <JsonField
                value={item}
                onChange={(next) => onChange(value.map((v, i) => (i === index ? next : v)))}
              />
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={() => onChange([...value, value.length > 0 ? emptyLike(value[0]) : ""])}
          className="mt-3 rounded-full border border-panther-gold/40 px-4 py-1.5 text-xs font-bold text-panther-gold hover:bg-panther-gold/10"
        >
          + Add item
        </button>
      </fieldset>
    );
  }

  if (value !== null && typeof value === "object") {
    return (
      <fieldset className="space-y-3 rounded-xl border border-white/10 p-4">
        {label && (
          <legend className="px-1 text-sm font-bold text-panther-gold">{label}</legend>
        )}
        {Object.entries(value).map(([key, val]) => (
          <JsonField
            key={key}
            label={key}
            value={val}
            onChange={(next) => onChange({ ...value, [key]: next })}
          />
        ))}
      </fieldset>
    );
  }

  if (typeof value === "boolean") {
    return (
      <label htmlFor={inputId} className="flex items-center gap-2 text-sm text-panther-cream">
        <input
          id={inputId}
          type="checkbox"
          checked={value}
          onChange={(e) => onChange(e.target.checked)}
        />
        {label}
      </label>
    );
  }

  if (typeof value === "number") {
    return (
      <label htmlFor={inputId} className="block text-sm">
        {label && <span className="mb-1 block font-semibold text-panther-cream">{label}</span>}
        <input
          id={inputId}
          type="number"
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="w-full rounded-lg border border-white/10 bg-panther-charcoal px-3 py-2 text-panther-cream outline-none focus:border-panther-gold"
        />
      </label>
    );
  }

  const stringValue = value ?? "";
  const isLong = stringValue.length > 80;

  return (
    <label htmlFor={inputId} className="block text-sm">
      {label && <span className="mb-1 block font-semibold text-panther-cream">{label}</span>}
      {isLong ? (
        <textarea
          id={inputId}
          value={stringValue}
          onChange={(e) => onChange(e.target.value)}
          rows={3}
          className="w-full rounded-lg border border-white/10 bg-panther-charcoal px-3 py-2 text-panther-cream outline-none focus:border-panther-gold"
        />
      ) : (
        <input
          id={inputId}
          type="text"
          value={stringValue}
          onChange={(e) => onChange(e.target.value)}
          className="w-full rounded-lg border border-white/10 bg-panther-charcoal px-3 py-2 text-panther-cream outline-none focus:border-panther-gold"
        />
      )}
    </label>
  );
}
