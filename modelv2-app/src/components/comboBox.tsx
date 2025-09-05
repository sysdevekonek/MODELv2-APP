import React, {
  useEffect,
  useRef,
  useState,
  forwardRef,
  useImperativeHandle
} from "react";
import { errorText } from "@/components/utils/formValidationStyles";

export interface ComboBoxRef {
  clear: () => void;
  focus: () => void;
  isValid: () => boolean;
}

interface ComboBoxProps<T> {
  items: T[];
  displayKey: keyof T;
  valueKey: keyof T;
  selectedValue: string;
  setSelectedValue: (val: string) => void;
  placeholder?: string;
  className?: string;
  onInputChange?: (val: string) => void;
  onScrollEnd?: () => void;
  hasMore?: boolean;
  required?: boolean;   
  name?: string;      
}

function ComboBoxInner<T>(
  {
    items = [],
    displayKey,
    valueKey,
    selectedValue,
    setSelectedValue,
    placeholder = "Search...",
    className,
    onInputChange,
    onScrollEnd,
    hasMore,
    required = false,
    name,
  }: ComboBoxProps<T>,
  ref: React.Ref<ComboBoxRef>
) {
  const [query, setQuery] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [touched, setTouched] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const inputEl = useRef<HTMLInputElement>(null);

  useImperativeHandle(ref, () => ({
    clear: () => {
      setQuery("");
      setTouched(false);
      setSelectedValue("");
    },
    focus: () => inputEl.current?.focus(),
    isValid: () => !required || !!selectedValue,
  }));

  useEffect(() => {
    const selectedItem = items.find((item) => String(item[valueKey]) === selectedValue);
    if (selectedItem) {
      setQuery(String(selectedItem[displayKey]));
    } else if (!selectedValue) {
      setQuery("");
    }
  }, [selectedValue, items, displayKey, valueKey]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
        setTouched(true);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredItems = onInputChange
    ? items
    : items.filter((item) =>
        String(item[displayKey]).toLowerCase().includes(query.toLowerCase())
      );

  const handleSelect = (item: T) => {
    setQuery(String(item[displayKey]));
    setSelectedValue(String(item[valueKey]));
    setShowDropdown(false);
    setTouched(true);
  };

  const invalid = required && touched && !selectedValue;

  return (
    <div className="relative w-80" ref={wrapperRef}>
      <input
        tabIndex={-1}
        name={name}
        value={selectedValue}
        onChange={() => {}}
        required={required}
        aria-hidden="true"
        style={{
          position: "absolute",
          opacity: 0,
          width: 0,
          height: 0,
          pointerEvents: "none",
        }}
      />

      <input
        ref={inputEl}
        type="text"
        value={query}
        onChange={(e) => {
          const val = e.target.value;
          setQuery(val);
          setShowDropdown(true);
          if (onInputChange) onInputChange(val);
        }}
        onFocus={() => setShowDropdown(true)}
        onBlur={() => setTouched(true)}
        placeholder={placeholder}
        className={className}
      />

      {invalid && (
        <p className={errorText}>This field is required</p>
      )}


      {showDropdown && (
        <ul
          className="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-md bg-bg text-bodyText2 py-1 text-sm shadow-lg ring-1 ring-black ring-opacity-5"
          onScroll={(e) => {
            const target = e.currentTarget;
            if (target.scrollTop + target.clientHeight >= target.scrollHeight - 5) {
              onScrollEnd?.();
            }
          }}
        >
          {filteredItems.length > 0 ? (
            filteredItems.map((item, idx) => (
              <li
                key={`${String(valueKey)}-${String(item[valueKey])}-${idx}`}
                className="cursor-pointer px-4 py-2 hover:bg-main1"
                onClick={() => handleSelect(item)}
              >
                {String(item[displayKey])}
              </li>
            ))
          ) : query.trim() === "" ? (
            <li className="px-4 py-2 text-bodyText2">Waiting for Next Action</li>
          ) : (
            <li className="px-4 py-2 text-bodyText2">No Results Found</li>
          )}
          {hasMore && (
            <li className="px-4 py-2 text-center text-xs text-subtext">Loading more…</li>
          )}
        </ul>
      )}
    </div>
  );
}

function createGenericComboBox<T>() {
  return forwardRef<ComboBoxRef, ComboBoxProps<T>>(ComboBoxInner);
}

const ComboBox = createGenericComboBox<any>();

export default ComboBox;
