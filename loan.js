function showLoanApply() {
    document.getElementById("dashboard").style.display = "none";
    document.getElementById("loanApply").style.display = "block";

    loadMemberForLoan();
}

function loadMemberForLoan() {
    getMembers(members => {
        let sel = document.getElementById("loanMember");
        sel.innerHTML = "<option value=''>Select Member</option>";
        members.forEach(m => {
            sel.innerHTML += `<option value="${m.id}">${m.id} - ${m.name}</option>`;
        });
    });
}

function generateLoanId(memberId, count) {
    return "LN" + memberId + String(count).padStart(2, "0");
}

function applyLoan() {
    let memberId = loanMember.value;
    let amount = Number(loanAmount.value);

    if (!memberId || !amount) {
        alert("All loan fields required");
        return;
    }

    let loan = {
        id: "LN" + memberId + Date.now(),
        memberId: memberId,
        amount: amount,
        paid: 0,
        status: "Active"
    };

    let tx = db.transaction("members", "readwrite");
    let store = tx.objectStore("members");

    store.get(memberId).onsuccess = e => {
        let m = e.target.result;
        m.loan += amount;
        store.put(m);
        alert("Loan Applied");
        backToDashboard();
    };
}
