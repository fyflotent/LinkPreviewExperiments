import styled from "@emotion/styled";
import { useRef } from "react";

const Body = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  // justify-content: center;
  gap: 16px;
`;

const TextInput = styled.input`
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const InputDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;
const InputLabel = styled.label``;

const PreviewCardDiv = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid #ccc;
  border-radius: 8px;
  min-height: 200px;
  min-width: 400px;
`;

function App() {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <Body>
      <InputDiv>
        <InputLabel htmlFor="linkInput">Enter a link:</InputLabel>
        <TextInput ref={inputRef} id="linkInput" />
      </InputDiv>
      <PreviewCardDiv />
    </Body>
  );
}

export default App;
