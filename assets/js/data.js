/* Physician Academy & Library — conteudo (instrutor, categorias, topicos do forum, cursos, conteudo gratuito) */
const INSTRUCTOR = {
  name:"Dr. Selênio Campos Filho", photo:"assets/img/instructor.jpg",
  role:"Médico do Esporte · Cardiologia Esportiva",
  i18n:{en:{role:"Sports Physician · Sports Cardiology"}, es:{role:"Médico del Deporte · Cardiología del Deporte"}, fr:{role:"Médecin du Sport · Cardiologie du Sport"}},
  bio:"Médico da Confederação Brasileira de Vôlei. Coordenador médico da pós-graduação em Medicina do Exercício e do Esporte da Afya e professor da pós-graduação de Nutrologia da Afya. PHSLS pela Sociedade Brasileira de Medicina do Exercício e do Esporte. Antropometrista nível 1 pela ISAK.",
  bio_i18n:{
    en:"Physician for the Brazilian Volleyball Confederation. Medical coordinator of the postgraduate program in Exercise and Sports Medicine at Afya, and professor in the postgraduate Nutrology program at Afya. PHSLS certified by the Brazilian Society of Exercise and Sports Medicine. Level 1 ISAK anthropometrist.",
    es:"Médico de la Confederación Brasileña de Voleibol. Coordinador médico del posgrado en Medicina del Ejercicio y del Deporte de Afya y profesor del posgrado de Nutrología de Afya. PHSLS por la Sociedad Brasileña de Medicina del Ejercicio y del Deporte. Antropometrista nivel 1 por ISAK.",
    fr:"Médecin de la Confédération Brésilienne de Volley-ball. Coordinateur médical du 3e cycle en Médecine de l'Exercice et du Sport à Afya et professeur du 3e cycle de Nutrologie à Afya. Certifié PHSLS par la Société Brésilienne de Médecine de l'Exercice et du Sport. Anthropométriste niveau 1 ISAK.",
  },
  initials:"SC"
};
function instructorRole(){ return (INSTRUCTOR.i18n[LANG] && INSTRUCTOR.i18n[LANG].role) || INSTRUCTOR.role; }
function instructorBio(){ return LANG==='pt' ? INSTRUCTOR.bio : (INSTRUCTOR.bio_i18n[LANG] || INSTRUCTOR.bio); }
function instructorAvatar(size){ return `<span class="avatar" style="width:${size}px;height:${size}px;"><img src="${INSTRUCTOR.photo}" alt="${INSTRUCTOR.name}"></span>`; }

const CATEGORIES = [
  {id:"esportiva", key:"cat_esportiva", icon:"run"}, {id:"ortopedia", key:"cat_ortopedia", icon:"bone"},
  {id:"cardio", key:"cat_cardio", icon:"heartPulse"}, {id:"farmaco", key:"cat_farmaco", icon:"pill"}, {id:"nutro", key:"cat_nutro", icon:"apple"},
];

const TOPICS = [
  {slug:"time-loss-padrao-ouro", cat:"esportiva", tags:["Consenso IOC 2020","Gravidade de Lesão"],
    i18n:{en:{title:"Time-loss: why this severity metric belongs in your practice", excerpt:"The biggest mistake we make as physicians is waiting for the athlete to get injured before acting.", tags:["IOC 2020 Consensus","Injury Severity"]},
          es:{title:"Time-loss: por qué esta métrica de gravedad debería adoptar tu clínica", excerpt:"El mayor error que cometemos como médicos es esperar a que el atleta se lesione para actuar.", tags:["Consenso COI 2020","Gravedad de la Lesión"]},
          fr:{title:"Time-loss : pourquoi cette mesure de gravité devrait s'imposer dans votre pratique", excerpt:"La plus grande erreur du médecin est d'attendre que l'athlète se blesse pour agir.", tags:["Consensus CIO 2020","Gravité de la Blessure"]}},
    author:"Dr. Selênio Campos Filho", role:"Médico do Esporte",
    title:"Time-Loss: por que essa é a métrica de gravidade que sua clínica deveria adotar",
    excerpt:"O maior erro que cometemos como médico é esperar o atleta se machucar para agir. A padronização do tempo de afastamento muda isso.",
    replies:9, views:"1.4k", when:"há 3 horas",
    body:`<p>O maior erro que cometemos como médico é esperar o atleta se machucar para entrar em ação. Sem monitoramento constante e sem uma linguagem comum para descrever gravidade, cada serviço mede lesão de um jeito.</p>
      <h4>Por que dados não-padronizados falham</h4>
      <p>Definições inconsistentes entre estudos tornam impossível comparar dados. O Consenso IOC 2020 resolve isso com definições e metodologias padronizadas.</p>
      <h4>A classificação por Time-Loss</h4>
      <ul><li><b>Menor</b> — 0 a 7 dias de afastamento</li><li><b>Moderado</b> — 8 a 28 dias</li><li><b>Maior</b> — mais de 28 dias</li></ul>
      <p>Time-loss é a métrica mais objetiva porque mede tempo fora do esporte, permitindo comparar tratamentos e prever o retorno ao esporte (RTP).</p>
      <div class="callout">Nota clínica: padronizar o time-loss permite comparar seus resultados com a literatura e ajustar protocolos com base em evidência.</div>`,
    replies_data:[
      {who:"Dra. Marina Petraglia", role:"Ortopedista do Esporte", when:"há 2 horas", likes:6, text:"Migramos para essa classificação há um ano no departamento médico do clube."},
      {who:"Dr. Rafael Andion", role:"Médico do Esporte", when:"há 1 hora", likes:3, text:"Concordo, mas ainda vejo resistência em times menores por falta de rotina de registro de exposição.", nested:true},
      {who:"Dr. Selênio Campos Filho", role:"Autor", when:"há 40 min", likes:8, text:"Exato — por isso a Ação 4 do consenso é documentação detalhada de exposição.", nested:true},
    ],
    related:["taxa-incidencia-exposicao","carga-treino-aguda-cronica","doping-tramadol-corticoides"]
  },
  {slug:"taxa-incidencia-exposicao", cat:"esportiva", tags:["Epidemiologia","Carga de Treino"],
    i18n:{en:{title:"Calculating real risk: why 'injuries per session' is misleading", excerpt:"Sessions vary in duration — dividing injuries by number of sessions is imprecise.", tags:["Epidemiology","Training Load"]},
          es:{title:"Calculando el riesgo real: por qué 'lesiones por sesión' engaña", excerpt:"Las sesiones varían en duración — dividir lesiones por número de sesiones es impreciso.", tags:["Epidemiología","Carga de Entrenamiento"]},
          fr:{title:"Calculer le risque réel : pourquoi « blessures par séance » induit en erreur", excerpt:"Les séances varient en durée — diviser les blessures par le nombre de séances manque de précision.", tags:["Épidémiologie","Charge d'Entraînement"]}},
    author:"Dra. Marina Petraglia", role:"Ortopedista do Esporte",
    title:"Calculando o risco real: por que 'lesões por sessão' engana",
    excerpt:"Sessões variam em duração — dividir lesões por número de sessões é impreciso. O padrão IOC recomenda algo diferente.",
    replies:5, views:"820", when:"há 1 dia",
    body:`<p>A taxa de incidência padronizada é o número de lesões dividido pela exposição total, mas o denominador importa muito.</p>
      <div class="formula-box">Cálculo por sessão (baixa precisão)<br>10 lesões ÷ 50 sessões = 0,2 lesões/sessão<br><br>Cálculo por horas (recomendado)<br>10 lesões ÷ 200 horas = 0,05 lesões/hora</div>
      <p>Dividir por horas totais de treino/competição é padronizado e comparável entre esportes diferentes.</p>`,
    replies_data:[{who:"Dr. Igor Malta", role:"Preparador Físico", when:"há 20 horas", likes:4, text:"Na prática, o desafio é conseguir o dado de horas com precisão em categorias de base."}],
    related:["time-loss-padrao-ouro","carga-treino-aguda-cronica"]
  },
  {slug:"carga-treino-aguda-cronica", cat:"esportiva", tags:["Controle de Carga","Prevenção"],
    i18n:{en:{title:"Acute vs. chronic load: the formula that predicts injury risk", excerpt:"High recent load relative to accumulated capacity is a robust predictor of overuse injury.", tags:["Load Management","Prevention"]},
          es:{title:"Carga aguda vs. crónica: la fórmula que predice el riesgo de lesión", excerpt:"Una carga reciente alta en relación con la capacidad acumulada es un predictor sólido de lesión por sobrecarga.", tags:["Control de Carga","Prevención"]},
          fr:{title:"Charge aiguë vs. chronique : la formule qui prédit le risque de blessure", excerpt:"Une charge récente élevée par rapport à la capacité accumulée prédit la blessure de surcharge.", tags:["Gestion de la Charge","Prévention"]}},
    author:"Dr. Selênio Campos Filho", role:"Médico do Esporte",
    title:"Carga aguda vs. carga crônica: a fórmula que prediz risco de lesão",
    excerpt:"Carga recente alta em relação à capacidade acumulada é um dos preditores mais robustos de lesão por sobrecarga.",
    replies:11, views:"1.1k", when:"há 2 dias",
    body:`<p>Sobrecarga é acúmulo gradual de energia cinética de baixa intensidade ao longo do tempo — mecanismo progressivo e cumulativo, diferente do trauma agudo.</p>
      <div class="formula-box">Carga aguda — soma dos treinos da semana (RPE × tempo por sessão)<br>Ex: RPE 5 × 60 min × 3 treinos<br><br>Carga crônica — média das últimas 3–4 semanas de carga aguda</div>
      <p>Registrar o mecanismo de início é fundamental: tratamento e prevenção são radicalmente diferentes para lesão aguda vs. sobrecarga.</p>`,
    replies_data:[{who:"Dr. Bruno Katayama", role:"Fisioterapeuta Esportivo", when:"há 1 dia", likes:7, text:"Usamos essa razão aguda:crônica nas categorias sub-15 a sub-20 e reduzimos lesões de sobrecarga em cerca de 30%."}],
    related:["time-loss-padrao-ouro","taxa-incidencia-exposicao"]
  },
  {slug:"doping-tramadol-corticoides", cat:"farmaco", tags:["WADA 2024","Antidoping"],
    i18n:{en:{title:"Tramadol and corticosteroids: the most common prescribing traps for orthopedists", excerpt:"Many medications commonly prescribed by orthopedists are on the WADA 2024 prohibited list.", tags:["WADA 2024","Anti-Doping"]},
          es:{title:"Tramadol y corticoides: las trampas de prescripción más comunes", excerpt:"Muchos medicamentos que los ortopedistas prescriben habitualmente están en la lista prohibida de la WADA 2024.", tags:["WADA 2024","Antidopaje"]},
          fr:{title:"Tramadol et corticoïdes : les pièges de prescription les plus fréquents", excerpt:"De nombreux médicaments couramment prescrits par les orthopédistes figurent sur la liste interdite WADA 2024.", tags:["WADA 2024","Antidopage"]}},
    author:"Dr. Selênio Campos Filho", role:"Médico do Esporte",
    title:"Tramadol e corticoides: as armadilhas de prescrição mais comuns do ortopedista",
    excerpt:"Muitos medicamentos comumente prescritos por ortopedistas estão na lista proibida da WADA 2024.",
    replies:14, views:"2.1k", when:"há 4 dias",
    body:`<p>O ortopedista deve conhecer quais medicamentos são proibidos antes de prescrever, consultar a lista WADA 2024 e documentar cada prescrição.</p>
      <h4>Status de medicações comuns em ortopedia</h4>
      <ul><li><b>Corticoides sistêmicos</b> — proibidos in-competition. Tópicos/locais são permitidos com autorização.</li>
      <li><b>Tramadol</b> — proibido in-competition. Alternativas: paracetamol, ibuprofeno, naproxeno.</li>
      <li><b>Outros opiáceos</b> — proibidos pelo risco de abuso e potencial de mascarar lesões.</li>
      <li><b>Salbutamol inalado</b> — permitido com limite de 1.600 mcg/24h e notificação obrigatória.</li>
      <li><b>AINEs</b> (ibuprofeno) — permitidos, primeira escolha para dor e inflamação.</li></ul>
      <div class="callout">A lista WADA é atualizada anualmente em 1º de janeiro. Consulte sempre wada-ama.org antes de prescrever.</div>`,
    replies_data:[
      {who:"Dr. Henrique Farah", role:"Ortopedista", when:"há 3 dias", likes:12, text:"Já vi um caso de infiltração sem checar o status 'in-competition' gerar problema sério em campeonato estadual."},
      {who:"Dra. Camila Roriz", role:"Médica do Esporte", when:"há 2 dias", likes:5, text:"Complemento: tempos de detecção variam muito — clostebol em creme pode ficar detectável por 2 a 4 semanas.", nested:true},
    ],
    related:["tempos-deteccao-substancias","suplementacao-evidencia"]
  },
  {slug:"tempos-deteccao-substancias", cat:"farmaco", tags:["Antidoping","Farmacocinética"],
    i18n:{en:{title:"How long is each substance detectable? Quick reference table", excerpt:"Detection windows every athlete's physician should know by heart.", tags:["Anti-Doping","Pharmacokinetics"]},
          es:{title:"¿Cuánto tiempo es detectable cada sustancia?", excerpt:"Tiempos de detección que todo médico de atletas debería conocer de memoria.", tags:["Antidopaje","Farmacocinética"]},
          fr:{title:"Combien de temps chaque substance reste-t-elle détectable ?", excerpt:"Des fenêtres de détection à connaître par cœur.", tags:["Antidopage","Pharmacocinétique"]}},
    author:"Dra. Camila Roriz", role:"Médica do Esporte",
    title:"Quanto tempo cada substância fica detectável? Tabela de referência rápida",
    excerpt:"Clostebol em creme, tuaminoeptano, noretisterona e analgésicos comuns — tempos de detecção essenciais.",
    replies:6, views:"690", when:"há 5 dias",
    body:`<table style="width:100%;border-collapse:collapse;font-size:13.5px;">
      <tr style="border-bottom:1px solid var(--line);text-align:left;"><th style="padding:8px 0;">Substância</th><th>Tempo</th><th>Obs.</th></tr>
      <tr style="border-bottom:1px solid var(--line);"><td style="padding:8px 0;">Clostebol (cremes)</td><td>2–4 semanas</td><td>Mesmo tópico</td></tr>
      <tr style="border-bottom:1px solid var(--line);"><td style="padding:8px 0;">Tuaminoeptano</td><td>24–48h</td><td>Eliminação rápida</td></tr>
      <tr style="border-bottom:1px solid var(--line);"><td style="padding:8px 0;">Noretisterona</td><td>Até 3 meses</td><td>Metabólitos persistentes</td></tr>
      <tr><td style="padding:8px 0;">Analgésicos comuns</td><td>3–5 dias</td><td>Varia com dosagem</td></tr></table>`,
    replies_data:[{who:"Dr. Selênio Campos Filho", role:"Autor", when:"há 4 dias", likes:9, text:"Ótima referência. Sempre oriento a checar cosméticos e pomadas de uso doméstico antes de competições."}],
    related:["doping-tramadol-corticoides"]
  },
  {slug:"suplementacao-evidencia", cat:"nutro", tags:["Nutrição Esportiva","ISSN/ACSM"],
    i18n:{en:{title:"Creatine, whey and HMB post-injury: what the evidence supports", excerpt:"A practical summary of ISSN, ACSM, FIFA and IOC recommendations.", tags:["Sports Nutrition","ISSN/ACSM"]},
          es:{title:"Creatina, whey y HMB tras una lesión", excerpt:"Un resumen práctico de las recomendaciones de la ISSN, ACSM, FIFA y COI.", tags:["Nutrición Deportiva","ISSN/ACSM"]},
          fr:{title:"Créatine, whey et HMB après une blessure", excerpt:"Un résumé pratique des recommandations de l'ISSN, l'ACSM, la FIFA et le CIO.", tags:["Nutrition Sportive","ISSN/ACSM"]}},
    author:"Dr. Selênio Campos Filho", role:"Médico do Esporte",
    title:"Creatina, whey e HMB pós-lesão: o que a evidência realmente sustenta",
    excerpt:"Nem todo suplemento tem o mesmo nível de evidência. Resumo prático das recomendações da ISSN, ACSM, FIFA e COI.",
    replies:8, views:"1.3k", when:"há 6 dias",
    body:`<ul><li><b>Creatina</b> — forte evidência. 10g/dia ou 0,1g/kg/dia.</li>
      <li><b>Proteína (whey)</b> — forte evidência. 1,4–2,0g/kg/dia.</li>
      <li><b>HMB</b> — evidência moderada. 3g/dia, idealmente 2 semanas antes de carga lesiva.</li>
      <li><b>Cafeína</b> — pouca evidência específica para reabilitação. 3–6mg/kg, 60 min antes.</li></ul>
      <p>Referência: Kerksick et al., <em>ISSN exercise &amp; sports nutrition review update</em>, J Int Soc Sports Nutr, 2018.</p>`,
    replies_data:[{who:"Dra. Aline Feitosa", role:"Nutróloga do Esporte", when:"há 5 dias", likes:6, text:"Costumo priorizar HMB só em casos de imobilização prolongada."}],
    related:["doping-tramadol-corticoides","pcr-atletas-protocolo"]
  },
  {slug:"pcr-atletas-protocolo", cat:"cardio", tags:["Emergência","EAP"],
    i18n:{en:{title:"Cardiac arrest on the field: you have 3 to 5 minutes", excerpt:"Every minute without CPR drops survival by 7 to 10%.", tags:["Emergency","EAP"]},
          es:{title:"Paro cardíaco en el campo: tienes 3 a 5 minutos", excerpt:"Cada minuto sin RCP reduce la supervivencia entre un 7 y un 10%.", tags:["Emergencia","PAE"]},
          fr:{title:"Arrêt cardiaque sur le terrain : vous avez 3 à 5 minutes", excerpt:"Chaque minute sans RCP réduit la survie de 7 à 10 %.", tags:["Urgence","PAU"]}},
    author:"Dr. Selênio Campos Filho", role:"Médico do Esporte",
    title:"PCR em campo: você tem 3 a 5 minutos — sua equipe está pronta?",
    excerpt:"A cada minuto sem RCP, a chance de sobrevida cai de 7 a 10%. Como estruturar um Plano de Ação de Emergência.",
    replies:17, views:"2.6k", when:"há 1 semana",
    body:`<p>Parada cardiorrespiratória é a cessação súbita da atividade cardíaca com perda de consciência, ausência de pulso central e apneia.</p>
      <div class="formula-box">Tempo ideal máximo para primeira desfibrilação: 3–5 minutos<br>Taxa de sobrevivência com RCP e desfibrilação precoces: 80%</div>
      <h4>A "jogada ensaiada" da FIFA</h4>
      <p>Estrutura padronizada de resposta médica, roteirizada e sincronizada, com equipe proativa.</p>
      <h4>Plano de Ação de Emergência Pré-Jogo (PAEP)</h4>
      <ul><li>Define funções específicas para cada membro da equipe</li><li>Prioridade: avaliar potenciais paradas cardíacas súbitas</li><li>Checklist de equipamentos</li><li>Comunicação em circuito fechado</li></ul>`,
    replies_data:[
      {who:"Dr. Thomaz Villela", role:"Médico do Esporte", when:"há 6 dias", likes:14, text:"Fizemos simulação com a comissão técnica inteira — reduziu bastante o tempo até o primeiro choque."},
      {who:"Dra. Marina Petraglia", role:"Ortopedista do Esporte", when:"há 5 dias", likes:5, text:"Comunicação em circuito fechado evita o efeito 'espectador' em emergências.", nested:true},
    ],
    related:["time-loss-padrao-ouro","doping-tramadol-corticoides"]
  },
];

const COURSES = [
  {slug:"medicina-esporte-ortopedista", flagship:true, tag:"Medicina Esportiva · Ortopedia", level:"avancado", img:"assets/img/course-medicina-esporte.jpg",
    i18n:{en:{tag:"Sports Medicine · Orthopedics", title:"Exercise and Sports Medicine and its Importance in Orthopedics", short:"From the IOC 2020 consensus to the cardiac arrest protocol — the sports medicine foundation every orthopedist should master."},
          es:{tag:"Medicina del Deporte · Ortopedia", title:"Medicina del Ejercicio y del Deporte y su Importancia en la Ortopedia", short:"Del consenso COI 2020 al protocolo de paro cardíaco — la base que todo ortopedista debería dominar."},
          fr:{tag:"Médecine du Sport · Orthopédie", title:"Médecine de l'Exercice et du Sport et son Importance en Orthopédie", short:"Du consensus CIO 2020 au protocole d'arrêt cardiaque — les bases à maîtriser."}},
    title:"Medicina do Exercício e do Esporte e sua Importância na Ortopedia",
    short:"Do consenso IOC 2020 ao protocolo de PCR em campo — a base de medicina esportiva que todo ortopedista deveria dominar.",
    priceNum:597, price:"R$ 597,00", hours:"9", lessons:"31", students:"860", rating:"4,9", ratingCount:"142",
    video:"https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
    modules:[
      {title:"Módulo 1 · Por que monitorar antes da lesão", lessons:[{n:"A lógica da prevenção vs. reação", d:"6:20"},{n:"Padronização de dados: por que ela decide sua prática", d:"8:10"}]},
      {title:"Módulo 2 · Lesão vs. doença: definições do consenso IOC", lessons:[{n:"Problema de saúde: definição ampla", d:"5:40"},{n:"Lesão: trauma agudo vs. overuse", d:"9:05"},{n:"Doença: mecanismos e diferenciais", d:"7:15"}]},
      {title:"Módulo 3 · Classificação de gravidade: Time-Loss", lessons:[{n:"Menor, moderado e maior", d:"6:50"},{n:"Time-loss e retorno ao esporte (RTP)", d:"8:30"}]},
      {title:"Módulo 4 · Medindo o risco real", lessons:[{n:"Taxa de incidência por sessão vs. por horas", d:"7:00"},{n:"Carga aguda e crônica: a fórmula", d:"10:20"}]},
      {title:"Módulo 5 · IA aplicada à medicina esportiva", lessons:[{n:"Assistentes clínicos especializados", d:"6:10"},{n:"Análise preditiva de risco", d:"8:45"},{n:"O ecossistema de ferramentas de IA", d:"7:30"}]},
      {title:"Módulo 6 · Doping: o que todo ortopedista precisa saber", lessons:[{n:"Lista WADA 2024", d:"11:15"},{n:"Tempos de detecção", d:"6:40"},{n:"Documentação e conformidade", d:"5:55"}]},
      {title:"Módulo 7 · Suplementação com evidência", lessons:[{n:"Creatina, whey e cafeína", d:"9:20"},{n:"HMB pós-imobilização", d:"6:05"}]},
      {title:"Módulo 8 · Atendimento em provas esportivas", lessons:[{n:"Emergências em provas de endurance", d:"8:00"},{n:"Plano de Ação de Emergência (EAP)", d:"10:10"}]},
      {title:"Módulo 9 · PCR em atletas", lessons:[{n:"Reconhecimento e causas em jovens", d:"7:40"},{n:"A jogada ensaiada da FIFA", d:"9:15"},{n:"Simulação de desfibrilação precoce", d:"12:00"}]},
    ],
  },
  {slug:"farmacologia-antidoping", tag:"Farmacologia Antidoping", level:"intermediario", img:"assets/img/course-farmacologia.jpg",
    i18n:{en:{tag:"Anti-Doping Pharmacology", title:"Anti-Doping Pharmacology for Orthopedists", short:"Prescribe safely: WADA list, detection windows and permitted alternatives."},
          es:{tag:"Farmacología Antidopaje", title:"Farmacología Antidopaje para Ortopedistas", short:"Prescribe con seguridad: lista WADA, tiempos de detección y alternativas permitidas."},
          fr:{tag:"Pharmacologie Antidopage", title:"Pharmacologie Antidopage pour les Orthopédistes", short:"Prescrivez en toute sécurité : liste WADA, fenêtres de détection et alternatives autorisées."}},
    title:"Farmacologia Antidoping para Ortopedistas", short:"Prescreva com segurança: lista WADA, tempos de detecção e alternativas permitidas para as queixas mais comuns.",
    priceNum:349, price:"R$ 349,00", hours:"4", lessons:"14", students:"410", rating:"4,8", ratingCount:"96",
    video:"https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
    modules:[
      {title:"Módulo 1 · A lista WADA na prática ortopédica", lessons:[{n:"Corticoides sistêmicos vs. tópicos", d:"7:10"},{n:"Tramadol e opiáceos: alternativas seguras", d:"6:35"}]},
      {title:"Módulo 2 · Documentação e conformidade", lessons:[{n:"Comunicação com o atleta", d:"5:20"},{n:"Registro de prescrição", d:"4:50"}]},
    ]
  },
  {slug:"controle-de-carga-prevencao", tag:"Medicina Esportiva", level:"iniciante", img:"assets/img/course-controle-carga.jpg",
    i18n:{en:{tag:"Sports Medicine", title:"Load Management and Overuse Injury Prevention", short:"Acute load, chronic load and incidence rate: quantitative tools to prevent injuries."},
          es:{tag:"Medicina del Deporte", title:"Control de Carga y Prevención de Lesiones por Sobrecarga", short:"Carga aguda, crónica y tasa de incidencia: herramientas cuantitativas para prevenir lesiones."},
          fr:{tag:"Médecine du Sport", title:"Gestion de la Charge et Prévention des Blessures", short:"Charge aiguë, chronique et taux d'incidence : des outils quantitatifs pour prévenir les blessures."}},
    title:"Controle de Carga e Prevenção de Lesões por Sobrecarga", short:"Carga aguda, carga crônica e taxa de incidência: as ferramentas quantitativas para prevenir lesões antes que aconteçam.",
    priceNum:397, price:"R$ 397,00", hours:"5", lessons:"16", students:"530", rating:"4,7", ratingCount:"88",
    video:"https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
    modules:[
      {title:"Módulo 1 · Medindo exposição e risco", lessons:[{n:"Taxa de incidência por hora de exposição", d:"6:45"},{n:"Erros comuns de denominador", d:"5:30"}]},
      {title:"Módulo 2 · Carga aguda:crônica na prática", lessons:[{n:"Calculando RPE × tempo", d:"7:20"},{n:"Ajustando periodização por categoria", d:"8:05"}]},
    ]
  }
];

const FREE = [
  {tag:"Medicina Esportiva", title:"Introdução ao Consenso IOC 2020", desc:"Panorama das definições padronizadas de lesão e doença. Inclui videoaula.",
   kinds:["video","pdf"], minutes:35, img:"assets/img/free-consenso-ioc.jpg", course:"medicina-esporte-ortopedista",
   i18n:{en:{tag:"Sports Medicine", title:"Introduction to the IOC 2020 Consensus", desc:"An overview of standardized injury and illness definitions. Includes video lesson."},
         es:{tag:"Medicina del Deporte", title:"Introducción al Consenso COI 2020", desc:"Panorama de las definiciones estandarizadas de lesión y enfermedad. Incluye videoclase."},
         fr:{tag:"Médecine du Sport", title:"Introduction au Consensus CIO 2020", desc:"Un panorama des définitions standardisées de blessure et de maladie. Inclut une vidéo."}}},
  {tag:"Ortopedia", title:"Time-Loss: Classificando Gravidade na Prática", desc:"Como aplicar a classificação de 0–7, 8–28 e >28 dias no seu prontuário.",
   kinds:["video","pdf"], minutes:40, img:"assets/img/free-time-loss.jpg", course:"medicina-esporte-ortopedista",
   i18n:{en:{tag:"Orthopedics", title:"Time-loss: Classifying Severity in Practice", desc:"How to apply the 0–7, 8–28 and >28 day classification in your records."},
         es:{tag:"Ortopedia", title:"Time-Loss: Clasificando la Gravedad en la Práctica", desc:"Cómo aplicar la clasificación de 0–7, 8–28 y >28 días en tu historial."},
         fr:{tag:"Orthopédie", title:"Time-loss : Classer la Gravité en Pratique", desc:"Comment appliquer la classification 0–7, 8–28 et >28 jours dans votre dossier."}}},
  {tag:"Cardiologia Esportiva", title:"Reconhecendo PCR em Atletas Jovens", desc:"Sinais de alerta, principais causas e a janela crítica dos primeiros minutos.",
   kinds:["video","quiz"], minutes:30, img:"assets/img/free-pcr.jpg", course:"medicina-esporte-ortopedista",
   i18n:{en:{tag:"Sports Cardiology", title:"Recognizing Cardiac Arrest in Young Athletes", desc:"Warning signs, leading causes, and the critical first minutes."},
         es:{tag:"Cardiología del Deporte", title:"Reconociendo el Paro Cardíaco en Atletas Jóvenes", desc:"Señales de alerta, causas principales y la ventana crítica de los primeros minutos."},
         fr:{tag:"Cardiologie du Sport", title:"Reconnaître l'Arrêt Cardiaque chez les Jeunes Athlètes", desc:"Signes d'alerte, causes principales et la fenêtre critique des premières minutes."}}},
  {tag:"Farmacologia Antidoping", title:"Lista WADA 2024: O Básico para o Consultório", desc:"Substâncias comumente prescritas por ortopedistas que estão na lista proibida.",
   kinds:["video","pdf"], minutes:25, img:"assets/img/free-wada.jpg", course:"farmacologia-antidoping",
   i18n:{en:{tag:"Anti-Doping Pharmacology", title:"WADA 2024 List: The Basics for Your Office", desc:"Substances commonly prescribed by orthopedists that are on the prohibited list."},
         es:{tag:"Farmacología Antidopaje", title:"Lista WADA 2024: Lo Básico para la Consulta", desc:"Sustancias comúnmente prescritas por ortopedistas que están en la lista prohibida."},
         fr:{tag:"Pharmacologie Antidopage", title:"Liste WADA 2024 : L'Essentiel pour le Cabinet", desc:"Substances couramment prescrites par les orthopédistes qui figurent sur la liste interdite."}}},
];

/* Avaliações exibidas na aba "Avaliações" da página do curso (conteúdo gerado por usuários — fica no idioma original). */
const REVIEWS = {
  "medicina-esporte-ortopedista":[
    {who:"Dra. Marina Petraglia", role:"Ortopedista do Esporte", stars:5, when:"12/08/2026", text:"O módulo de time-loss mudou a forma como documento lesões no clube. Didática direta, sem enrolação."},
    {who:"Dr. Henrique Farah", role:"Ortopedista", stars:5, when:"30/07/2026", text:"A parte de doping vale o curso inteiro. Já evitei duas prescrições problemáticas desde que terminei."},
    {who:"Dr. Thomaz Villela", role:"Médico do Esporte", stars:4, when:"02/07/2026", text:"Excelente conteúdo sobre PCR em campo. Gostaria de mais simulações práticas, mas o material é muito bom."},
  ],
  "farmacologia-antidoping":[
    {who:"Dra. Camila Roriz", role:"Médica do Esporte", stars:5, when:"18/06/2026", text:"Referência rápida que uso toda semana no consultório."},
  ],
  "controle-de-carga-prevencao":[
    {who:"Dr. Bruno Katayama", role:"Fisioterapeuta Esportivo", stars:5, when:"05/05/2026", text:"As planilhas de carga aguda:crônica foram direto para a rotina das categorias de base."},
  ],
};