import { useState, useEffect } from "react";

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
    --red: #e74c3c;
    --radius: 16px;
  }

  body {
    font-family: 'DM Sans', sans-serif;
    background: var(--bg);
    color: var(--text);
    min-height: 100vh;
    overflow-x: hidden;
  }

  .app {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
    position: relative;
  }

  .app::before {
    content: '';
    position: fixed;
    top: -200px; left: -200px;
    width: 600px; height: 600px;
    background: radial-gradient(circle, rgba(201,168,76,0.06) 0%, transparent 70%);
    pointer-events: none;
  }

  .app::after {
    content: '';
    position: fixed;
    bottom: -200px; right: -200px;
    width: 500px; height: 500px;
    background: radial-gradient(circle, rgba(100,80,200,0.05) 0%, transparent 70%);
    pointer-events: none;
  }

  /* AUTH */
  .auth-container {
    width: 100%;
    max-width: 420px;
    animation: fadeUp 0.5s ease;
  }

  .auth-logo {
    text-align: center;
    margin-bottom: 40px;
  }

  .auth-logo h1 {
    font-family: 'Playfair Display', serif;
    font-size: 32px;
    font-weight: 700;
    color: var(--gold);
    letter-spacing: 2px;
  }

  .auth-logo p {
    font-size: 12px;
    letter-spacing: 4px;
    text-transform: uppercase;
    color: var(--text-muted);
    margin-top: 4px;
  }

  .auth-card {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    padding: 40px;
    box-shadow: 0 40px 80px rgba(0,0,0,0.5);
  }

  .auth-tabs {
    display: flex;
    gap: 0;
    margin-bottom: 32px;
    background: var(--bg);
    border-radius: 10px;
    padding: 4px;
  }

  .auth-tab {
    flex: 1;
    padding: 10px;
    text-align: center;
    cursor: pointer;
    border-radius: 8px;
    font-size: 14px;
    font-weight: 500;
    color: var(--text-muted);
    transition: all 0.2s;
    border: none;
    background: transparent;
  }

  .auth-tab.active {
    background: var(--surface2);
    color: var(--gold);
    box-shadow: 0 2px 8px rgba(0,0,0,0.3);
  }

  .field {
    margin-bottom: 20px;
  }

  .field label {
    display: block;
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 2px;
    text-transform: uppercase;
    color: var(--text-muted);
    margin-bottom: 8px;
  }

  .field input, .field select {
    width: 100%;
    padding: 14px 16px;
    background: var(--bg);
    border: 1px solid var(--border);
    border-radius: 10px;
    color: var(--text);
    font-family: 'DM Sans', sans-serif;
    font-size: 15px;
    outline: none;
    transition: border 0.2s;
  }

  .field input:focus, .field select:focus {
    border-color: var(--gold);
  }

  .field select option {
    background: var(--surface);
  }

  .btn-primary {
    width: 100%;
    padding: 16px;
    background: var(--gold);
    color: #0a0a0f;
    border: none;
    border-radius: 10px;
    font-family: 'DM Sans', sans-serif;
    font-size: 15px;
    font-weight: 700;
    letter-spacing: 1px;
    cursor: pointer;
    transition: all 0.2s;
    margin-top: 8px;
  }

  .btn-primary:hover {
    background: var(--gold-light);
    transform: translateY(-1px);
    box-shadow: 0 8px 24px rgba(201,168,76,0.3);
  }

  .btn-primary:active { transform: translateY(0); }

  .error-msg {
    color: var(--red);
    font-size: 13px;
    margin-top: 12px;
    text-align: center;
  }

  /* DASHBOARD */
  .dashboard {
    width: 100%;
    max-width: 900px;
    animation: fadeUp 0.5s ease;
  }

  .dash-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 32px;
  }

  .dash-logo {
    font-family: 'Playfair Display', serif;
    font-size: 22px;
    color: var(--gold);
    letter-spacing: 2px;
  }

  .dash-user {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .avatar {
    width: 38px; height: 38px;
    background: var(--gold-dim);
    border: 1px solid var(--gold);
    border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    font-family: 'Playfair Display', serif;
    font-size: 16px;
    color: var(--gold);
  }

  .dash-user-info small {
    display: block;
    font-size: 11px;
    letter-spacing: 1px;
    color: var(--text-muted);
    text-transform: uppercase;
  }

  .btn-logout {
    padding: 8px 18px;
    background: transparent;
    border: 1px solid var(--border);
    border-radius: 8px;
    color: var(--text-muted);
    font-size: 13px;
    cursor: pointer;
    transition: all 0.2s;
  }

  .btn-logout:hover { border-color: var(--red); color: var(--red); }

  .cards-row {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 16px;
    margin-bottom: 28px;
  }

  .stat-card {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    padding: 24px;
  }

  .stat-card.featured {
    background: linear-gradient(135deg, #1a1608 0%, #12120a 100%);
    border-color: rgba(201,168,76,0.3);
    grid-column: span 2;
  }

  .stat-label {
    font-size: 11px;
    letter-spacing: 2px;
    text-transform: uppercase;
    color: var(--text-muted);
    margin-bottom: 10px;
  }

  .stat-value {
    font-family: 'DM Mono', monospace;
    font-size: 28px;
    font-weight: 500;
    color: var(--gold);
  }

  .stat-value.large {
    font-size: 36px;
  }

  .stat-sub {
    font-size: 12px;
    color: var(--text-muted);
    margin-top: 6px;
  }

  .acct-num {
    font-family: 'DM Mono', monospace;
    font-size: 13px;
    color: var(--text-muted);
    letter-spacing: 2px;
    margin-top: 4px;
  }

  .main-grid {
    display: grid;
    grid-template-columns: 1fr 1.2fr;
    gap: 20px;
  }

  .panel {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    padding: 28px;
  }

  .panel-title {
    font-family: 'Playfair Display', serif;
    font-size: 18px;
    color: var(--text);
    margin-bottom: 24px;
    padding-bottom: 16px;
    border-bottom: 1px solid var(--border);
  }

  .btn-secondary {
    width: 100%;
    padding: 14px;
    background: var(--gold-dim);
    border: 1px solid rgba(201,168,76,0.3);
    border-radius: 10px;
    color: var(--gold);
    font-family: 'DM Sans', sans-serif;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s;
    margin-top: 8px;
  }

  .btn-secondary:hover { background: rgba(201,168,76,0.25); }

  .tx-list { display: flex; flex-direction: column; gap: 12px; }

  .tx-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 14px 16px;
    background: var(--bg);
    border-radius: 10px;
    border: 1px solid var(--border);
  }

  .tx-icon {
    width: 36px; height: 36px;
    border-radius: 8px;
    display: flex; align-items: center; justify-content: center;
    font-size: 16px;
    margin-right: 12px;
    flex-shrink: 0;
  }

  .tx-icon.out { background: rgba(231,76,60,0.15); }
  .tx-icon.in { background: rgba(46,204,113,0.15); }

  .tx-meta { flex: 1; }
  .tx-name { font-size: 14px; font-weight: 500; }
  .tx-date { font-size: 11px; color: var(--text-muted); margin-top: 2px; }

  .tx-amount {
    font-family: 'DM Mono', monospace;
    font-size: 15px;
    font-weight: 500;
  }
  .tx-amount.out { color: var(--red); }
  .tx-amount.in { color: var(--green); }

  .empty-state {
    text-align: center;
    color: var(--text-muted);
    padding: 30px;
    font-size: 14px;
  }

  /* MODAL */
  .modal-overlay {
    position: fixed; inset: 0;
    background: rgba(0,0,0,0.7);
    backdrop-filter: blur(4px);
    display: flex; align-items: center; justify-content: center;
    z-index: 1000;
    padding: 20px;
    animation: fadeIn 0.2s ease;
  }

  .modal {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    padding: 40px;
    width: 100%;
    max-width: 480px;
    box-shadow: 0 40px 80px rgba(0,0,0,0.6);
    animation: scaleIn 0.25s ease;
    max-height: 90vh;
    overflow-y: auto;
  }

  .modal-title {
    font-family: 'Playfair Display', serif;
    font-size: 22px;
    margin-bottom: 8px;
  }

  .modal-sub {
    font-size: 13px;
    color: var(--text-muted);
    margin-bottom: 28px;
  }

  .modal-actions {
    display: flex;
    gap: 12px;
    margin-top: 24px;
  }

  .btn-ghost {
    flex: 1;
    padding: 14px;
    background: transparent;
    border: 1px solid var(--border);
    border-radius: 10px;
    color: var(--text-muted);
    font-family: 'DM Sans', sans-serif;
    font-size: 14px;
    cursor: pointer;
    transition: all 0.2s;
  }

  .btn-ghost:hover { border-color: var(--text-muted); color: var(--text); }

  /* RECEIPT */
  .receipt {
    font-family: 'DM Mono', monospace;
  }

  .receipt-header {
    text-align: center;
    margin-bottom: 28px;
  }

  .receipt-header h2 {
    font-family: 'Playfair Display', serif;
    font-size: 22px;
    color: var(--gold);
    letter-spacing: 2px;
  }

  .receipt-header p {
    font-size: 11px;
    letter-spacing: 3px;
    color: var(--text-muted);
    text-transform: uppercase;
    margin-top: 4px;
  }

  .receipt-badge {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    padding: 12px;
    background: rgba(46,204,113,0.1);
    border: 1px solid rgba(46,204,113,0.2);
    border-radius: 10px;
    margin-bottom: 24px;
    color: var(--green);
    font-size: 14px;
    font-weight: 600;
    letter-spacing: 1px;
  }

  .receipt-divider {
    border: none;
    border-top: 1px dashed var(--border);
    margin: 20px 0;
  }

  .receipt-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 8px 0;
    font-size: 13px;
  }

  .receipt-row .label { color: var(--text-muted); font-size: 11px; letter-spacing: 1px; text-transform: uppercase; }
  .receipt-row .value { color: var(--text); font-size: 13px; text-align: right; max-width: 60%; word-break: break-all; }
  .receipt-row .value.gold { color: var(--gold); font-size: 20px; }

  .receipt-ref {
    text-align: center;
    padding: 16px;
    background: var(--bg);
    border-radius: 8px;
    margin-top: 8px;
  }

  .receipt-ref small { color: var(--text-muted); font-size: 10px; letter-spacing: 2px; display: block; margin-bottom: 4px; }
  .receipt-ref span { font-size: 14px; color: var(--text); letter-spacing: 2px; }

  .receipt-footer {
    text-align: center;
    margin-top: 20px;
    color: var(--text-dim);
    font-size: 10px;
    letter-spacing: 1px;
    text-transform: uppercase;
  }

  /* ANIMATIONS */
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  @keyframes scaleIn {
    from { opacity: 0; transform: scale(0.95); }
    to { opacity: 1; transform: scale(1); }
  }

  @media (max-width: 700px) {
    .cards-row { grid-template-columns: 1fr; }
    .stat-card.featured { grid-column: span 1; }
    .main-grid { grid-template-columns: 1fr; }
    .stat-value.large { font-size: 28px; }
  }
`;

// Seed data
const SEED_ACCOUNTS = {
  "john.doe": {
    name: "John Doe",
    email: "john@example.com",
    password: "demo123",
    accountNumber: "NGV-8821-4403",
    balance: 250000,
    currency: "NGN",
    transactions: [
      { id: "tx001", type: "in", name: "Salary Deposit", amount: 150000, date: "2026-03-28", note: "March Salary" },
      { id: "tx002", type: "out", name: "Rent Payment", amount: 85000, date: "2026-03-30", note: "March Rent" },
    ]
  }
};

function generateRef() {
  return "TXN" + Date.now().toString().slice(-8).toUpperCase();
}

function formatAmount(n, currency = "NGN") {
  return currency === "NGN"
    ? "₦" + n.toLocaleString("en-NG", { minimumFractionDigits: 2 })
    : "$" + n.toLocaleString("en-US", { minimumFractionDigits: 2 });
}

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString("en-NG", { day: "2-digit", month: "short", year: "numeric" });
}

export default function BankingApp() {
  const [accounts, setAccounts] = useState(SEED_ACCOUNTS);
  const [user, setUser] = useState(null);
  const [authTab, setAuthTab] = useState("login");
  const [authForm, setAuthForm] = useState({ name: "", email: "", username: "", password: "", currency: "NGN" });
  const [authError, setAuthError] = useState("");
  const [modal, setModal] = useState(null); // 'transfer' | 'receipt'
  const [transfer, setTransfer] = useState({ recipient: "", amount: "", note: "" });
  const [transferError, setTransferError] = useState("");
  const [receipt, setReceipt] = useState(null);

  const handleAuth = () => {
    setAuthError("");
    if (authTab === "login") {
      const acc = accounts[authForm.username];
      if (!acc || acc.password !== authForm.password) {
        setAuthError("Invalid username or password.");
        return;
      }
      setUser(authForm.username);
    } else {
      if (!authForm.name || !authForm.username || !authForm.email || !authForm.password) {
        setAuthError("All fields are required."); return;
      }
      if (accounts[authForm.username]) {
        setAuthError("Username already taken."); return;
      }
      const newAcc = {
        name: authForm.name,
        email: authForm.email,
        password: authForm.password,
        accountNumber: "NGV-" + Math.floor(1000 + Math.random() * 9000) + "-" + Math.floor(1000 + Math.random() * 9000),
        balance: 100000,
        currency: authForm.currency,
        transactions: []
      };
      setAccounts(prev => ({ ...prev, [authForm.username]: newAcc }));
      setUser(authForm.username);
    }
  };

  const handleTransfer = () => {
    setTransferError("");
    const acc = accounts[user];
    const amount = parseFloat(transfer.amount);
    if (!transfer.recipient.trim()) { setTransferError("Enter recipient name."); return; }
    if (!amount || amount <= 0) { setTransferError("Enter a valid amount."); return; }
    if (amount > acc.balance) { setTransferError("Insufficient funds."); return; }

    const ref = generateRef();
    const now = new Date().toISOString().split("T")[0];
    const newTx = { id: ref, type: "out", name: transfer.recipient.trim(), amount, date: now, note: transfer.note };

    const receiptData = {
      ref,
      sender: acc.name,
      senderAcct: acc.accountNumber,
      recipient: transfer.recipient.trim(),
      amount,
      currency: acc.currency,
      note: transfer.note || "—",
      date: new Date().toLocaleString("en-NG"),
      balanceBefore: acc.balance,
      balanceAfter: acc.balance - amount,
    };

    setAccounts(prev => ({
      ...prev,
      [user]: {
        ...prev[user],
        balance: acc.balance - amount,
        transactions: [newTx, ...acc.transactions]
      }
    }));

    setReceipt(receiptData);
    setTransfer({ recipient: "", amount: "", note: "" });
    setModal("receipt");
  };

  const acc = user ? accounts[user] : null;

  return (
    <>
      <style>{STYLES}</style>
      <div className="app">
        {!user ? (
          <div className="auth-container">
            <div className="auth-logo">
              <h1>AURUM</h1>
              <p>Private Banking</p>
            </div>
            <div className="auth-card">
              <div className="auth-tabs">
                <button className={`auth-tab ${authTab === "login" ? "active" : ""}`} onClick={() => { setAuthTab("login"); setAuthError(""); }}>Sign In</button>
                <button className={`auth-tab ${authTab === "register" ? "active" : ""}`} onClick={() => { setAuthTab("register"); setAuthError(""); }}>Create Account</button>
              </div>

              {authTab === "register" && (
                <div className="field">
                  <label>Full Name</label>
                  <input placeholder="e.g. Chukwuemeka Obi" value={authForm.name} onChange={e => setAuthForm(p => ({ ...p, name: e.target.value }))} />
                </div>
              )}
              {authTab === "register" && (
                <div className="field">
                  <label>Email Address</label>
                  <input type="email" placeholder="you@email.com" value={authForm.email} onChange={e => setAuthForm(p => ({ ...p, email: e.target.value }))} />
                </div>
              )}
              <div className="field">
                <label>Username</label>
                <input placeholder="your.username" value={authForm.username} onChange={e => setAuthForm(p => ({ ...p, username: e.target.value }))} />
              </div>
              <div className="field">
                <label>Password</label>
                <input type="password" placeholder="••••••••" value={authForm.password} onChange={e => setAuthForm(p => ({ ...p, password: e.target.value }))} />
              </div>
              {authTab === "register" && (
                <div className="field">
                  <label>Currency</label>
                  <select value={authForm.currency} onChange={e => setAuthForm(p => ({ ...p, currency: e.target.value }))}>
                    <option value="NGN">🇳🇬 Nigerian Naira (₦)</option>
                    <option value="USD">🇺🇸 US Dollar ($)</option>
                  </select>
                </div>
              )}
              <button className="btn-primary" onClick={handleAuth}>{authTab === "login" ? "Sign In" : "Open Account"}</button>
              {authError && <p className="error-msg">{authError}</p>}
              {authTab === "login" && <p style={{ textAlign: "center", fontSize: 12, color: "var(--text-dim)", marginTop: 16 }}>Demo: username <strong style={{ color: "var(--text-muted)" }}>john.doe</strong> / password <strong style={{ color: "var(--text-muted)" }}>demo123</strong></p>}
            </div>
          </div>
        ) : (
          <div className="dashboard">
            <div className="dash-header">
              <div className="dash-logo">AURUM</div>
              <div className="dash-user">
                <div className="avatar">{acc.name[0]}</div>
                <div className="dash-user-info">
                  <span>{acc.name}</span>
                  <small>Private Account</small>
                </div>
                <button className="btn-logout" onClick={() => setUser(null)}>Logout</button>
              </div>
            </div>

            <div className="cards-row">
              <div className="stat-card featured">
                <div className="stat-label">Available Balance</div>
                <div className="stat-value large">{formatAmount(acc.balance, acc.currency)}</div>
                <div className="acct-num">{acc.accountNumber}</div>
                <div className="stat-sub" style={{ marginTop: 8 }}>{acc.currency === "NGN" ? "Nigerian Naira" : "US Dollar"} · Active</div>
              </div>
              <div className="stat-card">
                <div className="stat-label">Transactions</div>
                <div className="stat-value">{acc.transactions.length}</div>
                <div className="stat-sub">Total records</div>
              </div>
            </div>

            <div className="main-grid">
              <div className="panel">
                <div className="panel-title">Send Money</div>
                <div className="field">
                  <label>Recipient Name</label>
                  <input placeholder="e.g. Amaka Okonkwo" value={transfer.recipient} onChange={e => setTransfer(p => ({ ...p, recipient: e.target.value }))} />
                </div>
                <div className="field">
                  <label>Amount ({acc.currency})</label>
                  <input type="number" placeholder="0.00" value={transfer.amount} onChange={e => setTransfer(p => ({ ...p, amount: e.target.value }))} />
                </div>
                <div className="field">
                  <label>Narration (optional)</label>
                  <input placeholder="What's this for?" value={transfer.note} onChange={e => setTransfer(p => ({ ...p, note: e.target.value }))} />
                </div>
                {transferError && <p className="error-msg">{transferError}</p>}
                <button className="btn-primary" onClick={() => setModal("confirm")}>Proceed to Transfer →</button>
              </div>

              <div className="panel">
                <div className="panel-title">Recent Transactions</div>
                {acc.transactions.length === 0 ? (
                  <div className="empty-state">No transactions yet.<br />Make your first transfer!</div>
                ) : (
                  <div className="tx-list">
                    {acc.transactions.slice(0, 6).map(tx => (
                      <div className="tx-item" key={tx.id}>
                        <div className={`tx-icon ${tx.type}`}>{tx.type === "out" ? "↑" : "↓"}</div>
                        <div className="tx-meta">
                          <div className="tx-name">{tx.name}</div>
                          <div className="tx-date">{formatDate(tx.date)} · {tx.note || tx.id}</div>
                        </div>
                        <div className={`tx-amount ${tx.type}`}>
                          {tx.type === "out" ? "-" : "+"}{formatAmount(tx.amount, acc.currency)}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* CONFIRM MODAL */}
        {modal === "confirm" && (
          <div className="modal-overlay" onClick={() => setModal(null)}>
            <div className="modal" onClick={e => e.stopPropagation()}>
              <div className="modal-title">Confirm Transfer</div>
              <div className="modal-sub">Review the details before proceeding</div>
              <div style={{ background: "var(--bg)", borderRadius: 12, padding: "20px", marginBottom: 8 }}>
                {[
                  ["To", transfer.recipient || "—"],
                  ["Amount", transfer.amount ? formatAmount(parseFloat(transfer.amount), acc?.currency) : "—"],
                  ["Note", transfer.note || "No narration"],
                  ["New Balance", transfer.amount ? formatAmount(acc.balance - parseFloat(transfer.amount), acc?.currency) : "—"],
                ].map(([l, v]) => (
                  <div className="receipt-row" key={l}>
                    <span className="label">{l}</span>
                    <span className="value">{v}</span>
                  </div>
                ))}
              </div>
              {transferError && <p className="error-msg">{transferError}</p>}
              <div className="modal-actions">
                <button className="btn-ghost" onClick={() => { setModal(null); setTransferError(""); }}>Cancel</button>
                <button className="btn-primary" style={{ flex: 1, marginTop: 0 }} onClick={handleTransfer}>Confirm & Send</button>
              </div>
            </div>
          </div>
        )}

        {/* RECEIPT MODAL */}
        {modal === "receipt" && receipt && (
          <div className="modal-overlay">
            <div className="modal">
              <div className="receipt">
                <div className="receipt-header">
                  <h2>AURUM</h2>
                  <p>Transfer Receipt</p>
                </div>
                <div className="receipt-badge">✓ &nbsp; TRANSFER SUCCESSFUL</div>
                <div className="receipt-row">
                  <span className="label">Amount Sent</span>
                  <span className="value gold">{formatAmount(receipt.amount, receipt.currency)}</span>
                </div>
                <hr className="receipt-divider" />
                {[
                  ["Sender", receipt.sender],
                  ["Account No.", receipt.senderAcct],
                  ["Recipient", receipt.recipient],
                  ["Narration", receipt.note],
                  ["Date & Time", receipt.date],
                  ["Balance Before", formatAmount(receipt.balanceBefore, receipt.currency)],
                  ["Balance After", formatAmount(receipt.balanceAfter, receipt.currency)],
                ].map(([l, v]) => (
                  <div className="receipt-row" key={l}>
                    <span className="label">{l}</span>
                    <span className="value">{v}</span>
                  </div>
                ))}
                <hr className="receipt-divider" />
                <div className="receipt-ref">
                  <small>Transaction Reference</small>
                  <span>{receipt.ref}</span>
                </div>
                <div className="receipt-footer" style={{ marginTop: 24 }}>
                  Aurum Private Banking · Powered by Trust
                </div>
              </div>
              <div className="modal-actions">
                <button className="btn-primary" style={{ marginTop: 0 }} onClick={() => setModal(null)}>Done</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
