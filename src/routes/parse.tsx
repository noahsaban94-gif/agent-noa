import { createFileRoute } from "@tanstack/react-router";
import { ParserView } from "@/components/views/parser-view";

type ParseSearch = {
  draft?: string;
  name?: string;
  phone?: string;
};

export const Route = createFileRoute("/parse")({
  validateSearch: (search: Record<string, unknown>): ParseSearch => ({
    draft: typeof search.draft === "string" ? search.draft : undefined,
    name: typeof search.name === "string" ? search.name : undefined,
    phone: typeof search.phone === "string" ? search.phone : undefined,
  }),
  component: ParserView,
});
