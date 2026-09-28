export type Category =
  | "Todas"
  | "Cursos"
  | "Vagas"
  | "Estágios"
  | "Bolsas"
  | "Eventos"
  | "Editais";

export type OpportunityCategory = Exclude<Category, "Todas">;

export type Opportunity = {
  id: number;
  type: OpportunityCategory;
  title: string;
  organization: string;
  location: string;
  locationGroup: "Manaus" | "Online" | "Amazonas" | "Região Norte";
  modality: "Presencial" | "Híbrido" | "Online" | "Remoto";
  format: string;
  deadline: string;
  dateOrder: number;
  description: string;
  audience: string;
  requirements: string[];
  skills: string[];
  featured?: boolean;
  new?: boolean;
  free?: boolean;
};
