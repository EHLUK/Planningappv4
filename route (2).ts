"use client";

import { useState, useEffect, useCallback } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

type Contract = {
  id: string;
  name: string;
  code: string;
  client?: string | null;
  contractor?: string | null;
  necOption?: string | null;
  startingDate?: string | null;
  completionDate?: string | null;
  reportingPeriod?: string | null;
  contractManager?: string | null;
  planner?: string | null;
  commercialLead?: string | null;
  projectManager?: string | null;
  disciplines?: string | null;
  areas?: string | null;
  aiTone?: string | null;
  reportBranding?: string | null;
  status: string;
};

type CommercialRecord = {
  id: string;
  contractId: string;
  recordType: string;
  reference: string;
  title: string;
  ownerName?: string | null;
  status: string;
  dueLabel?: string | null;
  activityCode?: string | null;
  createdAt: string;
};

type Commitment = {
  id: string;
  contractId: string;
  title: string;
  ownerName?: string | null;
  dueLabel?: string | null;
  status: string;
  activityCode?: string | null;
  createdAt: string;
};

type Handoff = {
  id: string;
  contractId: string;
  title: string;
  fromOwner?: string | null;
  toOwner?: string | null;
  dueLabel?: string | null;
  status: string;
  activityCode?: string | null;
  createdAt: string;
};

type Constraint = {
  id: string;
  contractId: string;
  activityCode?: string | null;
  title: string;
  type?: string | null;
  ownerName?: string | null;
  dueLabel?: string | null;
  status: string;
  createdAt: string;
};

type DailyAction = {
  id: string;
  contractId: string;
  title: string;
  ownerName?: string | null;
  dueLabel?: string | null;
  status: string;
  activityCode?: string | null;
  createdAt: string;
};

type AuditEvent = {
  id: string;
  action: string;
  detail: string;
  createdAt: string;
};

type LookaheadActivity = {
  id: string;
  contractId: string;
  activityCode: string;
  title: string;
  ownerName?: string | null;
  area?: string | null;
  startLabel?: string | null;
  finishLabel?: string | null;
  status: string;
  source: string;
};

// ─── Nav modules ──────────────────────────────────────────────────────────────

const NAV_ITEMS = [
  { id: "dashboard", label: "Dashboard" },
  { id: "setup", label: "Contract Setup" },
  { id: "programmes", label: "Programmes" },
  { id: "planning", label: "Planning Workspace" },
  { id: "mywork", label: "My Work" },
  { id: "commercial", label: "Commercial Control" },
  { id: "reports", label: "Reports" },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function pillClass(status: string): string {
  const s = status.toLowerCase();
  if (["complete", "met", "accepted", "closed", "done"].includes(s)) return "status-pill green";
  if (["open", "promised", "in progress", "draft"].includes(s)) return "status-pill blue";
  if (["at risk", "pending", "overdue", "review"].includes(s)) return "status-pill amber";
  if (["blocked", "missed", "rejected"].includes(s)) return "status-pill red";
  return "status-pill";
}

function formatDate(d?: string | null): string {
  if (!d) return "—";
  return new Date(d).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
}

// ─── API helpers ──────────────────────────────────────────────────────────────

async function apiFetch(url: string, opts?: RequestInit) {
  const res = await fetch(url, opts);
  if (!res.ok) throw new Error(`API error ${res.status}`);
  return res.json();
}

// ─── Toast ────────────────────────────────────────────────────────────────────

function Toast({ msg, onDone }: { msg: string; onDone: () => void }) {
  useEffect(() => {
    const t = setTimeout(onDone, 3000);
    return () => clearTimeout(t);
  }, [onDone]);
  return <div className="toast">{msg}</div>;
}

// ─── Contract Strip ───────────────────────────────────────────────────────────

function ContractStrip({
  contracts,
  selected,
  onSelect,
  onNew,
}: {
  contracts: Contract[];
  selected: Contract | null;
  onSelect: (c: Contract) => void;
  onNew: () => void;
}) {
  return (
    <div className="contract-strip">
      <div className="contract-picker">
        <p className="eyebrow" style={{ margin: 0 }}>Active Contract</p>
        <select
          value={selected?.id ?? ""}
          onChange={(e) => {
            const c = contracts.find((x) => x.id === e.target.value);
            if (c) onSelect(c);
          }}
        >
          {contracts.length === 0 && <option value="">No contracts — create one in Setup</option>}
          {contracts.map((c) => (
            <option key={c.id} value={c.id}>
              {c.code} — {c.name}
            </option>
          ))}
        </select>
      </div>
      {selected && (
        <div className="contract-meta">
          <span>{selected.client ?? "—"}</span>
          <span>{selected.necOption ?? "—"}</span>
          <span className={pillClass(selected.status)}>{selected.status}</span>
        </div>
      )}
      <button className="primary-button" onClick={onNew}>
        + New Contract
      </button>
    </div>
  );
}

// ─── Dashboard ────────────────────────────────────────────────────────────────

function Dashboard({
  contract,
  commitments,
  constraints,
  actions,
  commercial,
}: {
  contract: Contract | null;
  commitments: Commitment[];
  constraints: Constraint[];
  actions: DailyAction[];
  commercial: CommercialRecord[];
}) {
  if (!contract) {
    return (
      <div>
        <p className="eyebrow">Dashboard</p>
        <h1>Contract Control Hub</h1>
        <p className="hero-copy">
          Select a contract above or create a new one in Contract Setup to get started.
        </p>
      </div>
    );
  }

  const openConstraints = constraints.filter((c) => c.status === "Open").length;
  const openActions = actions.filter((a) => a.status === "Open").length;
  const openCommitments = commitments.filter((c) => c.status === "Promised").length;
  const ewns = commercial.filter((r) => r.recordType === "EWN").length;
  const ces = commercial.filter((r) => r.recordType === "CE").length;

  return (
    <div>
      <div className="top-bar">
        <div>
          <p className="eyebrow">Dashboard</p>
          <h1>{contract.name}</h1>
          <p className="hero-copy">
            {contract.contractor ?? ""} {contract.client ? `| ${contract.client}` : ""}
            {contract.completionDate ? ` | Completion: ${formatDate(contract.completionDate)}` : ""}
          </p>
        </div>
      </div>

      <div className="kpi-row">
        <div className="kpi-card">
          <span>{openConstraints}</span>
          <strong>Open Constraints</strong>
          <small>Blocking live activities</small>
        </div>
        <div className="kpi-card">
          <span>{openActions}</span>
          <strong>Open Actions</strong>
          <small>From last meeting</small>
        </div>
        <div className="kpi-card">
          <span>{openCommitments}</span>
          <strong>Promises Outstanding</strong>
          <small>Commitments not yet met</small>
        </div>
        <div className="kpi-card">
          <span>{ewns + ces}</span>
          <strong>Commercial Events</strong>
          <small>{ewns} EWN · {ces} CE</small>
        </div>
      </div>

      <div className="module-grid">
        <div className="module-card">
          <div className="module-card-top">
            <p className="eyebrow" style={{ margin: 0 }}>Planning</p>
          </div>
          <h2>Planning Workspace</h2>
          <p>Weekly board, activity assignments, look-ahead planning, and schedule adherence.</p>
        </div>
        <div className="module-card">
          <div className="module-card-top">
            <p className="eyebrow" style={{ margin: 0 }}>Delivery</p>
          </div>
          <h2>My Work</h2>
          <p>Owner-focused view of commitments, handoffs, constraints, and daily actions.</p>
        </div>
        <div className="module-card">
          <div className="module-card-top">
            <p className="eyebrow" style={{ margin: 0 }}>Commercial</p>
          </div>
          <h2>Commercial Control</h2>
          <p>EWN, CE, PMI, and Clause 32 register. NEC record keeping and status tracking.</p>
        </div>
        <div className="module-card">
          <div className="module-card-top">
            <p className="eyebrow" style={{ margin: 0 }}>Reports</p>
          </div>
          <h2>Reports</h2>
          <p>Planning pack, Clause 32 narrative, schedule integrity, and baseline comparison.</p>
        </div>
      </div>
    </div>
  );
}

// ─── Contract Setup ───────────────────────────────────────────────────────────

function ContractSetup({
  contract,
  onSaved,
  onToast,
}: {
  contract: Contract | null;
  onSaved: (c: Contract) => void;
  onToast: (msg: string) => void;
}) {
  const blank: Omit<Contract, "id" | "status"> = {
    name: "",
    code: "",
    client: "",
    contractor: "",
    necOption: "",
    startingDate: "",
    completionDate: "",
    reportingPeriod: "",
    contractManager: "",
    planner: "",
    commercialLead: "",
    projectManager: "",
    disciplines: "",
    areas: "",
    aiTone: "",
    reportBranding: "",
  };

  const [form, setForm] = useState<typeof blank>(
    contract
      ? {
          name: contract.name,
          code: contract.code,
          client: contract.client ?? "",
          contractor: contract.contractor ?? "",
          necOption: contract.necOption ?? "",
          startingDate: contract.startingDate?.slice(0, 10) ?? "",
          completionDate: contract.completionDate?.slice(0, 10) ?? "",
          reportingPeriod: contract.reportingPeriod ?? "",
          contractManager: contract.contractManager ?? "",
          planner: contract.planner ?? "",
          commercialLead: contract.commercialLead ?? "",
          projectManager: contract.projectManager ?? "",
          disciplines: contract.disciplines ?? "",
          areas: contract.areas ?? "",
          aiTone: contract.aiTone ?? "",
          reportBranding: contract.reportBranding ?? "",
        }
      : blank
  );

  const set = (k: keyof typeof blank, v: string) =>
    setForm((prev) => ({ ...prev, [k]: v }));

  const handleSave = async () => {
    try {
      let saved: Contract;
      if (contract) {
        const data = await apiFetch(`/api/contracts/${contract.id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...form, status: contract.status }),
        });
        saved = data.contract;
      } else {
        const data = await apiFetch("/api/contracts", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...form, status: "active" }),
        });
        saved = data.contract;
      }
      onSaved(saved);
      onToast("Contract saved.");
    } catch {
      onToast("Save failed — check your database connection.");
    }
  };

  const field = (
    label: string,
    key: keyof typeof blank,
    type: string = "text"
  ) => (
    <div className="form-field">
      <label>{label}</label>
      <input
        type={type}
        value={(form[key] as string) ?? ""}
        onChange={(e) => set(key, e.target.value)}
      />
    </div>
  );

  return (
    <div>
      <div className="top-bar">
        <div>
          <p className="eyebrow">Setup</p>
          <h1>{contract ? "Edit Contract" : "New Contract"}</h1>
        </div>
        <div className="top-actions">
          <button className="primary-button" onClick={handleSave}>
            Save Contract
          </button>
        </div>
      </div>

      <div className="panel">
        <div className="panel-header">
          <h2>Contract Details</h2>
        </div>
        <div className="setup-form">
          {field("Contract Name", "name")}
          {field("Contract Code", "code")}
          {field("Client", "client")}
          {field("Contractor", "contractor")}
          <div className="form-field">
            <label>NEC Option</label>
            <select
              value={form.necOption ?? ""}
              onChange={(e) => set("necOption", e.target.value)}
            >
              <option value="">Select…</option>
              <option>Option A</option>
              <option>Option B</option>
              <option>Option C</option>
              <option>Option D</option>
              <option>Option E</option>
              <option>Option F</option>
            </select>
          </div>
          {field("Reporting Period", "reportingPeriod")}
          {field("Starting Date", "startingDate", "date")}
          {field("Completion Date", "completionDate", "date")}
        </div>
      </div>

      <div className="panel">
        <div className="panel-header">
          <h2>Project Team</h2>
        </div>
        <div className="setup-form">
          {field("Project Manager", "projectManager")}
          {field("Contract Manager", "contractManager")}
          {field("Planner", "planner")}
          {field("Commercial Lead", "commercialLead")}
        </div>
      </div>

      <div className="panel">
        <div className="panel-header">
          <h2>Scope & Structure</h2>
        </div>
        <div className="setup-form">
          <div className="form-field">
            <label>Disciplines (comma separated)</label>
            <input
              type="text"
              value={form.disciplines ?? ""}
              onChange={(e) => set("disciplines", e.target.value)}
              placeholder="e.g. Civil, Mechanical, Electrical"
            />
          </div>
          <div className="form-field">
            <label>Areas (comma separated)</label>
            <input
              type="text"
              value={form.areas ?? ""}
              onChange={(e) => set("areas", e.target.value)}
              placeholder="e.g. Zone A, Zone B, Substation"
            />
          </div>
          <div className="form-field">
            <label>Report Branding</label>
            <input
              type="text"
              value={form.reportBranding ?? ""}
              onChange={(e) => set("reportBranding", e.target.value)}
            />
          </div>
          <div className="form-field">
            <label>AI Tone</label>
            <select
              value={form.aiTone ?? ""}
              onChange={(e) => set("aiTone", e.target.value)}
            >
              <option value="">Default</option>
              <option>Formal / NEC</option>
              <option>Clear and direct</option>
              <option>Technical</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Programmes ───────────────────────────────────────────────────────────────

function Programmes({ contract }: { contract: Contract | null }) {
  if (!contract) return <NeedContract />;
  return (
    <div>
      <div className="top-bar">
        <div>
          <p className="eyebrow">Programmes</p>
          <h1>Programme Uploads</h1>
          <p className="hero-copy">
            Upload Current, Previous, and Baseline XER files. Parsed activities are stored per
            contract and used across Planning, Comparison, and Reports.
          </p>
        </div>
      </div>
      <div className="source-grid">
        {(["CURRENT", "PREVIOUS", "BASELINE"] as const).map((type) => (
          <div key={type} className="source-tile">
            <span>{type}</span>
            <strong>{type === "CURRENT" ? "Live Programme" : type === "PREVIOUS" ? "Previous Submission" : "Baseline Programme"}</strong>
            <small>No file uploaded</small>
            <button className="upload-button">Upload XER File</button>
            <p style={{ fontSize: 12, color: "var(--muted)", margin: 0 }}>
              {type === "CURRENT" && "Used for planning board and activity updates."}
              {type === "PREVIOUS" && "Used for movement analysis between submissions."}
              {type === "BASELINE" && "Contractual baseline for slippage comparison."}
            </p>
          </div>
        ))}
      </div>
      <div className="panel">
        <div className="panel-header">
          <h2>Upload History</h2>
        </div>
        <div className="empty-panel">
          <strong>No uploads yet</strong>
          <span>Upload an XER file above to see parsed activities, WBS, and milestones here.</span>
        </div>
      </div>
    </div>
  );
}

// ─── Planning Workspace ───────────────────────────────────────────────────────

function PlanningWorkspace({
  contract,
  activities,
  onToast,
}: {
  contract: Contract | null;
  activities: LookaheadActivity[];
  onToast: (msg: string) => void;
}) {
  const [view, setView] = useState<"board" | "list">("board");
  const [filter, setFilter] = useState({ search: "", owner: "", status: "", area: "" });
  const [adding, setAdding] = useState(false);
  const [newRow, setNewRow] = useState({ activityCode: "", title: "", ownerName: "", area: "", startLabel: "", finishLabel: "" });

  if (!contract) return <NeedContract />;

  const filtered = activities.filter((a) => {
    if (filter.search && !a.title.toLowerCase().includes(filter.search.toLowerCase()) && !a.activityCode.toLowerCase().includes(filter.search.toLowerCase())) return false;
    if (filter.owner && a.ownerName !== filter.owner) return false;
    if (filter.status && a.status !== filter.status) return false;
    if (filter.area && a.area !== filter.area) return false;
    return true;
  });

  const owners = [...new Set(activities.map((a) => a.ownerName).filter(Boolean))] as string[];
  const areas = [...new Set(activities.map((a) => a.area).filter(Boolean))] as string[];

  const statuses = ["Planned", "In Progress", "Complete", "Blocked"];

  const handleAdd = async () => {
    if (!newRow.title) return;
    try {
      await apiFetch("/api/lookahead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...newRow, contractId: contract.id, status: "Planned", source: "Added" }),
      });
      setNewRow({ activityCode: "", title: "", ownerName: "", area: "", startLabel: "", finishLabel: "" });
      setAdding(false);
      onToast("Activity added.");
    } catch {
      onToast("Failed to add activity.");
    }
  };

  return (
    <div>
      <div className="top-bar">
        <div>
          <p className="eyebrow">Planning</p>
          <h1>Planning Workspace</h1>
        </div>
        <div className="top-actions">
          <div className="view-switch">
            <button className={view === "board" ? "active" : ""} onClick={() => setView("board")}>Board</button>
            <button className={view === "list" ? "active" : ""} onClick={() => setView("list")}>List</button>
          </div>
          <button className="primary-button" onClick={() => setAdding(!adding)}>+ Add Activity</button>
        </div>
      </div>

      <div className="panel" style={{ marginBottom: 14 }}>
        <div className="planning-filters">
          <input placeholder="Search activities…" value={filter.search} onChange={(e) => setFilter((f) => ({ ...f, search: e.target.value }))} />
          <select value={filter.owner} onChange={(e) => setFilter((f) => ({ ...f, owner: e.target.value }))}>
            <option value="">All owners</option>
            {owners.map((o) => <option key={o}>{o}</option>)}
          </select>
          <select value={filter.status} onChange={(e) => setFilter((f) => ({ ...f, status: e.target.value }))}>
            <option value="">All statuses</option>
            {statuses.map((s) => <option key={s}>{s}</option>)}
          </select>
          <select value={filter.area} onChange={(e) => setFilter((f) => ({ ...f, area: e.target.value }))}>
            <option value="">All areas</option>
            {areas.map((a) => <option key={a}>{a}</option>)}
          </select>
        </div>
      </div>

      {adding && (
        <div className="panel" style={{ marginBottom: 14 }}>
          <p className="eyebrow" style={{ marginBottom: 10 }}>New Activity</p>
          <div className="setup-form">
            <div className="form-field">
              <label>Activity Code</label>
              <input value={newRow.activityCode} onChange={(e) => setNewRow((r) => ({ ...r, activityCode: e.target.value }))} />
            </div>
            <div className="form-field">
              <label>Title</label>
              <input value={newRow.title} onChange={(e) => setNewRow((r) => ({ ...r, title: e.target.value }))} />
            </div>
            <div className="form-field">
              <label>Owner</label>
              <input value={newRow.ownerName} onChange={(e) => setNewRow((r) => ({ ...r, ownerName: e.target.value }))} />
            </div>
            <div className="form-field">
              <label>Area</label>
              <input value={newRow.area} onChange={(e) => setNewRow((r) => ({ ...r, area: e.target.value }))} />
            </div>
            <div className="form-field">
              <label>Start (label)</label>
              <input value={newRow.startLabel} onChange={(e) => setNewRow((r) => ({ ...r, startLabel: e.target.value }))} placeholder="e.g. Wk 24" />
            </div>
            <div className="form-field">
              <label>Finish (label)</label>
              <input value={newRow.finishLabel} onChange={(e) => setNewRow((r) => ({ ...r, finishLabel: e.target.value }))} placeholder="e.g. Wk 26" />
            </div>
          </div>
          <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
            <button className="primary-button" onClick={handleAdd}>Save Activity</button>
            <button className="ghost-button" onClick={() => setAdding(false)}>Cancel</button>
          </div>
        </div>
      )}

      {view === "board" ? (
        <div className="board-columns">
          {statuses.map((s) => {
            const cols = filtered.filter((a) => a.status === s);
            return (
              <div key={s} className="board-column">
                <div className="board-column-header">
                  <strong>{s}</strong>
                  <span className="status-pill">{cols.length}</span>
                </div>
                {cols.length === 0 && (
                  <div className="empty-panel compact-empty">
                    <span>No activities</span>
                  </div>
                )}
                {cols.map((a) => (
                  <div key={a.id} className={`activity-card ${a.status === "Complete" ? "complete" : a.status === "Blocked" ? "critical" : ""}`}>
                    <span>{a.activityCode}</span>
                    <strong>{a.title}</strong>
                    <small>{a.ownerName ?? "Unassigned"} {a.area ? `· ${a.area}` : ""}</small>
                    {(a.startLabel || a.finishLabel) && (
                      <small>{a.startLabel ?? ""} → {a.finishLabel ?? ""}</small>
                    )}
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      ) : (
        <div className="panel">
          <table className="activity-table">
            <thead>
              <tr>
                <th>Code</th>
                <th>Title</th>
                <th>Owner</th>
                <th>Area</th>
                <th>Start</th>
                <th>Finish</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={7} style={{ color: "var(--muted)", textAlign: "center", padding: 20 }}>
                    No activities match the current filters.
                  </td>
                </tr>
              )}
              {filtered.map((a) => (
                <tr key={a.id}>
                  <td>{a.activityCode}</td>
                  <td>{a.title}</td>
                  <td>{a.ownerName ?? "—"}</td>
                  <td>{a.area ?? "—"}</td>
                  <td>{a.startLabel ?? "—"}</td>
                  <td>{a.finishLabel ?? "—"}</td>
                  <td><span className={pillClass(a.status)}>{a.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

// ─── My Work ──────────────────────────────────────────────────────────────────

function MyWork({
  contract,
  commitments,
  handoffs,
  constraints,
  actions,
  onToast,
  onRefresh,
}: {
  contract: Contract | null;
  commitments: Commitment[];
  handoffs: Handoff[];
  constraints: Constraint[];
  actions: DailyAction[];
  onToast: (msg: string) => void;
  onRefresh: () => void;
}) {
  const [newCommitment, setNewCommitment] = useState({ title: "", ownerName: "", dueLabel: "", activityCode: "" });
  const [newHandoff, setNewHandoff] = useState({ title: "", fromOwner: "", toOwner: "", dueLabel: "", activityCode: "" });
  const [newAction, setNewAction] = useState({ title: "", ownerName: "", dueLabel: "" });
  const [newConstraint, setNewConstraint] = useState({ title: "", ownerName: "", type: "", dueLabel: "" });

  if (!contract) return <NeedContract />;

  const addCommitment = async () => {
    if (!newCommitment.title) return;
    await apiFetch("/api/commitments", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...newCommitment, contractId: contract.id }) });
    setNewCommitment({ title: "", ownerName: "", dueLabel: "", activityCode: "" });
    onRefresh();
    onToast("Commitment added.");
  };

  const addHandoff = async () => {
    if (!newHandoff.title) return;
    await apiFetch("/api/handoffs", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...newHandoff, contractId: contract.id }) });
    setNewHandoff({ title: "", fromOwner: "", toOwner: "", dueLabel: "", activityCode: "" });
    onRefresh();
    onToast("Handoff added.");
  };

  const addAction = async () => {
    if (!newAction.title) return;
    await apiFetch("/api/daily-actions", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...newAction, contractId: contract.id }) });
    setNewAction({ title: "", ownerName: "", dueLabel: "" });
    onRefresh();
    onToast("Action added.");
  };

  const addConstraint = async () => {
    if (!newConstraint.title) return;
    await apiFetch("/api/constraints", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...newConstraint, contractId: contract.id }) });
    setNewConstraint({ title: "", ownerName: "", type: "", dueLabel: "" });
    onRefresh();
    onToast("Constraint added.");
  };

  return (
    <div>
      <div className="top-bar">
        <div>
          <p className="eyebrow">Delivery</p>
          <h1>My Work</h1>
        </div>
      </div>

      <div className="my-work-grid">
        {/* Left column */}
        <div>
          {/* Commitments */}
          <div className="panel">
            <div className="panel-header">
              <h2>Commitments</h2>
              <span className="status-pill">{commitments.length}</span>
            </div>
            <div className="commitment-add-row">
              <input placeholder="Commitment title…" value={newCommitment.title} onChange={(e) => setNewCommitment((r) => ({ ...r, title: e.target.value }))} />
              <input placeholder="Owner" value={newCommitment.ownerName} onChange={(e) => setNewCommitment((r) => ({ ...r, ownerName: e.target.value }))} />
              <input placeholder="Due" value={newCommitment.dueLabel} onChange={(e) => setNewCommitment((r) => ({ ...r, dueLabel: e.target.value }))} />
              <input placeholder="Activity code" value={newCommitment.activityCode} onChange={(e) => setNewCommitment((r) => ({ ...r, activityCode: e.target.value }))} />
              <button className="primary-button compact" onClick={addCommitment}>Add</button>
            </div>
            <div className="commitment-list">
              {commitments.length === 0 && <div className="empty-panel compact-empty"><span>No commitments recorded.</span></div>}
              {commitments.map((c) => (
                <div key={c.id} className={`delivery-card ${c.status.toLowerCase()}`}>
                  <div>
                    <span>{c.activityCode ?? "—"} · {c.ownerName ?? "Unassigned"}</span>
                    <strong>{c.title}</strong>
                    {c.dueLabel && <small>Due: {c.dueLabel}</small>}
                  </div>
                  <div className="delivery-actions">
                    <span className={pillClass(c.status)}>{c.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Handoffs */}
          <div className="panel" style={{ marginTop: 14 }}>
            <div className="panel-header">
              <h2>Handoffs</h2>
              <span className="status-pill">{handoffs.length}</span>
            </div>
            <div className="handoff-add-row">
              <input placeholder="Handoff description…" value={newHandoff.title} onChange={(e) => setNewHandoff((r) => ({ ...r, title: e.target.value }))} />
              <input placeholder="From" value={newHandoff.fromOwner} onChange={(e) => setNewHandoff((r) => ({ ...r, fromOwner: e.target.value }))} />
              <input placeholder="To" value={newHandoff.toOwner} onChange={(e) => setNewHandoff((r) => ({ ...r, toOwner: e.target.value }))} />
              <input placeholder="Due" value={newHandoff.dueLabel} onChange={(e) => setNewHandoff((r) => ({ ...r, dueLabel: e.target.value }))} />
              <input placeholder="Activity code" value={newHandoff.activityCode} onChange={(e) => setNewHandoff((r) => ({ ...r, activityCode: e.target.value }))} />
              <button className="primary-button compact" onClick={addHandoff}>Add</button>
            </div>
            <div className="handoff-timeline">
              {handoffs.length === 0 && <div className="empty-panel compact-empty"><span>No handoffs recorded.</span></div>}
              {handoffs.map((h) => (
                <div key={h.id} className={`delivery-card ${h.status.toLowerCase()}`}>
                  <div>
                    <span>{h.fromOwner ?? "—"} → {h.toOwner ?? "—"}</span>
                    <strong>{h.title}</strong>
                    {h.dueLabel && <small>Due: {h.dueLabel}</small>}
                  </div>
                  <div className="delivery-actions">
                    <span className={pillClass(h.status)}>{h.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right column */}
        <div className="work-column">
          {/* Daily Actions */}
          <div className="column-heading">
            <strong>Daily Actions</strong>
            <span className="status-pill">{actions.length}</span>
          </div>
          <div style={{ display: "grid", gap: 6, marginTop: 10 }}>
            <input placeholder="New action…" value={newAction.title} onChange={(e) => setNewAction((r) => ({ ...r, title: e.target.value }))} style={{ minHeight: 32, border: "1px solid var(--border)", borderRadius: 6, padding: "0 8px", fontSize: 12 }} />
            <input placeholder="Owner" value={newAction.ownerName} onChange={(e) => setNewAction((r) => ({ ...r, ownerName: e.target.value }))} style={{ minHeight: 32, border: "1px solid var(--border)", borderRadius: 6, padding: "0 8px", fontSize: 12 }} />
            <input placeholder="Due" value={newAction.dueLabel} onChange={(e) => setNewAction((r) => ({ ...r, dueLabel: e.target.value }))} style={{ minHeight: 32, border: "1px solid var(--border)", borderRadius: 6, padding: "0 8px", fontSize: 12 }} />
            <button className="primary-button compact" onClick={addAction}>Add Action</button>
          </div>
          {actions.length === 0 && <div className="empty-panel compact-empty" style={{ marginTop: 10 }}><span>No actions recorded.</span></div>}
          {actions.map((a) => (
            <div key={a.id} className="mini-work-item" style={{ marginTop: 8, borderLeft: "4px solid var(--blue)", padding: 8, background: "white", borderRadius: 6 }}>
              <strong style={{ fontSize: 12, color: "var(--navy)" }}>{a.title}</strong>
              <span style={{ fontSize: 11, color: "var(--muted)" }}>{a.ownerName ?? "Unassigned"} · {a.dueLabel ?? "—"}</span>
              <span className={pillClass(a.status)}>{a.status}</span>
            </div>
          ))}

          {/* Constraints */}
          <div className="column-heading second">
            <strong>Constraints</strong>
            <span className="status-pill">{constraints.filter((c) => c.status === "Open").length} open</span>
          </div>
          <div style={{ display: "grid", gap: 6, marginTop: 10 }}>
            <input placeholder="Constraint description…" value={newConstraint.title} onChange={(e) => setNewConstraint((r) => ({ ...r, title: e.target.value }))} style={{ minHeight: 32, border: "1px solid var(--border)", borderRadius: 6, padding: "0 8px", fontSize: 12 }} />
            <input placeholder="Owner" value={newConstraint.ownerName} onChange={(e) => setNewConstraint((r) => ({ ...r, ownerName: e.target.value }))} style={{ minHeight: 32, border: "1px solid var(--border)", borderRadius: 6, padding: "0 8px", fontSize: 12 }} />
            <input placeholder="Type" value={newConstraint.type} onChange={(e) => setNewConstraint((r) => ({ ...r, type: e.target.value }))} style={{ minHeight: 32, border: "1px solid var(--border)", borderRadius: 6, padding: "0 8px", fontSize: 12 }} />
            <button className="primary-button compact" onClick={addConstraint}>Add Constraint</button>
          </div>
          {constraints.length === 0 && <div className="empty-panel compact-empty" style={{ marginTop: 10 }}><span>No constraints recorded.</span></div>}
          {constraints.map((c) => (
            <div key={c.id} className="mini-work-item" style={{ marginTop: 8, borderLeft: `4px solid ${c.status === "Open" ? "var(--amber)" : "var(--green)"}`, padding: 8, background: "white", borderRadius: 6 }}>
              <strong style={{ fontSize: 12, color: "var(--navy)" }}>{c.title}</strong>
              <span style={{ fontSize: 11, color: "var(--muted)" }}>{c.ownerName ?? "Unassigned"} {c.type ? `· ${c.type}` : ""}</span>
              <span className={pillClass(c.status)}>{c.status}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Commercial Control ───────────────────────────────────────────────────────

function CommercialControl({
  contract,
  records,
  onToast,
  onRefresh,
}: {
  contract: Contract | null;
  records: CommercialRecord[];
  onToast: (msg: string) => void;
  onRefresh: () => void;
}) {
  const [newRec, setNewRec] = useState({ recordType: "EWN", reference: "", title: "", ownerName: "", status: "Draft", dueLabel: "" });

  if (!contract) return <NeedContract />;

  const add = async () => {
    if (!newRec.title || !newRec.reference) return;
    await apiFetch("/api/commercial", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...newRec, contractId: contract.id }) });
    setNewRec({ recordType: "EWN", reference: "", title: "", ownerName: "", status: "Draft", dueLabel: "" });
    onRefresh();
    onToast("Record added.");
  };

  const types = ["EWN", "CE", "PMI", "Clause 32", "Other"];

  return (
    <div>
      <div className="top-bar">
        <div>
          <p className="eyebrow">Commercial</p>
          <h1>Commercial Control Register</h1>
        </div>
      </div>

      <div className="kpi-row">
        {types.slice(0, 4).map((t) => {
          const count = records.filter((r) => r.recordType === t).length;
          return (
            <div key={t} className="kpi-card">
              <span>{count}</span>
              <strong>{t}</strong>
              <small>{count === 0 ? "None recorded" : `${count} record${count !== 1 ? "s" : ""}`}</small>
            </div>
          );
        })}
      </div>

      <div className="panel">
        <div className="panel-header"><h2>Add Record</h2></div>
        <div className="commercial-add-row">
          <select value={newRec.recordType} onChange={(e) => setNewRec((r) => ({ ...r, recordType: e.target.value }))}>
            {types.map((t) => <option key={t}>{t}</option>)}
          </select>
          <input placeholder="Reference" value={newRec.reference} onChange={(e) => setNewRec((r) => ({ ...r, reference: e.target.value }))} />
          <input placeholder="Title / Description" value={newRec.title} onChange={(e) => setNewRec((r) => ({ ...r, title: e.target.value }))} />
          <input placeholder="Owner" value={newRec.ownerName} onChange={(e) => setNewRec((r) => ({ ...r, ownerName: e.target.value }))} />
          <select value={newRec.status} onChange={(e) => setNewRec((r) => ({ ...r, status: e.target.value }))}>
            {["Draft", "Submitted", "Accepted", "Rejected", "Under Review"].map((s) => <option key={s}>{s}</option>)}
          </select>
          <input placeholder="Due date / period" value={newRec.dueLabel} onChange={(e) => setNewRec((r) => ({ ...r, dueLabel: e.target.value }))} />
          <button className="primary-button compact" onClick={add}>Add</button>
        </div>
      </div>

      <div className="panel">
        <div className="panel-header"><h2>Register</h2></div>
        <div className="commercial-list">
          {records.length === 0 && <div className="empty-panel"><strong>No commercial records yet</strong><span>Use the form above to add EWNs, CEs, PMIs, and Clause 32 records.</span></div>}
          {records.map((r) => (
            <div key={r.id} className={`commercial-card ${r.recordType.toLowerCase().replace(" ", "-")}`}>
              <div>
                <span>{r.recordType} · {r.reference}</span>
                <strong>{r.title}</strong>
                <small>{r.ownerName ?? "—"} {r.dueLabel ? `· Due: ${r.dueLabel}` : ""}</small>
              </div>
              <span className={pillClass(r.status)}>{r.status}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Reports ──────────────────────────────────────────────────────────────────

function Reports({ contract }: { contract: Contract | null }) {
  if (!contract) return <NeedContract />;

  const reportTypes = [
    { title: "Planning Workspace Report", desc: "Board snapshot, activities, owners, and status." },
    { title: "Clause 32 Narrative", desc: "NEC programme narrative with AI assistance." },
    { title: "Schedule Integrity Report", desc: "Logic, float, and constraint checks." },
    { title: "Baseline Comparison", desc: "Key date movement and slippage by activity." },
    { title: "Weekly Look-Ahead", desc: "3–6 week look-ahead for site and PM review." },
    { title: "Blocker & Ownership Report", desc: "Outstanding blockers, constraints, and gaps." },
  ];

  return (
    <div>
      <div className="top-bar">
        <div>
          <p className="eyebrow">Reports</p>
          <h1>Report Builder</h1>
          <p className="hero-copy">Select reports to generate for {contract.name}. Reports are built from stored contract data.</p>
        </div>
        <div className="top-actions">
          <button className="primary-button">Generate Selected</button>
        </div>
      </div>

      <div className="module-grid report-grid">
        {reportTypes.map((r) => (
          <div key={r.title} className="module-card report-card selectable">
            <input type="checkbox" />
            <strong>{r.title}</strong>
            <small>{r.desc}</small>
          </div>
        ))}
      </div>

      <div className="panel">
        <div className="panel-header"><h2>Report History</h2></div>
        <div className="empty-panel"><strong>No reports generated yet</strong><span>Generated reports will appear here with download links.</span></div>
      </div>
    </div>
  );
}

// ─── Helper component ─────────────────────────────────────────────────────────

function NeedContract() {
  return (
    <div className="panel">
      <div className="empty-panel">
        <strong>No contract selected</strong>
        <span>Select a contract from the strip above, or create one in Contract Setup.</span>
      </div>
    </div>
  );
}

// ─── Root App ─────────────────────────────────────────────────────────────────

export function ControlHubApp() {
  const [module, setModule] = useState("dashboard");
  const [contracts, setContracts] = useState<Contract[]>([]);
  const [selectedContract, setSelectedContract] = useState<Contract | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  // Per-contract data
  const [commitments, setCommitments] = useState<Commitment[]>([]);
  const [handoffs, setHandoffs] = useState<Handoff[]>([]);
  const [constraints, setConstraints] = useState<Constraint[]>([]);
  const [actions, setActions] = useState<DailyAction[]>([]);
  const [commercial, setCommercial] = useState<CommercialRecord[]>([]);
  const [lookahead, setLookahead] = useState<LookaheadActivity[]>([]);
  const [auditEvents, setAuditEvents] = useState<AuditEvent[]>([]);

  const showToast = (msg: string) => setToast(msg);

  // Load contracts on mount
  useEffect(() => {
    apiFetch("/api/contracts")
      .then((d) => {
        setContracts(d.contracts);
        if (d.contracts.length > 0) setSelectedContract(d.contracts[0]);
      })
      .catch(() => {
        // DB not yet connected — graceful degradation
      });
  }, []);

  // Load per-contract data when contract changes
  const loadContractData = useCallback(async (c: Contract) => {
    const id = c.id;
    const qs = `?contractId=${id}`;
    try {
      const [cm, hf, cn, ac, comm, la, ae] = await Promise.all([
        apiFetch(`/api/commitments${qs}`),
        apiFetch(`/api/handoffs${qs}`),
        apiFetch(`/api/constraints${qs}`),
        apiFetch(`/api/daily-actions${qs}`),
        apiFetch(`/api/commercial${qs}`),
        apiFetch(`/api/lookahead${qs}`),
        apiFetch(`/api/audit${qs}`),
      ]);
      setCommitments(cm.commitments ?? []);
      setHandoffs(hf.handoffs ?? []);
      setConstraints(cn.constraints ?? []);
      setActions(ac.actions ?? []);
      setCommercial(comm.commercialRecords ?? []);
      setLookahead(la.activities ?? []);
      setAuditEvents(ae.events ?? []);
    } catch {
      // DB not yet connected
    }
  }, []);

  useEffect(() => {
    if (selectedContract) loadContractData(selectedContract);
  }, [selectedContract, loadContractData]);

  const handleContractSaved = (c: Contract) => {
    setContracts((prev) => {
      const exists = prev.find((x) => x.id === c.id);
      return exists ? prev.map((x) => (x.id === c.id ? c : x)) : [c, ...prev];
    });
    setSelectedContract(c);
    setModule("dashboard");
  };

  const refresh = () => {
    if (selectedContract) loadContractData(selectedContract);
  };

  return (
    <div className="app-shell">
      {/* Sidebar */}
      <nav className="side-nav">
        <div>
          <div className="brand-lockup">
            <div className="brand-card">
              <span>CCH</span>
            </div>
            <div>
              <strong>Contract Control Hub</strong>
              <small>Programme · Planning · NEC</small>
            </div>
          </div>
        </div>

        <nav className="main-nav">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              className={module === item.id ? "active" : ""}
              onClick={() => setModule(item.id)}
            >
              {item.label}
            </button>
          ))}
        </nav>

        <div className="side-footer">
          <span>Active Contract</span>
          <strong>{selectedContract?.code ?? "—"}</strong>
          <small>{selectedContract?.name ?? "No contract selected"}</small>
        </div>
      </nav>

      {/* Main workspace */}
      <main className="workspace">
        <ContractStrip
          contracts={contracts}
          selected={selectedContract}
          onSelect={(c) => setSelectedContract(c)}
          onNew={() => {
            setSelectedContract(null);
            setModule("setup");
          }}
        />

        {module === "dashboard" && (
          <Dashboard
            contract={selectedContract}
            commitments={commitments}
            constraints={constraints}
            actions={actions}
            commercial={commercial}
          />
        )}
        {module === "setup" && (
          <ContractSetup
            contract={selectedContract}
            onSaved={handleContractSaved}
            onToast={showToast}
          />
        )}
        {module === "programmes" && <Programmes contract={selectedContract} />}
        {module === "planning" && (
          <PlanningWorkspace
            contract={selectedContract}
            activities={lookahead}
            onToast={showToast}
          />
        )}
        {module === "mywork" && (
          <MyWork
            contract={selectedContract}
            commitments={commitments}
            handoffs={handoffs}
            constraints={constraints}
            actions={actions}
            onToast={showToast}
            onRefresh={refresh}
          />
        )}
        {module === "commercial" && (
          <CommercialControl
            contract={selectedContract}
            records={commercial}
            onToast={showToast}
            onRefresh={refresh}
          />
        )}
        {module === "reports" && <Reports contract={selectedContract} />}
      </main>

      {toast && <Toast msg={toast} onDone={() => setToast(null)} />}
    </div>
  );
}
