import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const faqs = [
  {
    q: "Preciso entender de tecnologia pra usar?",
    a: "Não. A gente entrega tudo funcionando, te mostra como usar no dia a dia e fica perto pra ajudar. Quem entende de tecnologia é a Fluxo — você cuida do seu negócio.",
  },
  {
    q: "O atendimento automático não fica parecendo robô?",
    a: "A gente afina o tom de voz com você. As respostas seguem o jeito do seu negócio, com naturalidade, e o cliente sempre pode falar com um humano quando precisar.",
  },
  {
    q: "Posso cancelar quando quiser?",
    a: "Sim, sem fidelidade. A primeira semana é por nossa conta pra você sentir se faz sentido. Se quiser sair, é só avisar.",
  },
  {
    q: "Funciona com o WhatsApp que eu já uso?",
    a: "Sim, conseguimos integrar com o número que você já tem ou usar um número dedicado, conforme o que faz mais sentido pro seu negócio.",
  },
  {
    q: "Quanto tempo até estar tudo pronto?",
    a: "Depende do tamanho do projeto e das informações que você nos passa. A gente combina o prazo logo na primeira conversa, sem promessa furada.",
  },
  {
    q: "Vocês atendem qualquer cidade?",
    a: "Sim. Todo o atendimento e a entrega são feitos online, então estamos com você em qualquer lugar do Brasil.",
  },
];

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <ul className="space-y-3">
      {faqs.map((f, i) => {
        const isOpen = open === i;
        return (
          <li key={i} className="glass-card overflow-hidden">
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
            >
              <span className="font-display text-base font-medium sm:text-lg">{f.q}</span>
              <ChevronDown
                className={cn("h-5 w-5 shrink-0 text-muted-foreground transition-transform duration-500", isOpen && "rotate-180 text-primary")}
              />
            </button>
            <div
              className="grid transition-[grid-template-rows] duration-500 ease-out"
              style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
            >
              <div className="overflow-hidden">
                <p className="px-5 pb-5 text-muted-foreground">{f.a}</p>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
