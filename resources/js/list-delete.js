const tingle = require("tingle.js");
const table = document.getElementById("table");
let listName = "";
let listId = "";

table.addEventListener("click", function(e) {
	let currentButton = e.target;
	if (currentButton.classList.contains("button__delete")) {
		let buttonId = e.target.value;
		let buttonName = e.target.dataset.dataname;

		listName = buttonName;
		listId = buttonId;
		modal.setContent(
			"<h2>Weet je zeker dat je lijst, " + listName + " wilt verwijderen?</h2>"
		);
		modal.open();
	}
});

const modal = new tingle.modal({
	footer: true,
	stickyFooter: false,
	closeMethods: ["overlay", "button", "escape"],
	closeLabel: "Close",
	cssClass: ["custom-class-1", "custom-class-2"],
	beforeClose: function() {
		return true; // close the modal
		return false;
	}
});

const request = async (url, options) => {
	const res = await fetch(url, options);
	const data = await res.json();
	if (!res.ok) throw data;
	return data;
};

function removeElement(id) {
var elem = document.getElementById(id);
return elem.parentNode.removeChild(elem);
}

const deleteList = async listId => {
try {
	const data = await request("/lijsten", {
		method: "DELETE",
		body: JSON.stringify({ listId }),
		headers: { "Content-Type": "application/json" }
	});
	removeElement("row_" + listId);
} catch (e) {
	console.log(e);
}
};
// add a button
modal.addFooterBtn("Verwijderen", "button spacing button--gray", function() {
	deleteList(listId);
	modal.close();
});
modal.addFooterBtn("Terug", "button spacing button--gold", function() {
	modal.close();
});
