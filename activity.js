function logActivity(action, memberId = "", amount = "") {
    let tx = db.transaction("activity", "readwrite");
    let store = tx.objectStore("activity");

    store.add({
        id: Date.now(),
        action: action,
        memberId: memberId,
        amount: amount,
        date: new Date().toLocaleDateString(),
        time: new Date().toLocaleTimeString()
    });
}

function loadActivity(callback) {
    let tx = db.transaction("activity", "readonly");
    let store = tx.objectStore("activity");
    let req = store.getAll();

    req.onsuccess = () => callback(req.result);
}
