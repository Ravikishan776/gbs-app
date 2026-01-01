function refreshDashboard() {
    getMembers(function (members) {

        document.getElementById("tm").innerText = members.length;

        document.getElementById("tsm").innerText =
            members.filter(m => m.accountType !== "Loan").length;

        document.getElementById("tlm").innerText =
            members.filter(m => m.accountType !== "Saving").length;

        let totalSaving = 0;
        let totalLoan = 0;

        members.forEach(m => {
            totalSaving += m.saving || 0;
            totalLoan += m.loan || 0;
        });

        document.getElementById("tsa").innerText = totalSaving;
        document.getElementById("tla").innerText = totalLoan;
        document.getElementById("rb").innerText = totalSaving - totalLoan;
    });
}
function showActivity() {
    document.getElementById("dashboard").style.display = "none";
    document.getElementById("activity").style.display = "block";

    loadActivity(list => {
        let html = "";
        list.reverse().forEach(a => {
            html += `
                <div style="background:#fff;padding:5px;margin:5px;">
                    <b>${a.action}</b><br>
                    Member: ${a.memberId}<br>
                    Amount: ${a.amount}<br>
                    ${a.date} ${a.time}
                </div>
            `;
        });
        document.getElementById("activityList").innerHTML = html;
    });
}
