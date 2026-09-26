
const app = document.getElementById("app");
const tabs = [...document.querySelectorAll(".tab")];
const state = JSON.parse(localStorage.getItem("ms-study-state") || '{"answered":0,"correct":0,"missed":[],"completedModules":[]}');

function save(){ localStorage.setItem("ms-study-state", JSON.stringify(state)); }

function setView(view){
  tabs.forEach(t => t.classList.toggle("active", t.dataset.view===view));
  if(view==="dashboard") renderDashboard();
  if(view==="modules") renderModules();
  if(view==="equations") renderEquations();
  if(view==="quiz") renderQuizHome();
  if(view==="missed") renderMissed();
}
tabs.forEach(t => t.addEventListener("click",()=>setView(t.dataset.view)));

document.getElementById("themeBtn").addEventListener("click",()=>{
  document.body.classList.toggle("dark");
  localStorage.setItem("ms-theme",document.body.classList.contains("dark")?"dark":"light");
});
if(localStorage.getItem("ms-theme")==="dark") document.body.classList.add("dark");

function renderDashboard(){
  const pct = state.answered ? Math.round(state.correct/state.answered*100) : 0;
  app.innerHTML = `
    <section class="grid">
      <div class="card"><h3>Questions answered</h3><div class="stat">${state.answered}</div></div>
      <div class="card"><h3>Accuracy</h3><div class="stat">${pct}%</div></div>
      <div class="card"><h3>Missed concepts</h3><div class="stat">${state.missed.length}</div></div>
      <div class="card"><h3>Modules reviewed</h3><div class="stat">${state.completedModules.length}/8</div></div>
    </section>
    <div class="spacer"></div>
    <section class="card">
      <h2>Study plan</h2>
      <p>Review a module, inspect its matching equation-card relationships, then run a mixed quiz. Missed questions are automatically saved for targeted review.</p>
      <div class="progress"><div style="width:${state.completedModules.length/8*100}%"></div></div>
    </section>
    <div class="spacer"></div>
    <section class="card">
      <h2>High-value recognition chains</h2>
      <div class="grid">
        <div><span class="pill">Direct Tx → Rx</span><p>One-way link → 1/R²</p></div>
        <div><span class="pill">Radar reflection</span><p>Two-way link → 1/R⁴</p></div>
        <div><span class="pill">Opening target</span><p>Ṙ &gt; 0 → negative Doppler</p></div>
        <div><span class="pill">EO pixel geometry</span><p>IFOV ≈ Xd/f; footprint ≈ H·IFOV</p></div>
      </div>
    </section>`;
}

function renderModules(){
  app.innerHTML = `
    <div class="grid">
      <section class="card">
        <h2>Modules</h2>
        <div class="module-list">
          ${MODULES.map(m=>`<button class="module-btn" onclick="renderModule(${m.id})"><strong>Module ${m.id}: ${m.title}</strong><span class="muted">${m.summary}</span></button>`).join("")}
        </div>
      </section>
      <section id="moduleDetail" class="card">
        <h2>Select a module</h2>
        <p class="muted">Choose a module to review concepts and equations.</p>
      </section>
    </div>`;
}

window.renderModule = function(id){
  const m=MODULES.find(x=>x.id===id);
  document.getElementById("moduleDetail").innerHTML=`
    <h2>Module ${m.id}: ${m.title}</h2>
    <p>${m.summary}</p>
    <h3>Required concepts</h3>
    <ul>${m.concepts.map(c=>`<li>${c}</li>`).join("")}</ul>
    <h3>Equation-card connections</h3>
    ${m.equations.length?m.equations.map(e=>`<div class="eq">${e.eq}</div><p><strong>${e.name}:</strong> ${e.when}</p>`).join(""):"<p>No primary equation-card equation is required for this module.</p>"}
    <button class="primary" onclick="markModule(${id})">Mark module reviewed</button>`;
}
window.markModule=function(id){
  if(!state.completedModules.includes(id)) state.completedModules.push(id);
  save(); renderModule(id);
};

function renderEquations(){
  app.innerHTML=`
    <section class="card">
      <h2>Equation-card navigator</h2>
      <p>Use this as a recognition tool: identify the problem type first, then the card.</p>
      <table><thead><tr><th>Page</th><th>Topic</th><th>Key relationships</th></tr></thead>
      <tbody>${EQUATION_CARDS.map(c=>`<tr><td>${c.page}</td><td>${c.title}</td><td>${c.items.map(x=>`<div class="pill">${x}</div>`).join("")}</td></tr>`).join("")}</tbody></table>
    </section>
    <div class="spacer"></div>
    <section class="card">
      <h2>Equations from the review that are not written exactly the same way on the card</h2>
      <div class="eq">σnew = σold (Rnew/Rold)⁴</div>
      <p>The card gives the equivalent fourth-root range-ratio form.</p>
      <div class="eq">Xd ≈ f · IFOV</div>
      <p>Small-angle EO approximation; the card gives the exact inverse-tangent IFOV expression.</p>
      <div class="eq">Ground footprint ≈ H · IFOV</div>
      <p>This small-angle geometry relationship is emphasized in the review but is not explicitly printed in this form on the equation card.</p>
    </section>`;
}

function renderQuizHome(){
  app.innerHTML=`
    <section class="card quiz-box">
      <h2>Practice quiz</h2>
      <p>Choose a mode.</p>
      <div class="row">
        <button class="primary" onclick="startQuiz('mixed')">Mixed 16-question quiz</button>
        <button class="ghost" onclick="startQuiz('missed')">Retry missed questions</button>
      </div>
    </section>`;
}

let currentQuiz=[], qi=0, sessionCorrect=0;
window.startQuiz=function(mode){
  currentQuiz = mode==="missed" && state.missed.length
    ? QUIZ.filter((_,i)=>state.missed.includes(i))
    : [...QUIZ];
  qi=0; sessionCorrect=0; renderQuestion();
}
function renderQuestion(){
  if(qi>=currentQuiz.length){
    app.innerHTML=`<section class="card quiz-box"><h2>Quiz complete</h2><div class="stat">${sessionCorrect}/${currentQuiz.length}</div><p>${Math.round(sessionCorrect/currentQuiz.length*100)}% correct</p><button class="primary" onclick="renderQuizHome()">Back to quiz menu</button></section>`;
    return;
  }
  const q=currentQuiz[qi];
  app.innerHTML=`<section class="card quiz-box">
    <p class="muted">Question ${qi+1} of ${currentQuiz.length} · Module ${q.module}</p>
    <h2>${q.q}</h2>
    <div>${q.a.map((x,i)=>`<button class="choice" onclick="answer(${i})">${String.fromCharCode(65+i)}. ${x}</button>`).join("")}</div>
    <div id="feedback"></div>
  </section>`;
}
window.answer=function(choice){
  const q=currentQuiz[qi];
  const buttons=[...document.querySelectorAll(".choice")];
  buttons.forEach(b=>b.disabled=true);
  const ok=choice===q.correct;
  buttons[q.correct].classList.add("correct");
  if(!ok) buttons[choice].classList.add("incorrect");
  state.answered++;
  const globalIndex=QUIZ.indexOf(q);
  if(ok){
    state.correct++; sessionCorrect++;
    state.missed=state.missed.filter(i=>i!==globalIndex);
  }else if(!state.missed.includes(globalIndex)){
    state.missed.push(globalIndex);
  }
  save();
  document.getElementById("feedback").innerHTML=`<div class="feedback"><strong>${ok?"Correct":"Review this one"}</strong><p>${q.explain}</p><button class="primary" onclick="nextQuestion()">Next</button></div>`;
}
window.nextQuestion=function(){qi++;renderQuestion();}

function renderMissed(){
  const items=state.missed.map(i=>QUIZ[i]);
  app.innerHTML=`<section class="card">
    <h2>Missed concepts</h2>
    ${items.length?items.map(q=>`<div class="card"><span class="pill">Module ${q.module}</span><p><strong>${q.q}</strong></p><p class="muted">${q.explain}</p></div>`).join(""):"<p>No missed questions saved yet.</p>"}
    ${items.length?`<button class="primary" onclick="startQuiz('missed')">Retry missed questions</button>`:""}
  </section>`;
}

renderDashboard();
