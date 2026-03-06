import { useState, useEffect, useCallback } from "react";
import { createClient } from "@supabase/supabase-js";

// ─── SUPABASE CREDENTIALS ─────────────────────────────────────────────────────
const SUPABASE_URL = "https://orzevumgpctxtojxbnrc.supabase.co";
const SUPABASE_KEY = "sb_publishable_SJSlyWV_XkJOkw5hYHaE4w_P0n-JDJS";
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
// ─────────────────────────────────────────────────────────────────────────────

const LOGO = "data:image/png;base64,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";

const G="#56907A",Y="#D8DB86",BG="#FAFAF7",W="#ffffff";
const GD="#3d6b5a",GL="#7ab09e",GP="#eaf3ef",YP="#f7f8e0";
const TX="#1e3329",TM="#4a6b5a",TL="#8aaa98",BD="#ccddd5";

const card=(x={})=>({background:W,border:`1px solid ${BD}`,borderRadius:14,padding:20,...x});
const btn=(p=true)=>({padding:"9px 18px",borderRadius:9,border:p?"none":`1px solid ${BD}`,cursor:"pointer",fontWeight:600,fontSize:13,background:p?G:"transparent",color:p?W:TM,fontFamily:"inherit"});
const inp={background:BG,border:`1px solid ${BD}`,borderRadius:8,padding:"9px 12px",color:TX,fontSize:13,width:"100%",boxSizing:"border-box",fontFamily:"inherit"};
const sel={background:BG,border:`1px solid ${BD}`,borderRadius:8,padding:"9px 12px",color:TX,fontSize:13,fontFamily:"inherit"};
const pill=(c,bg)=>({display:"inline-block",padding:"2px 10px",borderRadius:20,background:bg||`${c}18`,color:c,fontWeight:600,fontSize:11});

const tagC={Marketing:"#c07a3a",Events:"#7a6ab0",Grants:G,Outreach:"#3a8ab0",Admin:"#8a8a3a"};
const priC={High:"#c04a3a",Medium:"#c07a3a",Low:TL};
const stC={"In Progress":G,Backlog:TL,Done:"#7a9a3a",Planned:TL};
const mtgC={Board:G,Committee:"#7a6ab0",Planning:"#c07a3a",Community:"#3a8ab0"};
const qC={Q1:G,Q2:"#c07a3a",Q3:"#7a6ab0",Q4:"#3a8ab0"};

const ROADMAP=[
  {id:1,title:"Spring Festival",quarter:"Q2",status:"In Progress",progress:30,team:"Events"},
  {id:2,title:"Facade Grant Program",quarter:"Q2",status:"In Progress",progress:55,team:"Design"},
  {id:3,title:"Downtown Wayfinding Signage",quarter:"Q3",status:"Planned",progress:5,team:"Design"},
  {id:4,title:"Holiday Market",quarter:"Q4",status:"Planned",progress:0,team:"Events"},
  {id:5,title:"Merchant Training Series",quarter:"Q3",status:"Planned",progress:0,team:"Promotion"},
  {id:6,title:"Annual Report",quarter:"Q4",status:"Planned",progress:0,team:"Admin"},
];
const TEAM=[
  {id:1,name:"Sarah Mitchell",role:"Executive Director",ini:"SM",color:G},
  {id:2,name:"James Okafor",role:"Board Chair",ini:"JO",color:"#c07a3a"},
  {id:3,name:"Kim Pearce",role:"Design Committee",ini:"KP",color:"#7a6ab0"},
  {id:4,name:"Raj Patel",role:"Promotion Committee",ini:"RP",color:"#3a8ab0"},
];
const TABS=[
  {id:"dashboard",label:"Dashboard",icon:"⬡"},
  {id:"tasks",label:"Tasks",icon:"✓"},
  {id:"roadmap",label:"Roadmap",icon:"↗"},
  {id:"team",label:"Team",icon:"◎"},
  {id:"meetings",label:"Meetings",icon:"◷"},
  {id:"outreach",label:"Outreach",icon:"🤝"},
  {id:"contacts",label:"Contacts",icon:"📋"},
  {id:"voting",label:"Voting",icon:"🗳"},
];

function Field({f,v,onChange}) {
  const style={...( f.full?{gridColumn:"1/-1"}:{})}; 
  if(f.type==="select") return <select style={{...sel,...style}} value={v} onChange={e=>onChange(e.target.value)}>{f.opts.map(o=><option key={o}>{o}</option>)}</select>;
  return <input style={{...inp,...style}} type={f.type||"text"} placeholder={f.ph||""} value={v} onChange={e=>onChange(e.target.value)}/>;
}

export default function App() {
  const [tab,setTab]=useState("dashboard");
  const [tasks,setTasks]=useState([]);
  const [meetings,setMeetings]=useState([]);
  const [outreach,setOutreach]=useState([]);
  const [contacts,setContacts]=useState([]);
  const [votes,setVotes]=useState([]);
  const [loading,setLoading]=useState(true);
  const [filterStatus,setFilterStatus]=useState("All");
  const [show,setShow]=useState({tasks:false,meetings:false,outreach:false,contacts:false,votes:false});
  const [nt,setNt]=useState({title:"",status:"Backlog",priority:"Medium",assignee:"Sarah",tag:"Events",due:""});
  const [nm,setNm]=useState({title:"",date:"",time:"",duration:"1h",type:"Board"});
  const [no,setNo]=useState({name:"",business:"",date:"",member:"Sarah Mitchell",notes:""});
  const [nc,setNc]=useState({name:"",role:"",org:"",phone:"",email:""});
  const [nv,setNv]=useState({title:"",date:"",result:"Passed",yes:"0",no:"0",abstain:"0",notes:""});

  const load=useCallback(async()=>{
    setLoading(true);
    const [t,m,o,c,v]=await Promise.all([
      supabase.from("tasks").select("*").order("created_at",{ascending:false}),
      supabase.from("meetings").select("*").order("date",{ascending:true}),
      supabase.from("outreach").select("*").order("date",{ascending:false}),
      supabase.from("contacts").select("*").order("name",{ascending:true}),
      supabase.from("votes").select("*").order("date",{ascending:false}),
    ]);
    if(t.data)setTasks(t.data);
    if(m.data)setMeetings(m.data);
    if(o.data)setOutreach(o.data);
    if(c.data)setContacts(c.data);
    if(v.data)setVotes(v.data);
    setLoading(false);
  },[]);

  useEffect(()=>{load();},[load]);

  useEffect(()=>{
    const subs=["tasks","meetings","outreach","contacts","votes"].map(t=>
      supabase.channel(`rt-${t}`).on("postgres_changes",{event:"*",schema:"public",table:t},load).subscribe()
    );
    return()=>subs.forEach(s=>supabase.removeChannel(s));
  },[load]);

  async function add(table,data,reset,key){
    await supabase.from(table).insert([data]);
    reset();
    setShow(p=>({...p,[key]:false}));
  }
  async function del(table,id){await supabase.from(table).delete().eq("id",id);}

  const thisWeek=outreach.filter(o=>{const d=new Date(o.date),n=new Date();return(n-d)/(864e5)<=7;});

  const Sidebar=()=>(
    <div style={{width:220,minHeight:"100vh",background:G,display:"flex",flexDirection:"column",position:"sticky",top:0}}>
      <div style={{padding:"24px 20px 20px",borderBottom:"1px solid rgba(255,255,255,0.2)",textAlign:"center"}}>
        <img src={LOGO} alt="Athens" style={{width:64,height:64,borderRadius:"50%",marginBottom:10,border:"2px solid rgba(255,255,255,0.3)"}}/>
        <div style={{color:W,fontWeight:700,fontSize:14,letterSpacing:"0.05em"}}>ATHENS MAIN STREET</div>
        <div style={{color:"rgba(255,255,255,0.6)",fontSize:11,marginTop:2}}>The Friendly City</div>
      </div>
      <nav style={{padding:"12px 10px",flex:1}}>
        {TABS.map(t=>(
          <button key={t.id} onClick={()=>setTab(t.id)} style={{width:"100%",display:"flex",alignItems:"center",gap:10,padding:"9px 12px",borderRadius:8,border:"none",cursor:"pointer",background:tab===t.id?"rgba(255,255,255,0.2)":"transparent",color:tab===t.id?W:"rgba(255,255,255,0.75)",fontWeight:tab===t.id?700:400,fontSize:13,marginBottom:2,textAlign:"left",borderLeft:tab===t.id?`3px solid ${Y}`:"3px solid transparent",fontFamily:"inherit"}}>
            <span style={{fontSize:14}}>{t.icon}</span>{t.label}
          </button>
        ))}
      </nav>
      <div style={{padding:"14px 20px",borderTop:"1px solid rgba(255,255,255,0.2)"}}>
        <div style={{fontSize:11,color:"rgba(255,255,255,0.5)",textAlign:"center"}}>Athens, Tennessee · Est. 1822</div>
      </div>
    </div>
  );

  if(loading) return(
    <div style={{display:"flex",background:BG,minHeight:"100vh",fontFamily:"'Source Sans 3',Georgia,serif"}}>
      <Sidebar/>
      <div style={{flex:1,display:"flex",alignItems:"center",justifyContent:"center"}}>
        <div style={{textAlign:"center",color:TM}}>
          <img src={LOGO} alt="" style={{width:72,height:72,borderRadius:"50%",marginBottom:16,opacity:0.7}}/>
          <div style={{fontSize:16,fontWeight:600,color:GD}}>Loading Athens Main Street...</div>
          <div style={{fontSize:13,color:TL,marginTop:6}}>Connecting to live database</div>
        </div>
      </div>
    </div>
  );

  const H=(t)=><h1 style={{margin:0,fontSize:22,fontWeight:700,color:GD,fontFamily:"'Lora',Georgia,serif"}}>{t}</h1>;

  return(
    <div style={{display:"flex",background:BG,minHeight:"100vh",fontFamily:"'Source Sans 3',Georgia,serif",color:TX}}>
      <Sidebar/>
      <div style={{flex:1,padding:28,overflowY:"auto"}}>

        {/* DASHBOARD */}
        {tab==="dashboard"&&(
          <div>
            <div style={{marginBottom:24}}>
              <h1 style={{margin:0,fontSize:26,fontWeight:700,color:GD,fontFamily:"'Lora',Georgia,serif"}}>Good morning 👋</h1>
              <p style={{color:TM,marginTop:4,fontSize:14}}>{new Date().toLocaleDateString("en-US",{weekday:"long",month:"long",day:"numeric",year:"numeric"})}</p>
            </div>
            <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:14,marginBottom:24}}>
              {[{l:"Total Tasks",v:tasks.length,c:G,bg:GP,i:"✓"},{l:"In Progress",v:tasks.filter(t=>t.status==="In Progress").length,c:"#c07a3a",bg:"#f7ede0",i:"⟳"},{l:"Meetings Scheduled",v:meetings.length,c:"#7a6ab0",bg:"#f0eef9",i:"◷"},{l:"Outreach This Week",v:thisWeek.length,c:"#3a8ab0",bg:"#e5f2f9",i:"🤝"}].map(s=>(
                <div key={s.l} style={{...card(),borderTop:`3px solid ${s.c}`}}>
                  <div style={{fontSize:20,marginBottom:6}}>{s.i}</div>
                  <div style={{fontSize:30,fontWeight:800,color:s.c,lineHeight:1}}>{s.v}</div>
                  <div style={{fontSize:12,color:TM,marginTop:5}}>{s.l}</div>
                </div>
              ))}
            </div>
            <div style={{display:"grid",gridTemplateColumns:"1.4fr 1fr",gap:18}}>
              <div style={card()}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}>
                  <h3 style={{margin:0,fontSize:14,fontWeight:700,color:GD}}>Recent Tasks</h3>
                  <button onClick={()=>setTab("tasks")} style={{background:"none",border:"none",color:G,cursor:"pointer",fontSize:12}}>View all →</button>
                </div>
                {tasks.slice(0,5).map(t=>(
                  <div key={t.id} style={{display:"flex",alignItems:"center",gap:10,padding:"9px 0",borderBottom:`1px solid ${BD}`}}>
                    <div style={{width:7,height:7,borderRadius:"50%",background:stC[t.status]||TL,flexShrink:0}}/>
                    <div style={{flex:1,fontSize:13}}>{t.title}</div>
                    <span style={pill(priC[t.priority])}>{t.priority}</span>
                  </div>
                ))}
                {!tasks.length&&<div style={{fontSize:13,color:TL,padding:"10px 0"}}>No tasks yet.</div>}
              </div>
              <div style={card()}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}>
                  <h3 style={{margin:0,fontSize:14,fontWeight:700,color:GD}}>Upcoming Meetings</h3>
                  <button onClick={()=>setTab("meetings")} style={{background:"none",border:"none",color:G,cursor:"pointer",fontSize:12}}>View all →</button>
                </div>
                {meetings.slice(0,4).map(m=>(
                  <div key={m.id} style={{padding:"9px 0",borderBottom:`1px solid ${BD}`}}>
                    <div style={{display:"flex",justifyContent:"space-between"}}>
                      <div style={{fontSize:13,fontWeight:600}}>{m.title}</div>
                      <span style={pill(mtgC[m.type]||G)}>{m.type}</span>
                    </div>
                    <div style={{fontSize:12,color:TL,marginTop:3}}>{m.date}{m.time?` · ${m.time}`:""}</div>
                  </div>
                ))}
                {!meetings.length&&<div style={{fontSize:13,color:TL,padding:"10px 0"}}>No meetings yet.</div>}
              </div>
            </div>
          </div>
        )}

        {/* TASKS */}
        {tab==="tasks"&&(
          <div>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20}}>
              <div>{H("Tasks & Backlog")}<p style={{color:TM,marginTop:3,fontSize:13}}>{tasks.length} tasks</p></div>
              <button style={btn()} onClick={()=>setShow(p=>({...p,tasks:true}))}>+ New Task</button>
            </div>
            <div style={{display:"flex",gap:8,marginBottom:18}}>
              {["All","Backlog","In Progress","Done"].map(st=>(
                <button key={st} onClick={()=>setFilterStatus(st)} style={{padding:"6px 14px",borderRadius:20,border:`1px solid`,borderColor:filterStatus===st?G:BD,background:filterStatus===st?GP:"transparent",color:filterStatus===st?GD:TM,cursor:"pointer",fontSize:12,fontWeight:500}}>{st}</button>
              ))}
            </div>
            {show.tasks&&(
              <div style={{...card(),marginBottom:18,background:GP,border:`1px solid ${GL}`}}>
                <h3 style={{margin:"0 0 14px",fontSize:14,color:GD}}>Add New Task</h3>
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:12}}>
                  {[{k:"title",ph:"Task title...",full:true},{k:"due",type:"date"},{k:"status",type:"select",opts:["Backlog","In Progress","Done"]},{k:"priority",type:"select",opts:["Low","Medium","High"]},{k:"tag",type:"select",opts:["Marketing","Events","Grants","Outreach","Admin"]},{k:"assignee",type:"select",opts:["Sarah","James","Kim","Raj"]}].map(f=>(
                    <Field key={f.k} f={f} v={nt[f.k]} onChange={v=>setNt(p=>({...p,[f.k]:v}))}/>
                  ))}
                </div>
                <div style={{display:"flex",gap:8}}>
                  <button style={btn()} onClick={()=>{if(!nt.title.trim())return;add("tasks",{...nt},()=>setNt({title:"",status:"Backlog",priority:"Medium",assignee:"Sarah",tag:"Events",due:""}),"tasks");}}>Add Task</button>
                  <button style={btn(false)} onClick={()=>setShow(p=>({...p,tasks:false}))}>Cancel</button>
                </div>
              </div>
            )}
            <div style={{...card(),padding:0,overflow:"hidden"}}>
              <div style={{display:"grid",gridTemplateColumns:"2fr 1fr 1fr 1fr 1fr 1fr 32px",padding:"10px 18px",borderBottom:`1px solid ${BD}`,fontSize:11,color:TL,fontWeight:700,textTransform:"uppercase",letterSpacing:"0.05em"}}>
                {["Title","Due","Status","Priority","Assignee","Tag",""].map(h=><div key={h}>{h}</div>)}
              </div>
              {(filterStatus==="All"?tasks:tasks.filter(t=>t.status===filterStatus)).map(t=>(
                <div key={t.id} style={{display:"grid",gridTemplateColumns:"2fr 1fr 1fr 1fr 1fr 1fr 32px",padding:"12px 18px",borderBottom:`1px solid ${BD}`,alignItems:"center"}}>
                  <div style={{fontSize:13,fontWeight:500}}>{t.title}</div>
                  <div style={{fontSize:12,color:TL}}>{t.due||"—"}</div>
                  <span style={pill(stC[t.status]||TL)}>{t.status}</span>
                  <span style={pill(priC[t.priority])}>{t.priority}</span>
                  <div style={{fontSize:12,color:TM}}>{t.assignee}</div>
                  <span style={pill(tagC[t.tag]||G)}>{t.tag}</span>
                  <button onClick={()=>del("tasks",t.id)} style={{background:"none",border:"none",color:TL,cursor:"pointer",fontSize:16,padding:0}}>×</button>
                </div>
              ))}
              {!tasks.length&&<div style={{padding:"20px 18px",fontSize:13,color:TL}}>No tasks yet. Add your first one!</div>}
            </div>
          </div>
        )}

        {/* ROADMAP */}
        {tab==="roadmap"&&(
          <div>
            <div style={{marginBottom:22}}>{H("Program Roadmap")}<p style={{color:TM,marginTop:3,fontSize:13}}>Athens Main Street 2026 initiatives</p></div>
            {["Q1","Q2","Q3","Q4"].map(q=>{
              const items=ROADMAP.filter(r=>r.quarter===q);
              return(
                <div key={q} style={{marginBottom:26}}>
                  <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:12}}>
                    <span style={{...pill(qC[q]),fontSize:13,padding:"4px 14px"}}>{q} 2026</span>
                    <div style={{flex:1,height:1,background:BD}}/>
                  </div>
                  <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:12}}>
                    {items.map(item=>(
                      <div key={item.id} style={{...card(),borderTop:`3px solid ${qC[q]}`}}>
                        <div style={{display:"flex",justifyContent:"space-between",marginBottom:10}}>
                          <div style={{fontSize:14,fontWeight:700,color:GD}}>{item.title}</div>
                          <span style={pill(stC[item.status]||TL)}>{item.status}</span>
                        </div>
                        <div style={{fontSize:12,color:TL,marginBottom:10}}>{item.team}</div>
                        <div style={{background:BD,borderRadius:20,height:6,overflow:"hidden"}}>
                          <div style={{height:"100%",borderRadius:20,background:qC[q],width:`${item.progress}%`}}/>
                        </div>
                        <div style={{fontSize:11,color:TL,marginTop:5,textAlign:"right"}}>{item.progress}%</div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* TEAM */}
        {tab==="team"&&(
          <div>
            <div style={{marginBottom:22}}>{H("Team")}<p style={{color:TM,marginTop:3,fontSize:13}}>Board & committee members</p></div>
            <div style={{display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:14}}>
              {TEAM.map(m=>(
                <div key={m.id} style={{...card(),display:"flex",alignItems:"center",gap:14}}>
                  <div style={{width:50,height:50,borderRadius:"50%",background:m.color,display:"flex",alignItems:"center",justifyContent:"center",color:W,fontWeight:800,fontSize:16,flexShrink:0}}>{m.ini}</div>
                  <div style={{flex:1}}>
                    <div style={{fontSize:14,fontWeight:700,color:GD}}>{m.name}</div>
                    <div style={{fontSize:12,color:TM}}>{m.role}</div>
                    <div style={{fontSize:12,color:TL,marginTop:4}}>{tasks.filter(t=>t.assignee===m.name.split(" ")[0]).length} active tasks</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* MEETINGS */}
        {tab==="meetings"&&(
          <div>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20}}>
              <div>{H("Meeting Scheduler")}<p style={{color:TM,marginTop:3,fontSize:13}}>{meetings.length} meetings scheduled</p></div>
              <button style={btn()} onClick={()=>setShow(p=>({...p,meetings:true}))}>+ Schedule Meeting</button>
            </div>
            {show.meetings&&(
              <div style={{...card(),marginBottom:18,background:GP,border:`1px solid ${GL}`}}>
                <h3 style={{margin:"0 0 14px",fontSize:14,color:GD}}>Schedule New Meeting</h3>
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:12}}>
                  {[{k:"title",ph:"Meeting title...",full:true},{k:"date",type:"date"},{k:"time",type:"time"},{k:"duration",type:"select",opts:["30m","1h","1.5h","2h"]},{k:"type",type:"select",opts:["Board","Committee","Planning","Community"]}].map(f=>(
                    <Field key={f.k} f={f} v={nm[f.k]} onChange={v=>setNm(p=>({...p,[f.k]:v}))}/>
                  ))}
                </div>
                <div style={{display:"flex",gap:8}}>
                  <button style={btn()} onClick={()=>{if(!nm.title||!nm.date)return;add("meetings",{...nm},()=>setNm({title:"",date:"",time:"",duration:"1h",type:"Board"}),"meetings");}}>Schedule</button>
                  <button style={btn(false)} onClick={()=>setShow(p=>({...p,meetings:false}))}>Cancel</button>
                </div>
              </div>
            )}
            <div style={{display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:14}}>
              {meetings.map(m=>(
                <div key={m.id} style={{...card(),borderLeft:`4px solid ${mtgC[m.type]||G}`}}>
                  <div style={{display:"flex",justifyContent:"space-between",marginBottom:10}}>
                    <div style={{fontSize:15,fontWeight:700,color:GD}}>{m.title}</div>
                    <button onClick={()=>del("meetings",m.id)} style={{background:"none",border:"none",color:TL,cursor:"pointer",fontSize:16}}>×</button>
                  </div>
                  <div style={{display:"flex",gap:12,marginBottom:8,flexWrap:"wrap"}}>
                    <span style={{fontSize:12,color:TM}}>📅 {m.date}</span>
                    {m.time&&<span style={{fontSize:12,color:TM}}>🕐 {m.time}</span>}
                    <span style={{fontSize:12,color:TM}}>⏱ {m.duration}</span>
                  </div>
                  <span style={pill(mtgC[m.type]||G)}>{m.type}</span>
                </div>
              ))}
              {!meetings.length&&<div style={{...card(),fontSize:13,color:TL}}>No meetings yet.</div>}
            </div>
          </div>
        )}

        {/* OUTREACH */}
        {tab==="outreach"&&(
          <div>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20}}>
              <div>{H("Community Outreach")}<p style={{color:TM,marginTop:3,fontSize:13}}>Weekly goal: 1+ visit · <strong style={{color:thisWeek.length>=1?G:"#c04a3a"}}>{thisWeek.length} visit{thisWeek.length!==1?"s":""} this week</strong></p></div>
              <button style={btn()} onClick={()=>setShow(p=>({...p,outreach:true}))}>+ Log Visit</button>
            </div>
            <div style={{...card(),marginBottom:18,background:thisWeek.length>=1?GP:"#fdf0ee",border:`1px solid ${thisWeek.length>=1?GL:"#e0a090"}`,display:"flex",alignItems:"center",gap:14}}>
              <div style={{fontSize:28}}>{thisWeek.length>=1?"✅":"⚠️"}</div>
              <div>
                <div style={{fontSize:14,fontWeight:700,color:thisWeek.length>=1?GD:"#b03020"}}>{thisWeek.length>=1?`Weekly goal met — ${thisWeek.length} visit${thisWeek.length!==1?"s":""} logged!`:"Weekly goal not yet met this week"}</div>
                <div style={{fontSize:12,color:TM,marginTop:2}}>President's goal: at least one community visit per week</div>
              </div>
            </div>
            {show.outreach&&(
              <div style={{...card(),marginBottom:18,background:GP,border:`1px solid ${GL}`}}>
                <h3 style={{margin:"0 0 14px",fontSize:14,color:GD}}>Log Community Visit</h3>
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:12}}>
                  {[{k:"name",ph:"Contact name..."},{k:"business",ph:"Business/Organization..."},{k:"date",type:"date"},{k:"member",type:"select",opts:["Sarah Mitchell","James Okafor","Kim Pearce","Raj Patel"]},{k:"notes",ph:"Notes about the visit...",full:true}].map(f=>(
                    <Field key={f.k} f={f} v={no[f.k]} onChange={v=>setNo(p=>({...p,[f.k]:v}))}/>
                  ))}
                </div>
                <div style={{display:"flex",gap:8}}>
                  <button style={btn()} onClick={()=>{if(!no.name||!no.date)return;add("outreach",{...no},()=>setNo({name:"",business:"",date:"",member:"Sarah Mitchell",notes:""}),"outreach");}}>Log Visit</button>
                  <button style={btn(false)} onClick={()=>setShow(p=>({...p,outreach:false}))}>Cancel</button>
                </div>
              </div>
            )}
            <div style={{...card(),padding:0,overflow:"hidden"}}>
              <div style={{display:"grid",gridTemplateColumns:"1.2fr 1.2fr 1fr 1.5fr 2fr 32px",padding:"10px 18px",borderBottom:`1px solid ${BD}`,fontSize:11,color:TL,fontWeight:700,textTransform:"uppercase",letterSpacing:"0.05em"}}>
                {["Contact","Business","Date","Staff Member","Notes",""].map(h=><div key={h}>{h}</div>)}
              </div>
              {outreach.map(o=>(
                <div key={o.id} style={{display:"grid",gridTemplateColumns:"1.2fr 1.2fr 1fr 1.5fr 2fr 32px",padding:"12px 18px",borderBottom:`1px solid ${BD}`,alignItems:"center"}}>
                  <div style={{fontSize:13,fontWeight:600}}>{o.name}</div>
                  <div style={{fontSize:13,color:TM}}>{o.business}</div>
                  <div style={{fontSize:12,color:TL}}>{o.date}</div>
                  <div style={{fontSize:12,color:TM}}>{o.member}</div>
                  <div style={{fontSize:12,color:TL}}>{o.notes}</div>
                  <button onClick={()=>del("outreach",o.id)} style={{background:"none",border:"none",color:TL,cursor:"pointer",fontSize:16,padding:0}}>×</button>
                </div>
              ))}
              {!outreach.length&&<div style={{padding:"20px 18px",fontSize:13,color:TL}}>No visits logged yet.</div>}
            </div>
          </div>
        )}

        {/* CONTACTS */}
        {tab==="contacts"&&(
          <div>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20}}>
              <div>{H("Contact Directory")}<p style={{color:TM,marginTop:3,fontSize:13}}>{contacts.length} contacts</p></div>
              <button style={btn()} onClick={()=>setShow(p=>({...p,contacts:true}))}>+ Add Contact</button>
            </div>
            {show.contacts&&(
              <div style={{...card(),marginBottom:18,background:GP,border:`1px solid ${GL}`}}>
                <h3 style={{margin:"0 0 14px",fontSize:14,color:GD}}>Add New Contact</h3>
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:12}}>
                  {[{k:"name",ph:"Full name..."},{k:"role",ph:"Title / Role..."},{k:"org",ph:"Organization..."},{k:"phone",ph:"Phone number..."},{k:"email",ph:"Email address...",full:true}].map(f=>(
                    <Field key={f.k} f={f} v={nc[f.k]} onChange={v=>setNc(p=>({...p,[f.k]:v}))}/>
                  ))}
                </div>
                <div style={{display:"flex",gap:8}}>
                  <button style={btn()} onClick={()=>{if(!nc.name)return;add("contacts",{...nc},()=>setNc({name:"",role:"",org:"",phone:"",email:""}),"contacts");}}>Add Contact</button>
                  <button style={btn(false)} onClick={()=>setShow(p=>({...p,contacts:false}))}>Cancel</button>
                </div>
              </div>
            )}
            <div style={{display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:14}}>
              {contacts.map(c=>(
                <div key={c.id} style={{...card(),display:"flex",gap:14,alignItems:"flex-start"}}>
                  <div style={{width:44,height:44,borderRadius:"50%",background:G,flexShrink:0,display:"flex",alignItems:"center",justifyContent:"center",color:W,fontWeight:700,fontSize:15}}>
                    {c.name.split(" ").map(n=>n[0]).join("").slice(0,2).toUpperCase()}
                  </div>
                  <div style={{flex:1}}>
                    <div style={{display:"flex",justifyContent:"space-between"}}>
                      <div>
                        <div style={{fontSize:14,fontWeight:700,color:GD}}>{c.name}</div>
                        <div style={{fontSize:12,color:TM}}>{c.role}</div>
                        <div style={{fontSize:12,color:TL}}>{c.org}</div>
                      </div>
                      <button onClick={()=>del("contacts",c.id)} style={{background:"none",border:"none",color:TL,cursor:"pointer",fontSize:16}}>×</button>
                    </div>
                    <div style={{marginTop:8,display:"flex",flexDirection:"column",gap:3}}>
                      {c.phone&&<div style={{fontSize:12,color:TM}}>📞 {c.phone}</div>}
                      {c.email&&<div style={{fontSize:12,color:G}}>✉ {c.email}</div>}
                    </div>
                  </div>
                </div>
              ))}
              {!contacts.length&&<div style={{...card(),fontSize:13,color:TL}}>No contacts yet.</div>}
            </div>
          </div>
        )}

        {/* VOTING */}
        {tab==="voting"&&(
          <div>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20}}>
              <div>{H("Voting Records")}<p style={{color:TM,marginTop:3,fontSize:13}}>Official vote log for board minutes</p></div>
              <button style={btn()} onClick={()=>setShow(p=>({...p,votes:true}))}>+ Record Vote</button>
            </div>
            <div style={{...card(),marginBottom:20,background:YP,border:`1px solid ${Y}`,display:"flex",gap:14,alignItems:"center"}}>
              <div style={{fontSize:24}}>🗳️</div>
              <div>
                <div style={{fontSize:13,fontWeight:700,color:GD}}>Official binding elections require a dedicated tool</div>
                <div style={{fontSize:12,color:TM,marginTop:3}}>
                  Recommended: <a href="https://electionbuddy.com" target="_blank" rel="noreferrer" style={{color:G}}>ElectionBuddy</a> · <a href="https://simplyvoting.com" target="_blank" rel="noreferrer" style={{color:G}}>Simply Voting</a> · <a href="https://opavote.com" target="_blank" rel="noreferrer" style={{color:G}}>OpaVote</a>
                  {" — "}This section documents vote outcomes for board records.
                </div>
              </div>
            </div>
            {show.votes&&(
              <div style={{...card(),marginBottom:18,background:GP,border:`1px solid ${GL}`}}>
                <h3 style={{margin:"0 0 14px",fontSize:14,color:GD}}>Record Vote Outcome</h3>
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:12}}>
                  {[{k:"title",ph:"Motion or vote title...",full:true},{k:"date",type:"date"},{k:"result",type:"select",opts:["Passed","Failed","Tabled"]},{k:"yes",type:"number",ph:"Yes votes"},{k:"no",type:"number",ph:"No votes"},{k:"abstain",type:"number",ph:"Abstain"},{k:"notes",ph:"Notes...",full:true}].map(f=>(
                    <Field key={f.k} f={f} v={nv[f.k]} onChange={v=>setNv(p=>({...p,[f.k]:v}))}/>
                  ))}
                </div>
                <div style={{display:"flex",gap:8}}>
                  <button style={btn()} onClick={()=>{if(!nv.title||!nv.date)return;add("votes",{...nv,yes:parseInt(nv.yes)||0,no:parseInt(nv.no)||0,abstain:parseInt(nv.abstain)||0},()=>setNv({title:"",date:"",result:"Passed",yes:"0",no:"0",abstain:"0",notes:""}),"votes");}}>Save Record</button>
                  <button style={btn(false)} onClick={()=>setShow(p=>({...p,votes:false}))}>Cancel</button>
                </div>
              </div>
            )}
            <div style={{display:"flex",flexDirection:"column",gap:12}}>
              {votes.map(v=>{
                const total=(v.yes||0)+(v.no||0)+(v.abstain||0);
                const rc=v.result==="Passed"?G:v.result==="Failed"?"#c04a3a":"#c07a3a";
                return(
                  <div key={v.id} style={card()}>
                    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:6}}>
                      <div style={{fontSize:15,fontWeight:700,color:GD}}>{v.title}</div>
                      <div style={{display:"flex",gap:8,alignItems:"center"}}>
                        <span style={pill(rc)}>{v.result}</span>
                        <button onClick={()=>del("votes",v.id)} style={{background:"none",border:"none",color:TL,cursor:"pointer",fontSize:16}}>×</button>
                      </div>
                    </div>
                    <div style={{fontSize:12,color:TL,marginBottom:10}}>📅 {v.date}{v.notes?` · ${v.notes}`:""}</div>
                    <div style={{display:"flex",gap:16,alignItems:"center"}}>
                      {[{l:"Yes",val:v.yes||0,c:G},{l:"No",val:v.no||0,c:"#c04a3a"},{l:"Abstain",val:v.abstain||0,c:TL}].map(x=>(
                        <div key={x.l} style={{textAlign:"center"}}>
                          <div style={{fontSize:20,fontWeight:800,color:x.c}}>{x.val}</div>
                          <div style={{fontSize:11,color:TL}}>{x.l}</div>
                        </div>
                      ))}
                      <div style={{flex:1}}>
                        <div style={{background:BD,borderRadius:20,height:8,overflow:"hidden"}}>
                          <div style={{height:"100%",borderRadius:20,background:G,width:total?`${((v.yes||0)/total)*100}%`:"0%"}}/>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
              {!votes.length&&<div style={{...card(),fontSize:13,color:TL}}>No vote records yet.</div>}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
