/**
 * Conteúdo do portfólio centralizado e tipado.
 * Editar aqui é suficiente para atualizar as seções da landing page.
 */

export type WorkExperience = {
  company: string;
  role: string;
  /** Data de início, ex.: "Jul 2025". */
  start: string;
  /** Data de término ou "Present". */
  end: string;
  /** Link externo opcional (site da empresa). */
  href?: string;
  description: string;
};

export type Education = {
  course: string;
  institution: string;
  start: string;
  end: string;
  href?: string;
};

export const profile = {
  name: 'João',
  fullName: 'João Pedro Ribeiro Barbosa',
  avatar: 'https://github.com/joao1barbosa.png',
  email: 'joao1barbosa@hotmail.com',
  socials: {
    github: 'https://github.com/joao1barbosa',
    linkedin: 'https://www.linkedin.com/in/joao1barbosa/',
    x: 'https://x.com/joao1barbosa_',
  },
} as const;

export const workExperience: WorkExperience[] = [
  {
    company: 'Payevo',
    role: 'Fullstack Software Engineer (Júnior)',
    start: 'Jan 2026',
    end: 'Present',
    description:
      'Atuo como Engenheiro de Software Fullstack em uma Fintech, desenvolvendo produtos ' +
      'de pagamentos com Next.js, Supabase e TypeScript. Foco em features ponta a ponta, ' +
      'desde o schema no Postgres e Row Level Security até a interface em React, priorizando ' +
      'confiabilidade, performance e segurança em fluxos financeiros.',
  },
  {
    company: 'BRISA & UFG',
    role: 'Software Engineer',
    start: 'Jul 2025',
    end: 'Dez 2025',
    description:
      'Atuei como Backend Developer em um programa de residência em tecnologia de alto impacto, ' +
      'responsável por modernizar e expandir o ecossistema mobile "Mamãe Pingo". Liderei a ' +
      'reestruturação técnica de um sistema legado, implementando padrões de testes automatizados ' +
      'e ambientes de desenvolvimento containerizados que elevaram a produtividade do time e a ' +
      'confiabilidade do software para stakeholders da área de saúde.',
  },
  {
    company: 'Prodata',
    role: 'IT Infrastructure Support',
    start: 'Nov 2024',
    end: 'Jul 2025',
    description:
      'Função estratégica no departamento de infraestrutura, garantindo alta disponibilidade e ' +
      'estabilidade para sistemas de gestão pública em ambientes on-premise e cloud (AWS). ' +
      'Responsável pelo monitoramento proativo de serviços críticos e pela automação de rotinas ' +
      'de atualização em servidores Linux, com foco em continuidade operacional e resolução ' +
      'rápida de incidentes em larga escala.',
  },
  {
    company: 'Global Informática',
    role: 'Sales Associate',
    start: 'Aug 2023',
    end: 'Fev 2024',
    description:
      'Experiência na gestão do relacionamento com clientes e na tradução de necessidades de ' +
      'negócio em soluções técnicas. Desenvolvi habilidades de comunicação assertiva e negociação ' +
      'que facilitam o levantamento de requisitos e a interface direta com stakeholders, garantindo ' +
      'que o produto final esteja alinhado às expectativas reais dos usuários.',
  },
  {
    company: 'Unitech Informática',
    role: 'Computer Maintenance Technician',
    start: 'Aug 2020',
    end: 'Fev 2021',
    description:
      'Foco em diagnósticos críticos e na resolução de falhas de hardware e software. Essa experiência ' +
      'proporcionou um entendimento sólido de arquitetura de computadores e da camada física de ' +
      'processamento — habilidades fundamentais para escrever código performático e compreender a ' +
      'integração de baixo nível entre hardware e sistema operacional.',
  },
];

export const education: Education[] = [
  {
    course: 'Software Engineering',
    institution: 'UNIGOIÁS',
    start: '2024',
    end: '2027',
    href: 'https://unigoias.com.br/',
  },
  {
    course: 'Computer Technician',
    institution: 'IFMA',
    start: '2016',
    end: '2018',
    href: 'https://imperatriz.ifma.edu.br/',
  },
];

export const skills: string[] = [
  'React',
  'React Native',
  'Next.js',
  'Node.js',
  'TypeScript',
  'Supabase',
  'PostgreSQL',
  'Laravel',
  'PHP',
  'Python',
  'Git',
  'Docker',
  'Linux',
];
