"use strict";
const electron = require("electron");
function on(channel, cb) {
  const listener = (_e, ...args) => cb(...args);
  electron.ipcRenderer.on(channel, listener);
  return () => electron.ipcRenderer.removeListener(channel, listener);
}
const SOURCE_LIST = [
  { key: "modrinth", label: "Modrinth", hint: "模组与插件，API 最完整" },
  { key: "hangar", label: "Hangar", hint: "Paper 官方插件站" },
  { key: "spigot", label: "SpigotMC", hint: "老牌插件站，Spigot 自托管的资源无法自动下载" },
  { key: "curseforge", label: "CurseForge", hint: "模组为主，需要自备 API Key" },
  { key: "mcdr", label: "MCDR 插件", hint: "MCDReforged 的 Python 插件" }
];
const api = {
  servers: {
    list: () => electron.ipcRenderer.invoke("servers:list"),
    stats: () => electron.ipcRenderer.invoke("servers:stats"),
    detect: (dir) => electron.ipcRenderer.invoke("servers:detect", dir),
    /**
     * 扫一个代理端目录：它配置里的后端有哪些、各自能不能在磁盘上找到。
     * 跨服网络要一次导一组，界面靠它列出可勾选的清单。
     */
    scanNetwork: (dir) => electron.ipcRenderer.invoke("servers:scanNetwork", dir),
    add: (dir, config) => electron.ipcRenderer.invoke("servers:add", { dir, config }),
    update: (id, patch) => electron.ipcRenderer.invoke("servers:update", id, patch),
    /**
     * 删除服务器。mode='files' 时必须把服务器名字原样传进来，
     * 主进程会再核对一次，对不上就不删。
     */
    delete: (id, mode, confirmName) => electron.ipcRenderer.invoke("servers:delete", id, mode, confirmName),
    reorder: (ids) => electron.ipcRenderer.invoke("servers:reorder", ids),
    create: (req) => electron.ipcRenderer.invoke("server:create", req)
  },
  server: {
    start: (id) => electron.ipcRenderer.invoke("server:start", id),
    stop: (id, force) => electron.ipcRenderer.invoke("server:stop", id, force),
    restart: (id) => electron.ipcRenderer.invoke("server:restart", id),
    command: (id, cmd) => electron.ipcRenderer.invoke("server:command", id, cmd),
    logs: (id) => electron.ipcRenderer.invoke("server:logs", id),
    clearLogs: (id) => electron.ipcRenderer.invoke("server:clearLogs", id),
    acceptEula: (id) => electron.ipcRenderer.invoke("server:acceptEula", id),
    /** 生成 / 重新生成 start.bat，内容取自当前配置 */
    writeStartScript: (id) => electron.ipcRenderer.invoke("server:writeStartScript", id)
  },
  settings: {
    get: () => electron.ipcRenderer.invoke("settings:get"),
    patch: (patch) => electron.ipcRenderer.invoke("settings:patch", patch)
  },
  java: {
    detect: () => electron.ipcRenderer.invoke("java:detect"),
    probe: (path) => electron.ipcRenderer.invoke("java:probe", path)
  },
  /**
   * Python 与 MCDReforged。MCDR 不是 jar，它是 Python 程序，
   * 所以「能不能用 MCDR」要问的是 Python：解释器在不在、够不够新、里面装了 mcdreforged 没。
   */
  python: {
    detect: (path) => electron.ipcRenderer.invoke("python:detect", path),
    installMcdr: (path) => electron.ipcRenderer.invoke("python:installMcdr", path)
  },
  fs: {
    list: (root, rel) => electron.ipcRenderer.invoke("fs:list", root, rel),
    read: (root, rel) => electron.ipcRenderer.invoke("fs:read", root, rel),
    write: (root, rel, content) => electron.ipcRenderer.invoke("fs:write", root, rel, content),
    mkdir: (root, rel) => electron.ipcRenderer.invoke("fs:mkdir", root, rel),
    rename: (root, rel, newName) => electron.ipcRenderer.invoke("fs:rename", root, rel, newName),
    remove: (root, rel) => electron.ipcRenderer.invoke("fs:delete", root, rel),
    reveal: (root, rel) => electron.ipcRenderer.invoke("fs:reveal", root, rel),
    dirSize: (root, rel) => electron.ipcRenderer.invoke("fs:dirSize", root, rel),
    open: (root, rel) => electron.ipcRenderer.invoke("fs:openPath", root, rel)
  },
  props: {
    read: (id) => electron.ipcRenderer.invoke("props:read", id),
    write: (id, entries) => electron.ipcRenderer.invoke("props:write", id, entries)
  },
  players: {
    list: (id) => electron.ipcRenderer.invoke("players:list", id),
    setOp: (id, name, value) => electron.ipcRenderer.invoke("players:setOp", id, name, value),
    setWhitelist: (id, name, value) => electron.ipcRenderer.invoke("players:setWhitelist", id, name, value),
    setBanned: (id, name, value) => electron.ipcRenderer.invoke("players:setBanned", id, name, value)
  },
  plugins: {
    list: (id) => electron.ipcRenderer.invoke("plugins:list", id),
    toggle: (id, path) => electron.ipcRenderer.invoke("plugins:toggle", id, path),
    /** 删除一个模组 / 插件文件，how 说明是进了回收站还是被永久删除 */
    remove: (id, path) => electron.ipcRenderer.invoke("plugins:delete", id, path)
  },
  /** 服务器目录布局：核心位置、是否 MCDR 托管、各处目录 */
  layout: {
    get: (id) => electron.ipcRenderer.invoke("layout:get", id)
  },
  configs: {
    list: (id) => electron.ipcRenderer.invoke("configs:list", id)
  },
  /** 网络拓扑：代理端与后端的从属关系 */
  topology: {
    get: () => electron.ipcRenderer.invoke("topology:get")
  },
  /** 扩展下载源：Modrinth / Hangar / SpigotMC / CurseForge / MCDReforged */
  registry: {
    sources: () => SOURCE_LIST,
    search: (source, opts) => electron.ipcRenderer.invoke("registry:search", source, opts),
    versions: (source, id, filter) => electron.ipcRenderer.invoke("registry:versions", source, id, filter),
    mcdrList: (force) => electron.ipcRenderer.invoke("registry:mcdrList", force),
    mcdrReleases: (repository) => electron.ipcRenderer.invoke("registry:mcdrReleases", repository),
    install: (req) => electron.ipcRenderer.invoke("registry:install", req)
  },
  /** 代理端 velocity.toml 的读写与后端校验 */
  velocity: {
    read: (id) => electron.ipcRenderer.invoke("velocity:read", id),
    write: (id, updates) => electron.ipcRenderer.invoke("velocity:write", id, updates),
    writeServers: (id, servers, tryList) => electron.ipcRenderer.invoke("velocity:writeServers", id, servers, tryList),
    checkBackends: (id) => electron.ipcRenderer.invoke("velocity:checkBackends", id)
  },
  backups: {
    list: (id) => electron.ipcRenderer.invoke("backups:list", id),
    create: (id, label) => electron.ipcRenderer.invoke("backups:create", id, label),
    remove: (id, path) => electron.ipcRenderer.invoke("backups:delete", id, path),
    restore: (id, path) => electron.ipcRenderer.invoke("backups:restore", id, path)
  },
  versions: {
    list: (kind) => electron.ipcRenderer.invoke("versions:list", kind)
  },
  app: {
    info: () => electron.ipcRenderer.invoke("app:info"),
    pickDirectory: (title) => electron.ipcRenderer.invoke("app:pickDirectory", title),
    /** 读一张本地图片当背景，返回 data URL（页面 CSP 不允许 file:） */
    readImage: (path) => electron.ipcRenderer.invoke("app:readImage", path),
    /**
     * 抓一张网络图片（下载源给的模组图标）。
     * 页面 CSP 不允许 https 图片，统一走主进程转成 data URL。
     */
    fetchImage: (url) => electron.ipcRenderer.invoke("app:fetchImage", url),
    /**
     * 服务器图标。图片会被复制进配置目录的 icons/，
     * 这里传的/拿到的都是文件名（不是路径）。
     */
    readIcon: (name) => electron.ipcRenderer.invoke("app:readIcon", name),
    importIcon: (serverId, srcPath) => electron.ipcRenderer.invoke("app:importIcon", serverId, srcPath),
    pickFile: (title, kind) => electron.ipcRenderer.invoke("app:pickFile", title, kind),
    openExternal: (url) => electron.ipcRenderer.invoke("app:openExternal", url),
    openFolder: (dir) => electron.ipcRenderer.invoke("shell:openFolder", dir),
    revealUserData: () => electron.ipcRenderer.invoke("app:revealUserData")
  },
  window: {
    minimize: () => electron.ipcRenderer.invoke("window:minimize"),
    maximize: () => electron.ipcRenderer.invoke("window:maximize"),
    close: () => electron.ipcRenderer.invoke("window:close"),
    isMaximized: () => electron.ipcRenderer.invoke("window:isMaximized")
  },
  // ---------------------------------------------------------- 事件订阅
  on: {
    log: (cb) => on("log", (...a) => cb(a[0], a[1])),
    status: (cb) => on("status", (...a) => cb(a[0], a[1])),
    stats: (cb) => on("stats", (...a) => cb(a[0])),
    serversChanged: (cb) => on("servers:changed", () => cb()),
    download: (cb) => on("download:progress", (...a) => cb(a[0])),
    windowState: (cb) => on("window:state", (...a) => cb(Boolean(a[0])))
  }
};
electron.contextBridge.exposeInMainWorld("api", api);
