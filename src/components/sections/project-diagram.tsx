import { motion } from "motion/react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import type { ProjectDiagram as ProjectDiagramData } from "@/content/types";

/* ─────────────────────────────────────────────────────────────
   Diagrama de fluxo genérico, data-driven (layers + edges).
   Usado dentro do card expandido de um projeto para ilustrar
   sua arquitetura sem precisar de um componente SVG por projeto.
   ───────────────────────────────────────────────────────────── */

const W = 560;
const ROW_H = 82;
const PAD_TOP = 30;
const PAD_BOTTOM = 24;

interface PositionedNode {
  id: string;
  label: string;
  sublabel?: string;
  x: number;
  y: number;
  r: number;
  fontSize: number;
}

function layout(diagram: ProjectDiagramData): { nodes: PositionedNode[]; height: number } {
  const nodes: PositionedNode[] = [];

  diagram.layers.forEach((layer, li) => {
    const n = layer.length;
    const y = PAD_TOP + li * ROW_H;
    const r = Math.max(11, Math.min(19, (W / (n + 1)) * 0.32));
    const fontSize = Math.round(Math.max(8, Math.min(10, r * 0.6 + 3)));
    layer.forEach((node, ni) => {
      const x = (W / (n + 1)) * (ni + 1);
      nodes.push({ id: node.id, label: node.label, sublabel: node.sublabel, x, y, r, fontSize });
    });
  });

  const height = PAD_TOP + (diagram.layers.length - 1) * ROW_H + PAD_BOTTOM + 20;
  return { nodes, height };
}

export function ProjectDiagram({ diagram, color }: { diagram: ProjectDiagramData; color: string }) {
  const reduced = useReducedMotion();
  const { nodes, height } = layout(diagram);
  const byId = new Map(nodes.map((n) => [n.id, n]));

  return (
    <div
      className="relative overflow-hidden p-2 sm:p-4"
      style={{
        borderRadius: "6px",
        border: `1px solid ${color}25`,
        background: `radial-gradient(ellipse 80% 80% at 50% 20%, ${color}0c, rgb(5 8 8 / 0.4))`,
      }}
    >
      {/* overflow-x-auto + minWidth: em telas estreitas o diagrama rola
          horizontalmente em vez de encolher o texto até ficar ilegível. */}
      <div className="overflow-x-auto">
        <svg
          viewBox={`0 0 ${W} ${height}`}
          style={{ width: "100%", minWidth: W, maxHeight: 460, display: "block" }}
        >
          {/* Arestas */}
          {diagram.edges.map((e, i) => {
            const a = byId.get(e.from);
            const b = byId.get(e.to);
            if (!a || !b) return null;
            return (
              <motion.line
                key={`${e.from}-${e.to}`}
                x1={a.x}
                y1={a.y}
                x2={b.x}
                y2={b.y}
                stroke={color}
                strokeWidth={1.4}
                strokeOpacity={0.55}
                initial={reduced ? false : { pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{
                  duration: 0.5,
                  delay: reduced ? 0 : 0.15 + i * 0.05,
                  ease: [0.22, 1, 0.36, 1],
                }}
              />
            );
          })}

          {/* Nós */}
          {nodes.map((n, i) => (
            <motion.g
              key={n.id}
              initial={reduced ? false : { opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.4,
                delay: reduced ? 0 : i * 0.06,
                ease: [0.22, 1, 0.36, 1],
              }}
              style={{ transformOrigin: `${n.x}px ${n.y}px` }}
            >
              <circle
                cx={n.x}
                cy={n.y}
                r={n.r}
                fill={`${color}1e`}
                stroke={color}
                strokeWidth={1.4}
              />
              <circle cx={n.x} cy={n.y} r={n.r * 0.32} fill={`${color}80`} />
              <text
                x={n.x}
                y={n.y + n.r + 14}
                textAnchor="middle"
                fontSize={n.fontSize}
                fontFamily="JetBrains Mono, monospace"
                fill="#a9b7a3"
              >
                {n.label}
              </text>
              {n.sublabel && (
                <text
                  x={n.x}
                  y={n.y + n.r + 14 + n.fontSize + 2}
                  textAnchor="middle"
                  fontSize={n.fontSize - 1.5}
                  fontFamily="JetBrains Mono, monospace"
                  fill={color}
                  opacity={0.85}
                >
                  {n.sublabel}
                </text>
              )}
            </motion.g>
          ))}
        </svg>
      </div>
    </div>
  );
}
