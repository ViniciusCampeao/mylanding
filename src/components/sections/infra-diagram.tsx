import { useRef, useState, useCallback } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

const W = 760;
const H = 620;

const C = {
  wan: "#6a7a6a",
  cf: "#8a7630",
  caddy: "#5a9a5a",
  farma: "#5a9a5a",
  mind: "#7a52a0",
  monitor: "#9a8236",
  casamento: "#b34a6a",
  ytmp3: "#b85c2a",
  pg: "#3a6a8a",
  redis: "#a04a4a",
  security: "#4a9a4a",
  entry: "#6a7a6a",
  aws: "#b8792a",
  deploy: "#8a8a8a",
};

type NodeKey =
  | "link1"
  | "link2"
  | "rede"
  | "cf"
  | "caddy"
  | "security"
  | "farma"
  | "mind"
  | "monitor"
  | "casamento"
  | "ytmp3"
  | "pg"
  | "redis"
  | "aws"
  | "github"
  | "deploy";

interface NodeDef {
  x: number;
  y: number;
  label: string;
  sublabel?: string;
  color: string;
  size: number;
  planned?: boolean;
}

const nodes: Record<NodeKey, NodeDef> = {
  link1: { x: 220, y: 40, label: "ISP Principal", color: C.wan, size: 22 },
  link2: { x: 380, y: 40, label: "ISP Backup", color: C.wan, size: 22 },
  rede: { x: 300, y: 130, label: "REDE", color: C.entry, size: 32 },
  cf: { x: 300, y: 222, label: "Cloudflare", sublabel: "Tunnel", color: C.cf, size: 30 },
  security: {
    x: 590,
    y: 222,
    label: "UFW · Fail2Ban",
    sublabel: "Tailscale",
    color: C.security,
    size: 28,
  },
  github: {
    x: 680,
    y: 222,
    label: "GitHub",
    sublabel: "push · main",
    color: C.deploy,
    size: 22,
  },
  caddy: { x: 300, y: 316, label: "Caddy", sublabel: ":443", color: C.caddy, size: 30 },
  deploy: {
    x: 680,
    y: 316,
    label: "Auto Deploy",
    sublabel: "GitHub Actions",
    color: C.deploy,
    size: 22,
  },
  farma: { x: 120, y: 424, label: "recompra-farma", sublabel: ":3333", color: C.farma, size: 24 },
  mind: { x: 250, y: 424, label: "mindrabar", sublabel: ":8003", color: C.mind, size: 24 },
  monitor: { x: 380, y: 424, label: "grafana", sublabel: ":3001", color: C.monitor, size: 24 },
  casamento: {
    x: 510,
    y: 424,
    label: "casamento-bv",
    sublabel: ":8200",
    color: C.casamento,
    size: 24,
  },
  ytmp3: { x: 640, y: 424, label: "ytmp3", sublabel: ":3005", color: C.ytmp3, size: 24 },
  pg: { x: 120, y: 536, label: "postgres", sublabel: ":5432", color: C.pg, size: 22 },
  redis: { x: 250, y: 536, label: "redis", sublabel: ":6379", color: C.redis, size: 22 },
  aws: { x: 380, y: 536, label: "AWS", sublabel: "S3 Backup", color: C.aws, size: 22 },
};

interface EdgeDef {
  from: NodeKey;
  to: NodeKey;
  color: string;
  id: string;
  guard?: boolean;
  planned?: boolean;
}

const edges: EdgeDef[] = [
  { from: "link1", to: "rede", color: C.wan, id: "e-link1" },
  { from: "link2", to: "rede", color: C.wan, id: "e-link2", guard: true },
  { from: "rede", to: "cf", color: C.cf, id: "e-cf" },
  { from: "rede", to: "security", color: C.security, id: "e-sec", guard: true },
  { from: "cf", to: "caddy", color: C.caddy, id: "e-caddy" },
  { from: "security", to: "caddy", color: C.security, id: "e-sec2", guard: true },
  { from: "caddy", to: "farma", color: C.farma, id: "e-farma" },
  { from: "caddy", to: "mind", color: C.mind, id: "e-mind" },
  { from: "caddy", to: "monitor", color: C.monitor, id: "e-monitor" },
  { from: "caddy", to: "casamento", color: C.casamento, id: "e-casamento" },
  { from: "caddy", to: "ytmp3", color: C.ytmp3, id: "e-ytmp3" },
  { from: "farma", to: "pg", color: C.pg, id: "e-pg" },
  { from: "farma", to: "redis", color: C.redis, id: "e-redis" },
  { from: "pg", to: "aws", color: C.aws, id: "e-aws", guard: true },
  { from: "github", to: "deploy", color: C.deploy, id: "e-gh" },
  { from: "deploy", to: "caddy", color: C.deploy, id: "e-deploy" },
];

// Dado um nó selecionado, calcula quais nós e arestas fazem parte do
// caminho completo desde "rede" até ele (BFS upstream + downstream).
function getFullPath(selected: NodeKey): { nodeKeys: Set<NodeKey>; edgeIds: Set<string> } {
  const nodeKeys = new Set<NodeKey>([selected]);
  const edgeIds = new Set<string>();

  // Upstream: sobe de selected até a raiz seguindo arestas de entrada
  const visitUp = (key: NodeKey) => {
    for (const e of edges) {
      if (e.to === key && !edgeIds.has(e.id)) {
        edgeIds.add(e.id);
        nodeKeys.add(e.from);
        visitUp(e.from);
      }
    }
  };

  // Downstream: desce de selected até as folhas
  const visitDown = (key: NodeKey) => {
    for (const e of edges) {
      if (e.from === key && !edgeIds.has(e.id)) {
        edgeIds.add(e.id);
        nodeKeys.add(e.to);
        visitDown(e.to);
      }
    }
  };

  visitUp(selected);
  visitDown(selected);
  return { nodeKeys, edgeIds };
}

export function InfraDiagram() {
  const svgRef = useRef<SVGSVGElement>(null);
  const reduced = useReducedMotion();
  const [selected, setSelected] = useState<NodeKey | null>(null);

  const path = selected ? getFullPath(selected) : null;

  const isNodeActive = useCallback(
    (key: NodeKey) => !selected || path!.nodeKeys.has(key),
    [selected, path],
  );

  const isEdgeActive = useCallback(
    (id: string) => !selected || path!.edgeIds.has(id),
    [selected, path],
  );

  useGSAP(
    () => {
      if (!svgRef.current) return;
      const svg = svgRef.current;
      const allPaths = svg.querySelectorAll<SVGPathElement>(
        ".infra-path, .infra-guard, .infra-planned",
      );
      const nodeEls = svg.querySelectorAll<SVGGElement>(".infra-node");
      const packets = svg.querySelectorAll<SVGCircleElement>(".infra-packet");

      if (reduced) {
        gsap.set(allPaths, { drawSVG: "100%" });
        gsap.set(nodeEls, { opacity: 1, scale: 1 });
        gsap.set(packets, { opacity: 0 });
        return;
      }

      gsap.set(allPaths, { drawSVG: "0%" });
      gsap.set(nodeEls, { opacity: 0, scale: 0.4, transformOrigin: "center center" });
      gsap.set(packets, { opacity: 0 });

      const tl = gsap.timeline({
        scrollTrigger: { trigger: svg, start: "top 75%", once: true },
      });
      tl.to(nodeEls, { opacity: 1, scale: 1, duration: 0.5, stagger: 0.06, ease: "back.out(2)" });
      tl.to(
        allPaths,
        { drawSVG: "100%", duration: 0.7, stagger: 0.05, ease: "power2.inOut" },
        "-=0.3",
      );
      tl.to(packets, { opacity: 1, duration: 0.4 }, "-=0.2");

      // Pacotes fluindo continuamente (só em conexões já ativas, não planejadas)
      packets.forEach((packet) => {
        const pathId = packet.dataset.path!;
        const pathEl = svg.querySelector<SVGPathElement>(`#${pathId}`);
        if (!pathEl) return;
        const len = pathEl.getTotalLength();
        const proxy = { v: 0 };
        gsap.to(proxy, {
          v: 1,
          duration: 1.8 + Math.random() * 1.4,
          ease: "none",
          repeat: -1,
          delay: Math.random() * 2.5,
          onUpdate: () => {
            const pt = pathEl.getPointAtLength(proxy.v * len);
            packet.setAttribute("cx", String(pt.x));
            packet.setAttribute("cy", String(pt.y));
          },
        });
      });

      // Pulso suave nos núcleos (nós planejados não pulsam — ainda não estão "vivos")
      svg
        .querySelectorAll<SVGCircleElement>(".infra-core:not(.infra-core-planned)")
        .forEach((core, i) => {
          gsap.to(core, {
            opacity: 0.45,
            scale: 1.25,
            transformOrigin: "center center",
            duration: 1.6,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            delay: i * 0.15,
          });
        });
    },
    { scope: svgRef, dependencies: [reduced] },
  );

  return (
    <div
      className="relative overflow-x-auto p-2 sm:p-4"
      style={{
        borderRadius: "6px",
        border: "1px solid rgb(74 122 74 / 0.16)",
        background:
          "radial-gradient(ellipse 80% 80% at 40% 30%, rgb(74 122 74 / 0.05), rgb(5 8 8 / 0.4))",
      }}
    >
      <svg
        ref={svgRef}
        viewBox={`0 0 ${W} ${H}`}
        style={{ width: "100%", minWidth: W, maxHeight: 620, display: "block" }}
        onMouseLeave={() => setSelected(null)}
      >
        <defs>
          <filter id="node-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Arestas */}
        {edges.map((e) => {
          const a = nodes[e.from];
          const b = nodes[e.to];
          const d = `M ${a.x} ${a.y} L ${b.x} ${b.y}`;
          const active = isEdgeActive(e.id);
          return (
            <path
              key={e.id}
              id={e.id}
              className={e.guard ? "infra-guard" : e.planned ? "infra-planned" : "infra-path"}
              d={d}
              stroke={e.color}
              strokeWidth={selected && active ? 2.2 : 1.4}
              strokeOpacity={active ? (e.guard ? 0.5 : e.planned ? 0.35 : 0.75) : 0.08}
              fill="none"
              strokeDasharray={e.guard ? "5 6" : e.planned ? "2 5" : undefined}
              style={{ transition: "stroke-opacity 0.25s, stroke-width 0.25s" }}
            />
          );
        })}

        {/* Pacotes — só em conexões ativas de verdade, não planejadas */}
        {edges
          .filter((e) => !e.guard && !e.planned)
          .map((e) => {
            const active = isEdgeActive(e.id);
            return (
              <circle
                key={`pkt-${e.id}`}
                className="infra-packet"
                data-path={e.id}
                r={active && selected ? 3.5 : 2.4}
                fill={e.color}
                opacity={active ? 1 : 0.06}
                style={{ filter: "url(#node-glow)", transition: "opacity 0.25s" }}
              />
            );
          })}

        {/* Nós */}
        {(Object.keys(nodes) as NodeKey[]).map((key) => {
          const n = nodes[key];
          const active = isNodeActive(key);
          const isSel = selected === key;
          return (
            <g
              key={key}
              className="infra-node"
              style={{ cursor: "pointer", opacity: 0, transition: "opacity 0.25s" }}
              opacity={active ? (n.planned ? 0.6 : 1) : 0.1}
              onMouseEnter={() => setSelected(key)}
              onClick={() => setSelected((s) => (s === key ? null : key))}
            >
              {isSel && (
                <circle
                  cx={n.x}
                  cy={n.y}
                  r={n.size + 10}
                  fill="none"
                  stroke={n.color}
                  strokeWidth={1.2}
                  opacity={0.45}
                />
              )}
              <circle
                cx={n.x}
                cy={n.y}
                r={n.size}
                fill={`${n.color}1e`}
                stroke={n.color}
                strokeWidth={isSel ? 2.2 : 1.4}
                strokeDasharray={n.planned ? "3 4" : undefined}
                style={{
                  transition: "stroke-width 0.2s",
                  filter: isSel ? "url(#node-glow)" : undefined,
                }}
              />
              <circle
                className={`infra-core${n.planned ? " infra-core-planned" : ""}`}
                cx={n.x}
                cy={n.y}
                r={n.size * 0.32}
                fill={`${n.color}80`}
                opacity={n.planned ? 0.6 : 1}
              />
              <text
                x={n.x}
                y={n.y + n.size + 15}
                textAnchor="middle"
                fontSize={13}
                fontFamily="JetBrains Mono, monospace"
                fill={isSel ? "#e2ead9" : active ? "#a9b7a3" : "#4a5a4a"}
                style={{ transition: "fill 0.2s" }}
              >
                {n.label}
              </text>
              {n.sublabel && (
                <text
                  x={n.x}
                  y={n.y + n.size + 28}
                  textAnchor="middle"
                  fontSize={11}
                  fontFamily="JetBrains Mono, monospace"
                  fill={n.color}
                  opacity={active ? 0.9 : 0.2}
                  style={{ transition: "opacity 0.25s" }}
                >
                  {n.sublabel}
                </text>
              )}
            </g>
          );
        })}
      </svg>
    </div>
  );
}
