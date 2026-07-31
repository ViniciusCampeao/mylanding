import { l, type Content } from "./types";

export const content: Content = {
  meta: {
    name: "Vinícius Campeão",
    tagline: l(
      "Desenvolvedor Full Stack • Infraestrutura • DevOps",
      "Full Stack Developer • Infrastructure • DevOps"
    ),
    bio: l(
      "Estudante de ADS na UTFPR com experiência prática em desenvolvimento full stack, infraestrutura e automação. Mantenho operação própria com VPS, Docker e Cloudflare — e conduzo pesquisa em visão computacional aplicada à bioinformática.",
      "ADS student at UTFPR with hands-on experience in full stack development, infrastructure, and automation. I run my own operation with VPS, Docker, and Cloudflare — and conduct research in computer vision applied to bioinformatics."
    ),
    githubUsername: "ViniciusCampeao",
    linkedinUrl: "https://linkedin.com/in/vinicius-campeao", /* EDIT: seu LinkedIn real */
    whatsapp: "5514998077628",
    email: "vinicius.2022@alunos.utfpr.edu.br",
    location: "Cornélio Procópio, PR — Brasil",
    university: l("UTFPR Cornélio Procópio", "UTFPR Cornélio Procópio"),
  },

  nav: {
    about: l("Sobre", "About"),
    skills: l("Skills", "Skills"),
    portfolio: l("Projetos", "Projects"),
    infra: l("Infraestrutura", "Infrastructure"),
    contact: l("Contato", "Contact"),
  },

  hero: {
    greeting: l("Olá, eu sou", "Hi, I'm"),
    scrollHint: l("Role para explorar", "Scroll to explore"),
  },

  about: {
    manifesto: l(
      "Acredito que bom software é aquele que chega ao usuário — por isso não separo código de infraestrutura. Codifico, contenerizo, faço o deploy. Do zero ao ar.",
      "I believe great software is what actually reaches the user — so I don't separate code from infrastructure. I write it, containerize it, ship it. From zero to live."
    ),
    researchTitle: l("Iniciação Científica", "Undergraduate Research"),
    researchDescription: l(
      "Contagem automática de colônias bacterianas em placas de petri com Python, OpenCV, Raspberry Pi e modelagem 3D — aplicando visão computacional à bioinformática.",
      "Automatic counting of bacterial colonies in petri dishes using Python, OpenCV, Raspberry Pi, and 3D modeling — applying computer vision to bioinformatics."
    ),
    downloadCv: l("Baixar CV", "Download CV"),
  },

  skills: {
    sectionTitle: l("Stack & Competências", "Stack & Skills"),
    groups: [
      {
        id: "frontend",
        label: l("Frontend", "Frontend"),
        items: [
          { name: "TypeScript", level: 3 },
          { name: "React", level: 3 },
          { name: "Next.js", level: 2 },
          { name: "Tailwind CSS", level: 3 },
          { name: "TanStack", level: 2 },
        ],
      },
      {
        id: "backend",
        label: l("Backend", "Backend"),
        items: [
          { name: "Python", level: 3 },
          { name: "NestJS", level: 2 },
          { name: "Node.js", level: 2 },
          { name: "PostgreSQL", level: 2 },
          { name: "Redis", level: 2 },
          { name: "Prisma", level: 2 },
        ],
      },
      {
        id: "infra",
        label: l("Infra & DevOps", "Infra & DevOps"),
        items: [
          { name: "Docker", level: 3 },
          { name: "Linux / VPS", level: 3 },
          { name: "Cloudflare Tunnel", level: 3 },
          { name: "Tailscale", level: 2 },
          { name: "systemd", level: 2 },
          { name: "AWS", level: 2 },
          { name: "Git / GitHub", level: 3 },
        ],
      },
      {
        id: "research",
        label: l("Pesquisa & Visão Comp.", "Research & Computer Vision"),
        items: [
          { name: "OpenCV", level: 2 },
          { name: "Raspberry Pi", level: 2 },
          { name: "Python (CV)", level: 2 },
          { name: "N8N", level: 2 },
        ],
      },
    ],
  },

  portfolio: {
    sectionTitle: l("Projetos", "Projects"),
    sectionSubtitle: l(
      "Aplicações reais, para clientes reais, rodando na minha própria infraestrutura.",
      "Real applications, for real clients, running on my own infrastructure."
    ),
    viewProject: l("Ver projeto", "View project"),
    techStack: l("Stack", "Stack"),
    close: l("Fechar", "Close"),
    projects: [
      {
        id: "recompra-farma",
        title: l("Recompra Farma", "Recompra Farma"),
        tagline: l("Lembretes automáticos via WhatsApp", "Automatic WhatsApp reminders"),
        description: l(
          "Sistema de lembretes automáticos de recompra para clientes de farmácias via WhatsApp. Integrado com Evolution API, processos assíncronos com Redis, agendamento e histórico em PostgreSQL.",
          "Automatic repurchase reminder system for pharmacy customers via WhatsApp. Integrated with Evolution API, async processing with Redis, scheduling and history in PostgreSQL."
        ),
        stack: ["NestJS", "Prisma", "PostgreSQL", "Redis", "Evolution API", "Docker Compose"],
        role: l("Arquitetura, backend, deploy", "Architecture, backend, deployment"),
        status: "production",
        highlight: true,
        port: 3333,
        color: "#4a7a4a",
      },
      {
        id: "mindrabar",
        title: l("Mindrabar", "Mindrabar"),
        tagline: l("Comanda digital para cliente real", "Digital ordering system for real client"),
        description: l(
          "Sistema completo de comanda digital e pedidos para restaurante. Frontend React + API Node containerizados, deploy em VPS via Cloudflare Tunnel — zero downtime.",
          "Complete digital tab and ordering system for a restaurant. Containerized React frontend + Node API, deployed on VPS via Cloudflare Tunnel — zero downtime."
        ),
        stack: ["React", "Node.js", "Docker Compose", "Cloudflare Tunnel", "PostgreSQL"],
        role: l("Full stack + infra + deploy", "Full stack + infra + deployment"),
        status: "production",
        highlight: true,
        port: 8003,
        color: "#5a3a6a",
      },
      {
        id: "shorts-pipeline",
        title: l("Shorts Pipeline", "Shorts Pipeline"),
        tagline: l("Automação de vídeos curtos com IA", "AI-powered short video automation"),
        description: l(
          "Pipeline para processamento e montagem automática de vídeos curtos. Orquestrado com N8N, processamento em Python com APIs externas, totalmente containerizado com Docker.",
          "Pipeline for automated processing and assembly of short videos. Orchestrated with N8N, processing in Python with external APIs, fully containerized with Docker."
        ),
        stack: ["Python", "N8N", "Docker", "APIs externas"],
        role: l("Arquitetura, automação, deploy", "Architecture, automation, deployment"),
        status: "active",
        highlight: true,
        color: "#7a6a2a",
      },
      {
        id: "carteira-app",
        title: l("Carteira App", "Carteira App"),
        tagline: l("App de carteira digital para clientes", "Digital wallet app for clients"),
        description: l(
          "Aplicação de carteira digital para gestão de clientes. Containerizada e em produção na VPS própria.",
          "Digital wallet application for client management. Containerized and running in production on my own VPS."
        ),
        stack: ["React", "Node.js", "Docker", "PostgreSQL"],
        role: l("Full stack + deploy", "Full stack + deployment"),
        status: "production",
        port: 8100,
        color: "#4a3a5a",
      },
      {
        id: "ytmp3",
        title: l("ytmp3", "ytmp3"),
        tagline: l("Conversor YouTube → MP3 self-hosted", "Self-hosted YouTube → MP3 converter"),
        description: l(
          "Serviço self-hosted de conversão de YouTube para MP3. Containerizado com autoheal para auto-recovery.",
          "Self-hosted YouTube to MP3 conversion service. Containerized with autoheal for auto-recovery."
        ),
        stack: ["Node.js", "Docker", "autoheal"],
        role: l("Deploy e manutenção", "Deployment and maintenance"),
        status: "active",
        port: 3005,
        color: "#3a5a4a",
      },
      {
        id: "monitoring",
        title: l("Stack de Monitoramento", "Monitoring Stack"),
        tagline: l("Observabilidade total da infraestrutura", "Full infrastructure observability"),
        description: l(
          "Stack completa: Grafana + Prometheus + cAdvisor + node-exporter + postgres-exporter + redis-exporter. Todos os serviços monitorados em tempo real.",
          "Complete stack: Grafana + Prometheus + cAdvisor + node-exporter + postgres-exporter + redis-exporter. All services monitored in real time."
        ),
        stack: ["Grafana", "Prometheus", "cAdvisor", "node-exporter", "Caddy"],
        role: l("Arquitetura e configuração", "Architecture and configuration"),
        status: "active",
        port: 3001,
        color: "#6a5a2a",
      },
    ],
  },

  infra: {
    sectionTitle: l("Infraestrutura", "Infrastructure"),
    sectionSubtitle: l(
      "Minha VPS, minha responsabilidade — do DNS ao banco de dados.",
      "My VPS, my responsibility — from DNS to the database."
    ),
    description: l(
      "Todos os projetos rodam em uma VPS própria (192.168.0.110), isolada por redes Docker, acessível via Cloudflare Tunnel. UFW + Fail2Ban + Tailscale garantem que só o necessário fica exposto.",
      "All projects run on my own VPS (192.168.0.110), isolated by Docker networks, accessible via Cloudflare Tunnel. UFW + Fail2Ban + Tailscale ensure only what's needed is exposed."
    ),
  },

  experience: {
    sectionTitle: l("Experiência", "Experience"),
    entries: [
      {
        id: "autonomo",
        company: "Autônomo",
        role: l("Desenvolvedor Full Stack & Infraestrutura", "Full Stack Developer & Infrastructure"),
        period: l("2023 – atual", "2023 – present"),
        description: [
          l(
            "Desenvolvimento de aplicações web e APIs para clientes reais, com deploy em VPS própria.",
            "Web application and API development for real clients, deployed on my own VPS."
          ),
          l(
            "Infraestrutura containerizada: Docker Compose, Cloudflare Tunnel, Tailscale, systemd.",
            "Containerized infrastructure: Docker Compose, Cloudflare Tunnel, Tailscale, systemd."
          ),
        ],
      },
      {
        id: "compass",
        company: "Compass UOL",
        role: l("Desenvolvedor Full Stack (estágio)", "Full Stack Developer (intern)"),
        period: l("6 meses", "6 months"),
        description: [
          l(
            "Desenvolvimento full stack com foco em AWS, metodologias ágeis e versionamento Git.",
            "Full stack development focused on AWS, agile methodologies, and Git versioning."
          ),
        ],
      },
      {
        id: "cartao-de-todos",
        company: "Cartão de Todos",
        role: l("TI e Desenvolvimento", "IT and Development"),
        period: l("1 ano", "1 year"),
        description: [
          l(
            "Responsável pela área de TI: suporte, infraestrutura e desenvolvimento full stack de sistemas internos.",
            "Responsible for the IT area: support, infrastructure, and full stack development of internal systems."
          ),
          l(
            "Criação de diversas automações em Python para processos operacionais.",
            "Created multiple Python automations for operational processes."
          ),
        ],
      },
      {
        id: "sicredi",
        company: "Sicredi",
        role: l("TI", "IT"),
        period: l("", ""),
        description: [
          l(
            "Configuração de roteadores, switches e endereçamento IP. Manutenção de máquinas e suporte a servidores.",
            "Router, switch configuration, and IP addressing. Machine maintenance and server support."
          ),
        ],
      },
    ],
  },

  contact: {
    sectionTitle: l("Contato", "Contact"),
    cta: l("Vamos conversar", "Let's talk"),
    whatsappMsg: l(
      "Olá Vinícius! Vi seu portfólio e gostaria de conversar.",
      "Hi Vinícius! I saw your portfolio and would like to talk."
    ),
    copyEmail: l("Copiar e-mail", "Copy email"),
    copied: l("Copiado!", "Copied!"),
    footer: l(
      "Hospedado na minha própria VPS, atrás de um Cloudflare Tunnel.",
      "Hosted on my own VPS, behind a Cloudflare Tunnel."
    ),
    builtWith: l(
      "Feito com React Three Fiber, GSAP e Motion",
      "Built with React Three Fiber, GSAP, and Motion"
    ),
  },
};
