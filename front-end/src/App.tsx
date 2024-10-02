import styled from "@emotion/styled";
import useAxios from "axios-hooks";
import { useRef, useState } from "react";

const Body = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  padding: 16px;
  align-items: center;
  justify-content: center;
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
  width: 400px;
`;
const InputLabel = styled.label``;

const PreviewCardDiv = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid #ccc;
  border-radius: 8px;
  max-height: 400px;
  width: 400px;
  /* animate card expanding from nothing on load */
  animation: fadeIn 0.5s ease-in-out;
  @keyframes fadeIn {
    from {
      height: 0;
      width: 0;
    }
    to {
      height: 400px;
      width: 400px;
    }
  }
`;

const H3 = styled.h3`
  margin-block-start: 0.5em;
  margin-block-end: 0.5em;
  font-size: 1.17em;
  margin: 0;
  color: #333;
`;

const Paragraph = styled.p`
  margin-block-start: 0.5em;
  margin-block-end: 0.5em;
  /* truncate text with ellipsis */
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin: 0;
  color: #333;
`;

const PreviewDataBody = styled.div<{ inheritBorder?: boolean }>`
  display: flex;
  flex-direction: column;
  padding: 8px;
  max-height: 80px;
  background-color: #e1e1e1;
  ${(props) => props.inheritBorder && "border-radius: inherit;"}
`;

const PreviewDataImage = styled.img`
  border-top-left-radius: inherit;
  border-top-right-radius: inherit;
  max-height: 80%;
  object-fit: cover;
  max-height: 320px;
`;

const FancyButton = styled.button`
  background-color: #4caf50;
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
  border-radius: 4px;
  /* hover effect */
  transition: background-color 0.3s;
  &:hover {
    background-color: #45a049;
  }
`;

const LinkWithNoStyle = styled.a`
  text-decoration: none;
  color: inherit;
`;

type PreviewData = {
  title?: string;
  description?: string;
  image?: string;
};

const defaultValue =
  "https://web-highlights.com/blog/turn-your-website-into-a-beautiful-thumbnail-link-preview/";

const PreviewCard = ({ value }: { value: string }) => {
  const [{ data, error, loading: isLoading }] = useAxios<PreviewData>({
    url: "/api/preview/",
    method: "POST",
    data: { url: value },
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!data) return <div>No data</div>;

  return (
    <LinkWithNoStyle href={value}>
      <PreviewCardDiv>
        {data.image && <PreviewDataImage src={data.image} alt={data.title} />}
        <PreviewDataBody inheritBorder={!data.image}>
          <H3>{data.title}</H3>
          <Paragraph>{data.description}</Paragraph>
        </PreviewDataBody>
      </PreviewCardDiv>
    </LinkWithNoStyle>
  );
};

const App = () => {
  const [currentValue, setCurrentValue] = useState<string>(defaultValue);
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <Body>
      <InputDiv>
        <InputLabel htmlFor="linkInput">Enter a link:</InputLabel>
        <TextInput ref={inputRef} defaultValue={defaultValue} id="linkInput" />
        <FancyButton
          onClick={() => {
            setCurrentValue(inputRef.current?.value ?? "");
          }}
        >
          Submit
        </FancyButton>
      </InputDiv>
      <PreviewCard value={currentValue} />
    </Body>
  );
};

export default App;
