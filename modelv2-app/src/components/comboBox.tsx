'use client';

import React, { useRef, useMemo, Key, useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import { ComboBox as AriaComboBox, ListBox, ListBoxItem, Input, Popover, Button } from 'react-aria-components';
import { ChevronDownIcon } from 'lucide-react';

export interface ComboBoxItem { [key: string]: any; }

export interface ComboBoxRef { focus: () => void; clear: () => void; }

export interface ComboBoxProps {
  items: ComboBoxItem[];               // List of options
  displayKey: string;                  // Field to show as label (e.g. CMP_CON_NAM)
  valueKey: string;                    // Unique field identifier (e.g. CMP_CON_COD)
  selectedValue: string;               // Current selected value (the unique code)
  setSelectedValue: (value: string) => void; // Setter passed from parent
  onInputChange?: (value: string) => void;   // Triggered on typing
  onScrollEnd?: () => void;            // For infinite scrolling (optional)
  placeholder?: string;                // Placeholder text
  className?: string;                  // Custom class styling
  disabled?: boolean;                  // Disable the input
  loading?: boolean;                   // Loading state indicator
  ariaLabel?: string;                  // Accessibility label
  showValueKeyInList?: boolean;        // Whether to display code + name together
}

const ComboBox = forwardRef<ComboBoxRef, ComboBoxProps>(
  (
    {
      items,
      displayKey,
      valueKey,
      selectedValue,
      setSelectedValue,
      onInputChange,
      onScrollEnd,
      placeholder = 'Search...',
      className = '',
      disabled = false,
      loading = false,
      ariaLabel = '',
      showValueKeyInList = true,
    },
    ref
  ) => {
    // Refs and state
    const inputRef = useRef<HTMLInputElement>(null);
    const listBoxRef = useRef<HTMLDivElement>(null);
    const [inputValue, setInputValue] = useState('');
    const [hasUserInteracted, setHasUserInteracted] = useState(false);
    const [isClient, setIsClient] = useState(false);
    const [isTyping, setIsTyping] = useState(false);

    // Adds a unique ID for each option to satisfy React Aria’s internal keys.
    const ariaItems = useMemo<(ComboBoxItem & { id: string })[]>(
      () =>
        items.map(item => ({
          ...item,
          id: `${item[valueKey]}-${item[displayKey]}`, // combine both keys
        })),
      [items, valueKey, displayKey]
    );

    // Quickly retrieves the selected item object for displaying its label.
    const selectedItem = useMemo(
      () => items.find(item => item[valueKey] === selectedValue),
      [items, valueKey, selectedValue]
    );

    //This keeps the input text synchronized with the selected item’s name, but doesn’t override user typing while they’re editing.
    useEffect(() => {
      if (!isTyping) {
        if (selectedItem) setInputValue(selectedItem[displayKey] ?? '');
        else if (!selectedValue) setInputValue('');
      }
    }, [selectedItem, displayKey, selectedValue, isTyping]);

    // This extracts the selected value from the key (which was set as ${value}-${label}).
    const handleSelectionChange = (key: Key | null) => {
      if (key) {
        // Extract original code before "-"
        const [originalValue] = (key as string).split("-");
        setSelectedValue(originalValue);

        const selected = items.find(
          i => i[valueKey] === originalValue
        );
        setInputValue(selected?.[displayKey] ?? "");
      } else {
        setSelectedValue("");
        setInputValue("");
      }
    };

    // This triggers live search using onInputChange, so the parent hook can fetch filtered data (like clients or countries).
    const handleInputChange = (val: string) => {
      setInputValue(val);
      setHasUserInteracted(true);
      setIsTyping(true);

      if (val.trim() === '') {
        // Reset state properly when input cleared
        setSelectedValue('');
        onInputChange?.('ALL');
      } else {
        onInputChange?.(val);
        // only clear selected if the text no longer matches the chosen display
        if (selectedValue && val !== selectedItem?.[displayKey]) {
          setSelectedValue('');
        }
      }
    };

    // fetches initial list on first open.
    const handleFocus = () => {
      if (onInputChange && !hasUserInteracted) {
        onInputChange('ALL');
      }
    };

    //resets typing flag.
    const handleBlur = () => {
      setIsTyping(false);
    };

    // triggers lazy loading (if onScrollEnd provided).
    const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
      if (!onScrollEnd || loading) return;
      const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
      if (scrollTop + clientHeight >= scrollHeight - 100) onScrollEnd();
    };

    // Exposes focus and clear methods to parent components. Allows parent to call comboRef.current.focus() or comboRef.current.clear().
    useImperativeHandle(ref, () => ({
      focus: () => {
        inputRef.current?.focus();
        handleFocus();
      },
      clear: () => {
        setSelectedValue('');
        setInputValue('');
        setHasUserInteracted(false);
        onInputChange?.('ALL');
      },
    }));

    // Ensures component only renders on client side to avoid SSR issues.
    useEffect(() => setIsClient(true), []);
    if (!isClient) return null;

    // Main render
    return (
      <AriaComboBox
        items={ariaItems}
        inputValue={inputValue}
        onInputChange={handleInputChange}
        onSelectionChange={handleSelectionChange}
        selectedKey={selectedValue}
        menuTrigger='focus'
        aria-label={ariaLabel || placeholder}
      >
        <div className="relative flex items-center">
          <Input
            ref={inputRef}
            placeholder={placeholder}
            onFocus={handleFocus}
            onBlur={handleBlur}
            disabled={disabled}
            className={className}
            aria-label={placeholder}
          />
          <Button className="absolute right-0 p-1.5 mr-1 rounded-md text-subtext">
            {loading ? (
              <div className="w-4 h-4 border-2 border-gray-300 border-t-blue-500 rounded-full animate-spin" />
            ) : (
              <ChevronDownIcon className="w-4 h-4" />
            )}
          </Button>
        </div>

        <Popover className="w-[--trigger-width] rounded-lg shadow-lg border border-tableBorder bg-bgContainer mt-1">
         <ListBox
            ref={listBoxRef}
            onScroll={handleScroll}
            className="max-h-60 overflow-auto outline-none p-1"
          >
            {ariaItems.length > 0 ? (
              ariaItems.map((item,index) => {
                const displayName = item[displayKey];
                const valueCode = item[valueKey];
                const textValue = showValueKeyInList
                  ? `${valueCode} — ${displayName}`
                  : displayName;

                return (
                  <ListBoxItem
                    key={`${item[valueKey]}-${item[displayKey]}-${index}`}
                    id={`${valueCode}-${displayName}`}
                    textValue={textValue}
                  >
                    {({ isFocused, isSelected }) => (
                      <div
                        className={`px-3 py-2 text-sm cursor-default rounded-md transition-colors
                          ${isFocused ? "bg-button3" : ""}
                          ${isSelected ? "bg-button3" : ""}
                          ${!isFocused && !isSelected ? "hover:bg-button3" : ""}
                        `}
                      >
                        {showValueKeyInList ? (
                          <div className="flex flex-col">
                            <span className="font-medium">{displayName}</span>
                            <span className="text-xs text-subtext">{valueCode}</span>
                          </div>
                        ) : (
                          displayName
                        )}
                      </div>
                    )}
                  </ListBoxItem>
                );
              })
            ) : (
              <div className="px-3 py-2 text-gray-500 text-sm text-center">
                {loading ? "Loading..." : "No results found"}
              </div>
            )}
          </ListBox>

          {loading && items.length > 0 && (
            <div className="px-4 py-2 text-sm text-gray-500 text-center border-t">
              <div className="flex items-center justify-center">
                <div className="w-4 h-4 border-2 border-gray-300 border-t-blue-500 rounded-full animate-spin mr-2" />
                Loading more...
              </div>
            </div>
          )}
        </Popover>
      </AriaComboBox>
    );
  }
);

ComboBox.displayName = 'ComboBox';
export default ComboBox;