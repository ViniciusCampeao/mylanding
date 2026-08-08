import { createContext, useCallback, useContext, useRef, useState } from "react";

/* ─────────────────────────────────────────────────────────────
   Ponte entre Skills e Portfolio: clicar numa skill "foca"
   o projeto vinculado (a seção de Projetos expande o card e
   rola até ele). O token garante que cliques repetidos no
   mesmo projeto disparem o efeito de novo.
   ───────────────────────────────────────────────────────────── */

interface ProjectLinkValue {
  focusedProjectId: string | null;
  focusToken: number;
  focusProject: (id: string) => void;
}

const ProjectLinkContext = createContext<ProjectLinkValue | null>(null);

export function ProjectLinkProvider({ children }: { children: React.ReactNode }) {
  const [focusedProjectId, setFocusedProjectId] = useState<string | null>(null);
  const [focusToken, setFocusToken] = useState(0);
  const tokenRef = useRef(0);

  const focusProject = useCallback((id: string) => {
    tokenRef.current += 1;
    setFocusedProjectId(id);
    setFocusToken(tokenRef.current);
  }, []);

  return (
    <ProjectLinkContext.Provider value={{ focusedProjectId, focusToken, focusProject }}>
      {children}
    </ProjectLinkContext.Provider>
  );
}

export function useProjectLink() {
  const ctx = useContext(ProjectLinkContext);
  if (!ctx) throw new Error("useProjectLink must be used within ProjectLinkProvider");
  return ctx;
}
