import { Container } from "@mantine/core";
import { SearchBar } from "./components/SearchBar";
import "./components/SearchBar.css";

export default function Home() {
  return (
    <>
      <Container className="search-bar">
        <SearchBar />
      </Container>
    </>
  );
}
