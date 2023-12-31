import "./Header-CSS.css";
import logo from "../../assets/vite.svg";
import { Link } from "react-router-dom";
import { Transition } from "react-transition-group";
import {
  Icon96NotePenOutline,
  Icon56ServicesOutline,
  Icon56SearchOutline,
  Icon28MenuOutline,
} from "@vkontakte/icons";
import { useState } from "react";
import ModalSearch from "./ModalSearch/ModalSearch.jsx";
import { useCookies } from "react-cookie";
import UserButton from "../UserButton/UserButton.jsx";

function HeaderPage({ isVisible }) {
  const [modalSearch, setModalSearch] = useState(false);

  const [cookies] = useCookies(["AuthDataCookie"]);

  return (
    <Transition in={isVisible} timeout={500}>
      {(isVisible) => (
        <div className={`Header ${isVisible}`}>
          <div className="Logo-container">
            <Link to={"/"}>
              <img style={{ width: 40 }} src={logo} />
              <h2>React Manga</h2>
            </Link>
          </div>

          <div className="Search-container">
            <ModalSearch
              modalSearch={modalSearch}
              setModalSearch={setModalSearch}
            />
            <div
              onClick={() => {
                setModalSearch((prev) => !prev);
              }}
              className="Search-input"
            >
              <Icon56SearchOutline width={26} />
              Поиск
            </div>
          </div>
          <div className="Option-container">
            {/*<button>*/}
            {/*  <Icon56SearchOutline width={26} />*/}
            {/*  Поиск*/}
            {/*</button>*/}
            <button className="MenuButton-button">
              <Icon28MenuOutline width={33} height={33} />
            </button>
            <div style={{ display: "flex" }}>
              <Link className="link" to={"/catalog"}>
                <button>
                  <Icon56ServicesOutline width={26} height={26} />
                  Каталог
                </button>
              </Link>
              <Link className="link" to={"/create"}>
                <button>
                  <Icon96NotePenOutline width={26} height={26} />
                  Добавить
                </button>
              </Link>
              {cookies.AuthDataCookie ? (
                <UserButton />
              ) : (
                <Link to={"/sing-in"}>
                  <button className="Auth-button">Войти</button>
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </Transition>
  );
}

export default HeaderPage;
