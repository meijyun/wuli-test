/* 心智五力站・原型邏輯（無後端，資料只存本機瀏覽器） */
(function(){
"use strict";
const FORCES = window.FIVE_FORCES;
const answers = {}; // qid -> score
let pos = null;     // {fi, qi}
const $ = id => document.getElementById(id);

/* ---------- 分頁切換 ---------- */
document.querySelectorAll(".tabs button").forEach(b=>{
  b.addEventListener("click",()=>{
    document.querySelectorAll(".tabs button").forEach(x=>x.classList.remove("active"));
    document.querySelectorAll(".tab").forEach(x=>x.classList.remove("active"));
    b.classList.add("active");
    $("tab-"+b.dataset.tab).classList.add("active");
    if(b.dataset.tab==="radar") renderRadar();
    if(b.dataset.tab==="resource") renderResources();
  });
});
function goto(tab){
  document.querySelector(`.tabs button[data-tab="${tab}"]`).click();
  window.scrollTo({top:0,behavior:"smooth"});
}

/* ---------- 分頁① 測驗 ---------- */
function doneCount(){ return Object.keys(answers).length; }
function renderPicker(){
  const box = $("force-picker");
  box.innerHTML = "<h2>選一個分測驗開始（每個 6 題）</h2>";
  const grid = document.createElement("div");
  grid.className = "cards";
  FORCES.forEach((f,fi)=>{
    const n = f.questions.filter(q=>answers[q.id]!=null).length;
    const d = document.createElement("div");
    d.className = "force-card";
    d.innerHTML = `<div class="icon">${f.icon}</div><b>${f.name}</b><br><small>${f.def}</small><br><small>${n} / 6 題 ${n===6?"✅":""}</small><br><small>${f.sel}・${f.sdg}</small>`;
    d.addEventListener("click",()=>{ pos={fi,qi:n>=6?0:firstUnanswered(fi)}; renderQuiz(); });
    grid.appendChild(d);
  });
  box.appendChild(grid);
  const all = doneCount();
  const p = document.createElement("p");
  p.className = "hint";
  p.textContent = all===30 ? "30 題都完成了，去分頁②看雷達圖吧！" : `已完成 ${all} / 30 題。作答匿名，請勿填寫真實姓名。`;
  box.appendChild(p);
  if(all===30){
    const btn=document.createElement("button"); btn.textContent="去看雷達圖 →";
    btn.addEventListener("click",()=>goto("radar")); box.appendChild(btn);
  }
}
function firstUnanswered(fi){
  const qs = FORCES[fi].questions;
  for(let i=0;i<qs.length;i++) if(answers[qs[i].id]==null) return i;
  return 0;
}
function renderQuiz(){
  $("force-picker").innerHTML = "";
  $("quiz-box").hidden = false;
  const f = FORCES[pos.fi], q = f.questions[pos.qi];
  $("quiz-progress").textContent = `${f.name}・第 ${pos.qi+1} / 6 題`;
  $("quiz-total").textContent = `總進度 ${doneCount()} / 30`;
  $("quiz-bar").style.width = (doneCount()/30*100)+"%";
  $("quiz-force").textContent = `${f.icon} ${f.name}｜${f.def}`;
  $("quiz-art").innerHTML = (window.Q_ART && window.Q_ART[q.id]) || "";
  $("quiz-tag").textContent = q.tag;
  $("quiz-situation").textContent = q.situation;
  const optBox = $("quiz-options"); optBox.innerHTML = "";
  const labels = ["A","B","C","D"];
  q.options.forEach((op,oi)=>{
    const b = document.createElement("button");
    b.innerHTML = `<b>${labels[oi]}</b>・${op.t}`;
    if(answers[q.id]===op.s) b.classList.add("picked");
    b.addEventListener("click",()=>{
      answers[q.id]=op.s;
      advance();
    });
    optBox.appendChild(b);
  });
}
function advance(){
  const f = FORCES[pos.fi];
  if(pos.qi < f.questions.length-1){ pos.qi++; renderQuiz(); }
  else{
    // 此分測驗結束
    $("quiz-box").hidden = true;
    const next = FORCES.findIndex(ff=>ff.questions.some(q=>answers[q.id]==null));
    renderPicker();
    if(next===-1 && doneCount()===30){ saveResult(); goto("radar"); }
    else if(next!==-1){ pos={fi:next,qi:firstUnanswered(next)}; renderQuiz(); }
  }
}
$("quiz-back").addEventListener("click",()=>{
  if(!pos) return;
  if(pos.qi>0){ pos.qi--; renderQuiz(); }
});
$("quiz-quit").addEventListener("click",()=>{ $("quiz-box").hidden=true; renderPicker(); });

/* ---------- 計分＋雷達圖 ---------- */
function totals(){
  const out = {};
  FORCES.forEach(f=>{
    out[f.id] = f.questions.reduce((a,q)=>a+(answers[q.id]??0),0);
  });
  return out;
}
function band(score){
  if(score>=14) return "高度發展";
  if(score>=10) return "良好發展";
  return "持續培養";
}
function weakest(t){
  let k=FORCES[0].id;
  FORCES.forEach(f=>{ if(t[f.id]<t[k]) k=f.id; });
  return k;
}
function renderRadar(){
  const t = totals(), done = doneCount();
  $("radar-hint").textContent = done<30
    ? `目前完成 ${done} / 30 題，未答以 0 分顯示，完成後再看一次最準。`
    : `完成 30 題！最低分的一力預設為你想加強的候選（分頁③可改）。`;
  drawRadar(t);
  const box = $("score-cards"); box.innerHTML="";
  FORCES.forEach(f=>{
    const s=t[f.id], d=document.createElement("div");
    d.className="score-card";
    d.innerHTML=`<b>${f.icon} ${f.name}</b> ${s}/18・${band(s)}${weakest(t)===f.id&&done===30?"・最需加強":""}<div class="bar"><i style="width:${s/18*100}%"></i></div><small>${f.def}</small>`;
    box.appendChild(d);
  });
  renderTeacher();
}
function drawRadar(t){
  const cv=$("radar"), ctx=cv.getContext("2d");
  const cx=260, cy=210, R=150, n=5;
  ctx.clearRect(0,0,cv.width,cv.height);
  ctx.font="15px serif"; ctx.textAlign="center";
  // 三圈底圖 6/12/18
  [6,12,18].forEach(level=>{
    ctx.beginPath();
    for(let i=0;i<n;i++){
      const a=-Math.PI/2+i*2*Math.PI/n, r=R*level/18;
      const x=cx+Math.cos(a)*r, y=cy+Math.sin(a)*r;
      i?ctx.lineTo(x,y):ctx.moveTo(x,y);
    }
    ctx.closePath(); ctx.strokeStyle="#d8cbae"; ctx.stroke();
  });
  // 軸線＋標籤
  FORCES.forEach((f,i)=>{
    const a=-Math.PI/2+i*2*Math.PI/n;
    ctx.beginPath(); ctx.moveTo(cx,cy);
    ctx.lineTo(cx+Math.cos(a)*R, cy+Math.sin(a)*R);
    ctx.strokeStyle="#d8cbae"; ctx.stroke();
    const lx=cx+Math.cos(a)*(R+52), ly=cy+Math.sin(a)*(R+34);
    ctx.fillStyle="#3e3a32";
    ctx.fillText(`${f.icon}${f.name} ${t[f.id]}/18`, lx, ly);
  });
  // 數據點
  FORCES.forEach((f,i)=>{
    const a=-Math.PI/2+i*2*Math.PI/n, r=R*(t[f.id]/18);
    const x=cx+Math.cos(a)*r, y=cy+Math.sin(a)*r;
    ctx.fillStyle="#4a7c59";
    ctx.beginPath(); ctx.arc(x,y,5,0,7); ctx.fill();
  });
  // 數據多邊形
  FORCES.forEach((f,i)=>{
    const a=-Math.PI/2+i*2*Math.PI/n, r=R*(t[f.id]/18);
    const x=cx+Math.cos(a)*r, y=cy+Math.sin(a)*r;
    i?ctx.lineTo(x,y):ctx.moveTo(x,y);
  });
  ctx.closePath();
  ctx.fillStyle="rgba(74,124,89,.25)"; ctx.fill();
  ctx.strokeStyle="#4a7c59"; ctx.lineWidth=2; ctx.stroke();
}

/* ---------- 匿名代碼・存檔・老師專區 ---------- */
function getCode(){
  let c = localStorage.getItem("wuli_code");
  if(!c){ c="WULI-"+Math.random().toString(36).slice(2,6).toUpperCase(); localStorage.setItem("wuli_code",c); }
  return c;
}
$("btn-code").addEventListener("click",()=>{ alert("你的匿名代碼："+getCode()+"\n（繳交給老師請只給這個代碼，不要寫名字）"); });
function saveResult(){
  const t=totals();
  const rec={code:getCode(), time:new Date().toISOString().slice(0,16).replace("T"," "), ...t};
  const arr=JSON.parse(localStorage.getItem("wuli_results")||"[]");
  arr.push(rec); localStorage.setItem("wuli_results",JSON.stringify(arr));
}
$("btn-json").addEventListener("click",()=>{
  const data={code:getCode(), totals:totals(), answers, time:new Date().toISOString()};
  const blob=new Blob([JSON.stringify(data,null,2)],{type:"application/json"});
  const a=document.createElement("a");
  a.href=URL.createObjectURL(blob); a.download=`心智五力_${data.code}.json`; a.click();
});
$("btn-print").addEventListener("click",()=>window.print());
$("btn-csv").addEventListener("click",()=>{
  const arr=JSON.parse(localStorage.getItem("wuli_results")||"[]");
  if(!arr.length){ alert("此裝置尚無紀錄"); return; }
  const head="code,time,focus,grit,burst,steady,solo";
  const rows=arr.map(r=>[r.code,r.time,r.focus,r.grit,r.burst,r.steady,r.solo].join(","));
  const blob=new Blob(["\uFEFF"+head+"\n"+rows.join("\n")],{type:"text/csv"});
  const a=document.createElement("a");
  a.href=URL.createObjectURL(blob); a.download="心智五力_本機結果.csv"; a.click();
});
$("btn-clear").addEventListener("click",()=>{
  if(confirm("確定清空此裝置的所有作答紀錄？")){
    localStorage.removeItem("wuli_results"); renderTeacher();
  }
});
function renderTeacher(){
  const arr=JSON.parse(localStorage.getItem("wuli_results")||"[]");
  const tb=$("teacher-table");
  tb.innerHTML="<tr><th>匿名代碼</th><th>時間</th><th>專注</th><th>恆毅</th><th>爆發</th><th>穩定</th><th>孤獨</th></tr>"
    + arr.map(r=>`<tr><td>${r.code}</td><td>${r.time}</td><td>${r.focus}</td><td>${r.grit}</td><td>${r.burst}</td><td>${r.steady}</td><td>${r.solo}</td></tr>`).join("");
}

/* ---------- 分頁③ 21 天計畫 ---------- */
const PLAN_SEED = {
  focus:{w:["覺察喜歡","靠近所愛","分享喜悅"],tasks:["番茄鐘 25 分鐘做喜歡的事","整理「喜歡清單」並靠近一項","睡前寫 3 行投入日記","為喜歡的事清出桌面 10 分鐘","問一位高手他的入門方法","把大目標拆成 3 小關","本週跟朋友分享一次進步"]},
  grit:{w:["寫下想要","撐過卡關","留下收穫"],tasks:["寫下目標＋放棄的遺憾","每天固定 30 分鐘進度","卡關時換一種方法試 3 天","找一個榜樣拆解 3 步驟","每週回顧一次調整","完成一半時犒賞自己","把收穫寫成 3 條"]},
  burst:{w:["準備上場","全力發揮","複盤更好"],tasks:["把開場 1 分鐘練 3 遍","找老師預演一次","列出上場 checklist","當天提早 20 分鐘到","上場後記下 1 個亮點","把亮點寫進學習歷程","下次升級一個小環節"]},
  steady:{w:["認識訊號","安定步驟","復原收尾"],tasks:["寫下我的壓力訊號 3 個","練一套 2 分鐘呼吸法","考前一晚照表操課","每天固定睡眠時間","找一個可求助的人","每週整理一次情緒日記","把挫折寫成 1 句意義"]},
  solo:{w:["聽見自己","清楚表達","為選擇負責"],tasks:["寫下我的想法 100 字","查 1 份資料支持想法","用利弊表比較選項","清楚表達一次並接受結果","問 1 位不同立場的人","記錄一次「沒跟風」的經驗","為選擇寫下負責方式"]}
};
(function initFocus(){
  const sel=$("plan-focus");
  FORCES.forEach(f=>{ const o=document.createElement("option"); o.value=f.id; o.textContent=`${f.icon} ${f.name}（${f.def}）`; sel.appendChild(o); });
})();
$("profile-form").addEventListener("submit",e=>{
  e.preventDefault();
  const fd=new FormData(e.target);
  const t=totals(), focusId=fd.get("focus")||weakest(t);
  const f=FORCES.find(x=>x.id===focusId), seed=PLAN_SEED[focusId];
  const plan={code:getCode(),grade:fd.get("grade"),gender:fd.get("gender"),
    interest:fd.get("interest")||"（未填）",strength:fd.get("strength")||"（未填）",
    focus:f.name, weeks:seed.w, tasks:seed.tasks};
  localStorage.setItem("wuli_plan",JSON.stringify(plan));
  const out=$("plan-out");
  out.innerHTML=`<h3>${f.icon} 我的 21 天・加強「${f.name}」</h3>
    <p>${fd.get("grade")}｜興趣：${plan.interest}｜專長：${plan.strength}｜${f.def}</p>`
    + seed.w.map((w,i)=>`<div class="week"><b>WEEK${i+1}・${w}</b><p>${tipFor(focusId,i)}</p></div>`).join("")
    + `<p class="hint">每天小任務 7 選 2：請到分頁④勾選。計畫已存在此裝置（匿名）。</p>`;
});
function tipFor(fid,week){
  const m={
    focus:["先發現什麼事讓你眼睛發亮。","每天靠近它一點點。","把喜歡說出來，變成力量。"],
    grit:["把想要寫清楚。","卡關是正常的，換方法再試。","收穫要留下來。"],
    burst:["機會來之前先練好。","上場就全力以赴。","每次都比上次好一點。"],
    steady:["先看見自己的狀態。","有步驟就不怕。","走過低潮會留下東西。"],
    solo:["先聽見自己的聲音。","清楚說出來。","選了就負責到底。"]
  };
  return m[fid][week];
}

/* ---------- 分頁④ 資源 ---------- */
function renderResources(){
  const plan=JSON.parse(localStorage.getItem("wuli_plan")||"null");
  const box=$("resource-list"); box.innerHTML="";
  const order = plan ? [FORCES.find(f=>f.name===plan.focus),...FORCES.filter(f=>f.name!==plan.focus)] : FORCES;
  order.forEach(f=>{
    const seed=PLAN_SEED[f.id];
    const d=document.createElement("div");
    d.className="week";
    d.innerHTML=`<b>${f.icon} ${f.name}｜${f.def}</b><br><small>${f.sel}・${f.sdg}</small>
      <p>自學摘要：${summaryFor(f.id)}</p>
      <p>每天小任務（勾 2 個當本週預設）：</p>`
      + seed.tasks.map((t,i)=>`<label style="display:block"><input type="checkbox" data-f="${f.id}" ${i<2?"checked":""}> ${t}</label>`).join("")
      + `<p><a href="https://www.youtube.com/results?search_query=${encodeURIComponent(f.name+" 高中生 學習方法")}" target="_blank" rel="noopener">▶ 在 YouTube 搜尋「${f.name} 高中生」</a></p>`;
    box.appendChild(d);
  });
  if(plan) box.insertAdjacentHTML("afterbegin",`<p class="hint">目前計畫：加強「${plan.focus}」・${plan.code}</p>`);
}
function summaryFor(fid){
  return {
    focus:"排除干擾、一次只做一件事；喜歡的感覺需要被留下來。",
    grit:"把放棄的後果先想清楚，再決定要不要撐兩週。",
    burst:"平時練好開場與收尾，關鍵時刻才有東西可以發揮。",
    steady:"低潮有訊號、有步驟、有出口；修復本身就是能力。",
    solo:"聽資訊、做判斷、負責任；在群體中保有自我。"
  }[fid];
}
$("btn-plan-print").addEventListener("click",()=>{
  const boxes=[...document.querySelectorAll('#resource-list input:checked')].map(c=>c.nextSibling.textContent.trim());
  if(!boxes.length){ alert("請先在上方勾選每天小任務"); return; }
  localStorage.setItem("wuli_daily",JSON.stringify(boxes));
  window.print();
});

/* ---------- 分頁⑤ 小精靈（規則式 SEL） ---------- */
const CHIPS=["這怎麼可能做到？好難！","我快放棄了…","時間不夠，壓力好大","朋友都跟我選不一樣的，我怕很奇怪"];
function chatInit(){
  $("chat-chips").innerHTML="";
  CHIPS.forEach(c=>{
    const b=document.createElement("button"); b.textContent=c;
    b.addEventListener("click",()=>{ $("chat-input").value=c; $("chat-form").requestSubmit(); });
    $("chat-chips").appendChild(b);
  });
  botSay("嗨，我是你的心智小精靈 🌙 先說說，你的 21 天計畫進行得怎麼樣？（想抱怨也可以，我先聽）");
}
function bubble(who,text){
  const d=document.createElement("div"); d.className="msg "+who;
  d.innerHTML=`<span class="bubble"></span>`; d.firstChild.textContent=text;
  $("chat-log").appendChild(d); $("chat-log").scrollTop=9999;
}
function botSay(t){ bubble("bot",t); }
$("chat-form").addEventListener("submit",e=>{
  e.preventDefault();
  const inp=$("chat-input"), v=inp.value.trim();
  if(!v) return;
  bubble("me",v); inp.value="";
  setTimeout(()=>botSay(reply(v)),400);
});
function reply(v){
  const plan=JSON.parse(localStorage.getItem("wuli_plan")||"null");
  const fname=plan?plan.focus:"你選的那一力";
  if(/難|不可能|做不到/.test(v)) return `聽起來真的有點難，先抱抱你。（停一下）如果把「加強${fname}」縮到最小，今天只做 5 分鐘，你會選哪一個小任務？`;
  if(/放棄|不想練|算了/.test(v)) return `想放棄是正常的訊號，不是失敗。可以跟我說是哪一段最累嗎？是開始、卡關，還是看不到成果？我們一次只看一段。`;
  if(/壓力|緊張|焦慮|睡不著/.test(v)) return `壓力來的時候，身體會先知道。試試：停 30 秒，深呼吸三次，再挑一件最小的事做。做完跟我說感覺有沒有差一點？`;
  if(/時間|太忙|沒空/.test(v)) return `時間被壓縮時，我們改練「每天 10 分鐘版」。${fname}的 21 天計畫裡，你願意保住哪一個 10 分鐘？`;
  if(/朋友|眼光|奇怪|跟人不一樣/.test(v)) return `跟別人不一樣會有點孤單，但那正是孤獨力在長大：聽資訊、做判斷、負責任。你心裡真正想選的是什麼？說 100 字給我聽聽？`;
  if(/謝謝|完成|做到|成功/.test(v)) return `太好了，這就是${fname}在發芽！記得把它寫下來（今天做了什麼＋感覺），下次低潮可以拿出來看。`;
  return `我聽到了。（反映一下：你現在的感覺比較像累、煩，還是慌？）不管是哪一種，我們都從${fname}的小任務裡挑一個 5 分鐘的開始，好嗎？`;
}

/* ---------- 啟動 ---------- */
renderPicker();
chatInit();
})();
