"use client";

import { useEffect, useMemo, useRef, useState, type ChangeEvent, type CSSProperties, type FormEvent } from "react";
import {
  ArrowRight,
  BadgeCheck,
  Bookmark,
  BookmarkCheck,
  BriefcaseBusiness,
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  Clock3,
  Filter,
  Globe2,
  GraduationCap,
  Heart,
  Laptop,
  Layers3,
  MapPin,
  Menu,
  Rocket,
  Search,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
  Target,
  TrendingUp,
  Users,
  X,
  Zap,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select";
import { opportunities } from "@/data/opportunities";
import type { Category, Opportunity } from "@/types/opportunity";

const categories: { label: Category; icon: typeof GraduationCap }[] = [
  { label: "Todas", icon: Sparkles },
  { label: "Cursos", icon: GraduationCap },
  { label: "Vagas", icon: BriefcaseBusiness },
  { label: "Estágios", icon: Zap },
  { label: "Bolsas", icon: GraduationCap },
  { label: "Eventos", icon: Users },
  { label: "Editais", icon: CalendarDays },
];

const categoryClass: Record<Exclude<Category, "Todas">, string> = {
  Cursos: "tag-blue",
  Vagas: "tag-green",
  Estágios: "tag-violet",
  Bolsas: "tag-amber",
  Eventos: "tag-pink",
  Editais: "tag-slate",
};

const audienceCards = [
  {
    icon: GraduationCap,
    title: "Estudantes",
    text: "Cursos, bolsas e estágios para construir experiência enquanto você estuda.",
  },
  {
    icon: Rocket,
    title: "Primeiro emprego",
    text: "Vagas de entrada e conteúdos para transformar conhecimento em oportunidade.",
  },
  {
    icon: TrendingUp,
    title: "Quem quer evoluir",
    text: "Eventos e formações para ampliar repertório, currículo e networking.",
  },
  {
    icon: Globe2,
    title: "Quem busca flexibilidade",
    text: "Oportunidades presenciais, híbridas, remotas e totalmente online.",
  },
];


function AcessoLogoMark({ className = "" }: { className?: string }) {
  return (
    <span className={`brand-symbol ${className}`.trim()} aria-hidden="true">
      <svg viewBox="0 0 48 48" role="img">
        <path className="brand-symbol-route" d="M13 34V21.5c0-4.7 3.8-8.5 8.5-8.5H31" />
        <path className="brand-symbol-door" d="M20 35V22.5c0-2.5 2-4.5 4.5-4.5H34v17" />
        <circle className="brand-symbol-node" cx="13" cy="34" r="3.2" />
        <path className="brand-symbol-spark" d="M35.5 8.8v7.4M31.8 12.5h7.4" />
      </svg>
    </span>
  );
}

const faqs = [
  {
    question: "O Acesso+ faz as inscrições?",
    answer:
      "Não. O Acesso+ organiza e apresenta oportunidades. A inscrição deve ser concluída no canal oficial da organização responsável.",
  },
  {
    question: "Posso salvar oportunidades para ver depois?",
    answer:
      "Sim. Seus favoritos ficam armazenados no navegador deste dispositivo e podem ser filtrados com um clique.",
  },
  {
    question: "As oportunidades são apenas de Manaus?",
    answer:
      "Não. O protótipo prioriza Manaus e Amazonas, mas também reúne opções online, remotas e oportunidades da Região Norte.",
  },
  {
    question: "Como sei se uma informação ainda está válida?",
    answer:
      "Sempre confira prazo, requisitos e regras no canal oficial antes de enviar uma inscrição. O Acesso+ funciona como um hub de descoberta.",
  },
];

export default function Home() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<Category>("Todas");
  const [location, setLocation] = useState("Todas");
  const [sort, setSort] = useState("relevancia");
  const [saved, setSaved] = useState<number[]>([]);
  const [showSaved, setShowSaved] = useState(false);
  const [freeOnly, setFreeOnly] = useState(false);
  const [onlineOnly, setOnlineOnly] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [selected, setSelected] = useState<Opportunity | null>(null);
  const [showAll, setShowAll] = useState(false);
  const resultsRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem("acesso-mais-favoritos");
      if (stored) setSaved(JSON.parse(stored));
    } catch {
      setSaved([]);
    }
  }, []);

  useEffect(() => {
    const elements = Array.from(document.querySelectorAll<HTMLElement>(".reveal"));
    if (!("IntersectionObserver" in window)) {
      elements.forEach((element) => element.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px" },
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!selected) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelected(null);
    };

    window.addEventListener("keydown", handleEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleEscape);
    };
  }, [selected]);

  const toggleSaved = (id: number) => {
    setSaved((current) => {
      const next = current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id];

      try {
        window.localStorage.setItem("acesso-mais-favoritos", JSON.stringify(next));
      } catch {
        // A interface continua funcionando mesmo se o navegador bloquear storage.
      }

      return next;
    });
  };

  const categoryCounts = useMemo(() => {
    return categories.reduce<Record<Category, number>>((acc, item) => {
      acc[item.label] =
        item.label === "Todas"
          ? opportunities.length
          : opportunities.filter((opportunity) => opportunity.type === item.label).length;
      return acc;
    }, {} as Record<Category, number>);
  }, []);

  const filtered = useMemo(() => {
    const normalized = query.trim().toLocaleLowerCase("pt-BR");
    const result = opportunities.filter((opportunity) => {
      const matchesCategory = category === "Todas" || opportunity.type === category;
      const matchesLocation =
        location === "Todas" ||
        opportunity.locationGroup === location ||
        (location === "Online" && ["Online", "Remoto"].includes(opportunity.modality));
      const matchesSaved = !showSaved || saved.includes(opportunity.id);
      const matchesFree = !freeOnly || opportunity.free;
      const matchesOnline =
        !onlineOnly || ["Online", "Remoto"].includes(opportunity.modality);
      const haystack = `${opportunity.title} ${opportunity.organization} ${opportunity.location} ${opportunity.type} ${opportunity.skills.join(" ")}`.toLocaleLowerCase("pt-BR");

      return (
        matchesCategory &&
        matchesLocation &&
        matchesSaved &&
        matchesFree &&
        matchesOnline &&
        (!normalized || haystack.includes(normalized))
      );
    });

    if (sort === "prazo") return [...result].sort((a, b) => a.dateOrder - b.dateOrder);
    if (sort === "recentes") {
      return [...result].sort(
        (a, b) => Number(Boolean(b.new)) - Number(Boolean(a.new)) || a.dateOrder - b.dateOrder,
      );
    }
    return [...result].sort(
      (a, b) => Number(Boolean(b.featured)) - Number(Boolean(a.featured)) || a.dateOrder - b.dateOrder,
    );
  }, [category, freeOnly, location, onlineOnly, query, saved, showSaved, sort]);

  const visibleOpportunities = showAll ? filtered : filtered.slice(0, 6);
  const featuredOpportunities = opportunities.filter((item) => item.featured).slice(0, 3);
  const activeFilters = [showSaved, freeOnly, onlineOnly, category !== "Todas", location !== "Todas", Boolean(query.trim())].filter(Boolean).length;

  const clearFilters = () => {
    setQuery("");
    setCategory("Todas");
    setLocation("Todas");
    setShowSaved(false);
    setFreeOnly(false);
    setOnlineOnly(false);
    setShowAll(false);
  };

  const scrollToOpportunities = () => {
    document.getElementById("oportunidades")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setShowAll(false);
    scrollToOpportunities();
    window.setTimeout(() => resultsRef.current?.focus({ preventScroll: true }), 420);
  };

  return (
    <main id="inicio">
      <header className="site-header">
        <div className="shell header-inner">
          <a className="brand" href="#inicio" aria-label="Acesso+, página inicial">
            <AcessoLogoMark />
            <span className="brand-word">
              Acesso<span className="brand-plus">+</span>
            </span>
          </a>

          <nav className="desktop-nav" aria-label="Navegação principal">
            <a className="active" href="#oportunidades">Oportunidades</a>
            <a href="#beneficios">Benefícios</a>
            <a href="#como-funciona">Como funciona</a>
            <a href="#sobre">Sobre</a>
          </nav>

          <div className="header-actions">
            <button
              className={showSaved ? "saved-pill active" : "saved-pill"}
              type="button"
              onClick={() => {
                setShowSaved((value) => !value);
                scrollToOpportunities();
              }}
              aria-label={`${saved.length} oportunidades salvas`}
              aria-pressed={showSaved}
            >
              <Bookmark aria-hidden="true" />
              <span>{saved.length} salvas</span>
            </button>
            <Button className="publish-button" onClick={scrollToOpportunities}>
              Explorar agora
            </Button>
            <Button
              className="menu-button"
              variant="ghost"
              size="icon"
              onClick={() => setMenuOpen((value) => !value)}
              aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
              aria-expanded={menuOpen}
            >
              {menuOpen ? <X /> : <Menu />}
            </Button>
          </div>
        </div>

        {menuOpen && (
          <nav className="mobile-nav" aria-label="Navegação móvel">
            <a href="#oportunidades" onClick={() => setMenuOpen(false)}>Oportunidades</a>
            <a href="#beneficios" onClick={() => setMenuOpen(false)}>Benefícios</a>
            <a href="#como-funciona" onClick={() => setMenuOpen(false)}>Como funciona</a>
            <a href="#sobre" onClick={() => setMenuOpen(false)}>Sobre o projeto</a>
            <button
              type="button"
              onClick={() => {
                setShowSaved((value) => !value);
                setMenuOpen(false);
                scrollToOpportunities();
              }}
            >
              <Bookmark /> Ver salvas ({saved.length})
            </button>
          </nav>
        )}
      </header>

      <section className="hero">
        <div className="hero-grid-pattern" aria-hidden="true" />
        <div className="hero-orb hero-orb-one" aria-hidden="true" />
        <div className="hero-orb hero-orb-two" aria-hidden="true" />

        <div className="shell hero-grid">
          <div className="hero-copy hero-enter">
            <Badge className="eyebrow"><Sparkles /> Oportunidades em um só lugar</Badge>
            <h1>
              Seu próximo passo começa com <span>acesso.</span>
            </h1>
            <p>
              Descubra cursos, vagas, estágios, bolsas, eventos e editais com uma experiência simples,
              organizada e pensada para quem quer avançar.
            </p>

            <div className="hero-actions">
              <Button className="hero-primary" onClick={scrollToOpportunities}>
                Encontrar oportunidades <ArrowRight />
              </Button>
              <a className="hero-secondary" href="#como-funciona">
                Como funciona <ChevronRight />
              </a>
            </div>

            <div className="hero-trust" aria-label="Diferenciais do Acesso+">
              <span><CheckCircle2 /> Busca rápida</span>
              <span><CheckCircle2 /> Favoritos</span>
              <span><CheckCircle2 /> Filtros inteligentes</span>
            </div>
          </div>

          <aside className="radar-card hero-enter-delayed" aria-label="Radar de oportunidades em destaque">
            <div className="radar-header">
              <div>
                <span className="radar-kicker"><TrendingUp /> Radar Acesso+</span>
                <strong>Destaques da semana</strong>
              </div>
              <span className="live-dot"><i /> Atualizado</span>
            </div>

            <div className="radar-list">
              {featuredOpportunities.map((item, index) => (
                <button key={item.id} type="button" onClick={() => setSelected(item)}>
                  <span className="radar-index">0{index + 1}</span>
                  <span className="radar-content">
                    <small>{item.type} • {item.organization}</small>
                    <b>{item.title}</b>
                  </span>
                  <ChevronRight />
                </button>
              ))}
            </div>

            <div className="radar-footer">
              <span><ShieldCheck /> Informações organizadas para você comparar melhor.</span>
            </div>
          </aside>
        </div>

        <form className="shell search-panel search-enter" role="search" onSubmit={handleSearch}>
          <div className="search-control search-main-control">
            <label htmlFor="main-search">O que você procura?</label>
            <div className="search-input-wrap">
              <Search aria-hidden="true" />
              <Input
                id="main-search"
                value={query}
                onChange={(event: ChangeEvent<HTMLInputElement>) => {
                  setQuery(event.target.value);
                  setShowAll(false);
                }}
                placeholder="Curso, vaga, instituição ou habilidade"
                autoComplete="off"
              />
              {query && (
                <button
                  className="search-clear"
                  type="button"
                  onClick={() => { setQuery(""); setShowAll(false); }}
                  aria-label="Limpar pesquisa"
                >
                  <X />
                </button>
              )}
            </div>
          </div>

          <div className="search-control location-control">
            <label htmlFor="main-location">Onde?</label>
            <div className="location-input-wrap">
              <MapPin aria-hidden="true" />
              <NativeSelect
                id="main-location"
                value={location}
                onChange={(event: ChangeEvent<HTMLSelectElement>) => {
                  setLocation(event.target.value);
                  setShowAll(false);
                }}
              >
                <NativeSelectOption value="Todas">Qualquer localização</NativeSelectOption>
                <NativeSelectOption value="Manaus">Manaus</NativeSelectOption>
                <NativeSelectOption value="Online">Online / Remoto</NativeSelectOption>
                <NativeSelectOption value="Amazonas">Amazonas</NativeSelectOption>
                <NativeSelectOption value="Região Norte">Região Norte</NativeSelectOption>
              </NativeSelect>
            </div>
          </div>

          <Button className="search-button" type="submit">
            <Search /> Pesquisar
          </Button>
        </form>
      </section>

      <section className="stats-section" aria-label="Resumo da plataforma">
        <div className="shell stats-grid reveal">
          <article>
            <strong>{opportunities.length}</strong>
            <span>oportunidades no protótipo</span>
          </article>
          <article>
            <strong>{categories.length - 1}</strong>
            <span>categorias para explorar</span>
          </article>
          <article>
            <strong>4</strong>
            <span>formatos de participação</span>
          </article>
          <article>
            <strong>1</strong>
            <span>hub para centralizar a busca</span>
          </article>
        </div>
      </section>

      <section className="opportunities-section" id="oportunidades">
        <div className="shell">
          <div className="section-heading reveal">
            <div>
              <p className="kicker">Explore por categoria</p>
              <h2>Encontre uma oportunidade que faça sentido para você.</h2>
            </div>
            <p>
              Filtre por área, local, formato e prioridade. Salve o que interessa e volte quando quiser.
            </p>
          </div>

          <div className="category-row reveal" aria-label="Filtrar por categoria">
            {categories.map(({ label, icon: Icon }) => (
              <button
                key={label}
                type="button"
                className={category === label ? "category-chip selected" : "category-chip"}
                onClick={() => {
                  setCategory(label);
                  setShowAll(false);
                }}
                aria-pressed={category === label}
              >
                <Icon aria-hidden="true" />
                {label}
                <span>{categoryCounts[label]}</span>
              </button>
            ))}
          </div>

          <div className="quick-filters reveal">
            <div className="quick-filter-label"><Filter /> Filtros rápidos</div>
            <button
              type="button"
              className={freeOnly ? "quick-chip active" : "quick-chip"}
              onClick={() => { setFreeOnly((value) => !value); setShowAll(false); }}
              aria-pressed={freeOnly}
            >
              <BadgeCheck /> Gratuitas
            </button>
            <button
              type="button"
              className={onlineOnly ? "quick-chip active" : "quick-chip"}
              onClick={() => { setOnlineOnly((value) => !value); setShowAll(false); }}
              aria-pressed={onlineOnly}
            >
              <Laptop /> Online / remoto
            </button>
            <button
              type="button"
              className={showSaved ? "quick-chip active" : "quick-chip"}
              onClick={() => { setShowSaved((value) => !value); setShowAll(false); }}
              aria-pressed={showSaved}
            >
              <Heart /> Salvas ({saved.length})
            </button>
            {activeFilters > 0 && (
              <button type="button" className="clear-filter" onClick={clearFilters}>
                Limpar {activeFilters} {activeFilters === 1 ? "filtro" : "filtros"}
              </button>
            )}
          </div>

          <div className="results-toolbar reveal" ref={resultsRef} tabIndex={-1}>
            <p>
              <strong>{filtered.length}</strong> {filtered.length === 1 ? "oportunidade encontrada" : "oportunidades encontradas"}
              {showSaved && <span className="toolbar-context"> em salvas</span>}
            </p>
            <label className="sort-control">
              <SlidersHorizontal aria-hidden="true" />
              <span>Ordenar por</span>
              <NativeSelect value={sort} onChange={(event: ChangeEvent<HTMLSelectElement>) => setSort(event.target.value)} aria-label="Ordenar oportunidades">
                <NativeSelectOption value="relevancia">Relevância</NativeSelectOption>
                <NativeSelectOption value="recentes">Mais recentes</NativeSelectOption>
                <NativeSelectOption value="prazo">Prazo próximo</NativeSelectOption>
              </NativeSelect>
            </label>
          </div>

          {filtered.length > 0 ? (
            <>
              <div className="cards-grid">
                {visibleOpportunities.map((opportunity, index) => {
                  const isSaved = saved.includes(opportunity.id);
                  return (
                    <article
                      className={opportunity.featured ? "opportunity-card featured-card" : "opportunity-card"}
                      key={opportunity.id}
                      style={{ "--card-delay": `${Math.min(index, 5) * 55}ms` } as CSSProperties}
                    >
                      <div className="card-topline">
                        <div className="card-badges">
                          <Badge className={categoryClass[opportunity.type]}>{opportunity.type}</Badge>
                          {opportunity.new && <Badge className="new-badge">Nova</Badge>}
                          {opportunity.featured && <Badge className="featured-badge"><Sparkles /> Destaque</Badge>}
                        </div>
                        <button
                          className={isSaved ? "bookmark saved" : "bookmark"}
                          type="button"
                          onClick={() => toggleSaved(opportunity.id)}
                          aria-label={isSaved ? "Remover dos favoritos" : "Salvar oportunidade"}
                        >
                          {isSaved ? <BookmarkCheck /> : <Bookmark />}
                        </button>
                      </div>

                      <div className="card-content">
                        <p className="organization">{opportunity.organization}</p>
                        <h3>{opportunity.title}</h3>
                        <p className="description">{opportunity.description}</p>

                        <div className="skill-row" aria-label="Habilidades e temas">
                          {opportunity.skills.slice(0, 3).map((skill) => <span key={skill}>{skill}</span>)}
                        </div>

                        <div className="meta-list">
                          <span><MapPin /> {opportunity.location}</span>
                          <span><BriefcaseBusiness /> {opportunity.format}</span>
                          <span><Clock3 /> {opportunity.deadline}</span>
                        </div>
                      </div>

                      <button className="card-link" type="button" onClick={() => setSelected(opportunity)}>
                        Saiba mais <ChevronRight />
                      </button>
                    </article>
                  );
                })}
              </div>

              {filtered.length > 6 && (
                <div className="load-more-wrap reveal">
                  <Button variant="outline" className="load-more" onClick={() => setShowAll((value) => !value)}>
                    {showAll ? "Mostrar menos" : `Ver todas as ${filtered.length} oportunidades`}
                    <ArrowRight className={showAll ? "rotate-arrow" : ""} />
                  </Button>
                </div>
              )}
            </>
          ) : (
            <div className="empty-state reveal">
              <div><Search /></div>
              <h3>Nenhuma oportunidade encontrada</h3>
              <p>
                {showSaved
                  ? "Você ainda não salvou uma oportunidade com estes filtros."
                  : "Tente outro termo, localização ou categoria."}
              </p>
              <Button variant="outline" onClick={clearFilters}>Limpar filtros</Button>
            </div>
          )}
        </div>
      </section>

      <section className="benefits-section" id="beneficios">
        <div className="shell">
          <div className="center-heading reveal">
            <p className="kicker">Por que usar o Acesso+</p>
            <h2>Menos ruído. Mais clareza para decidir seu próximo passo.</h2>
            <p>Uma experiência desenhada para transformar informação espalhada em caminhos mais fáceis de encontrar.</p>
          </div>

          <div className="benefits-grid">
            <article className="benefit-card reveal">
              <div className="benefit-icon"><Search /></div>
              <span>01</span>
              <h3>Descoberta inteligente</h3>
              <p>Pesquise por palavras-chave, instituições e habilidades sem navegar por dezenas de páginas.</p>
            </article>
            <article className="benefit-card reveal">
              <div className="benefit-icon"><Layers3 /></div>
              <span>02</span>
              <h3>Informação organizada</h3>
              <p>Compare local, formato, prazo, requisitos e temas importantes antes de decidir onde focar.</p>
            </article>
            <article className="benefit-card reveal">
              <div className="benefit-icon"><BookmarkCheck /></div>
              <span>03</span>
              <h3>Seu radar pessoal</h3>
              <p>Salve oportunidades interessantes e use filtros rápidos para retomar sua seleção depois.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="audience-section">
        <div className="shell audience-layout">
          <div className="audience-copy reveal">
            <p className="kicker">Feito para diferentes momentos</p>
            <h2>Oportunidade não tem um único formato.</h2>
            <p>
              O Acesso+ reúne caminhos para quem está começando, estudando, procurando experiência ou buscando uma nova direção.
            </p>
            <a href="#oportunidades">Explorar agora <ArrowRight /></a>
          </div>

          <div className="audience-grid">
            {audienceCards.map(({ icon: Icon, title, text }, index) => (
              <article className="audience-card reveal" key={title} style={{ "--audience-delay": `${index * 70}ms` } as CSSProperties}>
                <Icon />
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="how-section" id="como-funciona">
        <div className="shell how-grid">
          <div className="how-copy reveal">
            <p className="kicker">Simples de verdade</p>
            <h2>Do interesse à ação em três passos.</h2>
            <p>O foco da plataforma é reduzir o tempo gasto procurando e aumentar o tempo usado para se preparar.</p>
          </div>

          <div className="steps">
            <article className="reveal">
              <span>01</span>
              <div className="step-icon"><Search /></div>
              <div><h3>Explore</h3><p>Use a busca, localização, categorias e filtros rápidos.</p></div>
            </article>
            <article className="reveal">
              <span>02</span>
              <div className="step-icon"><Bookmark /></div>
              <div><h3>Organize</h3><p>Salve o que interessa e compare as opções com calma.</p></div>
            </article>
            <article className="reveal">
              <span>03</span>
              <div className="step-icon"><Rocket /></div>
              <div><h3>Avance</h3><p>Confira os requisitos no canal oficial e prepare sua inscrição.</p></div>
            </article>
          </div>
        </div>
      </section>

      <section className="faq-section">
        <div className="shell faq-layout">
          <div className="faq-copy reveal">
            <p className="kicker">Perguntas frequentes</p>
            <h2>Informação clara também faz parte da experiência.</h2>
            <p>Alguns pontos importantes sobre como o protótipo do Acesso+ funciona hoje.</p>
          </div>

          <div className="faq-list reveal">
            {faqs.map((faq) => (
              <details key={faq.question}>
                <summary>
                  <span>{faq.question}</span>
                  <span className="faq-plus">+</span>
                </summary>
                <p>{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="about-section" id="sobre">
        <div className="shell about-card reveal">
          <div className="about-symbol"><AcessoLogoMark className="about-logo-mark" /></div>
          <div>
            <p className="kicker">Sobre o Acesso+</p>
            <h2>Informação também é oportunidade.</h2>
            <p>
              O Acesso+ nasceu para aproximar estudantes e jovens profissionais de caminhos que muitas vezes ficam espalhados,
              difíceis de comparar ou fáceis de perder no meio de tanta informação.
            </p>
          </div>
          <a className="about-link" href="#oportunidades">Explorar oportunidades <ArrowRight /></a>
        </div>
      </section>

      <section className="final-cta-section">
        <div className="shell final-cta reveal">
          <div className="cta-glow" aria-hidden="true" />
          <div>
            <Badge className="cta-badge"><Sparkles /> Seu próximo passo</Badge>
            <h2>Você não precisa procurar em todo lugar.</h2>
            <p>Comece pelo Acesso+ e concentre sua energia no que realmente importa: se preparar para a oportunidade.</p>
          </div>
          <Button className="cta-button" onClick={scrollToOpportunities}>
            Explorar oportunidades <ArrowRight />
          </Button>
        </div>
      </section>

      <footer className="site-footer">
        <div className="shell footer-only">
          <p>© 2026 Acesso+. Todos os direitos reservados.</p>
        </div>
      </footer>

      <button
        className={showSaved ? "mobile-saved-dock active" : "mobile-saved-dock"}
        type="button"
        onClick={() => {
          setShowSaved((value) => !value);
          scrollToOpportunities();
        }}
        aria-label="Filtrar oportunidades salvas"
      >
        <Bookmark />
        <span>Salvas</span>
        <b>{saved.length}</b>
      </button>

      {selected && (
        <div
          className="detail-overlay"
          role="presentation"
          onMouseDown={(event) => {
            if (event.currentTarget === event.target) setSelected(null);
          }}
        >
          <section
            className="detail-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="detail-modal-title"
            aria-describedby="detail-modal-description"
          >
            <button
              className="modal-close"
              type="button"
              onClick={() => setSelected(null)}
              aria-label="Fechar detalhes"
              autoFocus
            >
              <X />
            </button>

            <div className="modal-heading">
              <div className="modal-badges">
                <Badge className={categoryClass[selected.type]}>{selected.type}</Badge>
                {selected.new && <Badge className="new-badge">Nova</Badge>}
                {selected.featured && <Badge className="featured-badge"><Sparkles /> Destaque</Badge>}
              </div>
              <p className="organization">{selected.organization}</p>
              <h2 id="detail-modal-title">{selected.title}</h2>
              <p id="detail-modal-description" className="modal-description">{selected.description}</p>
            </div>

            <div className="modal-info-grid">
              <article><MapPin /><span><small>Localização</small><strong>{selected.location}</strong></span></article>
              <article><BriefcaseBusiness /><span><small>Formato</small><strong>{selected.format}</strong></span></article>
              <article><CalendarDays /><span><small>Prazo</small><strong>{selected.deadline}</strong></span></article>
              <article><Target /><span><small>Público</small><strong>{selected.audience}</strong></span></article>
            </div>

            <div className="modal-detail-grid">
              <div className="modal-section">
                <h3><CheckCircle2 /> Requisitos principais</h3>
                <ul>
                  {selected.requirements.map((requirement) => <li key={requirement}>{requirement}</li>)}
                </ul>
              </div>

              <div className="modal-section">
                <h3><Layers3 /> Temas e habilidades</h3>
                <div className="modal-skills">
                  {selected.skills.map((skill) => <span key={skill}>{skill}</span>)}
                </div>
              </div>
            </div>

            <div className="modal-actions">
              <Button className="modal-primary" onClick={() => toggleSaved(selected.id)}>
                {saved.includes(selected.id) ? <BookmarkCheck /> : <Bookmark />}
                {saved.includes(selected.id) ? "Salva nos favoritos" : "Salvar oportunidade"}
              </Button>
              <Button variant="outline" type="button" onClick={() => setSelected(null)}>Fechar</Button>
            </div>

            <p className="prototype-note">
              Confira sempre prazo, requisitos e regras no canal oficial da organização antes da inscrição.
            </p>
          </section>
        </div>
      )}
    </main>
  );
}
