const STORAGE_KEY = "revisa:sessions:v1";
const LANGUAGE_KEY = "revisa:language";

const copy = {
  pt: {
    localMode:"MVP local", history:"Histórico", eyebrow:"REVISÃO ATIVA · SEM CONTA",
    heroTitle:'Transforme matéria em <span>revisão que você realmente faz.</span>',
    heroText:"Cole seus próprios apontamentos. O Revisa organiza uma sessão curta com pontos-chave, flashcards e um mini-quiz para você sair do modo leitura e começar a lembrar.",
    benefit1:"✓ Funciona sem conta", benefit2:"✓ Seus textos ficam neste navegador", benefit3:"✓ Sessão pronta em segundos",
    sessionPreview:"SESSÃO DE 10 MIN", previewTitle:"Revisar antes de esquecer", preview1:"Pontos-chave", preview2:"Flashcards", preview3:"Mini-quiz",
    step1:"1 · SUA MATÉRIA", composerTitle:"O que você precisa revisar?", useExample:"Usar exemplo", subject:"Matéria / tema", goal:"Objetivo",
    notes:"Seus apontamentos", notesHelp:"quanto mais específico, melhor a revisão", privacyNote:"Nada é enviado para um provedor externo neste MVP.",
    buildReview:"Montar minha revisão", studyGuide:"COMO USAR BEM", guideTitle:"Não cole o livro inteiro.",
    tip1:"Use o conteúdo que realmente entrou na aula ou na sua lista de estudo.",
    tip2:"Misture conceitos, datas, definições e relações importantes.",
    tip3:"Depois da sessão, marque o que errou e revise de novo amanhã.",
    ad:"PUBLICIDADE", adNote:"espaço reservado · não interfere na revisão", step2:"2 · SUA SESSÃO", copySession:"Copiar sessão", newSession:"Nova revisão",
    progressKey:"Pontos-chave", progressCards:"Flashcards", progressQuiz:"Perguntas", keyIdeas:"Pontos-chave", readFirst:"Leia uma vez, depois esconda",
    flashcards:"Flashcards", tapCards:"Clique para virar", quiz:"Mini-quiz", quizHint:"Responda sem olhar acima",
    tomorrowEyebrow:"PRÓXIMA REVISÃO", tomorrowTitle:"Volte amanhã para o que você errou.",
    tomorrowText:"O histórico local guarda esta sessão neste dispositivo para você retomar sem recriar tudo.",
    saveSession:"Salvar no histórico", whyEyebrow:"POR QUE O REVISA", whyTitle:"Ler parece estudo. Recuperar da memória é o que mostra se ficou.",
    whyText:"O MVP não tenta substituir professor, curso ou material. Ele só reduz a distância entre ter anotações e conseguir se testar sobre elas.",
    historyEyebrow:"NESTE DISPOSITIVO", historyTitle:"Revisões salvas", historyNote:"O histórico fica somente neste navegador.", clearHistory:"Limpar histórico",
    footerText:"Ferramenta de apoio à revisão. Confira sempre o conteúdo na sua fonte original.", about:"Sobre", privacy:"Privacidade", terms:"Termos",
    goalTest:"Prova / avaliação", goalClass:"Acompanhar aula", goalMemory:"Memorizar conceitos", goalInterview:"Entrevista / apresentação",
    emptyHistory:"Nenhuma revisão salva ainda.", open:"Abrir", saved:"Revisão salva.", copied:"Sessão copiada.",
    needMore:"Adicione um pouco mais de conteúdo para montar uma revisão útil.", generated:"Sessão criada a partir dos seus próprios apontamentos.",
    question:"PERGUNTA", answer:"RESPOSTA", score:"Acertos", clearDone:"Histórico limpo.", alreadySaved:"Esta revisão já está no histórico."
  },
  en: {
    localMode:"Local MVP", history:"History", eyebrow:"ACTIVE REVIEW · NO ACCOUNT",
    heroTitle:'Turn your notes into <span>a review session you will actually do.</span>',
    heroText:"Paste your own notes. Revisa organizes a short session with key points, flashcards and a mini-quiz so you stop only rereading and start recalling.",
    benefit1:"✓ Works without an account", benefit2:"✓ Your text stays in this browser", benefit3:"✓ Session ready in seconds",
    sessionPreview:"10 MIN SESSION", previewTitle:"Review before you forget", preview1:"Key points", preview2:"Flashcards", preview3:"Mini-quiz",
    step1:"1 · YOUR MATERIAL", composerTitle:"What do you need to review?", useExample:"Use example", subject:"Subject / topic", goal:"Goal",
    notes:"Your notes", notesHelp:"the more specific, the better the review", privacyNote:"Nothing is sent to an external provider in this MVP.",
    buildReview:"Build my review", studyGuide:"HOW TO USE IT", guideTitle:"Do not paste the whole book.",
    tip1:"Use the content that actually appeared in class or in your study list.",
    tip2:"Mix concepts, dates, definitions and important relationships.",
    tip3:"After the session, mark what you missed and review it again tomorrow.",
    ad:"ADVERTISEMENT", adNote:"reserved space · does not interrupt review", step2:"2 · YOUR SESSION", copySession:"Copy session", newSession:"New review",
    progressKey:"Key points", progressCards:"Flashcards", progressQuiz:"Questions", keyIdeas:"Key points", readFirst:"Read once, then hide it",
    flashcards:"Flashcards", tapCards:"Click to flip", quiz:"Mini-quiz", quizHint:"Answer without looking above",
    tomorrowEyebrow:"NEXT REVIEW", tomorrowTitle:"Come back tomorrow for what you missed.",
    tomorrowText:"Local history keeps this session on this device so you can resume without rebuilding it.",
    saveSession:"Save to history", whyEyebrow:"WHY REVISA", whyTitle:"Reading feels like studying. Recall shows what actually stuck.",
    whyText:"The MVP does not replace teachers, courses or source material. It only shortens the distance between having notes and testing yourself on them.",
    historyEyebrow:"ON THIS DEVICE", historyTitle:"Saved reviews", historyNote:"History stays only in this browser.", clearHistory:"Clear history",
    footerText:"Review support tool. Always verify content against your original source.", about:"About", privacy:"Privacy", terms:"Terms",
    goalTest:"Test / exam", goalClass:"Follow a class", goalMemory:"Memorize concepts", goalInterview:"Interview / presentation",
    emptyHistory:"No saved reviews yet.", open:"Open", saved:"Review saved.", copied:"Session copied.",
    needMore:"Add a little more content to build a useful review.", generated:"Session created from your own notes.",
    question:"QUESTION", answer:"ANSWER", score:"Score", clearDone:"History cleared.", alreadySaved:"This review is already in history."
  }
};

let lang = localStorage.getItem(LANGUAGE_KEY) === "en" ? "en" : "pt";
let currentSession = null;
let toastTimer = null;

function $(selector){ return document.querySelector(selector); }
function t(key){ return copy[lang][key] || key; }

function escapeHtml(value){
  return String(value == null ? "" : value).replace(/[&<>"']/g, function(char){
    return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[char];
  });
}

function normalizeText(value){
  return String(value || "")
    .replace(/\r/g,"")
    .replace(/[ \t]+/g," ")
    .replace(/\n{3,}/g,"\n\n")
    .trim();
}

function splitSentences(text){
  const lines = normalizeText(text).split(/\n+/).map(function(x){ return x.trim(); }).filter(Boolean);
  let sentences = [];
  lines.forEach(function(line){
    line.split(/(?<=[.!?])\s+/).forEach(function(part){
      const clean = part.trim();
      if(clean.length >= 18) sentences.push(clean);
    });
  });
  return sentences.length ? sentences : lines;
}

function unique(items){
  return Array.from(new Set(items.map(function(x){ return x.trim(); }).filter(Boolean)));
}

function shorten(text,max){
  const limit = max || 180;
  const clean = String(text || "").trim();
  if(clean.length <= limit) return clean;
  return clean.slice(0,limit).replace(/\s+\S*$/,"").trim() + "…";
}

function keywordCandidates(text){
  const stop = new Set(["para","com","sem","uma","uns","das","dos","que","por","mais","como","entre","sobre","quando","onde","esse","essa","este","esta","isso","isto","tambem","também","the","and","for","with","from","that","this","these","those","into","your","you","are","was","were","have","has"]);
  const words = normalizeText(text).toLocaleLowerCase(lang === "pt" ? "pt-BR" : "en")
    .normalize("NFD").replace(/[\u0300-\u036f]/g,"")
    .match(/[a-z0-9]{4,}/g) || [];
  const counts = new Map();
  words.forEach(function(word){
    if(!stop.has(word)) counts.set(word,(counts.get(word) || 0) + 1);
  });
  return Array.from(counts.entries()).sort(function(a,b){
    return b[1]-a[1] || b[0].length-a[0].length;
  }).map(function(row){ return row[0]; }).slice(0,12);
}

function makeFlashcard(sentence){
  const colon = sentence.match(/^([^:]{3,70}):\s*(.+)$/);
  if(colon) return { q:colon[1].trim()+"?", a:shorten(colon[2],170) };

  const dash = sentence.match(/^([^–—-]{3,70})\s*[–—-]\s*(.+)$/);
  if(dash) return { q:dash[1].trim()+"?", a:shorten(dash[2],170) };

  const terms = keywordCandidates(sentence);
  const keyword = terms[0];
  if(keyword){
    return {
      q: lang === "pt" ? "O que você precisa lembrar sobre “"+keyword+"”?" : "What do you need to remember about “"+keyword+"”?",
      a: shorten(sentence,170)
    };
  }
  return {
    q: lang === "pt" ? "Qual é a ideia central deste ponto?" : "What is the main idea in this point?",
    a: shorten(sentence,170)
  };
}

function makeQuiz(points){
  const allWords = keywordCandidates(points.join(" "));
  return points.slice(0,4).map(function(point,index){
    const terms = keywordCandidates(point);
    const answer = terms[0] || allWords[index] || (lang === "pt" ? "conceito" : "concept");
    const distractors = unique(allWords.filter(function(x){ return x !== answer; })).slice(index,index+3);
    while(distractors.length < 3){
      distractors.push((lang === "pt" ? "alternativa " : "option ") + String(distractors.length+1));
    }
    const options = [answer].concat(distractors.slice(0,3));
    const rotate = index % options.length;
    return {
      q: lang === "pt" ? "Qual termo aparece ligado a este ponto: “"+shorten(point,96)+"”?" : "Which term is connected to this point: “"+shorten(point,96)+"”?",
      answer:answer,
      options:options.slice(rotate).concat(options.slice(0,rotate))
    };
  });
}

function buildSession(subject,goal,notes){
  const sentences = unique(splitSentences(notes));
  const keyPoints = sentences.slice(0,6).map(function(x){ return shorten(x,190); });
  const cards = keyPoints.slice(0,6).map(makeFlashcard);
  const quizSeed = keyPoints.length >= 4 ? keyPoints : keyPoints.concat(sentences).slice(0,4);
  return {
    id:"review-"+Date.now(),
    subject:String(subject || "").trim(),
    goal:goal,
    notes:normalizeText(notes),
    keyPoints:keyPoints,
    cards:cards,
    quiz:makeQuiz(quizSeed),
    createdAt:new Date().toISOString()
  };
}

function showToast(message){
  const toast = $("#toast");
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(function(){ toast.classList.remove("show"); },2200);
}

function applyLanguage(){
  document.documentElement.lang = lang === "pt" ? "pt-BR" : "en";
  document.querySelectorAll("[data-i18n]").forEach(function(el){
    const value = t(el.dataset.i18n);
    if(value.indexOf("<span>") >= 0) el.innerHTML = value;
    else el.textContent = value;
  });
  document.querySelectorAll("[data-i18n-option]").forEach(function(el){
    el.textContent = t(el.dataset.i18nOption);
  });
  $("#language-toggle").textContent = lang === "pt" ? "EN" : "PT-BR";
  localStorage.setItem(LANGUAGE_KEY,lang);
  renderHistory();
  if(currentSession) renderSession(currentSession,false);
}

function renderSession(session,scroll){
  currentSession = session;
  $("#result-title").textContent = session.subject;
  $("#result-summary").textContent = t("generated");
  $("#count-key").textContent = session.keyPoints.length;
  $("#count-cards").textContent = session.cards.length;
  $("#count-quiz").textContent = session.quiz.length;

  $("#key-points").innerHTML = session.keyPoints.map(function(point,index){
    return '<div class="key-point"><b>'+String(index+1).padStart(2,"0")+'</b><p>'+escapeHtml(point)+'</p></div>';
  }).join("");

  $("#flashcards").innerHTML = session.cards.map(function(card,index){
    return '<button class="flashcard" type="button" data-card="'+index+'">'+
      '<small>'+escapeHtml(t("question"))+'</small>'+
      '<strong class="question">'+escapeHtml(card.q)+'</strong>'+
      '<div class="answer"><small>'+escapeHtml(t("answer"))+'</small><p>'+escapeHtml(card.a)+'</p></div>'+
      '</button>';
  }).join("");

  $("#quiz-list").innerHTML = session.quiz.map(function(item,index){
    const options = item.options.map(function(option){
      return '<button type="button" class="quiz-option" data-answer="'+escapeHtml(option)+'">'+escapeHtml(option)+'</button>';
    }).join("");
    return '<article class="quiz-item" data-quiz="'+index+'"><strong>'+escapeHtml(item.q)+'</strong><div class="quiz-options">'+options+'</div></article>';
  }).join("");

  $("#quiz-score").textContent = t("quizHint");
  $("#result").hidden = false;
  if(scroll !== false) $("#result").scrollIntoView({behavior:"smooth",block:"start"});
}

function readHistory(){
  try{
    const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    return Array.isArray(parsed) ? parsed : [];
  }catch(error){
    return [];
  }
}

function writeHistory(items){
  localStorage.setItem(STORAGE_KEY,JSON.stringify(items.slice(0,12)));
}

function saveCurrent(){
  if(!currentSession) return;
  const items = readHistory();
  if(items.some(function(x){ return x.id === currentSession.id; })){
    showToast(t("alreadySaved"));
    return;
  }
  writeHistory([currentSession].concat(items));
  renderHistory();
  showToast(t("saved"));
}

function renderHistory(){
  const host = $("#history-list");
  if(!host) return;
  const items = readHistory();
  if(!items.length){
    host.innerHTML = '<div class="empty-history">'+escapeHtml(t("emptyHistory"))+'</div>';
    return;
  }
  host.innerHTML = items.map(function(item){
    const label = lang === "pt" ? "pontos" : "points";
    return '<article class="history-item"><div><strong>'+escapeHtml(item.subject || "—")+'</strong>'+
      '<span>'+new Date(item.createdAt).toLocaleDateString(lang === "pt" ? "pt-BR" : "en-US")+' · '+String((item.keyPoints || []).length)+' '+label+'</span></div>'+
      '<button class="ghost small" type="button" data-open-session="'+escapeHtml(item.id)+'">'+escapeHtml(t("open"))+'</button></article>';
  }).join("");
}

function sessionText(session){
  const lines = [session.subject,"",t("keyIdeas").toUpperCase()];
  session.keyPoints.forEach(function(point,index){ lines.push(String(index+1)+". "+point); });
  lines.push("",t("flashcards").toUpperCase());
  session.cards.forEach(function(card,index){
    lines.push(String(index+1)+". "+card.q);
    lines.push("→ "+card.a);
  });
  return lines.join("\n");
}

$("#notes").addEventListener("input",function(event){
  $("#notes-count").textContent = event.target.value.length;
});

$("#example-button").addEventListener("click",function(){
  $("#subject").value = lang === "pt" ? "Revolução Francesa" : "French Revolution";
  $("#notes").value = lang === "pt"
    ? "A Revolução Francesa começou em 1789 e teve como contexto a crise financeira da monarquia, desigualdades sociais e influência iluminista. Estados Gerais: assembleia convocada por Luís XVI para discutir a crise fiscal. Terceiro Estado: grupo que representava a maior parte da população e exigia maior participação política. Queda da Bastilha: ocorreu em 14 de julho de 1789 e se tornou símbolo da ruptura com o Antigo Regime. Declaração dos Direitos do Homem e do Cidadão: defendia liberdade e igualdade jurídica. O período do Terror foi associado à radicalização revolucionária e ao Comitê de Salvação Pública."
    : "The French Revolution began in 1789 amid a financial crisis, social inequality and Enlightenment influence. Estates-General: assembly called by Louis XVI to discuss the fiscal crisis. Third Estate: represented most of the population and demanded greater political participation. Storming of the Bastille: happened on July 14, 1789 and became a symbol of the break with the Old Regime. Declaration of the Rights of Man and of the Citizen: defended liberty and legal equality. The Reign of Terror was linked to revolutionary radicalization and the Committee of Public Safety.";
  $("#notes-count").textContent = $("#notes").value.length;
  $("#notes").focus();
});

$("#review-form").addEventListener("submit",function(event){
  event.preventDefault();
  const subject = $("#subject").value.trim();
  const notes = $("#notes").value.trim();
  if(subject.length < 2 || notes.length < 80 || splitSentences(notes).length < 3){
    showToast(t("needMore"));
    $("#notes").focus();
    return;
  }
  renderSession(buildSession(subject,$("#goal").value,notes),true);
});

document.addEventListener("click",function(event){
  const flash = event.target.closest(".flashcard");
  if(flash){
    flash.classList.toggle("flipped");
    return;
  }

  const option = event.target.closest(".quiz-option");
  if(option){
    const itemEl = option.closest(".quiz-item");
    const index = Number(itemEl.dataset.quiz);
    const item = currentSession && currentSession.quiz[index];
    if(!item) return;

    itemEl.querySelectorAll(".quiz-option").forEach(function(button){
      button.disabled = true;
      if(button.dataset.answer === item.answer) button.classList.add("correct");
      else if(button === option) button.classList.add("wrong");
    });

    let answered = 0;
    let correct = 0;
    document.querySelectorAll(".quiz-item").forEach(function(row){
      if(row.querySelector(".quiz-option:disabled")){
        answered += 1;
        if(!row.querySelector(".quiz-option.wrong")) correct += 1;
      }
    });
    $("#quiz-score").textContent = t("score")+": "+correct+"/"+answered;
    return;
  }

  const open = event.target.closest("[data-open-session]");
  if(open){
    const item = readHistory().find(function(x){ return x.id === open.dataset.openSession; });
    if(item){
      renderSession(item,true);
      $("#history-dialog").close();
    }
  }
});

$("#save-session").addEventListener("click",saveCurrent);

$("#new-session").addEventListener("click",function(){
  $("#result").hidden = true;
  currentSession = null;
  $("#subject").focus();
  const top = $("#review-form").getBoundingClientRect().top + window.scrollY - 90;
  window.scrollTo({top:top,behavior:"smooth"});
});

$("#copy-session").addEventListener("click",async function(){
  if(!currentSession) return;
  const text = sessionText(currentSession);
  try{
    await navigator.clipboard.writeText(text);
    showToast(t("copied"));
  }catch(error){
    showToast(text.slice(0,80));
  }
});

$("#language-toggle").addEventListener("click",function(){
  lang = lang === "pt" ? "en" : "pt";
  applyLanguage();
});

$("#history-toggle").addEventListener("click",function(){
  $("#history-dialog").showModal();
  renderHistory();
});

$("#history-close").addEventListener("click",function(){ $("#history-dialog").close(); });

$("#history-clear").addEventListener("click",function(){
  localStorage.removeItem(STORAGE_KEY);
  renderHistory();
  showToast(t("clearDone"));
});

applyLanguage();
renderHistory();