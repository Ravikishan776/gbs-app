function backupData() {
    let pin = prompt("Enter Backup PIN");
    if (pin !== "0001000") {
        alert("Wrong PIN");
        return;
    }

    let tx1 = db.transaction("members", "readonly").objectStore("members").getAll();
    let tx2 = db.transaction("activity", "readonly").objectStore("activity").getAll();

    tx1.onsuccess = () => {
        tx2.onsuccess = () => {
            let data = {
                members: tx1.result,
                activity: tx2.result
            };

            let blob = new Blob([JSON.stringify(data)], { type: "application/json" });
            let a = document.createElement("a");
            a.href = URL.createObjectURL(blob);
            a.download = "GBS_Backup.json";
            a.click();

            logActivity("Backup Created");
        };
    };
}

function restoreData() {
    let pin = prompt("Enter Restore PIN");
    if (pin !== "0001000") {
        alert("Wrong PIN");
        return;
    }

    let input = document.createElement("input");
    input.type = "file";
    input.accept = ".json";

    input.onchange = e => {
        let file = e.target.files[0];
        let reader = new FileReader();

        reader.onload = () => {
            let data = JSON.parse(reader.result);

            let tx = db.transaction(["members","activity"], "readwrite");

            let mStore = tx.objectStore("members");
            let aStore = tx.objectStore("activity");

            data.members.forEach(m => mStore.put(m));
            data.activity.forEach(a => aStore.put(a));

            alert("Restore Successful");
        };

        reader.readAsText(file);
    };

    input.click();
}
