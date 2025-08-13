import { useEffect, useRef, useState, forwardRef, useImperativeHandle } from "react";

export interface ComboBoxRef {
  clear: () => void;
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
  onLoadMore?: () => void;
  hasMore?: boolean;
}

function ComboBoxInner<T>(
  {
    items,
    displayKey,
    valueKey,
    selectedValue,
    setSelectedValue,
    placeholder = "Search...",
    className,
    onInputChange,
    onLoadMore,
    hasMore
  }: ComboBoxProps<T> & { 
    onInputChange?: (val: string) => void;
    onLoadMore?: () => void;
    hasMore?: boolean;
  },
  ref: React.Ref<ComboBoxRef>
) {
  const [query, setQuery] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const inputRef = useRef<HTMLDivElement>(null);

  useImperativeHandle(ref, () => ({
    clear: () => setQuery("")
  }));

  // Pre-fill if selectedValue exists
  useEffect(() => {
    const selectedItem = items.find((item) => String(item[valueKey]) === selectedValue);
    if (selectedItem) {
      setQuery(String(selectedItem[displayKey]));
    }
  }, [selectedValue, items, displayKey, valueKey]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (inputRef.current && !inputRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // If no onInputChange, we filter locally
  const filteredItems = onInputChange
    ? items // for dynamic mode, items are already filtered from API
    : items.filter((item) =>
        String(item[displayKey]).toLowerCase().includes(query.toLowerCase())
      );

  const handleSelect = (item: T) => {
    setQuery(String(item[displayKey]));
    setSelectedValue(String(item[valueKey]));
    setShowDropdown(false);
  };

  return (
    <div className="relative w-80" ref={inputRef}>
      <input
        type="text"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setShowDropdown(true);
          onInputChange?.(e.target.value);
        }}
        onFocus={() => setShowDropdown(true)}
        placeholder={placeholder}
        className={`${className || ''}`}
      />
      {showDropdown && (
        <ul className="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-md bg-bg text-bodyText2 py-1 text-sm shadow-lg ring-1 ring-black ring-opacity-5">
          {items.length > 0 ? (
            <>
              {items.map((item, idx) => (
                <li
                  key={`${String(valueKey)}-${String(item[valueKey])}-${idx}`}
                  className="cursor-pointer px-4 py-2 hover:bg-main1"
                  onClick={() => handleSelect(item)}
                >
                  {String(item[displayKey])}
                </li>
              ))}
              {hasMore && (
                <li
                  className="cursor-pointer px-4 py-2 text-blue-500 hover:underline"
                  onClick={onLoadMore}
                >
                  View more...
                </li>
              )}
            </>
          ) : (
            <li className="px-4 py-2 text-bodyText2">No results found</li>
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
