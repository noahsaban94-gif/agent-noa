import { createFileRoute } from "@tanstack/react-router";
import { CommandBoard } from "@/components/views/command-board";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  return <CommandBoard />;
}
