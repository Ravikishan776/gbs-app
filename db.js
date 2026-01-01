let db;

// Database open
let request = indexedDB.open("GBS_DB", 1);

// First time database create
request.onupgradeneeded = function (event) {
    db = event.target.result;
    db.createObjectStore("members", { keyPath: "id" });
    db.createObjectStore("activity", { keyPath: "id" });
};

// When database ready
request.onsuccess = function (event) {
    db = event.target.result;
    console.log("Database Ready");
};

// Add member
function addMemberDB(member) {
    let tx = db.transaction("members", "readwrite");
    let store = tx.objectStore("members");
    store.add(member);
}

// Get all members
function getMembers(callback) {
    let tx = db.transaction("members", "readonly");
    let store = tx.objectStore("members");
    let req = store.getAll();

    req.onsuccess = function () {
        callback(req.result);
    };
}
