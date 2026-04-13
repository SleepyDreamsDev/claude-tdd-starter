import { useState } from "react";
import { Search, Star, ChevronRight, Shield, Clock, CheckCircle, Sparkles, MapPin, Phone, Mail, Menu, X, Users, Home, Zap, Award, ArrowRight, Calendar, TrendingUp, Repeat, Droplets, Wind, Sofa, BarChart3, UserPlus, Globe, FileText, Briefcase, Eye } from "lucide-react";

const T = {
  p: "#7b8cc4", ph: "#6a7ab0", pl: "#ece8f4", ps: "#f0eef4",
  bgP: "#f0eef4", bgS: "#faf9fc", bgC: "#ffffff", bgE: "#ece8f4",
  tH: "#2d2b40", tB: "#6a6680", tS: "#8884a0", tM: "#aaa6ba", tA: "#5a5680",
  bD: "#d4d0de", bL: "#e4e0ec",
  rat: "#c4a84e", ok: "#5a8a64", okBg: "#e8f0ec", warn: "#8a7230", warnBg: "#f5eeda",
  fH: "Georgia, 'Times New Roman', serif", fB: "'Segoe UI', system-ui, sans-serif",
};

const StarRow = ({ r, s = 12 }) => (
  <span style={{ display: "inline-flex", gap: 1, alignItems: "center" }}>
    {[1,2,3,4,5].map(i => <Star key={i} size={s} fill={i <= Math.round(r) ? T.rat : T.bL} stroke={i <= Math.round(r) ? T.rat : T.bL} />)}
    <span style={{ marginLeft: 4, fontSize: s, fontWeight: 600, color: T.tH, fontFamily: T.fB }}>{r}</span>
  </span>
);
const Bdg = ({ children, bg = T.pl, c = T.tA }) => (
  <span style={{ display: "inline-block", padding: "2px 9px", borderRadius: 20, fontSize: 10, fontWeight: 700, fontFamily: T.fB, background: bg, color: c, letterSpacing: .3 }}>{children}</span>
);
const ST = ({ children, sub, center, desk }) => (
  <div style={{ textAlign: center ? "center" : "left", marginBottom: desk ? 28 : 18 }}>
    <h2 style={{ fontFamily: T.fH, fontSize: desk ? 28 : 21, color: T.tH, margin: 0, fontWeight: 400, lineHeight: 1.3 }}>{children}</h2>
    {sub && <p style={{ fontFamily: T.fB, fontSize: desk ? 15 : 13, color: T.tS, margin: "6px 0 0" }}>{sub}</p>}
  </div>
);

const Lang = () => {
  const [a, setA] = useState("RO");
  return (
    <div style={{ display: "flex", borderRadius: 6, overflow: "hidden", border: "1.5px solid " + T.bD }}>
      {["RO","RU","EN"].map(l => (
        <button key={l} onClick={() => setA(l)} style={{ padding: "5px 10px", fontSize: 11, fontWeight: a === l ? 700 : 500, fontFamily: T.fB, background: a === l ? T.p + "20" : "transparent", color: a === l ? T.tH : T.tS, border: "none", borderRight: l !== "EN" ? "1px solid " + T.bL : "none", cursor: "pointer" }}>{l}</button>
      ))}
    </div>
  );
};

const Nav = ({ d, variant }) => {
  const [open, setOpen] = useState(false);
  const links = variant === "full"
    ? ["Acasa","Specialisti","Servicii","Cum functioneaza","Despre noi"]
    : variant === "mvp"
    ? ["Acasa","Specialisti","Cum functioneaza","Despre noi"]
    : ["Acasa","Specialisti"];
  const cta = variant === "poc" ? "Cauta" : "Rezerva acum";

  if (d) return (
    <header style={{ position: "sticky", top: 0, zIndex: 100, background: T.bgC, borderBottom: ".5px solid " + T.bD }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 40px", display: "flex", alignItems: "center", height: 60 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginRight: 40 }}>
          <div style={{ width: 32, height: 32, borderRadius: 8, background: "linear-gradient(135deg, " + T.p + ", " + T.ph + ")", display: "flex", alignItems: "center", justifyContent: "center" }}><Sparkles size={16} color="#fff" /></div>
          <span style={{ fontFamily: T.fH, fontSize: 18, color: T.tH }}>Forever Clean</span>
        </div>
        <nav style={{ display: "flex", gap: 32, flex: 1 }}>
          {links.map((l, i) => (
            <a key={i} style={{ fontSize: 14, fontFamily: T.fB, color: i === 0 ? T.p : T.tB, textDecoration: "none", fontWeight: i === 0 ? 600 : 400, cursor: "pointer", borderBottom: i === 0 ? "2px solid " + T.p : "2px solid transparent", paddingBottom: 2 }}>{l}</a>
          ))}
        </nav>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <Lang />
          <button style={{ padding: "9px 22px", borderRadius: 8, fontSize: 14, fontWeight: 700, fontFamily: T.fB, background: T.p, color: "#fff", border: "none", cursor: "pointer", letterSpacing: .2 }}>{cta}</button>
        </div>
      </div>
    </header>
  );

  return (
    <header style={{ position: "sticky", top: 0, zIndex: 100, background: T.bgC, borderBottom: ".5px solid " + T.bD }}>
      <div style={{ padding: "0 16px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 54 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ width: 28, height: 28, borderRadius: 7, background: "linear-gradient(135deg, " + T.p + ", " + T.ph + ")", display: "flex", alignItems: "center", justifyContent: "center" }}><Sparkles size={14} color="#fff" /></div>
          <span style={{ fontFamily: T.fH, fontSize: 16, color: T.tH }}>Forever Clean</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <Lang />
          <button onClick={() => setOpen(!open)} style={{ background: "none", border: "none", cursor: "pointer", padding: 4 }}>{open ? <X size={22} color={T.tH} /> : <Menu size={22} color={T.tH} />}</button>
        </div>
      </div>
      {open && (
        <div style={{ padding: "4px 16px 14px", borderTop: ".5px solid " + T.bL }}>
          {links.map((l, i) => <a key={i} style={{ display: "block", padding: "11px 0", fontSize: 14, fontFamily: T.fB, color: i === 0 ? T.p : T.tH, fontWeight: i === 0 ? 600 : 400, textDecoration: "none", borderBottom: i < links.length - 1 ? ".5px solid " + T.bL : "none" }}>{l}</a>)}
          <button style={{ width: "100%", marginTop: 12, padding: "12px", borderRadius: 8, background: T.p, color: "#fff", fontSize: 14, fontWeight: 700, fontFamily: T.fB, border: "none", cursor: "pointer" }}>{cta}</button>
        </div>
      )}
    </header>
  );
};

const CatTabs = ({ d }) => {
  const [a, setA] = useState(0);
  const tabs = [{icon:<Home size={d?16:14}/>,l:"Generala"},{icon:<Sparkles size={d?16:14}/>,l:"Profunda"},{icon:<Droplets size={d?16:14}/>,l:"Dupa renovare"},{icon:<Wind size={d?16:14}/>,l:"Geamuri"},{icon:<Sofa size={d?16:14}/>,l:"Mobilier"}];
  return (
    <div style={{ display: "flex", gap: 4, overflowX: "auto", padding: d ? "14px 40px" : "10px 16px", background: T.bgC, borderBottom: ".5px solid " + T.bL, justifyContent: d ? "center" : "flex-start" }}>
      {tabs.map((t, i) => (
        <button key={i} onClick={() => setA(i)} style={{ display: "flex", alignItems: "center", gap: 6, padding: d ? "9px 20px" : "7px 12px", borderRadius: 24, fontSize: d ? 13 : 11, fontWeight: 600, fontFamily: T.fB, background: a === i ? T.pl : "transparent", color: a === i ? T.tA : T.tS, border: a === i ? "1px solid " + T.p + "40" : "1px solid transparent", cursor: "pointer", whiteSpace: "nowrap" }}>{t.icon}{t.l}</button>
      ))}
    </div>
  );
};

const Hero = ({ d, compact }) => (
  <div style={{ background: "linear-gradient(170deg, " + T.p + "18 0%, " + T.bgP + " 100%)", padding: d ? "48px 40px 40px" : compact ? "20px 16px" : "28px 16px 24px" }}>
    <div style={{ maxWidth: d ? 1200 : 500, margin: "0 auto", display: d ? "flex" : "block", gap: d ? 60 : 0, alignItems: "center" }}>
      <div style={{ flex: d ? 1 : undefined, marginBottom: d ? 0 : 16 }}>
        <h1 style={{ fontFamily: T.fH, fontSize: d ? 38 : compact ? 21 : 25, color: T.tH, margin: "0 0 8px", fontWeight: 400, lineHeight: 1.2 }}>
          {compact ? "Gaseste curatenia perfecta" : "Curatenie profesionala in Chisinau"}
        </h1>
        {!compact && <p style={{ fontFamily: T.fB, fontSize: d ? 16 : 13, color: T.tB, margin: "0 0 4px", lineHeight: 1.5 }}>Gaseste si rezerva un serviciu de curatenie verificat in mai putin de 60 de secunde</p>}
        {d && !compact && (
          <div style={{ display: "flex", gap: 20, marginTop: 20 }}>
            {[{n:"150+",l:"Recenzii"},{n:"8",l:"Furnizori"},{n:"4.7",l:"Rating mediu"}].map((s,i) => (
              <div key={i}><span style={{ fontSize: 22, fontWeight: 800, fontFamily: T.fB, color: T.p }}>{s.n}</span><span style={{ fontSize: 12, fontFamily: T.fB, color: T.tS, marginLeft: 4 }}>{s.l}</span></div>
            ))}
          </div>
        )}
      </div>
      <div style={{ background: T.bgC, borderRadius: 12, border: ".5px solid " + T.bD, overflow: "hidden", boxShadow: "0 2px 16px rgba(45,43,64,.07)", width: d ? 420 : "100%" }}>
        <div style={{ padding: "14px 16px", borderBottom: ".5px solid " + T.bL }}>
          <label style={{ fontSize: 10, fontWeight: 700, fontFamily: T.fB, color: T.tS, textTransform: "uppercase", letterSpacing: 1.2, display: "block", marginBottom: 5 }}>Tip serviciu</label>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}><Sparkles size={16} color={T.p} /><select style={{ flex: 1, border: "none", fontSize: 14, fontFamily: T.fB, color: T.tH, background: "transparent", outline: "none", fontWeight: 500 }}><option>Curatenie generala</option><option>Curatenie profunda</option><option>Dupa renovare</option><option>Geamuri</option></select></div>
        </div>
        <div style={{ padding: "14px 16px", borderBottom: ".5px solid " + T.bL }}>
          <label style={{ fontSize: 10, fontWeight: 700, fontFamily: T.fB, color: T.tS, textTransform: "uppercase", letterSpacing: 1.2, display: "block", marginBottom: 5 }}>Sector</label>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}><MapPin size={16} color={T.p} /><select style={{ flex: 1, border: "none", fontSize: 14, fontFamily: T.fB, color: T.tH, background: "transparent", outline: "none", fontWeight: 500 }}><option>Toate sectoarele</option><option>Centru</option><option>Botanica</option><option>Buiucani</option><option>Riscani</option><option>Ciocana</option></select></div>
        </div>
        {!compact && <div style={{ padding: "14px 16px", borderBottom: ".5px solid " + T.bL }}>
          <label style={{ fontSize: 10, fontWeight: 700, fontFamily: T.fB, color: T.tS, textTransform: "uppercase", letterSpacing: 1.2, display: "block", marginBottom: 5 }}>Suprafata</label>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}><Home size={16} color={T.p} /><span style={{ fontSize: 14, fontFamily: T.fB, color: T.tH, fontWeight: 500 }}>~60 m2</span><span style={{ fontSize: 11, fontFamily: T.fB, color: T.tM, marginLeft: 4 }}>2 camere, 1 baie</span></div>
        </div>}
        <div style={{ padding: "12px 16px" }}>
          <button style={{ width: "100%", padding: "13px", borderRadius: 8, background: T.p, color: "#fff", fontSize: 15, fontWeight: 700, fontFamily: T.fB, border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}><Search size={17} />Cauta</button>
        </div>
      </div>
    </div>
  </div>
);

const Trust = ({ d }) => (
  <div style={{ padding: d ? "24px 40px" : "18px 16px", background: T.bgC, borderBottom: ".5px solid " + T.bL }}>
    <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", flexDirection: d ? "row" : "column", gap: d ? 40 : 14, justifyContent: "center" }}>
      {[{icon:<Shield size={18} color={T.p}/>,t:"Furnizori verificati",s:"Trec prin verificare si evaluare"},{icon:<CheckCircle size={18} color={T.ok}/>,t:"Garantie de satisfactie",s:"Re-curatare gratuita"},{icon:<Clock size={18} color={T.p}/>,t:"Rezervare instant",s:"Confirmarea in sub 2 ore"}].map((it,i) => (
        <div key={i} style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <div style={{ width: 36, height: 36, borderRadius: 8, background: T.pl, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>{it.icon}</div>
          <div><div style={{ fontSize: 13, fontWeight: 700, fontFamily: T.fB, color: T.tH }}>{it.t}</div><div style={{ fontSize: 11, fontFamily: T.fB, color: T.tS }}>{it.s}</div></div>
        </div>
      ))}
    </div>
  </div>
);

const Offers = ({ d }) => (
  <div style={{ padding: d ? "32px 40px" : "24px 16px", background: T.bgP }}>
    <div style={{ maxWidth: 1200, margin: "0 auto" }}>
      <ST sub="Profita de ofertele sezoniere" desk={d}>Oferte speciale</ST>
      <div style={{ display: d ? "grid" : "flex", gridTemplateColumns: d ? "1fr 1fr" : undefined, flexDirection: d ? undefined : "column", gap: 12 }}>
        {[{t:"Curatenie de primavara",s:"15% reducere la curatenia profunda",b:"-15%",bg:T.okBg,bc:T.ok},{t:"Pachet lunar",s:"4 curatenii/luna — economisesti 20%",b:"Popular",bg:T.warnBg,bc:T.warn}].map((o,i) => (
          <div key={i} style={{ background: T.bgC, borderRadius: 10, border: ".5px solid " + T.bD, padding: 16, display: "flex", gap: 14, alignItems: "center", cursor: "pointer" }}>
            <div style={{ flex: 1 }}><div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 3 }}><span style={{ fontFamily: T.fB, fontSize: 14, fontWeight: 700, color: T.tH }}>{o.t}</span><Bdg bg={o.bg} c={o.bc}>{o.b}</Bdg></div><p style={{ fontFamily: T.fB, fontSize: 12, color: T.tS, margin: 0 }}>{o.s}</p></div>
            <ChevronRight size={16} color={T.tM} />
          </div>
        ))}
      </div>
    </div>
  </div>
);

const Services = ({ d }) => {
  const [a, setA] = useState(0);
  const svcs = [{name:"Curatenie generala",price:"de la 33 MDL/m2",icon:<Home size={20}/>,rev:284,c:"#e3e8f5"},{name:"Curatenie profunda",price:"de la 45 MDL/m2",icon:<Sparkles size={20}/>,rev:156,c:"#ece8f4"},{name:"Dupa renovare",price:"de la 55 MDL/m2",icon:<Droplets size={20}/>,rev:89,c:"#e8f0ec"},{name:"Geamuri",price:"de la 50 MDL/geam",icon:<Wind size={20}/>,rev:122,c:"#f5eeda"}];
  return (
    <div style={{ padding: d ? "36px 40px" : "24px 16px", background: T.bgS }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <ST sub="Alege tipul de serviciu" desk={d}>Exploreaza serviciile</ST>
        <div style={{ display: "flex", gap: 6, marginBottom: 16, justifyContent: d ? "center" : "flex-start", overflowX: "auto" }}>
          {["Populare","Rezidential","Comercial","Sezonal"].map((c,i) => (
            <button key={i} onClick={() => setA(i)} style={{ padding: "8px 18px", borderRadius: 24, fontSize: 13, fontWeight: 600, fontFamily: T.fB, background: a === i ? T.p : T.bgC, color: a === i ? "#fff" : T.tB, border: "1px solid " + (a === i ? T.p : T.bD), cursor: "pointer", whiteSpace: "nowrap" }}>{c}</button>
          ))}
        </div>
        <div style={{ display: "grid", gridTemplateColumns: d ? "1fr 1fr 1fr 1fr" : "1fr 1fr", gap: 10 }}>
          {svcs.map((s,i) => (
            <div key={i} style={{ background: T.bgC, borderRadius: 10, border: ".5px solid " + T.bD, padding: d ? 20 : 14, cursor: "pointer" }}>
              <div style={{ width: 42, height: 42, borderRadius: 10, background: s.c, display: "flex", alignItems: "center", justifyContent: "center", color: T.tA, marginBottom: 10 }}>{s.icon}</div>
              <div style={{ fontSize: 13, fontWeight: 700, fontFamily: T.fB, color: T.tH, marginBottom: 2 }}>{s.name}</div>
              <div style={{ fontSize: 11, fontFamily: T.fB, color: T.p, fontWeight: 600, marginBottom: 3 }}>{s.price}</div>
              <div style={{ fontSize: 10, fontFamily: T.fB, color: T.tM }}>{s.rev} recenzii</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const provData = [
  {name:"Diamond Cleaning",r:4.9,rev:85,pr:"55",areas:"Centru, Botanica",bdg:"Premium",c:"#e3e8f5",ini:"DC"},
  {name:"ProCurat",r:4.9,rev:62,pr:"50",areas:"Centru, Telecentru",bdg:"Top rated",c:"#ece8f4",ini:"PC"},
  {name:"Cristal Plus",r:4.8,rev:47,pr:"35",areas:"Centru, Botanica",bdg:null,c:"#e8f0ec",ini:"CP"},
  {name:"EcoClean Moldova",r:4.7,rev:39,pr:"45",areas:"Tot Chisinau",bdg:"Eco",c:"#f5eeda",ini:"EC"},
];

const Providers = ({ d, count = 4 }) => (
  <div style={{ padding: d ? "36px 40px" : "24px 16px", background: d ? T.bgP : T.bgS }}>
    <div style={{ maxWidth: 1200, margin: "0 auto" }}>
      <ST sub="Cei mai apreciati furnizori din Chisinau" desk={d}>Furnizori de top</ST>
      <div style={{ display: d ? "grid" : "flex", gridTemplateColumns: d ? "repeat(" + Math.min(count,4) + ", 1fr)" : undefined, flexDirection: d ? undefined : "column", gap: d ? 16 : 10 }}>
        {provData.slice(0, count).map((p,i) => (
          <div key={i} style={{ background: T.bgC, borderRadius: 10, border: ".5px solid " + T.bD, padding: d ? 20 : 14, display: d ? "block" : "flex", gap: 14, alignItems: "center", cursor: "pointer" }}>
            <div style={{ width: d ? 56 : 48, height: d ? 56 : 48, borderRadius: 10, background: p.c, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginBottom: d ? 12 : 0 }}>
              <span style={{ fontFamily: T.fH, fontSize: d ? 18 : 16, color: T.tA }}>{p.ini}</span>
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 3 }}><span style={{ fontSize: 14, fontWeight: 700, fontFamily: T.fB, color: T.tH }}>{p.name}</span>{p.bdg && <Bdg>{p.bdg}</Bdg>}</div>
              <StarRow r={p.r} s={11} />
              <div style={{ fontSize: 11, fontFamily: T.fB, color: T.tM, marginTop: 3 }}><MapPin size={10} style={{ display: "inline", verticalAlign: "-1px", marginRight: 3 }} />{p.areas}</div>
            </div>
            <div style={{ textAlign: d ? "left" : "right", flexShrink: 0, marginTop: d ? 10 : 0 }}>
              <span style={{ fontSize: 10, fontFamily: T.fB, color: T.tM }}>de la </span><span style={{ fontSize: d ? 18 : 16, fontWeight: 800, fontFamily: T.fB, color: T.p }}>{p.pr}</span><span style={{ fontSize: 10, fontFamily: T.fB, color: T.tM }}> MDL/m2</span>
            </div>
          </div>
        ))}
      </div>
      <div style={{ textAlign: "center", marginTop: 16 }}>
        <button style={{ padding: "11px 28px", borderRadius: 8, background: "transparent", color: T.p, fontSize: 14, fontWeight: 700, fontFamily: T.fB, border: "1.5px solid " + T.p, cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 6 }}>Vezi toti furnizorii <ArrowRight size={16} /></button>
      </div>
    </div>
  </div>
);

const HowWorks = ({ d }) => {
  const steps = [{n:"1",icon:<Search size={18}/>,t:"Cauta",s:"Alege serviciul si sectorul tau"},{n:"2",icon:<Calendar size={18}/>,t:"Rezerva",s:"Selecteaza data, ora si detaliile"},{n:"3",icon:<CheckCircle size={18}/>,t:"Bucura-te",s:"Echipa verificata vine la tine"}];
  return (
    <div style={{ padding: d ? "40px 40px" : "24px 16px", background: T.bgP }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <ST sub="Rezervare in 3 pasi simpli" center desk={d}>Cum functioneaza</ST>
        {d ? (
          <div style={{ display: "flex", gap: 32, justifyContent: "center" }}>
            {steps.map((st,i) => (
              <div key={i} style={{ textAlign: "center", flex: 1, maxWidth: 280, position: "relative" }}>
                {i < 2 && <div style={{ position: "absolute", top: 22, left: "60%", width: "80%", height: 1.5, background: T.bD }} />}
                <div style={{ width: 44, height: 44, borderRadius: 22, background: T.p, color: "#fff", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 16, fontWeight: 800, fontFamily: T.fB, marginBottom: 12, position: "relative", zIndex: 1 }}>{st.n}</div>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6, marginBottom: 4 }}><span style={{ color: T.p }}>{st.icon}</span><span style={{ fontSize: 16, fontWeight: 700, fontFamily: T.fB, color: T.tH }}>{st.t}</span></div>
                <p style={{ fontFamily: T.fB, fontSize: 13, color: T.tS, margin: 0 }}>{st.s}</p>
              </div>
            ))}
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column" }}>
            {steps.map((st,i) => (
              <div key={i} style={{ display: "flex", gap: 14, alignItems: "flex-start", paddingBottom: i < 2 ? 20 : 0, paddingLeft: 20, position: "relative" }}>
                {i < 2 && <div style={{ position: "absolute", left: 33, top: 36, bottom: 0, width: 1.5, background: T.bD }} />}
                <div style={{ width: 26, height: 26, borderRadius: 13, background: T.p, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 800, fontFamily: T.fB, flexShrink: 0, position: "relative", zIndex: 1 }}>{st.n}</div>
                <div style={{ paddingTop: 1 }}><div style={{ display: "flex", alignItems: "center", gap: 6 }}><span style={{ color: T.p }}>{st.icon}</span><span style={{ fontSize: 14, fontWeight: 700, fontFamily: T.fB, color: T.tH }}>{st.t}</span></div><p style={{ fontFamily: T.fB, fontSize: 12, color: T.tS, margin: "3px 0 0" }}>{st.s}</p></div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const Reviews = ({ d }) => {
  const revs = [{name:"Maria T.",text:"Echipa foarte profesionista! Apartamentul arata ca nou.",prov:"Diamond Cleaning",r:5},{name:"Olga K.",text:"Bystro, akkuratno, dostupno. Budu zakazyvat eshchyo.",prov:"ProCurat",r:5},{name:"Andrei B.",text:"Serviciu excelent de curatenie dupa renovare. Recomand!",prov:"Cristal Plus",r:4}];
  return (
    <div style={{ padding: d ? "36px 40px" : "24px 16px", background: T.bgS }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <ST sub="Ce spun clientii nostri" desk={d}>Recenzii recente</ST>
        <div style={{ display: d ? "grid" : "flex", gridTemplateColumns: d ? "1fr 1fr 1fr" : undefined, flexDirection: d ? undefined : "column", gap: d ? 16 : 10 }}>
          {revs.map((rv,i) => (
            <div key={i} style={{ background: T.bgC, borderRadius: 10, border: ".5px solid " + T.bD, padding: 16 }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{ width: 30, height: 30, borderRadius: 15, background: T.pl, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, fontFamily: T.fB, color: T.tA }}>{rv.name[0]}</div>
                  <div><div style={{ fontSize: 13, fontWeight: 700, fontFamily: T.fB, color: T.tH }}>{rv.name}</div><div style={{ fontSize: 10, fontFamily: T.fB, color: T.tM }}>{rv.prov}</div></div>
                </div>
                <StarRow r={rv.r} s={10} />
              </div>
              <p style={{ fontFamily: T.fB, fontSize: 13, color: T.tB, margin: 0, lineHeight: 1.5, fontStyle: "italic" }}>"{rv.text}"</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const Hoods = ({ d }) => {
  const areas = [{n:"Centru",cnt:6,c:"#d8ddef"},{n:"Botanica",cnt:5,c:"#e3ddf0"},{n:"Buiucani",cnt:4,c:"#dde8df"},{n:"Riscani",cnt:4,c:"#eee8d5"},{n:"Ciocana",cnt:3,c:"#e4dfe8"},{n:"Telecentru",cnt:3,c:"#d8e4e8"}];
  return (
    <div style={{ padding: d ? "36px 40px" : "24px 16px", background: T.bgP }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <ST sub="Acoperire completa in Chisinau" desk={d}>Exploreaza sectoarele</ST>
        <div style={{ display: "grid", gridTemplateColumns: d ? "repeat(6, 1fr)" : "1fr 1fr 1fr", gap: d ? 12 : 8 }}>
          {areas.map((a,i) => (
            <div key={i} style={{ background: T.bgC, borderRadius: 10, border: ".5px solid " + T.bD, padding: "14px 10px", textAlign: "center", cursor: "pointer" }}>
              <div style={{ width: 34, height: 34, borderRadius: 17, background: a.c, margin: "0 auto 8px", display: "flex", alignItems: "center", justifyContent: "center" }}><MapPin size={14} color={T.tA} /></div>
              <div style={{ fontSize: 12, fontWeight: 700, fontFamily: T.fB, color: T.tH }}>{a.n}</div>
              <div style={{ fontSize: 10, fontFamily: T.fB, color: T.tM }}>{a.cnt} furnizori</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const SubCTA = ({ d }) => (
  <div style={{ padding: d ? "36px 40px" : "24px 16px", background: T.bgP }}>
    <div style={{ maxWidth: d ? 800 : 500, margin: "0 auto" }}>
      <div style={{ background: "linear-gradient(135deg, " + T.p + "15, " + T.pl + ")", borderRadius: 12, border: ".5px solid " + T.p + "30", padding: d ? 36 : 24, display: d ? "flex" : "block", gap: 32, alignItems: "center" }}>
        <div style={{ flex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}><Repeat size={18} color={T.p} /><span style={{ fontSize: 11, fontWeight: 700, fontFamily: T.fB, color: T.p, textTransform: "uppercase", letterSpacing: 1 }}>Abonament</span></div>
          <h3 style={{ fontFamily: T.fH, fontSize: d ? 22 : 18, color: T.tH, margin: "0 0 6px", fontWeight: 400 }}>Curatenie regulata, economii mai mari</h3>
          <p style={{ fontFamily: T.fB, fontSize: 12, color: T.tB, margin: "0 0 16px", lineHeight: 1.5 }}>Aboneaza-te la curatenie saptamanala si economisesti pana la 20%.</p>
          <div style={{ display: "flex", gap: 8 }}>
            <button style={{ padding: "10px 18px", borderRadius: 8, background: T.p, color: "#fff", fontSize: 13, fontWeight: 700, fontFamily: T.fB, border: "none", cursor: "pointer" }}>Vezi planuri</button>
            <button style={{ padding: "10px 18px", borderRadius: 8, background: "transparent", color: T.p, fontSize: 13, fontWeight: 600, fontFamily: T.fB, border: "1px solid " + T.p + "40", cursor: "pointer" }}>Afla mai mult</button>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const Combos = ({ d }) => (
  <div style={{ padding: d ? "36px 40px" : "24px 16px", background: T.bgS }}>
    <div style={{ maxWidth: 1200, margin: "0 auto" }}>
      <ST sub="Cele mai solicitate combinatii" desk={d}>Pachete populare</ST>
      <div style={{ display: d ? "grid" : "flex", gridTemplateColumns: d ? "1fr 1fr 1fr" : undefined, flexDirection: d ? undefined : "column", gap: 10 }}>
        {[{t:"Generala + Geamuri",s:"Economie 15%",pr:"de la 2.400 MDL",tag:"Best seller"},{t:"Profunda + Mobilier + Covor",s:"Economie 20%",pr:"de la 4.100 MDL",tag:"Premium"},{t:"Dupa renovare completa",s:"Pret fix",pr:"de la 5.500 MDL",tag:"Nou"}].map((c,i) => (
          <div key={i} style={{ background: T.bgC, borderRadius: 10, border: ".5px solid " + T.bD, padding: "14px 16px", display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer" }}>
            <div><div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 3 }}><span style={{ fontSize: 13, fontWeight: 700, fontFamily: T.fB, color: T.tH }}>{c.t}</span><Bdg>{c.tag}</Bdg></div><span style={{ fontSize: 11, fontFamily: T.fB, color: T.ok, fontWeight: 600 }}>{c.s}</span></div>
            <div style={{ textAlign: "right" }}><div style={{ fontSize: 13, fontWeight: 800, fontFamily: T.fB, color: T.p }}>{c.pr}</div></div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const ProvReg = ({ d }) => (
  <div style={{ padding: d ? "48px 40px" : "28px 16px", background: "linear-gradient(170deg, " + T.tH + " 0%, #3a3650 100%)" }}>
    <div style={{ maxWidth: d ? 1000 : 500, margin: "0 auto", display: d ? "flex" : "block", gap: 48, alignItems: "center" }}>
      <div style={{ flex: 1, marginBottom: d ? 0 : 24 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}><UserPlus size={20} color={T.p} /><span style={{ fontSize: 11, fontWeight: 700, fontFamily: T.fB, color: T.p, textTransform: "uppercase", letterSpacing: 1.2 }}>Pentru furnizori</span></div>
        <h2 style={{ fontFamily: T.fH, fontSize: d ? 30 : 22, color: "#fff", margin: "0 0 10px", fontWeight: 400, lineHeight: 1.25 }}>Listeaza-ti afacerea de curatenie gratuit</h2>
        <p style={{ fontFamily: T.fB, fontSize: d ? 15 : 13, color: "#b0aec0", margin: "0 0 20px", lineHeight: 1.6 }}>Primeste clienti noi din Chisinau fara efort de marketing. Fara comision in prima luna.</p>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {[{icon:<Eye size={16}/>,t:"Vizibilitate",s:"Profilul tau vizibil pentru mii de clienti"},{icon:<BarChart3 size={16}/>,t:"Dashboard complet",s:"Rezervari, calendar, analytics, recenzii"},{icon:<TrendingUp size={16}/>,t:"Crestere",s:"Rating-uri verificate care atrag clienti noi"}].map((b,i) => (
            <div key={i} style={{ display: "flex", gap: 12, alignItems: "center" }}>
              <div style={{ width: 32, height: 32, borderRadius: 8, background: T.p + "25", display: "flex", alignItems: "center", justifyContent: "center", color: T.p, flexShrink: 0 }}>{b.icon}</div>
              <div><div style={{ fontSize: 13, fontWeight: 700, fontFamily: T.fB, color: "#fff" }}>{b.t}</div><div style={{ fontSize: 11, fontFamily: T.fB, color: "#9896aa" }}>{b.s}</div></div>
            </div>
          ))}
        </div>
      </div>
      <div style={{ width: d ? 360 : "100%", background: T.bgC, borderRadius: 12, padding: 24, border: ".5px solid " + T.bD }}>
        <h3 style={{ fontFamily: T.fH, fontSize: 18, color: T.tH, margin: "0 0 16px", fontWeight: 400 }}>Inregistrare furnizor</h3>
        {[{label:"Numele companiei",ph:"ex. Diamond Cleaning"},{label:"Telefon",ph:"+373 XX XXX XXX"},{label:"Email",ph:"contact@companie.md"}].map((f,i) => (
          <div key={i} style={{ marginBottom: 14 }}>
            <label style={{ fontSize: 11, fontWeight: 700, fontFamily: T.fB, color: T.tS, display: "block", marginBottom: 5, textTransform: "uppercase", letterSpacing: .8 }}>{f.label}</label>
            <input readOnly placeholder={f.ph} style={{ width: "100%", padding: "10px 12px", borderRadius: 8, border: "1px solid " + T.bD, fontSize: 14, fontFamily: T.fB, color: T.tH, background: T.bgS, outline: "none", boxSizing: "border-box" }} />
          </div>
        ))}
        <div style={{ marginBottom: 16 }}>
          <label style={{ fontSize: 11, fontWeight: 700, fontFamily: T.fB, color: T.tS, display: "block", marginBottom: 5, textTransform: "uppercase", letterSpacing: .8 }}>Sectoare deservite</label>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
            {["Centru","Botanica","Buiucani","Riscani","Ciocana"].map((a,i) => (
              <span key={i} style={{ padding: "5px 12px", borderRadius: 16, fontSize: 11, fontWeight: 600, fontFamily: T.fB, background: i < 2 ? T.pl : T.bgS, color: i < 2 ? T.tA : T.tS, border: ".5px solid " + (i < 2 ? T.p + "40" : T.bD), cursor: "pointer" }}>{a}</span>
            ))}
          </div>
        </div>
        <button style={{ width: "100%", padding: "13px", borderRadius: 8, background: T.ok, color: "#fff", fontSize: 14, fontWeight: 700, fontFamily: T.fB, border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}><UserPlus size={16} />Inregistreaza-te gratuit</button>
        <p style={{ fontFamily: T.fB, fontSize: 10, color: T.tM, margin: "10px 0 0", textAlign: "center" }}>Fara obligatii · Listare gratuita · Anulezi oricand</p>
      </div>
    </div>
  </div>
);

const Foot = ({ d, minimal }) => (
  <footer style={{ background: T.tH, padding: d ? "36px 40px 24px" : "24px 16px 18px" }}>
    <div style={{ maxWidth: 1200, margin: "0 auto" }}>
      <div style={{ display: d && !minimal ? "flex" : "block", justifyContent: "space-between", gap: 40 }}>
        <div style={{ marginBottom: d ? 0 : 16 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
            <div style={{ width: 24, height: 24, borderRadius: 6, background: T.p + "40", display: "flex", alignItems: "center", justifyContent: "center" }}><Sparkles size={12} color={T.pl} /></div>
            <span style={{ fontFamily: T.fH, fontSize: 15, color: T.pl }}>Forever Clean</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}><Phone size={12} color={T.tM} /><span style={{ fontSize: 12, fontFamily: T.fB, color: "#a8a4bc" }}>+373 XX XXX XXX</span></div>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}><Mail size={12} color={T.tM} /><span style={{ fontSize: 12, fontFamily: T.fB, color: "#a8a4bc" }}>info@foreverclean.md</span></div>
          </div>
        </div>
        {!minimal && <div style={{ display: "flex", gap: d ? 60 : 32 }}>
          <div><div style={{ fontSize: 10, fontWeight: 700, fontFamily: T.fB, color: T.tM, textTransform: "uppercase", letterSpacing: 1, marginBottom: 10 }}>Platforma</div>{["Servicii","Furnizori","Preturi","Recenzii"].map((l,i) => <a key={i} style={{ display: "block", fontSize: 12, fontFamily: T.fB, color: "#a8a4bc", textDecoration: "none", padding: "4px 0" }}>{l}</a>)}</div>
          <div><div style={{ fontSize: 10, fontWeight: 700, fontFamily: T.fB, color: T.tM, textTransform: "uppercase", letterSpacing: 1, marginBottom: 10 }}>Companie</div>{["Despre noi","Contacte","Termeni","Confidentialitate"].map((l,i) => <a key={i} style={{ display: "block", fontSize: 12, fontFamily: T.fB, color: "#a8a4bc", textDecoration: "none", padding: "4px 0" }}>{l}</a>)}</div>
        </div>}
      </div>
      <div style={{ marginTop: 16, paddingTop: 12, borderTop: "0.5px solid " + T.tB + "40" }}><span style={{ fontSize: 10, fontFamily: T.fB, color: T.tM }}>© 2026 Forever Clean · Chisinau, Moldova</span></div>
    </div>
  </footer>
);

const BBar = () => (
  <div style={{ position: "sticky", bottom: 0, zIndex: 100, background: T.bgC, borderTop: ".5px solid " + T.bD, padding: "6px 0 10px", display: "flex", justifyContent: "space-around" }}>
    {[{icon:<Home size={18}/>,l:"Acasa",a:true},{icon:<Search size={18}/>,l:"Cauta"},{icon:<Calendar size={18}/>,l:"Rezervari"},{icon:<Users size={18}/>,l:"Cont"}].map((t,i) => (
      <button key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2, background: "none", border: "none", cursor: "pointer", padding: "4px 12px" }}>
        <span style={{ color: t.a ? T.p : T.tM }}>{t.icon}</span>
        <span style={{ fontSize: 9, fontWeight: t.a ? 700 : 500, fontFamily: T.fB, color: t.a ? T.p : T.tM }}>{t.l}</span>
      </button>
    ))}
  </div>
);

// ═══ VERSIONS ═══
const FullV = ({ d }) => (<><Nav d={d} variant="full" /><CatTabs d={d} /><Hero d={d} /><Trust d={d} /><Offers d={d} /><Services d={d} /><Providers d={d} count={4} /><Hoods d={d} /><Reviews d={d} /><SubCTA d={d} /><Combos d={d} /><ProvReg d={d} /><Foot d={d} />{!d && <BBar />}</>);
const MvpV = ({ d }) => (<><Nav d={d} variant="mvp" /><Hero d={d} /><Trust d={d} /><Services d={d} /><Providers d={d} count={4} /><HowWorks d={d} /><Reviews d={d} /><ProvReg d={d} /><Foot d={d} />{!d && <BBar />}</>);
const PocV = ({ d }) => (<><Nav d={d} variant="poc" /><Hero d={d} compact /><Providers d={d} count={3} /><HowWorks d={d} /><Foot d={d} minimal /></>);

// ═══ MAIN ═══
export default function App() {
  const [ver, setVer] = useState("mvp");
  const [desk, setDesk] = useState(false);
  const versions = [{id:"full",label:"Full",c:T.p,n:"14 sections"},{id:"mvp",label:"MVP",c:T.ok,n:"9 sections"},{id:"poc",label:"POC",c:"#8a7230",n:"5 sections"}];

  return (
    <div style={{ fontFamily: T.fB, background: "#18161f", minHeight: "100vh" }}>
      <div style={{ position: "sticky", top: 0, zIndex: 300, background: "#1e1c2a", padding: "8px 16px", display: "flex", alignItems: "center", justifyContent: "center", gap: 12, boxShadow: "0 2px 16px rgba(0,0,0,.4)", flexWrap: "wrap" }}>
        <div style={{ display: "flex", gap: 4 }}>
          {versions.map(v => (
            <button key={v.id} onClick={() => setVer(v.id)} style={{ padding: "7px 16px", borderRadius: 8, background: ver === v.id ? v.c + "20" : "transparent", border: ver === v.id ? "1.5px solid " + v.c : "1.5px solid #333", cursor: "pointer" }}>
              <div style={{ fontSize: 12, fontWeight: 700, fontFamily: T.fB, color: ver === v.id ? v.c : "#666" }}>{v.label}</div>
              <div style={{ fontSize: 9, fontFamily: T.fB, color: ver === v.id ? v.c : "#555" }}>{v.n}</div>
            </button>
          ))}
        </div>
        <div style={{ display: "flex", borderRadius: 8, overflow: "hidden", border: "1.5px solid #333" }}>
          <button onClick={() => setDesk(false)} style={{ padding: "7px 14px", fontSize: 11, fontWeight: 600, fontFamily: T.fB, background: !desk ? T.p + "25" : "transparent", color: !desk ? T.p : "#666", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 4 }}><Phone size={12} /> Mobile</button>
          <button onClick={() => setDesk(true)} style={{ padding: "7px 14px", fontSize: 11, fontWeight: 600, fontFamily: T.fB, background: desk ? T.p + "25" : "transparent", color: desk ? T.p : "#666", border: "none", borderLeft: "1px solid #333", cursor: "pointer", display: "flex", alignItems: "center", gap: 4 }}><Globe size={12} /> Desktop</button>
        </div>
      </div>

      {desk ? (
        <div style={{ maxWidth: 1280, margin: "16px auto 40px", background: T.bgC, borderRadius: 12, overflow: "hidden", boxShadow: "0 4px 32px rgba(0,0,0,.3)", border: "1px solid #333" }}>
          <div style={{ background: "#2a2838", padding: "8px 16px", display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ display: "flex", gap: 5 }}>{["#ff5f57","#febc2e","#28c840"].map((c,i) => <div key={i} style={{ width: 10, height: 10, borderRadius: 5, background: c }} />)}</div>
            <div style={{ flex: 1, background: "#1e1c2a", borderRadius: 4, padding: "5px 12px", fontSize: 11, fontFamily: T.fB, color: "#888" }}>foreverclean.md</div>
          </div>
          <div style={{ maxHeight: "82vh", overflowY: "auto", background: T.bgP }}>
            {ver === "full" && <FullV d />}
            {ver === "mvp" && <MvpV d />}
            {ver === "poc" && <PocV d />}
          </div>
        </div>
      ) : (
        <div style={{ maxWidth: 390, margin: "16px auto 40px", background: T.bgC, borderRadius: 32, overflow: "hidden", boxShadow: "0 8px 40px rgba(0,0,0,.3)", border: "3px solid #333" }}>
          <div style={{ background: "#1e1c2a", padding: "6px 20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontSize: 11, fontWeight: 600, color: "#ccc", fontFamily: T.fB }}>12:33</span>
            <div style={{ display: "flex", gap: 3, alignItems: "end" }}>
              {[1,2,3,4].map(b => <div key={b} style={{ width: 2.5, height: b * 2.5 + 4, background: b <= 3 ? "#ccc" : "#555", borderRadius: 1 }} />)}
              <div style={{ width: 18, height: 9, borderRadius: 2, border: "1px solid #888", marginLeft: 4, display: "flex", alignItems: "center", padding: 1 }}><div style={{ width: "70%", height: "100%", background: "#7c7", borderRadius: 1 }} /></div>
            </div>
          </div>
          <div style={{ maxHeight: "78vh", overflowY: "auto", background: T.bgP }}>
            {ver === "full" && <FullV d={false} />}
            {ver === "mvp" && <MvpV d={false} />}
            {ver === "poc" && <PocV d={false} />}
          </div>
        </div>
      )}
    </div>
  );
}
