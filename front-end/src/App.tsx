import styled from "@emotion/styled";
import ky from "ky";
import { useState } from "react";
import useSWR, { Fetcher } from "swr";

const Body = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  padding: 16px;
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
  min-width: 200px;
`;
const InputLabel = styled.label``;

const PreviewCardDiv = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid #ccc;
  border-radius: 8px;
  width: 400px;
`;

const H3 = styled.h3`
  margin-block-start: 0.5em;
  margin-block-end: 0.5em;
  font-size: 1.17em;
`;

const Paragraph = styled.p`
  margin-block-start: 0.5em;
  margin-block-end: 0.5em;
`;

const PreviewDataBody = styled.div`
  display: flex;
  flex-direction: column;
  padding: 8px;
`;

const PreviewDataImage = styled.img`
  border-top-left-radius: inherit;
  border-top-right-radius: inherit;
`;

type PreviewData = {
  title: string;
  description: string;
  image: string;
};

const fetcher =
  (params: { url: string }): Fetcher<PreviewData, string> =>
  async (url: string) => {
    const res = await ky.post(url, { json: { ...params } });
    return res.json();
  };

const defaultValue =
  "https://web-highlights.com/blog/turn-your-website-into-a-beautiful-thumbnail-link-preview/";

const PreviewCard = ({ value }: { value: string }) => {
  const { data, error, isLoading } = useSWR(
    `/api/preview/`,
    fetcher({ url: value })
  );

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!data) return <div>No data</div>;

  return (
    <PreviewCardDiv>
      <PreviewDataImage src={data.image} alt={data.title} />
      <PreviewDataBody>
        <H3>{data.title}</H3>
        <Paragraph>{data.description}</Paragraph>
      </PreviewDataBody>
    </PreviewCardDiv>
  );
};

const App = () => {
  const [currentValue, setCurrentValue] = useState<string>(defaultValue);

  return (
    <Body>
      <InputDiv>
        <InputLabel htmlFor="linkInput">Enter a link:</InputLabel>
        <TextInput
          defaultValue={defaultValue}
          onChange={(e) => {
            setCurrentValue(e.target.value);
          }}
          id="linkInput"
        />
      </InputDiv>
      <PreviewCard value={currentValue} />
    </Body>
  );
};

export default App;
