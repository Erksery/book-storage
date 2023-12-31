import { useEffect, useRef, useState } from "react";
import "./ModalSearch-CSS.css";
import "./Transition-ModalSearch.css";
import { Icon48CancelOutline } from "@vkontakte/icons";
import { Transition } from "react-transition-group";
import GetSearchManga from "../../GetSearchManga.jsx";

// eslint-disable-next-line react/prop-types
function ModalSearch({ modalSearch, setModalSearch }) {
  const [searchValue, setSearchValue] = useState("");
  const [inputValue, setInputValue] = useState("");

  const searchInputRef = useRef();

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      setSearchValue(inputValue);
    }, 300);
    return () => clearTimeout(delayDebounce);
  }, [inputValue]);

  return (
    <>
      <Transition in={modalSearch} timeout={500}>
        {(modalSearch) => (
          <>
            <div
              onClick={() => {
                setModalSearch(false);
                setSearchValue("");
              }}
              className={`BackgroundClose ${modalSearch}`}
            />
            <div className={`SearchModal ${modalSearch}`}>
              <div className="Input-wrap">
                <input
                  ref={searchInputRef}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder={`Опять работать?`}
                />
                {searchValue && (
                  <button
                    onClick={() => {
                      setSearchValue("");
                      setInputValue("");
                      searchInputRef.current.focus();
                    }}
                  >
                    <Icon48CancelOutline width={26} />
                  </button>
                )}
              </div>
              <div className="Search-dropdown">
                <GetSearchManga
                  setModalSearch={setModalSearch}
                  searchValue={searchValue}
                />
              </div>
            </div>
          </>
        )}
      </Transition>
    </>
  );
}

export default ModalSearch;
