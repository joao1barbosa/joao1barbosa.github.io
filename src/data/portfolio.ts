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
  name: string;
  period: string;
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
  availableForProjects: true,
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
        'FullStack Software Engineer at an expanding payment gateway transitioning into a Fintech, ' +
        'leveraging a modern stack based on Next.js and Supabase (TypeScript). Responsible for ' +
        'identifying, prioritizing, and executing critical refactoring of legacy modules, implementing ' +
        'complex integrations for acquirers and checkouts, and developing advanced auditing tools for ' +
        'transaction monitoring.',
      pt:
        'Engenheiro de Software FullStack em um gateway de pagamentos em expansão, evoluindo para uma ' +
        'Fintech, com stack moderna baseada em Next.js e Supabase (TypeScript). Responsável por ' +
        'identificar, priorizar e executar refatorações críticas de módulos legados, implementar ' +
        'integrações complexas com adquirentes e checkouts, e desenvolver ferramentas avançadas de ' +
        'auditoria para monitoramento de transações.',
    },
  },
  {
    company: 'BRISA & UFG',
    role: {en: 'Software Engineer', pt: 'Engenheiro de Software'},
    period: 'Feb 2025 — Dec 2025',
    logo: '/img/work/brisa.webp',
    monogram: 'BR',
    description: {
      en:
        'Backend Developer in a high-impact technology residency program, responsible for modernizing ' +
        'the "Mamãe Pingo" mobile ecosystem. Led the technical restructuring of a legacy system, ' +
        'implementing automated testing standards and containerized development environments that ' +
        'boosted team productivity and software reliability for healthcare stakeholders.',
      pt:
        'Desenvolvedor Backend em um programa de residência em tecnologia de alto impacto, responsável ' +
        'por modernizar o ecossistema mobile "Mamãe Pingo". Liderei a reestruturação técnica de um ' +
        'sistema legado, implementando padrões de testes automatizados e ambientes de desenvolvimento ' +
        'containerizados que elevaram a produtividade do time e a confiabilidade do software para ' +
        'stakeholders da área de saúde.',
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
        'Strategic role within the infrastructure department, ensuring high availability and stability ' +
        'for public management systems across on-premise and cloud (AWS) environments. Responsible for ' +
        'proactive monitoring of critical services and automating update routines on Linux servers.',
      pt:
        'Função estratégica no departamento de infraestrutura, garantindo alta disponibilidade e ' +
        'estabilidade para sistemas de gestão pública em ambientes on-premise e cloud (AWS). Responsável ' +
        'pelo monitoramento proativo de serviços críticos e pela automação de rotinas de atualização em ' +
        'servidores Linux.',
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

export const projects: Project[] = [
  {
    name: 'Laboratório de Infraestrutura Self-Hosted',
    period: 'Mar 2025 – Present',
    description: {
      en:
        'Personal containerized infrastructure used as an experimentation environment for DevOps ' +
        'practices, observability, and secure networking. The environment replicates ' +
        'production-inspired tooling — monitoring stacks, automated updates, and zero-trust service ' +
        'exposure without open ports.',
      pt:
        'Infraestrutura pessoal containerizada usada como ambiente de experimentação para práticas de ' +
        'DevOps, observabilidade e redes seguras. O ambiente replica ferramentas inspiradas em produção ' +
        '— stacks de monitoramento, atualizações automatizadas e exposição de serviços zero-trust sem ' +
        'portas abertas.',
    },
    tags: ['Docker', 'Traefik', 'Prometheus', 'Grafana', 'Tailscale', 'Cloudflare Tunnel', 'Linux'],
  },
  {
    name: 'Gerenciador de Clientes e Cartões',
    period: 'Set 2024',
    description: {
      en:
        'Fullstack application developed as a technical challenge to manage clients and credit card ' +
        'data through a structured REST API and relational database model. Focused on type safety, ' +
        'schema validation, and modern frontend development practices.',
      pt:
        'Aplicação fullstack desenvolvida como desafio técnico para gerenciar clientes e dados de ' +
        'cartões de crédito por meio de uma API REST estruturada e um modelo de banco relacional. Foco ' +
        'em type safety, validação de schema e práticas modernas de desenvolvimento frontend.',
    },
    tags: ['Next.js', 'TypeScript', 'Laravel', 'MySQL', 'React Query', 'Zod'],
  },
];

export const skills: string[] = [
  'React',
  'React Native',
  'Next.js',
  'Node.js',
  'TypeScript',
  'Supabase',
  'Laravel',
  'PHP',
  'Python',
  'Docker',
  'Linux',
  'AWS',
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
