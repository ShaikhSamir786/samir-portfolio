import { useCallback, useMemo } from "react";
import ReactFlow, {
  Node,
  Edge,
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
  MarkerType,
  Position,
} from "reactflow";
import "reactflow/dist/style.css";
import { motion } from "framer-motion";
import { Globe, Server, Database, Cloud, Layers, Shield, Zap } from "lucide-react";

const nodeTypes = {
  custom: CustomNode,
};

function CustomNode({ data }: { data: { label: string; icon: string; color: string; metrics?: string } }) {
  const IconComponent = {
    Globe,
    Server,
    Database,
    Cloud,
    Layers,
    Shield,
    Zap,
  }[data.icon] || Globe;

  const colorClasses = {
    primary: "border-primary bg-primary/20 text-primary shadow-brutal-sm",
    accent: "border-accent bg-accent/20 text-accent shadow-brutal-accent-sm",
    destructive: "border-destructive bg-destructive/20 text-destructive",
  }[data.color] || "border-primary bg-primary/20 text-primary";

  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      className={`px-4 py-3 border-2 ${colorClasses} backdrop-blur-sm min-w-[140px]`}
    >
      <div className="flex items-center gap-2">
        <IconComponent className="w-4 h-4" />
        <span className="font-mono text-xs font-bold">{data.label}</span>
      </div>
      {data.metrics && (
        <div className="mt-1 text-[10px] text-muted-foreground font-mono">
          {data.metrics}
        </div>
      )}
    </motion.div>
  );
}

const initialNodes: Node[] = [
  // Client Layer
  {
    id: "client",
    type: "custom",
    position: { x: 250, y: 0 },
    data: { label: "CLIENT", icon: "Globe", color: "accent", metrics: "React + Next.js" },
    sourcePosition: Position.Bottom,
    targetPosition: Position.Top,
  },
  // CDN
  {
    id: "cdn",
    type: "custom",
    position: { x: 250, y: 80 },
    data: { label: "CDN", icon: "Cloud", color: "primary", metrics: "CloudFlare" },
    sourcePosition: Position.Bottom,
    targetPosition: Position.Top,
  },
  // Load Balancer
  {
    id: "loadbalancer",
    type: "custom",
    position: { x: 250, y: 160 },
    data: { label: "LOAD BALANCER", icon: "Layers", color: "primary", metrics: "nginx" },
    sourcePosition: Position.Bottom,
    targetPosition: Position.Top,
  },
  // API Gateway
  {
    id: "gateway",
    type: "custom",
    position: { x: 250, y: 250 },
    data: { label: "API GATEWAY", icon: "Shield", color: "accent", metrics: "Rate Limiting" },
    sourcePosition: Position.Bottom,
    targetPosition: Position.Top,
  },
  // Services
  {
    id: "auth-service",
    type: "custom",
    position: { x: 50, y: 350 },
    data: { label: "AUTH", icon: "Shield", color: "primary", metrics: "JWT + OAuth" },
    sourcePosition: Position.Bottom,
    targetPosition: Position.Top,
  },
  {
    id: "api-service",
    type: "custom",
    position: { x: 250, y: 350 },
    data: { label: "API SERVER", icon: "Server", color: "primary", metrics: "Node.js" },
    sourcePosition: Position.Bottom,
    targetPosition: Position.Top,
  },
  {
    id: "worker-service",
    type: "custom",
    position: { x: 450, y: 350 },
    data: { label: "WORKERS", icon: "Zap", color: "primary", metrics: "Background Jobs" },
    sourcePosition: Position.Bottom,
    targetPosition: Position.Top,
  },
  // Cache
  {
    id: "cache",
    type: "custom",
    position: { x: 100, y: 450 },
    data: { label: "CACHE", icon: "Zap", color: "accent", metrics: "Redis" },
    sourcePosition: Position.Bottom,
    targetPosition: Position.Top,
  },
  // Database
  {
    id: "primary-db",
    type: "custom",
    position: { x: 300, y: 450 },
    data: { label: "PRIMARY DB", icon: "Database", color: "accent", metrics: "PostgreSQL" },
    sourcePosition: Position.Bottom,
    targetPosition: Position.Top,
  },
  // Message Queue
  {
    id: "queue",
    type: "custom",
    position: { x: 500, y: 450 },
    data: { label: "QUEUE", icon: "Layers", color: "primary", metrics: "Kafka" },
    sourcePosition: Position.Bottom,
    targetPosition: Position.Top,
  },
  // Replica
  {
    id: "replica-db",
    type: "custom",
    position: { x: 300, y: 540 },
    data: { label: "READ REPLICA", icon: "Database", color: "primary", metrics: "Replication" },
    sourcePosition: Position.Bottom,
    targetPosition: Position.Top,
  },
];

const initialEdges: Edge[] = [
  // Main flow
  {
    id: "e-client-cdn",
    source: "client",
    target: "cdn",
    sourceHandle: null,
    targetHandle: null,
    animated: true,
    style: { stroke: "hsl(var(--primary))", strokeWidth: 2 },
    markerEnd: { type: MarkerType.ArrowClosed, color: "hsl(var(--primary))" },
  },
  {
    id: "e-cdn-lb",
    source: "cdn",
    target: "loadbalancer",
    sourceHandle: null,
    targetHandle: null,
    animated: true,
    style: { stroke: "hsl(var(--primary))", strokeWidth: 2 },
    markerEnd: { type: MarkerType.ArrowClosed, color: "hsl(var(--primary))" },
  },
  {
    id: "e-lb-gateway",
    source: "loadbalancer",
    target: "gateway",
    sourceHandle: null,
    targetHandle: null,
    animated: true,
    style: { stroke: "hsl(var(--accent))", strokeWidth: 2 },
    markerEnd: { type: MarkerType.ArrowClosed, color: "hsl(var(--accent))" },
  },
  // Gateway to services
  {
    id: "e-gateway-auth",
    source: "gateway",
    target: "auth-service",
    sourceHandle: null,
    targetHandle: null,
    animated: true,
    style: { stroke: "hsl(var(--primary))", strokeWidth: 2 },
    markerEnd: { type: MarkerType.ArrowClosed, color: "hsl(var(--primary))" },
  },
  {
    id: "e-gateway-api",
    source: "gateway",
    target: "api-service",
    sourceHandle: null,
    targetHandle: null,
    animated: true,
    style: { stroke: "hsl(var(--primary))", strokeWidth: 2 },
    markerEnd: { type: MarkerType.ArrowClosed, color: "hsl(var(--primary))" },
  },
  {
    id: "e-gateway-worker",
    source: "gateway",
    target: "worker-service",
    sourceHandle: null,
    targetHandle: null,
    animated: true,
    style: { stroke: "hsl(var(--primary))", strokeWidth: 2 },
    markerEnd: { type: MarkerType.ArrowClosed, color: "hsl(var(--primary))" },
  },
  // Services to data layer
  {
    id: "e-api-cache",
    source: "api-service",
    target: "cache",
    sourceHandle: null,
    targetHandle: null,
    animated: true,
    style: { stroke: "hsl(var(--accent))", strokeWidth: 2 },
    markerEnd: { type: MarkerType.ArrowClosed, color: "hsl(var(--accent))" },
  },
  {
    id: "e-api-db",
    source: "api-service",
    target: "primary-db",
    sourceHandle: null,
    targetHandle: null,
    animated: true,
    style: { stroke: "hsl(var(--accent))", strokeWidth: 2 },
    markerEnd: { type: MarkerType.ArrowClosed, color: "hsl(var(--accent))" },
  },
  {
    id: "e-worker-queue",
    source: "worker-service",
    target: "queue",
    sourceHandle: null,
    targetHandle: null,
    animated: true,
    style: { stroke: "hsl(var(--primary))", strokeWidth: 2 },
    markerEnd: { type: MarkerType.ArrowClosed, color: "hsl(var(--primary))" },
  },
  {
    id: "e-db-replica",
    source: "primary-db",
    target: "replica-db",
    sourceHandle: null,
    targetHandle: null,
    animated: true,
    style: { stroke: "hsl(var(--primary))", strokeWidth: 2, strokeDasharray: "5,5" },
    markerEnd: { type: MarkerType.ArrowClosed, color: "hsl(var(--primary))" },
    label: "replication",
    labelStyle: { fill: "hsl(var(--muted-foreground))", fontSize: 10 },
  },
];

export default function ArchitectureFlow() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="w-full h-[600px] border-4 border-primary bg-card/50 backdrop-blur-sm"
    >
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodeTypes={nodeTypes}
        fitView
        attributionPosition="bottom-left"
        proOptions={{ hideAttribution: true }}
        className="bg-transparent"
      >
        <Background color="hsl(var(--primary))" gap={20} size={1} style={{ opacity: 0.1 }} />
        <Controls className="border-2 border-primary bg-card [&>button]:bg-card [&>button]:border-primary [&>button]:text-primary [&>button:hover]:bg-primary/20" />
        <MiniMap
          nodeColor={(node) => {
            switch (node.data?.color) {
              case "accent":
                return "hsl(var(--accent))";
              case "destructive":
                return "hsl(var(--destructive))";
              default:
                return "hsl(var(--primary))";
            }
          }}
          maskColor="hsl(var(--background) / 0.8)"
          className="border-2 border-primary bg-card/80"
        />
      </ReactFlow>
    </motion.div>
  );
}
