import { l, type Content } from "./types";

export const content: Content = {
  meta: {
    name: "Vinícius Campeão",
    tagline: l(
      "Desenvolvedor Full Stack • Infraestrutura • DevOps",
      "Full Stack Developer • Infrastructure • DevOps",
    ),
    bio: l(
      "Graduando em Análise e Desenvolvimento de Sistemas na UTFPR com experiência prática em desenvolvimento full stack, infraestrutura, redes e automação. Mantenho operação própria com VPS, Docker e Cloudflare — e conduzo pesquisa em visão computacional aplicada à bioinformática.",
      "Undergraduate in Systems Analysis and Development at UTFPR with practical experience in full stack development, infrastructure, networks, and automation. I maintain my own operation with VPS, Docker, and Cloudflare — and conduct research in computer vision applied to bioinformatics.",
    ),
    githubUsername: "ViniciusCampeao",
    linkedinUrl: "www.linkedin.com/in/vinicius-campeão-b35807260" /* EDIT: seu LinkedIn real */,
    whatsapp: "5514998077628",
    email: "viniciusfernandes643@gmail.com",
    university: l(
      "UTFPR - Universidade Tecnológica Federal do Paraná",
      "UTFPR - Federal University of Technology – Paraná",
    ),
  },

  nav: {
    about: l("Sobre", "About"),
    skills: l("Skills", "Skills"),
    portfolio: l("Projetos", "Projects"),
    infra: l("Infraestrutura", "Infrastructure"),
    contact: l("Contato", "Contact"),
  },

  hero: {
    scrollHint: l("Role para explorar", "Scroll to explore"),
  },

  about: {
    manifesto: l(
      "Sou desenvolvedor full-stack com foco em web. Trabalho com TypeScript, React, Next.js e Tailwind para criar soluções customizadas, automações e integrações robustas. Mas não fico preso ao navegador: sou sysadmin da minha infraestrutura (Linux, Docker, VPS), construo com ESP32 e Arduino, e mantenho um home lab para explorar redes, eletrônica e IoT. Esse conhecimento transversal me permite pensar em problemas além da interface e entregar sistemas completos",
      "I'm a full-stack developer with a focus on the web. I work with TypeScript, React, Next.js, and Tailwind to create custom solutions, automations, and robust integrations. But I don't stay confined to the browser: I'm a sysadmin of my own infrastructure (Linux, Docker, VPS), I build with ESP32 and Arduino, and I maintain a home lab to explore networks, electronics, and IoT. This cross-cutting knowledge allows me to think about problems beyond the interface and deliver complete systems.",
    ),
    researchTitle: l("Iniciação Científica", "Undergraduate Research"),
    researchDescription: l(
      "Contagem automática de colônias bacterianas em placas de petri com Python, OpenCV, Raspberry Pi e modelagem 3D — aplicando visão computacional à bioinformática.",
      "Automatic counting of bacterial colonies in petri dishes using Python, OpenCV, Raspberry Pi, and 3D modeling — applying computer vision to bioinformatics.",
    ),
    downloadCv: l("Baixar CV", "Download CV"),
  },

  skills: {
    sectionTitle: l("Stack & Competências", "Stack & Skills"),
    sectionSubtitle: l(
      "Passa o mouse pra ver onde eu uso cada uma. Clica pra ir direto no projeto.",
      "Hover to see where each one shows up. Click to jump straight to the project.",
    ),
    groups: [
      {
        id: "frontend",
        label: l("Frontend", "Frontend"),
        items: [
          { name: "TypeScript", projectId: "mindrabar" },
          { name: "React", projectId: "mindrabar" },
          { name: "Tailwind CSS", projectId: "mindrabar" },
        ],
      },
      {
        id: "backend",
        label: l("Backend", "Backend"),
        items: [
          { name: "Python", projectId: "cartao-de-todos" },
          { name: "NestJS", projectId: "recompra-farma" },
          { name: "PostgreSQL", projectId: "recompra-farma" },
        ],
      },
      {
        id: "infra",
        label: l("Infra & DevOps", "Infra & DevOps"),
        items: [
          { name: "Docker", projectId: "self-hosted-infrastructure" },
          { name: "Linux / VPS", projectId: "self-hosted-infrastructure" },
          { name: "Cloudflare Tunnel", projectId: "self-hosted-infrastructure" },
        ],
      },
      {
        id: "research",
        label: l("Pesquisa & Embarcados", "Research & Embedded"),
        items: [
          { name: "ESP32", projectId: "ai-home-assistant" },
          { name: "OpenCV", projectId: "colonias-bacterianas" },
          { name: "Raspberry Pi", projectId: "colonias-bacterianas" },
        ],
      },
    ],
  },

  portfolio: {
    sectionTitle: l("Projetos", "Projects"),
    sectionSubtitle: l(
      "Do circuito e firmware ao servidor e à interface — sistemas completos, por categoria.",
      "From circuit and firmware to server and interface — complete systems, by category.",
    ),
    viewProject: l("Ver projeto", "View project"),
    techStack: l("Stack", "Stack"),
    close: l("Fechar", "Close"),
    categories: [
      { id: "producao", number: "01", label: l("Produção", "Production") },
      { id: "pesquisa", number: "02", label: l("Pesquisa", "Research") },
      { id: "infraestrutura", number: "03", label: l("Infraestrutura", "Infrastructure") },
      { id: "embedded-iot", number: "04", label: l("Embedded & IoT", "Embedded & IoT") },
      { id: "robotica", number: "05", label: l("Robótica", "Robotics") },
      {
        id: "software",
        number: "06",
        label: l("Software & Produtividade", "Software & Productivity"),
      },
    ],
    projects: [
      /* ── 01 · Produção ──────────────────────────────────── */
      {
        id: "cartao-de-todos",
        icon: "Building2",
        title: l("Cartão de Todos", "Cartão de Todos"),
        tagline: l(
          "Plataforma interna & automação operacional",
          "Internal platform & operational automation",
        ),
        description: l(
          "Desenvolvimento e manutenção de sistemas internos utilizados por diferentes departamentos, incluindo áreas específicas por setor, vendas, notificações, comunicação por e-mail e integrações operacionais. Paralelamente, desenvolvi uma série de automações e bots para WhatsApp, Excel e processos administrativos, reduzindo tarefas manuais e transformando rotinas recorrentes em fluxos automatizados.",
          "Development and maintenance of internal systems used by different departments, including sector-specific areas, sales features, notifications, email communication, and operational integrations. In parallel, I built a range of automations and bots for WhatsApp, Excel, and administrative processes, cutting down manual work and turning recurring routines into automated flows.",
        ),
        stack: ["Python", "Full Stack", "E-mail", "WhatsApp Bot", "Excel/Planilhas", "Automação"],
        role: l(
          "Desenvolvimento full stack, automações e suporte de TI",
          "Full stack development, automation, and IT support",
        ),
        status: "archived",
        category: "producao",
        highlight: true,
        clientCode: true,
        color: "#9a7a2a",
      },
      {
        id: "recompra-farma",
        icon: "Pill",
        title: l("Recompra Farma", "Recompra Farma"),
        tagline: l("Automação de relacionamento via WhatsApp", "WhatsApp relationship automation"),
        description: l(
          "Sistema desenvolvido para automatizar o contato de farmácias com clientes no momento de recompra de medicamentos e produtos. A plataforma controla agendamentos, histórico e processamento assíncrono, integrando backend, PostgreSQL, Redis e Evolution API em uma arquitetura containerizada.",
          "System built to automate pharmacy-to-customer contact at the moment of medication and product repurchase. The platform handles scheduling, history, and asynchronous processing, integrating backend, PostgreSQL, Redis, and the Evolution API in a containerized architecture.",
        ),
        stack: ["NestJS", "Prisma", "PostgreSQL", "Redis", "Evolution API", "Docker Compose"],
        role: l("Arquitetura, backend, deploy", "Architecture, backend, deployment"),
        status: "active",
        category: "producao",
        highlight: true,
        clientCode: true,
        port: 3333,
        color: "#4a7a4a",
        diagram: {
          layers: [
            [{ id: "cliente", label: "Cliente" }],
            [{ id: "agendamento", label: "Agendamento" }],
            [{ id: "fila", label: "Fila", sublabel: "Redis" }],
            [{ id: "worker", label: "Worker" }],
            [{ id: "evolution", label: "Evolution API" }],
            [{ id: "whatsapp", label: "WhatsApp" }],
            [{ id: "historico", label: "Histórico", sublabel: "PostgreSQL" }],
          ],
          edges: [
            { from: "cliente", to: "agendamento" },
            { from: "agendamento", to: "fila" },
            { from: "fila", to: "worker" },
            { from: "worker", to: "evolution" },
            { from: "evolution", to: "whatsapp" },
            { from: "whatsapp", to: "historico" },
          ],
        },
      },
      {
        id: "mindrabar",
        icon: "UtensilsCrossed",
        title: l("Mindrabar", "Mindrabar"),
        tagline: l("Comanda digital para cliente real", "Digital ordering system for real client"),
        description: l(
          "Sistema completo de comanda digital e pedidos para restaurante. Frontend React + API Node containerizados, deploy em VPS via Cloudflare Tunnel — zero downtime.",
          "Complete digital tab and ordering system for a restaurant. Containerized React frontend + Node API, deployed on VPS via Cloudflare Tunnel — zero downtime.",
        ),
        stack: ["React", "Node.js", "Docker Compose", "Cloudflare Tunnel", "PostgreSQL"],
        role: l("Full stack + infra + deploy", "Full stack + infra + deployment"),
        status: "active",
        category: "producao",
        highlight: true,
        clientCode: true,
        port: 8003,
        color: "#5a3a6a",
      },
      {
        id: "shorts-pipeline",
        icon: "Clapperboard",
        title: l("Shorts Pipeline", "Shorts Pipeline"),
        tagline: l(
          "Canal de YouTube Shorts 100% automatizado",
          "Fully automated YouTube Shorts channel",
        ),
        description: l(
          "Pipeline orquestrado em N8N que roda 3x por dia sem intervenção manual: sorteia um tema de curiosidades sobre animais, gera o roteiro com um LLM, narra com voz sintética, busca clipes de banco de vídeos, monta o vídeo final numa API própria em Python/Flask + FFmpeg e publica automaticamente no YouTube.",
          "N8N-orchestrated pipeline that runs 3x a day with no manual step: picks a random animal-facts theme, writes the script with an LLM, narrates it with synthetic voice, sources stock footage, assembles the final video on my own Python/Flask + FFmpeg API, and publishes it to YouTube automatically.",
        ),
        stack: [
          "N8N",
          "LLM (Groq · Llama 3.3)",
          "ElevenLabs (TTS)",
          "Pixabay API",
          "Flask",
          "FFmpeg",
          "YouTube API",
          "Docker",
        ],
        role: l("Arquitetura, automação, deploy", "Architecture, automation, deployment"),
        status: "active",
        category: "producao",
        highlight: true,
        color: "#7a6a2a",
        diagram: {
          layers: [
            [{ id: "cron", label: "Cron", sublabel: "3x ao dia" }],
            [{ id: "tema", label: "Sorteia tema" }],
            [{ id: "roteiro", label: "Gera roteiro", sublabel: "LLM" }],
            [{ id: "processa", label: "Processa roteiro" }],
            [
              { id: "tts", label: "Narração", sublabel: "ElevenLabs" },
              { id: "clipes", label: "Banco de vídeos", sublabel: "Pixabay" },
            ],
            [{ id: "montagem", label: "Monta vídeo", sublabel: "Flask + FFmpeg" }],
            [{ id: "youtube", label: "YouTube", sublabel: "upload automático" }],
          ],
          edges: [
            { from: "cron", to: "tema" },
            { from: "tema", to: "roteiro" },
            { from: "roteiro", to: "processa" },
            { from: "processa", to: "tts" },
            { from: "processa", to: "clipes" },
            { from: "tts", to: "montagem" },
            { from: "clipes", to: "montagem" },
            { from: "montagem", to: "youtube" },
          ],
        },
      },

      /* ── 02 · Pesquisa ──────────────────────────────────── */
      {
        id: "colonias-bacterianas",
        icon: "Microscope",
        title: l("Contagem de Colônias Bacterianas", "Bacterial Colony Counting"),
        tagline: l(
          "Visão computacional aplicada à microbiologia",
          "Computer vision applied to microbiology",
        ),
        description: l(
          "Sistema de contagem automática de colônias bacterianas em placas de Petri, unindo processamento de imagem, hardware próprio (Raspberry Pi + câmera) e modelagem 3D da estrutura de captura. Parte da minha Iniciação Científica, orientada por Fabrício Lopes e coorientada por Ricardo Conde (ex-aluno do Fabrício e responsável pela pesquisa). O projeto já está em fase de patente, então os detalhes técnicos ficam restritos ao essencial.",
          "Automatic bacterial colony counting system for Petri dishes, combining image processing, custom hardware (Raspberry Pi + camera), and a 3D-modeled capture housing. Part of my undergraduate research, advised by Fabrício Lopes and co-advised by Ricardo Conde (a former student of Fabrício's and the researcher leading the project). It's already in the patent process, so technical details here stay high-level.",
        ),
        stack: ["Python", "OpenCV", "Raspberry Pi", "Modelagem 3D"],
        role: l("Pesquisa, visão computacional, hardware", "Research, computer vision, hardware"),
        status: "production",
        category: "pesquisa",
        highlight: true,
        restricted: true,
        color: "#2a8a7a",
      },

      /* ── 03 · Infraestrutura ─────────────────────────────── */
      {
        id: "self-hosted-infrastructure",
        icon: "Server",
        title: l("Self-Hosted Infrastructure", "Self-Hosted Infrastructure"),
        tagline: l(
          "Minha VPS, Docker, redes e observabilidade",
          "My VPS, Docker, networks, and observability",
        ),
        description: l(
          "Infraestrutura própria de ponta a ponta: VPS exposta via Cloudflare Tunnel, redes isoladas por Docker, acesso administrativo por Tailscale, hardening com UFW e Fail2Ban, e uma stack completa de monitoramento com Prometheus e Grafana cobrindo containers, banco de dados e serviços.",
          "End-to-end infrastructure I run myself: a VPS exposed through Cloudflare Tunnel, networks isolated with Docker, admin access over Tailscale, hardened with UFW and Fail2Ban, and a full Prometheus + Grafana monitoring stack covering containers, database, and services.",
        ),
        stack: [
          "Docker",
          "Docker Compose",
          "Cloudflare Tunnel",
          "Tailscale",
          "Linux",
          "systemd",
          "UFW",
          "Fail2Ban",
          "PostgreSQL",
          "Redis",
          "Grafana",
          "Prometheus",
        ],
        role: l(
          "Arquitetura, redes, segurança e observabilidade",
          "Architecture, networking, security, and observability",
        ),
        status: "active",
        category: "infraestrutura",
        highlight: true,
        color: "#3a6a9a",
        diagram: {
          layers: [
            [{ id: "internet", label: "Internet" }],
            [{ id: "cloudflare", label: "Cloudflare" }],
            [{ id: "tunnel", label: "Cloudflare Tunnel" }],
            [{ id: "vps", label: "VPS" }],
            [{ id: "docker", label: "Docker Networks" }],
            [
              { id: "apps", label: "Apps" },
              { id: "db", label: "Database" },
              { id: "redis-net", label: "Redis" },
            ],
            [{ id: "monitoring", label: "Monitoring", sublabel: "Prometheus / Grafana" }],
          ],
          edges: [
            { from: "internet", to: "cloudflare" },
            { from: "cloudflare", to: "tunnel" },
            { from: "tunnel", to: "vps" },
            { from: "vps", to: "docker" },
            { from: "docker", to: "apps" },
            { from: "docker", to: "db" },
            { from: "docker", to: "redis-net" },
            { from: "apps", to: "monitoring" },
            { from: "db", to: "monitoring" },
            { from: "redis-net", to: "monitoring" },
          ],
        },
      },
      {
        id: "cyd-monitor",
        icon: "Gauge",
        title: l("Infrastructure Monitor — CYD", "Infrastructure Monitor — CYD"),
        tagline: l(
          "Painel físico da infraestrutura em tempo real",
          "Real-time physical dashboard for my infrastructure",
        ),
        description: l(
          'Painel físico de 2,8" (ESP32 + CYD) que exibe em tempo real o estado da minha VPS — CPU, RAM, armazenamento, containers e health checks. Quando um serviço falha, a própria infraestrutura detecta o problema e o painel é atualizado: observabilidade física, não só uma tela bonita.',
          'A physical 2.8" panel (ESP32 + CYD) showing the real-time state of my VPS — CPU, RAM, storage, containers, and health checks. When a service fails, the infrastructure itself detects it and the panel updates: physical observability, not just a pretty screen.',
        ),
        stack: ["ESP32", 'CYD (2.8" TFT)', "Wi-Fi", "API REST", "Health Checks"],
        role: l(
          "Firmware, API e integração com a infraestrutura",
          "Firmware, API, and infrastructure integration",
        ),
        status: "active",
        category: "infraestrutura",
        color: "#4a7a9a",
        diagram: {
          layers: [
            [{ id: "vps2", label: "VPS" }],
            [
              { id: "cpu", label: "CPU" },
              { id: "ram", label: "RAM" },
              { id: "storage", label: "Armazenamento" },
              { id: "containers", label: "Containers" },
              { id: "health", label: "Health Checks" },
            ],
            [{ id: "api", label: "API / dados" }],
            [{ id: "wifi2", label: "Wi-Fi" }],
            [{ id: "esp32cyd", label: "ESP32 + CYD" }],
            [{ id: "display", label: 'Display 2.8"' }],
          ],
          edges: [
            { from: "vps2", to: "cpu" },
            { from: "vps2", to: "ram" },
            { from: "vps2", to: "storage" },
            { from: "vps2", to: "containers" },
            { from: "vps2", to: "health" },
            { from: "cpu", to: "api" },
            { from: "ram", to: "api" },
            { from: "storage", to: "api" },
            { from: "containers", to: "api" },
            { from: "health", to: "api" },
            { from: "api", to: "wifi2" },
            { from: "wifi2", to: "esp32cyd" },
            { from: "esp32cyd", to: "display" },
          ],
        },
      },
      {
        id: "nobreak",
        icon: "BatteryCharging",
        title: l("Nobreak Próprio", "Custom UPS"),
        tagline: l("Eletrônica aplicada à infraestrutura", "Electronics applied to infrastructure"),
        description: l(
          "Sistema de alimentação ininterrupta construído por mim para manter minha infraestrutura e equipamentos sensíveis operacionais durante quedas de energia. Envolveu dimensionamento da alimentação, gerenciamento de bateria, um inversor AC de onda senoidal pura e distribuição de energia com foco em estabilidade para os equipamentos eletrônicos.",
          "An uninterruptible power system I built to keep my infrastructure and sensitive equipment running through power outages. It involved power sizing, battery management, a pure sine wave AC inverter, and power distribution focused on stable output for the electronics.",
        ),
        stack: [
          "Eletrônica",
          "Inversor AC (onda senoidal pura)",
          "Gerenciamento de Bateria",
          "Conversão DC-DC",
        ],
        role: l(
          "Projeto eletrônico, dimensionamento e montagem",
          "Electronics design, sizing, and assembly",
        ),
        status: "active",
        category: "infraestrutura",
        color: "#9a4a3a",
      },
      {
        id: "monitoring",
        icon: "Activity",
        title: l("Stack de Monitoramento", "Monitoring Stack"),
        tagline: l("Observabilidade total da infraestrutura", "Full infrastructure observability"),
        description: l(
          "Stack completa: Grafana + Prometheus + cAdvisor + node-exporter + postgres-exporter + redis-exporter. Todos os serviços monitorados em tempo real.",
          "Complete stack: Grafana + Prometheus + cAdvisor + node-exporter + postgres-exporter + redis-exporter. All services monitored in real time.",
        ),
        stack: ["Grafana", "Prometheus", "cAdvisor", "node-exporter", "Caddy"],
        role: l("Arquitetura e configuração", "Architecture and configuration"),
        status: "active",
        category: "infraestrutura",
        port: 3001,
        color: "#6a5a2a",
      },
      {
        id: "ytmp3",
        icon: "Music",
        title: l("ytmp3", "ytmp3"),
        tagline: l("Conversor YouTube → MP3 self-hosted", "Self-hosted YouTube → MP3 converter"),
        description: l(
          "Serviço self-hosted de conversão de YouTube para MP3. Containerizado com autoheal para auto-recovery.",
          "Self-hosted YouTube to MP3 conversion service. Containerized with autoheal for auto-recovery.",
        ),
        stack: ["Node.js", "Docker", "autoheal"],
        role: l("Deploy e manutenção", "Deployment and maintenance"),
        status: "active",
        category: "infraestrutura",
        port: 3005,
        color: "#3a5a4a",
      },

      /* ── 04 · Embedded & IoT ─────────────────────────────── */
      {
        id: "ai-home-assistant",
        icon: "BrainCircuit",
        title: l("AI Home Assistant", "AI Home Assistant"),
        tagline: l(
          "IA própria + ESP32 como interface física",
          "Self-hosted AI + ESP32 as a physical interface",
        ),
        description: l(
          "Assistente pessoal baseado em IA rodando em servidor próprio, com um ESP32 servindo de interface de interação (microfone/I-O) e ponte para dispositivos IoT. O projeto explorou a comunicação entre hardware e serviços de software, processamento de comandos e automação de dispositivos conectados.",
          "AI-based personal assistant running on my own server, with an ESP32 acting as the interaction interface (microphone/IO) and bridge to IoT devices. The project explored communication between hardware and software services, command processing, and automation of connected devices.",
        ),
        stack: ["ESP32", "IA (self-hosted)", "Wi-Fi", "IoT"],
        role: l(
          "Firmware, integração com IA e automação",
          "Firmware, AI integration, and automation",
        ),
        status: "active",
        category: "embedded-iot",
        highlight: true,
        color: "#5a4a9a",
        diagram: {
          layers: [
            [{ id: "esp32-ai", label: "ESP32", sublabel: "Mic / I-O" }],
            [{ id: "wifi3", label: "Wi-Fi" }],
            [{ id: "servidor-ia", label: "Servidor IA" }],
            [{ id: "iot", label: "Dispositivos IoT" }],
          ],
          edges: [
            { from: "esp32-ai", to: "wifi3" },
            { from: "wifi3", to: "servidor-ia" },
            { from: "servidor-ia", to: "iot" },
          ],
        },
      },
      {
        id: "smart-farming",
        icon: "Sprout",
        title: l("Smart Farming", "Smart Farming"),
        tagline: l("Sensoriamento e automação de cultivo", "Crop sensing and automation"),
        description: l(
          "Sistema de monitoramento e automação de cultivo com sensores de pH, umidade e luminosidade conectados via ESP32 a um servidor central. Além do dashboard remoto, o sistema automatiza irrigação, controle de pH e adição de nutrientes. Desenvolvido em dupla, como coparticipação no TCC de uma colega graduanda em Agronomia — eu cuidando do hardware, firmware e servidor.",
          "Crop monitoring and automation system with pH, humidity, and light sensors connected via ESP32 to a central server. Besides the remote dashboard, the system automates irrigation, pH control, and nutrient dosing. Built in a pair, as a co-participation in the undergraduate thesis of a fellow Agronomy student — I handled the hardware, firmware, and server side.",
        ),
        stack: ["ESP32", "Sensores (pH/Umidade/Luz)", "Automação", "Dashboard"],
        role: l("Sensoriamento, automação e dashboard", "Sensing, automation, and dashboard"),
        status: "production",
        category: "embedded-iot",
        highlight: true,
        color: "#4a8a3a",
        diagram: {
          layers: [
            [{ id: "plantacao", label: "Plantação" }],
            [
              { id: "ph", label: "pH" },
              { id: "umidade", label: "Umidade" },
              { id: "luz", label: "Luz" },
            ],
            [{ id: "esp32-farm", label: "ESP32" }],
            [{ id: "wifi4", label: "Wi-Fi" }],
            [{ id: "servidor-farm", label: "Servidor" }],
            [
              { id: "dashboard", label: "Dashboard" },
              { id: "automacao", label: "Automação" },
            ],
            [
              { id: "irrigacao", label: "Irrigação" },
              { id: "phctrl", label: "pH" },
              { id: "nutrientes", label: "Nutrientes" },
            ],
          ],
          edges: [
            { from: "plantacao", to: "ph" },
            { from: "plantacao", to: "umidade" },
            { from: "plantacao", to: "luz" },
            { from: "ph", to: "esp32-farm" },
            { from: "umidade", to: "esp32-farm" },
            { from: "luz", to: "esp32-farm" },
            { from: "esp32-farm", to: "wifi4" },
            { from: "wifi4", to: "servidor-farm" },
            { from: "servidor-farm", to: "dashboard" },
            { from: "servidor-farm", to: "automacao" },
            { from: "automacao", to: "irrigacao" },
            { from: "automacao", to: "phctrl" },
            { from: "automacao", to: "nutrientes" },
          ],
        },
      },
      {
        id: "drone-lora",
        icon: "Radio",
        title: l("Drone com Telemetria LoRa", "LoRa Telemetry Drone"),
        tagline: l(
          "Comunicação de longo alcance e eletrônica embarcada",
          "Long-range comms and embedded electronics",
        ),
        description: l(
          "Drone experimental com sistema de comunicação baseado em LoRa, integrando eletrônica embarcada, microcontrolador, alimentação e sensores para transmissão de dados de telemetria entre o veículo e a estação em terra.",
          "Experimental drone with a LoRa-based communication system, integrating embedded electronics, a microcontroller, power, and sensors to transmit telemetry data between the vehicle and the ground station.",
        ),
        stack: ["LoRa", "Microcontrolador", "Telemetria", "Eletrônica embarcada"],
        role: l("Eletrônica embarcada e comunicação", "Embedded electronics and communications"),
        status: "production",
        category: "embedded-iot",
        color: "#9a5a2a",
      },
      {
        id: "esp32-home-lab",
        icon: "Cpu",
        title: l("ESP32 Home Lab", "ESP32 Home Lab"),
        tagline: l("Experimentos e automações residenciais", "Home automation experiments"),
        description: l(
          "Coleção de experimentos e automações residenciais com ESP32: sensores, displays, controle de dispositivos e integração com servidor próprio — o laboratório onde a maioria dos meus projetos de IoT nasceu.",
          "A collection of home automation experiments with ESP32: sensors, displays, device control, and integration with my own server — the lab where most of my IoT projects were born.",
        ),
        stack: ["ESP32", "IoT", "Sensores", "Automação residencial"],
        role: l("Firmware e automações residenciais", "Firmware and home automation"),
        status: "sporadic",
        category: "embedded-iot",
        color: "#3a8a8a",
      },
      {
        id: "nrfbox",
        icon: "Antenna",
        title: l("nRFBox — Pentest Lab", "nRFBox — Pentest Lab"),
        tagline: l(
          "Ferramenta de pentest laboratorial em ESP32",
          "ESP32-based lab pentesting tool",
        ),
        description: l(
          "Fork pessoal do nRFBox (projeto open-source original de cifertech, github.com/cifertech/nRFBox), com boa parte do código modificada por mim para meu uso. É uma ferramenta de pentest laboratorial baseada em ESP32 e nRF24, usada só em ambiente controlado — parte do meu interesse crescente em segurança ofensiva / hacking ético.",
          "Personal fork of nRFBox (original open-source project by cifertech, github.com/cifertech/nRFBox), with a large part of the code modified for my own use. It's a lab-only pentesting tool built on ESP32 and nRF24, used strictly in a controlled environment — part of my growing interest in offensive security / ethical hacking.",
        ),
        stack: ["ESP32", "nRF24", "OLED", "Firmware embarcado"],
        role: l("Modificação de firmware e hardware", "Firmware and hardware modification"),
        status: "production",
        category: "embedded-iot",
        color: "#8a3a6a",
      },

      /* ── 05 · Robótica ───────────────────────────────────── */
      {
        id: "robotica-obr",
        icon: "Bot",
        title: l("Robótica — SESI / OBR", "Robotics — SESI / OBR"),
        tagline: l("Robótica autônoma no ensino médio", "Autonomous robotics in high school"),
        description: l(
          "Durante o ensino médio, participei por anos da equipe de robótica do SESI, trabalhando na eletrônica e nos sistemas embarcados para a Olimpíada Brasileira de Robótica. Fui responsável pela montagem e integração da eletrônica de um robô autônomo capaz de seguir linhas, detectar e desviar de obstáculos e interpretar o percurso da arena — inclusive em provas de resgate, localizando e transportando vítimas simuladas dentro do circuito.",
          "In high school, I spent years on SESI's robotics team, working on the electronics and embedded systems for the Brazilian Robotics Olympiad (OBR). I was responsible for assembling and integrating the electronics of an autonomous robot able to follow lines, detect and avoid obstacles, and read the arena's course — including rescue events, where it located and carried simulated victims through the course.",
        ),
        stack: ["Eletrônica", "Sensores", "Motores", "Sistemas embarcados"],
        role: l("Montagem e integração de eletrônica", "Electronics assembly and integration"),
        status: "archived",
        category: "robotica",
        color: "#2a4a8a",
      },

      /* ── 06 · Software & Produtividade ──────────────────── */
      {
        id: "task-focus",
        icon: "ListChecks",
        title: l("Task Focus", "Task Focus"),
        tagline: l("Agenda adaptativa", "Adaptive task agenda"),
        description: l(
          "Aplicativo desenvolvido para organizar tarefas com foco em execução e prioridade. Envia lembretes recorrentes e destaca continuamente a tarefa mais urgente, reduzindo a necessidade de manter mentalmente as próximas etapas do dia. Construí a ferramenta para resolver uma dificuldade que eu mesmo enfrentava na organização das minhas tarefas.",
          "App built to organize tasks with a focus on execution and priority. It sends recurring reminders and continuously surfaces the most urgent task, cutting down the need to mentally track what's next. I built it to solve a difficulty I faced myself in organizing my own tasks.",
        ),
        stack: ["Android", "Notificações", "Priorização", "Agenda"],
        role: l("Full stack (app Android)", "Full stack (Android app)"),
        status: "active",
        category: "software",
        color: "#8a3a5a",
      },
      {
        id: "retro-gaming-cyd",
        icon: "Gamepad2",
        title: l("Retro Gaming — CYD", "Retro Gaming — CYD"),
        tagline: l("Console retrô num ESP32 de US$10", "A retro console on a $10 ESP32"),
        description: l(
          'Projeto experimental usando só um ESP32 com display CYD de 2,8" e cartão microSD para transformar o dispositivo em uma pequena plataforma portátil de jogos retrô — o desafio foi extrair o máximo de um hardware extremamente limitado.',
          'Experimental project using nothing but an ESP32 with a 2.8" CYD display and a microSD card to turn the device into a small portable retro gaming platform — the challenge was squeezing the most out of extremely limited hardware.',
        ),
        stack: ["ESP32", "CYD", "microSD", "Firmware"],
        role: l("Firmware e otimização de hardware", "Firmware and hardware optimization"),
        status: "archived",
        category: "software",
        color: "#6a3a8a",
      },
    ],
  },

  infra: {
    sectionTitle: l("Infraestrutura", "Infrastructure"),
    sectionSubtitle: l(
      "Minha VPS, minha responsabilidade — do DNS ao banco de dados.",
      "My VPS, my responsibility — from DNS to the database.",
    ),
    description: l(
      "Todos os projetos rodam em uma VPS própria (192.168.0.110), isolada por redes Docker, acessível via Cloudflare Tunnel. UFW + Fail2Ban + Tailscale garantem que só o necessário fica exposto. Backup externo do banco de dados na AWS e um segundo link de internet em failover garantem que a infraestrutura sobrevive a uma queda isolada.",
      "All projects run on my own VPS (192.168.0.110), isolated by Docker networks, accessible via Cloudflare Tunnel. UFW + Fail2Ban + Tailscale ensure only what's needed is exposed. An off-site database backup on AWS and a second failover internet link keep the infrastructure alive through an isolated outage.",
    ),
  },

  experience: {
    sectionTitle: l("Experiência", "Experience"),
    entries: [
      {
        id: "autonomo",
        company: "Autônomo",
        role: l(
          "Desenvolvedor Full Stack & Infraestrutura",
          "Full Stack Developer & Infrastructure",
        ),
        period: l("2023 – atual", "2023 – present"),
        description: [
          l(
            "Desenvolvimento de aplicações web e APIs para clientes reais, com deploy em VPS própria.",
            "Web application and API development for real clients, deployed on my own VPS.",
          ),
          l(
            "Infraestrutura containerizada: Docker Compose, Cloudflare Tunnel, Tailscale, systemd.",
            "Containerized infrastructure: Docker Compose, Cloudflare Tunnel, Tailscale, systemd.",
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
            "Full stack development focused on AWS, agile methodologies, and Git versioning.",
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
            "Responsible for the IT area: support, infrastructure, and full stack development of internal systems.",
          ),
          l(
            "Criação de diversas automações em Python para processos operacionais.",
            "Created multiple Python automations for operational processes.",
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
            "Router, switch configuration, and IP addressing. Machine maintenance and server support.",
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
      "Hi Vinícius! I saw your portfolio and would like to talk.",
    ),
    copyEmail: l("Copiar e-mail", "Copy email"),
    copied: l("Copiado!", "Copied!"),
    footer: l(
      "Hospedado na minha própria VPS, atrás de um Cloudflare Tunnel.",
      "Hosted on my own VPS, behind a Cloudflare Tunnel.",
    ),
    builtWith: l(
      "Feito com React Three Fiber, GSAP e Motion",
      "Built with React Three Fiber, GSAP, and Motion",
    ),
  },
};
