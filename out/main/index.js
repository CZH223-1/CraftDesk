"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const electron = require("electron");
const node_path = require("node:path");
const node_fs = require("node:fs");
const node_crypto = require("node:crypto");
const node_child_process = require("node:child_process");
const node_os = require("node:os");
const node_net = require("node:net");
const node_zlib = require("node:zlib");
const node_stream = require("node:stream");
const promises = require("node:stream/promises");
const DEFAULT_SETTINGS = {
  javaPath: "",
  javaList: [],
  pythonPath: "",
  pythonList: [],
  defaultMemoryMin: 1024,
  defaultMemoryMax: 4096,
  defaultJvmArgs: "-XX:+UseG1GC -XX:+ParallelRefProcEnabled -XX:MaxGCPauseMillis=200",
  closeToTray: true,
  stopOnExit: true,
  maxLogLines: 4e3,
  curseforgeApiKey: "",
  theme: "dark",
  sideWidth: 300,
  panelWidth: 360,
  backgroundImage: "",
  backgroundOpacity: 1,
  surfaceOpacity: 0.86
};
function defaultServer(partial) {
  const now = Date.now();
  return {
    id: node_crypto.randomUUID(),
    name: "新服务器",
    dir: "",
    jar: "server.jar",
    startScript: "",
    launchArgs: "",
    pythonPath: "",
    javaPath: "",
    memoryMin: 1024,
    memoryMax: 4096,
    jvmArgs: "",
    serverArgs: "nogui",
    kind: "unknown",
    mcVersion: "",
    coreDir: "",
    mcdr: false,
    pluginsDir: "",
    modsDir: "",
    autoRestart: false,
    createdAt: now,
    lastStartedAt: 0,
    totalUptime: 0,
    color: "",
    icon: "",
    note: "",
    order: 0,
    ...partial
  };
}
class Store {
  data;
  file;
  timer = null;
  /** 磁盘上有没有这份配置（首次运行时要补一份出来） */
  persisted = false;
  constructor() {
    this.file = node_path.join(electron.app.getPath("userData"), "craftdesk.json");
    this.data = { version: 1, servers: [], settings: { ...DEFAULT_SETTINGS } };
  }
  async load() {
    try {
      const raw = await node_fs.promises.readFile(this.file, "utf-8");
      const parsed = JSON.parse(raw);
      this.data = {
        version: 1,
        servers: Array.isArray(parsed.servers) ? parsed.servers.map((s) => defaultServer(s)) : [],
        settings: { ...DEFAULT_SETTINGS, ...parsed.settings || {} }
      };
      this.persisted = true;
    } catch {
      this.persisted = false;
    }
  }
  /**
   * 首次运行时把默认配置写出来。
   *
   * 不写的话，用户要等到「改点什么」才会看到配置文件出现在目录里 ——
   * 「打开就有一份配置可以看、可以手改」是更符合直觉的。
   * 已经有配置文件的话什么都不做：里面的服务器列表不能被默认值盖掉。
   */
  async ensureFile() {
    if (this.persisted) return false;
    await this.writeNow();
    this.persisted = true;
    return true;
  }
  get settings() {
    return this.data.settings;
  }
  patchSettings(patch) {
    this.data.settings = { ...this.data.settings, ...patch };
    this.flush();
    return this.data.settings;
  }
  get servers() {
    return [...this.data.servers].sort((a, b) => a.order - b.order);
  }
  getServer(id) {
    return this.data.servers.find((s) => s.id === id);
  }
  addServer(cfg) {
    cfg.order = this.data.servers.length;
    this.data.servers.push(cfg);
    this.flush();
    return cfg;
  }
  updateServer(id, patch) {
    const idx = this.data.servers.findIndex((s) => s.id === id);
    if (idx < 0) return void 0;
    this.data.servers[idx] = { ...this.data.servers[idx], ...patch, id };
    this.flush();
    return this.data.servers[idx];
  }
  removeServer(id) {
    this.data.servers = this.data.servers.filter((s) => s.id !== id);
    this.data.servers.forEach((s, i) => s.order = i);
    this.flush();
  }
  reorder(ids) {
    ids.forEach((id, i) => {
      const s = this.data.servers.find((x) => x.id === id);
      if (s) s.order = i;
    });
    this.flush();
  }
  flush() {
    if (this.timer) clearTimeout(this.timer);
    this.timer = setTimeout(() => void this.writeNow(), 300);
  }
  async writeNow() {
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
    try {
      await node_fs.promises.mkdir(node_path.dirname(this.file), { recursive: true });
      const tmp = `${this.file}.tmp`;
      await node_fs.promises.writeFile(tmp, JSON.stringify(this.data, null, 2), "utf-8");
      await node_fs.promises.rename(tmp, this.file);
    } catch (err) {
      console.error("[store] 写入失败", err);
    }
  }
}
function canWrite(dir) {
  if (!dir) return false;
  const probe = node_path.join(dir, ".craftdesk-write-test");
  try {
    node_fs.mkdirSync(dir, { recursive: true });
    node_fs.writeFileSync(probe, "ok");
    node_fs.rmSync(probe, { force: true });
    return true;
  } catch {
    return false;
  }
}
function pickDataDir(candidates, fallback, writable = canWrite) {
  const seen = /* @__PURE__ */ new Set();
  for (const candidate of candidates) {
    if (!candidate) continue;
    const dir = node_path.join(candidate);
    if (seen.has(dir) || dir === fallback) continue;
    seen.add(dir);
    if (writable(dir)) {
      return {
        dir,
        portable: true,
        reason: "便携模式：配置与图标就放在 exe 旁边，拷走整个文件夹即可"
      };
    }
  }
  return {
    dir: fallback,
    portable: false,
    reason: "配置放在系统的用户目录（exe 所在位置不可写）"
  };
}
function dataDirNextTo(exePath) {
  return node_path.join(node_path.dirname(exePath), "data");
}
function requiredJavaMajor(mcVersion) {
  const legacy = mcVersion.match(/^1\.(\d+)(?:\.(\d+))?/);
  if (legacy) {
    const minor = Number(legacy[1]);
    const patch = legacy[2] ? Number(legacy[2]) : 0;
    if (minor >= 21) return 21;
    if (minor === 20) return patch >= 5 ? 21 : 17;
    if (minor >= 18) return 17;
    if (minor === 17) return 16;
    return 8;
  }
  const modern = mcVersion.match(/^(\d+)(?:\.(\d+))?/);
  if (modern) {
    const major = Number(modern[1]);
    if (major >= 26) return 25;
    if (major >= 21) return 21;
    if (major >= 18) return 17;
    if (major >= 17) return 16;
  }
  return 17;
}
function proxyJavaMajor(kind, version) {
  if (kind === "waterfall") return requiredJavaMajor(version);
  return 17;
}
function run(cmd, args, opts = {}) {
  return new Promise((resolve) => {
    const child = node_child_process.spawn(cmd, args, {
      cwd: opts.cwd,
      windowsHide: true,
      shell: false,
      stdio: ["ignore", "pipe", "pipe"]
    });
    let stdout = "";
    let stderr = "";
    const timer = setTimeout(() => {
      try {
        child.kill();
      } catch {
      }
    }, opts.timeout ?? 15e3);
    child.stdout?.on("data", (d) => {
      const text = d.toString("utf-8");
      stdout += text;
      opts.onChunk?.(text);
    });
    child.stderr?.on("data", (d) => {
      const text = d.toString("utf-8");
      stderr += text;
      opts.onChunk?.(text);
    });
    child.on("error", () => {
      clearTimeout(timer);
      resolve({ code: -1, stdout: "", stderr: "" });
    });
    child.on("close", (code) => {
      clearTimeout(timer);
      resolve({ code: code ?? -1, stdout, stderr });
    });
  });
}
async function probeJava(path) {
  const info = { path, version: "", major: 0, vendor: "", valid: false };
  if (!path || !node_fs.existsSync(path)) return info;
  const res = await run(path, ["-XshowSettings:properties", "-version"], { timeout: 12e3 });
  const out = `${res.stderr}
${res.stdout}`;
  const versionMatch = out.match(/java\.version\s*=\s*(\S+)/) || out.match(/version "([^"]+)"/);
  if (versionMatch) info.version = versionMatch[1];
  const vendorMatch = out.match(/java\.vendor\s*=\s*(.+)/);
  if (vendorMatch) info.vendor = vendorMatch[1].trim();
  const majorMatch = info.version.match(/^(\d+)(?:\.(\d+))?/);
  if (majorMatch) {
    const first = Number(majorMatch[1]);
    info.major = first === 1 && majorMatch[2] ? Number(majorMatch[2]) : first;
  }
  info.valid = res.code === 0 || !!info.version;
  return info;
}
async function detectJava() {
  const candidates = /* @__PURE__ */ new Set();
  const which = await run("where", ["java"]);
  if (which.code === 0) {
    which.stdout.split(/\r?\n/).map((s) => s.trim()).filter(Boolean).forEach((p) => candidates.add(p));
  }
  if (process.env.JAVA_HOME) {
    candidates.add(node_path.join(process.env.JAVA_HOME, "bin", "java.exe"));
  }
  const roots = [
    "C:\\Program Files\\Java",
    "C:\\Program Files\\Eclipse Adoptium",
    "C:\\Program Files\\Microsoft\\jdk",
    "C:\\Program Files\\Amazon Corretto",
    "C:\\Program Files\\Zulu",
    "C:\\Program Files\\BellSoft",
    "C:\\Program Files (x86)\\Java",
    node_path.join(process.env.LOCALAPPDATA || node_path.join(node_os.homedir(), "AppData", "Local"), "Programs", "Eclipse Adoptium")
  ];
  for (const root of roots) {
    try {
      const entries = await node_fs.promises.readdir(root, { withFileTypes: true });
      for (const e of entries) {
        if (!e.isDirectory()) continue;
        const exe = node_path.join(root, e.name, "bin", "java.exe");
        if (node_fs.existsSync(exe)) candidates.add(exe);
      }
    } catch {
    }
  }
  const launcherRoots = [
    node_path.join(process.env.APPDATA || node_path.join(node_os.homedir(), "AppData", "Roaming"), ".minecraft", "runtime"),
    // 第三方启动器惯用的位置
    node_path.join(process.env.APPDATA || node_path.join(node_os.homedir(), "AppData", "Roaming"), "PCL"),
    node_path.join(process.env.LOCALAPPDATA || node_path.join(node_os.homedir(), "AppData", "Local"), "Programs", "HMCL", "java")
  ];
  for (const root of launcherRoots) {
    let entries;
    try {
      entries = await node_fs.promises.readdir(root, { withFileTypes: true });
    } catch {
      continue;
    }
    for (const e of entries) {
      if (!e.isDirectory()) continue;
      for (const exe of [
        node_path.join(root, e.name, "bin", "java.exe"),
        node_path.join(root, e.name, "java.exe")
      ]) {
        if (node_fs.existsSync(exe)) candidates.add(exe);
      }
    }
  }
  const results = [];
  for (const path of candidates) {
    const info = await probeJava(path);
    if (info.valid) results.push(info);
  }
  results.sort((a, b) => b.major - a.major);
  return results;
}
const UTF8_CONSOLE_FLAGS = [
  "-Dfile.encoding=UTF-8",
  "-Dstdout.encoding=UTF-8",
  "-Dstderr.encoding=UTF-8",
  "-Dsun.stdout.encoding=UTF-8",
  "-Dsun.stderr.encoding=UTF-8"
];
const PROXY_KINDS = ["velocity", "bungeecord", "waterfall"];
function isProxyKind(kind) {
  return PROXY_KINDS.includes(kind);
}
const PROXY_JAR_RE = /^(?:velocity|waterfall|bungeecord)[-_]?v?(\d+\.\d+(?:\.\d+)?)/i;
const stripQuotes = (s) => s.trim().replace(/^["']|["']$/g, "");
async function readProxyMeta(dir, kind) {
  const out = { port: null, motd: null, version: "" };
  try {
    for (const name of await node_fs.promises.readdir(dir)) {
      const m = name.match(PROXY_JAR_RE);
      if (m) {
        out.version = m[1];
        break;
      }
    }
  } catch {
  }
  if (kind === "velocity") {
    try {
      const toml = await node_fs.promises.readFile(node_path.join(dir, "velocity.toml"), "utf-8");
      const bind = toml.match(/^\s*bind\s*=\s*(.+)$/m);
      if (bind) {
        const m = stripQuotes(bind[1]).match(/:(\d+)\s*$/);
        if (m) out.port = Number(m[1]);
      }
      const motd = toml.match(/^\s*motd\s*=\s*(.+)$/m);
      if (motd) out.motd = stripQuotes(motd[1]);
    } catch {
    }
    return out;
  }
  for (const file of ["config.yml", "waterfall.yml"]) {
    try {
      const yml = await node_fs.promises.readFile(node_path.join(dir, file), "utf-8");
      const host = yml.match(/^\s*host\s*:\s*(.+)$/m);
      if (host) {
        const m = stripQuotes(host[1]).match(/:(\d+)\s*$/);
        if (m) out.port = Number(m[1]);
      }
      if (!out.motd) {
        const motd = yml.match(/^\s*motd\s*:\s*(.+)$/m);
        if (motd) out.motd = stripQuotes(motd[1]);
      }
      if (out.port) break;
    } catch {
    }
  }
  return out;
}
async function findProxyConfigFile(dir, kind) {
  const candidates = kind === "velocity" ? ["velocity.toml"] : ["config.yml", "waterfall.yml", "bungeecord.yml"];
  for (const name of candidates) {
    try {
      await node_fs.promises.access(node_path.join(dir, name));
      return node_path.join(dir, name);
    } catch {
    }
  }
  return null;
}
const IMPORTANT_KEYS = /* @__PURE__ */ new Set([
  "motd",
  "server-port",
  "server-ip",
  "max-players",
  "online-mode",
  "difficulty",
  "gamemode",
  "force-gamemode",
  "level-name",
  "level-seed",
  "level-type",
  "pvp",
  "white-list",
  "enforce-whitelist",
  "spawn-protection",
  "view-distance",
  "simulation-distance",
  "player-idle-timeout",
  "allow-flight",
  "allow-nether",
  "hardcore",
  "enable-command-block",
  "enable-rcon",
  "rcon.port",
  "rcon.password",
  "query.port",
  "resource-pack",
  "require-resource-pack",
  "max-world-size",
  "op-permission-level",
  "network-compression-threshold"
]);
async function parsePropertiesFile(path) {
  let raw;
  try {
    raw = await node_fs.promises.readFile(path, "utf-8");
  } catch {
    return [];
  }
  return parseProperties(raw);
}
function parseProperties(raw) {
  const entries = [];
  let pending = [];
  for (const line of raw.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed) {
      pending = [];
      continue;
    }
    if (trimmed.startsWith("#") || trimmed.startsWith("!")) {
      pending.push(trimmed);
      continue;
    }
    const eq = trimmed.indexOf("=");
    const key = eq < 0 ? trimmed : trimmed.slice(0, eq).trim();
    const value = eq < 0 ? "" : trimmed.slice(eq + 1);
    entries.push({
      key,
      value,
      comment: pending.length ? pending.join("\n") : void 0,
      important: IMPORTANT_KEYS.has(key)
    });
    pending = [];
  }
  return entries;
}
function serializeProperties(entries) {
  const lines = [];
  for (const e of entries) {
    if (e.comment) lines.push(...e.comment.split("\n"));
    lines.push(`${e.key}=${e.value}`);
  }
  return `${lines.join("\n")}
`;
}
async function writeProperties(path, entries) {
  await node_fs.promises.writeFile(path, serializeProperties(entries), "utf-8");
}
const CONTENT_DIRS = /* @__PURE__ */ new Set([
  "mods",
  "plugins",
  "config",
  "configs",
  "defaultconfigs",
  "default-configs",
  "world",
  "world_nether",
  "world_the_end",
  "logs",
  "crash-reports",
  "backups",
  "backup",
  "saves",
  "resourcepacks",
  "datapacks",
  "shaderpacks",
  "screenshots",
  "cache",
  "libraries",
  "versions",
  "local",
  "data",
  "kubejs",
  "scripts",
  "assets",
  "bin",
  "tmp",
  "temp",
  "node_modules"
]);
function isContentDirName(name) {
  return CONTENT_DIRS.has((name || "").trim().toLowerCase());
}
async function hasFileWithExt(dir, exts) {
  try {
    const entries = await node_fs.promises.readdir(dir, { withFileTypes: true });
    return entries.some((e) => {
      if (!e.isFile()) return false;
      const lower = e.name.toLowerCase().replace(/\.disabled$/, "");
      return exts.some((x) => lower.endsWith(x));
    });
  } catch {
    return false;
  }
}
async function readMcdrConfig(root) {
  const file = node_path.join(root, "config.yml");
  let text = "";
  try {
    text = await node_fs.promises.readFile(file, "utf-8");
  } catch {
    return { isMcdr: false, startCommand: null, pluginDirs: [] };
  }
  const isMcdr = /^\s*plugin_directories\s*:/m.test(text) || /^\s*handler\s*:/m.test(text) || /^\s*start_command\s*:/m.test(text) || /mcdreforged/i.test(text);
  let startCommand = null;
  const block = text.match(/^\s*start_command\s*:\s*[|>]-?\s*\n((?:[ \t]+.*\n?)+)/m);
  if (block) {
    startCommand = block[1].split("\n").map((l) => l.trim()).filter(Boolean).join(" ");
  } else {
    const inline = text.match(/^\s*start_command\s*:\s*(.+)$/m);
    if (inline) startCommand = inline[1].trim().replace(/^["']|["']$/g, "");
  }
  const pluginDirs = [];
  const listBlock = text.match(/^\s*plugin_directories\s*:\s*\n((?:[ \t]*-.*\n?)+)/m);
  if (listBlock) {
    for (const line of listBlock[1].split("\n")) {
      const m = line.match(/^\s*-\s*(.+?)\s*$/);
      if (m) pluginDirs.push(m[1].replace(/^["']|["']$/g, ""));
    }
  }
  if (!pluginDirs.length) pluginDirs.push("plugins");
  return { isMcdr, startCommand, pluginDirs };
}
function parseMemoryFromCommand(cmd) {
  const toMb = (raw) => {
    const m = raw.match(/^(\d+)([kKmMgG]?)$/);
    if (!m) return null;
    const n = Number(m[1]);
    switch (m[2].toLowerCase()) {
      case "k":
        return Math.round(n / 1024);
      case "g":
        return n * 1024;
      default:
        return n;
    }
  };
  const min = cmd.match(/-Xms(\S+)/)?.[1];
  const max = cmd.match(/-Xmx(\S+)/)?.[1];
  return { min: min ? toMb(min) : null, max: max ? toMb(max) : null };
}
async function resolveLayout(cfg) {
  const root = cfg.dir;
  const stored = cfg.coreDir || "";
  let coreRel = stored && !isContentDirName(stored) ? stored : "";
  if (!coreRel) {
    const rootHasProps = node_fs.existsSync(node_path.join(root, "server.properties"));
    if (!rootHasProps) {
      try {
        const entries = await node_fs.promises.readdir(root, { withFileTypes: true });
        for (const e of entries) {
          if (!e.isDirectory() || e.name.startsWith(".")) continue;
          const sub = node_path.join(root, e.name);
          if (node_fs.existsSync(node_path.join(sub, "server.properties")) || node_fs.existsSync(node_path.join(sub, "fabric-server-launch.jar")) || node_fs.existsSync(node_path.join(sub, "eula.txt"))) {
            coreRel = e.name;
            break;
          }
        }
      } catch {
      }
    }
  }
  const core = coreRel ? node_path.join(root, coreRel) : root;
  const mcdrCfg = await readMcdrConfig(root);
  const rootPlugins = node_path.join(root, "plugins");
  const hasMcdrPlugins = await hasFileWithExt(rootPlugins, [".mcdr", ".pyz"]) || node_fs.existsSync(node_path.join(root, "config", "mcdreforged"));
  const isMcdr = coreRel !== "" && (mcdrCfg.isMcdr || hasMcdrPlugins);
  const exists2 = (p) => node_fs.existsSync(p);
  let mcdrPluginsDir = null;
  if (isMcdr) {
    for (const d of mcdrCfg.pluginDirs) {
      if (exists2(node_path.join(root, d))) {
        mcdrPluginsDir = node_path.join(root, d);
        break;
      }
    }
  }
  const mcdrConfigDir = isMcdr && exists2(node_path.join(root, "config")) ? node_path.join(root, "config") : null;
  const mcdrConfigFile = isMcdr && exists2(node_path.join(root, "config.yml")) ? node_path.join(root, "config.yml") : null;
  const candidatePlugins = node_path.join(core, "plugins");
  const mcPluginsDir = exists2(candidatePlugins) && await hasFileWithExt(candidatePlugins, [".jar"]) ? candidatePlugins : null;
  const candidateMods = node_path.join(core, "mods");
  const modsDir = exists2(candidateMods) ? candidateMods : null;
  const candidateConfig = node_path.join(core, "config");
  const configDir = exists2(candidateConfig) ? candidateConfig : null;
  const proxy = isProxyKind(cfg.kind);
  const proxyConfigFile = proxy ? await findProxyConfigFile(core, cfg.kind) : null;
  const proxyMeta = proxy ? await readProxyMeta(core, cfg.kind) : null;
  return {
    root,
    core,
    coreRel,
    isMcdr,
    mcdrStartCommand: isMcdr ? mcdrCfg.startCommand : null,
    mcdrPluginsDir,
    mcdrConfigDir,
    mcdrConfigFile,
    mcPluginsDir,
    modsDir,
    configDir,
    serverProperties: node_path.join(core, "server.properties"),
    playersDir: core,
    isProxy: proxy,
    proxyConfigFile,
    configuredPort: proxyMeta?.port ?? null
  };
}
async function resolveServerPort(cfg) {
  const layout = await resolveLayout(cfg);
  if (layout.isProxy) return layout.configuredPort;
  const props = await parsePropertiesFile(layout.serverProperties);
  const raw = props.find((p) => p.key === "server-port")?.value;
  const n = raw ? Number(raw) : NaN;
  return Number.isFinite(n) ? n : layout.configuredPort;
}
function toRootRel(layout, abs) {
  const root = layout.root.replace(/\\/g, "/").replace(/\/$/, "");
  const full = abs.replace(/\\/g, "/");
  if (full === root) return "";
  return full.startsWith(`${root}/`) ? full.slice(root.length + 1) : abs;
}
const MAX_TEXT_BYTES = 4 * 1024 * 1024;
function safeJoin(root, rel) {
  if (!root) return null;
  const base = node_path.resolve(root);
  const full = node_path.resolve(base, rel || ".");
  const cmpBase = process.platform === "win32" ? base.toLowerCase() : base;
  const cmpFull = process.platform === "win32" ? full.toLowerCase() : full;
  if (cmpFull !== cmpBase && !cmpFull.startsWith(cmpBase + node_path.sep)) return null;
  return full;
}
function toRel(root, full) {
  const r = node_path.relative(root, full);
  return r.split(node_path.sep).join("/");
}
async function listDir(root, rel) {
  const full = safeJoin(root, rel);
  if (!full) return [];
  let entries;
  try {
    entries = await node_fs.promises.readdir(full, { withFileTypes: true });
  } catch {
    return [];
  }
  const out = [];
  for (const e of entries) {
    const p = node_path.join(full, e.name);
    let size = 0;
    let mtime = 0;
    try {
      const st = await node_fs.promises.stat(p);
      size = st.size;
      mtime = st.mtimeMs;
    } catch {
      continue;
    }
    out.push({
      name: e.name,
      path: toRel(root, p),
      isDir: e.isDirectory(),
      size,
      mtime,
      ext: e.isDirectory() ? "" : node_path.extname(e.name).toLowerCase(),
      hidden: e.name.startsWith(".")
    });
  }
  out.sort((a, b) => {
    if (a.isDir !== b.isDir) return a.isDir ? -1 : 1;
    return a.name.localeCompare(b.name, "zh-CN", { numeric: true, sensitivity: "base" });
  });
  return out;
}
async function readTextFile(root, rel) {
  const full = safeJoin(root, rel);
  if (!full) return { content: "", size: 0, truncated: false, binary: false };
  const st = await node_fs.promises.stat(full);
  const truncated = st.size > MAX_TEXT_BYTES;
  const fh = await node_fs.promises.open(full, "r");
  try {
    const len = Math.min(st.size, MAX_TEXT_BYTES);
    const buf = Buffer.alloc(len);
    await fh.read(buf, 0, len, 0);
    const probe = buf.subarray(0, Math.min(8192, buf.length));
    const binary = probe.includes(0);
    if (binary) return { content: "", size: st.size, truncated, binary: true };
    let content = buf.toString("utf-8");
    const bad = (content.match(/�/g) || []).length;
    if (bad > 2) {
      try {
        const gbk = new TextDecoder("gbk").decode(buf);
        if ((gbk.match(/�/g) || []).length < bad) content = gbk;
      } catch {
      }
    }
    if (content.charCodeAt(0) === 65279) content = content.slice(1);
    return { content, size: st.size, truncated, binary: false };
  } finally {
    await fh.close();
  }
}
async function writeTextFile(root, rel, content) {
  const full = safeJoin(root, rel);
  if (!full) throw new Error("路径越界");
  await node_fs.promises.mkdir(node_path.resolve(full, ".."), { recursive: true });
  await node_fs.promises.writeFile(full, content, "utf-8");
}
async function createDir(root, rel) {
  const full = safeJoin(root, rel);
  if (!full) throw new Error("路径越界");
  await node_fs.promises.mkdir(full, { recursive: true });
}
async function renamePath(root, rel, newName) {
  const full = safeJoin(root, rel);
  if (!full) throw new Error("路径越界");
  if (/[\\/:*?"<>|]/.test(newName) || !newName.trim()) throw new Error("名称包含非法字符");
  await node_fs.promises.rename(full, node_path.join(node_path.resolve(full, ".."), newName));
}
async function fileLockInfo(path) {
  let size = 0;
  try {
    size = (await node_fs.promises.stat(path)).size;
  } catch {
    return null;
  }
  try {
    await node_fs.promises.rename(path, path);
    return { locked: false, size };
  } catch (err) {
    const code = err.code;
    if (code === "EBUSY" || code === "EPERM" || code === "EACCES") return { locked: true, size };
    return null;
  }
}
async function deletePath(root, rel, trash) {
  const full = safeJoin(root, rel);
  if (!full) throw new Error("路径越界");
  try {
    await trash(full);
    return "trash";
  } catch {
    await node_fs.promises.rm(full, { recursive: true, force: true });
    return "permanent";
  }
}
async function pathExists(p) {
  try {
    await node_fs.promises.access(p);
    return true;
  } catch {
    return false;
  }
}
async function dirSize$2(absDir, budgetMs = 3e3) {
  const deadline = Date.now() + budgetMs;
  let bytes = 0;
  let files = 0;
  let partial = false;
  const stack = [absDir];
  while (stack.length) {
    if (Date.now() > deadline) {
      partial = true;
      break;
    }
    const cur = stack.pop();
    let entries;
    try {
      entries = await node_fs.promises.readdir(cur, { withFileTypes: true });
    } catch {
      continue;
    }
    for (const e of entries) {
      const p = node_path.join(cur, e.name);
      if (e.isDirectory()) {
        stack.push(p);
      } else if (e.isFile()) {
        try {
          bytes += (await node_fs.promises.stat(p)).size;
          files++;
        } catch {
        }
      }
    }
  }
  return { bytes, files, partial };
}
function detectType(raw) {
  const t = raw.trim();
  if (/^["']/.test(t)) return "string";
  if (t === "true" || t === "false") return "boolean";
  if (t.startsWith("[")) return "array";
  return "number";
}
function unquote$1(raw) {
  const t = raw.trim();
  if (/^".*"$/.test(t) || /^'.*'$/.test(t)) return t.slice(1, -1);
  return t;
}
function toRaw(value, type) {
  switch (type) {
    case "string":
      return /^["'].*["']$/.test(value.trim()) ? value.trim() : `"${value}"`;
    case "boolean":
      return value === "true" ? "true" : "false";
    case "array":
      return value.trim().startsWith("[") ? value.trim() : `[${value}]`;
    default: {
      const n = Number(value);
      return Number.isFinite(n) && value.trim() !== "" ? String(n) : value;
    }
  }
}
function parseVelocityToml(raw) {
  const lines = raw.split(/\r?\n/);
  const fields = [];
  let section = "";
  let pendingComments = [];
  for (let i = 0; i < lines.length; i++) {
    const trimmed = lines[i].trim();
    if (!trimmed) {
      pendingComments = [];
      continue;
    }
    if (trimmed.startsWith("#")) {
      pendingComments.push(trimmed.replace(/^#+\s?/, ""));
      continue;
    }
    const sec = trimmed.match(/^\[([^\]]+)\]$/);
    if (sec) {
      section = sec[1];
      pendingComments = [];
      continue;
    }
    const kv = trimmed.match(/^([A-Za-z0-9_."'-]+)\s*=\s*(.*)$/);
    if (!kv) {
      pendingComments = [];
      continue;
    }
    const key = unquote$1(kv[1]);
    const startLine = i;
    let endLine = i;
    let valueText = kv[2];
    if (valueText.trim().startsWith("[") && !valueText.includes("]")) {
      const parts = [valueText];
      let j = i + 1;
      while (j < lines.length) {
        parts.push(lines[j]);
        if (lines[j].includes("]")) break;
        j++;
      }
      valueText = parts.join("\n");
      endLine = j;
      i = j;
    }
    const type = detectType(valueText);
    fields.push({
      section,
      key,
      value: type === "array" ? valueText : unquote$1(valueText),
      rawValue: valueText,
      type,
      comment: pendingComments.join("\n"),
      startLine,
      endLine
    });
    pendingComments = [];
  }
  const servers = [];
  for (const f of fields) {
    if (f.section !== "servers" || f.key === "try" && f.type === "array") continue;
    if (f.type !== "string") continue;
    const m = f.value.match(/^(.*):(\d+)$/);
    servers.push({
      name: f.key,
      address: f.value,
      host: m ? m[1] : f.value,
      port: m ? Number(m[2]) : 0
    });
  }
  const tryField = fields.find((f) => f.section === "servers" && f.key === "try");
  const tryList = tryField ? [...tryField.value.matchAll(/["']([^"']+)["']/g)].map((m) => m[1]) : [];
  return { fields, servers, tryList };
}
async function readVelocityFile(dir) {
  const path = node_path.join(dir, "velocity.toml");
  let raw = "";
  let exists2 = false;
  try {
    raw = await node_fs.promises.readFile(path, "utf-8");
    exists2 = true;
  } catch {
  }
  const parsed = parseVelocityToml(raw);
  let secretFile = "forwarding.secret";
  const secretField = parsed.fields.find(
    (f) => f.section === "" && f.key === "forwarding-secret-file"
  );
  if (secretField?.value) secretFile = secretField.value;
  let secret = null;
  try {
    secret = (await node_fs.promises.readFile(node_path.join(dir, secretFile), "utf-8")).trim() || null;
  } catch {
    secret = null;
  }
  return {
    path,
    exists: exists2,
    fields: parsed.fields,
    servers: parsed.servers,
    tryList: parsed.tryList,
    secret,
    secretFile,
    raw
  };
}
async function writeVelocityFile(dir, updates) {
  const path = node_path.join(dir, "velocity.toml");
  const raw = await node_fs.promises.readFile(path, "utf-8");
  const lines = raw.split(/\r?\n/);
  const parsed = parseVelocityToml(raw);
  const targets = updates.map((u) => ({
    update: u,
    field: parsed.fields.find((f) => f.section === u.section && f.key === u.key)
  })).filter((t) => Boolean(t.field)).sort((a, b) => b.field.startLine - a.field.startLine);
  for (const { update, field } of targets) {
    const rawValue = toRaw(update.value, update.type);
    const indent = lines[field.startLine].match(/^\s*/)?.[0] ?? "";
    lines.splice(field.startLine, field.endLine - field.startLine + 1, `${indent}${field.key} = ${rawValue}`);
  }
  await node_fs.promises.writeFile(path, lines.join("\n"), "utf-8");
}
async function writeVelocityServers(dir, servers, tryList) {
  const path = node_path.join(dir, "velocity.toml");
  const raw = await node_fs.promises.readFile(path, "utf-8");
  const lines = raw.split(/\r?\n/);
  const sectionStart = lines.findIndex((l) => l.trim() === "[servers]");
  if (sectionStart < 0) throw new Error("velocity.toml 里没有 [servers] 段");
  let sectionEnd = lines.length;
  for (let i = sectionStart + 1; i < lines.length; i++) {
    if (/^\s*\[[^\]]+\]\s*$/.test(lines[i])) {
      sectionEnd = i;
      break;
    }
  }
  const leadingComments = [];
  for (let i = sectionStart + 1; i < sectionEnd; i++) {
    const t = lines[i].trim();
    if (t.startsWith("#")) leadingComments.push(lines[i]);
    else break;
  }
  const writeName = (n) => /^[A-Za-z0-9_-]+$/.test(n) ? n : `"${n}"`;
  const body = [""];
  body.push(...leadingComments);
  body.push("");
  for (const s of servers) body.push(`${writeName(s.name)} = "${s.address}"`);
  body.push("");
  body.push("");
  body.push("# In what order we should try servers when a player logs in or is kicked from a server.");
  body.push("try = [");
  for (const t of tryList) body.push(`    "${t}"`);
  body.push("]");
  body.push("");
  lines.splice(sectionStart + 1, sectionEnd - sectionStart - 1, ...body);
  await node_fs.promises.writeFile(path, lines.join("\n"), "utf-8");
}
function writeVarInt(value) {
  const bytes = [];
  let v = value >>> 0;
  do {
    let b = v & 127;
    v >>>= 7;
    if (v !== 0) b |= 128;
    bytes.push(b);
  } while (v !== 0);
  return Buffer.from(bytes);
}
function readVarInt(buf, offset) {
  let value = 0;
  let size = 0;
  while (offset + size < buf.length) {
    const b = buf[offset + size];
    value |= (b & 127) << 7 * size;
    size++;
    if (size > 5) return null;
    if ((b & 128) === 0) return { value: value >>> 0, size };
  }
  return null;
}
function frame(body) {
  return Buffer.concat([writeVarInt(body.length), body]);
}
function mcString(s) {
  const raw = Buffer.from(s, "utf8");
  return Buffer.concat([writeVarInt(raw.length), raw]);
}
function parseStatus(buf) {
  const len = readVarInt(buf, 0);
  if (!len || buf.length < len.size + len.value) return null;
  const body = buf.subarray(len.size, len.size + len.value);
  const packetId = readVarInt(body, 0);
  if (!packetId || packetId.value !== 0) return null;
  const strLen = readVarInt(body, packetId.size);
  if (!strLen) return null;
  const start = packetId.size + strLen.size;
  const json = body.subarray(start, start + strLen.value).toString("utf8");
  try {
    const data = JSON.parse(json);
    const players = data.players ?? {};
    return {
      online: Number.isFinite(players.online) ? Number(players.online) : 0,
      max: Number.isFinite(players.max) ? Number(players.max) : 0,
      sample: (players.sample ?? []).map((s) => s?.name ?? "").filter((n) => Boolean(n)),
      version: data.version?.name ?? "",
      motd: flattenMotd(data.description)
    };
  } catch {
    return null;
  }
}
function flattenMotd(desc) {
  if (typeof desc === "string") return desc;
  if (desc && typeof desc === "object") {
    const o = desc;
    const parts = [];
    if (typeof o.text === "string") parts.push(o.text);
    for (const e of o.extra ?? []) parts.push(flattenMotd(e));
    return parts.join("");
  }
  return "";
}
function pingServer(host, port, timeoutMs = 2500) {
  return new Promise((resolve) => {
    let done = false;
    const finish = (r) => {
      if (done) return;
      done = true;
      socket.destroy();
      resolve(r);
    };
    const socket = node_net.createConnection({ host, port });
    socket.setTimeout(timeoutMs, () => finish(null));
    socket.on("error", () => finish(null));
    socket.on("close", () => finish(null));
    let buf = Buffer.alloc(0);
    socket.on("data", (chunk) => {
      buf = Buffer.concat([buf, chunk]);
      if (buf.length > 1 << 20) return finish(null);
      const res = parseStatus(buf);
      if (res) finish(res);
    });
    socket.on("connect", () => {
      const handshake = Buffer.concat([
        writeVarInt(0),
        writeVarInt(-1),
        mcString(host),
        Buffer.from([port >> 8 & 255, port & 255]),
        writeVarInt(1)
      ]);
      const request = writeVarInt(0);
      socket.write(Buffer.concat([frame(handshake), frame(request)]));
    });
  });
}
function looksLikePlayerNames(names) {
  if (!names.length) return false;
  return names.every((n) => /^[A-Za-z0-9_]{1,16}$/.test(n));
}
function splitArgs(input) {
  const out = [];
  const re = /"([^"]*)"|'([^']*)'|(\S+)/g;
  let m;
  while (m = re.exec(input)) {
    out.push(m[1] ?? m[2] ?? m[3]);
  }
  return out;
}
class LineDecoder {
  constructor(onLine) {
    this.onLine = onLine;
  }
  buf = Buffer.alloc(0);
  push(chunk) {
    this.buf = this.buf.length ? Buffer.concat([this.buf, chunk]) : chunk;
    let idx = this.buf.indexOf(10);
    while (idx >= 0) {
      const raw = this.buf.subarray(0, idx);
      this.buf = this.buf.subarray(idx + 1);
      this.onLine(decodeLine(raw));
      idx = this.buf.indexOf(10);
    }
    if (this.buf.length > 1 << 20) {
      this.onLine(decodeLine(this.buf));
      this.buf = Buffer.alloc(0);
    }
  }
  flush() {
    if (this.buf.length) {
      this.onLine(decodeLine(this.buf));
      this.buf = Buffer.alloc(0);
    }
  }
}
function decodeLine(rawIn) {
  let b = rawIn;
  if (b.length && b[b.length - 1] === 13) b = b.subarray(0, b.length - 1);
  if (!b.length) return "";
  try {
    return new TextDecoder("utf-8", { fatal: true }).decode(b);
  } catch {
    try {
      return new TextDecoder("gbk").decode(b);
    } catch {
      return b.toString("latin1");
    }
  }
}
const ANSI = /\x1b\[[0-9;]*[A-Za-z]/g;
function parseLine(raw) {
  const clean = raw.replace(ANSI, "");
  let level = "info";
  let text = clean;
  const modern = clean.match(
    /^\[\d{2}:\d{2}:\d{2}\]\s*\[([^\]]+)\](?:\s*\[([^\]]*\.[^\]]*)\])?:\s?(.*)$/
  );
  if (modern) {
    const src = modern[1];
    text = modern[3];
    if (/\/FATAL|\/ERROR/i.test(src)) level = "error";
    else if (/\/WARN/i.test(src)) level = "warn";
    else if (/\/DEBUG|TRACE/i.test(src)) level = "debug";
    else level = "info";
  } else {
    const legacy = clean.match(/^\[\d{2}:\d{2}:\d{2}\s?(INFO|WARN|ERROR|FATAL|DEBUG)?\]:?\s?(.*)$/i);
    if (legacy) {
      const lv = (legacy[1] || "INFO").toLowerCase();
      level = ["info", "warn", "error", "debug"].includes(lv) ? lv : "info";
      text = legacy[2];
    }
  }
  const line = { t: Date.now(), level, text, raw: clean };
  const chat = text.match(/^<([A-Za-z0-9_]{1,16})>\s?(.*)$/);
  if (chat) {
    line.level = "chat";
    line.player = chat[1];
    line.text = chat[2];
  }
  return line;
}
class ServerManager {
  constructor(store2, events) {
    this.store = store2;
    this.events = events;
    this.startPlayerPolling();
  }
  procs = /* @__PURE__ */ new Map();
  statsTimer = null;
  lastStats = {};
  playersTimer = null;
  playersTick = 0;
  /** 配置里声明的端口，ping 用。走缓存是因为每个 tick 都去读 server.properties 太浪费 */
  cfgPorts = /* @__PURE__ */ new Map();
  // ---------- 查询 ----------
  ensure(id) {
    let p = this.procs.get(id);
    if (!p) {
      p = {
        child: null,
        status: "stopped",
        startedAt: null,
        online: /* @__PURE__ */ new Set(),
        pinged: null,
        pingMax: null,
        portAlive: false,
        backendPorts: null,
        maxPlayers: 20,
        port: null,
        tps: null,
        exitCode: null,
        issue: null,
        issueDetail: "",
        logs: [],
        stoppingTimer: null,
        intentionalStop: false
      };
      this.procs.set(id, p);
    }
    return p;
  }
  runtime(id) {
    const p = this.ensure(id);
    return {
      id,
      status: p.status,
      pid: p.child?.pid ?? null,
      startedAt: p.startedAt,
      uptime: p.startedAt ? Math.floor((Date.now() - p.startedAt) / 1e3) : 0,
      onlinePlayers: [...p.online],
      // 数字以服务端自己报的为准，日志里数的那个只在问不到时兜底
      onlineCount: p.pinged ?? p.online.size,
      maxPlayers: p.pingMax ?? p.maxPlayers,
      externalRunning: !p.child && p.portAlive,
      port: p.port,
      tps: p.tps,
      exitCode: p.exitCode,
      issue: p.issue,
      issueDetail: p.issueDetail
    };
  }
  list() {
    return this.store.servers.map((s) => ({ ...s, runtime: this.runtime(s.id) }));
  }
  getServer(id) {
    const cfg = this.store.getServer(id);
    if (!cfg) return void 0;
    return { ...cfg, runtime: this.runtime(id) };
  }
  logs(id) {
    return this.ensure(id).logs;
  }
  clearLogs(id) {
    this.ensure(id).logs = [];
  }
  /**
   * 服务器被移除后丢掉它的运行时状态。
   * 不然日志和玩家集合会一直挂在内存里，id 也不会再被复用。
   */
  forget(id) {
    const p = this.procs.get(id);
    if (p?.child) return;
    this.procs.delete(id);
  }
  emitStatus(id) {
    this.events.onStatus(id, this.runtime(id));
  }
  pushLog(id, line) {
    const p = this.ensure(id);
    p.logs.push(line);
    const cap = this.store.settings.maxLogLines || 4e3;
    if (p.logs.length > cap) p.logs.splice(0, p.logs.length - cap);
    this.events.onLog(id, line);
  }
  sysLog(id, text, level = "system") {
    this.pushLog(id, { t: Date.now(), level, text, raw: text });
  }
  // ---------- 生命周期 ----------
  isRunning(id) {
    const s = this.ensure(id).status;
    return s === "running" || s === "starting" || s === "stopping";
  }
  async start(id) {
    const cfg = this.store.getServer(id);
    if (!cfg) return { ok: false, error: "服务器不存在" };
    const p = this.ensure(id);
    if (p.child) return { ok: false, error: "服务器已在运行" };
    if (!cfg.dir || !node_fs.existsSync(cfg.dir)) {
      return { ok: false, error: `服务器目录不存在：${cfg.dir || "(未设置)"}` };
    }
    const layout = await resolveLayout(cfg);
    const isProxy = layout.isProxy;
    const myPort = await resolveServerPort(cfg);
    if (myPort != null) {
      for (const other of this.store.servers) {
        if (other.id === id || !this.isRunning(other.id)) continue;
        if (await resolveServerPort(other) === myPort) {
          const msg = `端口 ${myPort} 已被「${other.name}」占用，两个服务器不能同时启动`;
          p.issue = "port-in-use";
          p.issueDetail = msg;
          this.emitStatus(id);
          return { ok: false, error: msg };
        }
      }
      const alive = await pingServer("127.0.0.1", myPort, 1200);
      if (alive) {
        const msg = `端口 ${myPort} 上已经有服务端在响应了（不是 CraftDesk 启动的）。先把它关掉再启动，否则会撞端口。`;
        p.issue = "port-in-use";
        p.issueDetail = msg;
        this.emitStatus(id);
        return { ok: false, error: msg };
      }
    }
    if (layout.isMcdr) {
      const logFile = node_path.join(cfg.dir, "logs", "MCDR.log");
      const lock = await fileLockInfo(logFile);
      if (lock?.locked) {
        const size = lock.size > 1 << 30 ? `（它现在已经 ${(lock.size / 1024 ** 3).toFixed(1)} GB，MCDR 每天轮转日志就卡在这种大文件上，关掉它之后建议把旧日志清掉）` : "";
        const msg = `这个目录里已经有一个 MCDReforged 在跑了，它占着 logs/MCDR.log${size}。先把它关掉再启动，否则两个 MCDR 会抢同一个日志文件，新的那个会在轮转日志时直接崩掉。`;
        p.issue = "mcdr-running";
        p.issueDetail = msg;
        this.emitStatus(id);
        return { ok: false, error: msg };
      }
    }
    const javaPath = cfg.javaPath || this.store.settings.javaPath;
    if (!cfg.startScript && !javaPath) {
      p.issue = "java-missing";
      p.issueDetail = "没有配置 Java 路径，请在设置里选择 java.exe";
      this.emitStatus(id);
      return { ok: false, error: p.issueDetail };
    }
    const jarPath = cfg.jar ? node_path.join(cfg.dir, cfg.jar) : "";
    if (!cfg.startScript && jarPath && !node_fs.existsSync(jarPath)) {
      return { ok: false, error: `找不到服务端核心：${cfg.jar}` };
    }
    if (!cfg.startScript && cfg.launchArgs && !node_fs.existsSync(node_path.join(cfg.dir, cfg.launchArgs))) {
      return { ok: false, error: `找不到启动参数文件：${cfg.launchArgs}` };
    }
    p.online.clear();
    if (isProxy) {
      try {
        const vf = await readVelocityFile(cfg.dir);
        const raw = vf.fields.find(
          (f) => f.section === "" && f.key === "show-max-players"
        )?.value;
        const n = raw ? Number(raw) : NaN;
        if (Number.isFinite(n) && n > 0) p.maxPlayers = n;
      } catch {
      }
    }
    p.tps = null;
    p.exitCode = null;
    p.port = layout.configuredPort;
    p.issue = null;
    p.issueDetail = "";
    p.intentionalStop = false;
    p.status = "starting";
    p.startedAt = Date.now();
    this.store.updateServer(id, { lastStartedAt: p.startedAt });
    this.events.onServersChanged();
    this.emitStatus(id);
    this.sysLog(id, `正在启动 ${cfg.name} …`, "system");
    const decoder = new LineDecoder((line) => this.handleLine(id, line));
    let child;
    try {
      if (cfg.startScript) {
        const script = node_path.join(cfg.dir, cfg.startScript);
        this.sysLog(id, `> cmd /c ${cfg.startScript}`, "system");
        child = node_child_process.spawn("cmd.exe", ["/c", script], {
          cwd: cfg.dir,
          windowsHide: true,
          stdio: ["pipe", "pipe", "pipe"]
        });
      } else if (cfg.mcdr && cfg.pythonPath) {
        const args = ["-X", "utf8", "-m", "mcdreforged"];
        this.sysLog(id, `> ${cfg.pythonPath} ${args.join(" ")}`, "system");
        child = node_child_process.spawn(cfg.pythonPath, args, {
          cwd: cfg.dir,
          windowsHide: true,
          stdio: ["pipe", "pipe", "pipe"]
        });
      } else if (cfg.launchArgs) {
        const args = [];
        if (cfg.memoryMin > 0) args.push(`-Xms${cfg.memoryMin}M`);
        if (cfg.memoryMax > 0) args.push(`-Xmx${cfg.memoryMax}M`);
        args.push(...splitArgs(cfg.jvmArgs || ""));
        args.push(...UTF8_CONSOLE_FLAGS);
        args.push(`@${node_path.join(cfg.dir, cfg.launchArgs)}`);
        args.push(...splitArgs(cfg.serverArgs || ""));
        this.sysLog(id, `> ${javaPath} ${args.join(" ")}`, "system");
        child = node_child_process.spawn(javaPath, args, {
          cwd: cfg.dir,
          windowsHide: true,
          stdio: ["pipe", "pipe", "pipe"]
        });
      } else {
        const args = [];
        if (cfg.memoryMin > 0) args.push(`-Xms${cfg.memoryMin}M`);
        if (cfg.memoryMax > 0) args.push(`-Xmx${cfg.memoryMax}M`);
        args.push(...splitArgs(cfg.jvmArgs || ""));
        args.push(...UTF8_CONSOLE_FLAGS);
        args.push("-jar", cfg.jar);
        const extra = splitArgs(cfg.serverArgs || "").filter(
          (a) => !(isProxy && a.toLowerCase() === "nogui")
        );
        args.push(...extra);
        this.sysLog(id, `> ${javaPath} ${args.join(" ")}`, "system");
        child = node_child_process.spawn(javaPath, args, {
          cwd: cfg.dir,
          windowsHide: true,
          stdio: ["pipe", "pipe", "pipe"]
        });
      }
    } catch (err) {
      p.status = "crashed";
      p.startedAt = null;
      this.sysLog(id, `启动失败：${String(err)}`, "error");
      this.emitStatus(id);
      return { ok: false, error: String(err) };
    }
    p.child = child;
    child.stdout.on("data", (d) => decoder.push(d));
    child.stderr.on("data", (d) => decoder.push(d));
    child.on("error", (err) => {
      decoder.flush();
      p.status = "crashed";
      p.child = null;
      p.startedAt = null;
      p.issue = "java-missing";
      p.issueDetail = `无法启动进程：${err.message}`;
      this.sysLog(id, `进程错误：${err.message}`, "error");
      this.emitStatus(id);
      this.stopStatsPollingIfIdle();
    });
    child.on("close", (code) => {
      decoder.flush();
      if (p.stoppingTimer) {
        clearTimeout(p.stoppingTimer);
        p.stoppingTimer = null;
      }
      const wasUptime = p.startedAt ? Math.floor((Date.now() - p.startedAt) / 1e3) : 0;
      p.exitCode = code;
      p.child = null;
      p.startedAt = null;
      p.online.clear();
      const cfgNow = this.store.getServer(id);
      if (cfgNow && wasUptime > 0) {
        this.store.updateServer(id, { totalUptime: (cfgNow.totalUptime || 0) + wasUptime });
        this.events.onServersChanged();
      }
      if (p.intentionalStop || code === 0) {
        p.status = "stopped";
        this.sysLog(id, `服务器已停止（退出码 ${code}）`, "system");
      } else {
        p.status = "crashed";
        if (!p.issue) {
          p.issue = "crash";
          p.issueDetail = `服务器异常退出，退出码 ${code}`;
        }
        this.sysLog(id, `服务器异常退出，退出码 ${code}`, "error");
      }
      if (cfgNow?.autoRestart && !p.intentionalStop) {
        this.sysLog(id, "检测到异常退出，5 秒后自动重启…", "system");
        setTimeout(() => {
          if (!this.isRunning(id)) void this.start(id);
        }, 5e3);
      }
      this.emitStatus(id);
      this.stopStatsPollingIfIdle();
    });
    this.startStatsPolling();
    if (isProxy) void this.watchProxyBackends(id);
    return { ok: true };
  }
  /**
   * 代理端的后端在不在。
   *
   * 代理端本身起来了不代表玩家能玩：后端没开的话，玩家一路连到代理端、
   * 被转发的瞬间才被踢回来，日志里只留一屏 Netty 堆栈。
   * 这里读一次 velocity.toml 把后端端口记下来，之后每个轮询周期探一次，
   * 有后端活了就把提示撤掉。
   */
  async watchProxyBackends(id) {
    const cfg = this.store.getServer(id);
    const p = this.ensure(id);
    if (!cfg || p.backendPorts) return;
    try {
      const vf = await readVelocityFile(cfg.dir);
      p.backendPorts = vf.servers.map((x) => x.port).filter((n) => Number.isFinite(n) && n > 0);
    } catch {
      return;
    }
    setTimeout(() => void this.probeProxyBackends(id), 6e3);
  }
  /** 探一次后端端口，状态变了才推给界面 */
  async probeProxyBackends(id) {
    const p = this.ensure(id);
    if (!p.child || !p.backendPorts?.length) return;
    const before = `${p.issue}|${p.issueDetail}`;
    const alive = await Promise.all(p.backendPorts.map((port) => pingServer("127.0.0.1", port, 1200)));
    if (alive.some(Boolean)) {
      if (p.issue === "backend-down") {
        p.issue = null;
        p.issueDetail = "";
      }
    } else {
      p.issue = "backend-down";
      p.issueDetail = `后端一个都没在跑（${p.backendPorts.join("、")} 都没有响应）。玩家现在连上会被直接踢回，先把后端启动起来。`;
    }
    if (`${p.issue}|${p.issueDetail}` !== before) this.emitStatus(id);
  }
  async stop(id, force = false) {
    const p = this.ensure(id);
    if (!p.child) return;
    p.intentionalStop = true;
    if (force) {
      this.sysLog(id, "强制结束进程", "warn");
      await this.killTree(p.child.pid);
      return;
    }
    p.status = "stopping";
    this.emitStatus(id);
    this.sysLog(id, "正在发送 stop 指令，等待服务器保存世界…", "system");
    try {
      p.child.stdin.write("stop\n");
    } catch {
      await this.killTree(p.child.pid);
      return;
    }
    p.stoppingTimer = setTimeout(() => {
      const cur = this.ensure(id);
      if (cur.child) {
        this.sysLog(id, "服务器 30 秒未响应，强制结束", "warn");
        void this.killTree(cur.child.pid);
      }
    }, 3e4);
  }
  async restart(id) {
    await this.stop(id);
    const p = this.ensure(id);
    const deadline = Date.now() + 35e3;
    while (p.child && Date.now() < deadline) {
      await new Promise((r) => setTimeout(r, 300));
    }
    await this.start(id);
  }
  async killTree(pid) {
    if (!pid) return;
    if (process.platform === "win32") {
      await run("taskkill", ["/PID", String(pid), "/T", "/F"], { timeout: 1e4 });
    } else {
      try {
        process.kill(-pid, "SIGKILL");
      } catch {
        try {
          process.kill(pid, "SIGKILL");
        } catch {
        }
      }
    }
  }
  sendCommand(id, cmd) {
    const p = this.ensure(id);
    if (!p.child || p.status === "stopped" || p.status === "crashed") return false;
    try {
      p.child.stdin.write(cmd.endsWith("\n") ? cmd : `${cmd}
`);
      this.pushLog(id, {
        t: Date.now(),
        level: "system",
        text: `> ${cmd}`,
        raw: `> ${cmd}`
      });
      return true;
    } catch {
      return false;
    }
  }
  async stopAll() {
    const running = this.store.servers.filter((s) => this.isRunning(s.id));
    await Promise.all(running.map((s) => this.stop(s.id)));
  }
  // ---------- 日志解析 ----------
  handleLine(id, raw) {
    if (!raw.trim()) return;
    const line = parseLine(raw);
    const p = this.ensure(id);
    const text = line.text;
    const joined = text.match(/^([A-Za-z0-9_]{1,16})(?:\[[^\]]*\])? joined the game/);
    const proxyJoin = text.match(
      /^\[connected player\]\s+([A-Za-z0-9_]{1,16})\s+\([^)]*\)\s+has connected/
    );
    const proxyLeave = text.match(
      /^\[connected player\]\s+([A-Za-z0-9_]{1,16})\s+\([^)]*\)\s+has disconnected/
    );
    if (joined) {
      p.online.add(joined[1]);
      this.emitStatus(id);
    } else if (proxyJoin) {
      p.online.add(proxyJoin[1]);
      this.emitStatus(id);
    } else if (proxyLeave) {
      p.online.delete(proxyLeave[1]);
      this.emitStatus(id);
    } else {
      const left = text.match(/^([A-Za-z0-9_]{1,16}) left the game/);
      if (left) {
        p.online.delete(left[1]);
        this.emitStatus(id);
      } else if (line.level === "chat" && line.player) {
        p.online.add(line.player);
      }
    }
    if (/Done \(\d[\d.,]*s\)!/.test(text) && p.status !== "running") {
      p.status = "running";
      p.startedAt = p.startedAt ?? Date.now();
      this.emitStatus(id);
    }
    const portHit = text.match(/Starting Minecraft server on \S*?:(\d+)/) || text.match(/Listening on \/[\d.]+:(\d+)/);
    if (portHit) {
      const port = Number(portHit[1]);
      if (port !== p.port) {
        p.port = port;
        this.emitStatus(id);
      }
    }
    const count = text.match(/There are (\d+) of a max of (\d+) players online/);
    if (count) {
      p.maxPlayers = Number(count[2]);
      this.emitStatus(id);
    }
    const tps = text.match(/TPS from last 1m, 5m, 15m:\s*([\d.]+)/);
    if (tps) {
      p.tps = Number(tps[1]);
      this.emitStatus(id);
    }
    if (/You need to agree to the EULA|Go to https:\/\/aka\.ms\/minecrafteula/i.test(text)) {
      p.issue = "eula";
      p.issueDetail = "需要先同意 Minecraft EULA 才能启动服务器";
    } else if (/FAILED TO BIND TO PORT|Address already in use|Perhaps a server is already running/i.test(text)) {
      p.issue = "port-in-use";
      p.issueDetail = "端口被占用，请修改 server.properties 中的 server-port";
    } else if (/UnsupportedClassVersionError|class file version/i.test(text)) {
      p.issue = "java-missing";
      p.issueDetail = "Java 版本过低，请换用更高版本的 Java";
    } else if (/requires running the server with Java (\d+)/i.test(text)) {
      const need = Number(text.match(/requires running the server with Java (\d+)/i)[1]);
      const cfg = this.store.getServer(id);
      const cur = cfg ? this.store.settings.javaList.find((j) => j.path === cfg.javaPath) : void 0;
      p.issue = "java-missing";
      p.issueDetail = `这个服务端要求 Java ${need} 或更高` + (cur?.major ? `，当前用的是 Java ${cur.major}` : "") + `。到「启动配置 → Java 运行环境」里换成 Java ${need} 的 java.exe。`;
    } else if (/Invalid or corrupt jarfile|zip END header not found|invalid LOC header|Error opening zip file/i.test(text)) {
      p.issue = "crash";
      p.issueDetail = "服务端 jar 打不开：文件损坏或不完整。删掉它重新下载一次（下载完成时会自动核对大小和校验和）。";
    } else if (/Unable to access jarfile/i.test(text)) {
      p.issue = "crash";
      p.issueDetail = "找不到服务端 jar。检查「服务端核心」指向的文件是否还在。";
    } else if (/unable to connect to server ([A-Za-z0-9_-]+)/i.test(text) || /Connection refused/i.test(text) && this.isProxyById(id)) {
      const who = text.match(/unable to connect to server ([A-Za-z0-9_-]+)/i)?.[1];
      p.issue = "backend-down";
      p.issueDetail = who ? `有玩家连不上后端「${who}」：那个地址上没有服务端在跑（或者还没启动完）。先把后端开起来。` : "有玩家连不上后端：后端地址上没有服务端在跑。先把后端开起来。";
    }
    this.pushLog(id, line);
  }
  // ---------- 在线人数（Server List Ping） ----------
  /**
   * 每几秒问一次服务端「几个人在线」。
   *
   * 为什么值得单独开一个轮询：日志数人头是「从我接管之后」的变化量，
   * 中途接管、外部启动、崩溃前的离开行都会让它偏掉；而 ping 拿到的是
   * 服务端现在的真实数字，跟客户端服务器列表里显示的完全同源。
   *
   * 顺带还解决另一件事：我们没启动、但端口上有服务端在响应（手动开服、
   * MCDR 自己拉起来的），也能被认出来。
   */
  startPlayerPolling() {
    if (this.playersTimer) return;
    this.playersTimer = setInterval(() => void this.pollPlayers(), 6e3);
  }
  async refreshCfgPorts() {
    const ids = new Set(this.store.servers.map((s) => s.id));
    const stale = ids.size !== this.cfgPorts.size || [...ids].some((id) => !this.cfgPorts.has(id));
    if (!stale) return;
    this.cfgPorts.clear();
    for (const cfg of this.store.servers) {
      let port = null;
      try {
        port = await resolveServerPort(cfg);
      } catch {
      }
      this.cfgPorts.set(cfg.id, port);
    }
  }
  async pollPlayers() {
    await this.refreshCfgPorts();
    const tick = ++this.playersTick;
    const anyRunning = [...this.procs.values()].some((p) => p.child);
    const sweepStopped = anyRunning || tick === 1 || tick % 4 === 0;
    const groups = /* @__PURE__ */ new Map();
    const add = (port, id) => {
      groups.set(port, [...groups.get(port) ?? [], id]);
    };
    for (const cfg of this.store.servers) {
      const proc = this.ensure(cfg.id);
      if (proc.child) {
        const port = proc.port ?? this.cfgPorts.get(cfg.id) ?? null;
        if (port != null) add(port, cfg.id);
      } else if (sweepStopped) {
        const port = this.cfgPorts.get(cfg.id) ?? null;
        if (port != null) add(port, cfg.id);
      }
    }
    await Promise.all(
      [...groups.entries()].map(([port, ids]) => this.pingPortInto(port, ids))
    );
    for (const cfg of this.store.servers) {
      const proc = this.ensure(cfg.id);
      if (!proc.child || !isProxyKind(cfg.kind)) continue;
      if (proc.backendPorts === null) void this.watchProxyBackends(cfg.id);
      else void this.probeProxyBackends(cfg.id);
    }
  }
  /**
   * 问一个端口，把结果写进对应的服务器。
   *
   * 一个端口可能被多台服务器声明（同端口的那几台），这时响应的是谁得判断一下：
   * 服务端会在 ping 里报自己的版本串和 MOTD。用核心名 / 游戏版本 / 名字去对，
   * 只能对上唯一一台才认领——对不上就谁也不认，宁可不说，也不要认错。
   */
  async pingPortInto(port, ids) {
    const res = await pingServer("127.0.0.1", port, 1500);
    let owners = [];
    if (res) {
      if (ids.length === 1) {
        owners = ids;
      } else {
        const matched = ids.filter((id) => this.pingLooksLike(id, res));
        owners = matched.length === 1 ? matched : [];
      }
    }
    for (const id of ids) {
      const proc = this.ensure(id);
      const before = `${proc.pinged}|${proc.pingMax}|${proc.portAlive}`;
      const mine = owners.includes(id);
      if (res && mine) {
        proc.portAlive = true;
        proc.pinged = res.online;
        proc.pingMax = res.max > 0 ? res.max : null;
        if (res.sample.length === res.online && looksLikePlayerNames(res.sample)) {
          proc.online = new Set(res.sample);
        }
      } else {
        proc.portAlive = false;
        proc.pinged = null;
        proc.pingMax = null;
      }
      if (`${proc.pinged}|${proc.pingMax}|${proc.portAlive}` !== before) this.emitStatus(id);
    }
  }
  /** 这台是不是代理端（日志识别的措辞要分开） */
  isProxyById(id) {
    const cfg = this.store.getServer(id);
    return Boolean(cfg && isProxyKind(cfg.kind));
  }
  /** ping 回来的信息像不像这台服务器 */
  pingLooksLike(id, res) {
    const cfg = this.store.getServer(id);
    if (!cfg) return false;
    const version = res.version.toLowerCase();
    if (cfg.kind !== "unknown" && version.includes(cfg.kind.toLowerCase())) return true;
    if (cfg.mcVersion && version.includes(cfg.mcVersion.toLowerCase())) return true;
    const motd = res.motd.replace(/[§&]./g, "").toLowerCase();
    return Boolean(cfg.name) && motd.includes(cfg.name.toLowerCase());
  }
  // ---------- 进程资源占用 ----------
  startStatsPolling() {
    if (this.statsTimer) return;
    this.statsTimer = setInterval(() => void this.pollStats(), 5e3);
  }
  stopStatsPollingIfIdle() {
    if (this.statsTimer && this.procs.size && [...this.procs.values()].every((p) => !p.child)) {
      clearInterval(this.statsTimer);
      this.statsTimer = null;
      this.lastStats = {};
    }
  }
  async pollStats() {
    const pids = [];
    for (const p of this.procs.values()) {
      if (p.child?.pid) pids.push(p.child.pid);
    }
    if (!pids.length) {
      this.stopStatsPollingIfIdle();
      return;
    }
    const stats = {};
    if (process.platform === "win32") {
      const script = [
        `$targets = @(${pids.join(",")})`,
        "$all = Get-CimInstance Win32_Process | Select-Object ProcessId,ParentProcessId,WorkingSetSize,KernelModeTime,UserModeTime",
        "$map = @{}",
        "foreach ($p in $all) { $map[[int]$p.ProcessId] = $p }",
        "foreach ($t in $targets) {",
        "  $mem = 0; $cpu = 0",
        "  $queue = New-Object System.Collections.Queue",
        "  $queue.Enqueue([int]$t)",
        "  while ($queue.Count -gt 0) {",
        "    $cur = $queue.Dequeue()",
        "    $p = $map[$cur]",
        "    if ($p -eq $null) { continue }",
        "    $mem += $p.WorkingSetSize",
        "    $cpu += ($p.KernelModeTime + $p.UserModeTime)",
        "    foreach ($c in $all) { if ([int]$c.ParentProcessId -eq $cur) { $queue.Enqueue([int]$c.ProcessId) } }",
        "  }",
        '  "$t|$mem|$($cpu / 10000000)"',
        "}"
      ].join("; ");
      const res = await run("powershell", ["-NoProfile", "-NonInteractive", "-Command", script], {
        timeout: 12e3
      });
      const byPid = /* @__PURE__ */ new Map();
      for (const row of res.stdout.split(/\r?\n/)) {
        const parts = row.trim().split("|");
        if (parts.length < 3) continue;
        const pid = Number(parts[0]);
        const mem = Number(parts[1]);
        const cpuSec = Number(parts[2]);
        if (!Number.isFinite(pid) || !Number.isFinite(mem)) continue;
        byPid.set(pid, { mem, cpu: Number.isFinite(cpuSec) ? cpuSec : 0 });
      }
      for (const [id, p] of this.procs) {
        const pid = p.child?.pid;
        if (pid && byPid.has(pid)) stats[id] = byPid.get(pid);
      }
    } else {
      for (const [id, p] of this.procs) {
        const pid = p.child?.pid;
        if (!pid) continue;
        try {
          const st = await node_fs.promises.readFile(`/proc/${pid}/stat`, "utf-8");
          stats[id] = { mem: 0, cpu: Number(st.split(" ")[13]) / 100 };
        } catch {
        }
      }
    }
    this.lastStats = stats;
    this.events.onStats(stats);
  }
  getStats() {
    return this.lastStats;
  }
  // ---------- EULA ----------
  async acceptEula(id) {
    const cfg = this.store.getServer(id);
    if (!cfg?.dir) return false;
    try {
      await node_fs.promises.writeFile(
        node_path.join(cfg.dir, "eula.txt"),
        `# 由 CraftDesk 生成，同意后即表示你接受 Minecraft EULA (https://aka.ms/MinecraftEULA)
eula=true
`,
        "utf-8"
      );
      const p = this.ensure(id);
      p.issue = null;
      p.issueDetail = "";
      this.emitStatus(id);
      return true;
    } catch {
      return false;
    }
  }
  /** 应用退出时确保所有子进程被回收 */
  async dispose() {
    if (this.statsTimer) {
      clearInterval(this.statsTimer);
      this.statsTimer = null;
    }
    const pids = [];
    for (const p of this.procs.values()) {
      if (p.child?.pid) {
        p.intentionalStop = true;
        pids.push(p.child.pid);
      }
    }
    for (const pid of pids) await this.killTree(pid);
  }
}
const UA$4 = "CraftDesk/1.0 (Minecraft server manager)";
async function getJson$3(url, timeoutMs = 3e4) {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), timeoutMs);
  try {
    const res = await fetch(url, {
      headers: { "User-Agent": UA$4, Accept: "application/json" },
      signal: ctrl.signal
    });
    if (!res.ok) throw new Error(`HTTP ${res.status} ${res.statusText}`);
    return await res.json();
  } finally {
    clearTimeout(timer);
  }
}
function compareMc(a, b) {
  const pa = a.split(".").map((x) => Number(x) || 0);
  const pb = b.split(".").map((x) => Number(x) || 0);
  for (let i = 0; i < Math.max(pa.length, pb.length); i++) {
    const d = (pa[i] ?? 0) - (pb[i] ?? 0);
    if (d) return d;
  }
  return 0;
}
function compareBuild(a, b) {
  const pa = a.split(/[.\-+]/).map((x) => Number(x) || 0);
  const pb = b.split(/[.\-+]/).map((x) => Number(x) || 0);
  for (let i = 0; i < Math.max(pa.length, pb.length); i++) {
    const d = (pa[i] ?? 0) - (pb[i] ?? 0);
    if (d) return d;
  }
  return 0;
}
const FORGE_MAVEN = "https://maven.minecraftforge.net/net/minecraftforge/forge";
async function listForgeVersions() {
  const data = await getJson$3(
    "https://files.minecraftforge.net/net/minecraftforge/forge/promotions_slim.json"
  );
  const byMc = /* @__PURE__ */ new Map();
  for (const [key, ver] of Object.entries(data.promos ?? {})) {
    const m = key.match(/^(.+)-(recommended|latest)$/);
    if (!m) continue;
    const slot = byMc.get(m[1]) ?? {};
    if (m[2] === "recommended") slot.rec = ver;
    else slot.latest = ver;
    byMc.set(m[1], slot);
  }
  return [...byMc.entries()].filter(([, slot]) => slot.rec || slot.latest).map(([mc, slot]) => ({
    id: mc,
    latestBuild: slot.rec ?? slot.latest,
    note: slot.rec ? "recommended" : "latest"
  })).sort((a, b) => compareMc(b.id, a.id));
}
function forgeInstaller(mcVersion, build) {
  const full = `${mcVersion}-${build}`;
  const name = `forge-${full}-installer.jar`;
  return {
    url: `${FORGE_MAVEN}/${full}/${name}`,
    name,
    checksumFile: `${FORGE_MAVEN}/${full}/${name}.sha1`
  };
}
const NEOFORGE_MAVEN = "https://maven.neoforged.net/releases/net/neoforged/neoforge";
async function listNeoForgeVersions() {
  const data = await getJson$3(
    "https://maven.neoforged.net/api/maven/versions/releases/net/neoforged/neoforge"
  );
  const byPrefix = /* @__PURE__ */ new Map();
  for (const v of data.versions ?? []) {
    const m = v.match(/^(\d+\.\d+)\./);
    if (!m) continue;
    byPrefix.set(m[1], [...byPrefix.get(m[1]) ?? [], v]);
  }
  return [...byPrefix.entries()].map(([prefix, list]) => {
    const stable = list.filter((v) => !v.includes("-"));
    const pool = stable.length ? stable : list;
    const pick = pool.slice().sort(compareBuild).pop();
    return {
      id: mcFromNeoPrefix(prefix),
      latestBuild: pick,
      note: pick.includes("-") ? "beta" : "stable"
    };
  }).sort((a, b) => compareMc(b.id, a.id));
}
function mcFromNeoPrefix(prefix) {
  const [a, b] = prefix.split(".");
  if (Number(a) >= 26) return prefix;
  if (!b || b === "0") return `1.${a}`;
  return `1.${a}.${b}`;
}
function neoforgeInstaller(build) {
  const name = `neoforge-${build}-installer.jar`;
  return {
    url: `${NEOFORGE_MAVEN}/${build}/${name}`,
    name,
    checksumFile: `${NEOFORGE_MAVEN}/${build}/${name}.sha1`
  };
}
async function fetchSha1(checksumUrl) {
  try {
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), 15e3);
    const res = await fetch(checksumUrl, { headers: { "User-Agent": UA$4 }, signal: ctrl.signal });
    clearTimeout(timer);
    if (!res.ok) return null;
    const text = (await res.text()).trim();
    return /^[0-9a-f]{40}$/i.test(text) ? text : null;
  } catch {
    return null;
  }
}
async function exists(p) {
  try {
    await node_fs.promises.access(p);
    return true;
  } catch {
    return false;
  }
}
async function findArgsFile(coreDir) {
  const win2 = process.platform === "win32";
  const names = win2 ? ["win_args.txt", "unix_args.txt"] : ["unix_args.txt", "win_args.txt"];
  for (const root of ["libraries/net/minecraftforge/forge", "libraries/net/neoforged/neoforge"]) {
    const base = node_path.join(coreDir, ...root.split("/"));
    let versions;
    try {
      versions = await node_fs.promises.readdir(base);
    } catch {
      continue;
    }
    for (const ver of versions.sort(compareBuild).reverse()) {
      for (const name of names) {
        const p = node_path.join(base, ver, name);
        if (await exists(p)) return p;
      }
    }
  }
  return null;
}
async function findUniversalJar(coreDir) {
  let entries;
  try {
    entries = await node_fs.promises.readdir(coreDir);
  } catch {
    return null;
  }
  const hit = entries.filter((e) => /^forge-.*\.jar$/i.test(e) && !/installer/i.test(e)).sort();
  return hit.length ? node_path.join(coreDir, hit[hit.length - 1]) : null;
}
function classifyJar(fileName) {
  const n = fileName.toLowerCase();
  if (n.includes("velocity")) return "velocity";
  if (n.includes("waterfall")) return "waterfall";
  if (n.includes("bungeecord") || n.includes("bungee")) return "bungeecord";
  if (n.includes("purpur")) return "purpur";
  if (n.includes("paper")) return "paper";
  if (n.includes("spigot")) return "spigot";
  if (n.includes("craftbukkit") || n.includes("bukkit")) return "bukkit";
  if (n.includes("neoforge")) return "neoforge";
  if (n.includes("forge")) return "forge";
  if (n.includes("fabric")) return "fabric";
  if (n.includes("minecraft_server") || n === "server.jar" || n.includes("vanilla")) return "vanilla";
  return "unknown";
}
const KIND_LABEL = {
  vanilla: "原版",
  paper: "Paper",
  purpur: "Purpur",
  spigot: "Spigot",
  fabric: "Fabric",
  forge: "Forge",
  neoforge: "NeoForge",
  bukkit: "Bukkit",
  velocity: "Velocity",
  bungeecord: "BungeeCord",
  waterfall: "Waterfall",
  unknown: "未知"
};
function kindLabel(kind) {
  return KIND_LABEL[kind] || "未知";
}
const KIND_COLOR = {
  vanilla: "#6b7280",
  paper: "#f59e0b",
  purpur: "#a855f7",
  spigot: "#eab308",
  fabric: "#dbb69b",
  forge: "#60a5fa",
  neoforge: "#f97316",
  bukkit: "#84cc16",
  // 代理端统一用青色，和「真正的服务端」在列表里一眼能区分开
  velocity: "#06b6d4",
  bungeecord: "#0891b2",
  waterfall: "#22d3ee",
  unknown: "#64748b"
};
function kindColor(kind) {
  return KIND_COLOR[kind] || "#64748b";
}
function scoreJar(name, hasFabricMarker) {
  const lower = name.toLowerCase();
  if (lower.includes("installer") || lower.includes("setup")) return -100;
  if (lower.includes("sources") || lower.includes("javadoc")) return -80;
  if (lower.includes("fabric-server-launch") || lower.includes("fabric-server-launcher")) return 120;
  if (lower.includes("fabric") && hasFabricMarker) return 115;
  if (lower === "server.jar") return 100;
  if (lower.includes("velocity")) return 95;
  if (lower.includes("waterfall")) return 94;
  if (lower.includes("bungeecord") || lower.includes("bungee")) return 92;
  if (lower.includes("paper")) return 90;
  if (lower.includes("purpur")) return 90;
  if (lower.includes("neoforge")) return 88;
  if (lower.includes("forge")) return 86;
  if (lower.includes("spigot")) return 80;
  if (lower.includes("minecraft_server")) return 76;
  if (lower.startsWith("server")) return 60;
  return classifyJar(name) === "unknown" ? -50 : 40;
}
function scoreScript(name) {
  const n = name.toLowerCase();
  if (/install|update|setup|安装|更新|卸载|uninstall/.test(n)) return -100;
  let score = 0;
  if (/start|run|launch|boot/.test(n)) score += 60;
  if (/启动|开服|运行|开始/.test(name)) score += 60;
  if (/^\[\d+\]/.test(name)) score += 10;
  if (/mcdr|mcdreforged/.test(n)) score += 15;
  return score;
}
async function readTail(file, bytes = 262144) {
  try {
    const st = await node_fs.promises.stat(file);
    if (!st.size) return "";
    const start = Math.max(0, st.size - bytes);
    const fh = await node_fs.promises.open(file, "r");
    try {
      const buf = Buffer.alloc(Math.min(bytes, st.size));
      await fh.read(buf, 0, buf.length, start);
      return buf.toString("utf-8");
    } finally {
      await fh.close();
    }
  } catch {
    return "";
  }
}
async function detectMcVersion(rootDir, coreDir) {
  const dirs = coreDir && coreDir !== rootDir ? [coreDir, rootDir] : [rootDir];
  for (const dir of dirs) {
    const log = await readTail(node_path.join(dir, "logs", "latest.log"));
    const fromLog = log.match(/Starting minecraft server version\s+([0-9][^\s]*)/i) || log.match(/This server is running .*?version\s+([0-9][^\s]+)/i);
    if (fromLog) return fromLog[1].replace(/[^\d.]/g, "");
    for (const f of ["version.json", node_path.join("META-INF", "version.json")]) {
      try {
        const j = JSON.parse(await node_fs.promises.readFile(node_path.join(dir, f), "utf-8"));
        const v = j.name || j.id || j.version;
        if (v) return String(v);
      } catch {
      }
    }
    for (const lib of [
      node_path.join("libraries", "net", "minecraftforge", "forge"),
      node_path.join("libraries", "net", "neoforged", "neoforge")
    ]) {
      try {
        const entries = await node_fs.promises.readdir(node_path.join(dir, lib));
        const m = entries[0]?.match(/^(1\.\d+(?:\.\d+)?)/);
        if (m) return m[1];
      } catch {
      }
    }
    try {
      const entries = await node_fs.promises.readdir(node_path.join(dir, "mods"));
      for (const e of entries) {
        const m = e.match(/(1\.\d{1,2}(?:\.\d{1,2})?)/);
        if (m) return m[1];
      }
    } catch {
    }
    try {
      const entries = await node_fs.promises.readdir(node_path.join(dir, "versions"));
      for (const e of entries) {
        const m = e.match(/^(1\.\d{1,2}(?:\.\d{1,2})?)$/);
        if (m) return m[1];
      }
    } catch {
    }
    try {
      const txt = await node_fs.promises.readFile(node_path.join(dir, "fabric-server-launcher.properties"), "utf-8");
      const m = txt.match(/serverJar\s*=\s*.*?(1\.\d{1,2}(?:\.\d{1,2})?)/);
      if (m) return m[1];
    } catch {
    }
  }
  return "";
}
async function dirSize$1(dir, budgetMs = 1500) {
  const deadline = Date.now() + budgetMs;
  let total = 0;
  const stack = [dir];
  while (stack.length) {
    if (Date.now() > deadline) break;
    const cur = stack.pop();
    let entries;
    try {
      entries = await node_fs.promises.readdir(cur, { withFileTypes: true });
    } catch {
      continue;
    }
    for (const e of entries) {
      const p = node_path.join(cur, e.name);
      if (e.isDirectory()) stack.push(p);
      else {
        try {
          total += (await node_fs.promises.stat(p)).size;
        } catch {
        }
      }
    }
  }
  return total;
}
const SCRIPT_EXT = [".bat", ".sh", ".cmd"];
const NESTED_NAMES = /* @__PURE__ */ new Set([
  "server",
  "core",
  "server_core",
  "mcserver",
  "minecraft",
  "服务器",
  "服务端",
  "核心",
  "服务端核心"
]);
async function scanDir(rel, absDir) {
  const out = {
    jars: [],
    scripts: [],
    markers: { fabric: false, forge: false, neoforge: false, paper: false, purpur: false }
  };
  let entries;
  try {
    entries = await node_fs.promises.readdir(absDir, { withFileTypes: true });
  } catch {
    return out;
  }
  const prefix = rel ? `${rel}/` : "";
  for (const e of entries) {
    if (e.isDirectory()) continue;
    const ext = node_path.extname(e.name).toLowerCase();
    if (ext === ".jar") out.jars.push(prefix + e.name);
    else if (SCRIPT_EXT.includes(ext)) out.scripts.push(prefix + e.name);
  }
  const has = (n) => entries.some((e) => e.name.toLowerCase() === n);
  if (has("fabric-server-launch.jar") || has("fabric-server-launcher.properties")) {
    out.markers.fabric = true;
  }
  try {
    if (node_fs.existsSync(node_path.join(absDir, "libraries", "net", "fabricmc"))) out.markers.fabric = true;
  } catch {
  }
  out.markers.forge = node_fs.existsSync(node_path.join(absDir, "libraries", "net", "minecraftforge"));
  out.markers.neoforge = node_fs.existsSync(node_path.join(absDir, "libraries", "net", "neoforged"));
  out.markers.paper = node_fs.existsSync(node_path.join(absDir, "bukkit.yml")) || node_fs.existsSync(node_path.join(absDir, "spigot.yml"));
  out.markers.purpur = node_fs.existsSync(node_path.join(absDir, "purpur.yml"));
  return out;
}
async function detectServer(dir, opts = {}) {
  const result = {
    dir,
    name: node_path.basename(dir),
    jars: [],
    scripts: [],
    kind: "unknown",
    mcVersion: "",
    suggestedJar: "",
    suggestedScript: "",
    suggestedArgs: "",
    preferScript: false,
    coreDir: "",
    isMcdr: false,
    eulaAccepted: false,
    hasWorld: false,
    port: null,
    motd: null,
    sizeBytes: 0
  };
  const root = await scanDir("", dir);
  const rootIsServer = root.jars.length > 0 || root.markers.fabric || root.markers.forge || root.markers.neoforge || root.markers.paper || root.markers.purpur || node_fs.existsSync(node_path.join(dir, "server.properties")) || node_fs.existsSync(node_path.join(dir, "eula.txt"));
  let coreRel = "";
  let core = root;
  if (!rootIsServer) {
    let candidates = [];
    try {
      candidates = (await node_fs.promises.readdir(dir, { withFileTypes: true })).filter((e) => e.isDirectory() && !e.name.startsWith(".")).map((e) => e.name);
    } catch {
      return result;
    }
    candidates.sort((a, b) => {
      const na = NESTED_NAMES.has(a.toLowerCase()) ? 0 : 1;
      const nb = NESTED_NAMES.has(b.toLowerCase()) ? 0 : 1;
      if (na !== nb) return na - nb;
      return a.localeCompare(b);
    });
    for (const sub of candidates) {
      if (isContentDirName(sub)) continue;
      const scanned = await scanDir(sub, node_path.join(dir, sub));
      if (!scanned.jars.length) continue;
      const hasMarker = scanned.markers.fabric || scanned.markers.forge || scanned.markers.neoforge || scanned.markers.paper || scanned.markers.purpur;
      const best = Math.max(
        ...scanned.jars.map((j) => scoreJar(node_path.basename(j), scanned.markers.fabric))
      );
      if (hasMarker || best >= 60) {
        coreRel = sub;
        core = scanned;
        break;
      }
    }
  }
  result.jars = core.jars;
  result.scripts = [...root.scripts, ...core.scripts];
  result.coreDir = coreRel;
  const argsAbs = await findArgsFile(node_path.join(dir, coreRel));
  result.suggestedArgs = argsAbs ? node_path.relative(dir, argsAbs).split(node_path.sep).join("/") : "";
  let kind = "unknown";
  if (core.markers.fabric) kind = "fabric";
  else if (core.markers.neoforge) kind = "neoforge";
  else if (core.markers.forge) kind = "forge";
  else if (core.markers.purpur) kind = "purpur";
  else if (core.markers.paper) kind = "paper";
  const scored = core.jars.map((name) => ({ name, score: scoreJar(node_path.basename(name), core.markers.fabric) })).sort((a, b) => b.score - a.score);
  if (kind === "unknown" && scored[0]) {
    kind = classifyJar(node_path.basename(scored[0].name));
  }
  result.kind = kind;
  if (kind === "fabric") {
    const launcher = scored.find((s) => /fabric-server-launch/i.test(s.name));
    result.suggestedJar = launcher?.name ?? scored[0]?.name ?? "";
  } else {
    const usable = scored.find((s) => s.score > 0);
    result.suggestedJar = usable?.name ?? "";
  }
  const rankedScripts = result.scripts.map((name) => ({ name, score: scoreScript(node_path.basename(name)) })).sort((a, b) => b.score - a.score || a.name.localeCompare(b.name));
  result.suggestedScript = rankedScripts[0]?.score && rankedScripts[0].score > 0 ? rankedScripts[0].name : "";
  result.preferScript = Boolean(
    result.suggestedScript && !result.suggestedScript.includes("/") && coreRel
  );
  if (coreRel) {
    const mcdr = await readMcdrConfig(dir);
    let hasMcdrPluginPack = false;
    try {
      const entries = await node_fs.promises.readdir(node_path.join(dir, "plugins"), { withFileTypes: true });
      hasMcdrPluginPack = entries.some(
        (e) => e.isFile() && /\.(mcdr|pyz)(\.disabled)?$/i.test(e.name)
      );
    } catch {
    }
    result.isMcdr = mcdr.isMcdr || node_fs.existsSync(node_path.join(dir, "config", "mcdreforged")) || hasMcdrPluginPack;
  }
  const coreAbs = node_path.join(dir, coreRel);
  if (isProxyKind(result.kind)) {
    const meta = await readProxyMeta(coreAbs, result.kind);
    result.port = meta.port;
    result.motd = meta.motd;
    result.eulaAccepted = true;
    result.hasWorld = false;
    result.mcVersion = meta.version;
    if (!opts.skipSize) result.sizeBytes = await dirSize$1(dir);
    return result;
  }
  const eulaDirs = coreRel ? [coreAbs, dir] : [dir];
  for (const d of eulaDirs) {
    try {
      const eula = await node_fs.promises.readFile(node_path.join(d, "eula.txt"), "utf-8");
      result.eulaAccepted = /^\s*eula\s*=\s*true/im.test(eula);
      break;
    } catch {
    }
  }
  let props = [];
  for (const d of eulaDirs) {
    props = await parsePropertiesFile(node_path.join(d, "server.properties"));
    if (props.length) break;
  }
  if (props.length) {
    const get = (k) => props.find((p) => p.key === k)?.value;
    const port = get("server-port");
    result.port = port ? Number(port) : null;
    result.motd = get("motd") ?? null;
    result.hasWorld = node_fs.existsSync(node_path.join(coreAbs, get("level-name") || "world", "level.dat"));
  } else {
    result.hasWorld = node_fs.existsSync(node_path.join(coreAbs, "world", "level.dat"));
  }
  result.mcVersion = await detectMcVersion(dir, coreAbs);
  if (!opts.skipSize) result.sizeBytes = await dirSize$1(dir);
  return result;
}
const SEARCH_DEPTH = 2;
const MAX_CANDIDATES = 60;
function normName(s) {
  return s.trim().toLowerCase().replace(/[\s_\-.]/g, "");
}
function splitAddress(address) {
  const idx = address.lastIndexOf(":");
  if (idx < 0) return { host: address.trim(), port: 0 };
  return {
    host: address.slice(0, idx).replace(/^\[|\]$/g, "").trim(),
    port: Number(address.slice(idx + 1)) || 0
  };
}
function parseBungeeServers(text) {
  const out = [];
  let inServers = false;
  let alias = "";
  let aliasIndent = 0;
  for (const line of text.split(/\r?\n/)) {
    if (!line.trim() || line.trimStart().startsWith("#")) continue;
    const indent = line.length - line.trimStart().length;
    const trimmed = line.trim();
    if (/^servers\s*:\s*$/.test(trimmed)) {
      inServers = true;
      alias = "";
      continue;
    }
    if (!inServers) continue;
    if (indent === 0) {
      inServers = false;
      continue;
    }
    const kv = trimmed.match(/^([^:]+):\s*(.*)$/);
    if (!kv) continue;
    const key = kv[1].trim().replace(/^["']|["']$/g, "");
    const value = kv[2].trim();
    if (value === "") {
      alias = key;
      aliasIndent = indent;
      continue;
    }
    if (key === "address" && alias && indent > aliasIndent) {
      const clean = value.replace(/^["']|["']$/g, "");
      const { host, port } = splitAddress(clean);
      out.push({ name: alias, address: clean, host, port });
    }
  }
  return out;
}
async function collectCandidates(root, skip) {
  const out = [];
  const skipAbs = new Set(skip.map((s) => s.toLowerCase()));
  const walk2 = async (dir, depth) => {
    if (out.length >= MAX_CANDIDATES || depth > SEARCH_DEPTH) return;
    let entries;
    try {
      entries = await node_fs.promises.readdir(dir, { withFileTypes: true });
    } catch {
      return;
    }
    for (const e of entries) {
      if (!e.isDirectory() || e.name.startsWith(".")) continue;
      const full = node_path.join(dir, e.name);
      if (skipAbs.has(full.toLowerCase())) continue;
      out.push(full);
      if (out.length >= MAX_CANDIDATES) return;
      await walk2(full, depth + 1);
    }
  };
  await walk2(root, 1);
  return out;
}
async function readPort(dir) {
  for (const rel of ["server.properties", node_path.join("server", "server.properties")]) {
    const props = await parsePropertiesFile(node_path.join(dir, rel));
    const port = props.find((p) => p.key === "server-port")?.value;
    if (port) {
      const n = Number(port);
      if (Number.isFinite(n)) return n;
    }
  }
  return null;
}
async function managedPorts(managed) {
  const out = /* @__PURE__ */ new Map();
  for (const m of managed) {
    try {
      const layout = await resolveLayout(m);
      const props = await parsePropertiesFile(layout.serverProperties);
      const raw = props.find((p) => p.key === "server-port")?.value;
      const port = Number(raw);
      if (Number.isFinite(port) && port > 0) out.set(port, m);
    } catch {
    }
  }
  return out;
}
async function scanNetworkImport(dir, managed) {
  const proxy = await detectServer(dir);
  if (!isProxyKind(proxy.kind)) {
    throw new Error(
      "这个目录不像代理端。跨服网络的入口是 Velocity / BungeeCord / Waterfall，目录里应该有 velocity.toml 或 config.yml，以及代理端的 jar。"
    );
  }
  let entries = [];
  if (proxy.kind === "velocity") {
    entries = (await readVelocityFile(dir)).servers;
  } else {
    for (const file of ["config.yml", "waterfall.yml"]) {
      try {
        entries = parseBungeeServers(await node_fs.promises.readFile(node_path.join(dir, file), "utf-8"));
        if (entries.length) break;
      } catch {
      }
    }
  }
  const searchRoot = node_path.dirname(dir);
  const known = await managedPorts(managed);
  const candidates = await collectCandidates(searchRoot, [
    dir,
    ...managed.map((m) => m.dir)
  ]);
  const ports = /* @__PURE__ */ new Map();
  for (const c of candidates) ports.set(c, await readPort(c));
  const backends = [];
  const used = /* @__PURE__ */ new Set();
  const show = (p) => {
    const rel = node_path.relative(searchRoot, p);
    return rel && !rel.startsWith("..") ? rel.split(node_path.sep).join("/") : p;
  };
  for (const entry of entries) {
    const { host, port } = splitAddress(entry.address);
    const plan = {
      alias: entry.name,
      address: entry.address,
      host,
      port,
      managedId: null,
      managedName: null,
      dir: null,
      displayDir: "",
      detected: null,
      status: "address-only",
      foundBy: "",
      note: ""
    };
    const already = port ? known.get(port) : void 0;
    if (already) {
      plan.managedId = already.id;
      plan.managedName = already.name;
      plan.dir = already.dir;
      plan.displayDir = show(already.dir);
      plan.status = "managed";
      plan.foundBy = "port";
      plan.note = "已经在列表里";
      backends.push(plan);
      continue;
    }
    let hit = null;
    if (port) hit = candidates.find((c) => ports.get(c) === port) ?? null;
    let foundBy = "port";
    if (!hit) {
      const wanted = normName(entry.name);
      if (wanted.length >= 3) {
        hit = candidates.find(
          (c) => !used.has(c.toLowerCase()) && normName(node_path.basename(c)).includes(wanted)
        ) ?? null;
        if (hit) foundBy = "name";
      }
    }
    if (!hit) {
      plan.note = port ? `附近没有监听 ${port} 的目录（可能在别的机器上，或者还没建）` : "配置里的地址没写端口";
      backends.push(plan);
      continue;
    }
    const detected = await detectServer(hit, { skipSize: true });
    plan.dir = hit;
    plan.displayDir = show(hit);
    used.add(hit.toLowerCase());
    if (detected.kind === "unknown") {
      plan.status = "not-a-server";
      plan.note = "目录里的内容不像服务端";
      backends.push(plan);
      continue;
    }
    plan.detected = detected;
    plan.status = "found";
    plan.foundBy = foundBy;
    plan.note = foundBy === "port" ? `端口 ${port} 与配置一致` : "按目录名猜的，导入前建议核对一下";
    backends.push(plan);
  }
  return { proxy, proxyPort: proxy.port, backends, scanned: candidates.length, searchRoot };
}
const UA$3 = "CraftDesk/1.0 (Minecraft server manager)";
const IMAGE_MIME = {
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".gif": "image/gif",
  ".bmp": "image/bmp"
};
const IMAGE_EXTS = Object.keys(IMAGE_MIME).map((e) => e.slice(1));
const MAX_IMAGE_BYTES = 32 * 1024 * 1024;
async function validateImage(file) {
  const ext = node_path.extname(file).toLowerCase();
  const type = IMAGE_MIME[ext];
  if (!type) {
    throw new Error(
      `不支持的图片格式：${ext || "(没有扩展名)"}，请用 ${IMAGE_EXTS.join(" / ")}`
    );
  }
  let st;
  try {
    st = await node_fs.promises.stat(file);
  } catch {
    throw new Error("找不到这个文件");
  }
  if (!st.isFile()) throw new Error("选中的不是文件");
  if (st.size === 0) throw new Error("这个文件是空的");
  if (st.size > MAX_IMAGE_BYTES) {
    throw new Error(
      `图片太大了（${(st.size / 1024 / 1024).toFixed(1)} MB），请换一张 ${Math.round(
        MAX_IMAGE_BYTES / 1024 / 1024
      )} MB 以内的`
    );
  }
  return { type, ext, bytes: st.size };
}
const REMOTE_CACHE_MAX = 120;
const MAX_REMOTE_ICON_BYTES = 5 * 1024 * 1024;
const REMOTE_TIMEOUT = 15e3;
const remoteCache = /* @__PURE__ */ new Map();
function assertRemoteImageUrl(raw) {
  let url;
  try {
    url = new URL(raw);
  } catch {
    throw new Error(`图片地址不合法：${raw || "(空)"}`);
  }
  if (url.protocol !== "https:") {
    throw new Error(`只允许 https 图片地址，收到的是 ${url.protocol}`);
  }
  return url;
}
async function fetchImageDataUrl(raw) {
  const url = assertRemoteImageUrl(raw);
  const key = url.href;
  const hit = remoteCache.get(key);
  if (hit) {
    remoteCache.delete(key);
    remoteCache.set(key, hit);
    return { ...hit, cached: true };
  }
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), REMOTE_TIMEOUT);
  let res;
  try {
    res = await fetch(key, { headers: { "User-Agent": UA$3 }, signal: ctrl.signal });
  } catch (err) {
    throw new Error(`图片下载失败：${err.message}`);
  } finally {
    clearTimeout(timer);
  }
  if (!res.ok) throw new Error(`图片下载失败：HTTP ${res.status}`);
  const type = (res.headers.get("content-type") ?? "").split(";")[0].trim();
  if (!type.startsWith("image/")) {
    throw new Error(`这个地址返回的不是图片（${type || "没有 content-type"}）`);
  }
  const declared = Number(res.headers.get("content-length") ?? 0);
  if (declared > MAX_REMOTE_ICON_BYTES) {
    throw new Error(`图片太大（${(declared / 1024 / 1024).toFixed(1)} MB），已跳过`);
  }
  const buf = Buffer.from(await res.arrayBuffer());
  if (buf.byteLength > MAX_REMOTE_ICON_BYTES) {
    throw new Error(`图片太大（${(buf.byteLength / 1024 / 1024).toFixed(1)} MB），已跳过`);
  }
  const data = {
    dataUrl: `data:${type};base64,${buf.toString("base64")}`,
    bytes: buf.byteLength
  };
  remoteCache.set(key, data);
  while (remoteCache.size > REMOTE_CACHE_MAX) {
    const oldest = remoteCache.keys().next().value;
    if (oldest === void 0) break;
    remoteCache.delete(oldest);
  }
  return { ...data, cached: false };
}
async function readImageDataUrl(file) {
  const { type } = await validateImage(file);
  const buf = await node_fs.promises.readFile(file);
  return { dataUrl: `data:${type};base64,${buf.toString("base64")}`, bytes: buf.byteLength };
}
const ICON_TEXT_SCHEME = "text:";
const ICON_FILE_SCHEME = "file:";
const ICON_TEXT_MAX = 2;
const ICON_NAME_MAX = 120;
function normalizeIconText(raw) {
  return Array.from(raw.trim()).slice(0, ICON_TEXT_MAX).join("");
}
function isSafeIconName(name) {
  if (!name || name.length > ICON_NAME_MAX) return false;
  if (name.includes("..")) return false;
  if (/[\\/:*?"<>|]/.test(name)) return false;
  return /^[A-Za-z0-9._-]+$/.test(name);
}
function parseIcon(icon) {
  const raw = (icon ?? "").trim();
  if (!raw) return { kind: "initials" };
  if (raw.startsWith(ICON_TEXT_SCHEME)) {
    const text = normalizeIconText(raw.slice(ICON_TEXT_SCHEME.length));
    return text ? { kind: "text", text } : { kind: "initials" };
  }
  if (raw.startsWith(ICON_FILE_SCHEME)) {
    const name = raw.slice(ICON_FILE_SCHEME.length).trim();
    return isSafeIconName(name) ? { kind: "image", name } : { kind: "initials" };
  }
  return { kind: "initials" };
}
function iconFileName(serverId, ext) {
  const safe = (serverId || "").replace(/[^A-Za-z0-9-]/g, "");
  const suffix = ext.startsWith(".") ? ext : `.${ext}`;
  return `${safe || "server"}${suffix}`.toLowerCase();
}
function iconNamePrefix(serverId) {
  const safe = (serverId || "").replace(/[^A-Za-z0-9-]/g, "");
  return `${safe || "server"}.`;
}
const ICONS_SUBDIR = "icons";
function iconsDir(userData) {
  return node_path.join(userData, ICONS_SUBDIR);
}
function iconAbsPath(userData, name) {
  if (!isSafeIconName(name)) throw new Error(`图标文件名不合法：${name}`);
  return node_path.join(iconsDir(userData), name);
}
async function readIcon(userData, name) {
  return readImageDataUrl(iconAbsPath(userData, name));
}
async function removeOtherIcons(userData, serverId, keep = "") {
  const dir = iconsDir(userData);
  const prefix = iconNamePrefix(serverId);
  let names;
  try {
    names = await node_fs.promises.readdir(dir);
  } catch {
    return [];
  }
  const removed = [];
  for (const name of names) {
    if (name === keep) continue;
    if (!name.startsWith(prefix)) continue;
    try {
      await node_fs.promises.unlink(node_path.join(dir, name));
      removed.push(name);
    } catch {
    }
  }
  return removed;
}
async function removeIcon(userData, name) {
  if (!isSafeIconName(name)) return false;
  try {
    await node_fs.promises.unlink(iconAbsPath(userData, name));
    return true;
  } catch {
    return false;
  }
}
async function importIcon(userData, serverId, srcPath) {
  const { ext, bytes } = await validateImage(srcPath);
  const dir = iconsDir(userData);
  await node_fs.promises.mkdir(dir, { recursive: true });
  const name = iconFileName(serverId, ext);
  const dest = node_path.join(dir, name);
  if (node_path.resolve(srcPath) !== node_path.resolve(dest)) {
    await node_fs.promises.copyFile(srcPath, dest);
  }
  await removeOtherIcons(userData, serverId, name);
  return { name, bytes };
}
async function readJsonArray(file) {
  try {
    const raw = await node_fs.promises.readFile(file, "utf-8");
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}
async function writeJsonArray(file, data) {
  await node_fs.promises.writeFile(file, JSON.stringify(data, null, 2), "utf-8");
}
async function listPlayers(dir, online) {
  if (!dir) return [];
  const [ops, whitelist, banned, cache] = await Promise.all([
    readJsonArray(node_path.join(dir, "ops.json")),
    readJsonArray(node_path.join(dir, "whitelist.json")),
    readJsonArray(node_path.join(dir, "banned-players.json")),
    readJsonArray(node_path.join(dir, "usercache.json"))
  ]);
  const map = /* @__PURE__ */ new Map();
  const ensure = (name) => {
    let r = map.get(name);
    if (!r) {
      r = { name, online: false, op: false, whitelisted: false, banned: false };
      map.set(name, r);
    }
    return r;
  };
  for (const e of cache) if (e.name) ensure(e.name).uuid = e.uuid;
  for (const e of whitelist) if (e.name) ensure(e.name).whitelisted = true;
  for (const e of banned) if (e.name) ensure(e.name).banned = true;
  for (const e of ops) if (e.name) ensure(e.name).op = true;
  for (const name of online) ensure(name).online = true;
  const list = [...map.values()];
  list.sort((a, b) => {
    if (a.online !== b.online) return a.online ? -1 : 1;
    if (a.op !== b.op) return a.op ? -1 : 1;
    if (a.whitelisted !== b.whitelisted) return a.whitelisted ? -1 : 1;
    return a.name.localeCompare(b.name);
  });
  return list;
}
async function setOp(dir, name, value) {
  const file = node_path.join(dir, "ops.json");
  const ops = await readJsonArray(file);
  const idx = ops.findIndex((o) => o.name?.toLowerCase() === name.toLowerCase());
  if (value && idx < 0) {
    ops.push({
      uuid: await lookupUuid(dir, name),
      name,
      level: 4,
      bypassesPlayerLimit: false
    });
  } else if (!value && idx >= 0) {
    ops.splice(idx, 1);
  }
  await writeJsonArray(file, ops);
}
async function setWhitelist(dir, name, value) {
  const file = node_path.join(dir, "whitelist.json");
  const wl = await readJsonArray(file);
  const idx = wl.findIndex((o) => o.name?.toLowerCase() === name.toLowerCase());
  if (value && idx < 0) {
    wl.push({ uuid: await lookupUuid(dir, name), name });
  } else if (!value && idx >= 0) {
    wl.splice(idx, 1);
  }
  await writeJsonArray(file, wl);
}
async function setBanned(dir, name, value) {
  const file = node_path.join(dir, "banned-players.json");
  const list = await readJsonArray(file);
  const idx = list.findIndex((o) => o.name?.toLowerCase() === name.toLowerCase());
  if (value && idx < 0) {
    list.push({
      uuid: await lookupUuid(dir, name),
      name,
      created: (/* @__PURE__ */ new Date()).toISOString(),
      source: "CraftDesk",
      expires: "forever",
      reason: "手动封禁"
    });
  } else if (!value && idx >= 0) {
    list.splice(idx, 1);
  }
  await writeJsonArray(file, list);
}
async function lookupUuid(dir, name) {
  const cache = await readJsonArray(node_path.join(dir, "usercache.json"));
  const hit = cache.find((c) => c.name?.toLowerCase() === name.toLowerCase());
  return hit?.uuid ?? "";
}
const EOCD_SIG = 101010256;
const CD_SIG = 33639248;
class ZipReader {
  constructor(src, entries, closer) {
    this.src = src;
    this.entries = entries;
    this.closer = closer;
  }
  static async open(file) {
    let fh = null;
    try {
      fh = await node_fs.promises.open(file, "r");
      const st = await fh.stat();
      const src = {
        size: st.size,
        readAt: async (pos, len) => {
          const buf = Buffer.alloc(len);
          if (len > 0) await fh.read(buf, 0, len, pos);
          return buf;
        }
      };
      const entries = await readCentralDirectory(src);
      if (!entries) {
        await fh.close();
        return null;
      }
      return new ZipReader(src, entries, async () => {
        await fh.close();
      });
    } catch {
      try {
        await fh?.close();
      } catch {
      }
      return null;
    }
  }
  /** 直接读内存里的一份 zip（嵌套 jar 用） */
  static async openBuffer(buf) {
    const src = {
      size: buf.length,
      readAt: async (pos, len) => buf.subarray(pos, pos + len)
    };
    const entries = await readCentralDirectory(src);
    return entries ? new ZipReader(src, entries, null) : null;
  }
  list() {
    return this.entries.map((e) => e.name);
  }
  has(name) {
    return this.entries.some((e) => e.name === name);
  }
  /** 读取一个条目，找不到或解压失败返回 null */
  async read(name, maxBytes = 512 * 1024) {
    const raw = await this.readBuffer(name, maxBytes);
    return raw ? raw.toString("utf-8") : null;
  }
  /** 读原始字节（嵌套 jar 要靠它） */
  async readBuffer(name, maxBytes = 8 * 1024 * 1024) {
    const entry = this.entries.find((e) => e.name === name);
    if (!entry) return null;
    if (entry.uncompressedSize > maxBytes) return null;
    try {
      const header = await this.src.readAt(entry.localOffset, 30);
      const nameLen = header.readUInt16LE(26);
      const extraLen = header.readUInt16LE(28);
      const dataStart = entry.localOffset + 30 + nameLen + extraLen;
      const raw = entry.compressedSize > 0 ? await this.src.readAt(dataStart, entry.compressedSize) : Buffer.alloc(0);
      if (entry.method === 0) return raw;
      if (entry.method === 8) return node_zlib.inflateRawSync(raw);
      return null;
    } catch {
      return null;
    }
  }
  async close() {
    await this.closer?.();
  }
}
async function readCentralDirectory(src) {
  if (src.size < 22) return null;
  const tailLen = Math.min(src.size, 65558);
  const tail = await src.readAt(src.size - tailLen, tailLen);
  let eocd = -1;
  for (let i = tail.length - 22; i >= 0; i--) {
    if (tail.readUInt32LE(i) === EOCD_SIG) {
      eocd = i;
      break;
    }
  }
  if (eocd < 0) return null;
  const count = tail.readUInt16LE(eocd + 10);
  const cdSize = tail.readUInt32LE(eocd + 12);
  const cdOffset = tail.readUInt32LE(eocd + 16);
  if (count === 65535 || cdOffset === 4294967295 || cdSize === 4294967295) return null;
  const cd = await src.readAt(cdOffset, cdSize);
  const entries = [];
  let p = 0;
  while (p + 46 <= cd.length && cd.readUInt32LE(p) === CD_SIG) {
    const method = cd.readUInt16LE(p + 10);
    const compressedSize = cd.readUInt32LE(p + 20);
    const uncompressedSize = cd.readUInt32LE(p + 24);
    const nameLen = cd.readUInt16LE(p + 28);
    const extraLen = cd.readUInt16LE(p + 30);
    const commentLen = cd.readUInt16LE(p + 32);
    const localOffset = cd.readUInt32LE(p + 42);
    const name = cd.subarray(p + 46, p + 46 + nameLen).toString("utf-8");
    entries.push({ name, method, compressedSize, uncompressedSize, localOffset });
    p += 46 + nameLen + extraLen + commentLen;
  }
  return entries;
}
function parseSimpleYaml(text) {
  const out = {};
  for (const line of text.split(/\r?\n/)) {
    if (!line.trim() || line.trimStart().startsWith("#")) continue;
    const m = line.match(/^([A-Za-z_][\w.-]*)\s*:\s*(.*)$/);
    if (!m) continue;
    let value = m[2].trim();
    if (value.startsWith('"') && value.endsWith('"') || value.startsWith("'") && value.endsWith("'")) {
      value = value.slice(1, -1);
    }
    out[m[1]] = value;
  }
  return out;
}
function yamlList(text, key) {
  const lines = text.split(/\r?\n/);
  for (let i = 0; i < lines.length; i++) {
    const m = lines[i].match(/^([A-Za-z_][\w.-]*)\s*:\s*(.*)$/);
    if (!m || m[1] !== key) continue;
    const inline = m[2].trim();
    if (inline) {
      const bracket = inline.match(/^\[(.*)\]$/);
      const body = bracket ? bracket[1] : inline;
      return body.split(",").map((s) => s.trim().replace(/^["']|["']$/g, "")).filter(Boolean);
    }
    const out = [];
    for (let j = i + 1; j < lines.length; j++) {
      const line = lines[j];
      if (!line.trim() || line.trimStart().startsWith("#")) continue;
      const item = line.match(/^\s+-\s*(.+?)\s*$/);
      if (!item) break;
      out.push(item[1].replace(/^["']|["']$/g, ""));
    }
    return out;
  }
  return [];
}
const emptyMeta = () => ({
  id: "",
  name: "",
  version: "",
  author: "",
  description: "",
  depends: [],
  softDepends: [],
  provides: [],
  breaks: [],
  ranges: {},
  side: "unknown",
  broken: false
});
function parseJson(text) {
  const clean = text.replace(/^﻿/, "");
  try {
    return JSON.parse(clean);
  } catch {
    try {
      return JSON.parse(escapeControlChars(clean));
    } catch {
      return null;
    }
  }
}
const CONTROL_ESCAPES = {
  "\n": "\\n",
  "\r": "\\r",
  "	": "\\t",
  "\b": "\\b",
  "\f": "\\f"
};
function escapeControlChars(text) {
  let out = "";
  let inString = false;
  let escaped = false;
  for (const ch of text) {
    const code = ch.charCodeAt(0);
    if (inString) {
      if (escaped) {
        out += ch;
        escaped = false;
        continue;
      }
      if (ch === "\\") {
        out += ch;
        escaped = true;
        continue;
      }
      if (ch === '"') {
        out += ch;
        inString = false;
        continue;
      }
      if (code < 32) {
        out += CONTROL_ESCAPES[ch] ?? `\\u${code.toString(16).padStart(4, "0")}`;
        continue;
      }
      out += ch;
      continue;
    }
    if (ch === '"') inString = true;
    out += ch;
  }
  return out;
}
function pickLocalized(value) {
  if (!value) return "";
  if (typeof value === "string") return value;
  if (typeof value !== "object") return "";
  const obj = value;
  for (const key of ["zh_cn", "zh_CN", "zh", "en_us", "en_US", "en"]) {
    const v = obj[key];
    if (typeof v === "string" && v.trim()) return v;
  }
  for (const v of Object.values(obj)) {
    if (typeof v === "string" && v.trim()) return v;
  }
  return "";
}
function pickAuthor(value) {
  if (typeof value === "string") return value;
  if (Array.isArray(value)) {
    return value.map((a) => typeof a === "string" ? a : a?.name ?? "").filter(Boolean).join(", ");
  }
  return "";
}
function readDepends(value) {
  const ids = [];
  const ranges = {};
  if (Array.isArray(value)) {
    for (const v of value) if (typeof v === "string" && v.trim()) ids.push(v.trim());
    return { ids, ranges };
  }
  if (value && typeof value === "object") {
    for (const [k, v] of Object.entries(value)) {
      ids.push(k);
      if (typeof v === "string" && v.trim()) ranges[k] = v.trim();
    }
  }
  return { ids, ranges };
}
function parseFabricMeta(json) {
  const j = parseJson(json);
  if (!j) return null;
  const meta = emptyMeta();
  meta.id = typeof j.id === "string" ? j.id : "";
  meta.name = (typeof j.name === "string" ? j.name : "") || meta.id;
  meta.version = typeof j.version === "string" ? j.version : "";
  meta.author = pickAuthor(j.authors);
  meta.description = pickLocalized(j.description);
  const hard = readDepends(j.depends);
  const reco = readDepends(j.recommends);
  const sugg = readDepends(j.suggests);
  meta.depends = hard.ids;
  meta.softDepends = [...reco.ids, ...sugg.ids].filter((id) => !hard.ids.includes(id));
  meta.ranges = { ...hard.ranges, ...reco.ranges };
  const env = typeof j.environment === "string" ? j.environment.trim().toLowerCase() : "";
  meta.side = env === "client" ? "client" : env === "server" ? "server" : "both";
  const provides = readDepends(j.provides);
  meta.provides = provides.ids;
  meta.breaks = [...readDepends(j.breaks).ids, ...readDepends(j.conflicts).ids];
  return meta;
}
function parseModsToml(text) {
  const meta = emptyMeta();
  let section = "";
  const values = {};
  const deps = [];
  let cur = null;
  const unquote2 = (s) => s.trim().replace(/^["']|["']$/g, "");
  for (const rawLine of text.split(/\r?\n/)) {
    const line = rawLine.replace(/\s+#.*$/, "").trim();
    if (!line || line.startsWith("#")) continue;
    const header = line.match(/^\[\[(.+?)\]\]$/);
    if (header) {
      if (cur) deps.push(cur);
      const name = header[1].trim();
      if (name.startsWith("dependencies.")) cur = { id: "", mandatory: true, range: "" };
      else cur = null;
      section = name;
      continue;
    }
    if (/^\[.+?\]$/.test(line)) {
      if (cur) {
        deps.push(cur);
        cur = null;
      }
      section = line.slice(1, -1).trim();
      continue;
    }
    const kv = line.match(/^([A-Za-z_][\w.]*)\s*=\s*(.*)$/);
    if (!kv) continue;
    const key = kv[1];
    const value = unquote2(kv[2]);
    if (cur) {
      if (key === "modId") cur.id = value;
      else if (key === "mandatory") cur.mandatory = value !== "false";
      else if (key === "versionRange") cur.range = value;
      continue;
    }
    if (section === "mods" || section.startsWith("mods.")) {
      if (key === "modId" && !values.modId) values.modId = value;
      else if (key === "displayName" && !values.displayName) values.displayName = value;
      else if (key === "version" && !values.version) values.version = value;
      else if (key === "description" && !values.description) values.description = value;
      else if (key === "authors" && !values.authors) values.authors = value;
    }
  }
  if (cur) deps.push(cur);
  meta.id = values.modId ?? "";
  meta.name = values.displayName || values.modId || "";
  meta.version = values.version ?? "";
  meta.author = values.authors ?? "";
  meta.description = values.description ?? "";
  for (const d of deps) {
    if (!d.id) continue;
    if (d.mandatory) {
      meta.depends.push(d.id);
      if (d.range) meta.ranges[d.id] = d.range;
    } else {
      meta.softDepends.push(d.id);
    }
  }
  return meta;
}
function parseMcmodInfo(json) {
  const j = parseJson(json);
  if (!j) return null;
  const first = Array.isArray(j) ? j[0] : j?.modList?.[0];
  if (!first) return null;
  const meta = emptyMeta();
  meta.id = String(first.modid ?? "");
  meta.name = String(first.name ?? first.modid ?? "");
  meta.version = String(first.version ?? "");
  meta.author = pickAuthor(first.authorList) || String(first.author ?? "");
  meta.description = String(first.description ?? "");
  return meta;
}
function parseBukkitMeta(text) {
  const y = parseSimpleYaml(text);
  const meta = emptyMeta();
  meta.side = "server";
  meta.id = y.name || y.id || "";
  meta.name = y.name || y.id || "";
  meta.version = y.version || "";
  meta.author = y.authors || y.author || "";
  meta.description = y.description || "";
  const soft = yamlList(text, "softdepend");
  meta.depends = yamlList(text, "depend").filter(Boolean);
  meta.softDepends = [...soft, ...yamlList(text, "loadbefore")].filter(
    (id) => !meta.depends.includes(id)
  );
  meta.provides = yamlList(text, "provides");
  return meta;
}
function parseVelocityMeta(json) {
  const j = parseJson(json);
  if (!j) return null;
  const meta = emptyMeta();
  meta.id = typeof j.id === "string" ? j.id : "";
  meta.name = (typeof j.name === "string" ? j.name : "") || meta.id;
  meta.version = typeof j.version === "string" ? j.version : "";
  meta.author = pickAuthor(j.authors);
  meta.description = pickLocalized(j.description);
  meta.side = "server";
  const deps = j.dependencies;
  if (Array.isArray(deps)) {
    for (const d of deps) {
      const entry = d;
      if (typeof entry?.id !== "string") continue;
      if (entry.optional) meta.softDepends.push(entry.id);
      else meta.depends.push(entry.id);
    }
  }
  return meta;
}
function parseMcdrDeps(rawDeps) {
  const hard = [];
  const ranges = {};
  if (Array.isArray(rawDeps)) {
    for (const d of rawDeps) if (typeof d === "string") hard.push(d);
  } else if (rawDeps && typeof rawDeps === "object") {
    for (const [k, v] of Object.entries(rawDeps)) {
      hard.push(k);
      if (typeof v === "string") ranges[k] = v;
      else if (v && typeof v === "object") {
        const pred = v.predicate;
        if (typeof pred === "string") ranges[k] = pred;
      }
    }
  }
  return {
    hard: hard.filter((d) => d !== "mcdreforged"),
    ranges
  };
}
async function readJarMeta(jarPath) {
  const zip = await ZipReader.open(jarPath);
  if (!zip) return { ...emptyMeta(), broken: true };
  try {
    if (!zip.list().length) return { ...emptyMeta(), broken: true };
    const vpj = await zip.read("velocity-plugin.json");
    if (vpj) {
      const m = parseVelocityMeta(vpj);
      if (m) return m;
    }
    for (const f of ["bungee.yml", "plugin.yml", "paper-plugin.yml", "bukkit.yml"]) {
      const text = await zip.read(f);
      if (text) return parseBukkitMeta(text);
    }
    const fmj = await zip.read("fabric.mod.json");
    if (fmj) {
      const m = parseFabricMeta(fmj);
      if (m) {
        for (const id of await nestedIds(zip, "META-INF/jars/")) m.provides.push(id);
        m.provides = [...new Set(m.provides)];
        return m;
      }
    }
    for (const f of ["META-INF/neoforge.mods.toml", "META-INF/mods.toml"]) {
      const text = await zip.read(f);
      if (text) {
        const m = parseModsToml(text);
        for (const id of await jarJarIds(zip)) m.provides.push(id);
        m.provides = [...new Set(m.provides)];
        return m;
      }
    }
    const mcmod = await zip.read("mcmod.info");
    if (mcmod) {
      const m = parseMcmodInfo(mcmod);
      if (m) return m;
    }
    return emptyMeta();
  } finally {
    await zip.close();
  }
}
async function nestedIds(zip, prefix) {
  const out = [];
  for (const name of zip.list()) {
    if (!name.startsWith(prefix) || !name.toLowerCase().endsWith(".jar")) continue;
    const buf = await zip.readBuffer(name, 4 * 1024 * 1024);
    if (!buf) continue;
    const inner = await ZipReader.openBuffer(buf);
    if (!inner) continue;
    try {
      const json = await inner.read("fabric.mod.json", 256 * 1024);
      if (!json) continue;
      const m = parseFabricMeta(json);
      if (m?.id) {
        out.push(m.id, ...m.provides);
      }
    } finally {
      await inner.close();
    }
  }
  return out;
}
async function jarJarIds(zip) {
  const raw = await zip.read("META-INF/jarjar/metadata.json");
  if (!raw) return [];
  let paths = [];
  try {
    const j = JSON.parse(raw);
    paths = (j.jars ?? []).map((e) => typeof e?.path === "string" ? e.path : "").filter(Boolean);
  } catch {
    return [];
  }
  const out = [];
  for (const p of paths) {
    const buf = await zip.readBuffer(p, 8 * 1024 * 1024);
    if (!buf) continue;
    const inner = await ZipReader.openBuffer(buf);
    if (!inner) continue;
    try {
      for (const f of ["META-INF/neoforge.mods.toml", "META-INF/mods.toml"]) {
        const text = await inner.read(f, 512 * 1024);
        if (!text) continue;
        const m = parseModsToml(text);
        if (m.id) out.push(m.id);
        break;
      }
    } finally {
      await inner.close();
    }
  }
  return out;
}
const PLATFORM_IDS = /* @__PURE__ */ new Set([
  "minecraft",
  "java",
  "forge",
  "neoforge",
  "fml",
  "fabricloader",
  "fabric",
  "quilt_loader",
  "bukkit",
  "craftbukkit",
  "spigot",
  "paper",
  "purpur",
  "folia",
  "velocity",
  "bungeecord",
  "waterfall",
  "mcdreforged",
  // MCDR 插件的 dependencies 里可以写 python 运行时要求（KPI 就这么写的）
  "python",
  "python3",
  "sponge",
  "server"
]);
function normId(id) {
  return id.trim().toLowerCase();
}
function buildRelations(items) {
  const offer = /* @__PURE__ */ new Map();
  for (const item of items) {
    const ids = /* @__PURE__ */ new Set();
    if (item.id) ids.add(normId(item.id));
    for (const p of item.provides) ids.add(normId(p));
    for (const id of ids) {
      if (!offer.has(id)) offer.set(id, []);
      offer.get(id).push(item);
    }
  }
  const issues = /* @__PURE__ */ new Map();
  const addIssue = (kind, id, by, provider) => {
    const key = `${kind}:${normId(id)}`;
    const found = issues.get(key);
    if (found) {
      if (!found.neededBy.includes(by)) found.neededBy.push(by);
      return;
    }
    issues.set(key, { kind, id, neededBy: [by], provider });
  };
  for (const item of items) {
    const edges = [];
    const seen = /* @__PURE__ */ new Set();
    const addEdge = (rawId, hard) => {
      const id = rawId.trim();
      if (!id || seen.has(normId(id))) return;
      seen.add(normId(id));
      const range = item.ranges[id] ?? "";
      const key = normId(id);
      if (PLATFORM_IDS.has(key)) {
        edges.push({ id, hard, range, state: "platform", provider: null, providerName: null });
        return;
      }
      const candidates = offer.get(key) ?? [];
      const enabled = candidates.find((c) => c.enabled);
      const pick = enabled ?? candidates[0];
      if (!pick) {
        edges.push({ id, hard, range, state: "missing", provider: null, providerName: null });
        if (hard) addIssue("missing", id, item.path, null);
        return;
      }
      edges.push({
        id,
        hard,
        range,
        state: pick.enabled ? "ok" : "disabled",
        provider: pick.path,
        providerName: pick.name
      });
      if (!pick.enabled && hard) addIssue("disabled", id, item.path, pick.path);
    };
    for (const id of item.depends) addEdge(id, true);
    for (const id of item.softDepends) addEdge(id, false);
    item.requires = edges;
  }
  const usedBy = /* @__PURE__ */ new Map();
  for (const item of items) {
    for (const edge of item.requires) {
      if (!edge.provider || edge.id === item.id) continue;
      if (!usedBy.has(edge.provider)) usedBy.set(edge.provider, []);
      usedBy.get(edge.provider).push({ path: item.path, name: item.name, soft: !edge.hard });
    }
  }
  for (const item of items) {
    item.usedBy = usedBy.get(item.path) ?? [];
  }
  const list = [...issues.values()];
  list.sort((a, b) => a.kind === b.kind ? a.id.localeCompare(b.id) : a.kind === "missing" ? -1 : 1);
  return list;
}
function norm(p) {
  const full = node_path.resolve(p);
  return process.platform === "win32" ? full.toLowerCase() : full;
}
function samePath(a, b) {
  return norm(a) === norm(b);
}
function isInside(parent, child) {
  const p = norm(parent);
  const c = norm(child);
  return c !== p && c.startsWith(p.endsWith(node_path.sep) ? p : p + node_path.sep);
}
function whyNotDeletable(dir, protectedDirs = []) {
  if (!dir || !dir.trim()) return "这台服务器没有记录目录";
  const full = node_path.resolve(dir);
  const parsed = node_path.parse(full);
  if (full === parsed.root || full + node_path.sep === parsed.root) {
    return `${full} 是磁盘根目录，不像是服务器目录`;
  }
  const depth = full.slice(parsed.root.length).split(node_path.sep).filter(Boolean).length;
  if (depth < 2) {
    return `${full} 直接挂在磁盘根目录下，删掉它可能牵连别的文件夹。确实要删这个目录的话，请在资源管理器里手动删。`;
  }
  if (samePath(full, node_os.homedir())) return "这是当前用户的主目录";
  for (const p of protectedDirs) {
    if (!p) continue;
    if (samePath(full, p)) return `${full} 是 CraftDesk 自己的数据目录`;
    if (isInside(full, p)) return `CraftDesk 的数据目录（${p}）在它里面，删除会连带丢失服务器列表`;
  }
  return null;
}
async function trashDirectory(dir, trash) {
  const full = node_path.resolve(dir);
  let st;
  try {
    st = await node_fs.promises.stat(full);
  } catch {
    throw new Error(`目录不存在：${full}`);
  }
  if (!st.isDirectory()) throw new Error(`${full} 不是目录`);
  try {
    await trash(full);
  } catch (err) {
    throw new Error(
      `${full} 无法移入回收站（${err instanceof Error ? err.message : String(err)}），已取消删除。需要的话请手动删除这个目录。`
    );
  }
}
function emptyRelations() {
  return {
    depends: [],
    softDepends: [],
    provides: [],
    breaks: [],
    ranges: {},
    broken: false,
    // MCDR 插件跑在服务端的包装层里，属于服务端侧
    side: "server",
    requires: [],
    usedBy: []
  };
}
function parseMcdrMeta(raw) {
  try {
    const j = JSON.parse(raw);
    const { hard, ranges } = parseMcdrDeps(j.dependencies);
    return {
      id: typeof j.id === "string" ? j.id : "",
      name: typeof j.name === "string" ? j.name : "",
      version: typeof j.version === "string" ? j.version : "",
      author: pickAuthor(j.author),
      description: pickLocalized(j.description),
      dependencies: hard,
      ranges
    };
  } catch {
    return {};
  }
}
function parsePyMetadata(text) {
  const block = text.match(/PLUGIN_METADATA\s*=\s*\{[\s\S]*?\n\}/);
  if (!block) return {};
  const body = block[0];
  const get = (key) => body.match(new RegExp(`['"]${key}['"]\\s*:\\s*['"]([^'"]*)['"]`))?.[1] ?? "";
  const depsBlock = body.match(/['"]dependencies['"]\s*:\s*\[([\s\S]*?)\]/);
  const dependencies = depsBlock ? [...depsBlock[1].matchAll(/['"]([^'"]+)['"]/g)].map((m) => m[1]).filter((d) => d !== "mcdreforged") : [];
  return {
    id: get("id"),
    version: get("version"),
    author: get("author"),
    description: get("description"),
    dependencies,
    ranges: {}
  };
}
const MCDR_META_NAMES = ["mcdreforged.plugin.json", "mcdr.plugin.json"];
async function readMcdrPackMeta(file) {
  const zip = await ZipReader.open(file);
  if (!zip) return {};
  try {
    for (const name of MCDR_META_NAMES) {
      const raw = await zip.read(name);
      if (raw) return parseMcdrMeta(raw);
    }
    const nested = zip.list().find((n) => MCDR_META_NAMES.some((m) => n.endsWith(`/${m}`)));
    if (nested) {
      const raw = await zip.read(nested);
      if (raw) return parseMcdrMeta(raw);
    }
    return {};
  } finally {
    await zip.close();
  }
}
async function readMcdrDirMeta(dir) {
  for (const name of MCDR_META_NAMES) {
    try {
      return parseMcdrMeta(await node_fs.promises.readFile(node_path.join(dir, name), "utf-8"));
    } catch {
    }
  }
  return {};
}
async function scanMcdrPlugins(layout, dir, groupRel) {
  const out = [];
  let entries;
  try {
    entries = await node_fs.promises.readdir(dir, { withFileTypes: true });
  } catch {
    return out;
  }
  const packExts = [".mcdr", ".pyz"];
  for (const e of entries) {
    if (e.isDirectory()) {
      if (e.name.startsWith(".") || e.name === "__pycache__") continue;
      const full2 = node_path.join(dir, e.name);
      const disabled2 = e.name.endsWith(".disabled");
      let meta2 = {};
      try {
        meta2 = await readMcdrDirMeta(full2);
      } catch {
      }
      if (!meta2.id && !meta2.name) continue;
      let size2 = 0;
      try {
        size2 = (await node_fs.promises.stat(full2)).size;
      } catch {
      }
      const relPath = node_path.relative(layout.root, full2).split(node_path.sep).join("/");
      out.push({
        ...emptyRelations(),
        id: meta2.id || e.name,
        name: meta2.name || meta2.id || e.name.replace(/\.disabled$/, ""),
        file: e.name,
        path: relPath,
        size: size2,
        enabled: !disabled2,
        kind: "mcdr",
        version: meta2.version || "",
        author: meta2.author || "",
        description: meta2.description || "",
        // MCDR 的 dependencies 全是硬前置，另外单独留一份给下载扩展界面用
        dependencies: meta2.dependencies || [],
        depends: meta2.dependencies || [],
        ranges: meta2.ranges || {},
        group: groupRel
      });
      continue;
    }
    if (!e.isFile()) continue;
    const lower = e.name.toLowerCase();
    const disabled = lower.endsWith(".disabled");
    const bare = disabled ? e.name.replace(/\.disabled$/i, "") : e.name;
    const bareLower = bare.toLowerCase();
    const isPack = packExts.some((x) => bareLower.endsWith(x));
    const isSingle = bareLower.endsWith(".py");
    if (!isPack && !isSingle) continue;
    if (bareLower.startsWith("__")) continue;
    const full = node_path.join(dir, e.name);
    let size = 0;
    try {
      size = (await node_fs.promises.stat(full)).size;
    } catch {
    }
    let meta = {};
    try {
      meta = isPack ? await readMcdrPackMeta(full) : parsePyMetadata(await node_fs.promises.readFile(full, "utf-8"));
    } catch {
    }
    const nameMatch = bare.match(/^(.*?)-v?(\d[\w.+-]*)$/);
    const fallbackName = (nameMatch?.[1] ?? node_path.basename(bare, bareLower.slice(bareLower.lastIndexOf(".")))).trim();
    out.push({
      ...emptyRelations(),
      id: meta.id || "",
      name: meta.name || meta.id || fallbackName,
      file: e.name,
      path: node_path.relative(layout.root, full).split(node_path.sep).join("/"),
      size,
      enabled: !disabled,
      kind: "mcdr",
      version: meta.version || nameMatch?.[2] || "",
      author: meta.author || "",
      description: meta.description || "",
      dependencies: meta.dependencies || [],
      depends: meta.dependencies || [],
      ranges: meta.ranges || {},
      group: groupRel
    });
  }
  return out;
}
async function scanJars(layout, dir, kind) {
  const out = [];
  let entries;
  try {
    entries = await node_fs.promises.readdir(dir, { withFileTypes: true });
  } catch {
    return out;
  }
  const jars = entries.filter((e) => e.isFile() && /\.jar(\.disabled)?$/i.test(e.name));
  const BATCH = 8;
  for (let i = 0; i < jars.length; i += BATCH) {
    const slice = jars.slice(i, i + BATCH);
    const results = await Promise.all(
      slice.map(async (e) => {
        const full = node_path.join(dir, e.name);
        const disabled = e.name.toLowerCase().endsWith(".disabled");
        const base = disabled ? e.name.replace(/\.disabled$/i, "") : e.name;
        let size = 0;
        try {
          size = (await node_fs.promises.stat(full)).size;
        } catch {
        }
        let meta = emptyMeta();
        try {
          meta = await readJarMeta(full);
        } catch {
        }
        const relPath = node_path.relative(layout.root, full).split(node_path.sep).join("/");
        const groupRel = node_path.relative(layout.root, dir).split(node_path.sep).join("/");
        const info = {
          id: meta.id,
          name: meta.name || node_path.basename(base, ".jar"),
          file: e.name,
          path: relPath,
          size,
          enabled: !disabled,
          kind,
          version: meta.version,
          author: meta.author,
          description: meta.description,
          dependencies: [],
          depends: meta.depends,
          softDepends: meta.softDepends,
          provides: meta.provides,
          breaks: meta.breaks,
          ranges: meta.ranges,
          broken: meta.broken,
          side: meta.side,
          requires: [],
          usedBy: [],
          group: groupRel
        };
        return info;
      })
    );
    out.push(...results);
  }
  return out;
}
async function listPlugins(layout) {
  const jobs = [];
  if (layout.mcdrPluginsDir) {
    const groupRel = node_path.relative(layout.root, layout.mcdrPluginsDir).split(node_path.sep).join("/");
    jobs.push(scanMcdrPlugins(layout, layout.mcdrPluginsDir, groupRel));
  }
  if (layout.mcPluginsDir) {
    jobs.push(scanJars(layout, layout.mcPluginsDir, layout.isProxy ? "proxy" : "plugin"));
  }
  if (layout.modsDir) {
    jobs.push(scanJars(layout, layout.modsDir, "mod"));
  }
  const results = (await Promise.all(jobs)).flat();
  buildRelations(results);
  const rank = { mcdr: 0, proxy: 1, plugin: 2, mod: 3 };
  results.sort((a, b) => {
    if (rank[a.kind] !== rank[b.kind]) return rank[a.kind] - rank[b.kind];
    if (a.enabled !== b.enabled) return a.enabled ? -1 : 1;
    return a.name.localeCompare(b.name, "zh-CN", { sensitivity: "base" });
  });
  return results;
}
function resolveExtensionFile(layout, relPath) {
  const full = safeJoin(layout.root, relPath);
  if (!full) throw new Error("路径越界");
  const dirs = [layout.mcdrPluginsDir, layout.mcPluginsDir, layout.modsDir].filter(
    (d) => Boolean(d)
  );
  if (!dirs.some((d) => isInside(d, full))) {
    throw new Error("只能删除插件与模组目录里的文件");
  }
  return full;
}
async function togglePlugin(rootDir, relPath) {
  const full = node_path.join(rootDir, relPath);
  const disabled = full.toLowerCase().endsWith(".disabled");
  const target = disabled ? full.replace(/\.disabled$/i, "") : `${full}.disabled`;
  await node_fs.promises.rename(full, target);
  return node_path.relative(rootDir, target).split(node_path.sep).join("/");
}
const BACKUP_DIR = "backups";
function stamp() {
  const d = /* @__PURE__ */ new Date();
  const p = (n) => String(n).padStart(2, "0");
  return `${d.getFullYear()}${p(d.getMonth() + 1)}${p(d.getDate())}-${p(d.getHours())}${p(d.getMinutes())}${p(d.getSeconds())}`;
}
async function dirSize(dir, budgetMs = 2e3) {
  const deadline = Date.now() + budgetMs;
  let total = 0;
  const stack = [dir];
  while (stack.length) {
    if (Date.now() > deadline) break;
    const cur = stack.pop();
    let entries;
    try {
      entries = await node_fs.promises.readdir(cur, { withFileTypes: true });
    } catch {
      continue;
    }
    for (const e of entries) {
      const p = node_path.join(cur, e.name);
      if (e.isDirectory()) stack.push(p);
      else {
        try {
          total += (await node_fs.promises.stat(p)).size;
        } catch {
        }
      }
    }
  }
  return total;
}
async function copyTree(src, dst, skip, root) {
  await node_fs.promises.mkdir(dst, { recursive: true });
  let copied = 0;
  let entries;
  try {
    entries = await node_fs.promises.readdir(src, { withFileTypes: true });
  } catch {
    return 0;
  }
  for (const e of entries) {
    const from = node_path.join(src, e.name);
    const rel = node_path.relative(root, from).split(node_path.sep).join("/");
    if (skip.has(rel)) continue;
    const to = node_path.join(dst, e.name);
    if (e.isDirectory()) {
      copied += await copyTree(from, to, skip, root);
    } else if (e.isFile()) {
      try {
        await node_fs.promises.copyFile(from, to);
        copied++;
      } catch {
      }
    }
  }
  return copied;
}
async function listBackups(serverDir) {
  const root = node_path.join(serverDir, BACKUP_DIR);
  let entries;
  try {
    entries = await node_fs.promises.readdir(root, { withFileTypes: true });
  } catch {
    return [];
  }
  const out = [];
  for (const e of entries) {
    if (!e.isDirectory()) continue;
    const p = node_path.join(root, e.name);
    let createdAt = 0;
    try {
      createdAt = (await node_fs.promises.stat(p)).mtimeMs;
    } catch {
    }
    out.push({
      name: e.name,
      path: `${BACKUP_DIR}/${e.name}`,
      size: await dirSize(p),
      createdAt
    });
  }
  out.sort((a, b) => b.createdAt - a.createdAt);
  return out;
}
async function createBackup(serverDir, label, onProgress) {
  const safeLabel = (label || "").replace(/[\\/:*?"<>|]/g, "").trim();
  const name = safeLabel ? `${stamp()}-${safeLabel}` : stamp();
  const dst = safeJoin(serverDir, `${BACKUP_DIR}/${name}`);
  if (!dst) throw new Error("备份路径越界");
  onProgress?.("正在复制文件…");
  const copied = await copyTree(serverDir, dst, /* @__PURE__ */ new Set([BACKUP_DIR]), serverDir);
  onProgress?.(`已复制 ${copied} 个文件`);
  const st = await node_fs.promises.stat(dst);
  return {
    name,
    path: `${BACKUP_DIR}/${name}`,
    size: await dirSize(dst),
    createdAt: st.mtimeMs
  };
}
async function deleteBackup(serverDir, relPath) {
  const full = safeJoin(serverDir, relPath);
  if (!full) throw new Error("路径越界");
  const rel = node_path.relative(serverDir, full).split(node_path.sep).join("/");
  if (!rel.startsWith(`${BACKUP_DIR}/`)) throw new Error("只能删除备份目录内的文件");
  await node_fs.promises.rm(full, { recursive: true, force: true });
}
async function restoreBackup(serverDir, relPath) {
  const src = safeJoin(serverDir, relPath);
  if (!src) throw new Error("路径越界");
  const rel = node_path.relative(serverDir, src).split(node_path.sep).join("/");
  if (!rel.startsWith(`${BACKUP_DIR}/`)) throw new Error("只能还原备份目录内的内容");
  const rescueName = `.before-restore-${stamp()}`;
  const rescue = node_path.join(serverDir, rescueName);
  await node_fs.promises.mkdir(rescue, { recursive: true });
  const entries = await node_fs.promises.readdir(serverDir, { withFileTypes: true });
  for (const e of entries) {
    if (e.name === BACKUP_DIR || e.name.startsWith(".before-restore-")) continue;
    try {
      await node_fs.promises.rename(node_path.join(serverDir, e.name), node_path.join(rescue, e.name));
    } catch {
    }
  }
  await copyTree(src, serverDir, /* @__PURE__ */ new Set(), src);
  return rescueName;
}
function tomlString(value) {
  return `"${value.replace(/\\/g, "\\\\").replace(/"/g, '\\"')}"`;
}
function yamlString(value) {
  return `'${value.replace(/'/g, "''")}'`;
}
function proxyConfigName(kind) {
  return kind === "velocity" ? "velocity.toml" : "config.yml";
}
function patchVelocityToml(template, input) {
  const eol = template.includes("\r\n") ? "\r\n" : "\n";
  const lines = template.split(/\r?\n/);
  const setKey = (key, value) => {
    const re = new RegExp(`^\\s*${key}\\s*=`);
    const hit = lines.findIndex((l) => re.test(l) && !l.trimStart().startsWith("#"));
    if (hit >= 0) {
      lines[hit] = `${key} = ${value}`;
      return;
    }
    const firstSection = lines.findIndex((l) => /^\s*\[/.test(l));
    const at = firstSection < 0 ? lines.length : firstSection;
    lines.splice(at, 0, `${key} = ${value}`, "");
  };
  setKey("bind", tomlString(`0.0.0.0:${input.port}`));
  setKey("motd", tomlString(input.motd || "A Minecraft Server"));
  setKey("online-mode", String(input.onlineMode));
  return lines.join(eol);
}
function bungeeConfigYaml(input) {
  return `# ${input.kind === "waterfall" ? "Waterfall" : "BungeeCord"} 配置（由 CraftDesk 生成）
# 后端服务器写在 servers: 下面，名字要和 listeners.priorities 里的一致。
# 改完之后重启代理端生效。

listeners:
- query_port: ${input.port}
  motd: ${yamlString(input.motd || "A Minecraft Server")}
  tab_list: GLOBAL_PING
  query_enabled: false
  proxy_protocol: false
  ping_passthrough: false
  priorities:
  - lobby
  bind_local_address: true
  host: 0.0.0.0:${input.port}
  max_players: 1
  tab_size: 60
  force_default_server: false
online_mode: ${input.onlineMode}
servers:
  lobby:
    address: 127.0.0.1:25566
    motd: '默认入口，请在 CraftDesk 里改成真实的后端地址'
    restricted: false
permissions:
  default:
  - bungeecord.command.list
  - bungeecord.command.server
  admin:
  - bungeecord.command.alert
  - bungeecord.command.end
  - bungeecord.command.ip
  - bungeecord.command.reload
  - bungeecord.command.kick
ip_forward: false
network_compression_threshold: 256
connection_throttle: 4000
connection_throttle_limit: 3
log_commands: false
`;
}
function fallbackVelocityToml(input) {
  return `# Velocity 配置（CraftDesk 生成的兜底版本）
# 没取到核心里的官方模板，这里只写了必须的几项，其余项 Velocity 会自己补全。

config-version = "1.0.0"
bind = ${tomlString(`0.0.0.0:${input.port}`)}
motd = ${tomlString(input.motd || "A Minecraft Server")}
show-max-players = 500
online-mode = ${input.onlineMode}
prevent-client-proxy-connections = false
player-info-forwarding-mode = "NONE"
announce-forge = false
kick-existing-players = false
ping-passthrough = "DISABLED"

[servers]
# 后端服务器写在这里，例如： lobby = "127.0.0.1:25566"
try = []
`;
}
function proxyConfigText(input, officialTemplate) {
  if (input.kind === "velocity") {
    return officialTemplate ? patchVelocityToml(officialTemplate, input) : fallbackVelocityToml(input);
  }
  return bungeeConfigYaml(input);
}
const UA$2 = "CraftDesk/1.0 (Minecraft server manager)";
const TIMEOUT$2 = 3e4;
async function getJson$2(url) {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), TIMEOUT$2);
  try {
    const res = await fetch(url, {
      headers: { "User-Agent": UA$2, Accept: "application/json" },
      signal: ctrl.signal
    });
    if (!res.ok) throw new Error(`HTTP ${res.status} ${res.statusText}`);
    return await res.json();
  } finally {
    clearTimeout(timer);
  }
}
async function downloadFile(url, dest, onProgress, expect) {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), 10 * 60 * 1e3);
  try {
    const res = await fetch(url, { headers: { "User-Agent": UA$2 }, signal: ctrl.signal });
    if (!res.ok || !res.body) throw new Error(`下载失败：HTTP ${res.status} ${res.statusText}`);
    const encoded = res.headers.get("content-encoding");
    const headerLen = encoded && encoded !== "identity" ? 0 : Number(res.headers.get("content-length") || 0);
    const total = headerLen || expect?.size || 0;
    let received = 0;
    let lastEmit = 0;
    const hash = expect?.checksum ? node_crypto.createHash(expect.checksum.algo) : null;
    const counter = new node_stream.Transform({
      transform(chunk, _enc, cb) {
        received += chunk.length;
        hash?.update(chunk);
        const now = Date.now();
        if (onProgress && now - lastEmit > 120) {
          lastEmit = now;
          onProgress(received, total);
        }
        cb(null, chunk);
      }
    });
    await node_fs.promises.mkdir(node_path.dirname(dest), { recursive: true });
    await promises.pipeline(node_stream.Readable.fromWeb(res.body), counter, node_fs.createWriteStream(dest));
    onProgress?.(received, total || received);
    const want = expect?.size ?? headerLen;
    if (want && received !== want) {
      await node_fs.promises.rm(dest, { force: true });
      throw new Error(`下载不完整：期望 ${want} 字节，实际 ${received} 字节。已删除这个文件，请重试`);
    }
    if (hash && expect?.checksum) {
      const got = hash.digest("hex");
      if (got.toLowerCase() !== expect.checksum.value.toLowerCase()) {
        await node_fs.promises.rm(dest, { force: true });
        throw new Error(
          `文件校验失败：期望 ${expect.checksum.algo} ${expect.checksum.value}，实际 ${got}。已删除这个文件，请重试`
        );
      }
    }
  } finally {
    clearTimeout(timer);
  }
}
async function listVanillaVersions() {
  const data = await getJson$2(
    "https://piston-meta.mojang.com/mc/game/version_manifest_v2.json"
  );
  return data.versions.filter((v) => v.type === "release").map((v) => ({ id: v.id }));
}
async function paperVersions(project) {
  try {
    const data = await getJson$2(
      `https://fill.papermc.io/v3/projects/${project}`
    );
    return flattenPaperVersions(data.versions);
  } catch {
    const data = await getJson$2(
      `https://api.papermc.io/v2/projects/${project}`
    );
    return [...data.versions].reverse().map((v) => ({ id: v }));
  }
}
function flattenPaperVersions(versions) {
  const all = Object.values(versions || {}).flat();
  const stable = all.filter((v) => !/snapshot|pre|rc|beta/i.test(v));
  const snapshot = all.filter((v) => /snapshot|pre|rc|beta/i.test(v));
  return [...stable, ...snapshot].map((v) => ({ id: v }));
}
async function listPaperVersions() {
  return paperVersions("paper");
}
async function listVelocityVersions() {
  return paperVersions("velocity");
}
async function listWaterfallVersions() {
  return paperVersions("waterfall");
}
async function listBungeeVersions() {
  try {
    const data = await getJson$2(
      "https://ci.md-5.net/job/BungeeCord/api/json?tree=builds%5Bnumber,result%5D"
    );
    const ok2 = data.builds.filter((b) => b.result === "SUCCESS").slice(0, 20);
    if (!ok2.length) throw new Error("没有成功的构建");
    return ok2.map((b) => ({ id: String(b.number), latestBuild: String(b.number) }));
  } catch {
    return [{ id: "latest" }];
  }
}
async function listPurpurVersions() {
  const data = await getJson$2("https://api.purpurmc.org/v2/purpur");
  return [...data.versions].reverse().map((v) => ({ id: v }));
}
async function listFabricVersions() {
  const data = await getJson$2(
    "https://meta.fabricmc.net/v2/versions/game"
  );
  return data.filter((v) => v.stable).map((v) => ({ id: v.version }));
}
async function listVersions(kind) {
  switch (kind) {
    case "vanilla":
      return listVanillaVersions();
    case "paper":
      return listPaperVersions();
    case "purpur":
      return listPurpurVersions();
    case "fabric":
      return listFabricVersions();
    case "velocity":
      return listVelocityVersions();
    case "waterfall":
      return listWaterfallVersions();
    case "bungeecord":
      return listBungeeVersions();
    case "forge":
      return listForgeVersions();
    case "neoforge":
      return listNeoForgeVersions();
    default:
      throw new Error("该服务端类型需要手动安装后导入");
  }
}
async function resolveVanillaUrl(mcVersion) {
  const manifest = await getJson$2(
    "https://piston-meta.mojang.com/mc/game/version_manifest_v2.json"
  );
  const entry = manifest.versions.find((v) => v.id === mcVersion);
  if (!entry) throw new Error(`找不到原版版本 ${mcVersion}`);
  const detail = await getJson$2(entry.url);
  const server = detail.downloads?.server;
  if (!server?.url) throw new Error(`${mcVersion} 没有服务端下载（可能是太老的版本）`);
  return {
    url: server.url,
    name: `minecraft_server.${mcVersion}.jar`,
    size: server.size,
    checksum: server.sha1 ? { algo: "sha1", value: server.sha1 } : void 0
  };
}
async function resolvePaperUrl(mcVersion) {
  try {
    const builds = await getJson$2(`https://api.papermc.io/v2/projects/paper/versions/${mcVersion}/builds`);
    const usable = builds.builds.filter((b) => b.channel === "default" || b.channel === "STABLE");
    const list = usable.length ? usable : builds.builds;
    const latest = list[list.length - 1];
    if (!latest) throw new Error("没有可用构建");
    const app = latest.downloads.application;
    return {
      url: `https://api.papermc.io/v2/projects/paper/versions/${mcVersion}/builds/${latest.build}/downloads/${app.name}`,
      name: app.name,
      size: app.size,
      checksum: app.sha256 ? { algo: "sha256", value: app.sha256 } : void 0
    };
  } catch (err) {
    const builds = await getJson$2(`https://fill.papermc.io/v3/projects/paper/versions/${mcVersion}/builds`);
    const usable = builds.filter((b) => b.channel === "STABLE");
    const list = usable.length ? usable : builds;
    const latest = list[0];
    const dl = latest?.downloads?.["server:default"];
    if (!dl) throw new Error(`无法获取 Paper ${mcVersion} 下载地址：${String(err)}`);
    return {
      url: dl.url,
      name: dl.name,
      size: dl.size,
      checksum: dl.checksums?.sha256 ? { algo: "sha256", value: dl.checksums.sha256 } : void 0
    };
  }
}
async function resolvePurpurUrl(mcVersion) {
  const data = await getJson$2(
    `https://api.purpurmc.org/v2/purpur/${mcVersion}`
  );
  const build = data.builds?.latest;
  if (!build) throw new Error(`Purpur ${mcVersion} 没有可用构建`);
  const detail = await getJson$2(
    `https://api.purpurmc.org/v2/purpur/${mcVersion}/${build}`
  ).catch(() => ({}));
  return {
    url: `https://api.purpurmc.org/v2/purpur/${mcVersion}/${build}/download`,
    name: `purpur-${mcVersion}-${build}.jar`,
    checksum: detail.md5 ? { algo: "md5", value: detail.md5 } : void 0
  };
}
async function resolveFabricUrl(mcVersion) {
  const [loaders, installers] = await Promise.all([
    getJson$2("https://meta.fabricmc.net/v2/versions/loader"),
    getJson$2(
      "https://meta.fabricmc.net/v2/versions/installer"
    )
  ]);
  const loader = loaders.find((l) => l.stable) || loaders[0];
  const installer = installers.find((i) => i.stable) || installers[0];
  if (!loader || !installer) throw new Error("无法获取 Fabric 加载器版本");
  return {
    url: `https://meta.fabricmc.net/v2/versions/loader/${mcVersion}/${loader.version}/${installer.version}/server/jar`,
    name: `fabric-server-mc${mcVersion}-loader${loader.version}.jar`
  };
}
async function resolveDownloadUrl(kind, mcVersion) {
  switch (kind) {
    case "vanilla":
      return resolveVanillaUrl(mcVersion);
    case "paper":
      return resolvePaperUrl(mcVersion);
    case "purpur":
      return resolvePurpurUrl(mcVersion);
    case "fabric":
      return resolveFabricUrl(mcVersion);
    case "velocity":
      return resolvePaperLikeUrl("velocity", mcVersion);
    case "waterfall":
      return resolvePaperLikeUrl("waterfall", mcVersion);
    case "bungeecord":
      return resolveBungeeUrl(mcVersion);
    default:
      throw new Error("该服务端类型暂不支持自动下载，请手动安装后导入");
  }
}
async function resolvePaperLikeUrl(project, version) {
  const pick = (builds) => {
    const stable = builds.filter((b) => b.channel === "STABLE");
    const list = stable.length ? stable : builds;
    const build = list[0];
    const dl = build?.downloads?.["server:default"];
    if (!dl) throw new Error(`没有找到 ${project} ${version} 的下载文件`);
    return {
      url: dl.url,
      name: dl.name,
      size: dl.size,
      checksum: dl.checksums?.sha256 ? { algo: "sha256", value: dl.checksums.sha256 } : void 0
    };
  };
  try {
    const builds = await getJson$2(
      `https://fill.papermc.io/v3/projects/${project}/versions/${version}/builds`
    );
    return pick(builds);
  } catch (err) {
    const builds = await getJson$2(`https://api.papermc.io/v2/projects/${project}/versions/${version}/builds`);
    const usable = builds.builds.filter((b) => b.channel === "default");
    const latest = (usable.length ? usable : builds.builds).slice(-1)[0];
    if (!latest) throw new Error(`没有找到 ${project} ${version} 的可用构建：${String(err)}`);
    return {
      url: `https://api.papermc.io/v2/projects/${project}/versions/${version}/builds/${latest.build}/downloads/${latest.downloads.application.name}`,
      name: latest.downloads.application.name,
      size: latest.downloads.application.size,
      checksum: latest.downloads.application.sha256 ? { algo: "sha256", value: latest.downloads.application.sha256 } : void 0
    };
  }
}
async function resolveBungeeUrl(build) {
  const id = /^\d+$/.test(build.trim()) ? build.trim() : "lastSuccessfulBuild";
  const name = "BungeeCord.jar";
  return {
    url: `https://ci.md-5.net/job/BungeeCord/${id}/artifact/bootstrap/target/${name}`,
    name,
    fallbacks: [`https://hub.spigotmc.org/jenkins/job/BungeeCord/${id}/artifact/bootstrap/target/${name}`]
  };
}
async function installServer(dir, kind, mcVersion, options, taskId, emit) {
  const progress = (stage, message, received = 0, total = 0) => {
    emit({
      taskId,
      stage,
      message,
      received,
      total,
      percent: total > 0 ? Math.min(100, Math.round(received / total * 100)) : 0
    });
  };
  await node_fs.promises.mkdir(dir, { recursive: true });
  if (isProxyKind(kind)) {
    const proxy = kind;
    progress("meta", `正在解析 ${kind} ${mcVersion} 的下载地址…`);
    const resolved = await resolveDownloadUrl(proxy, mcVersion);
    const jarPath2 = node_path.join(dir, resolved.name);
    progress("download", `正在下载 ${resolved.name}`, 0, resolved.size ?? 0);
    await downloadWithFallback(
      [resolved.url, ...resolved.fallbacks ?? []],
      jarPath2,
      (received, total) => progress("download", `正在下载 ${resolved.name}`, received, total),
      { size: resolved.size, checksum: resolved.checksum }
    );
    progress("extract", `正在生成 ${proxyConfigName(proxy)}…`);
    await writeProxyConfig(dir, proxy, jarPath2, options);
    progress("done", "安装完成");
    return { jar: resolved.name, jarPath: jarPath2 };
  }
  if (kind === "forge" || kind === "neoforge") {
    const installed = await installWithOfficialInstaller(dir, kind, mcVersion, options, progress);
    progress("extract", "正在写入配置文件…");
    await writeBaseConfig(dir, options);
    progress("done", "安装完成");
    return installed;
  }
  progress("meta", `正在解析 ${kind} ${mcVersion} 的下载地址…`);
  const { url, name, size, checksum } = await resolveDownloadUrl(kind, mcVersion);
  const jarPath = node_path.join(dir, name);
  progress(
    "download",
    `正在下载 ${name}${checksum ? `（下载完会核对 ${checksum.algo}）` : ""}`,
    0,
    size ?? 0
  );
  await downloadWithFallback(
    [url],
    jarPath,
    (received, total) => {
      progress("download", `正在下载 ${name}`, received, total);
    },
    { size, checksum }
  );
  progress("extract", "正在写入配置文件…");
  await writeBaseConfig(dir, options);
  progress("done", "安装完成");
  return { jar: name, jarPath };
}
async function downloadWithFallback(urls, dest, onProgress, expect) {
  let lastError = null;
  for (const [i, url] of urls.entries()) {
    try {
      await downloadFile(url, dest, onProgress, expect);
      return;
    } catch (err) {
      lastError = err;
      if (i < urls.length - 1) continue;
    }
  }
  throw lastError instanceof Error ? lastError : new Error(String(lastError));
}
async function writeProxyConfig(dir, kind, jarPath, options) {
  const target = node_path.join(dir, proxyConfigName(kind));
  try {
    await node_fs.promises.access(target);
    return;
  } catch {
  }
  let official = null;
  if (kind === "velocity") official = await readJarText(jarPath, "default-velocity.toml");
  const text = proxyConfigText(
    { kind, port: options.port, motd: options.motd, onlineMode: options.onlineMode },
    official
  );
  await node_fs.promises.writeFile(target, text, "utf-8");
}
async function readJarText(jarPath, name) {
  const zip = await ZipReader.open(jarPath);
  if (!zip) return null;
  try {
    const entry = zip.has(name) ? name : zip.list().find((n) => n.endsWith(`/${name}`));
    return entry ? await zip.read(entry) : null;
  } catch {
    return null;
  } finally {
    await zip.close();
  }
}
async function installWithOfficialInstaller(dir, kind, mcVersion, options, progress) {
  const build = options.build?.trim();
  if (!build) {
    throw new Error(
      kind === "forge" ? "没有指定要装的 Forge 构建号。回到上一步重新选一次版本。" : "没有指定要装的 NeoForge 构建号。回到上一步重新选一次版本。"
    );
  }
  const java = options.javaPath?.trim();
  if (!java) throw new Error("安装 Forge / NeoForge 需要 Java，请先在设置里配好 Java 路径");
  const file = kind === "forge" ? forgeInstaller(mcVersion, build) : neoforgeInstaller(build);
  const installerPath = node_path.join(dir, file.name);
  progress("download", `正在下载 ${file.name}`, 0, 0);
  const expect = {};
  if (file.checksumFile) {
    const sha1 = await fetchSha1(file.checksumFile);
    if (sha1) expect.checksum = { algo: "sha1", value: sha1 };
  }
  await downloadFile(
    file.url,
    installerPath,
    (received, total) => progress("download", `正在下载 ${file.name}`, received, total),
    expect
  );
  progress("extract", "正在运行官方安装器（要下载一两百 MB 运行库，第一次会慢）");
  let lastLine = "";
  const res = await run(java, ["-Djava.awt.headless=true", "-jar", installerPath, "--installServer", dir], {
    cwd: dir,
    timeout: 30 * 60 * 1e3,
    onChunk: (text) => {
      const line = text.split(/\r?\n/).map((l) => l.trim()).filter(Boolean).pop();
      if (line && line !== lastLine) {
        lastLine = line;
        progress("extract", line.slice(0, 160));
      }
    }
  });
  if (res.code !== 0) {
    const tail = `${res.stderr}
${res.stdout}`.trim().split(/\r?\n/).slice(-4).join(" ");
    throw new Error(`安装器退出码 ${res.code}：${tail.slice(0, 400)}`);
  }
  const argsFile = await findArgsFile(dir);
  if (argsFile) {
    const rel = node_path.relative(dir, argsFile).split(node_path.sep).join("/");
    return { jar: "", jarPath: "", launchArgs: rel };
  }
  const universal = await findUniversalJar(dir);
  if (universal) {
    return { jar: node_path.basename(universal), jarPath: universal };
  }
  throw new Error(
    "安装器跑完了，但既没有参数文件也没有找到可启动的 jar。打开服务器目录看一下，或者用「导入已有服务端」把这个目录加进来。"
  );
}
async function writeBaseConfig(dir, options) {
  if (options.acceptEula) {
    await node_fs.promises.writeFile(
      node_path.join(dir, "eula.txt"),
      `# 由 CraftDesk 生成
eula=true
`,
      "utf-8"
    );
  } else {
    await node_fs.promises.writeFile(node_path.join(dir, "eula.txt"), `eula=false
`, "utf-8");
  }
  const props = [
    { key: "motd", value: options.motd || "A Minecraft Server" },
    { key: "server-port", value: String(options.port) },
    { key: "max-players", value: String(options.maxPlayers) },
    { key: "online-mode", value: String(options.onlineMode) },
    { key: "level-name", value: "world" },
    { key: "gamemode", value: "survival" },
    { key: "difficulty", value: "easy" },
    { key: "view-distance", value: "10" },
    { key: "simulation-distance", value: "10" },
    { key: "enable-command-block", value: "true" },
    { key: "spawn-protection", value: "16" }
  ];
  await node_fs.promises.writeFile(
    node_path.join(dir, "server.properties"),
    `#Minecraft server properties
#由 CraftDesk 生成
${serializeProperties(props)}
`,
    "utf-8"
  );
}
const UA$1 = "CraftDesk/1.0 (Minecraft server manager)";
const TIMEOUT$1 = 25e3;
async function getJson$1(url) {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), TIMEOUT$1);
  try {
    const res = await fetch(url, {
      headers: { "User-Agent": UA$1, Accept: "application/json" },
      signal: ctrl.signal
    });
    if (!res.ok) throw new Error(`HTTP ${res.status} ${res.statusText}`);
    return await res.json();
  } finally {
    clearTimeout(timer);
  }
}
async function getText(url) {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), TIMEOUT$1);
  try {
    const res = await fetch(url, { headers: { "User-Agent": UA$1 }, signal: ctrl.signal });
    if (!res.ok) throw new Error(`HTTP ${res.status} ${res.statusText}`);
    return await res.text();
  } finally {
    clearTimeout(timer);
  }
}
async function searchModrinth(opts) {
  const facets = [[`project_type:${opts.projectType}`]];
  if (opts.gameVersion) facets.push([`versions:${opts.gameVersion}`]);
  if (opts.loader) facets.push([`categories:${opts.loader}`]);
  if (opts.category) facets.push([`categories:${opts.category}`]);
  const params = new URLSearchParams({
    query: opts.query || "",
    limit: String(opts.limit ?? 20),
    offset: String(opts.offset ?? 0),
    index: opts.index ?? "relevance",
    facets: JSON.stringify(facets)
  });
  const data = await getJson$1(`https://api.modrinth.com/v2/search?${params}`);
  return {
    total: data.total_hits,
    hits: data.hits.map((h) => ({
      source: "modrinth",
      projectId: h.project_id,
      slug: h.slug,
      title: h.title,
      description: h.description,
      author: h.author,
      downloads: h.downloads,
      follows: h.follows,
      categories: h.display_categories ?? h.categories,
      gameVersions: h.versions,
      iconUrl: h.icon_url,
      projectType: h.project_type,
      license: h.license,
      updatedAt: h.date_modified,
      serverSide: h.server_side ?? "",
      clientSide: h.client_side ?? ""
    }))
  };
}
async function modrinthVersions(projectId, filter) {
  const params = new URLSearchParams();
  if (filter.gameVersion) params.set("game_versions", JSON.stringify([filter.gameVersion]));
  if (filter.loader) params.set("loaders", JSON.stringify([filter.loader]));
  const list = await getJson$1(`https://api.modrinth.com/v2/project/${projectId}/version?${params}`);
  return list.map((v) => {
    const primary = v.files.find((f) => f.primary) ?? v.files[0];
    return {
      id: v.id,
      name: v.name,
      versionNumber: v.version_number,
      versionType: v.version_type,
      gameVersions: v.game_versions,
      loaders: v.loaders,
      publishedAt: v.date_published,
      downloads: v.downloads,
      fileName: primary?.filename ?? "",
      fileUrl: primary?.url ?? "",
      fileSize: primary?.size ?? 0,
      requiredDependencies: v.dependencies.filter((d) => d.dependency_type === "required" && d.project_id).map((d) => d.project_id)
    };
  });
}
const MCDR_CATALOGUE_URL = "https://raw.githubusercontent.com/MCDReforged/PluginCatalogue/catalogue/full-zh_cn.md";
const MCDR_CACHE_TTL = 12 * 60 * 60 * 1e3;
function parseSize(text) {
  const m = text.trim().match(/^([\d.]+)\s*(B|KB|MB|GB)?$/i);
  if (!m) return 0;
  const n = Number(m[1]);
  const unit = (m[2] || "B").toUpperCase();
  const scale = unit === "GB" ? 1 << 30 : unit === "MB" ? 1 << 20 : unit === "KB" ? 1 << 10 : 1;
  return Math.round(n * scale);
}
function parseLinks(line) {
  const out = [];
  const re = /\[([^\]]*)\]\(([^)]+)\)/g;
  let m;
  while (m = re.exec(line)) out.push({ text: m[1].trim(), url: m[2].trim() });
  return out;
}
function parseMcdrCatalogue(md) {
  const out = [];
  const blocks = md.split(/\n(?=## )/);
  for (const block of blocks) {
    const headMatch = block.match(/^##\s+([A-Za-z0-9_]+)\s*$/m);
    if (!headMatch) continue;
    const id = headMatch[1];
    const sections = /* @__PURE__ */ new Map();
    const parts = block.split(/\n(?=###\s)/);
    for (const part of parts) {
      const sm = part.match(/^###\s+(.+?)\s*$/m);
      if (sm) sections.set(sm[1].trim(), part);
    }
    const basic = sections.get("基本信息") ?? "";
    const pick = (label) => {
      const m = basic.match(new RegExp(`^-\\s*${label}\\s*[:：]\\s*(.+)$`, "m"));
      return m ? m[1].trim() : "";
    };
    const declaredId = pick("插件 ID").replace(/[`*]/g, "").trim();
    if (declaredId && declaredId !== id) continue;
    if (!basic.includes("插件 ID")) continue;
    const name = pick("插件名");
    const version = pick("版本");
    const downloadsRaw = pick("总下载量");
    const repository = pick("仓库");
    const description = pick("描述");
    const authors = parseLinks(pick("作者")).map((a) => a.text).filter(Boolean);
    const labels = parseLinks(pick("标签")).map((l) => l.text.replace(/[`*]/g, "")).filter(Boolean);
    const dependencies = [];
    const depSection = sections.get("插件依赖") ?? "";
    for (const line of depSection.split("\n")) {
      const cells = line.split("|").map((c) => c.trim());
      if (cells.length < 4) continue;
      const depLinks = parseLinks(cells[1]);
      const depId = (depLinks[0]?.text ?? cells[1]).replace(/[`*]/g, "").trim();
      if (!depId || depId === "插件 ID" || /^-+$/.test(depId)) continue;
      dependencies.push({ id: depId, requirement: cells[2].trim() });
    }
    const releases = [];
    const dlSection = sections.get("下载") ?? "";
    for (const line of dlSection.split("\n")) {
      if (!line.startsWith("|")) continue;
      const cells = line.split("|").map((c) => c.trim());
      if (cells.length < 7) continue;
      const fileLinks = parseLinks(cells[1]);
      const fileName = fileLinks[0]?.text ?? cells[1];
      const ver = cells[2];
      if (!fileName || fileName === "文件" || /^-+$/.test(fileName)) continue;
      const actionLinks = parseLinks(cells[6]);
      const url = actionLinks.find((l) => l.text === "下载")?.url ?? actionLinks[0]?.url ?? "";
      if (!url) continue;
      releases.push({
        version: ver,
        fileName,
        size: parseSize(cells[4]),
        downloads: Number(cells[5].replace(/[^\d]/g, "")) || 0,
        uploadedAt: cells[3],
        url
      });
    }
    out.push({
      source: "mcdr",
      id,
      name: name || id,
      version,
      authors,
      description,
      labels,
      downloads: downloadsRaw ? Number(downloadsRaw.replace(/[^\d]/g, "")) || void 0 : void 0,
      repository,
      dependencies,
      releases
    });
  }
  return out;
}
async function listMcdrPlugins(cacheDir, force = false) {
  const file = node_path.join(cacheDir, "mcdr-catalogue.json");
  if (!force) {
    try {
      const cached = JSON.parse(await node_fs.promises.readFile(file, "utf-8"));
      if (Date.now() - cached.fetchedAt < MCDR_CACHE_TTL && cached.plugins?.length) {
        return cached.plugins;
      }
    } catch {
    }
  }
  const md = await getText(MCDR_CATALOGUE_URL);
  const plugins = parseMcdrCatalogue(md);
  if (!plugins.length) throw new Error("MCDReforged 插件目录解析为空，上游格式可能变了");
  try {
    await node_fs.promises.mkdir(cacheDir, { recursive: true });
    await node_fs.promises.writeFile(
      file,
      JSON.stringify({ fetchedAt: Date.now(), plugins }),
      "utf-8"
    );
  } catch {
  }
  return plugins;
}
async function mcdrReleasesFromGithub(repository) {
  const m = repository.match(/github\.com\/([^/]+)\/([^/#?]+)/i);
  if (!m) throw new Error("这个插件没有提供 GitHub 仓库地址，需要手动安装");
  const repo = m[2].replace(/\.git$/, "");
  const list = await getJson$1(`https://api.github.com/repos/${m[1]}/${repo}/releases?per_page=15`);
  return list.filter((r) => !r.draft).map((r) => {
    const asset = r.assets.find((a) => a.name.endsWith(".mcdr")) ?? r.assets.find((a) => a.name.endsWith(".pyz"));
    return {
      version: r.tag_name,
      fileName: asset?.name ?? "",
      size: asset?.size ?? 0,
      downloads: asset?.download_count ?? 0,
      uploadedAt: r.published_at,
      url: asset?.browser_download_url ?? ""
    };
  }).filter((r) => r.url);
}
const UA = "CraftDesk/1.0 (Minecraft server manager)";
const TIMEOUT = 25e3;
async function getJson(url, headers = {}) {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), TIMEOUT);
  try {
    const res = await fetch(url, {
      headers: { "User-Agent": UA, Accept: "application/json", ...headers },
      signal: ctrl.signal
    });
    if (!res.ok) throw new Error(`HTTP ${res.status} ${res.statusText}`);
    return await res.json();
  } finally {
    clearTimeout(timer);
  }
}
const HANGAR = "https://hangar.papermc.io/api/v1";
function hangarPlatform(kind) {
  switch (kind) {
    case "velocity":
      return "VELOCITY";
    case "waterfall":
      return "WATERFALL";
    case "bungeecord":
      return "BUNGEECORD";
    default:
      return "PAPER";
  }
}
async function searchHangar(opts, platform) {
  const params = new URLSearchParams({
    q: opts.query || "",
    limit: String(opts.limit ?? 20),
    offset: String(opts.offset ?? 0),
    platform
  });
  if (!opts.query.trim()) params.set("sort", "-downloads");
  if (opts.gameVersion) params.set("version", opts.gameVersion);
  const data = await getJson(
    `${HANGAR}/projects?${params}`
  );
  return {
    total: data.pagination?.count ?? 0,
    hits: (data.result ?? []).map((p) => ({
      source: "hangar",
      id: `${p.namespace.owner}/${p.namespace.slug}`,
      name: p.name,
      description: p.description ?? "",
      authors: [p.namespace.owner],
      downloads: p.stats?.downloads ?? 0,
      iconUrl: p.avatarUrl ?? null,
      categories: p.category ? [p.category] : [],
      pageUrl: `https://hangar.papermc.io/${p.namespace.owner}/${p.namespace.slug}`,
      extra: [],
      installable: true
    }))
  };
}
async function hangarVersions(id, platform, gameVersion) {
  const params = new URLSearchParams({ limit: "25", platform });
  if (gameVersion) params.set("platformVersion", gameVersion);
  const data = await getJson(
    `${HANGAR}/projects/${id}/versions?${params}`
  );
  return (data.result ?? []).map((v) => {
    const d = v.downloads?.[platform];
    return {
      id: v.name,
      name: v.name,
      channel: (v.channel?.name ?? "Release").toLowerCase(),
      fileName: d?.fileInfo?.name ?? "",
      fileUrl: d?.downloadUrl ?? d?.externalUrl ?? "",
      fileSize: d?.fileInfo?.sizeBytes ?? 0,
      downloads: 0,
      publishedAt: v.createdAt ?? "",
      gameVersions: v.platformDependencies?.[platform] ?? [],
      loaders: [platform.toLowerCase()]
    };
  }).filter((v) => v.fileUrl);
}
const SPIGET = "https://api.spiget.org/v2";
async function searchSpigot(opts) {
  const size = opts.limit ?? 20;
  const page = Math.floor((opts.offset ?? 0) / size) + 1;
  const url = opts.query.trim() ? `${SPIGET}/search/resources/${encodeURIComponent(opts.query)}?size=${size}&page=${page}&sort=-downloads` : `${SPIGET}/resources?size=${size}&page=${page}&sort=-downloads&fields=id,name,tag,external,premium,downloads,file,rating`;
  const list = await getJson(url);
  return {
    total: list.length + (opts.offset ?? 0) + (list.length === size ? size : 0),
    hits: list.map((r) => {
      const blocked = r.premium ? "付费资源，需要到 SpigotMC 购买" : r.external ? void 0 : "SpigotMC 的下载有 Cloudflare 保护，无法自动下载，请点「主页」手动下载";
      return {
        source: "spigot",
        id: String(r.id),
        name: r.name,
        description: r.description?.replace(/<[^>]*>/g, "").slice(0, 200) ?? "",
        authors: r.author?.name ? [r.author.name] : [],
        downloads: r.downloads ?? 0,
        iconUrl: r.file?.type === "external" ? null : null,
        categories: r.tag ? [r.tag] : [],
        pageUrl: `https://www.spigotmc.org/resources/${r.id}/`,
        extra: [r.external ? "外部托管" : "Spigot 托管", r.premium ? "付费" : ""].filter(Boolean),
        installable: !blocked,
        blockedReason: blocked
      };
    })
  };
}
async function spigotVersions(id) {
  const v = await getJson(`${SPIGET}/resources/${id}/versions/latest`);
  return [
    {
      id: String(v.id),
      name: v.name,
      channel: "release",
      // 文件名只能从下载响应头拿，这里先给个合理的默认值
      fileName: `spigot-${id}-${v.name}.jar`,
      // Spiget 的 download 端点会 302 到真实地址，主进程下载时会自动跟随
      fileUrl: `${SPIGET}/resources/${id}/download`,
      fileSize: 0,
      downloads: v.downloads ?? 0,
      publishedAt: v.releaseDate ? new Date(v.releaseDate * 1e3).toISOString() : "",
      gameVersions: [],
      loaders: []
    }
  ];
}
const CF = "https://api.curseforge.com/v1";
const CF_GAME_ID = 432;
function cfLoader(loader) {
  switch (loader) {
    case "forge":
      return 1;
    case "fabric":
      return 4;
    case "quilt":
      return 5;
    case "neoforge":
      return 6;
    default:
      return null;
  }
}
async function searchCurseforge(opts) {
  if (!opts.apiKey) {
    throw new Error("CurseForge 需要 API Key，请到「设置」里填写");
  }
  const params = new URLSearchParams({
    gameId: String(CF_GAME_ID),
    searchFilter: opts.query || "",
    pageSize: String(opts.limit ?? 20),
    index: String(opts.offset ?? 0),
    sortField: opts.query ? "2" : "6",
    // 2=人气 6=总下载
    sortOrder: "desc"
  });
  if (opts.gameVersion) params.set("gameVersion", opts.gameVersion);
  const loader = cfLoader(opts.loader);
  if (loader) params.set("modLoaderType", String(loader));
  const data = await getJson(
    `${CF}/mods/search?${params}`,
    { "x-api-key": opts.apiKey }
  );
  return {
    total: data.pagination?.totalCount ?? 0,
    hits: (data.data ?? []).map((m) => ({
      source: "curseforge",
      id: String(m.id),
      name: m.name,
      description: m.summary ?? "",
      authors: (m.authors ?? []).map((a) => a.name).filter(Boolean),
      downloads: m.downloadCount ?? 0,
      iconUrl: m.logo?.thumbnailUrl ?? null,
      categories: (m.categories ?? []).map((c) => c.name),
      pageUrl: m.links?.websiteUrl ?? `https://www.curseforge.com/minecraft/mc-mods/${m.slug}`,
      extra: [],
      installable: true
    }))
  };
}
async function curseforgeVersions(id, opts) {
  if (!opts.apiKey) throw new Error("CurseForge 需要 API Key");
  const params = new URLSearchParams({ pageSize: "25" });
  if (opts.gameVersion) params.set("gameVersion", opts.gameVersion);
  const loader = cfLoader(opts.loader);
  if (loader) params.set("modLoaderType", String(loader));
  const data = await getJson(`${CF}/mods/${id}/files?${params}`, { "x-api-key": opts.apiKey });
  const CHANNEL = ["release", "release", "beta", "alpha"];
  return (data.data ?? []).filter((f) => f.downloadUrl).map((f) => ({
    id: String(f.id),
    name: f.displayName,
    channel: CHANNEL[f.releaseType] ?? "release",
    fileName: f.fileName,
    fileUrl: f.downloadUrl,
    fileSize: f.fileLength,
    downloads: f.downloadCount ?? 0,
    publishedAt: f.fileDate ?? "",
    gameVersions: f.gameVersions ?? [],
    loaders: []
  }));
}
function modrinthHitToRegistry(h) {
  return {
    source: "modrinth",
    id: h.projectId,
    name: h.title,
    description: h.description,
    authors: [h.author],
    downloads: h.downloads,
    iconUrl: h.iconUrl,
    categories: h.categories,
    pageUrl: `https://modrinth.com/project/${h.slug}`,
    extra: h.serverSide === "unsupported" ? ["仅客户端"] : [],
    installable: h.serverSide !== "unsupported",
    blockedReason: h.serverSide === "unsupported" ? "这个项目只支持客户端，装到服务端不会生效" : void 0
  };
}
function quote(p) {
  return /\s/.test(p) ? `"${p}"` : p;
}
function buildCommand(cfg, layout, coreRel) {
  if (cfg.mcdr && cfg.pythonPath) {
    return `${quote(cfg.pythonPath)} -X utf8 -m mcdreforged`;
  }
  const coreAbs = node_path.join(cfg.dir, coreRel);
  const relCore = (p) => {
    const abs = node_path.join(cfg.dir, p);
    const rel = node_path.relative(coreAbs, abs);
    if (!rel || rel.startsWith("..")) return abs;
    return rel.split(node_path.sep).join("/");
  };
  const java = quote(cfg.javaPath || "java");
  const target = cfg.launchArgs ? `@${quote(relCore(cfg.launchArgs))}` : `-jar ${quote(relCore(cfg.jar || ""))}`;
  const args = [
    `-Xms${cfg.memoryMin}M`,
    `-Xmx${cfg.memoryMax}M`,
    ...cfg.jvmArgs.split(/\s+/).filter(Boolean),
    // 和 CraftDesk 自己启动时用同一套编码参数：不然双击脚本和从界面启动
    // 出来的中文日志会不一样
    ...UTF8_CONSOLE_FLAGS,
    target,
    ...cfg.serverArgs.split(/\s+/).filter(Boolean)
  ];
  return [java, ...args].join(" ");
}
function buildStartScript(cfg, layout) {
  const win2 = process.platform === "win32";
  const file = win2 ? "start.bat" : "start.sh";
  const coreRel = cfg.mcdr ? "" : layout.coreRel;
  const cmd = buildCommand(cfg, layout, coreRel);
  const cd = coreRel ? `cd ${quote(coreRel)}` : null;
  const lines = win2 ? [
    "@echo off",
    "rem Generated by CraftDesk. Re-generate it after changing memory or JVM args.",
    "rem Double-click to run the server in a console window so you can see errors.",
    "chcp 65001 >nul",
    'cd /d "%~dp0"',
    ...cd ? [cd] : [],
    "echo Starting server in %CD%",
    cmd,
    "echo.",
    "echo Server exited with code %ERRORLEVEL%.",
    "pause"
  ] : [
    "#!/bin/sh",
    "# Generated by CraftDesk. Re-generate it after changing memory or JVM args.",
    'cd "$(dirname "$0")" || exit 1',
    ...cd ? [cd] : [],
    'echo "Starting server in $(pwd)"',
    cmd,
    'echo "Server exited with code $?"'
  ];
  return { file, content: lines.join(win2 ? "\r\n" : "\n") + "\n" };
}
async function writeStartScript(cfg, layout) {
  const { file, content } = buildStartScript(cfg, layout);
  const absPath = node_path.join(cfg.dir, file);
  await node_fs.promises.mkdir(cfg.dir, { recursive: true });
  await node_fs.promises.writeFile(absPath, content, "utf-8");
  if (process.platform !== "win32") {
    await node_fs.promises.chmod(absPath, 493).catch(() => void 0);
  }
  return { file, relPath: file, absPath, content };
}
const MCDR_MIN_MINOR = 8;
const PROBE = [
  "import json,sys",
  'info={"version":"%d.%d.%d"%sys.version_info[:3],"major":sys.version_info[0],"minor":sys.version_info[1]}',
  "try:",
  "    from importlib.metadata import version",
  '    info["mcdr"]=version("mcdreforged")',
  "except Exception:",
  '    info["mcdr"]=None',
  "print(json.dumps(info))"
].join("\n");
async function probeWith(cmd, args) {
  const res = await run(cmd, [...args, "-c", PROBE], { timeout: 15e3 });
  if (res.code !== 0) return null;
  const line = res.stdout.split(/\r?\n/).reverse().find((l) => l.trim().startsWith("{"));
  if (!line) return null;
  try {
    const info = JSON.parse(line);
    const ok2 = info.major === 3 && info.minor >= MCDR_MIN_MINOR;
    return {
      path: cmd,
      version: info.version,
      major: info.major,
      minor: info.minor,
      mcdr: info.mcdr,
      // 太老的 Python 能跑，但 MCDR 装不上去，界面要能区分这两件事
      suitable: ok2,
      valid: true
    };
  } catch {
    return null;
  }
}
async function detectPython() {
  const candidates = [];
  const list = await run("py", ["-0p"], { timeout: 1e4 });
  if (list.code === 0) {
    for (const line of list.stdout.split(/\r?\n/)) {
      const m = line.match(/^\s*-V:(\S+)\s+\*?\s*(.+?)\s*$/);
      if (m) candidates.push({ cmd: m[2].trim(), args: [] });
    }
  }
  for (const name of ["python", "python3"]) {
    const which = await run("where", [name], { timeout: 8e3 });
    if (which.code !== 0) continue;
    for (const p of which.stdout.split(/\r?\n/).map((s) => s.trim()).filter(Boolean)) {
      candidates.push({ cmd: p, args: [] });
    }
  }
  const roots = [
    node_path.join(process.env.LOCALAPPDATA || node_path.join(node_os.homedir(), "AppData", "Local"), "Programs", "Python"),
    "C:\\Python313",
    "C:\\Python312",
    "C:\\Python311",
    node_path.join(process.env.ProgramFiles || "C:\\Program Files", "Python313"),
    node_path.join(process.env.ProgramFiles || "C:\\Program Files", "Python312")
  ];
  for (const root of roots) {
    let entries;
    try {
      entries = await node_fs.promises.readdir(root);
    } catch {
      continue;
    }
    for (const e of entries) {
      const exe = node_path.join(root, e, "python.exe");
      if (node_fs.existsSync(exe)) candidates.push({ cmd: exe, args: [] });
    }
    const direct = node_path.join(root, "python.exe");
    if (node_fs.existsSync(direct)) candidates.push({ cmd: direct, args: [] });
  }
  const seen = /* @__PURE__ */ new Set();
  const out = [];
  for (const c of candidates) {
    const key = c.cmd.toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    const info = await probeWith(c.cmd, c.args);
    if (info) out.push(info);
  }
  out.sort((a, b) => {
    if (a.suitable !== b.suitable) return a.suitable ? -1 : 1;
    return b.minor - a.minor || b.major - a.major;
  });
  return out;
}
async function probePython(path) {
  return probeWith(path, []);
}
async function installMcdr(pythonPath, onLine) {
  const res = await run(
    pythonPath,
    ["-m", "pip", "install", "--upgrade", "mcdreforged"],
    { timeout: 10 * 60 * 1e3, onChunk: onLine }
  );
  if (res.code !== 0) {
    const tail = `${res.stderr}
${res.stdout}`.trim().split(/\r?\n/).slice(-3).join(" ");
    throw new Error(
      res.stderr.includes("No module named pip") ? "这个 Python 没有带 pip。用官方安装包装一次（勾上 pip），或者执行 python -m ensurepip 之后再试。" : `pip 退出码 ${res.code}：${tail}`
    );
  }
}
function mcdrReady(info) {
  if (!info) return { ok: false, reason: "没有找到 Python" };
  if (!info.suitable) {
    return { ok: false, reason: `MCDReforged 需要 Python 3.${MCDR_MIN_MINOR} 及以上，这个是 ${info.version}` };
  }
  if (!info.mcdr) return { ok: false, reason: "这个 Python 里没有装 mcdreforged" };
  return { ok: true };
}
const HANDLERS = {
  vanilla: () => "vanilla_handler",
  fabric: () => "vanilla_handler",
  paper: (v) => needsBukkit14(v) ? "bukkit14_handler" : "bukkit_handler",
  purpur: (v) => needsBukkit14(v) ? "bukkit14_handler" : "bukkit_handler",
  spigot: (v) => needsBukkit14(v) ? "bukkit14_handler" : "bukkit_handler",
  bukkit: (v) => needsBukkit14(v) ? "bukkit14_handler" : "bukkit_handler",
  forge: () => "forge_handler",
  neoforge: () => "forge_handler",
  bungeecord: () => "bungeecord_handler",
  waterfall: () => "waterfall_handler",
  velocity: () => "velocity_handler"
};
function needsBukkit14(mcVersion) {
  const m = mcVersion.match(/^1\.(\d+)/);
  if (m) return Number(m[1]) >= 14;
  const modern = mcVersion.match(/^(\d+)/);
  return modern ? Number(modern[1]) >= 26 : true;
}
function handlerFor(kind, mcVersion) {
  return HANDLERS[kind]?.(mcVersion) ?? "vanilla_handler";
}
function buildStartCommand(setup) {
  const tail = setup.isProxy ? "" : " nogui";
  const target = setup.launchArgs ? `@${setup.launchArgs}${tail}` : `-jar${setup.jar ? ` ${setup.jar}` : ""}${tail}`;
  return [
    // 编码参数不能省：MCDR 按 UTF-8 解服务端的输出，Java 默认用系统编码（GBK），
    // 目录名里有中文时它会直接抛 UnicodeDecodeError 把那行输出丢掉
    `java ${UTF8_CONSOLE_FLAGS.join(" ")} -Xms${setup.memoryMin}M -Xmx${setup.memoryMax}M`,
    target
  ].join(" ");
}
function fallbackConfig(setup, startCommand) {
  return `# 由 CraftDesk 生成
# 启动命令。不要删掉 -Dfile.encoding=UTF-8，否则中文输出会乱码。
# 注意：CraftDesk 里改内存不会同步到这里，MCDR 用的是这一行命令。
start_command: |-
  ${startCommand}

# 处理器，用于解析服务端的标准输出以及服务器控制的正确命令
# vanilla_handler  -> Vanilla / Fabric / Carpet
# bukkit14_handler -> 1.14 及以上的 Bukkit / Spigot / Paper 系
# bukkit_handler   -> 1.14 以下的 Bukkit 系
# forge_handler    -> Forge / NeoForge
# velocity_handler / bungeecord_handler / waterfall_handler -> 各类代理端
handler: ${handlerFor(setup.kind, setup.mcVersion)}

# 插件目录（相对本目录）
plugin_directories:
- plugins

# RCON 设置
rcon:
  enable: false
  address: 127.0.0.1
  port: 25575
  password: password

language: zh_cn
# 服务端核心所在目录，MCDR 会切进去再执行上面的启动命令
working_directory: ${setup.coreDir}
encoding: utf8
decoding: utf8
check_update: true
# 简易控制台。CraftDesk 是从界面进程里把它拉起来的，这个进程没有 Windows
# 控制台，prompt_toolkit 那套高级控制台会一路报 NoConsoleScreenBufferError；
# 换成简易控制台照样能收 CraftDesk 通过 stdin 发过去的命令。
advanced_console: false
disable_console_thread: false
disable_console_color: false
custom_handlers:
custom_info_reactors:
watchdog_threshold: 10
debug:
  all: false
  mcdr: false
  handler: false
  reactor: false
  plugin: false
  permission: false
  command: false
  task_executor: false
  telemetry: false
  process: false
`;
}
async function writeMcdrConfig(setup) {
  const path = node_path.join(setup.root, "config.yml");
  const startCommand = buildStartCommand(setup);
  let existing = "";
  try {
    existing = await node_fs.promises.readFile(path, "utf-8");
  } catch {
  }
  if (existing && !existing.includes("由 CraftDesk 生成")) {
    const patched = patchOfficialConfig(existing, setup, startCommand);
    if (patched) {
      await node_fs.promises.writeFile(path, patched, "utf-8");
      return path;
    }
  }
  await node_fs.promises.writeFile(path, fallbackConfig(setup, startCommand), "utf-8");
  return path;
}
function patchOfficialConfig(text, setup, startCommand) {
  const setKey = (src, key, value) => {
    const re = new RegExp(`^${key}:.*$`, "m");
    if (!re.test(src)) return null;
    return src.replace(re, `${key}: ${value}`);
  };
  let out = text;
  if (!/^start_command:.*$/m.test(out)) return null;
  out = out.replace(/^start_command:.*$/m, `start_command: |-
  ${startCommand}`);
  const handler = setKey(out, "handler", handlerFor(setup.kind, setup.mcVersion));
  if (!handler) return null;
  out = handler;
  const wd = setKey(out, "working_directory", setup.coreDir || "server");
  if (!wd) return null;
  out = wd;
  const lang = setKey(out, "language", "zh_cn");
  if (lang) out = lang;
  const adv = setKey(out, "advanced_console", "false");
  if (adv) out = adv;
  return out.replace(/^/, `# 由 CraftDesk 生成：启动命令与处理器会随服务器的设置更新
`);
}
async function initMcdrEnvironment(root, pythonPath) {
  const res = await run(pythonPath, ["-X", "utf8", "-m", "mcdreforged", "init"], {
    cwd: root,
    timeout: 2 * 60 * 1e3
  });
  const hasPermission = node_fs.existsSync(node_path.join(root, "permission.yml"));
  if (res.code === 0 && hasPermission) return;
  await prepareMcdrDirs(root);
  await node_fs.promises.writeFile(node_path.join(root, "permission.yml"), PERMISSION_TEMPLATE, "utf-8");
}
const PERMISSION_TEMPLATE = `# This is the permission config and storage file of MCDReforged
# It is used to storage permission level stuffs of MCDR
# See the document https://docs.mcdreforged.com/en/latest/permission.html for more details
#
# Available levels (top to down):
# - owner
# - admin
# - helper
# - user
# - guest


default_level: user

owner:
admin:
helper:
user:
guest:
`;
async function writeMcdrStartScript(setup) {
  const win2 = process.platform === "win32";
  const file = win2 ? "start.bat" : "start.sh";
  const cmd = `"${setup.pythonPath}" -X utf8 -m mcdreforged`;
  const lines = win2 ? [
    "@echo off",
    "rem Generated by CraftDesk. Starts MCDReforged in this folder.",
    "chcp 65001 >nul",
    'cd /d "%~dp0"',
    cmd,
    "echo.",
    "echo MCDReforged exited with code %ERRORLEVEL%.",
    "pause"
  ] : [
    "#!/bin/sh",
    "# Generated by CraftDesk. Starts MCDReforged in this folder.",
    'cd "$(dirname "$0")" || exit 1',
    cmd.replace(/^"|"$/g, ""),
    'echo "MCDReforged exited with code $?"'
  ];
  const path = node_path.join(setup.root, file);
  await node_fs.promises.writeFile(path, lines.join(win2 ? "\r\n" : "\n") + "\n", "utf-8");
  if (!win2) await node_fs.promises.chmod(path, 493).catch(() => void 0);
  return file;
}
async function prepareMcdrDirs(root) {
  for (const rel of ["plugins", "config"]) {
    await node_fs.promises.mkdir(node_path.join(root, rel), { recursive: true });
  }
}
const TEXT_EXTS = /* @__PURE__ */ new Set([
  ".yml",
  ".yaml",
  ".json",
  ".json5",
  ".toml",
  ".properties",
  ".txt",
  ".conf",
  ".cfg",
  ".ini",
  ".env",
  ".md"
]);
const SKIP_DIRS = /* @__PURE__ */ new Set([
  "__pycache__",
  "node_modules",
  ".git",
  "logs",
  "cache",
  "backups",
  ".cache"
]);
const MAX_DEPTH = 4;
const MAX_FILES = 600;
async function walk(dir, depth, opts) {
  if (depth > MAX_DEPTH || opts.out.length >= MAX_FILES) return;
  let entries;
  try {
    entries = await node_fs.promises.readdir(dir, { withFileTypes: true });
  } catch {
    return;
  }
  for (const e of entries) {
    if (opts.out.length >= MAX_FILES) return;
    if (e.name.startsWith(".") && e.name !== ".env") continue;
    const full = node_path.join(dir, e.name);
    if (e.isDirectory()) {
      if (SKIP_DIRS.has(e.name.toLowerCase())) continue;
      await walk(full, depth + 1, opts);
      continue;
    }
    if (!e.isFile()) continue;
    const ext = node_path.extname(e.name.toLowerCase().replace(/\.(bak|old|orig)$/, ""));
    if (!TEXT_EXTS.has(ext)) continue;
    let size = 0;
    let mtime = 0;
    try {
      const st = await node_fs.promises.stat(full);
      size = st.size;
      mtime = st.mtimeMs;
    } catch {
      continue;
    }
    const relFromConfig = node_path.relative(opts.configRoot, full).split(node_path.sep);
    const group = relFromConfig.length > 1 ? relFromConfig[0] : ".";
    opts.out.push({
      name: node_path.basename(full),
      path: node_path.relative(opts.root, full).split(node_path.sep).join("/"),
      size,
      mtime,
      source: opts.source,
      group
    });
  }
}
async function listConfigs(layout) {
  const out = [];
  if (layout.mcdrConfigFile) {
    try {
      const st = await node_fs.promises.stat(layout.mcdrConfigFile);
      out.push({
        name: node_path.basename(layout.mcdrConfigFile),
        path: node_path.relative(layout.root, layout.mcdrConfigFile).split(node_path.sep).join("/"),
        size: st.size,
        mtime: st.mtimeMs,
        source: "mcdr",
        group: "."
      });
    } catch {
    }
  }
  if (layout.mcdrConfigDir) {
    await walk(layout.mcdrConfigDir, 0, {
      root: layout.root,
      configRoot: layout.mcdrConfigDir,
      source: "mcdr",
      out
    });
  }
  if (layout.configDir) {
    await walk(layout.configDir, 0, {
      root: layout.root,
      configRoot: layout.configDir,
      source: "server",
      out
    });
  }
  out.sort((a, b) => {
    if (a.source !== b.source) return a.source === "mcdr" ? -1 : 1;
    if (a.group !== b.group) {
      if (a.group === ".") return -1;
      if (b.group === ".") return 1;
      return a.group.localeCompare(b.group, "zh-CN", { sensitivity: "base" });
    }
    return a.name.localeCompare(b.name, "zh-CN", { sensitivity: "base" });
  });
  return out;
}
const PROXY_MODS = [
  {
    key: "FabricProxy-Lite",
    pattern: /^fabricproxy[-_]?lite/i,
    config: ["config/FabricProxy-Lite.toml"]
  },
  {
    key: "FabricProxy",
    pattern: /^fabricproxy(?![-_]?lite)/i,
    config: ["config/FabricProxy/config.toml", "config/fabricproxy.toml"]
  }
];
async function readIfExists(path) {
  try {
    return await node_fs.promises.readFile(path, "utf-8");
  } catch {
    return null;
  }
}
async function findProxyMod(layout) {
  if (!layout.modsDir) return null;
  let entries;
  try {
    entries = await node_fs.promises.readdir(layout.modsDir);
  } catch {
    return null;
  }
  const jars = entries.filter((e) => /\.jar$/i.test(e));
  for (const mod of PROXY_MODS) {
    const hit = jars.find((j) => mod.pattern.test(j.replace(/\.jar$/i, "")));
    if (!hit) continue;
    let configPath = null;
    for (const rel of mod.config) {
      const p = node_path.join(layout.core, rel);
      try {
        await node_fs.promises.access(p);
        configPath = p;
        break;
      } catch {
      }
    }
    return { name: mod.key, file: hit, configPath };
  }
  return null;
}
async function probeForwarding(layout) {
  const mod = await findProxyMod(layout);
  if (!mod) return { mod: null, secret: null };
  if (!mod.configPath) return { mod: mod.name, secret: null };
  const text = await readIfExists(mod.configPath);
  if (!text) return { mod: mod.name, secret: null };
  const secret = text.match(/^\s*secret\s*=\s*["']([^"']*)["']/m)?.[1] ?? null;
  return { mod: mod.name, secret };
}
async function probeProxyReady(layout, kind) {
  const fw = await probeForwarding(layout);
  if (fw.mod) return { ready: true, via: fw.mod };
  if (["paper", "purpur", "spigot", "bukkit"].includes(kind)) {
    for (const rel of ["config/paper-global.yml", "config/paper-global.yaml"]) {
      const text = await readIfExists(node_path.join(layout.core, rel));
      if (text && yamlFlagUnder(text, ["proxies", "velocity", "enabled"], "true")) {
        return { ready: true, via: "Paper 原生 Velocity 转发" };
      }
    }
  }
  const spigot = await readIfExists(node_path.join(layout.core, "spigot.yml"));
  if (spigot && yamlFlagUnder(spigot, ["settings", "bungeecord"], "true")) {
    return { ready: true, via: "BungeeCord 转发" };
  }
  return { ready: false, via: null };
}
function yamlFlagUnder(text, path, value) {
  const lines = text.split(/\r?\n/).map((l) => l.replace(/\s+#.*$/, "")).filter((l) => l.trim().length > 0);
  let start = 0;
  let parentIndent = -1;
  for (const want of path) {
    let next = -1;
    for (let i = start; i < lines.length; i++) {
      const line = lines[i];
      const indent = line.length - line.trimStart().length;
      if (parentIndent >= 0 && indent <= parentIndent) break;
      const m = line.trim().match(/^([^:#][^:]*):\s*(.*)$/);
      if (!m || m[1].trim() !== want) continue;
      if (want === path[path.length - 1]) {
        return unquote(m[2].trim()) === value;
      }
      parentIndent = indent;
      next = i;
      break;
    }
    if (next < 0) return false;
    start = next + 1;
  }
  return false;
}
function unquote(s) {
  return s.replace(/^["']|["']$/g, "");
}
async function loadManaged$1(servers) {
  const out = [];
  for (const cfg of servers) {
    try {
      const layout = await resolveLayout(cfg);
      const props = await parsePropertiesFile(layout.serverProperties);
      const get = (k) => props.find((p) => p.key === k)?.value;
      const portRaw = get("server-port");
      out.push({
        cfg,
        layout,
        port: portRaw ? Number(portRaw) : null,
        onlineMode: get("online-mode") === void 0 ? null : get("online-mode") === "true"
      });
    } catch {
    }
  }
  return out;
}
async function readProxyModConfig(path) {
  if (!path) return { secret: null, hackOnlineMode: null };
  let text = "";
  try {
    text = await node_fs.promises.readFile(path, "utf-8");
  } catch {
    return { secret: null, hackOnlineMode: null };
  }
  const secret = text.match(/^\s*secret\s*=\s*["']([^"']*)["']/m)?.[1] ?? null;
  const hackRaw = text.match(/^\s*hackOnlineMode\s*=\s*(true|false)/m)?.[1];
  return { secret, hackOnlineMode: hackRaw ? hackRaw === "true" : null };
}
async function checkBackends(opts) {
  const managed = await loadManaged$1(opts.managed);
  const byPort = /* @__PURE__ */ new Map();
  for (const m of managed) {
    if (m.port == null) continue;
    byPort.set(m.port, [...byPort.get(m.port) ?? [], m]);
  }
  const pickFor = async (port) => {
    const list = byPort.get(port) ?? [];
    if (!list.length) return null;
    if (list.length === 1) return list[0];
    for (const m of list) {
      const judge = await probeProxyReady(m.layout, m.cfg.kind);
      if (judge.ready) return m;
    }
    return list[0];
  };
  const results = [];
  for (const entry of opts.entries) {
    const issues = [];
    const match = entry.port ? await pickFor(entry.port) : null;
    const check = {
      name: entry.name,
      address: entry.address,
      host: entry.host,
      port: entry.port,
      managedId: match?.cfg.id ?? null,
      managedName: match?.cfg.name ?? null,
      managedRunning: match ? opts.runningIds.has(match.cfg.id) : false,
      proxyMod: null,
      proxyModFile: null,
      managedDir: match?.layout.root ?? null,
      proxyConfigPath: null,
      proxyConfigRel: null,
      backendSecret: null,
      secretOk: null,
      backendOnlineMode: match?.onlineMode ?? null,
      hackOnlineMode: null,
      issues
    };
    if (!match) {
      results.push(check);
      continue;
    }
    const mod = await findProxyMod(match.layout);
    if (!mod) {
      issues.push({
        level: "error",
        text: "后端没有装 FabricProxy 或 FabricProxy-Lite。只把服务器写进 [servers] 是不够的，后端必须靠这个模组才能接收代理端传来的玩家 IP 和 UUID。"
      });
      results.push(check);
      continue;
    }
    check.proxyMod = mod.name;
    check.proxyModFile = mod.file;
    check.proxyConfigPath = mod.configPath;
    check.proxyConfigRel = mod.configPath ? node_path.relative(match.layout.root, mod.configPath).split(node_path.sep).join("/") : null;
    if (!mod.configPath) {
      issues.push({
        level: "warn",
        text: `装了 ${mod.name} 但找不到它的配置文件，多半是服务器还没启动过一次。`
      });
      results.push(check);
      continue;
    }
    const cfg = await readProxyModConfig(mod.configPath);
    check.backendSecret = cfg.secret;
    check.hackOnlineMode = cfg.hackOnlineMode;
    if (!cfg.secret) {
      issues.push({ level: "warn", text: `${mod.name} 的配置里没有填 secret。` });
    } else if (!opts.proxySecret) {
      issues.push({
        level: "warn",
        text: "代理端的 forwarding.secret 读不到，无法比对密钥。"
      });
    } else if (cfg.secret !== opts.proxySecret) {
      check.secretOk = false;
      issues.push({
        level: "error",
        text: `密钥不一致：后端是 "${cfg.secret}"，代理端是 "${opts.proxySecret}"。玩家会被拒绝登录。`
      });
    } else {
      check.secretOk = true;
    }
    if (opts.forwardingMode !== "modern") {
      issues.push({
        level: "error",
        text: `玩家信息转发模式是 "${opts.forwardingMode}"，但 ${mod.name} 需要 modern 模式。到「基础设置」里把 player-info-forwarding-mode 改成 modern。`
      });
    }
    if (check.backendOnlineMode === true && cfg.hackOnlineMode === false) {
      issues.push({
        level: "warn",
        text: "后端 server.properties 里 online-mode=true，而模组的 hackOnlineMode=false。这种组合下代理端转发的玩家会因为验证失败被踢，建议把后端改成 online-mode=false，或把 hackOnlineMode 打开。"
      });
    }
    if (check.backendOnlineMode === false && cfg.hackOnlineMode === true) {
      issues.push({
        level: "warn",
        text: "后端 online-mode=false 但 hackOnlineMode=true，模组的在线模式伪装会覆盖服务端设置，确认这是你想要的。"
      });
    }
    if (opts.proxyOnlineMode === true && check.backendOnlineMode === false) {
      issues.push({
        level: "info",
        text: "代理端开了正版验证，后端关着——这是 Velocity modern 转发的常见搭配，正常。"
      });
    }
    results.push(check);
  }
  return results;
}
function networkCounts(topo, live) {
  if (!topo) return { online: 0, max: 0 };
  const resolve = (n) => {
    if (n.managed && live) ;
    return { running: n.running, online: n.onlinePlayers, max: n.maxPlayers };
  };
  let online = 0;
  let max = 0;
  for (const p of topo.proxies) {
    const proxy = resolve(p.node);
    if (proxy.running) {
      online += proxy.online;
      max = Math.max(max, proxy.max);
      continue;
    }
    for (const b of p.backends) {
      const back = resolve(b);
      if (back.running) online += back.online;
    }
  }
  for (const n of topo.standalone) {
    const s = resolve(n);
    if (!s.running) continue;
    online += s.online;
    max = Math.max(max, s.max);
  }
  return { online, max };
}
async function loadManaged(servers, runtimeOf) {
  const map = /* @__PURE__ */ new Map();
  for (const cfg of servers) {
    try {
      const layout = await resolveLayout(cfg);
      let port = runtimeOf(cfg.id).port;
      if (port == null) {
        const props = await parsePropertiesFile(layout.serverProperties);
        const raw = props.find((p) => p.key === "server-port")?.value;
        port = raw ? Number(raw) : layout.configuredPort;
      }
      map.set(cfg.id, { cfg, layout, port });
    } catch {
    }
  }
  return map;
}
function toNode(cfg, port, runtimeOf, sharedPort) {
  const rt = runtimeOf(cfg.id);
  const running = rt.status !== "stopped" && rt.status !== "crashed" || rt.externalRunning;
  return {
    id: cfg.id,
    name: cfg.name,
    kind: cfg.kind,
    managed: true,
    running,
    status: rt.externalRunning ? "external" : running ? rt.status : "stopped",
    port,
    address: cfg.dir,
    onlinePlayers: running ? rt.onlineCount : 0,
    maxPlayers: rt.maxPlayers,
    sharedPort
  };
}
async function buildTopology(servers, runtimeOf) {
  const managed = await loadManaged(servers, runtimeOf);
  const byPort = /* @__PURE__ */ new Map();
  for (const m of managed.values()) {
    if (m.port == null) continue;
    byPort.set(m.port, [...byPort.get(m.port) ?? [], m]);
  }
  const proxies = [];
  const claimed = /* @__PURE__ */ new Set();
  for (const [, m] of managed) {
    if (!isProxyKind(m.cfg.kind)) continue;
    const file = await readVelocityFile(m.cfg.dir);
    const field = (k) => file.fields.find((f) => f.section === "" && f.key === k)?.value ?? "";
    const edges = [];
    const backends = [];
    for (const entry of file.servers) {
      const targets = entry.port ? byPort.get(entry.port) ?? [] : [];
      if (targets.length === 0) {
        backends.push({
          id: `external:${entry.address}`,
          name: entry.name,
          kind: "",
          managed: false,
          running: false,
          status: "unknown",
          port: entry.port || null,
          address: entry.address,
          onlinePlayers: 0,
          maxPlayers: 0,
          sharedPort: false
        });
        edges.push({
          proxyId: m.cfg.id,
          backendId: `external:${entry.address}`,
          alias: entry.name,
          address: entry.address,
          isTry: file.tryList.includes(entry.name),
          proxyMod: null,
          secretOk: null
        });
        continue;
      }
      const ready = [];
      for (const target of targets) {
        const judge = await probeProxyReady(target.layout, target.cfg.kind);
        if (!judge.ready) continue;
        ready.push({ target, fw: await probeForwarding(target.layout) });
      }
      if (ready.length === 0) {
        backends.push({
          id: `external:${entry.address}`,
          name: entry.name,
          kind: "",
          managed: false,
          running: false,
          status: "unknown",
          port: entry.port || null,
          address: entry.address,
          onlinePlayers: 0,
          maxPlayers: 0,
          sharedPort: false
        });
        edges.push({
          proxyId: m.cfg.id,
          backendId: `external:${entry.address}`,
          alias: entry.name,
          address: entry.address,
          isTry: file.tryList.includes(entry.name),
          proxyMod: null,
          secretOk: null
        });
        continue;
      }
      for (const { target, fw } of ready) {
        claimed.add(target.cfg.id);
        const node = toNode(target.cfg, target.port, runtimeOf, ready.length > 1);
        backends.push(node);
        edges.push({
          proxyId: m.cfg.id,
          backendId: node.id,
          alias: entry.name,
          address: entry.address,
          isTry: file.tryList.includes(entry.name),
          proxyMod: fw.mod,
          secretOk: fw.mod ? fw.secret && file.secret ? fw.secret === file.secret : null : null
        });
      }
    }
    proxies.push({
      node: toNode(m.cfg, m.port, runtimeOf, false),
      backends,
      edges,
      forwardingMode: field("player-info-forwarding-mode") || "none",
      secret: file.secret
    });
  }
  const standalone = [];
  for (const [id, m] of managed) {
    if (claimed.has(id)) continue;
    if (proxies.some((p) => p.node.id === id)) continue;
    standalone.push(toNode(m.cfg, m.port, runtimeOf, (byPort.get(m.port ?? -1)?.length ?? 0) > 1));
  }
  const rank = (k) => k === "velocity" || k === "bungeecord" || k === "waterfall" ? 0 : 1;
  standalone.sort((a, b) => rank(a.kind) - rank(b.kind) || a.name.localeCompare(b.name, "zh-CN"));
  const { online: networkOnline, max: networkMax } = networkCounts({
    proxies,
    standalone
  });
  return { proxies, standalone, networkOnline, networkMax };
}
const ok = (data) => ({ ok: true, data });
const bootAt = Date.now();
const fail = (error) => ({
  ok: false,
  error: error instanceof Error ? error.message : String(error)
});
function broadcast(ctx, channel, ...args) {
  ctx.getWindow()?.webContents.send(channel, ...args);
}
function pickJavaFor(settings, need) {
  const usable = settings.javaList.filter((j) => j.valid && j.major >= need).sort((a, b) => a.major - b.major);
  const current = settings.javaList.find((j) => j.path === settings.javaPath);
  if (current && current.major >= need) {
    return { path: settings.javaPath, switched: false, found: current };
  }
  if (!usable.length) return { path: settings.javaPath, switched: false, found: null };
  return { path: usable[0].path, switched: true, found: usable[0] };
}
function registerIpc(ctx) {
  const { store: store2, manager: manager2 } = ctx;
  const send = (channel, ...args) => broadcast(ctx, channel, ...args);
  const writeStartScriptHost = async (cfg) => {
    const layout = await resolveLayout(cfg);
    const res = await writeStartScript(cfg, layout);
    return { file: res.file, relPath: res.relPath };
  };
  electron.ipcMain.handle("servers:list", () => ok(manager2.list()));
  electron.ipcMain.handle("servers:stats", () => ok(manager2.getStats()));
  electron.ipcMain.handle("servers:detect", async (_e, dir) => {
    try {
      const detected = await detectServer(dir);
      return ok(detected);
    } catch (err) {
      return fail(err);
    }
  });
  electron.ipcMain.handle("servers:add", async (_e, payload) => {
    try {
      const dir = node_path.resolve(payload.dir);
      if (!await pathExists(dir)) throw new Error("目录不存在");
      const detected = await detectServer(dir, { skipSize: true });
      const cfg = defaultServer({
        name: payload.config.name || detected.name,
        dir,
        jar: payload.config.jar ?? (detected.suggestedArgs ? "" : detected.suggestedJar),
        launchArgs: payload.config.launchArgs ?? detected.suggestedArgs,
        startScript: payload.config.startScript ?? "",
        kind: payload.config.kind ?? detected.kind,
        mcVersion: payload.config.mcVersion || detected.mcVersion,
        javaPath: payload.config.javaPath || store2.settings.javaPath,
        memoryMin: payload.config.memoryMin ?? store2.settings.defaultMemoryMin,
        memoryMax: payload.config.memoryMax ?? store2.settings.defaultMemoryMax,
        jvmArgs: payload.config.jvmArgs ?? "",
        // 代理端不接受 nogui 参数
        serverArgs: payload.config.serverArgs ?? (isProxyKind(payload.config.kind ?? detected.kind) ? "" : "nogui"),
        coreDir: detected.coreDir,
        mcdr: detected.isMcdr,
        // 目录里是 MCDR 的话，直接用它托管：默认的 python 已经能跑就填上，
        // 这样「启动」起的是 MCDR 而不是绕过它直接开核心（用户显式选了启动脚本时脚本优先）
        pythonPath: payload.config.pythonPath || (detected.isMcdr ? store2.settings.pythonPath : ""),
        note: payload.config.note || "",
        icon: payload.config.icon || kindLabel(payload.config.kind ?? detected.kind),
        color: kindColor(payload.config.kind ?? detected.kind)
      });
      store2.addServer(cfg);
      const layout = await resolveLayout(cfg);
      store2.updateServer(cfg.id, {
        pluginsDir: layout.mcPluginsDir ? toRootRel(layout, layout.mcPluginsDir) : "",
        modsDir: layout.modsDir ? toRootRel(layout, layout.modsDir) : ""
      });
      send("servers:changed");
      return ok(manager2.getServer(cfg.id));
    } catch (err) {
      return fail(err);
    }
  });
  electron.ipcMain.handle("servers:scanNetwork", async (_e, dir) => {
    try {
      const full = node_path.resolve(dir);
      if (!await pathExists(full)) throw new Error("目录不存在");
      return ok(await scanNetworkImport(full, store2.servers));
    } catch (err) {
      return fail(err);
    }
  });
  electron.ipcMain.handle("layout:get", async (_e, id) => {
    try {
      const cfg = store2.getServer(id);
      if (!cfg) throw new Error("服务器不存在");
      const layout = await resolveLayout(cfg);
      const mem = layout.mcdrStartCommand ? parseMemoryFromCommand(layout.mcdrStartCommand) : { min: null, max: null };
      return ok({
        coreRel: layout.coreRel,
        isMcdr: layout.isMcdr,
        mcdrStartCommand: layout.mcdrStartCommand,
        mcdrMemory: mem,
        mcdrPluginsDir: layout.mcdrPluginsDir ? toRootRel(layout, layout.mcdrPluginsDir) : "",
        mcdrConfigDir: layout.mcdrConfigDir ? toRootRel(layout, layout.mcdrConfigDir) : "",
        mcPluginsDir: layout.mcPluginsDir ? toRootRel(layout, layout.mcPluginsDir) : "",
        modsDir: layout.modsDir ? toRootRel(layout, layout.modsDir) : "",
        configDir: layout.configDir ? toRootRel(layout, layout.configDir) : "",
        isProxy: layout.isProxy,
        proxyConfigFile: layout.proxyConfigFile ? toRootRel(layout, layout.proxyConfigFile) : "",
        configuredPort: layout.configuredPort
      });
    } catch (err) {
      return fail(err);
    }
  });
  electron.ipcMain.handle("configs:list", async (_e, id) => {
    try {
      const cfg = store2.getServer(id);
      if (!cfg) throw new Error("服务器不存在");
      const layout = await resolveLayout(cfg);
      return ok(await listConfigs(layout));
    } catch (err) {
      return fail(err);
    }
  });
  electron.ipcMain.handle("topology:get", async () => {
    try {
      return ok(await buildTopology(store2.servers, (id) => manager2.runtime(id)));
    } catch (err) {
      return fail(err);
    }
  });
  electron.ipcMain.handle("registry:search", async (_e, source, opts) => {
    try {
      const apiKey = store2.settings.curseforgeApiKey;
      switch (source) {
        case "modrinth": {
          const r = await searchModrinth({
            query: opts.query,
            projectType: opts.kind === "mod" ? "mod" : "plugin",
            gameVersion: opts.gameVersion,
            loader: opts.loader,
            limit: opts.limit,
            offset: opts.offset,
            index: opts.query?.trim() ? "relevance" : "downloads"
          });
          return ok({ total: r.total, hits: r.hits.map(modrinthHitToRegistry) });
        }
        case "hangar":
          return ok(await searchHangar(opts, hangarPlatform(opts.serverKind)));
        case "spigot":
          return ok(await searchSpigot(opts));
        case "curseforge":
          return ok(await searchCurseforge({ ...opts, apiKey }));
        default:
          throw new Error(`未知的下载源：${source}`);
      }
    } catch (err) {
      return fail(err);
    }
  });
  electron.ipcMain.handle("registry:versions", async (_e, source, id, filter) => {
    try {
      const apiKey = store2.settings.curseforgeApiKey;
      switch (source) {
        case "modrinth": {
          const list = await modrinthVersions(id, filter ?? {});
          return ok(
            list.map((v) => ({
              id: v.id,
              name: v.versionNumber,
              channel: v.versionType,
              fileName: v.fileName,
              fileUrl: v.fileUrl,
              fileSize: v.fileSize,
              downloads: v.downloads,
              publishedAt: v.publishedAt,
              gameVersions: v.gameVersions,
              loaders: v.loaders
            }))
          );
        }
        case "hangar":
          return ok(await hangarVersions(id, hangarPlatform(filter?.serverKind), filter?.gameVersion));
        case "spigot":
          return ok(await spigotVersions(id));
        case "curseforge":
          return ok(await curseforgeVersions(id, { ...filter, apiKey }));
        default:
          throw new Error(`未知的下载源：${source}`);
      }
    } catch (err) {
      return fail(err);
    }
  });
  electron.ipcMain.handle("registry:mcdrList", async (_e, force) => {
    try {
      return ok(await listMcdrPlugins(node_path.join(electron.app.getPath("userData"), "cache"), force));
    } catch (err) {
      return fail(err);
    }
  });
  electron.ipcMain.handle("registry:mcdrReleases", async (_e, repository) => {
    try {
      return ok(await mcdrReleasesFromGithub(repository));
    } catch (err) {
      return fail(err);
    }
  });
  electron.ipcMain.handle("registry:install", async (_e, req) => {
    try {
      const cfg = store2.getServer(req.serverId);
      if (!cfg) throw new Error("服务器不存在");
      if (!req.url) throw new Error("这个版本没有可用的下载地址");
      if (!req.fileName) throw new Error("下载文件名缺失");
      const layout = await resolveLayout(cfg);
      const dir = req.target === "mod" ? layout.modsDir ?? node_path.join(layout.core, "mods") : req.target === "plugin" ? layout.mcPluginsDir ?? node_path.join(layout.core, "plugins") : layout.mcdrPluginsDir ?? node_path.join(layout.root, "plugins");
      await node_fs.promises.mkdir(dir, { recursive: true });
      const dest = node_path.join(dir, req.fileName);
      const taskId = `install-${Date.now()}`;
      await downloadFile(
        req.url,
        dest,
        (received, total) => {
          send("download:progress", {
            taskId,
            stage: "download",
            message: `正在下载 ${req.fileName}`,
            received,
            total,
            percent: total > 0 ? Math.min(100, Math.round(received / total * 100)) : 0
          });
        },
        // 下载源给了大小就核对，少一个字节都当失败——装上一半的模组
        // 比装不上更难查
        { size: req.fileSize }
      );
      send("download:progress", {
        taskId,
        stage: "done",
        message: `${req.label} 安装完成`,
        received: 0,
        total: 0,
        percent: 100
      });
      const st = await node_fs.promises.stat(dest);
      return ok({
        path: dest,
        relPath: toRootRel(layout, dest),
        bytes: st.size,
        dir: toRootRel(layout, dir)
      });
    } catch (err) {
      return fail(err);
    }
  });
  electron.ipcMain.handle("velocity:read", async (_e, id) => {
    try {
      const cfg = store2.getServer(id);
      if (!cfg) throw new Error("服务器不存在");
      return ok(await readVelocityFile(cfg.dir));
    } catch (err) {
      return fail(err);
    }
  });
  electron.ipcMain.handle("velocity:write", async (_e, id, updates) => {
    try {
      const cfg = store2.getServer(id);
      if (!cfg) throw new Error("服务器不存在");
      await writeVelocityFile(cfg.dir, updates);
      return ok(true);
    } catch (err) {
      return fail(err);
    }
  });
  electron.ipcMain.handle(
    "velocity:writeServers",
    async (_e, id, servers, tryList) => {
      try {
        const cfg = store2.getServer(id);
        if (!cfg) throw new Error("服务器不存在");
        await writeVelocityServers(cfg.dir, servers, tryList);
        return ok(true);
      } catch (err) {
        return fail(err);
      }
    }
  );
  electron.ipcMain.handle("velocity:checkBackends", async (_e, id) => {
    try {
      const cfg = store2.getServer(id);
      if (!cfg) throw new Error("服务器不存在");
      const file = await readVelocityFile(cfg.dir);
      const field = (key) => file.fields.find((f) => f.section === "" && f.key === key)?.value ?? "";
      const runningIds = new Set(
        store2.servers.filter((s) => manager2.isRunning(s.id)).map((s) => s.id)
      );
      const checks = await checkBackends({
        proxySecret: file.secret,
        forwardingMode: field("player-info-forwarding-mode") || "none",
        proxyOnlineMode: field("online-mode") === "true",
        entries: file.servers,
        managed: store2.servers,
        runningIds
      });
      return ok(checks);
    } catch (err) {
      return fail(err);
    }
  });
  electron.ipcMain.handle("servers:update", (_e, id, patch) => {
    const before = store2.getServer(id);
    const updated = store2.updateServer(id, patch);
    if (!updated) return fail("服务器不存在");
    if (before && patch.icon !== void 0 && patch.icon !== before.icon) {
      const old = parseIcon(before.icon);
      const next = parseIcon(updated.icon);
      if (old.kind === "image" && !(next.kind === "image" && next.name === old.name)) {
        void removeIcon(electron.app.getPath("userData"), old.name);
      }
    }
    send("servers:changed");
    send("status", id, manager2.runtime(id));
    return ok(manager2.getServer(id));
  });
  electron.ipcMain.handle(
    "servers:delete",
    async (_e, id, mode, confirmName) => {
      try {
        const cfg = store2.getServer(id);
        if (!cfg) throw new Error("服务器不存在");
        if (manager2.isRunning(id)) throw new Error("请先停止服务器再删除");
        if (mode === "files") {
          if ((confirmName ?? "").trim() !== cfg.name) {
            throw new Error("输入的服务器名称不一致，已取消删除");
          }
          const why = whyNotDeletable(cfg.dir, [electron.app.getPath("userData"), electron.app.getPath("home")]);
          if (why) throw new Error(`出于安全考虑没有删除：${why}`);
          await trashDirectory(cfg.dir, (p) => electron.shell.trashItem(p));
        }
        store2.removeServer(id);
        manager2.forget(id);
        void removeOtherIcons(electron.app.getPath("userData"), id);
        send("servers:changed");
        return ok({ mode, removed: true });
      } catch (err) {
        return fail(err);
      }
    }
  );
  electron.ipcMain.handle("servers:reorder", (_e, ids) => {
    store2.reorder(ids);
    send("servers:changed");
    return ok(true);
  });
  electron.ipcMain.handle("server:start", async (_e, id) => {
    const r = await manager2.start(id);
    return r.ok ? ok(true) : fail(r.error || "启动失败");
  });
  electron.ipcMain.handle("server:stop", async (_e, id, force) => {
    try {
      await manager2.stop(id, force);
      return ok(true);
    } catch (err) {
      return fail(err);
    }
  });
  electron.ipcMain.handle("server:restart", async (_e, id) => {
    try {
      await manager2.restart(id);
      return ok(true);
    } catch (err) {
      return fail(err);
    }
  });
  electron.ipcMain.handle("server:command", (_e, id, cmd) => {
    return manager2.sendCommand(id, cmd) ? ok(true) : fail("服务器未运行");
  });
  electron.ipcMain.handle("server:logs", (_e, id) => ok(manager2.logs(id)));
  electron.ipcMain.handle("server:clearLogs", (_e, id) => {
    manager2.clearLogs(id);
    return ok(true);
  });
  electron.ipcMain.handle("server:acceptEula", async (_e, id) => {
    const done = await manager2.acceptEula(id);
    return done ? ok(true) : fail("写入 eula.txt 失败");
  });
  electron.ipcMain.handle("settings:get", () => ok(store2.settings));
  electron.ipcMain.handle("settings:patch", async (_e, patch) => {
    const next = store2.patchSettings(patch);
    send("servers:changed");
    return ok(next);
  });
  electron.ipcMain.handle("java:detect", async () => {
    try {
      const list = await detectJava();
      store2.patchSettings({ javaList: list });
      if (!store2.settings.javaPath && list.length) {
        store2.patchSettings({ javaPath: list[0].path });
      }
      return ok(list);
    } catch (err) {
      return fail(err);
    }
  });
  electron.ipcMain.handle("java:probe", async (_e, path) => {
    try {
      return ok(await probeJava(path));
    } catch (err) {
      return fail(err);
    }
  });
  electron.ipcMain.handle("python:detect", async (_e, path) => {
    try {
      if (path?.trim()) {
        const one = await probePython(path.trim());
        if (!one) throw new Error("这个路径不是能用的 python.exe");
        return ok([one]);
      }
      const list = await detectPython();
      store2.patchSettings({ pythonList: list });
      if (!store2.settings.pythonPath && list.length) {
        store2.patchSettings({ pythonPath: list[0].path });
      }
      return ok(list);
    } catch (err) {
      return fail(err);
    }
  });
  electron.ipcMain.handle("python:installMcdr", async (_e, path) => {
    try {
      if (!path?.trim()) throw new Error("请先选择一个 Python");
      const before = await probePython(path.trim());
      if (!before) throw new Error("这个路径不是能用的 python.exe");
      await installMcdr(path.trim(), (line) => {
        const text = line.split(/\r?\n/).map((l) => l.trim()).filter((l) => l && !/^\s*$/.test(l)).pop();
        if (text) {
          send("download:progress", {
            taskId: "mcdr-install",
            stage: "extract",
            message: text.slice(0, 160),
            received: 0,
            total: 0,
            percent: 0
          });
        }
      });
      const after = await probePython(path.trim());
      store2.patchSettings({ pythonPath: path.trim() });
      if (after) store2.patchSettings({ pythonList: [after, ...store2.settings.pythonList.filter((p) => p.path !== after.path)] });
      send("download:progress", {
        taskId: "mcdr-install",
        stage: "done",
        message: `MCDReforged ${after?.mcdr ?? ""} 安装完成`,
        received: 0,
        total: 0,
        percent: 100
      });
      return ok(after);
    } catch (err) {
      return fail(err);
    }
  });
  electron.ipcMain.handle("fs:list", async (_e, root, rel) => {
    try {
      return ok(await listDir(root, rel));
    } catch (err) {
      return fail(err);
    }
  });
  electron.ipcMain.handle("fs:read", async (_e, root, rel) => {
    try {
      return ok(await readTextFile(root, rel));
    } catch (err) {
      return fail(err);
    }
  });
  electron.ipcMain.handle("fs:write", async (_e, root, rel, content) => {
    try {
      await writeTextFile(root, rel, content);
      return ok(true);
    } catch (err) {
      return fail(err);
    }
  });
  electron.ipcMain.handle("fs:mkdir", async (_e, root, rel) => {
    try {
      await createDir(root, rel);
      return ok(true);
    } catch (err) {
      return fail(err);
    }
  });
  electron.ipcMain.handle("fs:rename", async (_e, root, rel, newName) => {
    try {
      await renamePath(root, rel, newName);
      return ok(true);
    } catch (err) {
      return fail(err);
    }
  });
  electron.ipcMain.handle("fs:delete", async (_e, root, rel) => {
    try {
      const how = await deletePath(root, rel, (p) => electron.shell.trashItem(p));
      return ok({ how });
    } catch (err) {
      return fail(err);
    }
  });
  electron.ipcMain.handle("fs:reveal", async (_e, root, rel) => {
    const full = safeJoin(root, rel);
    if (!full) return fail("路径越界");
    electron.shell.showItemInFolder(full);
    return ok(true);
  });
  electron.ipcMain.handle("fs:dirSize", async (_e, root, rel) => {
    try {
      const full = safeJoin(root, rel);
      if (!full) return fail("路径越界");
      return ok(await dirSize$2(full));
    } catch (err) {
      return fail(err);
    }
  });
  electron.ipcMain.handle("fs:openPath", async (_e, root, rel) => {
    const full = safeJoin(root, rel);
    if (!full) return fail("路径越界");
    const err = await electron.shell.openPath(full);
    return err ? fail(err) : ok(true);
  });
  electron.ipcMain.handle("app:openExternal", async (_e, url) => {
    if (!/^https?:\/\//i.test(url)) return fail("只允许打开 http/https 链接");
    await electron.shell.openExternal(url);
    return ok(true);
  });
  electron.ipcMain.handle("app:pickDirectory", async (_e, title) => {
    const win2 = ctx.getWindow();
    const res = win2 ? await electron.dialog.showOpenDialog(win2, {
      title: title || "选择文件夹",
      properties: ["openDirectory"]
    }) : await electron.dialog.showOpenDialog({ properties: ["openDirectory"] });
    return ok(res.canceled ? "" : res.filePaths[0] || "");
  });
  electron.ipcMain.handle("app:readImage", async (_e, file) => {
    try {
      return ok(await readImageDataUrl(file));
    } catch (err) {
      return fail(err);
    }
  });
  electron.ipcMain.handle("app:fetchImage", async (_e, url) => {
    try {
      const res = await fetchImageDataUrl(url);
      return ok({ dataUrl: res.dataUrl, bytes: res.bytes, cached: res.cached });
    } catch (err) {
      return fail(err);
    }
  });
  electron.ipcMain.handle("app:readIcon", async (_e, name) => {
    try {
      return ok(await readIcon(electron.app.getPath("userData"), name));
    } catch (err) {
      return fail(err);
    }
  });
  electron.ipcMain.handle("app:importIcon", async (_e, serverId, srcPath) => {
    try {
      if (!store2.getServer(serverId)) throw new Error("服务器不存在");
      const imported = await importIcon(electron.app.getPath("userData"), serverId, srcPath);
      return ok(imported);
    } catch (err) {
      return fail(err);
    }
  });
  electron.ipcMain.handle("app:pickFile", async (_e, title, kind) => {
    const win2 = ctx.getWindow();
    const opts = {
      title: title || "选择文件",
      properties: ["openFile"]
    };
    if (kind === "image") opts.filters = [{ name: "图片", extensions: IMAGE_EXTS }];
    const res = win2 ? await electron.dialog.showOpenDialog(win2, opts) : await electron.dialog.showOpenDialog(opts);
    return ok(res.canceled ? "" : res.filePaths[0] || "");
  });
  electron.ipcMain.handle("props:read", async (_e, id) => {
    try {
      const cfg = store2.getServer(id);
      if (!cfg) throw new Error("服务器不存在");
      const layout = await resolveLayout(cfg);
      if (!await pathExists(layout.serverProperties)) return ok(null);
      return ok(await parsePropertiesFile(layout.serverProperties));
    } catch (err) {
      return fail(err);
    }
  });
  electron.ipcMain.handle("props:write", async (_e, id, entries) => {
    try {
      const cfg = store2.getServer(id);
      if (!cfg) throw new Error("服务器不存在");
      const layout = await resolveLayout(cfg);
      await writeProperties(layout.serverProperties, entries);
      return ok(true);
    } catch (err) {
      return fail(err);
    }
  });
  electron.ipcMain.handle("players:list", async (_e, id) => {
    try {
      const cfg = store2.getServer(id);
      if (!cfg) throw new Error("服务器不存在");
      const layout = await resolveLayout(cfg);
      const online = manager2.runtime(id).onlinePlayers;
      return ok(await listPlayers(layout.playersDir, online));
    } catch (err) {
      return fail(err);
    }
  });
  electron.ipcMain.handle("players:setOp", async (_e, id, name, value) => {
    try {
      const cfg = store2.getServer(id);
      if (!cfg) throw new Error("服务器不存在");
      const layout = await resolveLayout(cfg);
      await setOp(layout.playersDir, name, value);
      if (manager2.isRunning(id)) {
        manager2.sendCommand(id, `${value ? "op" : "deop"} ${name}`);
      }
      return ok(true);
    } catch (err) {
      return fail(err);
    }
  });
  electron.ipcMain.handle("players:setWhitelist", async (_e, id, name, value) => {
    try {
      const cfg = store2.getServer(id);
      if (!cfg) throw new Error("服务器不存在");
      const layout = await resolveLayout(cfg);
      await setWhitelist(layout.playersDir, name, value);
      if (manager2.isRunning(id)) {
        manager2.sendCommand(id, value ? `whitelist add ${name}` : `whitelist remove ${name}`);
      }
      return ok(true);
    } catch (err) {
      return fail(err);
    }
  });
  electron.ipcMain.handle("players:setBanned", async (_e, id, name, value) => {
    try {
      const cfg = store2.getServer(id);
      if (!cfg) throw new Error("服务器不存在");
      const layout = await resolveLayout(cfg);
      await setBanned(layout.playersDir, name, value);
      if (manager2.isRunning(id)) {
        manager2.sendCommand(id, value ? `ban ${name} 手动封禁` : `pardon ${name}`);
      }
      return ok(true);
    } catch (err) {
      return fail(err);
    }
  });
  electron.ipcMain.handle("plugins:list", async (_e, id) => {
    try {
      const cfg = store2.getServer(id);
      if (!cfg) throw new Error("服务器不存在");
      const layout = await resolveLayout(cfg);
      return ok(await listPlugins(layout));
    } catch (err) {
      return fail(err);
    }
  });
  electron.ipcMain.handle("plugins:toggle", async (_e, id, relPath) => {
    try {
      const cfg = store2.getServer(id);
      if (!cfg) throw new Error("服务器不存在");
      const next = await togglePlugin(cfg.dir, relPath);
      return ok(next);
    } catch (err) {
      return fail(err);
    }
  });
  electron.ipcMain.handle("plugins:delete", async (_e, id, relPath) => {
    try {
      const cfg = store2.getServer(id);
      if (!cfg) throw new Error("服务器不存在");
      const layout = await resolveLayout(cfg);
      resolveExtensionFile(layout, relPath);
      const how = await deletePath(cfg.dir, relPath, (p) => electron.shell.trashItem(p));
      return ok({ how });
    } catch (err) {
      return fail(err);
    }
  });
  electron.ipcMain.handle("backups:list", async (_e, id) => {
    try {
      const cfg = store2.getServer(id);
      if (!cfg) throw new Error("服务器不存在");
      return ok(await listBackups(cfg.dir));
    } catch (err) {
      return fail(err);
    }
  });
  electron.ipcMain.handle("backups:create", async (_e, id, label) => {
    try {
      const cfg = store2.getServer(id);
      if (!cfg) throw new Error("服务器不存在");
      const taskId = `backup-${id}`;
      const info = await createBackup(
        cfg.dir,
        label,
        (message) => send("download:progress", {
          taskId,
          stage: "extract",
          message,
          received: 0,
          total: 0,
          percent: 0
        })
      );
      send("download:progress", {
        taskId,
        stage: "done",
        message: "备份完成",
        received: 0,
        total: 0,
        percent: 100
      });
      return ok(info);
    } catch (err) {
      return fail(err);
    }
  });
  electron.ipcMain.handle("backups:delete", async (_e, id, relPath) => {
    try {
      const cfg = store2.getServer(id);
      if (!cfg) throw new Error("服务器不存在");
      await deleteBackup(cfg.dir, relPath);
      return ok(true);
    } catch (err) {
      return fail(err);
    }
  });
  electron.ipcMain.handle("backups:restore", async (_e, id, relPath) => {
    try {
      const cfg = store2.getServer(id);
      if (!cfg) throw new Error("服务器不存在");
      if (manager2.isRunning(id)) throw new Error("请先停止服务器再还原备份");
      const rescue = await restoreBackup(cfg.dir, relPath);
      return ok(rescue);
    } catch (err) {
      return fail(err);
    }
  });
  electron.ipcMain.handle("versions:list", async (_e, kind) => {
    try {
      return ok(await listVersions(kind));
    } catch (err) {
      return fail(err);
    }
  });
  electron.ipcMain.handle("server:create", async (_e, req) => {
    try {
      if (!req.name?.trim()) throw new Error("请填写服务器名称");
      if (!req.dir) throw new Error("请选择安装目录");
      const targetDir = node_path.join(req.dir, req.name.trim());
      if (await pathExists(targetDir)) {
        const entries = await node_fs.promises.readdir(targetDir);
        if (entries.length) throw new Error(`目录已存在且不为空：${targetDir}`);
      }
      const wrap = !!req.mcdr;
      const coreDir = wrap ? "server" : "";
      const installDir = wrap ? node_path.join(targetDir, coreDir) : targetDir;
      let python = null;
      if (wrap) {
        python = req.pythonPath?.trim() ? await probePython(req.pythonPath.trim()) : (await detectPython())[0] ?? null;
        const ready = mcdrReady(python);
        if (!ready.ok) {
          throw new Error(
            `${ready.reason}。可以在设置里检测并安装 MCDReforged，或者先不勾选它，装完再加。`
          );
        }
      }
      const taskId = `create-${Date.now()}`;
      const result = await installServer(
        installDir,
        req.kind,
        req.mcVersion,
        {
          motd: req.motd,
          port: req.port,
          maxPlayers: 20,
          acceptEula: req.acceptEula,
          onlineMode: true,
          build: req.build,
          // Forge / NeoForge 的安装器本身也是个 Java 程序，得用能跑它的那个
          javaPath: store2.settings.javaPath
        },
        taskId,
        (p) => send("download:progress", p)
      );
      const need = isProxyKind(req.kind) ? proxyJavaMajor(req.kind, req.mcVersion) : requiredJavaMajor(req.mcVersion);
      const picked = pickJavaFor(store2.settings, need);
      const inRoot = (rel) => coreDir ? `${coreDir}/${rel}` : rel;
      const cfg = defaultServer({
        name: req.name.trim(),
        dir: targetDir,
        jar: result.jar ? inRoot(result.jar) : "",
        launchArgs: result.launchArgs ? inRoot(result.launchArgs) : "",
        // MCDR 托管时由它的 config.yml 决定怎么起核心，这里不放脚本
        startScript: "",
        kind: req.kind,
        mcVersion: req.mcVersion,
        javaPath: picked.path,
        memoryMin: req.memoryMin,
        memoryMax: req.memoryMax,
        jvmArgs: store2.settings.defaultJvmArgs,
        serverArgs: isProxyKind(req.kind) ? "" : "nogui",
        coreDir,
        mcdr: wrap,
        pythonPath: wrap ? python?.path ?? "" : "",
        icon: kindLabel(req.kind),
        color: kindColor(req.kind)
      });
      if (wrap && python) {
        const setup = {
          root: targetDir,
          coreDir,
          // MCDR 会切进 coreDir 再执行启动命令，所以这两个都是相对 coreDir
          jar: result.jar,
          launchArgs: result.launchArgs,
          kind: req.kind,
          mcVersion: req.mcVersion,
          memoryMin: req.memoryMin,
          memoryMax: req.memoryMax,
          pythonPath: python.path,
          isProxy: isProxyKind(req.kind)
        };
        await initMcdrEnvironment(targetDir, python.path);
        await writeMcdrConfig(setup);
        await writeMcdrStartScript(setup);
      }
      store2.addServer(cfg);
      const layout = await resolveLayout(cfg);
      store2.updateServer(cfg.id, {
        pluginsDir: layout.mcPluginsDir ? toRootRel(layout, layout.mcPluginsDir) : "",
        modsDir: layout.modsDir ? toRootRel(layout, layout.modsDir) : ""
      });
      if (!wrap) await writeStartScriptHost(store2.getServer(cfg.id));
      send("servers:changed");
      return ok(manager2.getServer(cfg.id));
    } catch (err) {
      return fail(err);
    }
  });
  electron.ipcMain.handle("server:writeStartScript", async (_e, id) => {
    try {
      const cfg = store2.getServer(id);
      if (!cfg) throw new Error("服务器不存在");
      if (cfg.mcdr) {
        throw new Error("这台服务器由 MCDReforged 托管，启动命令在它的 config.yml 里，不需要另外的脚本");
      }
      const res = await writeStartScriptHost(cfg);
      return ok(res);
    } catch (err) {
      return fail(err);
    }
  });
  electron.ipcMain.handle("window:minimize", () => {
    ctx.getWindow()?.minimize();
    return ok(true);
  });
  electron.ipcMain.handle("window:maximize", () => {
    const win2 = ctx.getWindow();
    if (!win2) return ok(false);
    if (win2.isMaximized()) win2.unmaximize();
    else win2.maximize();
    return ok(win2.isMaximized());
  });
  electron.ipcMain.handle("window:close", () => {
    ctx.getWindow()?.close();
    return ok(true);
  });
  electron.ipcMain.handle("window:isMaximized", () => ok(ctx.getWindow()?.isMaximized() ?? false));
  electron.ipcMain.handle("shell:openFolder", async (_e, dir) => {
    const err = await electron.shell.openPath(dir);
    return err ? fail(err) : ok(true);
  });
  electron.ipcMain.handle("app:revealUserData", async () => {
    electron.shell.openPath(electron.app.getPath("userData"));
    return ok(electron.app.getPath("userData"));
  });
  electron.ipcMain.handle(
    "app:info",
    () => ok({
      version: electron.app.getVersion(),
      electron: process.versions.electron,
      node: process.versions.node,
      chrome: process.versions.chrome,
      platform: `${process.platform} ${process.arch}`,
      userData: electron.app.getPath("userData"),
      // 便携版把配置放在 exe 旁边，界面上要说清楚，不然用户找不到自己的配置
      portable: ctx.dataDir.portable,
      dataNote: ctx.dataDir.reason,
      home: electron.app.getPath("home"),
      cpus: node_os.cpus().length,
      totalMem: node_os.totalmem(),
      // 单实例锁会让新进程直接退出，界面上显示启动时间才能看出跑的是不是旧实例
      startedAt: bootAt
    })
  );
}
let win = null;
let store = null;
let manager = null;
const isDev = !electron.app.isPackaged;
const dataChoice = (() => {
  const override = process.env.CRAFTDESK_USER_DATA;
  if (override) {
    return { dir: override, portable: false, reason: "由 CRAFTDESK_USER_DATA 指定（测试实例）" };
  }
  const choice = pickDataDir(
    [
      // electron-builder 的便携版会把「exe 真正所在的目录」放在这个变量里
      // （运行时程序是从临时目录解压出来的，直接问 exe 路径会问到临时目录去）
      process.env.PORTABLE_EXECUTABLE_DIR && node_path.join(process.env.PORTABLE_EXECUTABLE_DIR, "data"),
      // 免安装的绿色目录：exe 旁边就是 data
      electron.app.isPackaged ? dataDirNextTo(electron.app.getPath("exe")) : null
    ],
    electron.app.getPath("userData")
  );
  return choice;
})();
if (dataChoice.dir !== electron.app.getPath("userData")) {
  electron.app.setPath("userData", dataChoice.dir);
}
function dataDirInfo() {
  return dataChoice;
}
if (!electron.app.requestSingleInstanceLock()) {
  electron.app.quit();
} else {
  electron.app.on("second-instance", () => {
    if (win) {
      if (win.isMinimized()) win.restore();
      win.focus();
    }
  });
}
function createWindow() {
  win = new electron.BrowserWindow({
    width: 1440,
    height: 900,
    // 任务栏 / Alt-Tab 里的图标。打包后走 electron-builder 的 win.icon，这里是开发期
    icon: node_path.join(__dirname, "../../build/icon.png"),
    minWidth: 1080,
    minHeight: 660,
    show: false,
    frame: false,
    // 标题栏自己做，配合深色主题
    backgroundColor: "#1a1a1a",
    titleBarStyle: "hidden",
    autoHideMenuBar: true,
    webPreferences: {
      preload: node_path.join(__dirname, "../preload/index.js"),
      sandbox: false,
      contextIsolation: true,
      nodeIntegration: false,
      spellcheck: false
    }
  });
  win.on("ready-to-show", () => win?.show());
  win.on("maximize", () => win?.webContents.send("window:state", true));
  win.on("unmaximize", () => win?.webContents.send("window:state", false));
  win.on("close", async (e) => {
    const running = manager?.list().filter((s) => s.runtime.status !== "stopped") ?? [];
    if (running.length && store?.settings.stopOnExit && !isQuitting) {
      e.preventDefault();
      isQuitting = true;
      await manager?.stopAll();
      win?.destroy();
    }
  });
  win.webContents.setWindowOpenHandler(({ url }) => {
    if (/^https?:\/\//i.test(url)) void electron.shell.openExternal(url);
    return { action: "deny" };
  });
  const devUrl = process.env["ELECTRON_RENDERER_URL"];
  if (isDev && devUrl) {
    void win.loadURL(devUrl);
  } else {
    void win.loadFile(node_path.join(__dirname, "../renderer/index.html"));
  }
}
let isQuitting = false;
void electron.app.whenReady().then(async () => {
  store = new Store();
  await store.load();
  await store.ensureFile();
  manager = new ServerManager(store, {
    onLog: (id, line) => win?.webContents.send("log", id, line),
    onStatus: (id, runtime) => win?.webContents.send("status", id, runtime),
    onStats: (stats) => win?.webContents.send("stats", stats),
    onServersChanged: () => win?.webContents.send("servers:changed")
  });
  registerIpc({ store, manager, getWindow: () => win, dataDir: dataChoice });
  createWindow();
  electron.app.on("activate", () => {
    if (electron.BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});
electron.app.on("window-all-closed", () => {
  if (process.platform !== "darwin") electron.app.quit();
});
electron.app.on("before-quit", async () => {
  isQuitting = true;
  await manager?.dispose();
  await store?.writeNow();
});
exports.dataDirInfo = dataDirInfo;
