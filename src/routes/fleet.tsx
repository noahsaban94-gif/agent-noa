import { createFileRoute } from "@tanstack/react-router";
import { FleetView } from "@/components/views/fleet-view";

export const Route = createFileRoute("/fleet")({ component: FleetView });
