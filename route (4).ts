:root {
  --black: #000000;
  --white: #ffffff;
  --navy: #1a2d4e;
  --navy-2: #10213a;
  --blue: #2e7bbf;
  --blue-2: #006ba6;
  --light-blue: #00b5e2;
  --paper: #f4f6f9;
  --surface: #ffffff;
  --surface-2: #eaf2f8;
  --text: #333333;
  --muted: #6d7f98;
  --border: #d8e4f1;
  --green: #2e7d32;
  --red: #c62828;
  --amber: #f57c00;
  --shadow: 0 18px 50px rgba(26, 45, 78, 0.12);
}

* {
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

body {
  margin: 0;
  color: var(--text);
  background: var(--paper);
  font-family: Arial, Helvetica, sans-serif;
}

button,
input {
  font: inherit;
}

.app-shell {
  min-height: 100vh;
  display: grid;
  grid-template-columns: 284px minmax(0, 1fr);
  background:
    linear-gradient(90deg, rgba(26, 45, 78, 0.04), transparent 32%),
    var(--paper);
}

.side-nav {
  position: sticky;
  top: 0;
  height: 100vh;
  display: grid;
  grid-template-rows: auto 1fr auto;
  gap: 28px;
  padding: 24px 18px;
  background: var(--navy-2);
  color: var(--white);
  border-right: 4px solid var(--light-blue);
}

.brand-lockup {
  display: flex;
  gap: 14px;
  align-items: center;
  padding-bottom: 22px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.16);
}

.brand-card {
  width: 58px;
  min-width: 58px;
  height: 48px;
  display: grid;
  place-items: center;
  align-content: center;
  background: var(--white);
  color: var(--navy);
  line-height: 1;
  text-transform: lowercase;
}

.brand-card img {
  width: 48px;
  height: auto;
  display: block;
}

.brand-card span {
  font-size: 10px;
  font-weight: 700;
}

.brand-card strong {
  font-size: 8px;
  letter-spacing: 0;
}

.brand-lockup > div:last-child strong,
.brand-lockup > div:last-child small {
  display: block;
}

.brand-lockup > div:last-child strong {
  font-size: 15px;
  line-height: 1.25;
}

.brand-lockup > div:last-child small {
  margin-top: 5px;
  color: rgba(255, 255, 255, 0.68);
  font-size: 12px;
  line-height: 1.4;
}

.main-nav {
  display: grid;
  gap: 6px;
  align-content: start;
}

.main-nav button {
  display: block;
  width: 100%;
  border: 0;
  border-left: 3px solid transparent;
  padding: 11px 12px;
  color: rgba(255, 255, 255, 0.72);
  background: transparent;
  text-decoration: none;
  text-align: left;
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;
}

.main-nav button:hover,
.main-nav button.active {
  color: var(--white);
  background: rgba(255, 255, 255, 0.08);
  border-left-color: var(--light-blue);
}

.side-footer {
  border: 1px solid rgba(255, 255, 255, 0.16);
  padding: 14px;
  background: rgba(255, 255, 255, 0.06);
}

.side-footer span,
.side-footer strong,
.side-footer small {
  display: block;
}

.side-footer span {
  color: rgba(255, 255, 255, 0.62);
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.side-footer strong {
  margin-top: 8px;
  font-size: 14px;
}

.side-footer small {
  margin-top: 4px;
  color: rgba(255, 255, 255, 0.7);
}

.workspace {
  min-width: 0;
  padding: 26px;
}

.top-bar {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 24px;
  margin-bottom: 18px;
}

.eyebrow,
.mini-label {
  margin: 0;
  color: var(--blue);
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 0.09em;
  text-transform: uppercase;
}

h1,
h2,
p {
  margin-top: 0;
}

h1 {
  max-width: 920px;
  margin-bottom: 9px;
  color: var(--navy);
  font-size: clamp(30px, 3vw, 44px);
  font-weight: 400;
  line-height: 1.08;
}

h2 {
  margin: 5px 0 0;
  color: var(--navy);
  font-size: 17px;
  line-height: 1.25;
}

.hero-copy {
  max-width: 860px;
  color: var(--muted);
  font-size: 15px;
  line-height: 1.55;
}

.hero-logo {
  display: block;
  width: 132px;
  height: auto;
  margin: 4px 0 14px;
}

.top-actions,
.contract-meta,
.segmented,
.metric-tags,
.view-switch,
.plan-toolbar,
.date-navigator {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
}

.primary-button,
.ghost-button,
.icon-button,
.segmented button,
.view-switch button,
.date-navigator button,
.stepper button,
.upload-button,
.text-button {
  min-height: 36px;
  border-radius: 6px;
  border: 1px solid var(--border);
  padding: 0 14px;
  color: var(--navy);
  background: var(--white);
  font-size: 12px;
  font-weight: 800;
  cursor: pointer;
}

.primary-button {
  border-color: var(--blue);
  background: var(--blue);
  color: var(--white);
  box-shadow: 0 10px 22px rgba(46, 123, 191, 0.2);
}

.ghost-button:hover,
.icon-button:hover,
.segmented button:hover,
.view-switch button:hover,
.stepper button:hover,
.upload-button:hover {
  border-color: var(--blue);
  color: var(--blue);
}

.compact {
  min-height: 32px;
}

.contract-strip {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 18px;
  margin-bottom: 16px;
  padding: 15px 18px;
  border: 1px solid var(--border);
  border-left: 5px solid var(--light-blue);
  background: var(--surface);
  box-shadow: 0 8px 26px rgba(26, 45, 78, 0.08);
}

.contract-picker {
  display: grid;
  gap: 7px;
  min-width: min(520px, 100%);
}

.contract-picker select {
  min-height: 40px;
  border: 1px solid var(--border);
  border-radius: 6px;
  padding: 0 12px;
  color: var(--navy);
  background: var(--white);
  font-size: 14px;
  font-weight: 800;
}

.contract-strip strong,
.contract-strip small {
  display: block;
}

.contract-strip strong {
  margin-top: 4px;
  color: var(--navy);
  font-size: 18px;
}

.contract-strip small {
  margin-top: 4px;
  color: var(--muted);
}

.contract-meta span,
.status-pill {
  display: inline-flex;
  align-items: center;
  min-height: 25px;
  border: 1px solid var(--border);
  border-radius: 999px;
  padding: 4px 10px;
  background: var(--white);
  color: var(--muted);
  font-size: 11px;
  font-weight: 800;
  text-transform: uppercase;
}

.status-pill.green {
  border-color: rgba(46, 125, 50, 0.24);
  color: var(--green);
  background: rgba(46, 125, 50, 0.08);
}

.status-pill.blue {
  border-color: rgba(46, 123, 191, 0.26);
  color: var(--blue);
  background: rgba(46, 123, 191, 0.08);
}

.status-pill.amber {
  border-color: rgba(245, 124, 0, 0.28);
  color: var(--amber);
  background: rgba(245, 124, 0, 0.08);
}

.status-pill.red {
  border-color: rgba(198, 40, 40, 0.28);
  color: var(--red);
  background: rgba(198, 40, 40, 0.08);
}

.kpi-row {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 14px;
  margin-bottom: 16px;
}

.kpi-card,
.panel,
.module-card {
  border: 1px solid var(--border);
  border-radius: 8px;
  background: var(--surface);
  box-shadow: var(--shadow);
}

.kpi-card {
  min-height: 122px;
  padding: 18px;
  border-top: 4px solid var(--blue);
}

.kpi-card span,
.kpi-card strong,
.kpi-card small {
  display: block;
}

.kpi-card span {
  color: var(--navy);
  font-size: 32px;
  font-weight: 800;
  line-height: 1;
}

.kpi-card strong {
  margin-top: 13px;
  color: var(--navy);
  font-size: 12px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.kpi-card small {
  margin-top: 8px;
  color: var(--muted);
}

.module-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 14px;
  margin-bottom: 16px;
}

.module-card {
  min-height: 245px;
  display: grid;
  align-content: start;
  gap: 15px;
  padding: 18px;
  border-top: 4px solid var(--light-blue);
}

.module-card-top,
.panel-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 14px;
}

.module-card p {
  margin-bottom: 0;
  color: var(--muted);
  font-size: 13px;
  line-height: 1.55;
}

.metric-tags small {
  border: 1px solid var(--border);
  border-radius: 999px;
  padding: 6px 9px;
  color: var(--navy);
  background: var(--surface-2);
  font-size: 11px;
  font-weight: 800;
}

.command-panel {
  margin-bottom: 16px;
  border-top: 4px solid var(--navy);
}

.command-actions {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  justify-content: flex-end;
  gap: 8px;
}

.command-grid {
  display: grid;
  grid-template-columns: repeat(6, minmax(0, 1fr));
  gap: 10px;
  margin-top: 16px;
}

.panel {
  padding: 18px;
  margin-bottom: 16px;
}

.panel-header {
  margin-bottom: 14px;
  padding-bottom: 12px;
  border-bottom: 1px solid var(--border);
}

.two-column {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 14px;
  margin-bottom: 16px;
}

.setup-form {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 14px;
}

.form-field {
  display: grid;
  gap: 6px;
}

.form-field label {
  color: var(--navy);
  font-size: 12px;
  font-weight: 800;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

.form-field input,
.form-field select,
.form-field textarea {
  min-height: 38px;
  border: 1px solid var(--border);
  border-radius: 6px;
  padding: 0 12px;
  color: var(--text);
  background: var(--white);
  font-size: 13px;
}

.form-field textarea {
  padding: 10px 12px;
  resize: vertical;
}

.form-field input:focus,
.form-field select:focus,
.form-field textarea:focus {
  outline: none;
  border-color: var(--blue);
}

.source-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 14px;
  margin-bottom: 16px;
}

.source-tile {
  display: grid;
  gap: 12px;
  align-content: start;
  min-height: 200px;
  padding: 18px;
  border: 1px solid var(--border);
  border-top: 4px solid var(--border);
  border-radius: 8px;
  background: var(--surface);
  box-shadow: var(--shadow);
}

.source-tile.loaded {
  border-top-color: var(--green);
}

.source-tile.current {
  border-top-color: var(--blue);
}

.source-tile span,
.source-tile strong,
.source-tile small {
  display: block;
}

.source-tile span {
  color: var(--blue);
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.source-tile strong {
  color: var(--navy);
  font-size: 15px;
}

.source-tile small {
  color: var(--muted);
  font-size: 12px;
}

.upload-button {
  width: 100%;
  border-style: dashed;
}

.planning-layout {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 300px;
  gap: 14px;
  margin-bottom: 16px;
}

.plan-toolbar {
  justify-content: space-between;
  margin-bottom: 14px;
}

.planning-filters {
  display: grid;
  grid-template-columns: 1fr repeat(3, auto);
  gap: 8px;
  align-items: center;
}

.planning-filters input,
.planning-filters select {
  min-height: 36px;
  border: 1px solid var(--border);
  border-radius: 6px;
  padding: 0 10px;
  font-size: 12px;
}

.board-columns {
  display: grid;
  grid-auto-columns: minmax(180px, 1fr);
  grid-auto-flow: column;
  gap: 10px;
  overflow-x: auto;
  padding-bottom: 8px;
}

.board-column {
  display: grid;
  align-content: start;
  gap: 8px;
  min-height: 340px;
  padding: 12px;
  border: 1px solid var(--border);
  border-radius: 8px;
  background: #f0f6fb;
}

.board-column-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  padding-bottom: 10px;
  border-bottom: 1px solid var(--border);
}

.board-column-header strong {
  color: var(--navy);
  font-size: 12px;
}

.activity-card {
  border: 1px solid var(--border);
  border-left: 4px solid var(--blue);
  border-radius: 6px;
  padding: 10px;
  background: var(--white);
  cursor: grab;
}

.activity-card.critical {
  border-left-color: var(--red);
}

.activity-card.complete {
  border-left-color: var(--green);
  opacity: 0.72;
}

.activity-card span,
.activity-card strong,
.activity-card small {
  display: block;
}

.activity-card span {
  color: var(--blue);
  font-size: 10px;
  font-weight: 800;
}

.activity-card strong {
  margin-top: 4px;
  color: var(--navy);
  font-size: 12px;
  line-height: 1.35;
}

.activity-card small {
  margin-top: 5px;
  color: var(--muted);
  font-size: 11px;
}

.side-panel {
  display: grid;
  gap: 12px;
  align-content: start;
}

.side-panel-card {
  border: 1px solid var(--border);
  border-radius: 8px;
  padding: 14px;
  background: var(--surface);
}

.adherence-panel {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 14px;
  margin-bottom: 14px;
}

.adherence-metrics {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 12px;
}

.metric-badge {
  display: grid;
  gap: 4px;
  min-width: 90px;
  padding: 10px 12px;
  border: 1px solid var(--border);
  border-radius: 8px;
  background: var(--white);
}

.metric-badge span {
  color: var(--navy);
  font-size: 22px;
  font-weight: 800;
}

.metric-badge small {
  color: var(--muted);
  font-size: 11px;
}

.bulk-actions {
  display: grid;
  grid-template-columns: 1fr repeat(3, auto);
  gap: 8px;
  align-items: center;
  margin-bottom: 12px;
}

.activity-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 12px;
}

.activity-table th {
  padding: 8px 10px;
  text-align: left;
  color: var(--navy);
  background: var(--surface-2);
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  border-bottom: 1px solid var(--border);
}

.activity-table td {
  padding: 9px 10px;
  border-bottom: 1px solid var(--border);
  vertical-align: middle;
}

.activity-table tr:hover td {
  background: #f8fbfe;
}

.activity-table select,
.activity-table input[type="text"] {
  min-height: 30px;
  border: 1px solid var(--border);
  border-radius: 4px;
  padding: 0 8px;
  font-size: 12px;
  color: var(--text);
  background: var(--white);
}

.priority-layout {
  display: grid;
  grid-template-columns: minmax(0, 1.4fr) minmax(0, 0.6fr);
  gap: 14px;
  margin-bottom: 16px;
}

.priority-item {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 12px;
  border-bottom: 1px solid var(--border);
}

.priority-item:last-child {
  border-bottom: 0;
}

.priority-number {
  min-width: 28px;
  height: 28px;
  display: grid;
  place-items: center;
  border-radius: 50%;
  background: var(--navy);
  color: var(--white);
  font-size: 12px;
  font-weight: 900;
}

.priority-detail {
  flex: 1;
}

.priority-detail strong {
  display: block;
  color: var(--navy);
  font-size: 13px;
}

.priority-detail span {
  display: block;
  margin-top: 4px;
  color: var(--muted);
  font-size: 12px;
}

.constraint-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 14px;
  margin-bottom: 16px;
}

.constraint-card {
  border: 1px solid var(--border);
  border-left: 4px solid var(--amber);
  border-radius: 8px;
  padding: 14px;
  background: var(--surface);
}

.constraint-card.closed {
  border-left-color: var(--green);
  opacity: 0.7;
}

.area-map {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 12px;
  margin-bottom: 16px;
}

.area-tile {
  min-height: 120px;
  padding: 14px;
  border: 1px solid var(--border);
  border-radius: 8px;
  background: var(--surface);
}

.people-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 12px;
  margin-bottom: 16px;
}

.person-card {
  display: grid;
  gap: 8px;
  padding: 14px;
  border: 1px solid var(--border);
  border-radius: 8px;
  background: var(--surface);
}

.person-card strong {
  color: var(--navy);
  font-size: 14px;
}

.person-card span {
  color: var(--muted);
  font-size: 12px;
}

.my-work-toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 14px;
}

.work-summary {
  display: flex;
  gap: 14px;
  padding: 12px 14px;
  border: 1px solid var(--border);
  border-radius: 8px;
  background: var(--white);
  font-size: 12px;
  font-weight: 800;
}

.work-summary strong {
  color: var(--navy);
}

.my-work-grid {
  display: grid;
  grid-template-columns: minmax(0, 1.4fr) minmax(330px, 0.6fr);
  gap: 14px;
  margin-top: 14px;
}

.work-column {
  border: 1px solid var(--border);
  border-radius: 8px;
  padding: 14px;
  background: #eef7fc;
}

.work-column.large {
  background: #f8fbfe;
}

.column-heading {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  padding-bottom: 12px;
  border-bottom: 1px solid var(--border);
}

.column-heading strong {
  color: var(--navy);
  font-size: 13px;
}

.column-heading.second {
  margin-top: 18px;
}

.work-card,
.mini-work-item,
.delivery-card {
  border: 1px solid var(--border);
  border-left: 4px solid var(--blue);
  border-radius: 8px;
  padding: 12px;
  background: var(--white);
  box-shadow: 0 8px 20px rgba(26, 45, 78, 0.06);
}

.work-card {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  gap: 12px;
  margin-top: 10px;
}

.work-card.blocked,
.delivery-card.missed,
.delivery-card.blocked {
  border-left-color: var(--red);
}

.work-card.at-risk,
.work-card.critical,
.delivery-card.promised,
.delivery-card.pending {
  border-left-color: var(--amber);
}

.work-card.complete,
.delivery-card.met,
.delivery-card.accepted,
.delivery-card.complete {
  border-left-color: var(--green);
}

.work-card span,
.work-card strong,
.work-card small,
.work-card-status span,
.work-card-status em,
.mini-work-item strong,
.mini-work-item span,
.delivery-card strong,
.delivery-card span,
.delivery-card small {
  display: block;
}

.work-card span,
.mini-work-item span,
.delivery-card span {
  color: var(--muted);
  font-size: 11px;
}

.work-card strong,
.mini-work-item strong,
.delivery-card strong {
  margin-top: 5px;
  color: var(--navy);
  font-size: 13px;
  line-height: 1.35;
}

.work-card small {
  margin-top: 7px;
  color: var(--muted);
  font-size: 11px;
}

.work-card-status {
  min-width: 132px;
  text-align: right;
}

.work-card-status span {
  color: var(--navy);
  font-size: 12px;
  font-weight: 900;
}

.work-card-status em {
  margin-top: 6px;
  color: var(--blue);
  font-size: 11px;
  font-style: normal;
  font-weight: 800;
}

.work-card-actions {
  grid-column: 1 / -1;
}

.mini-work-item {
  display: grid;
  gap: 7px;
  margin-top: 10px;
}

.blocker-item {
  border-left-color: var(--red);
}

.empty-panel {
  display: grid;
  gap: 7px;
  margin-top: 10px;
  border: 1px dashed var(--border);
  border-radius: 8px;
  padding: 16px;
  color: var(--muted);
  background: rgba(255, 255, 255, 0.65);
}

.empty-panel strong {
  color: var(--navy);
  font-size: 13px;
}

.empty-panel span {
  font-size: 12px;
}

.compact-empty {
  padding: 12px;
}

.commitment-add-row,
.handoff-add-row {
  display: grid;
  gap: 8px;
  margin-top: 16px;
  border: 1px solid var(--border);
  border-radius: 8px;
  padding: 12px;
  background: #f8fbfe;
}

.commitment-add-row {
  grid-template-columns: minmax(180px, 1.5fr) minmax(120px, 0.9fr) minmax(90px, 0.7fr) minmax(120px, 0.9fr) auto;
}

.handoff-add-row {
  grid-template-columns: minmax(180px, 1.4fr) repeat(4, minmax(105px, 0.9fr)) auto;
}

.commitment-list,
.handoff-timeline {
  display: grid;
  gap: 10px;
  margin-top: 14px;
}

.delivery-card {
  display: flex;
  justify-content: space-between;
  gap: 12px;
}

.delivery-actions {
  justify-content: flex-end;
}

.delivery-actions small {
  border-radius: 999px;
  padding: 6px 9px;
  color: var(--navy);
  background: var(--surface-2);
  font-weight: 900;
}

.audit-trail {
  margin-top: 18px;
  padding-top: 16px;
  border-top: 1px solid var(--border);
}

.compact-header {
  padding-bottom: 12px;
}

.panel-subsection {
  margin-top: 18px;
  padding-top: 16px;
  border-top: 1px solid var(--border);
}

.panel-subsection h3 {
  margin: 0;
  color: var(--navy);
  font-size: 14px;
}

.register-grid {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.register-tile {
  min-height: 84px;
}

.register-tile span {
  margin-top: 10px;
  color: var(--muted);
  font-size: 12px;
}

.commercial-add-row {
  display: grid;
  grid-template-columns: minmax(90px, 0.6fr) minmax(100px, 0.7fr) minmax(180px, 1.4fr) repeat(3, minmax(110px, 0.8fr)) auto;
  gap: 8px;
  margin-top: 14px;
  border: 1px solid var(--border);
  border-radius: 8px;
  padding: 12px;
  background: #f8fbfe;
  overflow-x: auto;
}

.commercial-list {
  display: grid;
  gap: 10px;
  margin-top: 14px;
}

.commercial-card {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  border: 1px solid var(--border);
  border-left: 4px solid var(--blue);
  border-radius: 8px;
  padding: 12px;
  background: var(--white);
}

.commercial-card.ewn {
  border-left-color: var(--amber);
}

.commercial-card.ce {
  border-left-color: var(--red);
}

.commercial-card.clause-32 {
  border-left-color: var(--green);
}

.commercial-card span,
.commercial-card strong,
.commercial-card small {
  display: block;
}

.commercial-card span {
  color: var(--blue);
  font-size: 11px;
  font-weight: 900;
}

.commercial-card strong {
  margin-top: 6px;
  color: var(--navy);
  font-size: 13px;
}

.commercial-card small {
  margin-top: 6px;
  color: var(--muted);
  font-size: 11px;
}

.discussion-list {
  display: grid;
  gap: 12px;
  margin-top: 16px;
}

.discussion-list article {
  border-left: 4px solid var(--light-blue);
  padding-left: 12px;
}

.discussion-list strong {
  color: var(--navy);
  font-size: 13px;
}

.discussion-list p {
  margin: 6px 0 0;
  color: var(--muted);
  font-size: 12px;
  line-height: 1.45;
}

.report-grid {
  grid-template-columns: repeat(6, minmax(0, 1fr));
}

.report-card {
  min-height: 110px;
  border-top: 4px solid var(--blue);
}

.report-card.selectable {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 8px 10px;
  align-content: start;
  cursor: pointer;
}

.report-card.selectable input {
  width: 16px;
  height: 16px;
  margin: 2px 0 0;
  accent-color: var(--blue);
}

.report-card strong {
  line-height: 1.35;
}

.report-card.selectable small {
  grid-column: 2;
}

.build-status {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.build-status div {
  min-height: 96px;
}

.toast {
  position: fixed;
  right: 22px;
  bottom: 22px;
  z-index: 50;
  max-width: min(420px, calc(100vw - 44px));
  border-left: 5px solid var(--light-blue);
  border-radius: 8px;
  padding: 13px 16px;
  color: var(--navy);
  background: var(--white);
  box-shadow: 0 16px 40px rgba(26, 45, 78, 0.18);
  font-size: 13px;
  font-weight: 800;
}

@media (max-width: 1320px) {
  .module-grid,
  .report-grid,
  .command-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 980px) {
  .app-shell {
    grid-template-columns: 1fr;
  }

  .side-nav {
    position: static;
    height: auto;
  }

  .main-nav {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .top-bar,
  .contract-strip {
    flex-direction: column;
  }

  .kpi-row,
  .module-grid,
  .two-column,
  .planning-layout,
  .my-work-grid,
  .priority-layout,
  .source-grid,
  .report-grid,
  .register-grid,
  .build-status,
  .people-grid,
  .constraint-grid,
  .area-map,
  .setup-form,
  .planning-filters,
  .adherence-panel,
  .bulk-actions,
  .commercial-add-row,
  .stepper {
    grid-template-columns: 1fr;
  }

  .workspace {
    padding: 18px;
  }

  .my-work-toolbar,
  .delivery-card,
  .commercial-card,
  .command-actions {
    flex-direction: column;
    align-items: stretch;
  }

  .adherence-metrics {
    justify-content: flex-start;
  }

  .commitment-add-row,
  .handoff-add-row {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 620px) {
  .main-nav {
    grid-template-columns: 1fr;
  }

  .top-actions {
    width: 100%;
  }

  .top-actions button {
    flex: 1;
  }
}
