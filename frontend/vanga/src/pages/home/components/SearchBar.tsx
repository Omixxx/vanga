import {
  TextInput,
  TextInputProps,
  ActionIcon,
  useMantineTheme,
} from "@mantine/core";
import { IconSearch, IconArrowRight, IconArrowLeft } from "@tabler/icons-react";
import { useState } from "react";
import { SearchRequest } from "../../../../../../types/types";
import getSearchResults from "../../../services/search/Search";

export function SearchBar(props: TextInputProps) {
  const theme = useMantineTheme();
  const [query, setQuery] = useState<SearchRequest>({ title: "" });

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
            console.log(await getSearchResults(query));
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
