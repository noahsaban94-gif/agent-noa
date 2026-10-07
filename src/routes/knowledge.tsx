import { createFileRoute } from "@tanstack/react-router";
import { KnowledgeView } from "@/components/views/knowledge-view";

export const Route = createFileRoute("/knowledge")({ component: KnowledgeView });
