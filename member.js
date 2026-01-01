function showAddMember() {
    document.getElementById("dashboard").style.display = "none";
    document.getElementById("addMember").style.display = "block";
}

function backToDashboard() {
    document.getElementById("addMember").style.display = "none";
    document.getElementById("dashboard").style.display = "block";
    refreshDashboard();
}

function generateMemberId() {
    let d = new Date();
    let mm = String(d.getMonth() + 1).padStart(2, "0");
    let yy = String(d.getFullYear()).slice(-2);
    let rr = Math.floor(Math.random() * 100).toString().padStart(2, "0");
    return "MBR" + mm + yy + rr;
}

function saveMember() {

    let name = document.getElementById("name").value;
    let mobile = document.getElementById("mobile").value;
    let address = document.getElementById("address").value;
    let accountType = document.getElementById("accountType").value;
    let savingAmount = Number(document.getElementById("savingAmount").value || 0);
    let stampFiles = document.getElementById("stamp").files;

    if (!name || !mobile || !address || !accountType) {
        alert("All fields are mandatory");
        return;
    }

    if (stampFiles.length < 1) {
        alert("Stamp Paper image is required");
        return;
    }

    let member = {
        id: generateMemberId(),
        name: name,
        mobile: mobile,
        address: address,
        accountType: accountType,
        saving: savingAmount,
        loan: 0
    };

    addMemberDB(member);
    logActivity("Member Created", member.id);
    alert("Member Added Successfully");
    backToDashboard();
}
