var e=React.createElement,useState=React.useState,useEffect=React.useEffect,useRef=React.useRef;

// Skill → { label, url, extra[] } — multiple resources per skill
var SKILL_LINKS = {
  'JavaScript':  {label:'freeCodeCamp JS',    url:'https://www.youtube.com/watch?v=PkZNo7MFNFg', extra:[{label:'javascript.info',url:'https://javascript.info'}]},
  'React':       {label:'React Official Docs', url:'https://react.dev/learn',                     extra:[{label:'Scrimba React',url:'https://scrimba.com/learn/learnreact'}]},
  'Python':      {label:'Python Full Course',  url:'https://www.youtube.com/watch?v=rfscVS0vtbw', extra:[{label:'Automate Boring Stuff',url:'https://automatetheboringstuff.com'}]},
  'SQL':         {label:'SQLZoo (interactive)',url:'https://sqlzoo.net',                           extra:[{label:'Mode SQL Tutorial',url:'https://mode.com/sql-tutorial'}]},
  'HTML':        {label:'MDN HTML Guide',      url:'https://developer.mozilla.org/en-US/docs/Learn/HTML', extra:[{label:'HTML Full Course',url:'https://www.youtube.com/watch?v=pQN-pnXPaVg'}]},
  'CSS':         {label:'CSS-Tricks',          url:'https://css-tricks.com/guides/',              extra:[{label:'Flexbox Froggy',url:'https://flexboxfroggy.com'}]},
  'Git':         {label:'Learn Git Branching', url:'https://learngitbranching.js.org',            extra:[{label:'Git Handbook',url:'https://guides.github.com/introduction/git-handbook'}]},
  'Node.js':     {label:'Node.js Crash Course',url:'https://www.youtube.com/watch?v=fBNz5xF-Kx4',extra:[{label:'Node.js Docs',url:'https://nodejs.org/en/docs'}]},
  'Express':     {label:'Express.js Guide',   url:'https://expressjs.com/en/guide/routing.html',  extra:[{label:'Express Crash Course',url:'https://www.youtube.com/watch?v=L72fhGm1tfE'}]},
  'MongoDB':     {label:'MongoDB University', url:'https://learn.mongodb.com',                    extra:[{label:'Mongoose Docs',url:'https://mongoosejs.com/docs'}]},
  'REST APIs':   {label:'REST API Tutorial',  url:'https://www.youtube.com/watch?v=0sOvCWFmrtA',  extra:[{label:'Postman Learning',url:'https://learning.postman.com'}]},
  'TypeScript':  {label:'TypeScript Handbook',url:'https://www.typescriptlang.org/docs/handbook/intro.html',extra:[{label:'TS Course fCC',url:'https://www.youtube.com/watch?v=30LWjhZzg50'}]},
  'Docker':      {label:'Docker Official Docs',url:'https://docs.docker.com/get-started/',        extra:[{label:'Docker Crash Course',url:'https://www.youtube.com/watch?v=pg19Z8LL06w'}]},
  'Kubernetes':  {label:'K8s Basics',         url:'https://kubernetes.io/docs/tutorials/kubernetes-basics/', extra:[{label:'K8s Full Course',url:'https://www.youtube.com/watch?v=X48VuDVv0do'}]},
  'Linux':       {label:'Linux Command Line', url:'https://www.youtube.com/watch?v=ZtqBQ68cfJc',  extra:[{label:'Linux Journey',url:'https://linuxjourney.com'}]},
  'AWS':         {label:'AWS Free Training',  url:'https://aws.amazon.com/training/digital/',     extra:[{label:'AWS Cloud Practitioner',url:'https://www.youtube.com/watch?v=SOTamWNgDKc'}]},
  'Azure':       {label:'Microsoft Learn',    url:'https://learn.microsoft.com/en-us/azure/',     extra:[]},
  'CI/CD':       {label:'GitHub Actions Guide',url:'https://docs.github.com/en/actions',          extra:[{label:'CI/CD Explained',url:'https://www.youtube.com/watch?v=scEDHsr3APg'}]},
  'Networking':  {label:'Networking Course',  url:'https://www.youtube.com/watch?v=qiQR5rTSshw',  extra:[{label:'Professor Messer',url:'https://www.professormesser.com'}]},
  'Python':      {label:'Python for Everybody',url:'https://www.coursera.org/specializations/python', extra:[{label:'Python Docs',url:'https://docs.python.org/3/tutorial'}]},
  'Machine Learning':{label:'ML Crash Course',url:'https://developers.google.com/machine-learning/crash-course',extra:[{label:'fast.ai',url:'https://www.fast.ai'}]},
  'Deep Learning':{label:'deeplearning.ai',  url:'https://www.deeplearning.ai/courses/',          extra:[{label:'3Blue1Brown NN',url:'https://www.youtube.com/watch?v=aircAruvnKk'}]},
  'TensorFlow':  {label:'TensorFlow Tutorials',url:'https://www.tensorflow.org/tutorials',        extra:[{label:'Keras Guide',url:'https://keras.io/guides'}]},
  'Statistics':  {label:'Khan Academy Stats', url:'https://www.khanacademy.org/math/statistics-probability', extra:[{label:'StatQuest',url:'https://www.youtube.com/c/joshstarmer'}]},
  'Pandas':      {label:'Pandas Docs',        url:'https://pandas.pydata.org/docs/getting_started', extra:[{label:'Pandas Tutorial',url:'https://www.youtube.com/watch?v=vmEHCJofslg'}]},
  'NumPy':       {label:'NumPy Quickstart',   url:'https://numpy.org/doc/stable/user/quickstart.html', extra:[]},
  'Excel':       {label:'Excel fCC Course',   url:'https://www.youtube.com/watch?v=Vl0H-qTclOg',  extra:[{label:'ExcelJet',url:'https://exceljet.net'}]},
  'Data Visualization':{label:'Tableau Public',url:'https://public.tableau.com/en-us/s/resources',extra:[{label:'Matplotlib Tutorial',url:'https://matplotlib.org/stable/tutorials/index.html'}]},
  'Figma':       {label:'Figma Official Course',url:'https://www.youtube.com/watch?v=FTFaQWZBqQ8',extra:[{label:'Figma Docs',url:'https://help.figma.com/hc/en-us'}]},
  'User Research':{label:'Nielsen Norman Group',url:'https://www.nngroup.com/articles/',          extra:[{label:'UX Research Basics',url:'https://www.youtube.com/watch?v=tXpFERihOrU'}]},
  'Wireframing': {label:'Wireframing Guide',  url:'https://www.youtube.com/watch?v=qpH7-KFWZRI',  extra:[{label:'Balsamiq Wireframes',url:'https://balsamiq.com/learn'}]},
  'Prototyping': {label:'Prototyping in Figma',url:'https://www.youtube.com/watch?v=lTIeZ2ahEkQ', extra:[]},
  'Kotlin':      {label:'Kotlin Docs',        url:'https://kotlinlang.org/docs/getting-started.html',extra:[{label:'Kotlin Bootcamp',url:'https://developer.android.com/courses/kotlin-bootcamp/overview'}]},
  'Java':        {label:'Java Full Course',   url:'https://www.youtube.com/watch?v=GoXwIVyNvX0',  extra:[{label:'Oracle Java Tutorials',url:'https://docs.oracle.com/javase/tutorial'}]},
  'Android SDK': {label:'Android Dev Guide',  url:'https://developer.android.com/guide',           extra:[{label:'Android Basics',url:'https://developer.android.com/courses/android-basics-compose/course'}]},
  'Swift':       {label:'Swift.org Docs',     url:'https://www.swift.org/getting-started/',        extra:[{label:'100 Days of Swift',url:'https://www.hackingwithswift.com/100'}]},
  'Xcode':       {label:'Xcode Overview',     url:'https://developer.apple.com/xcode/',            extra:[]},
  'UIKit':       {label:'UIKit Docs',         url:'https://developer.apple.com/documentation/uikit',extra:[{label:'Ray Wenderlich iOS',url:'https://www.kodeco.com/ios'}]},
  'Security Concepts':{label:'Cybersecurity Course',url:'https://www.youtube.com/watch?v=U_P23SqJaDc',extra:[{label:'TryHackMe',url:'https://tryhackme.com'}]},
  'SIEM Tools':  {label:'Splunk Free Training',url:'https://www.splunk.com/en_us/training/free-courses/splunk-fundamentals-1.html',extra:[]},
};

function getLinks(skill) {
  return SKILL_LINKS[skill] || {label:'Search on YouTube', url:'https://www.youtube.com/results?search_query=learn+'+encodeURIComponent(skill), extra:[]};
}

var JOBS=[
  {id:1,icon:'💻',title:'Frontend Developer',sal:'6-12 LPA',req:['HTML','CSS','JavaScript','React','Git','REST APIs']},
  {id:2,icon:'⚙️',title:'Backend Developer',sal:'7-14 LPA',req:['Node.js','Express','SQL','MongoDB','REST APIs','Git']},
  {id:3,icon:'🔗',title:'Full Stack Developer',sal:'8-18 LPA',req:['HTML','CSS','JavaScript','React','Node.js','SQL','Git']},
  {id:4,icon:'📊',title:'Data Analyst',sal:'5-10 LPA',req:['Python','SQL','Excel','Pandas','Data Visualization']},
  {id:5,icon:'🤖',title:'Data Scientist',sal:'8-18 LPA',req:['Python','Machine Learning','Statistics','SQL','Pandas','NumPy']},
  {id:6,icon:'🛠️',title:'DevOps Engineer',sal:'8-16 LPA',req:['Linux','Docker','Kubernetes','CI/CD','AWS','Git']},
  {id:7,icon:'🎨',title:'UI/UX Designer',sal:'5-12 LPA',req:['Figma','User Research','Wireframing','Prototyping','CSS']},
  {id:8,icon:'📱',title:'Android Developer',sal:'6-14 LPA',req:['Kotlin','Java','Android SDK','REST APIs','Git']},
  {id:9,icon:'🍎',title:'iOS Developer',sal:'7-16 LPA',req:['Swift','Xcode','UIKit','REST APIs','Git']},
  {id:10,icon:'☁️',title:'Cloud Engineer',sal:'9-20 LPA',req:['AWS','Azure','Linux','Networking','Python','Docker']},
  {id:11,icon:'🔐',title:'Cybersecurity',sal:'7-15 LPA',req:['Networking','Linux','Security Concepts','Python','SIEM Tools']},
  {id:12,icon:'🧠',title:'ML Engineer',sal:'10-22 LPA',req:['Python','Machine Learning','Deep Learning','TensorFlow','SQL']},
];
var POP=['HTML','CSS','JavaScript','Python','React','SQL','Git','Java','Node.js','TypeScript','Figma','Excel','Linux','Docker','MongoDB','C++'];

function computeGap(userSkills,roles){
  var seen={},allReq=[];
  roles.forEach(function(r){r.req.forEach(function(s){if(!seen[s]){seen[s]=1;allReq.push(s);}});});
  var uSet={};
  userSkills.forEach(function(s){uSet[s.toLowerCase().trim()]=1;});
  var have=allReq.filter(function(s){return !!uSet[s.toLowerCase().trim()];});
  var miss=allReq.filter(function(s){return !uSet[s.toLowerCase().trim()];});
  return {score:allReq.length?Math.round(have.length/allReq.length*100):0,have:have,miss:miss,allReq:allReq};
}

function makeStaticRoadmap(miss){
  return [0,1,2,3].map(function(i){
    var sl=miss.slice(i*2,i*2+2);
    if(!sl.length)sl=['Review & Build Projects'];
    return {week:i+1,focus:sl.join(' + '),skills:sl,project:'Build a mini project using '+sl.join(' & ')};
  });
}

async function callGemini(miss,roleNames,key){
var url='https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key='+key;
  var prompt='Career coach: 4-week beginner roadmap for '+roleNames+' learning: '+miss.slice(0,8).join(', ')+'. Reply ONLY with JSON array no markdown: [{"week":1,"focus":"title","skills":["a"],"project":"idea"},...]';
  var r=await fetch(url,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({contents:[{parts:[{text:prompt}]}]})});
  if(!r.ok){var err=await r.json();throw new Error((err&&err.error&&err.error.message)||'HTTP '+r.status);}
  var d=await r.json();
  var t=d.candidates[0].content.parts[0].text.replace(/```json|```/g,'').trim();
  return JSON.parse(t);
}

// External link icon SVG
function ExtIcon(){
  return e('svg',{width:11,height:11,viewBox:'0 0 24 24',fill:'none',stroke:'currentColor',strokeWidth:2.5,strokeLinecap:'round',strokeLinejoin:'round'},
    e('path',{d:'M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6'}),
    e('polyline',{points:'15 3 21 3 21 9'}),
    e('line',{x1:10,y1:14,x2:21,y2:3})
  );
}

// Resource links block for a skill
function ResourceLinks(props){
  var skill=props.skill;
  var info=getLinks(skill);
  return e('div',{style:{marginTop:6}},
    e('a',{className:'llink',href:info.url,target:'_blank',rel:'noopener noreferrer'},
      e(ExtIcon),info.label
    ),
    info.extra&&info.extra.map(function(ex,i){
      return e('a',{key:i,className:'llink',href:ex.url,target:'_blank',rel:'noopener noreferrer',style:{marginLeft:4}},
        e(ExtIcon),ex.label
      );
    })
  );
}

function BarChart(props){
  var gap=props.gap,items=gap.allReq,haveSet={};
  gap.have.forEach(function(s){haveSet[s.toLowerCase()]=1;});
  var W=Math.max(items.length*48,300),H=160,barW=26,gap2=22,maxH=100;
  return e('div',{className:'chart-wrap'},
    e('svg',{width:W,height:H,xmlns:'http://www.w3.org/2000/svg'},
      items.map(function(s,i){
        var x=i*(barW+gap2)+gap2/2,has=!!haveSet[s.toLowerCase()],barH=maxH,barY=H-barH-30;
        return e('g',{key:s},
          e('rect',{x:x,y:barY,width:barW,height:barH,rx:4,fill:has?'#d1fae5':'#fee2e2',stroke:has?'#34d399':'#f87171',strokeWidth:1.5}),
          e('text',{x:x+barW/2,y:H-12,textAnchor:'middle',fontSize:9,fill:'#9ca3af',transform:'rotate(-35,'+(x+barW/2)+','+(H-12)+')'},s.length>10?s.slice(0,9)+'…':s)
        );
      }),
      e('g',null,
        e('rect',{x:8,y:4,width:10,height:8,rx:2,fill:'#d1fae5',stroke:'#34d399',strokeWidth:1}),
        e('text',{x:22,y:12,fontSize:10,fill:'#6b7280'},'You have'),
        e('rect',{x:88,y:4,width:10,height:8,rx:2,fill:'#fee2e2',stroke:'#f87171',strokeWidth:1}),
        e('text',{x:102,y:12,fontSize:10,fill:'#6b7280'},'Missing')
      )
    )
  );
}

function Nav(props){
  var step=props.step;
  return e('nav',{className:'nav'},
    e('div',{className:'logo'},e('div',{className:'logo-dot'}),'SkillMap'),
    e('div',{className:'steps'},
      ['Roles','Skills','Analysis','Plan'].map(function(l,i){
        var cls='st'+(step===i?' on':'')+(step>i?' dn':'');
        return e('div',{key:i,className:cls},e('div',{className:'sn'},step>i?'✓':i+1),e('span',null,l));
      })
    )
  );
}

function S1(props){
  var sel=props.sel,setSel=props.setSel,onNext=props.onNext;
  function toggle(job){
    var ex=sel.find(function(r){return r.id===job.id;});
    if(ex)setSel(sel.filter(function(r){return r.id!==job.id;}));
    else if(sel.length<3)setSel(sel.concat([job]));
  }
  return e('div',{className:'pg'},
    // e('div',{className:'badge-top'},'✦ EdTech · Day 4 Project'),
    e('h1',{className:'ht'},'Find your ',e('span',{className:'grad'},'skill gap'),e('br'),'in seconds.'),
    e('p',{className:'hs'},"Pick up to 3 roles you're targeting. We'll show what's missing and build your learning plan."),
    e('div',{className:'rl'},'Choose target roles — up to 3'),
    e('div',{className:'rg'},JOBS.map(function(job){
      var on=!!sel.find(function(r){return r.id===job.id;});
      return e('div',{key:job.id,className:'rc'+(on?' sel':''),onClick:function(){toggle(job);}},
        e('div',{className:'rcc'},'✓'),
        e('div',{className:'ri'},job.icon),
        e('div',{className:'rn'},job.title),
        e('div',{className:'rs'},'₹'+job.sal),
        e('div',{className:'rk'},job.req.length+' skills required')
      );
    })),
    e('button',{className:'btn bp',disabled:sel.length===0,onClick:function(){onNext({roles:sel});}},
      sel.length===0?'Select a role to continue →':'Continue → '+sel.length+' role'+(sel.length>1?'s':'')+' selected'
    )
  );
}

function S2(props){
  var data=props.data,onNext=props.onNext,onBack=props.onBack;
  var ns=useState('');var name=ns[0],setName=ns[1];
  var ss=useState([]);var skills=ss[0],setSkills=ss[1];
  var is=useState('');var input=is[0],setInput=is[1];
  function add(raw){var s=(raw||'').trim();if(!s)return;if(!skills.find(function(x){return x.toLowerCase()===s.toLowerCase();}))setSkills(skills.concat([s]));setInput('');}
  function remove(s){setSkills(skills.filter(function(x){return x!==s;}));}
  function go(){var gap=computeGap(skills,data.roles);onNext({roles:data.roles,name:name,skills:skills,gap:gap});}
  return e('div',{className:'pg'},
    e('button',{className:'btn bg',style:{marginBottom:24,fontSize:13},onClick:onBack},'← Back'),
    e('h2',{style:{fontSize:24,fontWeight:700,letterSpacing:'-0.5px',marginBottom:6,color:'#111'}},'Tell us about yourself'),
    e('p',{style:{color:'#6b7280',fontSize:14,lineHeight:1.6,marginBottom:28}},'Type a skill then press Enter to add it.'),
    e('div',{className:'section-wrap'},
      e('div',{style:{marginBottom:18}},
        e('div',{className:'fl'},'Your name (optional)'),
        e('input',{className:'inp',placeholder:'e.g. Riya Sharma',value:name,onChange:function(ev){setName(ev.target.value);}})
      ),
      e('div',{style:{marginBottom:18}},
        e('div',{className:'fl'},'Target roles'),
        e('div',null,data.roles.map(function(r){return e('span',{key:r.id,className:'rchip'},r.icon+' '+r.title);}))
      ),
      e('div',{className:'fl'},'Your current skills'),
      e('div',{className:'irow'},
        e('input',{className:'inp',placeholder:'Type a skill and press Enter… e.g. React, Python, SQL',value:input,
          onChange:function(ev){setInput(ev.target.value);},
          onKeyDown:function(ev){if(ev.key==='Enter'){ev.preventDefault();add(input);}}}),
        e('button',{className:'btn bp',style:{whiteSpace:'nowrap'},onClick:function(){add(input);}},'+ Add')
      ),
      skills.length>0
        ?e('div',{className:'tarea'},skills.map(function(s){return e('span',{key:s,className:'stag'},s,e('button',{className:'tx',onClick:function(){remove(s);}},'×'));}))
        :e('p',{style:{fontSize:13,color:'#d1d5db',padding:'6px 0'}},'No skills yet — type above or click a suggestion below'),
      (function(){
        var roleReq=[],seen={};
        data.roles.forEach(function(r){r.req.forEach(function(s){if(!seen[s]){seen[s]=1;roleReq.push(s);}});});
        var notAdded=roleReq.filter(function(s){return !skills.find(function(x){return x.toLowerCase()===s.toLowerCase();});});
        if(!notAdded.length)return null;
        return e('div',null,
          e('div',{className:'sgl',style:{marginTop:16}},'⚡ Required for '+data.roles.map(function(r){return r.title;}).join(' / ')+' — click to add'),
          e('div',{className:'sgs'},notAdded.map(function(s){return e('button',{key:s,className:'sg',style:{borderColor:'#c7d2fe',color:'#4f46e5',background:'#fafafe'},onClick:function(){add(s);}},s);}))
        );
      })(),
      (function(){
        var roleReq={};
        data.roles.forEach(function(r){r.req.forEach(function(s){roleReq[s.toLowerCase()]=1;});});
        var others=POP.filter(function(s){return !roleReq[s.toLowerCase()]&&!skills.find(function(x){return x.toLowerCase()===s.toLowerCase();});});
        if(!others.length)return null;
        return e('div',null,
          e('div',{className:'sgl',style:{marginTop:14}},'Other popular skills'),
          e('div',{className:'sgs'},others.map(function(s){return e('button',{key:s,className:'sg',onClick:function(){add(s);}},s);}))
        );
      })()
    ),
    e('button',{className:'btn bp',onClick:go,disabled:skills.length===0},'Analyze My Skills →'),
    skills.length===0?e('p',{style:{marginTop:8,fontSize:13,color:'#9ca3af'}},'Add at least 1 skill to continue'):null
  );
}

function S3(props){
  var data=props.data,onNext=props.onNext,onBack=props.onBack;
  var gap=data.gap,name=data.name,sc=gap.score;
  var col=sc>=70?'#16a34a':sc>=40?'#d97706':'#dc2626';
  var R=54,cx=65,cy=65,circ=2*Math.PI*R,dash=(sc/100)*circ;
  return e('div',{className:'pg'},
    e('button',{className:'btn bg',style:{marginBottom:24,fontSize:13},onClick:onBack},'← Back'),
    name?e('p',{style:{color:'#6b7280',marginBottom:12,fontSize:14}},'Hey ',e('strong',{style:{color:'#111'}},name),", here's your skills report 👋"):null,
    e('div',{className:'section-wrap'},
      e('div',{className:'atop'},
        e('div',{className:'scircle'},
          e('svg',{className:'ssvg',width:130,height:130,viewBox:'0 0 130 130'},
            e('circle',{cx:cx,cy:cy,r:R,fill:'none',stroke:'#f3f4f6',strokeWidth:9}),
            e('circle',{cx:cx,cy:cy,r:R,fill:'none',stroke:col,strokeWidth:9,strokeDasharray:dash+' '+circ,strokeLinecap:'round'})
          ),
          e('div',{className:'snum',style:{color:col}},sc+'%'),
          e('div',{className:'slbl'},'match')
        ),
        e('div',null,
          e('div',{style:{fontWeight:700,fontSize:18,marginBottom:6,color:'#111'}},sc>=70?'Strong match! 🎉':sc>=40?'Getting there 📈':'Gap to close 🎯'),
          e('p',{style:{color:'#6b7280',fontSize:14,lineHeight:1.7}},sc>=70?'Great — you have most skills. Focus on the missing ones.':sc>=40?'Solid base! A focused 4–8 week plan will get you there.':'Good start — a structured plan will close this gap.'),
          e('div',{className:'strow'},
            e('div',{className:'stat'},e('div',{className:'sv',style:{color:'#16a34a'}},gap.have.length),e('div',{className:'sl'},'You have')),
            e('div',{className:'stat'},e('div',{className:'sv',style:{color:'#dc2626'}},gap.miss.length),e('div',{className:'sl'},'Missing')),
            e('div',{className:'stat'},e('div',{className:'sv',style:{color:'#4f46e5'}},gap.allReq.length),e('div',{className:'sl'},'Required'))
          )
        )
      )
    ),
    e('div',{className:'card'},
      e('div',{className:'ct',style:{color:'#6b7280'}},'Skills Breakdown'),
      e(BarChart,{gap:gap})
    ),
    e('div',{className:'two'},
      e('div',{className:'card'},
        e('div',{className:'ct',style:{color:'#dc2626'}},'To Learn ('+gap.miss.length+')'),
        gap.miss.length===0?e('span',{style:{fontSize:13,color:'#9ca3af'}},'Nothing missing! Great job.'):gap.miss.map(function(s){return e('span',{key:s,className:'sbadge sm'},s);})
      ),
      e('div',{className:'card'},
        e('div',{className:'ct',style:{color:'#16a34a'}},'You Have ('+gap.have.length+')'),
        gap.have.length===0?e('span',{style:{fontSize:13,color:'#9ca3af'}},'Go back and add your skills.'):gap.have.map(function(s){return e('span',{key:s,className:'sbadge sh'},s);})
      )
    ),
    e('button',{className:'btn bp',onClick:function(){onNext(data);}},gap.miss.length>0?'Get Learning Plan →':'View Roadmap →')
  );
}

function S4(props){
  var data=props.data,onBack=props.onBack;
  var gap=data.gap,roles=data.roles;
  var ap=useState(null);var aiPlan=ap[0],setAiPlan=ap[1];
  var ls=useState(false);var loading=ls[0],setLoading=ls[1];
  var ks=useState('');var apiKey=ks[0],setApiKey=ks[1];
  var es=useState('');var error=es[0],setError=es[1];
  var ds=useState([]);var done=ds[0],setDone=ds[1];
  var plan=aiPlan||makeStaticRoadmap(gap.miss);
  var isAI=!!aiPlan;
  var doneCount=done.filter(function(w){return plan.find(function(p){return p.week===w;});}).length;
  var rNames=roles.map(function(r){return r.title;}).join(', ');
  function generate(key){if(!key.trim()){setError('Please enter your Gemini API key.');return;}setLoading(true);setError('');callGemini(gap.miss,rNames,key.trim()).then(function(p){setAiPlan(p);setLoading(false);}).catch(function(err){setError('Error: '+err.message);setLoading(false);});}
  function toggle(week){setDone(done.includes(week)?done.filter(function(w){return w!==week;}):done.concat([week]));}
  return e('div',{className:'pg'},
    e('button',{className:'btn bg',style:{marginBottom:24,fontSize:13},onClick:onBack},'← Back'),
    e('h2',{style:{fontSize:24,fontWeight:700,letterSpacing:'-0.5px',marginBottom:4,color:'#111'}},'Your 4-Week Learning Plan'),
    e('p',{style:{color:'#6b7280',fontSize:14,lineHeight:1.6,marginBottom:20}},isAI?'AI-personalized roadmap for your skill gaps.':'Curated resources and projects for each skill you need to learn.'),

    // Progress bar
    e('div',{className:'card',style:{display:'flex',alignItems:'center',gap:16,marginBottom:16}},
      e('div',{style:{textAlign:'center',flexShrink:0}},
        e('div',{style:{fontSize:20,fontWeight:700,color:'#16a34a'}},doneCount+'/'+plan.length),
        e('div',{style:{fontSize:10,color:'#9ca3af',textTransform:'uppercase',letterSpacing:'.07em'}},'done')
      ),
      e('div',{style:{flex:1}},
        e('div',{style:{display:'flex',justifyContent:'space-between',fontSize:12,color:'#6b7280',marginBottom:4}},
          e('span',null,'Progress'),e('span',{style:{color:'#16a34a',fontWeight:600}},Math.round(doneCount/plan.length*100)+'%')),
        e('div',{className:'pbar'},e('div',{className:'pfill',style:{width:Math.round(doneCount/plan.length*100)+'%'}}))
      )
    ),

    // Week cards
    plan.map(function(w,i){
      var isDone=done.includes(w.week);
      return e('div',{key:i,className:'wc'+(isDone?' wd':'')},
        e('div',{className:'wh'},
          e('div',{className:'wb'},'W'+w.week),
          e('div',{className:'wf'},w.focus),
          e('button',{className:'wchk',onClick:function(){toggle(w.week);}},isDone?'✓':'')
        ),
        (w.skills||[]).length?e('div',{className:'wskills'},(w.skills||[]).map(function(s){return e('span',{key:s,className:'wsk'},s);})):null,
        e('div',{className:'wdet'},
          // Resources column — real clickable links per skill
          e('div',{className:'wbox'},
            e('div',{className:'wbl'},'📚 Free Resources'),
            (w.skills||[]).length
              ? e('div',null,(w.skills||[]).map(function(s){
                  return e('div',{key:s,style:{marginBottom:6}},
                    e('div',{style:{fontSize:11,color:'#6b7280',fontWeight:500,marginBottom:2}},s),
                    e(ResourceLinks,{skill:s})
                  );
                }))
              : e('div',{className:'wbv'},'Review past material & build')
          ),
          // Project column
          e('div',{className:'wbox'},
            e('div',{className:'wbl'},'🛠 Project Idea'),
            e('div',{className:'wbv'},w.project)
          )
        )
      );
    }),

    // Gemini AI upgrade box
    !isAI&&!loading?e('div',{className:'apibox'},
      e('strong',{style:{color:'#111'}},'✨ Want an AI-personalized plan?'),e('br'),
      'Get a free Gemini key at ',e('a',{href:'https://ai.google.dev',target:'_blank'},'ai.google.dev'),' — no credit card needed.',
      e('div',{className:'apirow'},
        e('input',{className:'inp',type:'password',placeholder:'Paste Gemini API key…',value:apiKey,onChange:function(ev){setApiKey(ev.target.value);},onKeyDown:function(ev){if(ev.key==='Enter')generate(apiKey);}}),
        e('button',{className:'btn bp',style:{whiteSpace:'nowrap'},onClick:function(){generate(apiKey);}},'Generate →')
      ),
      error?e('p',{className:'errtxt'},error):null
    ):null,
    loading?e('div',{style:{textAlign:'center',padding:'28px 0'}},e('div',{className:'spin'}),e('p',{style:{color:'#6b7280',marginTop:12,fontSize:14}},'Generating your roadmap…')):null,
    isAI?e('button',{className:'btn bg',style:{marginTop:8},onClick:function(){setAiPlan(null);}},'↺ Regenerate'):null
  );
}

function App(){
  var st=useState(0);var step=st[0],setStep=st[1];
  var dt=useState({roles:[],name:'',skills:[],gap:null});var data=dt[0],setData=dt[1];
  var sl=useState([]);var sel=sl[0],setSel=sl[1];
  function merge(d){setData(function(p){return Object.assign({},p,d);});}
  return e('div',null,
    e(Nav,{step:step}),
    step===0?e(S1,{sel:sel,setSel:setSel,onNext:function(d){merge(d);setStep(1);}}):null,
    step===1?e(S2,{data:data,onNext:function(d){merge(d);setStep(2);},onBack:function(){setStep(0);}}):null,
    step===2?e(S3,{data:data,onNext:function(d){merge(d);setStep(3);},onBack:function(){setStep(1);}}):null,
    step===3?e(S4,{data:data,onBack:function(){setStep(2);}}):null
  );
}
ReactDOM.createRoot(document.getElementById('root')).render(e(App,null));