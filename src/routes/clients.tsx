import { createFileRoute } from "@tanstack/react-router";
import { ClientsView } from "@/components/views/clients-view";

export const Route = createFileRoute("/clients")({ component: ClientsView });
