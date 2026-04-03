import { useState } from "react";

const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=DM+Sans:wght@300;400;500;600&family=DM+Mono:wght@400;500&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --bg: #0a0a0f;
    --surface: #12121a;
    --surface2: #1a1a26;
    --border: rgba(255,255,255,0.07);
    --gold: #c9a84c;
    --gold-light: #e8c97a;
    --gold-dim: rgba(201,168,76,0.15);
    --text: #f0ede6;
    --text-muted: #7a7890;
    --text-dim: #4a4860;
    --green: #2ecc71;
    --green-dim: rgba(46,204,113,0.12);
    --red: #e74c3c;
    --radius: 16px;
  }

  body { font-family: 'DM Sans', sans-serif; background: var(--bg); color: var(--text); min-height: 100vh; overflow-x: hidden; }

  .app {
    min-height: 100vh; display: flex; align-items: center; justify-content: center;
    padding: 20px; position: relative;
  }
  .app::before {
    content:''; position:fixed; top:-200px; left:-200px; width:600px; height:600px;
    background:radial-gradient(circle,rgba(201,168,76,0.06) 0%,transparent 70%); pointer-events:none;
  }
  .app::after {
    content:''; position:fixed; bottom:-200px; right:-200px; width:500px; height:500px;
    background:radial-gradient(circle,rgba(100,80,200,0.05) 0%,transparent 70%); pointer-events:none;
  }

  .auth-container { width:100%; max-width:420px; animation:fadeUp 0.5s ease; }
  .auth-logo { text-align:center; margin-bottom:40px; }
  .auth-logo h1 { font-family:'Playfair Display',serif; font-size:32px; font-weight:700; color:var(--gold); letter-spacing:2px; }
  .auth-logo p { font-size:12px; letter-spacing:4px; text-transform:uppercase; color:var(--text-muted); margin-top:4px; }
  .auth-card { background:var(--surface); border:1px solid var(--border); border-radius:var(--radius); padding:40px; box-shadow:0 40px 80px rgba(0,0,0,0.5); }
  .auth-tabs { display:flex; margin-bottom:32px; background:var(--bg); border-radius:10px; padding:4px; }
  .auth-tab { flex:1; padding:10px; text-align:center; cursor:pointer; border-radius:8px; font-size:14px; font-weight:500; color:var(--text-muted); transition:all 0.2s; border:none; background:transparent; }
  .auth-tab.active { background:var(--surface2); color:var(--gold); box-shadow:0 2px 8px rgba(0,0,0,0.3); }

  .field { margin-bottom:20px; }
  .field label { display:block; font-size:11px; font-weight:600; letter-spacing:2px; text-transform:uppercase; color:var(--text-muted); margin-bottom:8px; }
  .field input, .field select { width:100%; padding:14px 16px; background:var(--bg); border:1px solid var(--border); border-radius:10px; color:var(--text); font-family:'DM Sans',sans-serif; font-size:15px; outline:none; transition:border 0.2s; }
  .field input:focus, .field select:focus { border-color:var(--gold); }
  .field select option { background:var(--surface); }

  .btn-primary { width:100%; padding:16px; background:var(--gold); color:#0a0a0f; border:none; border-radius:10px; font-family:'DM Sans',sans-serif; font-size:15px; font-weight:700; letter-spacing:1px; cursor:pointer; transition:all 0.2s; margin-top:8px; }
  .btn-primary:hover { background:var(--gold-light); transform:translateY(-1px); box-shadow:0 8px 24px rgba(201,168,76,0.3); }
  .btn-primary:active { transform:translateY(0); }

  .btn-green { width:100%; padding:16px; background:var(--green); color:#0a0a0f; border:none; border-radius:10px; font-family:'DM Sans',sans-serif; font-size:15px; font-weight:700; letter-spacing:1px; cursor:pointer; transition:all 0.2s; margin-top:8px; }
  .btn-green:hover { background:#27ae60; transform:translateY(-1px); box-shadow:0 8px 24px rgba(46,204,113,0.3); }

  .btn-ghost { flex:1; padding:14px; background:transparent; border:1px solid var(--border); border-radius:10px; color:var(--text-muted); font-family:'DM Sans',sans-serif; font-size:14px; cursor:pointer; transition:all 0.2s; }
  .btn-ghost:hover { border-color:var(--text-muted); color:var(--text); }

  .btn-download { display:flex; align-items:center; justify-content:center; gap:8px; width:100%; padding:14px; background:var(--surface2); border:1px solid var(--border); border-radius:10px; color:var(--text); font-family:'DM Sans',sans-serif; font-size:14px; font-weight:600; cursor:pointer; transition:all 0.2s; }
  .btn-download:hover { border-color:var(--gold); color:var(--gold); }

  .error-msg { color:var(--red); font-size:13px; margin-top:12px; text-align:center; }

  .dashboard { width:100%; max-width:960px; animation:fadeUp 0.5s ease; }
  .dash-header { display:flex; align-items:center; justify-content:space-between; margin-bottom:32px; }
  .dash-logo { font-family:'Playfair Display',serif; font-size:22px; color:var(--gold); letter-spacing:2px; }
  .dash-user { display:flex; align-items:center; gap:12px; }
  .avatar { width:38px; height:38px; background:var(--gold-dim); border:1px solid var(--gold); border-radius:50%; display:flex; align-items:center; justify-content:center; font-family:'Playfair Display',serif; font-size:16px; color:var(--gold); }
  .dash-user-info small { display:block; font-size:11px; letter-spacing:1px; color:var(--text-muted); text-transform:uppercase; }
  .btn-logout { padding:8px 18px; background:transparent; border:1px solid var(--border); border-radius:8px; color:var(--text-muted); font-size:13px; cursor:pointer; transition:all 0.2s; }
  .btn-logout:hover { border-color:var(--red); color:var(--red); }

  .cards-row { display:grid; grid-template-columns:1fr 1fr 1fr; gap:16px; margin-bottom:24px; }
  .stat-card { background:var(--surface); border:1px solid var(--border); border-radius:var(--radius); padding:24px; }
  .stat-card.featured { background:linear-gradient(135deg,#1a1608 0%,#12120a 100%); border-color:rgba(201,168,76,0.3); grid-column:span 2; }
  .stat-label { font-size:11px; letter-spacing:2px; text-transform:uppercase; color:var(--text-muted); margin-bottom:10px; }
  .stat-value { font-family:'DM Mono',monospace; font-size:28px; font-weight:500; color:var(--gold); }
  .stat-value.large { font-size:36px; }
  .stat-sub { font-size:12px; color:var(--text-muted); margin-top:6px; }
  .acct-num { font-family:'DM Mono',monospace; font-size:13px; color:var(--text-muted); letter-spacing:2px; margin-top:4px; }

  .action-row { display:grid; grid-template-columns:1fr 1fr; gap:12px; margin-bottom:24px; }
  .action-btn { display:flex; align-items:center; gap:12px; padding:18px 20px; border-radius:14px; border:1px solid var(--border); background:var(--surface); cursor:pointer; transition:all 0.2s; font-family:'DM Sans',sans-serif; text-align:left; }
  .action-btn:hover { transform:translateY(-2px); box-shadow:0 10px 28px rgba(0,0,0,0.35); }
  .action-btn.send:hover { border-color:var(--gold); }
  .action-btn.deposit:hover { border-color:var(--green); }
  .action-btn-icon { width:42px; height:42px; border-radius:10px; display:flex; align-items:center; justify-content:center; font-size:20px; flex-shrink:0; }
  .action-btn.send .action-btn-icon { background:var(--gold-dim); color:var(--gold); }
  .action-btn.deposit .action-btn-icon { background:var(--green-dim); color:var(--green); }
  .action-btn-title { font-size:15px; font-weight:600; color:var(--text); display:block; }
  .action-btn-sub { font-size:12px; color:var(--text-muted); }

  .panel { background:var(--surface); border:1px solid var(--border); border-radius:var(--radius); padding:28px; }
  .panel-title { font-family:'Playfair Display',serif; font-size:18px; color:var(--text); margin-bottom:24px; padding-bottom:16px; border-bottom:1px solid var(--border); }

  .tx-list { display:flex; flex-direction:column; gap:10px; }
  .tx-item { display:flex; align-items:center; justify-content:space-between; padding:14px 16px; background:var(--bg); border-radius:10px; border:1px solid var(--border); }
  .tx-icon { width:36px; height:36px; border-radius:8px; display:flex; align-items:center; justify-content:center; font-size:16px; margin-right:12px; flex-shrink:0; }
  .tx-icon.out { background:rgba(231,76,60,0.15); color:var(--red); }
  .tx-icon.in  { background:rgba(46,204,113,0.15); color:var(--green); }
  .tx-meta { flex:1; }
  .tx-name { font-size:14px; font-weight:500; }
  .tx-date { font-size:11px; color:var(--text-muted); margin-top:2px; }
  .tx-amount { font-family:'DM Mono',monospace; font-size:15px; font-weight:500; }
  .tx-amount.out { color:var(--red); }
  .tx-amount.in  { color:var(--green); }
  .empty-state { text-align:center; color:var(--text-muted); padding:36px; font-size:14px; line-height:2; }

  .modal-overlay { position:fixed; inset:0; background:rgba(0,0,0,0.78); backdrop-filter:blur(6px); display:flex; align-items:center; justify-content:center; z-index:1000; padding:20px; animation:fadeIn 0.2s ease; }
  .modal { background:var(--surface); border:1px solid var(--border); border-radius:var(--radius); padding:40px; width:100%; max-width:480px; box-shadow:0 40px 80px rgba(0,0,0,0.6); animation:scaleIn 0.25s ease; max-height:92vh; overflow-y:auto; }
  .modal-title { font-family:'Playfair Display',serif; font-size:22px; margin-bottom:8px; }
  .modal-sub { font-size:13px; color:var(--text-muted); margin-bottom:28px; }
  .modal-actions { display:flex; flex-direction:column; gap:10px; margin-top:24px; }
  .modal-actions-row { display:flex; gap:10px; }

  .quick-amounts { display:flex; gap:8px; margin-bottom:20px; flex-wrap:wrap; }
  .quick-btn { padding:8px 14px; background:var(--bg); border:1px solid var(--border); border-radius:8px; color:var(--text-muted); font-size:13px; cursor:pointer; transition:all 0.2s; font-family:'DM Mono',monospace; }
  .quick-btn:hover { border-color:var(--green); color:var(--green); }

  .receipt { font-family:'DM Mono',monospace; }
  .receipt-header { text-align:center; margin-bottom:24px; }
  .receipt-header h2 { font-family:'Playfair Display',serif; font-size:22px; color:var(--gold); letter-spacing:2px; }
  .receipt-header p { font-size:11px; letter-spacing:3px; color:var(--text-muted); text-transform:uppercase; margin-top:4px; }
  .receipt-badge { display:flex; align-items:center; justify-content:center; gap:8px; padding:12px; border-radius:10px; margin-bottom:20px; font-size:13px; font-weight:700; letter-spacing:2px; }
  .receipt-badge.transfer { background:rgba(46,204,113,0.1); border:1px solid rgba(46,204,113,0.2); color:var(--green); }
  .receipt-badge.deposit  { background:rgba(46,204,113,0.1); border:1px solid rgba(46,204,113,0.2); color:var(--green); }
  .receipt-divider { border:none; border-top:1px dashed var(--border); margin:16px 0; }
  .receipt-row { display:flex; justify-content:space-between; align-items:center; padding:7px 0; }
  .receipt-row .rl { color:var(--text-muted); font-size:11px; letter-spacing:1px; text-transform:uppercase; }
  .receipt-row .rv { color:var(--text); font-size:13px; text-align:right; max-width:62%; word-break:break-all; }
  .receipt-row .rv.gold  { color:var(--gold);  font-size:22px; font-weight:500; }
  .receipt-row .rv.green { color:var(--green); font-size:22px; font-weight:500; }
  .receipt-ref { text-align:center; padding:14px; background:var(--bg); border-radius:8px; margin-top:10px; }
  .receipt-ref small { color:var(--text-muted); font-size:10px; letter-spacing:2px; display:block; margin-bottom:5px; }
  .receipt-ref span { font-size:15px; color:var(--text); letter-spacing:3px; }
  .receipt-footer { text-align:center; margin-top:20px; color:var(--text-dim); font-size:10px; letter-spacing:2px; text-transform:uppercase; }

  @keyframes fadeUp  { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
  @keyframes fadeIn  { from{opacity:0} to{opacity:1} }
  @keyframes scaleIn { from{opacity:0;transform:scale(0.95)} to{opacity:1;transform:scale(1)} }

  @media(max-width:700px){
    .cards-row{grid-template-columns:1fr}
    .stat-card.featured{grid-column:span 1}
    .stat-value.large{font-size:28px}
    .action-row{grid-template-columns:1fr}
  }
`;

const SEED_ACCOUNTS = {
  "john.doe": {
    name:"John Doe", email:"john@example.com", password:"demo123",
    accountNumber:"NGV-8821-4403", balance:250000, currency:"NGN",
    transactions:[
      {id:"tx001",type:"in", name:"Salary Deposit",amount:150000,date:"2026-03-28",note:"March Salary"},
      {id:"tx002",type:"out",name:"Rent Payment",  amount:85000, date:"2026-03-30",note:"March Rent"},
    ]
  }
};

const genRef = () => "TXN" + Date.now().toString().slice(-8).toUpperCase();

function fmt(n, currency="NGN") {
  return currency==="NGN"
    ? "₦" + n.toLocaleString("en-NG",{minimumFractionDigits:2})
    : "$" + n.toLocaleString("en-US",{minimumFractionDigits:2});
}

function fmtDate(d) {
  return new Date(d).toLocaleDateString("en-NG",{day:"2-digit",month:"short",year:"numeric"});
}

function downloadReceipt(r) {
  const isDeposit = r.type === "deposit";
  const rows = isDeposit ? [
    ["Account Holder", r.accountHolder],
    ["Account Number", r.accountNumber],
    ["Funding Source", r.source],
    ["Narration",      r.note],
    ["Date & Time",    r.date],
    ["Balance Before", fmt(r.balanceBefore, r.currency)],
    ["Balance After",  fmt(r.balanceAfter,  r.currency)],
  ] : [
    ["Sender",         r.sender],
    ["Account No.",    r.senderAcct],
    ["Recipient",      r.recipient],
    ["Narration",      r.note],
    ["Date & Time",    r.date],
    ["Balance Before", fmt(r.balanceBefore, r.currency)],
    ["Balance After",  fmt(r.balanceAfter,  r.currency)],
  ];

  const rowsHtml = rows.map(([l,v])=>`
    <tr>
      <td style="padding:11px 0;color:#888;font-size:11px;letter-spacing:1.5px;text-transform:uppercase;border-bottom:1px solid #1c1c28;font-family:'DM Sans',sans-serif">${l}</td>
      <td style="padding:11px 0;text-align:right;color:#f0ede6;font-size:13px;border-bottom:1px solid #1c1c28;font-family:'DM Mono',monospace">${v}</td>
    </tr>`).join("");

  const amountColor = isDeposit ? "#2ecc71" : "#c9a84c";
  const amountLabel = isDeposit ? "Amount Deposited" : "Amount Sent";
  const typeLabel   = isDeposit ? "DEPOSIT RECEIPT"  : "TRANSFER RECEIPT";
  const statusLabel = isDeposit ? "✓  DEPOSIT SUCCESSFUL" : "✓  TRANSFER SUCCESSFUL";

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"/>
<title>Aurum Receipt – ${r.ref}</title>
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=DM+Sans:wght@400;600&family=DM+Mono:wght@400;500&display=swap" rel="stylesheet"/>
<style>
  *{box-sizing:border-box;margin:0;padding:0}
  body{background:#0a0a0f;color:#f0ede6;font-family:'DM Sans',sans-serif;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:40px 20px}
  .wrap{background:#12121a;border:1px solid rgba(255,255,255,0.07);border-radius:20px;padding:52px;max-width:500px;width:100%;box-shadow:0 40px 80px rgba(0,0,0,0.6)}
  .logo{text-align:center;margin-bottom:36px}
  .logo h1{font-family:'Playfair Display',serif;font-size:30px;color:#c9a84c;letter-spacing:3px}
  .logo p{font-size:11px;letter-spacing:4px;text-transform:uppercase;color:#7a7890;margin-top:5px}
  .badge{text-align:center;padding:14px;background:rgba(46,204,113,0.1);border:1px solid rgba(46,204,113,0.25);border-radius:10px;color:#2ecc71;font-size:13px;font-weight:700;letter-spacing:2px;margin-bottom:30px}
  .amt-block{text-align:center;margin-bottom:28px}
  .amt-lbl{font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#7a7890;margin-bottom:8px;font-family:'DM Sans',sans-serif}
  .amt-val{font-family:'DM Mono',monospace;font-size:38px;color:${amountColor};font-weight:500}
  .divider{border:none;border-top:1px dashed rgba(255,255,255,0.08);margin:24px 0}
  table{width:100%;border-collapse:collapse}
  .ref-box{background:#0a0a0f;border-radius:10px;padding:18px;text-align:center;margin-top:26px}
  .ref-lbl{font-size:10px;letter-spacing:2px;text-transform:uppercase;color:#7a7890;display:block;margin-bottom:7px;font-family:'DM Sans',sans-serif}
  .ref-val{font-family:'DM Mono',monospace;font-size:17px;color:#f0ede6;letter-spacing:3px}
  .print-btn{display:block;width:100%;margin-top:26px;padding:15px;background:#c9a84c;color:#0a0a0f;border:none;border-radius:10px;font-family:'DM Sans',sans-serif;font-size:15px;font-weight:700;cursor:pointer;letter-spacing:1px}
  .print-btn:hover{background:#e8c97a}
  .footer{text-align:center;margin-top:28px;color:#2a2a3a;font-size:10px;letter-spacing:2px;text-transform:uppercase;font-family:'DM Sans',sans-serif}
  @media print{.print-btn{display:none}body{background:#fff;padding:0}.wrap{box-shadow:none;border:none}}
</style>
</head>
<body>
<div class="wrap">
  <div class="logo"><h1>AURUM</h1><p>${typeLabel}</p></div>
  <div class="badge">${statusLabel}</div>
  <div class="amt-block">
    <div class="amt-lbl">${amountLabel}</div>
    <div class="amt-val">${fmt(r.amount, r.currency)}</div>
  </div>
  <hr class="divider"/>
  <table>${rowsHtml}</table>
  <div class="ref-box">
    <span class="ref-lbl">Transaction Reference</span>
    <span class="ref-val">${r.ref}</span>
  </div>
  <button class="print-btn" onclick="window.print()">🖨&nbsp; Print Receipt</button>
  <div class="footer">Aurum Private Banking &middot; Powered by Trust</div>
</div>
</body>
</html>`;

  const blob = new Blob([html], {type:"text/html"});
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement("a");
  a.href = url; a.download = `Aurum_Receipt_${r.ref}.html`; a.click();
  URL.revokeObjectURL(url);
}

export default function BankingApp() {
  const [accounts,  setAccounts]  = useState(SEED_ACCOUNTS);
  const [user,      setUser]      = useState(null);
  const [authTab,   setAuthTab]   = useState("login");
  const [authForm,  setAuthForm]  = useState({name:"",email:"",username:"",password:"",currency:"NGN"});
  const [authError, setAuthError] = useState("");

  const [modal,         setModal]         = useState(null);
  const [transfer,      setTransfer]      = useState({recipient:"",amount:"",note:""});
  const [transferError, setTransferError] = useState("");
  const [deposit,       setDeposit]       = useState({amount:"",source:"Bank Transfer",note:""});
  const [depositError,  setDepositError]  = useState("");
  const [receipt,       setReceipt]       = useState(null);

  const acc = user ? accounts[user] : null;

  // AUTH
  const handleAuth = () => {
    setAuthError("");
    if (authTab === "login") {
      const a = accounts[authForm.username];
      if (!a || a.password !== authForm.password) { setAuthError("Invalid username or password."); return; }
      setUser(authForm.username);
    } else {
      if (!authForm.name||!authForm.username||!authForm.email||!authForm.password) { setAuthError("All fields are required."); return; }
      if (accounts[authForm.username]) { setAuthError("Username already taken."); return; }
      const newAcc = {
        name:authForm.name, email:authForm.email, password:authForm.password,
        accountNumber:"NGV-"+Math.floor(1000+Math.random()*9000)+"-"+Math.floor(1000+Math.random()*9000),
        balance:50000, currency:authForm.currency, transactions:[]
      };
      setAccounts(p=>({...p,[authForm.username]:newAcc}));
      setUser(authForm.username);
    }
  };

  // TRANSFER
  const handleTransfer = () => {
    setTransferError("");
    const amount = parseFloat(transfer.amount);
    if (!transfer.recipient.trim()) { setTransferError("Enter recipient name."); return; }
    if (!amount||amount<=0)         { setTransferError("Enter a valid amount."); return; }
    if (amount>acc.balance)         { setTransferError("Insufficient funds."); return; }
    const ref=genRef(), now=new Date().toISOString().split("T")[0];
    const newTx={id:ref,type:"out",name:transfer.recipient.trim(),amount,date:now,note:transfer.note};
    const rd={type:"transfer",ref,sender:acc.name,senderAcct:acc.accountNumber,recipient:transfer.recipient.trim(),
      amount,currency:acc.currency,note:transfer.note||"—",date:new Date().toLocaleString("en-NG"),
      balanceBefore:acc.balance,balanceAfter:acc.balance-amount};
    setAccounts(p=>({...p,[user]:{...p[user],balance:acc.balance-amount,transactions:[newTx,...p[user].transactions]}}));
    setReceipt(rd); setTransfer({recipient:"",amount:"",note:""}); setModal("receipt");
  };

  // DEPOSIT
  const handleDeposit = () => {
    setDepositError("");
    const amount = parseFloat(deposit.amount);
    if (!amount||amount<=0) { setDepositError("Enter a valid amount."); return; }
    if (amount>10000000)    { setDepositError("Max single deposit is ₦10,000,000."); return; }
    const ref=genRef(), now=new Date().toISOString().split("T")[0];
    const newTx={id:ref,type:"in",name:deposit.source,amount,date:now,note:deposit.note||"Account funding"};
    const rd={type:"deposit",ref,accountHolder:acc.name,accountNumber:acc.accountNumber,
      source:deposit.source,amount,currency:acc.currency,note:deposit.note||"Account funding",
      date:new Date().toLocaleString("en-NG"),balanceBefore:acc.balance,balanceAfter:acc.balance+amount};
    setAccounts(p=>({...p,[user]:{...p[user],balance:acc.balance+amount,transactions:[newTx,...p[user].transactions]}}));
    setReceipt(rd); setDeposit({amount:"",source:"Bank Transfer",note:""}); setModal("receipt");
  };

  const QUICK_AMOUNTS = acc?.currency==="NGN" ? [5000,10000,20000,50000,100000] : [10,50,100,250,500];

  return (
    <>
      <style>{STYLES}</style>
      <div className="app">

        {/* LOGIN / REGISTER */}
        {!user ? (
          <div className="auth-container">
            <div className="auth-logo"><h1>AURUM</h1><p>Private Banking</p></div>
            <div className="auth-card">
              <div className="auth-tabs">
                <button className={`auth-tab ${authTab==="login"?"active":""}`} onClick={()=>{setAuthTab("login");setAuthError("");}}>Sign In</button>
                <button className={`auth-tab ${authTab==="register"?"active":""}`} onClick={()=>{setAuthTab("register");setAuthError("");}}>Create Account</button>
              </div>
              {authTab==="register"&&<div className="field"><label>Full Name</label><input placeholder="e.g. Chukwuemeka Obi" value={authForm.name} onChange={e=>setAuthForm(p=>({...p,name:e.target.value}))}/></div>}
              {authTab==="register"&&<div className="field"><label>Email Address</label><input type="email" placeholder="you@email.com" value={authForm.email} onChange={e=>setAuthForm(p=>({...p,email:e.target.value}))}/></div>}
              <div className="field"><label>Username</label><input placeholder="your.username" value={authForm.username} onChange={e=>setAuthForm(p=>({...p,username:e.target.value}))}/></div>
              <div className="field"><label>Password</label><input type="password" placeholder="••••••••" value={authForm.password} onChange={e=>setAuthForm(p=>({...p,password:e.target.value}))}/></div>
              {authTab==="register"&&<div className="field"><label>Currency</label><select value={authForm.currency} onChange={e=>setAuthForm(p=>({...p,currency:e.target.value}))}><option value="NGN">🇳🇬 Nigerian Naira (₦)</option><option value="USD">🇺🇸 US Dollar ($)</option></select></div>}
              <button className="btn-primary" onClick={handleAuth}>{authTab==="login"?"Sign In":"Open Account"}</button>
              {authError&&<p className="error-msg">{authError}</p>}
              {authTab==="login"&&<p style={{textAlign:"center",fontSize:12,color:"var(--text-dim)",marginTop:16}}>Demo: <strong style={{color:"var(--text-muted)"}}>john.doe</strong> / <strong style={{color:"var(--text-muted)"}}>demo123</strong></p>}
            </div>
          </div>

        /* DASHBOARD */
        ) : (
          <div className="dashboard">
            <div className="dash-header">
              <div className="dash-logo">AURUM</div>
              <div className="dash-user">
                <div className="avatar">{acc.name[0]}</div>
                <div className="dash-user-info"><span>{acc.name}</span><small>Private Account</small></div>
                <button className="btn-logout" onClick={()=>setUser(null)}>Logout</button>
              </div>
            </div>

            <div className="cards-row">
              <div className="stat-card featured">
                <div className="stat-label">Available Balance</div>
                <div className="stat-value large">{fmt(acc.balance,acc.currency)}</div>
                <div className="acct-num">{acc.accountNumber}</div>
                <div className="stat-sub" style={{marginTop:8}}>{acc.currency==="NGN"?"Nigerian Naira":"US Dollar"} · Active</div>
              </div>
              <div className="stat-card">
                <div className="stat-label">Transactions</div>
                <div className="stat-value">{acc.transactions.length}</div>
                <div className="stat-sub">Total records</div>
              </div>
            </div>

            {/* Action buttons */}
            <div className="action-row">
              <button className="action-btn send" onClick={()=>{setTransferError("");setModal("transfer");}}>
                <div className="action-btn-icon">↑</div>
                <div><span className="action-btn-title">Send Money</span><span className="action-btn-sub">Transfer to anyone</span></div>
              </button>
              <button className="action-btn deposit" onClick={()=>{setDepositError("");setModal("deposit");}}>
                <div className="action-btn-icon">↓</div>
                <div><span className="action-btn-title">Add Money</span><span className="action-btn-sub">Fund your account</span></div>
              </button>
            </div>

            <div className="panel">
              <div className="panel-title">Recent Transactions</div>
              {acc.transactions.length===0 ? (
                <div className="empty-state">No transactions yet.<br/>Use the buttons above to send or add money.</div>
              ) : (
                <div className="tx-list">
                  {acc.transactions.slice(0,10).map(tx=>(
                    <div className="tx-item" key={tx.id}>
                      <div className={`tx-icon ${tx.type}`}>{tx.type==="out"?"↑":"↓"}</div>
                      <div className="tx-meta">
                        <div className="tx-name">{tx.name}</div>
                        <div className="tx-date">{fmtDate(tx.date)} · {tx.note||tx.id}</div>
                      </div>
                      <div className={`tx-amount ${tx.type}`}>{tx.type==="out"?"-":"+"}{fmt(tx.amount,acc.currency)}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* TRANSFER MODAL */}
        {modal==="transfer"&&(
          <div className="modal-overlay" onClick={()=>setModal(null)}>
            <div className="modal" onClick={e=>e.stopPropagation()}>
              <div className="modal-title">Send Money</div>
              <div className="modal-sub">Transfer funds to anyone instantly</div>
              <div className="field"><label>Recipient Name</label><input placeholder="e.g. Amaka Okonkwo" value={transfer.recipient} onChange={e=>setTransfer(p=>({...p,recipient:e.target.value}))}/></div>
              <div className="field"><label>Amount ({acc?.currency})</label><input type="number" placeholder="0.00" value={transfer.amount} onChange={e=>setTransfer(p=>({...p,amount:e.target.value}))}/></div>
              <div className="field"><label>Narration (optional)</label><input placeholder="What's this for?" value={transfer.note} onChange={e=>setTransfer(p=>({...p,note:e.target.value}))}/></div>
              {transfer.amount&&parseFloat(transfer.amount)>0&&(
                <div style={{background:"var(--bg)",borderRadius:10,padding:"13px 16px",marginBottom:4,fontSize:13,color:"var(--text-muted)"}}>
                  Balance after transfer: <strong style={{color:parseFloat(transfer.amount)>acc.balance?"var(--red)":"var(--text)",fontFamily:"'DM Mono',monospace"}}>{fmt(acc.balance-parseFloat(transfer.amount),acc.currency)}</strong>
                </div>
              )}
              {transferError&&<p className="error-msg">{transferError}</p>}
              <div className="modal-actions">
                <div className="modal-actions-row">
                  <button className="btn-ghost" onClick={()=>{setModal(null);setTransferError("");}}>Cancel</button>
                  <button className="btn-primary" style={{flex:1,marginTop:0}} onClick={handleTransfer}>Send →</button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* DEPOSIT MODAL */}
        {modal==="deposit"&&(
          <div className="modal-overlay" onClick={()=>setModal(null)}>
            <div className="modal" onClick={e=>e.stopPropagation()}>
              <div className="modal-title">Add Money</div>
              <div className="modal-sub">Top up your Aurum account balance</div>
              <div style={{fontSize:11,letterSpacing:2,textTransform:"uppercase",color:"var(--text-muted)",marginBottom:10}}>Quick Amounts</div>
              <div className="quick-amounts">
                {QUICK_AMOUNTS.map(q=>(
                  <button key={q} className="quick-btn" onClick={()=>setDeposit(p=>({...p,amount:String(q)}))}>
                    {fmt(q,acc?.currency)}
                  </button>
                ))}
              </div>
              <div className="field"><label>Amount ({acc?.currency})</label><input type="number" placeholder="0.00" value={deposit.amount} onChange={e=>setDeposit(p=>({...p,amount:e.target.value}))}/></div>
              <div className="field">
                <label>Funding Source</label>
                <select value={deposit.source} onChange={e=>setDeposit(p=>({...p,source:e.target.value}))}>
                  <option>Bank Transfer</option>
                  <option>Cash Deposit</option>
                  <option>Mobile Money</option>
                  <option>Salary</option>
                  <option>Business Income</option>
                  <option>Other</option>
                </select>
              </div>
              <div className="field"><label>Narration (optional)</label><input placeholder="e.g. Monthly savings" value={deposit.note} onChange={e=>setDeposit(p=>({...p,note:e.target.value}))}/></div>
              {deposit.amount&&parseFloat(deposit.amount)>0&&(
                <div style={{background:"var(--green-dim)",border:"1px solid rgba(46,204,113,0.2)",borderRadius:10,padding:"13px 16px",marginBottom:4,fontSize:13,color:"var(--green)"}}>
                  New balance: <strong style={{fontFamily:"'DM Mono',monospace"}}>{fmt(acc.balance+parseFloat(deposit.amount),acc.currency)}</strong>
                </div>
              )}
              {depositError&&<p className="error-msg">{depositError}</p>}
              <div className="modal-actions">
                <div className="modal-actions-row">
                  <button className="btn-ghost" onClick={()=>{setModal(null);setDepositError("");}}>Cancel</button>
                  <button className="btn-green" style={{flex:1,marginTop:0}} onClick={handleDeposit}>Add Money ↓</button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* RECEIPT MODAL */}
        {modal==="receipt"&&receipt&&(
          <div className="modal-overlay">
            <div className="modal">
              <div className="receipt">
                <div className="receipt-header">
                  <h2>AURUM</h2>
                  <p>{receipt.type==="deposit"?"Deposit Receipt":"Transfer Receipt"}</p>
                </div>
                <div className={`receipt-badge ${receipt.type}`}>
                  ✓ &nbsp;{receipt.type==="deposit"?"DEPOSIT SUCCESSFUL":"TRANSFER SUCCESSFUL"}
                </div>
                <div className="receipt-row">
                  <span className="rl">{receipt.type==="deposit"?"Amount Deposited":"Amount Sent"}</span>
                  <span className={`rv ${receipt.type==="deposit"?"green":"gold"}`}>{fmt(receipt.amount,receipt.currency)}</span>
                </div>
                <hr className="receipt-divider"/>
                {(receipt.type==="deposit"?[
                  ["Account Holder",receipt.accountHolder],
                  ["Account No.",   receipt.accountNumber],
                  ["Source",        receipt.source],
                  ["Narration",     receipt.note],
                  ["Date & Time",   receipt.date],
                  ["Balance Before",fmt(receipt.balanceBefore,receipt.currency)],
                  ["Balance After", fmt(receipt.balanceAfter, receipt.currency)],
                ]:[
                  ["Sender",        receipt.sender],
                  ["Account No.",   receipt.senderAcct],
                  ["Recipient",     receipt.recipient],
                  ["Narration",     receipt.note],
                  ["Date & Time",   receipt.date],
                  ["Balance Before",fmt(receipt.balanceBefore,receipt.currency)],
                  ["Balance After", fmt(receipt.balanceAfter, receipt.currency)],
                ]).map(([l,v])=>(
                  <div className="receipt-row" key={l}>
                    <span className="rl">{l}</span>
                    <span className="rv">{v}</span>
                  </div>
                ))}
                <hr className="receipt-divider"/>
                <div className="receipt-ref">
                  <small>Transaction Reference</small>
                  <span>{receipt.ref}</span>
                </div>
                <div className="receipt-footer">Aurum Private Banking · Powered by Trust</div>
              </div>
              <div className="modal-actions">
                <button className="btn-download" onClick={()=>downloadReceipt(receipt)}>
                  ⬇ &nbsp;Download Receipt (.html)
                </button>
                <div className="modal-actions-row">
                  <button className="btn-primary" style={{marginTop:0,flex:1}} onClick={()=>setModal(null)}>Done</button>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </>
  );
}