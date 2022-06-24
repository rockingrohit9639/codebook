import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { Controlled as CodeMirror } from "react-codemirror2";

// Importing Themes
import "codemirror/lib/codemirror.css";
import "codemirror/theme/material.css";
import "codemirror/theme/3024-night.css";
import "codemirror/theme/abbott.css";
import "codemirror/theme/abcdef.css";
import "codemirror/theme/ayu-dark.css";
import "codemirror/theme/ayu-mirage.css";
import "codemirror/theme/base16-dark.css";
import "codemirror/theme/blackboard.css";
import "codemirror/theme/cobalt.css";
import "codemirror/theme/colorforth.css";
import "codemirror/theme/dracula.css";
import "codemirror/theme/erlang-dark.css";
import "codemirror/theme/hopscotch.css";
import "codemirror/theme/isotope.css";
import "codemirror/theme/mdn-like.css";
import "codemirror/theme/monokai.css";
import "codemirror/theme/neo.css";
import "codemirror/theme/night.css";
import "codemirror/theme/nord.css";
// import "codemirror/theme/solarized.css";
import "codemirror/theme/the-matrix.css";
import "codemirror/theme/twilight.css";
import "codemirror/theme/yeti.css";
// Importing Themes

// Importing Languages
import "codemirror/mode/xml/xml"; // xml
import "codemirror/mode/htmlmixed/htmlmixed";
import "codemirror/mode/css/css";
import "codemirror/mode/javascript/javascript";
import "codemirror/mode/python/python";
import "codemirror/mode/clike/clike";
import "codemirror/mode/php/php";
import "codemirror/mode/powershell/powershell";
import "codemirror/mode/dart/dart";
import "codemirror/mode/django/django";
import "codemirror/mode/shell/shell";
import "codemirror/mode/sql/sql";
import "codemirror/mode/markdown/markdown";
// Importing Languages

import DarkModeIcon from "@mui/icons-material/DarkMode";
import LanguageIcon from "@mui/icons-material/Language";
import Tooltip from "@mui/material/Tooltip";
import Dropdown from "../Dropdown/Dropdown";

import { THEMES, LANGUAGES, defaultCode } from "../../utils/constants";
import { componentToImage } from "../../utils/componentToImage";
import { handleUpload } from "../../utils/handleUpload";

import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  width: 100%;
  height: calc(100vh - 60px);
  padding: 1rem clamp(2rem, 12vw, 6rem);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 4rem;
  @media only screen and (max-width: 680px) {
    padding: 1rem clamp(1rem, 12vw, 2rem);
  }
`;

const Menu = styled.div`
  width: clamp(5rem, 90vw, 70rem);
  height: 10px;
  display: flex;
  align-items: center;
  gap: 2rem;
`;

const MenuOption = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0 0.8rem;
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 2px 4px 8px 1px rgba(0, 0, 0, 0.08);
`;

const CodeWrapper = styled.div`
  width: clamp(5rem, 90vw, 70rem);
  border: 2px solid #000;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-block: 2rem;
`;

const CodeOverlay = styled.div`
  width: max-content;
  max-width: 100%;
  background-color: ${(props) => props.bgColor || "red"};
  padding: 2rem;
  position: relative;
`;

const MenuIcons = styled.img`
  position: absolute;
  top: 3rem;
  left: 3rem;
  z-index: 10;
`;

const SelectBgColor = styled.input`
  height: 3.7rem;
  width: 3.7rem;
  border: none;
  outline: none;
  cursor: pointer;

  &::-webkit-color-swatch {
    border: none;
    border-radius: 5px;
  }
`;

const InputBox = styled.div`
  width: clamp(5rem, 90vw, 70rem);
  height: 6rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  background-color: #fff;
  box-shadow: 2px 4px 10px -5px rgba(0, 0, 0, 0.1);
`;

const Input = styled.input`
  border: none;
  outline: none;
  width: 100%;
  height: 100%;
  padding-left: 1rem;
  font-size: 1rem;
  background: transparent;
`;

const SubmitButton = styled.button``;

function CreatePost() {
  // TODO: Show number of line
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const [editorValue, setEditorValue] = useState("");
  const [theme, setTheme] = useState("material");
  const [language, setLanguage] = useState("javascript");
  const [bgColor, setBgColor] = useState("#f8e71d");
  const [postTitle, setPostTitle] = useState("");
  const postRef = useRef();
  const navigate = useNavigate();

  const handlePostSubmit = async () => {
    const image = await componentToImage(postRef.current);
    const imageURL = await handleUpload(image, user.username);
    console.log(imageURL);
  };

  useEffect(() => {
    // if (!isAuthenticated) {
    //   return navigate("/login");
    // }

    setEditorValue(defaultCode);
  }, [isAuthenticated, navigate]);

  return (
    <Container>
      <InputBox>
        <Input
          type={"text"}
          placeholder="Enter post title..."
          value={postTitle}
          onChange={(e) => setPostTitle(e.target.value)}
        />
      </InputBox>

      <Menu>
        <MenuOption>
          <DarkModeIcon />
          <Dropdown
            list={THEMES}
            label={"Themes"}
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
            valueKey="id"
          />
        </MenuOption>

        <MenuOption>
          <LanguageIcon />
          <Dropdown
            list={LANGUAGES}
            label={"Languages"}
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            valueKey="mode"
          />
        </MenuOption>

        <Tooltip title="Change Background Color">
          <SelectBgColor
            type={"color"}
            onChange={(e) => setBgColor(e.target.value)}
          />
        </Tooltip>

        <SubmitButton onClick={handlePostSubmit}>Post</SubmitButton>
      </Menu>

      <CodeWrapper>
        <CodeOverlay bgColor={bgColor} ref={postRef}>
          <MenuIcons src="/assets/menu-buttons.svg" />

          <CodeMirror
            className="codemirror_wrapper"
            value={editorValue}
            options={{
              screenReaderLabel: "Code editor",
              lineNumbers: false,
              firstLineNumber: 0,
              mode: language,
              theme: theme,
              scrollbarStyle: null,
              viewportMargin: Infinity,
              lineWrapping: true,
              smartIndent: true,
              readOnly: false,
              showInvisibles: false,
              autoCloseBrackets: true,
            }}
            onBeforeChange={(editor, data, value) => {
              setEditorValue(value);
            }}
          />
        </CodeOverlay>
      </CodeWrapper>
    </Container>
  );
}

export default CreatePost;
