import { MantineProvider } from "@mantine/core";
import Home from "./pages/home/Home";

export default function App() {
  return (
    <MantineProvider theme={{ colorScheme: "dark" }}>
      <Home />
    </MantineProvider>
  );
}
