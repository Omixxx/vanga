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
  isSearchResponse,
  SearchRequest,
  SearchResponse,
} from "../../../../../../shared/types/types";
import getSearchResults from "../../../services/search/Search";
import exists from "../../../utils/exists";

export function SearchBar(props: TextInputProps) {
  const theme = useMantineTheme();
  const [query, setQuery] = useState<SearchRequest>({ title: "" });
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
            const res: SearchResponse | undefined = await getSearchResults(
              query
            );
            if (!exists(res)) return alert("Response in not defined");
            if (!isSearchResponse(res)) return alert("Not valid Response type");

            navigate("/search_results", { state: res });
          }}
        >
          {theme.dir === "ltr" ? (
            <IconArrowRight size={18} stroke={1.5} />
          ) : (
            <IconArrowLeft size={18} stroke={1.5} />
          )}
        </ActionIcon>
      }
      placeholder="Search questions"
      rightSectionWidth={42}
      {...props}
      onChange={(e) => {
        setQuery({ title: e.target.value });
        console.log(query);
      }}
    />
  );
}
