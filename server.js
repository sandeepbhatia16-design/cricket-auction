const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

app.use(express.static("public"));

// ===== PLAYER DATA =====
const PLAYERS = [
  {name:"Amit",role:"All Rounder 2",cat:"All Rounder",base:350,avail:7,bat:{m:51,i:37,no:7,r:411,hs:"53",avg:13.7,sr:125.3,s50:1,s100:0,f:39,s:10,duck:1,w:22,l:29,wp:.431},bowl:{wk:29,eco:8.98,bavg:13.83,w3:3,w5:0},field:{c:9,cb:4}},
  {name:"Abhinav",role:"All Rounder",cat:"All Rounder",base:450,avail:3,bat:{m:30,i:19,no:1,r:230,hs:"43*",avg:12.78,sr:133.72,s50:0,s100:0,f:21,s:7,duck:5,w:16,l:14,wp:.533},bowl:{wk:37,eco:6.57,bavg:12.76,w3:5,w5:0},field:{c:28,cb:0}},
  {name:"Aman",role:"Batsman",cat:"Batsman",base:300,avail:7,bat:{m:7,i:7,no:1,r:45,hs:"18",avg:7.5,sr:95,s50:0,s100:0,f:4,s:1,duck:2,w:3,l:4,wp:.429},bowl:{wk:0,eco:0,bavg:0,w3:0,w5:0},field:{c:3,cb:0}},
  {name:"Bakil",role:"Batsman",cat:"Batsman",base:300,avail:7,bat:{m:84,i:80,no:22,r:511,hs:"35",avg:8.81,sr:90.28,s50:0,s100:0,f:41,s:21,duck:16,w:56,l:57,wp:.496},bowl:{wk:2,eco:10.5,bavg:21,w3:0,w5:0},field:{c:29,cb:9}},
  {name:"Bhanu",role:"Iconic",cat:"Iconic",base:700,avail:7,bat:{m:79,i:80,no:13,r:2326,hs:"124*",avg:34.72,sr:186.52,s50:15,s100:2,f:184,s:168,duck:7,w:35,l:42,wp:.455},bowl:{wk:93,eco:8.26,bavg:16.61,w3:5,w5:0},field:{c:23,cb:5}},
  {name:"Dheeru",role:"Bowler",cat:"Bowler",base:300,avail:"?",bat:{m:81,i:33,no:17,r:59,hs:"6",avg:3.69,sr:45.04,s50:0,s100:0,f:3,s:0,duck:5,w:38,l:44,wp:.463},bowl:{wk:84,eco:9.26,bavg:18.89,w3:5,w5:0},field:{c:27,cb:0}},
  {name:"Dinesh",role:"All Rounder 2",cat:"All Rounder",base:350,avail:6,bat:{m:56,i:56,no:8,r:569,hs:"45*",avg:11.85,sr:126.16,s50:0,s100:0,f:36,s:36,duck:16,w:26,l:30,wp:.464},bowl:{wk:31,eco:10.49,bavg:28.77,w3:1,w5:0},field:{c:19,cb:0}},
  {name:"Gaurav",role:"Iconic",cat:"Iconic",base:700,avail:7,bat:{m:78,i:79,no:16,r:1973,hs:"105*",avg:31.32,sr:177.75,s50:9,s100:1,f:132,s:155,duck:3,w:48,l:28,wp:.632},bowl:{wk:77,eco:6.4,bavg:14.58,w3:4,w5:0},field:{c:42,cb:22}},
  {name:"Himanshu",role:"All Rounder",cat:"All Rounder",base:450,avail:7,bat:{m:85,i:76,no:12,r:829,hs:"61*",avg:12.95,sr:108.37,s50:1,s100:0,f:68,s:25,duck:10,w:44,l:40,wp:.524},bowl:{wk:66,eco:9.37,bavg:21.42,w3:6,w5:0},field:{c:46,cb:2}},
  {name:"Jeetu",role:"Bat + WK",cat:"Batsman",base:350,avail:7,bat:{m:35,i:32,no:11,r:314,hs:"44*",avg:14.95,sr:100.64,s50:0,s100:0,f:19,s:12,duck:3,w:16,l:18,wp:.471},bowl:{wk:14,eco:8.41,bavg:13.71,w3:1,w5:0},field:{c:9,cb:6}},
  {name:"Kunal",role:"All Rounder 2",cat:"All Rounder",base:350,avail:7,bat:{m:29,i:27,no:5,r:169,hs:"31",avg:7.68,sr:114.97,s50:0,s100:0,f:15,s:10,duck:4,w:16,l:13,wp:.552},bowl:{wk:17,eco:7.87,bavg:18.35,w3:1,w5:0},field:{c:15,cb:0}},
  {name:"Lala",role:"Batsman",cat:"Batsman",base:300,avail:7,bat:{m:83,i:66,no:18,r:462,hs:"41",avg:9.63,sr:84.15,s50:0,s100:0,f:36,s:1,duck:6,w:40,l:41,wp:.494},bowl:{wk:8,eco:9.64,bavg:33.75,w3:0,w5:0},field:{c:20,cb:1}},
  {name:"Love",role:"All Rounder",cat:"All Rounder",base:450,avail:7,bat:{m:72,i:70,no:7,r:1026,hs:"67",avg:16.29,sr:131.2,s50:3,s100:0,f:89,s:55,duck:6,w:32,l:38,wp:.457},bowl:{wk:75,eco:7.71,bavg:16.51,w3:2,w5:0},field:{c:38,cb:1}},
  {name:"Manoj",role:"All Rounder 2",cat:"All Rounder",base:350,avail:7,bat:{m:73,i:55,no:20,r:314,hs:"29",avg:8.97,sr:88.95,s50:0,s100:0,f:20,s:3,duck:2,w:40,l:33,wp:.548},bowl:{wk:27,eco:9.63,bavg:22.48,w3:0,w5:0},field:{c:21,cb:1}},
  {name:"Niranjan",role:"Batsman",cat:"Batsman",base:300,avail:7,bat:{m:42,i:37,no:5,r:301,hs:"44",avg:9.41,sr:101.69,s50:0,s100:0,f:22,s:15,duck:5,w:23,l:19,wp:.548},bowl:{wk:7,eco:9.8,bavg:21,w3:0,w5:0},field:{c:11,cb:0}},
  {name:"Riyas",role:"All Rounder",cat:"All Rounder",base:450,avail:7,bat:{m:87,i:79,no:19,r:994,hs:"73*",avg:16.57,sr:142.33,s50:2,s100:0,f:69,s:68,duck:9,w:37,l:48,wp:.435},bowl:{wk:89,eco:7.95,bavg:20.76,w3:4,w5:0},field:{c:35,cb:3}},
  {name:"Rohit",role:"All Rounder 2",cat:"All Rounder",base:350,avail:7,bat:{m:49,i:37,no:9,r:220,hs:"33",avg:7.86,sr:92.44,s50:0,s100:0,f:19,s:5,duck:7,w:19,l:30,wp:.388},bowl:{wk:10,eco:10.35,bavg:34.5,w3:0,w5:0},field:{c:11,cb:1}},
  {name:"Sagar",role:"Batsman",cat:"Batsman",base:300,avail:7,bat:{m:65,i:62,no:7,r:710,hs:"48*",avg:12.91,sr:130.51,s50:0,s100:0,f:45,s:42,duck:3,w:35,l:29,wp:.547},bowl:{wk:2,eco:10.5,bavg:31.5,w3:0,w5:0},field:{c:19,cb:0}},
  {name:"Sandy",role:"All Rounder",cat:"All Rounder",base:450,avail:7,bat:{m:81,i:77,no:22,r:1191,hs:"75",avg:21.65,sr:149.25,s50:4,s100:0,f:114,s:60,duck:5,w:45,l:38,wp:.542},bowl:{wk:71,eco:7.72,bavg:16.83,w3:6,w5:0},field:{c:33,cb:10}},
  {name:"Somu",role:"Bat + WK",cat:"Batsman",base:350,avail:7,bat:{m:86,i:81,no:9,r:892,hs:"75",avg:12.39,sr:118.15,s50:1,s100:0,f:66,s:38,duck:9,w:43,l:41,wp:.512},bowl:{wk:3,eco:7.86,bavg:18.33,w3:0,w5:0},field:{c:25,cb:18}},
  {name:"Sonu",role:"Batsman",cat:"Batsman",base:300,avail:7,bat:{m:75,i:71,no:6,r:608,hs:"46",avg:9.35,sr:120.16,s50:0,s100:0,f:60,s:19,duck:10,w:41,l:32,wp:.562},bowl:{wk:5,eco:12.46,bavg:27,w3:1,w5:0},field:{c:24,cb:0}},
  {name:"Vicky",role:"All Rounder 2",cat:"All Rounder",base:350,avail:7,bat:{m:77,i:72,no:19,r:959,hs:"57",avg:18.09,sr:112.96,s50:2,s100:0,f:69,s:38,duck:6,w:28,l:47,wp:.373},bowl:{wk:35,eco:9.9,bavg:17.11,w3:3,w5:0},field:{c:21,cb:3}},
  {name:"Vijay",role:"Bowler",cat:"Bowler",base:300,avail:7,bat:{m:68,i:39,no:12,r:147,hs:"21",avg:5.44,sr:90.18,s50:0,s100:0,f:15,s:4,duck:7,w:33,l:33,wp:.5},bowl:{wk:60,eco:8.12,bavg:18.7,w3:5,w5:1},field:{c:14,cb:0}},
  {name:"Yash",role:"Bowler",cat:"Bowler",base:350,avail:7,bat:{m:73,i:36,no:22,r:124,hs:"22*",avg:8.86,sr:89.86,s50:0,s100:0,f:11,s:5,duck:8,w:42,l:32,wp:.568},bowl:{wk:73,eco:8.98,bavg:16.88,w3:9,w5:1},field:{c:8,cb:1}},
];

const MAX_T = 11;
const MS = { Iconic: 1, "All Rounder": 3, Batsman: 3, Bowler: 1 };
const BM = { Iconic: 700, "All Rounder": 350, Batsman: 300, Bowler: 300 };

// ===== AUCTION STATE (server-authoritative) =====
let state = null; // null = not started

function freshState() {
  return {
    phase: "lobby", // lobby | live | done
    config: { bpp: 800, timer: 30, increment: 25 },
    captain1: null,
    captain2: null,
    queue: [],
    currentIndex: -1,
    currentBid: 0,
    currentBidTeam: null,
    bidCount: 0,
    timerSeconds: 30,
    timerRunning: false,
    team1: { name: "Team 1", budget: 0, players: [], slots: { Iconic: 0, "All Rounder": 0, Batsman: 0, Bowler: 0 } },
    team2: { name: "Team 2", budget: 0, players: [], slots: { Iconic: 0, "All Rounder": 0, Batsman: 0, Bowler: 0 } },
    floaters: [],
    history: [],
    roles: {}, // socketId -> role
    connected: { auctioneer: false, captain1: false, captain2: false, spectators: 0 },
  };
}

state = freshState();

// Timer interval
let timerInterval = null;

function minRes(tm, aCat) {
  let r = 0;
  for (let c in MS) {
    let need = MS[c] - (tm.slots[c] || 0);
    if (c === aCat) need = Math.max(0, need - 1);
    r += Math.max(0, need) * BM[c];
  }
  return r;
}

function mandLeft(tm, aCat) {
  let n = 0;
  for (let c in MS) {
    let need = MS[c] - (tm.slots[c] || 0);
    if (c === aCat) need = Math.max(0, need - 1);
    n += Math.max(0, need);
  }
  return n;
}

function canBid(tm, amt, pCat) {
  if (tm.players.length >= MAX_T) return { ok: false, msg: `${tm.name} squad full!` };
  if (amt > tm.budget) return { ok: false, msg: `${tm.name} budget too low (${tm.budget} left).` };
  const sl = MAX_T - tm.players.length - 1, ml = mandLeft(tm, pCat);
  if (sl < ml) return { ok: false, msg: `${tm.name} needs ${ml} mandatory picks, only ${sl} slots left.` };
  const res = minRes(tm, pCat);
  if (tm.budget - amt < res) return { ok: false, msg: `${tm.name} must reserve ${res} pts for mandatory slots.` };
  return { ok: true };
}

function stopTimer() {
  if (timerInterval) { clearInterval(timerInterval); timerInterval = null; }
  state.timerRunning = false;
}

function startTimer() {
  stopTimer();
  state.timerRunning = true;
  state.timerSeconds = state.config.timer;
  timerInterval = setInterval(() => {
    state.timerSeconds--;
    io.emit("timerTick", state.timerSeconds);
    if (state.timerSeconds <= 0) {
      stopTimer();
      if (state.currentBidTeam) {
        doSold();
      }
    }
  }, 1000);
}

function currentPlayer() {
  if (state.currentIndex >= 0 && state.currentIndex < state.queue.length)
    return state.queue[state.currentIndex];
  return null;
}

function doSold() {
  const p = currentPlayer();
  if (!p || !state.currentBidTeam) return;
  const tm = state.currentBidTeam === 1 ? state.team1 : state.team2;
  tm.budget -= state.currentBid;
  tm.players.push({ ...p, sp: state.currentBid });
  tm.slots[p.cat] = (tm.slots[p.cat] || 0) + 1;
  state.history.push({ player: p.name, cat: p.cat, price: state.currentBid, team: tm.name, tn: state.currentBidTeam, sold: true });
  stopTimer();
  io.emit("sold", { player: p.name, price: state.currentBid, team: tm.name, tn: state.currentBidTeam });
  io.emit("stateUpdate", getPublicState());
}

function doUnsold() {
  const p = currentPlayer();
  if (!p) return;
  state.floaters.push(p);
  state.history.push({ player: p.name, cat: p.cat, price: 0, team: "Unsold", sold: false });
  stopTimer();
  io.emit("unsold", { player: p.name });
  io.emit("stateUpdate", getPublicState());
}

function advanceToNext() {
  state.currentIndex++;
  // Both teams full?
  if (state.team1.players.length >= MAX_T && state.team2.players.length >= MAX_T) {
    while (state.currentIndex < state.queue.length) {
      const p = state.queue[state.currentIndex];
      state.floaters.push(p);
      state.history.push({ player: p.name, cat: p.cat, price: 0, team: "Floater (full)", sold: false });
      state.currentIndex++;
    }
    state.phase = "done";
    io.emit("auctionDone", getPublicState());
    return;
  }
  if (state.currentIndex >= state.queue.length) {
    state.phase = "done";
    io.emit("auctionDone", getPublicState());
    return;
  }
  const p = state.queue[state.currentIndex];
  state.currentBid = p.self || p.base;
  state.currentBidTeam = null;
  state.bidCount = 0;
  state.timerSeconds = state.config.timer;
  state.timerRunning = false;
  io.emit("nextPlayer", getPublicState());
}

function getPublicState() {
  return {
    phase: state.phase,
    config: state.config,
    captain1: state.captain1,
    captain2: state.captain2,
    queue: state.queue.map(p => p.name),
    currentIndex: state.currentIndex,
    currentPlayer: currentPlayer(),
    currentBid: state.currentBid,
    currentBidTeam: state.currentBidTeam,
    bidCount: state.bidCount,
    timerSeconds: state.timerSeconds,
    timerRunning: state.timerRunning,
    team1: state.team1,
    team2: state.team2,
    floaters: state.floaters,
    history: state.history,
    connected: state.connected,
    players: PLAYERS,
  };
}

// ===== SOCKET CONNECTIONS =====
io.on("connection", (socket) => {
  console.log("Connected:", socket.id);

  // Send current state
  socket.emit("stateUpdate", getPublicState());

  // Role claim
  socket.on("claimRole", (role) => {
    // Roles: auctioneer, captain1, captain2, spectator
    if (role === "auctioneer" && state.connected.auctioneer) {
      socket.emit("roleError", "Auctioneer role already taken!");
      return;
    }
    if (role === "captain1" && state.connected.captain1) {
      socket.emit("roleError", "Captain 1 role already taken!");
      return;
    }
    if (role === "captain2" && state.connected.captain2) {
      socket.emit("roleError", "Captain 2 role already taken!");
      return;
    }
    // Release old role if any
    releaseRole(socket.id);
    state.roles[socket.id] = role;
    if (role === "auctioneer") state.connected.auctioneer = true;
    else if (role === "captain1") state.connected.captain1 = true;
    else if (role === "captain2") state.connected.captain2 = true;
    else state.connected.spectators++;
    socket.emit("roleAssigned", role);
    io.emit("connectedUpdate", state.connected);
  });

  // Auctioneer: configure and start
  socket.on("configure", (cfg) => {
    if (state.roles[socket.id] !== "auctioneer") return;
    if (state.phase !== "lobby") return;
    state.config = { bpp: cfg.bpp || 800, timer: cfg.timer || 30, increment: cfg.increment || 25 };
    state.captain1 = cfg.captain1;
    state.captain2 = cfg.captain2;
    // Build queue
    const catOrder = cfg.catOrder || ["Batsman", "Bowler", "All Rounder", "Iconic"];
    let queue = [];
    catOrder.forEach(cat => {
      const names = cfg.playerOrder?.[cat] || PLAYERS.filter(p => p.cat === cat).map(p => p.name);
      names.forEach(nm => {
        if (nm === state.captain1 || nm === state.captain2) return;
        const p = PLAYERS.find(x => x.name === nm);
        if (p) queue.push({ ...p });
      });
    });
    state.queue = queue;
    const pp = Math.min(MAX_T, Math.ceil(queue.length / 2));
    const tb = state.config.bpp * pp;
    state.team1 = { name: `${state.captain1} XI`, budget: tb, players: [], slots: { Iconic: 0, "All Rounder": 0, Batsman: 0, Bowler: 0 } };
    state.team2 = { name: `${state.captain2} XI`, budget: tb, players: [], slots: { Iconic: 0, "All Rounder": 0, Batsman: 0, Bowler: 0 } };
    state.floaters = [];
    state.history = [];
    state.currentIndex = -1;
    state.phase = "live";
    advanceToNext();
  });

  // Auctioneer: next player
  socket.on("nextPlayer", () => {
    if (state.roles[socket.id] !== "auctioneer") return;
    if (state.phase !== "live") return;
    advanceToNext();
  });

  // Captain bids
  socket.on("bid", (data) => {
    const role = state.roles[socket.id];
    if (role !== "captain1" && role !== "captain2") return;
    if (state.phase !== "live") return;
    const tn = role === "captain1" ? 1 : 2;
    const p = currentPlayer();
    if (!p) return;
    // Can't outbid yourself
    if (state.currentBidTeam === tn && state.bidCount > 0) {
      socket.emit("bidError", "Wait for the other captain to bid!");
      return;
    }
    const tm = tn === 1 ? state.team1 : state.team2;
    const increment = data.increment || state.config.increment;
    let nb = state.bidCount === 0 ? state.currentBid : state.currentBid + increment;
    const chk = canBid(tm, nb, p.cat);
    if (!chk.ok) { socket.emit("bidError", chk.msg); return; }
    state.currentBid = nb;
    state.currentBidTeam = tn;
    state.bidCount++;
    // Auto-start timer
    startTimer();
    io.emit("bidPlaced", { team: tn, teamName: tm.name, amount: nb, player: p.name });
    io.emit("stateUpdate", getPublicState());
  });

  // Auctioneer: sold
  socket.on("sold", () => {
    if (state.roles[socket.id] !== "auctioneer") return;
    if (!state.currentBidTeam) return;
    doSold();
  });

  // Auctioneer: unsold
  socket.on("unsold", () => {
    if (state.roles[socket.id] !== "auctioneer") return;
    doUnsold();
  });

  // Auctioneer: undo
  socket.on("undo", () => {
    if (state.roles[socket.id] !== "auctioneer") return;
    if (!state.history.length) return;
    const last = state.history.pop();
    if (last.sold) {
      const tm = last.tn === 1 ? state.team1 : state.team2;
      tm.budget += last.price;
      tm.players = tm.players.filter(p => p.name !== last.player);
      tm.slots[last.cat] = Math.max(0, (tm.slots[last.cat] || 0) - 1);
    } else {
      state.floaters = state.floaters.filter(p => p.name !== last.player);
    }
    state.currentIndex--;
    state.phase = "live";
    advanceToNext();
  });

  // Auctioneer: reset entire auction
  socket.on("resetAuction", () => {
    if (state.roles[socket.id] !== "auctioneer") return;
    stopTimer();
    const roles = state.roles;
    const connected = state.connected;
    state = freshState();
    state.roles = roles;
    state.connected = connected;
    io.emit("stateUpdate", getPublicState());
  });

  // Disconnect
  socket.on("disconnect", () => {
    console.log("Disconnected:", socket.id);
    releaseRole(socket.id);
    io.emit("connectedUpdate", state.connected);
  });

  function releaseRole(id) {
    const role = state.roles[id];
    if (!role) return;
    if (role === "auctioneer") state.connected.auctioneer = false;
    else if (role === "captain1") state.connected.captain1 = false;
    else if (role === "captain2") state.connected.captain2 = false;
    else if (role === "spectator") state.connected.spectators = Math.max(0, state.connected.spectators - 1);
    delete state.roles[id];
  }
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`🏏 Cricket Auction server running on port ${PORT}`);
});
