import { useState, useEffect, useCallback } from "react";
import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://orzevumgpctxtojxbnrc.supabase.co";
const SUPABASE_KEY = "sb_publishable_SJSlyWV_XkJOkw5hYHaE4w_P0n-JDJS";
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const C = {
  green:"#56907A",greenDark:"#3d6b5a",greenLight:"#7ab09e",greenPale:"#eaf3ef",
  yellow:"#D8DB86",yellowPale:"#f7f8e0",
  bg:"#FAFAF7",white:"#ffffff",
  text:"#1e3329",textMid:"#4a6b5a",textLight:"#8aaa98",border:"#ccddd5",
  red:"#c04a3a",orange:"#c07a3a",purple:"#7a6ab0",blue:"#3a8ab0",
};

const card=(extra={})=>({background:C.white,border:`1px solid ${C.border}`,borderRadius:12,padding:16,...extra});
const btn=(primary=true,small=false)=>({padding:small?"6px 12px":"9px 18px",borderRadius:8,border:primary?"none":`1px solid ${C.border}`,cursor:"pointer",fontWeight:600,fontSize:small?12:13,background:primary?C.green:"transparent",color:primary?C.white:C.textMid,fontFamily:"inherit",whiteSpace:"nowrap"});
const inp=(extra={})=>({background:C.bg,border:`1px solid ${C.border}`,borderRadius:8,padding:"8px 12px",color:C.text,fontSize:13,width:"100%",boxSizing:"border-box",fontFamily:"inherit",...extra});
const pill=(color)=>({display:"inline-block",padding:"2px 9px",borderRadius:20,background:`${color}20`,color,fontWeight:600,fontSize:11});
const lbl={fontSize:11,fontWeight:700,color:C.textLight,textTransform:"uppercase",letterSpacing:"0.05em",marginBottom:4,display:"block"};

const LOGO="data:image/png;base64,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";

const TABS=[
  {id:"dashboard",label:"Dashboard",icon:"⬡"},
  {id:"tasks",label:"Tasks",icon:"✓"},
  {id:"roadmap",label:"Roadmap",icon:"↗"},
  {id:"board",label:"Board Members",icon:"◎"},
  {id:"meetings",label:"Meetings",icon:"◷"},
  {id:"outreach",label:"Outreach",icon:"🤝"},
  {id:"contacts",label:"Contacts",icon:"📋"},
  {id:"voting",label:"Voting",icon:"🗳"},
];

const priC={High:C.red,Medium:C.orange,Low:C.textLight};
const stC={"In Progress":C.green,Backlog:C.textLight,Done:"#7a9a3a",Planned:C.textLight,Completed:C.green};
const mtgC={Board:C.green,Committee:C.purple,Planning:C.orange,Community:C.blue};
const qC={Q1:C.green,Q2:C.orange,Q3:C.purple,Q4:C.blue};
const memberColors=[C.green,C.orange,C.purple,C.blue,"#7a9a3a","#c04a3a","#5a7ab0","#8a6a3a"];

function Modal({title,onClose,children}){
  return(
    <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.45)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:1000,padding:16}}>
      <div style={{...card(),width:"100%",maxWidth:520,maxHeight:"90vh",overflowY:"auto"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16}}>
          <h3 style={{margin:0,fontSize:15,fontWeight:700,color:C.greenDark}}>{title}</h3>
          <button onClick={onClose} style={{background:"none",border:"none",fontSize:22,cursor:"pointer",color:C.textLight,lineHeight:1}}>×</button>
        </div>
        {children}
      </div>
    </div>
  );
}

function FR({label,children}){
  return <div style={{marginBottom:12}}><label style={lbl}>{label}</label>{children}</div>;
}

export default function App(){
  const [tab,setTab]=useState("dashboard");
  const [menuOpen,setMenuOpen]=useState(false);
  const [tasks,setTasks]=useState([]);
  const [projects,setProjects]=useState([]);
  const [projectTasks,setProjectTasks]=useState([]);
  const [meetings,setMeetings]=useState([]);
  const [outreach,setOutreach]=useState([]);
  const [contacts,setContacts]=useState([]);
  const [votes,setVotes]=useState([]);
  const [boardMembers,setBoardMembers]=useState([]);
  const [loading,setLoading]=useState(true);

  const [taskModal,setTaskModal]=useState(null);
  const [projectModal,setProjectModal]=useState(null);
  const [projectDetailId,setProjectDetailId]=useState(null);
  const [ptModal,setPtModal]=useState(false);
  const [meetingModal,setMeetingModal]=useState(null);
  const [outreachModal,setOutreachModal]=useState(null);
  const [contactModal,setContactModal]=useState(null);
  const [voteModal,setVoteModal]=useState(null);
  const [boardModal,setBoardModal]=useState(null);

  const load=useCallback(async()=>{
    setLoading(true);
    const [t,p,pt,m,o,c,v,b]=await Promise.all([
      supabase.from("tasks").select("*").order("created_at",{ascending:false}),
      supabase.from("projects").select("*").order("created_at",{ascending:false}),
      supabase.from("project_tasks").select("*").order("created_at",{ascending:true}),
      supabase.from("meetings").select("*").order("date",{ascending:true}),
      supabase.from("outreach").select("*").order("date",{ascending:false}),
      supabase.from("contacts").select("*").order("name",{ascending:true}),
      supabase.from("votes").select("*").order("date",{ascending:false}),
      supabase.from("board_members").select("*").order("name",{ascending:true}),
    ]);
    if(t.data)setTasks(t.data);
    if(p.data)setProjects(p.data);
    if(pt.data)setProjectTasks(pt.data);
    if(m.data)setMeetings(m.data);
    if(o.data)setOutreach(o.data);
    if(c.data)setContacts(c.data);
    if(v.data)setVotes(v.data);
    if(b.data)setBoardMembers(b.data);
    setLoading(false);
  },[]);

  useEffect(()=>{load();},[load]);

  useEffect(()=>{
    const tables=["tasks","projects","project_tasks","meetings","outreach","contacts","votes","board_members"];
    const subs=tables.map(t=>
      supabase.channel(`rt-${t}`).on("postgres_changes",{event:"*",schema:"public",table:t},load).subscribe()
    );
    return()=>subs.forEach(s=>supabase.removeChannel(s));
  },[load]);

  const allPeople=[...boardMembers.map(b=>b.name),...contacts.map(c=>c.name)].filter(Boolean);
  const thisWeek=outreach.filter(o=>{const d=new Date(o.date),n=new Date();return(n-d)/(864e5)<=7;});
  const projectDetail=projects.find(p=>p.id===projectDetailId);

  // ── Sidebar nav ───────────────────────────────────────────
  const NavLinks=({onClick})=>(
    <>
      {TABS.map(t=>(
        <button key={t.id} onClick={()=>{setTab(t.id);if(onClick)onClick();}} style={{
          width:"100%",display:"flex",alignItems:"center",gap:9,padding:"8px 10px",borderRadius:7,
          border:"none",cursor:"pointer",marginBottom:2,textAlign:"left",fontFamily:"inherit",
          background:tab===t.id?"rgba(255,255,255,0.2)":"transparent",
          color:tab===t.id?C.white:"rgba(255,255,255,0.72)",
          fontWeight:tab===t.id?700:400,fontSize:13,
          borderLeft:tab===t.id?`3px solid ${C.yellow}`:"3px solid transparent",
        }}>
          <span style={{fontSize:13}}>{t.icon}</span>{t.label}
        </button>
      ))}
    </>
  );

  if(loading) return(
    <div style={{display:"flex",alignItems:"center",justifyContent:"center",minHeight:"100vh",background:C.bg,fontFamily:"'Source Sans 3',Georgia,serif"}}>
      <div style={{textAlign:"center"}}>
        <img src={LOGO} alt="" style={{width:64,height:64,borderRadius:"50%",marginBottom:14,opacity:0.7}}/>
        <div style={{fontSize:15,fontWeight:600,color:C.greenDark}}>Loading Athens Main Street...</div>
      </div>
    </div>
  );

  // ── DASHBOARD ─────────────────────────────────────────────
  const Dashboard=()=>(
    <div>
      <div style={{marginBottom:18}}>
        <h1 style={{margin:0,fontSize:22,fontWeight:700,color:C.greenDark,fontFamily:"'Lora',Georgia,serif"}}>Dashboard</h1>
        <p style={{color:C.textMid,marginTop:3,fontSize:13}}>{new Date().toLocaleDateString("en-US",{weekday:"long",month:"long",day:"numeric",year:"numeric"})}</p>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:10,marginBottom:16}}>
        {[{l:"Total Tasks",v:tasks.length,c:C.green,i:"✓"},{l:"In Progress",v:tasks.filter(t=>t.status==="In Progress").length,c:C.orange,i:"⟳"},{l:"Meetings",v:meetings.length,c:C.purple,i:"◷"},{l:"Outreach This Week",v:thisWeek.length,c:C.blue,i:"🤝"}].map(s=>(
          <div key={s.l} style={{...card({borderTop:`3px solid ${s.c}`})}}>
            <div style={{fontSize:24,fontWeight:800,color:s.c,lineHeight:1}}>{s.v}</div>
            <div style={{fontSize:12,color:C.textMid,marginTop:3}}>{s.l}</div>
          </div>
        ))}
      </div>
      <div style={{...card({marginBottom:14})}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
          <h3 style={{margin:0,fontSize:14,fontWeight:700,color:C.greenDark}}>Active Projects</h3>
          <button onClick={()=>setTab("roadmap")} style={{background:"none",border:"none",color:C.green,cursor:"pointer",fontSize:12}}>View all →</button>
        </div>
        {projects.filter(p=>p.status!=="Completed").slice(0,5).map(p=>{
          const pts=projectTasks.filter(pt=>pt.project_id===p.id);
          const done=pts.filter(pt=>pt.done).length;
          const pct=pts.length?Math.round((done/pts.length)*100):0;
          return(
            <div key={p.id} style={{marginBottom:10,cursor:"pointer"}} onClick={()=>{setProjectDetailId(p.id);setTab("roadmap");}}>
              <div style={{display:"flex",justifyContent:"space-between",marginBottom:3}}>
                <span style={{fontSize:13,fontWeight:600,color:C.text}}>{p.title}</span>
                <span style={{fontSize:12,color:C.textLight}}>{pct}%</span>
              </div>
              <div style={{background:C.border,borderRadius:20,height:5}}>
                <div style={{height:"100%",borderRadius:20,background:qC[p.quarter]||C.green,width:`${pct}%`,transition:"width 0.3s"}}/>
              </div>
            </div>
          );
        })}
        {!projects.length&&<div style={{fontSize:13,color:C.textLight}}>No projects yet. Add them in the Roadmap section.</div>}
      </div>
      <div style={card()}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
          <h3 style={{margin:0,fontSize:14,fontWeight:700,color:C.greenDark}}>Recent Tasks</h3>
          <button onClick={()=>setTab("tasks")} style={{background:"none",border:"none",color:C.green,cursor:"pointer",fontSize:12}}>View all →</button>
        </div>
        {tasks.slice(0,5).map(t=>(
          <div key={t.id} style={{display:"flex",alignItems:"center",gap:10,padding:"8px 0",borderBottom:`1px solid ${C.border}`}}>
            <div style={{width:7,height:7,borderRadius:"50%",background:stC[t.status]||C.textLight,flexShrink:0}}/>
            <div style={{flex:1,fontSize:13,minWidth:0,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{t.title}</div>
            <span style={pill(priC[t.priority]||C.textLight)}>{t.priority}</span>
          </div>
        ))}
        {!tasks.length&&<div style={{fontSize:13,color:C.textLight}}>No tasks yet.</div>}
      </div>
    </div>
  );

  // ── TASKS ─────────────────────────────────────────────────
  const Tasks=()=>{
    const [filter,setFilter]=useState("All");
    const [form,setForm]=useState({title:"",status:"Backlog",priority:"Medium",assignee:"",project_id:"",due:""});
    useEffect(()=>{
      if(taskModal&&taskModal!=="new") setForm({title:taskModal.title||"",status:taskModal.status||"Backlog",priority:taskModal.priority||"Medium",assignee:taskModal.assignee||"",project_id:taskModal.project_id||"",due:taskModal.due||""});
      else setForm({title:"",status:"Backlog",priority:"Medium",assignee:"",project_id:"",due:""});
    },[]);
    async function save(){
      if(!form.title.trim())return;
      if(taskModal==="new") await supabase.from("tasks").insert([form]);
      else await supabase.from("tasks").update(form).eq("id",taskModal.id);
      setTaskModal(null); load();
    }
    const filtered=filter==="All"?tasks:tasks.filter(t=>t.status===filter);
    return(
      <div>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14,flexWrap:"wrap",gap:8}}>
          <div><h1 style={{margin:0,fontSize:20,fontWeight:700,color:C.greenDark,fontFamily:"'Lora',Georgia,serif"}}>Tasks & Backlog</h1><p style={{color:C.textMid,marginTop:2,fontSize:13}}>{tasks.length} tasks</p></div>
          <button style={btn()} onClick={()=>setTaskModal("new")}>+ New Task</button>
        </div>
        <div style={{display:"flex",gap:6,marginBottom:12,flexWrap:"wrap"}}>
          {["All","Backlog","In Progress","Done"].map(st=>(
            <button key={st} onClick={()=>setFilter(st)} style={{padding:"5px 12px",borderRadius:20,border:`1px solid`,borderColor:filter===st?C.green:C.border,background:filter===st?C.greenPale:"transparent",color:filter===st?C.greenDark:C.textMid,cursor:"pointer",fontSize:12,fontWeight:500}}>{st}</button>
          ))}
        </div>
        <div style={{...card({padding:0,overflow:"hidden"})}}>
          <div style={{overflowX:"auto"}}>
            <table style={{width:"100%",borderCollapse:"collapse",minWidth:500}}>
              <thead><tr style={{background:C.bg}}>
                {["Title","Project","Due","Status","Assignee",""].map(h=><th key={h} style={{padding:"9px 14px",textAlign:"left",fontSize:11,color:C.textLight,fontWeight:700,textTransform:"uppercase",letterSpacing:"0.04em",borderBottom:`1px solid ${C.border}`,whiteSpace:"nowrap"}}>{h}</th>)}
              </tr></thead>
              <tbody>
                {filtered.map(t=>{
                  const proj=projects.find(p=>p.id===t.project_id);
                  return(
                    <tr key={t.id} style={{cursor:"pointer"}} onClick={()=>setTaskModal(t)}>
                      <td style={{padding:"10px 14px",fontSize:13,fontWeight:500,borderBottom:`1px solid ${C.border}`,maxWidth:200,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{t.title}</td>
                      <td style={{padding:"10px 14px",fontSize:12,color:C.textMid,borderBottom:`1px solid ${C.border}`,whiteSpace:"nowrap"}}>{proj?proj.title:"—"}</td>
                      <td style={{padding:"10px 14px",fontSize:12,color:C.textLight,borderBottom:`1px solid ${C.border}`,whiteSpace:"nowrap"}}>{t.due||"—"}</td>
                      <td style={{padding:"10px 14px",borderBottom:`1px solid ${C.border}`}}><span style={pill(stC[t.status]||C.textLight)}>{t.status}</span></td>
                      <td style={{padding:"10px 14px",fontSize:12,color:C.textMid,borderBottom:`1px solid ${C.border}`,whiteSpace:"nowrap"}}>{t.assignee||"—"}</td>
                      <td style={{padding:"10px 14px",borderBottom:`1px solid ${C.border}`}}>
                        <button onClick={e=>{e.stopPropagation();supabase.from("tasks").delete().eq("id",t.id).then(load);}} style={{background:"none",border:"none",color:C.textLight,cursor:"pointer",fontSize:18,padding:0}}>×</button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            {!filtered.length&&<div style={{padding:"18px 16px",fontSize:13,color:C.textLight}}>No tasks found.</div>}
          </div>
        </div>
        {taskModal&&(
          <Modal title={taskModal==="new"?"New Task":"Edit Task"} onClose={()=>setTaskModal(null)}>
            <FR label="Title"><input style={inp()} value={form.title} onChange={e=>setForm(p=>({...p,title:e.target.value}))} placeholder="Task title..."/></FR>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
              <FR label="Status"><select style={inp()} value={form.status} onChange={e=>setForm(p=>({...p,status:e.target.value}))}>{["Backlog","In Progress","Done"].map(o=><option key={o}>{o}</option>)}</select></FR>
              <FR label="Priority"><select style={inp()} value={form.priority} onChange={e=>setForm(p=>({...p,priority:e.target.value}))}>{["Low","Medium","High"].map(o=><option key={o}>{o}</option>)}</select></FR>
              <FR label="Project"><select style={inp()} value={form.project_id} onChange={e=>setForm(p=>({...p,project_id:e.target.value}))}><option value="">— None —</option>{projects.map(p=><option key={p.id} value={p.id}>{p.title}</option>)}</select></FR>
              <FR label="Due Date"><input type="date" style={inp()} value={form.due} onChange={e=>setForm(p=>({...p,due:e.target.value}))}/></FR>
            </div>
            <FR label="Assign To"><select style={inp()} value={form.assignee} onChange={e=>setForm(p=>({...p,assignee:e.target.value}))}><option value="">— Unassigned —</option>{allPeople.map(name=><option key={name}>{name}</option>)}</select></FR>
            <div style={{marginTop:16,display:"flex",gap:8}}>
              <button style={btn()} onClick={save}>Save</button>
              <button style={btn(false)} onClick={()=>setTaskModal(null)}>Cancel</button>
            </div>
          </Modal>
        )}
      </div>
    );
  };

  // ── ROADMAP ───────────────────────────────────────────────
  const Roadmap=()=>{
    const [pForm,setPForm]=useState({title:"",quarter:"Q1",status:"Planned",assignees:"",notes:""});
    const [ptForm,setPtForm]=useState({title:"",assignee:""});
    useEffect(()=>{
      if(projectModal&&projectModal!=="new") setPForm({title:projectModal.title||"",quarter:projectModal.quarter||"Q1",status:projectModal.status||"Planned",assignees:projectModal.assignees||"",notes:projectModal.notes||""});
      else setPForm({title:"",quarter:"Q1",status:"Planned",assignees:"",notes:""});
    },[]);
    async function saveProject(){
      if(!pForm.title.trim())return;
      if(projectModal==="new") await supabase.from("projects").insert([pForm]);
      else await supabase.from("projects").update(pForm).eq("id",projectModal.id);
      setProjectModal(null); load();
    }
    async function savePT(){
      if(!ptForm.title.trim()||!projectDetailId)return;
      await supabase.from("project_tasks").insert([{...ptForm,project_id:projectDetailId,done:false}]);
      setPtModal(false); setPtForm({title:"",assignee:""}); load();
    }
    async function togglePT(pt){
      await supabase.from("project_tasks").update({done:!pt.done}).eq("id",pt.id);
      load();
    }

    if(projectDetailId&&projectDetail){
      const pts=projectTasks.filter(pt=>pt.project_id===projectDetailId);
      const done=pts.filter(pt=>pt.done).length;
      const pct=pts.length?Math.round((done/pts.length)*100):0;
      return(
        <div>
          <button onClick={()=>setProjectDetailId(null)} style={{...btn(false,true),marginBottom:14}}>← Back to Roadmap</button>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",flexWrap:"wrap",gap:8,marginBottom:14}}>
            <div>
              <h1 style={{margin:0,fontSize:20,fontWeight:700,color:C.greenDark,fontFamily:"'Lora',Georgia,serif"}}>{projectDetail.title}</h1>
              <div style={{display:"flex",gap:8,marginTop:6,flexWrap:"wrap"}}>
                <span style={pill(qC[projectDetail.quarter]||C.green)}>{projectDetail.quarter}</span>
                <span style={pill(stC[projectDetail.status]||C.textLight)}>{projectDetail.status}</span>
                {projectDetail.assignees&&<span style={{fontSize:12,color:C.textMid}}>👥 {projectDetail.assignees}</span>}
              </div>
            </div>
            <div style={{display:"flex",gap:8}}>
              <button style={btn(false,true)} onClick={()=>setProjectModal(projectDetail)}>Edit Project</button>
              <button style={btn(true,true)} onClick={()=>setPtModal(true)}>+ Add Task</button>
            </div>
          </div>
          {projectDetail.notes&&<div style={{...card({marginBottom:14,background:C.greenPale,border:`1px solid ${C.greenLight}`})}}>
            <p style={{margin:0,fontSize:13,color:C.textMid}}>{projectDetail.notes}</p>
          </div>}
          <div style={{...card({marginBottom:14})}}>
            <div style={{display:"flex",justifyContent:"space-between",marginBottom:6}}>
              <span style={{fontSize:13,fontWeight:600,color:C.greenDark}}>Overall Progress</span>
              <span style={{fontSize:13,fontWeight:700,color:C.green}}>{pct}%</span>
            </div>
            <div style={{background:C.border,borderRadius:20,height:8}}>
              <div style={{height:"100%",borderRadius:20,background:C.green,width:`${pct}%`,transition:"width 0.3s"}}/>
            </div>
            <div style={{fontSize:12,color:C.textLight,marginTop:5}}>{done} of {pts.length} tasks complete</div>
          </div>
          <div style={card()}>
            <h3 style={{margin:"0 0 12px",fontSize:14,fontWeight:700,color:C.greenDark}}>Checklist</h3>
            {pts.map(pt=>(
              <div key={pt.id} style={{display:"flex",alignItems:"center",gap:10,padding:"10px 0",borderBottom:`1px solid ${C.border}`}}>
                <input type="checkbox" checked={!!pt.done} onChange={()=>togglePT(pt)} style={{width:16,height:16,cursor:"pointer",accentColor:C.green,flexShrink:0}}/>
                <div style={{flex:1}}>
                  <div style={{fontSize:13,color:pt.done?C.textLight:C.text,textDecoration:pt.done?"line-through":"none"}}>{pt.title}</div>
                  {pt.assignee&&<div style={{fontSize:11,color:C.textLight,marginTop:1}}>👤 {pt.assignee}</div>}
                </div>
                <button onClick={()=>supabase.from("project_tasks").delete().eq("id",pt.id).then(load)} style={{background:"none",border:"none",color:C.textLight,cursor:"pointer",fontSize:16,flexShrink:0}}>×</button>
              </div>
            ))}
            {!pts.length&&<div style={{fontSize:13,color:C.textLight,padding:"8px 0"}}>No tasks yet. Click "+ Add Task" to get started!</div>}
          </div>
          {ptModal&&(
            <Modal title="Add Checklist Item" onClose={()=>setPtModal(false)}>
              <FR label="Task Name"><input style={inp()} value={ptForm.title} onChange={e=>setPtForm(p=>({...p,title:e.target.value}))} placeholder="What needs to be done?" autoFocus/></FR>
              <FR label="Assign To"><select style={inp()} value={ptForm.assignee} onChange={e=>setPtForm(p=>({...p,assignee:e.target.value}))}><option value="">— Unassigned —</option>{allPeople.map(name=><option key={name}>{name}</option>)}</select></FR>
              <div style={{marginTop:16,display:"flex",gap:8}}>
                <button style={btn()} onClick={savePT}>Add Task</button>
                <button style={btn(false)} onClick={()=>setPtModal(false)}>Cancel</button>
              </div>
            </Modal>
          )}
          {projectModal&&(
            <Modal title="Edit Project" onClose={()=>setProjectModal(null)}>
              <FR label="Title"><input style={inp()} value={pForm.title} onChange={e=>setPForm(p=>({...p,title:e.target.value}))}/></FR>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
                <FR label="Quarter"><select style={inp()} value={pForm.quarter} onChange={e=>setPForm(p=>({...p,quarter:e.target.value}))}>{["Q1","Q2","Q3","Q4"].map(o=><option key={o}>{o}</option>)}</select></FR>
                <FR label="Status"><select style={inp()} value={pForm.status} onChange={e=>setPForm(p=>({...p,status:e.target.value}))}>{["Planned","In Progress","Completed"].map(o=><option key={o}>{o}</option>)}</select></FR>
              </div>
              <FR label="Assigned People"><input style={inp()} value={pForm.assignees} onChange={e=>setPForm(p=>({...p,assignees:e.target.value}))} placeholder="e.g. Sarah, James, Kim"/></FR>
              <FR label="Notes"><textarea style={{...inp(),height:70,resize:"vertical"}} value={pForm.notes} onChange={e=>setPForm(p=>({...p,notes:e.target.value}))}/></FR>
              <div style={{marginTop:16,display:"flex",gap:8}}>
                <button style={btn()} onClick={saveProject}>Save</button>
                <button style={btn(false)} onClick={()=>setProjectModal(null)}>Cancel</button>
              </div>
            </Modal>
          )}
        </div>
      );
    }

    return(
      <div>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14,flexWrap:"wrap",gap:8}}>
          <div><h1 style={{margin:0,fontSize:20,fontWeight:700,color:C.greenDark,fontFamily:"'Lora',Georgia,serif"}}>Program Roadmap</h1><p style={{color:C.textMid,marginTop:2,fontSize:13}}>{projects.length} projects</p></div>
          <button style={btn()} onClick={()=>setProjectModal("new")}>+ New Project</button>
        </div>
        {["Q1","Q2","Q3","Q4"].map(q=>{
          const items=projects.filter(p=>p.quarter===q);
          if(!items.length)return null;
          return(
            <div key={q} style={{marginBottom:22}}>
              <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:10}}>
                <span style={{...pill(qC[q]),fontSize:13,padding:"3px 12px"}}>{q} 2026</span>
                <div style={{flex:1,height:1,background:C.border}}/>
              </div>
              <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(240px,1fr))",gap:12}}>
                {items.map(item=>{
                  const pts=projectTasks.filter(pt=>pt.project_id===item.id);
                  const done=pts.filter(pt=>pt.done).length;
                  const pct=pts.length?Math.round((done/pts.length)*100):0;
                  return(
                    <div key={item.id} style={{...card({borderTop:`3px solid ${qC[q]}`,cursor:"pointer",position:"relative"})}} onClick={()=>setProjectDetailId(item.id)}>
                      <div style={{display:"flex",justifyContent:"space-between",marginBottom:6}}>
                        <div style={{fontSize:14,fontWeight:700,color:C.greenDark,flex:1,paddingRight:24}}>{item.title}</div>
                      </div>
                      {item.assignees&&<div style={{fontSize:12,color:C.textMid,marginBottom:6}}>👥 {item.assignees}</div>}
                      <span style={pill(stC[item.status]||C.textLight)}>{item.status}</span>
                      <div style={{marginTop:10}}>
                        <div style={{display:"flex",justifyContent:"space-between",marginBottom:3}}>
                          <span style={{fontSize:11,color:C.textLight}}>{done}/{pts.length} tasks</span>
                          <span style={{fontSize:11,color:C.textLight}}>{pct}%</span>
                        </div>
                        <div style={{background:C.border,borderRadius:20,height:5}}>
                          <div style={{height:"100%",borderRadius:20,background:qC[q],width:`${pct}%`}}/>
                        </div>
                      </div>
                      <button onClick={e=>{e.stopPropagation();setProjectModal(item);}} style={{position:"absolute",top:12,right:32,background:"none",border:"none",color:C.textLight,cursor:"pointer",fontSize:13,padding:0}}>✏️</button>
                      <button onClick={e=>{e.stopPropagation();supabase.from("projects").delete().eq("id",item.id).then(load);}} style={{position:"absolute",top:10,right:10,background:"none",border:"none",color:C.textLight,cursor:"pointer",fontSize:16,padding:0}}>×</button>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
        {!projects.length&&<div style={{...card({textAlign:"center",padding:40})}}>
          <div style={{fontSize:28,marginBottom:10}}>↗</div>
          <div style={{fontSize:14,fontWeight:600,color:C.greenDark}}>No projects yet</div>
          <div style={{fontSize:13,color:C.textLight,marginTop:5}}>Click "+ New Project" to add your first one</div>
        </div>}
        {projectModal&&(
          <Modal title={projectModal==="new"?"New Project":"Edit Project"} onClose={()=>setProjectModal(null)}>
            <FR label="Project Title"><input style={inp()} value={pForm.title} onChange={e=>setPForm(p=>({...p,title:e.target.value}))} placeholder="e.g. Spring Festival 2026" autoFocus/></FR>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
              <FR label="Quarter"><select style={inp()} value={pForm.quarter} onChange={e=>setPForm(p=>({...p,quarter:e.target.value}))}>{["Q1","Q2","Q3","Q4"].map(o=><option key={o}>{o}</option>)}</select></FR>
              <FR label="Status"><select style={inp()} value={pForm.status} onChange={e=>setPForm(p=>({...p,status:e.target.value}))}>{["Planned","In Progress","Completed"].map(o=><option key={o}>{o}</option>)}</select></FR>
            </div>
            <FR label="Assigned People"><input style={inp()} value={pForm.assignees} onChange={e=>setPForm(p=>({...p,assignees:e.target.value}))} placeholder="e.g. Sarah, James, Kim"/></FR>
            <FR label="Notes / Description"><textarea style={{...inp(),height:70,resize:"vertical"}} value={pForm.notes} onChange={e=>setPForm(p=>({...p,notes:e.target.value}))} placeholder="Optional notes..."/></FR>
            <div style={{marginTop:16,display:"flex",gap:8}}>
              <button style={btn()} onClick={saveProject}>{projectModal==="new"?"Create Project":"Save Changes"}</button>
              <button style={btn(false)} onClick={()=>setProjectModal(null)}>Cancel</button>
            </div>
          </Modal>
        )}
      </div>
    );
  };

  // ── BOARD MEMBERS ─────────────────────────────────────────
  const Board=()=>{
    const [form,setForm]=useState({name:"",role:"",phone:"",email:"",status:"Active"});
    useEffect(()=>{
      if(boardModal&&boardModal!=="new") setForm({name:boardModal.name||"",role:boardModal.role||"",phone:boardModal.phone||"",email:boardModal.email||"",status:boardModal.status||"Active"});
      else setForm({name:"",role:"",phone:"",email:"",status:"Active"});
    },[]);
    async function save(){
      if(!form.name.trim())return;
      if(boardModal==="new") await supabase.from("board_members").insert([form]);
      else await supabase.from("board_members").update(form).eq("id",boardModal.id);
      setBoardModal(null); load();
    }
    return(
      <div>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14,flexWrap:"wrap",gap:8}}>
          <div><h1 style={{margin:0,fontSize:20,fontWeight:700,color:C.greenDark,fontFamily:"'Lora',Georgia,serif"}}>Board Members</h1><p style={{color:C.textMid,marginTop:2,fontSize:13}}>{boardMembers.length} members</p></div>
          <button style={btn()} onClick={()=>setBoardModal("new")}>+ Add Member</button>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(240px,1fr))",gap:12}}>
          {boardMembers.map((m,i)=>{
            const ini=m.name.split(" ").map(n=>n[0]).join("").slice(0,2).toUpperCase();
            const color=memberColors[i%memberColors.length];
            const mt=tasks.filter(t=>t.assignee===m.name).length;
            return(
              <div key={m.id} style={card()}>
                <div style={{display:"flex",gap:12,alignItems:"flex-start"}}>
                  <div style={{width:44,height:44,borderRadius:"50%",background:color,display:"flex",alignItems:"center",justifyContent:"center",color:C.white,fontWeight:800,fontSize:14,flexShrink:0}}>{ini}</div>
                  <div style={{flex:1,minWidth:0}}>
                    <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
                      <div style={{fontSize:14,fontWeight:700,color:C.greenDark,minWidth:0,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",flex:1,paddingRight:4}}>{m.name}</div>
                      <div style={{display:"flex",gap:2,flexShrink:0}}>
                        <button onClick={()=>setBoardModal(m)} style={{background:"none",border:"none",color:C.textLight,cursor:"pointer",fontSize:13,padding:"0 2px"}}>✏️</button>
                        <button onClick={()=>supabase.from("board_members").delete().eq("id",m.id).then(load)} style={{background:"none",border:"none",color:C.textLight,cursor:"pointer",fontSize:16,padding:"0 2px"}}>×</button>
                      </div>
                    </div>
                    <div style={{fontSize:12,color:C.textMid}}>{m.role}</div>
                    <div style={{display:"flex",alignItems:"center",gap:5,marginTop:4}}>
                      <div style={{width:6,height:6,borderRadius:"50%",background:m.status==="Active"?C.green:C.textLight}}/>
                      <span style={{fontSize:11,color:C.textLight}}>{m.status}</span>
                      <span style={{fontSize:11,color:C.textLight,marginLeft:"auto"}}>{mt} task{mt!==1?"s":""}</span>
                    </div>
                  </div>
                </div>
                {(m.phone||m.email)&&<div style={{marginTop:10,paddingTop:10,borderTop:`1px solid ${C.border}`,display:"flex",flexDirection:"column",gap:2}}>
                  {m.phone&&<div style={{fontSize:12,color:C.textMid}}>📞 {m.phone}</div>}
                  {m.email&&<div style={{fontSize:12,color:C.green,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>✉ {m.email}</div>}
                </div>}
              </div>
            );
          })}
          {!boardMembers.length&&<div style={{...card({fontSize:13,color:C.textLight})}}>No board members yet. Add your first one!</div>}
        </div>
        {boardModal&&(
          <Modal title={boardModal==="new"?"Add Board Member":"Edit Board Member"} onClose={()=>setBoardModal(null)}>
            <FR label="Full Name"><input style={inp()} value={form.name} onChange={e=>setForm(p=>({...p,name:e.target.value}))} placeholder="Full name..." autoFocus/></FR>
            <FR label="Title / Role"><input style={inp()} value={form.role} onChange={e=>setForm(p=>({...p,role:e.target.value}))} placeholder="e.g. Board Chair, Executive Director..."/></FR>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
              <FR label="Phone"><input style={inp()} value={form.phone} onChange={e=>setForm(p=>({...p,phone:e.target.value}))} placeholder="Phone..."/></FR>
              <FR label="Status"><select style={inp()} value={form.status} onChange={e=>setForm(p=>({...p,status:e.target.value}))}><option>Active</option><option>Away</option><option>Inactive</option></select></FR>
            </div>
            <FR label="Email"><input style={inp()} value={form.email} onChange={e=>setForm(p=>({...p,email:e.target.value}))} placeholder="Email address..."/></FR>
            <div style={{marginTop:16,display:"flex",gap:8}}>
              <button style={btn()} onClick={save}>{boardModal==="new"?"Add Member":"Save Changes"}</button>
              <button style={btn(false)} onClick={()=>setBoardModal(null)}>Cancel</button>
            </div>
          </Modal>
        )}
      </div>
    );
  };

  // ── MEETINGS ──────────────────────────────────────────────
  const Meetings=()=>{
    const [form,setForm]=useState({title:"",date:"",time:"",duration:"1h",type:"Board",attendees:"",notes:""});
    useEffect(()=>{
      if(meetingModal&&meetingModal!=="new") setForm({title:meetingModal.title||"",date:meetingModal.date||"",time:meetingModal.time||"",duration:meetingModal.duration||"1h",type:meetingModal.type||"Board",attendees:meetingModal.attendees||"",notes:meetingModal.notes||""});
      else setForm({title:"",date:"",time:"",duration:"1h",type:"Board",attendees:"",notes:""});
    },[]);
    async function save(){
      if(!form.title||!form.date)return;
      if(meetingModal==="new") await supabase.from("meetings").insert([form]);
      else await supabase.from("meetings").update(form).eq("id",meetingModal.id);
      setMeetingModal(null); load();
    }
    return(
      <div>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14,flexWrap:"wrap",gap:8}}>
          <div><h1 style={{margin:0,fontSize:20,fontWeight:700,color:C.greenDark,fontFamily:"'Lora',Georgia,serif"}}>Meetings</h1><p style={{color:C.textMid,marginTop:2,fontSize:13}}>{meetings.length} scheduled</p></div>
          <button style={btn()} onClick={()=>setMeetingModal("new")}>+ Schedule Meeting</button>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(260px,1fr))",gap:12}}>
          {meetings.map(m=>(
            <div key={m.id} style={{...card({borderLeft:`4px solid ${mtgC[m.type]||C.green}`,cursor:"pointer"})}} onClick={()=>setMeetingModal(m)}>
              <div style={{display:"flex",justifyContent:"space-between",marginBottom:8}}>
                <div style={{fontSize:14,fontWeight:700,color:C.greenDark,flex:1,paddingRight:8}}>{m.title}</div>
                <button onClick={e=>{e.stopPropagation();supabase.from("meetings").delete().eq("id",m.id).then(load);}} style={{background:"none",border:"none",color:C.textLight,cursor:"pointer",fontSize:16,flexShrink:0}}>×</button>
              </div>
              <div style={{display:"flex",gap:10,marginBottom:8,flexWrap:"wrap"}}>
                <span style={{fontSize:12,color:C.textMid}}>📅 {m.date}</span>
                {m.time&&<span style={{fontSize:12,color:C.textMid}}>🕐 {m.time}</span>}
                <span style={{fontSize:12,color:C.textMid}}>⏱ {m.duration}</span>
              </div>
              <span style={pill(mtgC[m.type]||C.green)}>{m.type}</span>
              {m.attendees&&<div style={{fontSize:12,color:C.textMid,marginTop:8}}>👥 {m.attendees}</div>}
              {m.notes&&<div style={{fontSize:12,color:C.textLight,marginTop:4}}>{m.notes}</div>}
            </div>
          ))}
          {!meetings.length&&<div style={{...card({fontSize:13,color:C.textLight})}}>No meetings yet.</div>}
        </div>
        {meetingModal&&(
          <Modal title={meetingModal==="new"?"Schedule Meeting":"Edit Meeting"} onClose={()=>setMeetingModal(null)}>
            <FR label="Meeting Title"><input style={inp()} value={form.title} onChange={e=>setForm(p=>({...p,title:e.target.value}))} placeholder="Meeting title..." autoFocus/></FR>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
              <FR label="Date"><input type="date" style={inp()} value={form.date} onChange={e=>setForm(p=>({...p,date:e.target.value}))}/></FR>
              <FR label="Time"><input type="time" style={inp()} value={form.time} onChange={e=>setForm(p=>({...p,time:e.target.value}))}/></FR>
              <FR label="Duration"><select style={inp()} value={form.duration} onChange={e=>setForm(p=>({...p,duration:e.target.value}))}>{["30m","1h","1.5h","2h","3h"].map(o=><option key={o}>{o}</option>)}</select></FR>
              <FR label="Type"><select style={inp()} value={form.type} onChange={e=>setForm(p=>({...p,type:e.target.value}))}>{["Board","Committee","Planning","Community"].map(o=><option key={o}>{o}</option>)}</select></FR>
            </div>
            <FR label="Attendees"><input style={inp()} value={form.attendees} onChange={e=>setForm(p=>({...p,attendees:e.target.value}))} placeholder="e.g. Sarah, James, Kim..."/></FR>
            <FR label="Notes"><textarea style={{...inp(),height:60,resize:"vertical"}} value={form.notes} onChange={e=>setForm(p=>({...p,notes:e.target.value}))} placeholder="Optional notes..."/></FR>
            <div style={{marginTop:16,display:"flex",gap:8}}>
              <button style={btn()} onClick={save}>{meetingModal==="new"?"Schedule":"Save Changes"}</button>
              <button style={btn(false)} onClick={()=>setMeetingModal(null)}>Cancel</button>
            </div>
          </Modal>
        )}
      </div>
    );
  };

  // ── OUTREACH ──────────────────────────────────────────────
  const Outreach=()=>{
    const [form,setForm]=useState({name:"",business:"",date:"",member:"",notes:""});
    useEffect(()=>{
      if(outreachModal&&outreachModal!=="new") setForm({name:outreachModal.name||"",business:outreachModal.business||"",date:outreachModal.date||"",member:outreachModal.member||"",notes:outreachModal.notes||""});
      else setForm({name:"",business:"",date:"",member:"",notes:""});
    },[]);
    async function save(){
      if(!form.name||!form.date)return;
      if(outreachModal==="new") await supabase.from("outreach").insert([form]);
      else await supabase.from("outreach").update(form).eq("id",outreachModal.id);
      setOutreachModal(null); load();
    }
    return(
      <div>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14,flexWrap:"wrap",gap:8}}>
          <div><h1 style={{margin:0,fontSize:20,fontWeight:700,color:C.greenDark,fontFamily:"'Lora',Georgia,serif"}}>Community Outreach</h1><p style={{color:C.textMid,marginTop:2,fontSize:13}}>Weekly goal: 1+ visit · <strong style={{color:thisWeek.length>=1?C.green:C.red}}>{thisWeek.length} visit{thisWeek.length!==1?"s":""} this week</strong></p></div>
          <button style={btn()} onClick={()=>setOutreachModal("new")}>+ Log Visit</button>
        </div>
        <div style={{...card({marginBottom:14,background:thisWeek.length>=1?C.greenPale:"#fdf0ee",border:`1px solid ${thisWeek.length>=1?C.greenLight:"#e0a090"}`}),display:"flex",alignItems:"center",gap:12}}>
          <div style={{fontSize:22}}>{thisWeek.length>=1?"✅":"⚠️"}</div>
          <div>
            <div style={{fontSize:13,fontWeight:700,color:thisWeek.length>=1?C.greenDark:C.red}}>{thisWeek.length>=1?`Goal met — ${thisWeek.length} visit${thisWeek.length!==1?"s":""} this week!`:"No visits logged this week yet"}</div>
            <div style={{fontSize:12,color:C.textMid}}>President's goal: at least one community visit per week</div>
          </div>
        </div>
        <div style={{...card({padding:0,overflow:"hidden"})}}>
          <div style={{overflowX:"auto"}}>
            <table style={{width:"100%",borderCollapse:"collapse",minWidth:480}}>
              <thead><tr style={{background:C.bg}}>
                {["Contact","Business","Date","Staff Member","Notes",""].map(h=><th key={h} style={{padding:"9px 14px",textAlign:"left",fontSize:11,color:C.textLight,fontWeight:700,textTransform:"uppercase",letterSpacing:"0.04em",borderBottom:`1px solid ${C.border}`,whiteSpace:"nowrap"}}>{h}</th>)}
              </tr></thead>
              <tbody>
                {outreach.map(o=>(
                  <tr key={o.id} style={{cursor:"pointer"}} onClick={()=>setOutreachModal(o)}>
                    <td style={{padding:"10px 14px",fontSize:13,fontWeight:600,borderBottom:`1px solid ${C.border}`}}>{o.name}</td>
                    <td style={{padding:"10px 14px",fontSize:13,color:C.textMid,borderBottom:`1px solid ${C.border}`}}>{o.business}</td>
                    <td style={{padding:"10px 14px",fontSize:12,color:C.textLight,borderBottom:`1px solid ${C.border}`,whiteSpace:"nowrap"}}>{o.date}</td>
                    <td style={{padding:"10px 14px",fontSize:12,color:C.textMid,borderBottom:`1px solid ${C.border}`,whiteSpace:"nowrap"}}>{o.member}</td>
                    <td style={{padding:"10px 14px",fontSize:12,color:C.textLight,borderBottom:`1px solid ${C.border}`}}>{o.notes}</td>
                    <td style={{padding:"10px 14px",borderBottom:`1px solid ${C.border}`}}><button onClick={e=>{e.stopPropagation();supabase.from("outreach").delete().eq("id",o.id).then(load);}} style={{background:"none",border:"none",color:C.textLight,cursor:"pointer",fontSize:16}}>×</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
            {!outreach.length&&<div style={{padding:"18px 16px",fontSize:13,color:C.textLight}}>No visits logged yet.</div>}
          </div>
        </div>
        {outreachModal&&(
          <Modal title={outreachModal==="new"?"Log Community Visit":"Edit Visit"} onClose={()=>setOutreachModal(null)}>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
              <FR label="Contact Name"><input style={inp()} value={form.name} onChange={e=>setForm(p=>({...p,name:e.target.value}))} placeholder="Name..." autoFocus/></FR>
              <FR label="Business/Org"><input style={inp()} value={form.business} onChange={e=>setForm(p=>({...p,business:e.target.value}))} placeholder="Business..."/></FR>
              <FR label="Date"><input type="date" style={inp()} value={form.date} onChange={e=>setForm(p=>({...p,date:e.target.value}))}/></FR>
              <FR label="Staff Member"><select style={inp()} value={form.member} onChange={e=>setForm(p=>({...p,member:e.target.value}))}><option value="">— Select —</option>{boardMembers.map(b=><option key={b.id}>{b.name}</option>)}</select></FR>
            </div>
            <FR label="Notes"><textarea style={{...inp(),height:60,resize:"vertical"}} value={form.notes} onChange={e=>setForm(p=>({...p,notes:e.target.value}))} placeholder="Notes..."/></FR>
            <div style={{marginTop:16,display:"flex",gap:8}}>
              <button style={btn()} onClick={save}>{outreachModal==="new"?"Log Visit":"Save Changes"}</button>
              <button style={btn(false)} onClick={()=>setOutreachModal(null)}>Cancel</button>
            </div>
          </Modal>
        )}
      </div>
    );
  };

  // ── CONTACTS ──────────────────────────────────────────────
  const Contacts=()=>{
    const [form,setForm]=useState({name:"",role:"",org:"",phone:"",email:""});
    useEffect(()=>{
      if(contactModal&&contactModal!=="new") setForm({name:contactModal.name||"",role:contactModal.role||"",org:contactModal.org||"",phone:contactModal.phone||"",email:contactModal.email||""});
      else setForm({name:"",role:"",org:"",phone:"",email:""});
    },[]);
    async function save(){
      if(!form.name)return;
      if(contactModal==="new") await supabase.from("contacts").insert([form]);
      else await supabase.from("contacts").update(form).eq("id",contactModal.id);
      setContactModal(null); load();
    }
    return(
      <div>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14,flexWrap:"wrap",gap:8}}>
          <div><h1 style={{margin:0,fontSize:20,fontWeight:700,color:C.greenDark,fontFamily:"'Lora',Georgia,serif"}}>Contact Directory</h1><p style={{color:C.textMid,marginTop:2,fontSize:13}}>{contacts.length} contacts</p></div>
          <button style={btn()} onClick={()=>setContactModal("new")}>+ Add Contact</button>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(240px,1fr))",gap:12}}>
          {contacts.map(c=>{
            const ini=c.name.split(" ").map(n=>n[0]).join("").slice(0,2).toUpperCase();
            return(
              <div key={c.id} style={{...card({cursor:"pointer"})}} onClick={()=>setContactModal(c)}>
                <div style={{display:"flex",gap:12,alignItems:"flex-start"}}>
                  <div style={{width:42,height:42,borderRadius:"50%",background:C.green,flexShrink:0,display:"flex",alignItems:"center",justifyContent:"center",color:C.white,fontWeight:700,fontSize:14}}>{ini}</div>
                  <div style={{flex:1,minWidth:0}}>
                    <div style={{display:"flex",justifyContent:"space-between"}}>
                      <div style={{fontSize:14,fontWeight:700,color:C.greenDark,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",flex:1}}>{c.name}</div>
                      <button onClick={e=>{e.stopPropagation();supabase.from("contacts").delete().eq("id",c.id).then(load);}} style={{background:"none",border:"none",color:C.textLight,cursor:"pointer",fontSize:16,flexShrink:0}}>×</button>
                    </div>
                    <div style={{fontSize:12,color:C.textMid}}>{c.role}</div>
                    <div style={{fontSize:12,color:C.textLight}}>{c.org}</div>
                    <div style={{marginTop:5,display:"flex",flexDirection:"column",gap:2}}>
                      {c.phone&&<div style={{fontSize:12,color:C.textMid}}>📞 {c.phone}</div>}
                      {c.email&&<div style={{fontSize:12,color:C.green,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>✉ {c.email}</div>}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
          {!contacts.length&&<div style={{...card({fontSize:13,color:C.textLight})}}>No contacts yet.</div>}
        </div>
        {contactModal&&(
          <Modal title={contactModal==="new"?"Add Contact":"Edit Contact"} onClose={()=>setContactModal(null)}>
            <FR label="Full Name"><input style={inp()} value={form.name} onChange={e=>setForm(p=>({...p,name:e.target.value}))} placeholder="Full name..." autoFocus/></FR>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
              <FR label="Title / Role"><input style={inp()} value={form.role} onChange={e=>setForm(p=>({...p,role:e.target.value}))} placeholder="Title..."/></FR>
              <FR label="Organization"><input style={inp()} value={form.org} onChange={e=>setForm(p=>({...p,org:e.target.value}))} placeholder="Org..."/></FR>
              <FR label="Phone"><input style={inp()} value={form.phone} onChange={e=>setForm(p=>({...p,phone:e.target.value}))} placeholder="Phone..."/></FR>
              <FR label="Email"><input style={inp()} value={form.email} onChange={e=>setForm(p=>({...p,email:e.target.value}))} placeholder="Email..."/></FR>
            </div>
            <div style={{marginTop:16,display:"flex",gap:8}}>
              <button style={btn()} onClick={save}>{contactModal==="new"?"Add Contact":"Save Changes"}</button>
              <button style={btn(false)} onClick={()=>setContactModal(null)}>Cancel</button>
            </div>
          </Modal>
        )}
      </div>
    );
  };

  // ── VOTING ────────────────────────────────────────────────
  const Voting=()=>{
    const [form,setForm]=useState({title:"",date:"",result:"Passed",yes:0,no:0,abstain:0,notes:""});
    useEffect(()=>{
      if(voteModal&&voteModal!=="new") setForm({title:voteModal.title||"",date:voteModal.date||"",result:voteModal.result||"Passed",yes:voteModal.yes||0,no:voteModal.no||0,abstain:voteModal.abstain||0,notes:voteModal.notes||""});
      else setForm({title:"",date:"",result:"Passed",yes:0,no:0,abstain:0,notes:""});
    },[]);
    async function save(){
      if(!form.title||!form.date)return;
      const data={...form,yes:parseInt(form.yes)||0,no:parseInt(form.no)||0,abstain:parseInt(form.abstain)||0};
      if(voteModal==="new") await supabase.from("votes").insert([data]);
      else await supabase.from("votes").update(data).eq("id",voteModal.id);
      setVoteModal(null); load();
    }
    const rc={Passed:C.green,Failed:C.red,Tabled:C.orange};
    return(
      <div>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14,flexWrap:"wrap",gap:8}}>
          <div><h1 style={{margin:0,fontSize:20,fontWeight:700,color:C.greenDark,fontFamily:"'Lora',Georgia,serif"}}>Voting Records</h1><p style={{color:C.textMid,marginTop:2,fontSize:13}}>Official vote log for board minutes</p></div>
          <button style={btn()} onClick={()=>setVoteModal("new")}>+ Record Vote</button>
        </div>
        <div style={{...card({marginBottom:14,background:C.yellowPale,border:`1px solid ${C.yellow}`}),display:"flex",gap:12,alignItems:"center"}}>
          <div style={{fontSize:18}}>🗳️</div>
          <div style={{fontSize:12,color:C.textMid}}><strong style={{color:C.greenDark}}>Binding elections require a dedicated tool.</strong>{" "}Recommended: <a href="https://electionbuddy.com" target="_blank" rel="noreferrer" style={{color:C.green}}>ElectionBuddy</a> · <a href="https://simplyvoting.com" target="_blank" rel="noreferrer" style={{color:C.green}}>Simply Voting</a> · <a href="https://opavote.com" target="_blank" rel="noreferrer" style={{color:C.green}}>OpaVote</a></div>
        </div>
        <div style={{display:"flex",flexDirection:"column",gap:10}}>
          {votes.map(v=>{
            const total=(v.yes||0)+(v.no||0)+(v.abstain||0);
            const color=rc[v.result]||C.green;
            return(
              <div key={v.id} style={{...card({cursor:"pointer"})}} onClick={()=>setVoteModal(v)}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:6,flexWrap:"wrap",gap:8}}>
                  <div style={{fontSize:14,fontWeight:700,color:C.greenDark,flex:1}}>{v.title}</div>
                  <div style={{display:"flex",gap:8,alignItems:"center"}}>
                    <span style={pill(color)}>{v.result}</span>
                    <button onClick={e=>{e.stopPropagation();supabase.from("votes").delete().eq("id",v.id).then(load);}} style={{background:"none",border:"none",color:C.textLight,cursor:"pointer",fontSize:16}}>×</button>
                  </div>
                </div>
                <div style={{fontSize:12,color:C.textLight,marginBottom:10}}>📅 {v.date}{v.notes?` · ${v.notes}`:""}</div>
                <div style={{display:"flex",gap:14,alignItems:"center"}}>
                  {[{l:"Yes",val:v.yes||0,c:C.green},{l:"No",val:v.no||0,c:C.red},{l:"Abstain",val:v.abstain||0,c:C.textLight}].map(x=>(
                    <div key={x.l} style={{textAlign:"center"}}>
                      <div style={{fontSize:18,fontWeight:800,color:x.c}}>{x.val}</div>
                      <div style={{fontSize:11,color:C.textLight}}>{x.l}</div>
                    </div>
                  ))}
                  <div style={{flex:1}}>
                    <div style={{background:C.border,borderRadius:20,height:6}}>
                      <div style={{height:"100%",borderRadius:20,background:C.green,width:total?`${((v.yes||0)/total)*100}%`:"0%"}}/>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
          {!votes.length&&<div style={{...card({fontSize:13,color:C.textLight})}}>No vote records yet.</div>}
        </div>
        {voteModal&&(
          <Modal title={voteModal==="new"?"Record Vote":"Edit Vote"} onClose={()=>setVoteModal(null)}>
            <FR label="Motion / Vote Title"><input style={inp()} value={form.title} onChange={e=>setForm(p=>({...p,title:e.target.value}))} placeholder="What was voted on?" autoFocus/></FR>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
              <FR label="Date"><input type="date" style={inp()} value={form.date} onChange={e=>setForm(p=>({...p,date:e.target.value}))}/></FR>
              <FR label="Result"><select style={inp()} value={form.result} onChange={e=>setForm(p=>({...p,result:e.target.value}))}><option>Passed</option><option>Failed</option><option>Tabled</option></select></FR>
              <FR label="Yes Votes"><input type="number" style={inp()} value={form.yes} onChange={e=>setForm(p=>({...p,yes:e.target.value}))} min="0"/></FR>
              <FR label="No Votes"><input type="number" style={inp()} value={form.no} onChange={e=>setForm(p=>({...p,no:e.target.value}))} min="0"/></FR>
              <FR label="Abstentions"><input type="number" style={inp()} value={form.abstain} onChange={e=>setForm(p=>({...p,abstain:e.target.value}))} min="0"/></FR>
            </div>
            <FR label="Notes"><textarea style={{...inp(),height:55,resize:"vertical"}} value={form.notes} onChange={e=>setForm(p=>({...p,notes:e.target.value}))} placeholder="Optional notes..."/></FR>
            <div style={{marginTop:16,display:"flex",gap:8}}>
              <button style={btn()} onClick={save}>{voteModal==="new"?"Record Vote":"Save Changes"}</button>
              <button style={btn(false)} onClick={()=>setVoteModal(null)}>Cancel</button>
            </div>
          </Modal>
        )}
      </div>
    );
  };

  const pages={dashboard:<Dashboard/>,tasks:<Tasks/>,roadmap:<Roadmap/>,board:<Board/>,meetings:<Meetings/>,outreach:<Outreach/>,contacts:<Contacts/>,voting:<Voting/>};

  return(
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Lora:wght@400;600;700&family=Source+Sans+3:wght@400;500;600;700&display=swap');
        *{box-sizing:border-box;margin:0;padding:0;}
        body{background:#FAFAF7;font-family:'Source Sans 3',Georgia,serif;}
        .app-layout{display:flex;min-height:100vh;}
        .sidebar{width:220px;background:#56907A;display:flex;flex-direction:column;position:sticky;top:0;height:100vh;flex-shrink:0;}
        .mobile-bar{display:none;background:#56907A;padding:12px 16px;align-items:center;justify-content:space-between;position:sticky;top:0;z-index:50;}
        .main-content{flex:1;padding:20px;overflow-y:auto;min-width:0;}
        @media(max-width:767px){
          .sidebar{display:none;}
          .mobile-bar{display:flex;}
          .main-content{padding:16px;}
        }
      `}</style>
      <div className="app-layout">
        <div className="sidebar">
          <div style={{padding:"20px 16px",borderBottom:"1px solid rgba(255,255,255,0.2)",textAlign:"center"}}>
            <img src={LOGO} alt="Athens" style={{width:52,height:52,borderRadius:"50%",marginBottom:8,border:"2px solid rgba(255,255,255,0.3)"}}/>
            <div style={{color:C.white,fontWeight:700,fontSize:13,letterSpacing:"0.04em"}}>ATHENS MAIN STREET</div>
            <div style={{color:"rgba(255,255,255,0.55)",fontSize:10,marginTop:2}}>The Friendly City</div>
          </div>
          <nav style={{padding:"10px 8px",flex:1,overflowY:"auto"}}>
            <NavLinks/>
          </nav>
          <div style={{padding:"12px 16px",borderTop:"1px solid rgba(255,255,255,0.2)"}}>
            <div style={{fontSize:10,color:"rgba(255,255,255,0.45)",textAlign:"center"}}>Athens, Tennessee · Est. 1822</div>
          </div>
        </div>

        <div style={{flex:1,display:"flex",flexDirection:"column",minWidth:0}}>
          <div className="mobile-bar">
            <div style={{display:"flex",alignItems:"center",gap:10}}>
              <img src={LOGO} alt="" style={{width:30,height:30,borderRadius:"50%"}}/>
              <span style={{color:C.white,fontWeight:700,fontSize:14}}>Athens Main Street</span>
            </div>
            <button onClick={()=>setMenuOpen(p=>!p)} style={{background:"none",border:"none",color:C.white,fontSize:24,cursor:"pointer",lineHeight:1}}>☰</button>
          </div>

          {menuOpen&&(
            <div style={{position:"fixed",inset:0,zIndex:200}}>
              <div onClick={()=>setMenuOpen(false)} style={{position:"absolute",inset:0,background:"rgba(0,0,0,0.5)"}}/>
              <div style={{position:"absolute",top:0,left:0,bottom:0,width:260,background:C.green,display:"flex",flexDirection:"column",zIndex:201}}>
                <div style={{padding:"18px 16px",borderBottom:"1px solid rgba(255,255,255,0.2)",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                  <div style={{display:"flex",alignItems:"center",gap:10}}>
                    <img src={LOGO} alt="" style={{width:32,height:32,borderRadius:"50%"}}/>
                    <span style={{color:C.white,fontWeight:700,fontSize:13}}>Athens Main Street</span>
                  </div>
                  <button onClick={()=>setMenuOpen(false)} style={{background:"none",border:"none",color:C.white,fontSize:22,cursor:"pointer"}}>×</button>
                </div>
                <nav style={{padding:"10px 8px",flex:1,overflowY:"auto"}}>
                  <NavLinks onClick={()=>setMenuOpen(false)}/>
                </nav>
              </div>
            </div>
          )}

          <div className="main-content">
            {pages[tab]||<Dashboard/>}
          </div>
        </div>
      </div>
    </>
  );
}
