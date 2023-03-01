import {
  TextInput,
  TextInputProps,
  ActionIcon,
  useMantineTheme,
} from "@mantine/core";
import { IconSearch, IconArrowRight, IconArrowLeft } from "@tabler/icons-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Content,
  isContent,
  SearchByTitleRequest,
} from "../../../../../../shared/types/types";
import { searchByTitle } from "../../../services/search/search";
import exists from "../../../utils/exists";

export function SearchBar(props: TextInputProps) {
  const theme = useMantineTheme();
  const [query, setQuery] = useState<SearchByTitleRequest>({ title: "" });
  const navigate = useNavigate();

  return (
    <TextInput
      icon={<IconSearch size={18} stroke={1.5} />}
      radius="xl"
      size="md"
      rightSection={
        <ActionIcon
          size={32}
          radius="xl"
          color={theme.primaryColor}
          variant="filled"
          onClick={async () => {
            const searchResponse: Content | undefined =
              await searchByTitle(query);
            if (!exists(searchResponse))
              return alert("Response in not defined");
            if (!isContent(searchResponse))
              return alert("Not valid Response type");

            navigate("/search_results", { state: searchResponse });
          }}
        >
          {theme.dir === "ltr" ? (
            <IconArrowRight size={18} stroke={1.5} />
          ) : (
            <IconArrowLeft size={18} stroke={1.5} />
          )}
        </ActionIcon>
      }
      placeholder="Search Anime or Manga"
      rightSectionWidth={42}
      onChange={(e) => {
        setQuery({ title: e.target.value });
      }}
    />
  );
}
