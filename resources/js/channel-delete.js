const tingle = require("tingle.js");
const table = document.getElementById("table");
let channelName = "";
let channelId = "";

table.addEventListener("click", function(e) {
    let currentButton = e.target;
    if (currentButton.classList.contains("button__delete")) {
        let buttonId = e.target.value;
        let buttonName = e.target.dataset.dataname;

        channelName = buttonName;
        channelId = buttonId;

        console.log(channelName)
        modal.setContent(
            "<h2>Weet je zeker dat je channel, " + channelName + " wilt verwijderen?</h2>"
        );
        modal.open();
    }
});


var modal = new tingle.modal({
    footer: true,
    stickyFooter: false,
    closeMethods: ["overlay", "button", "escape"],
    closeLabel: "Close",
    cssClass: ["custom-class-1", "custom-class-2"],
    beforeClose: function() {
      // here's goes some logic
      // e.g. save content before closing the modal
      return true; // close the modal
      return false; // nothing happens
    }
});


// Hier mee bezit Sahbi!

// add a button
modal.addFooterBtn("Verwijderen", "button spacing button--gray", function() {
    deleteList(listId);
    modal.close();
});
modal.addFooterBtn("Terug", "button spacing button--gold", function() {
    modal.close();
});