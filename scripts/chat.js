let server = location.hash.substr(1);
if (!server) {
    server = "wss://ws-chat-server.glitch.me"; // default server
}
let ws;

let loginForm = document.querySelector("form#login");
let msgForm = document.querySelector("form#msg");
let chatDiv = document.querySelector("div#chat");
let usersDiv = document.querySelector("div#users");

loginForm.url.value = server;

function escapeHtml(string) {
    let entityMap = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;',
        '/': '&#x2F;',
        '`': '&#x60;',
        '=': '&#x3D;'
    };
    return String(string).replace(/[&<>"'`=\/]/g, function (s) {
        return entityMap[s];
    });
}

function send(data) {
    ws.send(data);
    localStorage.DEBUG ? console.log("[>] " + data) : false;
}

function getWs(func) {
    if (ws)
        ws.close();

    let _ws = new WebSocket(server);
    localStorage.DEBUG ? console.log("[*] CONNECT " + server) : false;
    _ws.onmessage = msgHandler;
    _ws.onclose = ws_closed;
    _ws.onerror = () => localStorage.DEBUG ? console.log("[!] CONNECTION_FAILED") : false;
    _ws.onopen = func;
    return _ws;
};

loginForm.onsubmit = e => {
    e.preventDefault();
    let name = loginForm.name.value;
    server = loginForm.url.value;
    ws = getWs(() => send(name));
}
msgForm.onsubmit = e => {
    e.preventDefault();
    let msg = msgForm.msg.value;
    send("MESSAGE|" + msg);
}


function msgHandler(m) {
    m = m.data;
    let data = m.split("|");
    switch (data[0]) {
        case "NAME_OK":
            loginForm.toggleAttribute("hide", true);
            msgForm.toggleAttribute("hide", false);
            break;
        case "MESSAGE":
            chatDiv.innerHTML += `<div class="text-primary">&lt;${escapeHtml(data[1])}&gt; ${escapeHtml(data.filter((x, idx) => idx > 1).join("|"))}</div>`;
            chatDiv.scrollTop = chatDiv.scrollHeight;
            break;
        case "USER_JOIN":
            chatDiv.innerHTML += `<div class="text-secondary">[JOIN] ${escapeHtml(data[1])}</div>`;
            chatDiv.scrollTop = chatDiv.scrollHeight;
            break;
        case "USER_LEFT":
            chatDiv.innerHTML += `<div class="text-secondary">[LEFT] ${escapeHtml(data[1])}</div>`;
            chatDiv.scrollTop = chatDiv.scrollHeight;
            break;
        case "WARN_DELAY":
            chatDiv.innerHTML += `<div class="text-warning">You're sending messages too fast.</div>`;
            chatDiv.scrollTop = chatDiv.scrollHeight;
            break;
        case "NAME_TAKEN":
            chatDiv.innerHTML += `<div class="text-warning">That name is taken. Try a different one.</div>`;
            chatDiv.scrollTop = chatDiv.scrollHeight;
            break;
        case "ERR_INVALID_NAME":
            chatDiv.innerHTML += `<div class="text-warning">That name is invalid. Try a different one.</div>`;
            chatDiv.scrollTop = chatDiv.scrollHeight;
            break;
        case "VERSION":
            chatDiv.innerHTML += `<div class="text-info">The server is currently using version ${escapeHtml(data[1])}</div>`;
            chatDiv.scrollTop = chatDiv.scrollHeight;
            break;
        case "LIST_USERS":
            usersDiv.innerHTML = "";
            data[1].split(",").forEach(x =>
                usersDiv.innerHTML += `<div class="text-primary">${escapeHtml(x)}</div>`
            );
            break;
    }
    localStorage.DEBUG ? console.log("[<] " + m) : false;
}

function ws_closed() {
    loginForm.toggleAttribute("hide", false);
    msgForm.toggleAttribute("hide", true);
    localStorage.DEBUG ? console.log("[!] WS_CLOSED") : false;
    usersDiv.innerHTML = "Disconnected";
    chatDiv.innerHTML = "Disconnected";
}
