import { IconBookmark, IconHeart, IconShare } from "@tabler/icons-react";
import {
  Card,
  Image,
  Text,
  ActionIcon,
  Badge,
  Group,
  createStyles,
} from "@mantine/core";
import { Source } from "../../../../../../shared/types/types";
import getRelations from "../../../services/relations/getRelations";
import "./AnimeMangaCard.css";

const useStyles = createStyles((theme) => ({
  card: {
    position: "relative",
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
  },

  rating: {
    position: "absolute",
    top: theme.spacing.xs,
    right: theme.spacing.xs + 2,
    pointerEvents: "none",
  },

  title: {
    display: "block",
    marginTop: theme.spacing.md,
    marginBottom: theme.spacing.xs / 2,
  },

  action: {
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.colors.dark[6]
        : theme.colors.gray[0],
    ...theme.fn.hover({
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[5]
          : theme.colors.gray[1],
    }),
  },

  footer: {
    marginTop: theme.spacing.md,
  },
}));

interface AnimeMangaProps {
  image: string;
  source: Source;
  id: number;
  title: string;
  description: string;
  rating: string;
}

export function AnimeMangaCard({
  className,
  id,
  image,
  source,
  title,
  description,
  rating,
  ...others
}: AnimeMangaProps &
  Omit<React.ComponentPropsWithoutRef<"div">, keyof AnimeMangaProps>) {
  const { classes, cx, theme } = useStyles();

  return (
    <Card
      withBorder
      radius="md"
      className={cx(classes.card, className, "mouse-pointer", "card")}
      {...others}
      style={{ width: "200px" }}
    >
      <Card.Section>
        <Image src={image} />
      </Card.Section>

      <Text className={classes.title} weight={500}>
        {title}
      </Text>

      <Text size="sm" color="dimmed" lineClamp={4}>
        {description}
      </Text>

      <Group position="apart" className={classes.footer}>
        <Group spacing={8} mr={0}>
          <ActionIcon className={classes.action}>
            <IconHeart size={16} color={theme.colors.red[6]} />
          </ActionIcon>
          <ActionIcon className={classes.action}>
            <IconBookmark size={16} color={theme.colors.yellow[7]} />
          </ActionIcon>
          <ActionIcon className={classes.action}>
            <IconShare size={16} />
          </ActionIcon>
          <Badge
            style={{
              paddingBlock: "0.5rem",
              paddingInline: "0.5rem",
            }}
            variant="gradient"
            gradient={
              rating === Source.anime
                ? { from: "yellow", to: "red" }
                : { from: "magenta", to: "purple" }
            }
          >
            {rating}
          </Badge>
        </Group>
      </Group>
    </Card>
  );
}
