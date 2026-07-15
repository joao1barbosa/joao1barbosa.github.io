/**
 * Conteúdo do portfólio centralizado, tipado e bilíngue (en/pt).
 * Fonte de verdade do design: mockup "Portfolio Standalone".
 * Editar aqui é suficiente para atualizar as seções da landing page.
 */

export type Locale = 'en' | 'pt';

/** String localizada. Use com o hook useLocale(): `texto[locale]`. */
export type L = Record<Locale, string>;

export type WorkExperience = {
  company: string;
  role: L;
  /** Período já formatado, ex.: "Feb 2025 — Dec 2025". Datas ficam à direita. */
  period: string;
  /** Caminho do logo (em /static/img/work). Ausente → usa o monograma. */
  logo?: string;
  /** Iniciais exibidas quando não há logo (ou em caso de erro de carregamento). */
  monogram: string;
  description: L;
};

export type Project = {
  name: L;
  /** Ano fixo ("2026") ou um rótulo localizado para projetos em andamento. */
  period: string | L;
  description: L;
  tags: string[];
};

export type Highlight = {
  name: string;
  org: string;
  period: string;
  monogram: string;
  description: L;
  /** Tags localizadas (categorias), diferente das tags técnicas de Project. */
  tags: L[];
};

export type Education = {
  course: L;
  institution: string;
  /** Período já formatado, ex.: "2024 – 2027". */
  period: string;
  href: string;
};

/* ── CONFIG ────────────────────────────────────────────────────── */
export const config = {
  /** Liga/desliga a pill "Disponível para projetos" no Hero. */
  availableForProjects: false,
};

export const profile = {
  name: 'João',
  lastName: 'Barbosa',
  fullName: 'João Pedro Ribeiro Barbosa',
  subtitle: {
    en: 'software engineer · goiânia, br',
    pt: 'engenheiro de software · goiânia, br',
  } satisfies L,
  avatar: 'https://github.com/joao1barbosa.png',
  email: 'joao1barbosa@hotmail.com',
  company: {name: 'Payevo', href: 'https://payevo.io/'},
  socials: {
    github: 'https://github.com/joao1barbosa',
    linkedin: 'https://www.linkedin.com/in/joao1barbosa/',
    x: 'https://x.com/joao1barbosa_',
  },
} as const;

/** Pills estáticas do Hero (a de disponibilidade é controlada por config). */
export const pills: string[] = ['Next.js · Supabase · React Native'];

/* ── UI STRINGS (rótulos da interface) ─────────────────────────── */
export const ui = {
  available: {en: 'Available for projects', pt: 'Disponível para projetos'} satisfies L,
  sections: {
    about: {en: 'About', pt: 'Sobre'},
    work: {en: 'Work Experience', pt: 'Experiência'},
    skills: {en: 'Skills', pt: 'Habilidades'},
    projects: {en: 'Projects', pt: 'Projetos'},
    highlights: {en: 'Highlights & Engagements', pt: 'Destaques & Participações'},
    education: {en: 'Education', pt: 'Formação'},
    contact: {en: 'Contact', pt: 'Contato'},
  } satisfies Record<string, L>,
  dock: {
    home: {en: 'Home', pt: 'Início'},
    work: {en: 'Work', pt: 'Trabalho'},
    projects: {en: 'Projects', pt: 'Projetos'},
    education: {en: 'Education', pt: 'Formação'},
    contact: {en: 'Contact', pt: 'Contato'},
    blog: {en: 'Blog', pt: 'Blog'},
    notebook: {en: 'Notebook', pt: 'Notebook'},
    theme: {en: 'Theme', pt: 'Tema'},
    language: {en: 'Language', pt: 'Idioma'},
  } satisfies Record<string, L>,
};

export const workExperience: WorkExperience[] = [
  {
    company: 'Payevo',
    role: {en: 'Software Engineer', pt: 'Engenheiro de Software'},
    period: 'Dec 2025 — Now',
    logo: '/img/work/payevo.webp',
    monogram: 'P',
    description: {
      en:
        'Full Stack Software Engineer at a payment gateway transitioning into a fintech (Next.js, ' +
        'Supabase, TypeScript). I own the design and delivery of my tasks — critical refactoring of ' +
        'legacy modules, complex integrations with acquirers and checkouts, and auditing tools for ' +
        'transaction monitoring. I use AI code agents actively in implementation and refactoring, as a ' +
        'first layer of technical review, while the architectural decisions stay mine.',
      pt:
        'Engenheiro de Software Full Stack em um gateway de pagamentos evoluindo para uma fintech ' +
        '(Next.js, Supabase, TypeScript). Conduzo o design e a entrega das minhas tasks — refatorações ' +
        'críticas de módulos legados, integrações complexas com adquirentes e checkouts, e ferramentas ' +
        'de auditoria para monitoramento de transações. Uso agentes de código (IA) ativamente na ' +
        'implementação e refatoração, como primeira camada de revisão técnica — mas as decisões de ' +
        'arquitetura seguem minhas.',
    },
  },
  {
    company: 'BRISA & UFG',
    role: {en: 'Software Engineer', pt: 'Engenheiro de Software'},
    period: 'Jul 2025 — Dec 2025',
    logo: '/img/work/brisa.webp',
    monogram: 'BR',
    description: {
      en:
        'Backend developer in a high-impact technology residency, modernizing a maternal & child ' +
        'healthcare platform. I led the technical restructuring of a legacy system, introduced ' +
        'automated testing standards, and standardized containerized development environments that ' +
        'boosted team productivity and reliability. With limited access to in-person mentors, I used AI ' +
        'as a "virtual senior" to validate data modeling and architecture before implementing features.',
      pt:
        'Desenvolvedor backend em uma residência tecnológica de alto impacto, modernizando uma ' +
        'plataforma de saúde materno-infantil. Liderei a reestruturação técnica de um sistema legado, ' +
        'introduzi padrões de testes automatizados e padronizei ambientes de desenvolvimento ' +
        'containerizados que elevaram a produtividade e a confiabilidade do time. Com pouca ' +
        'disponibilidade de mentores presenciais, usei IA como um "sênior virtual" para validar ' +
        'modelagem de dados e arquitetura antes de implementar novas features.',
    },
  },
  {
    company: 'Prodata',
    role: {en: 'IT Infrastructure Support', pt: 'Suporte de Infraestrutura de TI'},
    period: 'Nov 2024 — Jul 2025',
    logo: '/img/work/prodata.webp',
    monogram: 'PD',
    description: {
      en:
        'Infrastructure role ensuring high availability and stability for public-management systems ' +
        'across on-premise and cloud (AWS) environments — proactive monitoring of critical services, ' +
        'incident response, and automation of update routines on Linux servers. I used LLMs to resolve ' +
        'infra and Linux questions quickly and to structure complex problems before taking them to ' +
        'technical leadership, saving the team time.',
      pt:
        'Função de infraestrutura garantindo alta disponibilidade e estabilidade para sistemas de ' +
        'gestão pública em ambientes on-premise e cloud (AWS) — monitoramento proativo de serviços ' +
        'críticos, resposta a incidentes e automação de rotinas de atualização em servidores Linux. ' +
        'Usei LLMs para sanar dúvidas de infra e Linux rapidamente e estruturar problemas complexos ' +
        'antes de levá-los à liderança técnica, otimizando o tempo do time.',
    },
  },
  {
    company: 'Global Informática',
    role: {en: 'Sales Associate', pt: 'Consultor de Vendas'},
    period: 'Aug 2023 — Feb 2024',
    logo: '/img/work/global.webp',
    monogram: 'GI',
    description: {
      en:
        'Experience in managing customer relationships and translating business needs into technical ' +
        'solutions. Developed communication and negotiation skills that facilitate requirements ' +
        'gathering and direct interface with stakeholders.',
      pt:
        'Experiência na gestão do relacionamento com clientes e na tradução de necessidades de negócio ' +
        'em soluções técnicas. Desenvolvi habilidades de comunicação e negociação que facilitam o ' +
        'levantamento de requisitos e a interface direta com stakeholders.',
    },
  },
  {
    company: 'Unitech Informática',
    role: {
      en: 'Computer Maintenance Technician',
      pt: 'Técnico em Manutenção de Computadores',
    },
    period: 'Aug 2020 — Feb 2021',
    logo: '/img/work/unitech.webp',
    monogram: 'U',
    description: {
      en:
        'Focused on critical diagnostics and resolution of hardware and software failures. Provided a ' +
        'solid understanding of computer architecture and the physical processing layer — fundamental ' +
        'skills for writing performant code.',
      pt:
        'Foco em diagnósticos críticos e na resolução de falhas de hardware e software. Proporcionou um ' +
        'entendimento sólido de arquitetura de computadores e da camada física de processamento — ' +
        'habilidades fundamentais para escrever código performático.',
    },
  },
];

// Ordem: o homelab é sempre o primeiro (projeto vivo, período "em andamento");
// os demais seguem do mais recente para o mais antigo. Ver runbook em
// control-plane: runbooks/portfolio-landing-content.md.
export const projects: Project[] = [
  {
    name: {
      en: 'Self-Hosted Infrastructure Lab',
      pt: 'Laboratório de Infraestrutura Self-Hosted',
    },
    period: {en: 'Ongoing', pt: 'Em andamento'},
    description: {
      en:
        'Personal containerized infrastructure used as an R&D environment for platform and DevOps ' +
        'practices — observability, automated updates, and zero-trust service exposure without open ' +
        'ports. Currently being rebuilt on Proxmox VE to enforce a real platform-vs-workload separation.',
      pt:
        'Infraestrutura pessoal containerizada usada como ambiente de R&D para práticas de plataforma ' +
        'e DevOps — observabilidade, atualizações automatizadas e exposição de serviços zero-trust sem ' +
        'portas abertas. Em reconstrução sobre Proxmox VE para impor uma separação real entre ' +
        'plataforma e workload.',
    },
    tags: ['Proxmox', 'Docker', 'Traefik', 'Prometheus', 'Grafana', 'Tailscale', 'Linux'],
  },
  {
    name: {en: 'FX Remittance Ledger', pt: 'Livro-Razão de Remessas Cambiais'},
    period: '2026',
    description: {
      en:
        'An event-sourced vertical slice of an FX remittance pipeline (BRL → USD over crypto rails), ' +
        'built as a take-home: a single FxOperation aggregate moves through six asynchronous steps — ' +
        'quote, deposit, compliance, conversion, settlement, reconcile — each emitting an immutable ' +
        'fact. Money is always integer cents, webhooks are idempotent at the aggregate, and the ledger ' +
        'is a double-entry projection proven by a Pest suite of business scenarios.',
      pt:
        'Uma fatia vertical event-sourced de um pipeline de remessa cambial (BRL → USD sobre trilhos ' +
        'de cripto), feita como desafio técnico: um único agregado FxOperation percorre seis passos ' +
        'assíncronos — cotação, depósito, compliance, conversão, liquidação, reconciliação — cada um ' +
        'emitindo um fato imutável. Dinheiro é sempre centavos inteiros, webhooks são idempotentes no ' +
        'agregado e o ledger é uma projeção double-entry provada por uma suíte Pest de cenários de negócio.',
    },
    tags: ['PHP', 'Laravel', 'Event Sourcing', 'PostgreSQL', 'Pest', 'Docker'],
  },
  {
    name: {en: 'PantryChef', pt: 'PantryChef'},
    period: '2026',
    description: {
      en:
        'A recipe API built with FastAPI: search recipes by the ingredients you have, and when nothing ' +
        'matches, one is generated by AI and persisted automatically. Layered architecture with JWT ' +
        'auth, an isolated test suite, and the AI integration behind a single testable seam — written ' +
        'spec-first, then implemented with AI assistance.',
      pt:
        'Uma API de receitas em FastAPI: busca por ingredientes que você tem em casa e, quando nada ' +
        'corresponde, uma receita é gerada por IA e persistida automaticamente. Arquitetura em camadas ' +
        'com autenticação JWT, suíte de testes isolada e a integração de IA atrás de uma fronteira ' +
        'única e testável — feita spec-first e implementada com apoio de IA.',
    },
    tags: ['Python', 'FastAPI', 'PostgreSQL', 'SQLAlchemy', 'JWT', 'Docker', 'AI'],
  },
  {
    name: {
      en: 'Multi-User Chat (Client/Server)',
      pt: 'Chat Multiusuário (Cliente/Servidor)',
    },
    period: '2026',
    description: {
      en:
        'A real-time multi-user chat over TLS 1.3 TCP sockets, with a custom binary-header + JSON ' +
        'protocol. A Java multi-module client/server where the server runs one thread per client and ' +
        'broadcasts to everyone connected.',
      pt:
        'Um chat multiusuário em tempo real sobre sockets TCP com TLS 1.3, com protocolo próprio de ' +
        'cabeçalho binário + payload JSON. Um cliente/servidor Java multi-módulo onde o servidor roda ' +
        'uma thread por cliente e faz broadcast para todos os conectados.',
    },
    tags: ['Java', 'Maven', 'TLS', 'Sockets', 'Concurrency'],
  },
  {
    name: {
      en: 'Micro Wallet — Async Transactions',
      pt: 'Micro Wallet — Transações Assíncronas',
    },
    period: '2025',
    description: {
      en:
        'A learning project on asynchronous money transfers: a Lumen/PHP API that accepts a transfer ' +
        '(202/pending) for a queue-based worker to settle later, with money handled in integer cents, ' +
        'a PHPUnit test suite, and RabbitMQ in the stack.',
      pt:
        'Um projeto de estudo sobre transferências assíncronas: uma API Lumen/PHP que aceita a ' +
        'transferência (202/pending) para um worker de fila liquidar depois, com valores em centavos, ' +
        'suíte de testes PHPUnit e RabbitMQ na stack.',
    },
    tags: ['PHP', 'Lumen', 'RabbitMQ', 'MySQL', 'PHPUnit'],
  },
  {
    name: {en: 'CSV Operator Distribution', pt: 'CSV Operator Distribution'},
    period: '2024',
    description: {
      en:
        'A fullstack technical challenge: bulk-register clients from a CSV upload and distribute them ' +
        'across operators, with CSV import/export. A NestJS API with unit tests per layer (services, ' +
        'controllers, validators) behind a Next.js frontend — TypeScript end to end.',
      pt:
        'Um desafio técnico fullstack: cadastro em massa de clientes a partir de um CSV, distribuídos ' +
        'entre operadores, com import/export de CSV. Uma API NestJS com testes unitários por camada ' +
        '(services, controllers, validators) e um frontend Next.js — TypeScript de ponta a ponta.',
    },
    tags: ['NestJS', 'Prisma', 'Next.js', 'TypeScript', 'Jest', 'Docker'],
  },
  {
    name: {
      en: 'Clients & Cards Manager',
      pt: 'Gerenciador de Clientes e Cartões',
    },
    period: '2024',
    description: {
      en:
        'A fullstack technical challenge to manage clients and their credit cards through a structured ' +
        'REST API and a relational data model. Focused on type safety, schema validation, and modern ' +
        'frontend practices.',
      pt:
        'Um desafio técnico fullstack para gerenciar clientes e seus cartões de crédito por meio de uma ' +
        'API REST estruturada e um modelo de dados relacional. Foco em type safety, validação de schema ' +
        'e práticas modernas de frontend.',
    },
    tags: ['Next.js', 'TypeScript', 'Laravel', 'MySQL', 'React Query', 'Zod'],
  },
];

export const skills: string[] = [
  'React',
  'React Native',
  'Next.js',
  'Node.js',
  'NestJS',
  'TypeScript',
  'Python',
  'FastAPI',
  'PHP',
  'Laravel',
  'Supabase',
  'PostgreSQL',
  'Docker',
  'Linux',
  'AWS',
  'Prometheus',
  'Git',
];

export const highlights: Highlight[] = [
  {
    name: 'Campus Mobile',
    org: 'Instituto Claro',
    period: '2025',
    monogram: 'CM',
    description: {
      en:
        "Participation in Brazil's leading mobile innovation program, promoted by Instituto Claro. " +
        'Development of technology solutions with social impact, collaborating with multidisciplinary ' +
        'teams in a high technical and creative-demand environment.',
      pt:
        'Participação no principal programa de inovação mobile do Brasil, promovido pelo Instituto ' +
        'Claro. Desenvolvimento de soluções tecnológicas com impacto social, em colaboração com times ' +
        'multidisciplinares em um ambiente de alta exigência técnica e criativa.',
    },
    tags: [
      {en: 'Innovation', pt: 'Inovação'},
      {en: 'Mobile', pt: 'Mobile'},
    ],
  },
  {
    name: 'Breaking Tech',
    org: 'Academic Group — UNIGOIÁS',
    period: '2024 – Present',
    monogram: 'BT',
    description: {
      en:
        'Active member of Breaking Tech, an academic group with professional-level output under faculty ' +
        'supervision. The group develops real software projects, integrating academic knowledge with ' +
        'market practices — prototyping, code review, and professional-quality deliverables.',
      pt:
        'Membro ativo do Breaking Tech, grupo acadêmico com entregas em nível profissional sob ' +
        'supervisão docente. O grupo desenvolve projetos de software reais, integrando conhecimento ' +
        'acadêmico com práticas de mercado — prototipação, code review e entregas de qualidade ' +
        'profissional.',
    },
    tags: [
      {en: 'Academic', pt: 'Acadêmico'},
      {en: 'Open Source', pt: 'Open Source'},
    ],
  },
  {
    name: 'Campus Party Goiás',
    org: 'Partner Community',
    period: '2024 – 2025',
    monogram: 'CP',
    description: {
      en:
        "Participated as a partner community representative at Campus Party Goiás, one of the world's " +
        'largest technology and innovation festivals. Networking with industry leaders and immersion in ' +
        'trends across technology, entrepreneurship, and digital culture.',
      pt:
        'Participação como representante de comunidade parceira no Campus Party Goiás, um dos maiores ' +
        'festivais de tecnologia e inovação do mundo. Networking com líderes da indústria e imersão em ' +
        'tendências de tecnologia, empreendedorismo e cultura digital.',
    },
    tags: [
      {en: 'Community', pt: 'Comunidade'},
      {en: 'Tech Festival', pt: 'Festival Tech'},
    ],
  },
];

export const education: Education[] = [
  {
    course: {en: 'Software Engineering', pt: 'Engenharia de Software'},
    institution: 'UNIGOIÁS',
    period: '2024 – 2027',
    href: 'https://unigoias.com.br/',
  },
  {
    course: {en: 'Computer Technician', pt: 'Técnico em Informática'},
    institution: 'IFMA',
    period: '2016 – 2018',
    href: 'https://imperatriz.ifma.edu.br/',
  },
];
