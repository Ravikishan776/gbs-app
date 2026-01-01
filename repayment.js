function showRepayment() {
    document.getElementById("dashboard").style.display = "none";
    document.getElementById("repayment").style.display = "block";
}

function repayLoan() {
    let memberId = repayMember.value;
    let amount = Number(repayAmount.value);

    if (!memberId || !amount) {
        alert("All fields required");
        return;
    }

    let tx = db.transaction("members", "readwrite");
    let store = tx.objectStore("members");

    store.get(memberId).onsuccess = e => {
        let m = e.target.result;

        if (amount > m.loan) {
            alert("Overpayment not allowed");
            return;
        }

        m.loan -= amount;
        m.saving += amount;

        store.put(m);
        alert("Loan Repayment Done");
        backToDashboard();
    };
}
