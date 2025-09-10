import React, {
  useEffect,
  useRef,
  useState,
  forwardRef,
  useImperativeHandle
} from "react";
// import { errorText } from "@/components/utils/formValidationStyles";
import { createPortal } from "react-dom";

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
  showOnFocus?: boolean; 
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
    showOnFocus = true,
  }: ComboBoxProps<T>,
  ref: React.Ref<ComboBoxRef>
) {
  const [query, setQuery] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [touched, setTouched] = useState(false);
  const inputRef = useRef<HTMLDivElement>(null)  // used for positioning
  const wrapperRef = useRef<HTMLDivElement>(null);  // container for outside click
  const dropdownRef = useRef<HTMLUListElement | null>(null);   // ref for the portaled dropdown
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
    const handleClickOutside = (event: Event) => {
      const target = event.target as Node;
      // if click is NOT inside wrapper AND NOT inside the portaled dropdown => close
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(target) &&
        !(dropdownRef.current && dropdownRef.current.contains(target))
      ) {
        setShowDropdown(false);
        setTouched(true);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
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
  const dropdown = showDropdown && inputRef.current
    ? createPortal(
        <ul
        ref={dropdownRef}
          className="z-40 max-h-60 overflow-auto rounded-md bg-bg text-bodyText2 py-1 text-sm shadow-lg ring-1 ring-black ring-opacity-5"
          style={{
            position: "absolute",
            top:
              inputRef.current.getBoundingClientRect().bottom +
              window.scrollY,
            left: inputRef.current.getBoundingClientRect().left + window.scrollX,
            width: inputRef.current.offsetWidth,
          }}
          onScroll={(e) => {
            const target = e.currentTarget
            if (
              target.scrollTop + target.clientHeight >=
              target.scrollHeight - 5
            ) {
              if (onScrollEnd) onScrollEnd()
            }
          }}
        >
          {filteredItems.length > 0 ? (
            filteredItems.map((item, idx) => (
              <li
                key={`${String(valueKey)}-${String(item[valueKey])}-${idx}`}
                className="cursor-pointer px-4 py-2 hover:bg-main1 hover:text-white"
                onClick={() => handleSelect(item)}
              >
                {String(item[displayKey])}
              </li>
            ))
          ) : query.trim() === "" ? (
            <li className="px-4 py-2 text-bodyText2">
              Waiting for Next Action
            </li>
          ) : (
            <li className="px-4 py-2 text-bodyText2">No Results Found</li>
          )}
        </ul>,
        document.body
      )
    : null

  return (
    <div ref={wrapperRef}>
      <div ref={inputRef}>
      <input
        type="text"
        value={query}
        onChange={(e) => {
          const val = e.target.value
          setQuery(val)
          setShowDropdown(true)
          if (onInputChange) {
            onInputChange(val)
          }
        }}
        onFocus={() => {
          setShowDropdown(true);
          if (showOnFocus && onInputChange) {
            const safeQuery = query.trim() || "a"; // 👈 use default when empty
            onInputChange(safeQuery);
          }
        }}
        placeholder={placeholder}
        className={className || "text-bodytext2"}
      />
      </div>
      {dropdown}
    </div>
  )
}

function createGenericComboBox<T>() {
  return forwardRef<ComboBoxRef, ComboBoxProps<T>>(ComboBoxInner)
}

const ComboBox = createGenericComboBox<any>()

export default ComboBox