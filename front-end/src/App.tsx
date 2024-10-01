import styled from "@emotion/styled";
import ky from "ky";
import { useRef } from "react";
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
  min-height: 200px;
  min-width: 400px;
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
    `/api/preview`,
    fetcher({ url: value })
  );

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!data) return <div>No data</div>;

  return (
    <PreviewCardDiv>
      <img src={data.image} alt={data.title} />
      <h3>{data.title}</h3>
      <p>{data.description}</p>
    </PreviewCardDiv>
  );
};

const App = () => {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <Body>
      <InputDiv>
        <InputLabel htmlFor="linkInput">Enter a link:</InputLabel>
        <TextInput ref={inputRef} defaultValue={defaultValue} id="linkInput" />
      </InputDiv>
      <PreviewCard value={inputRef.current?.value ?? defaultValue} />
    </Body>
  );
};

export default App;
