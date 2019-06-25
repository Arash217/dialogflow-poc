const tingle = require("tingle.js");
const serialize = require("form-serialize");

const saveChannelBtn = document.getElementById("button_save_channel");
const formChannel = document.getElementById("form_channel");

const choices = new Choices("#form_lists", {
    removeItemButton: true,
    placeholderValue: "Kies een lijst...",
    loadingText: "Laden...",
    noResultsText: "Geen resultaten gevonden",
    noChoicesText: "Geen lijsten",
    itemSelectText: ""
});

const formInputsPathMap = [{
        input: "channel_name",
        path: "channel_name"
    },
    {
        input: "channel_subject",
        path: "channel_subject"
    }
];
const removeErrors = () => {
    const elements = document.getElementsByClassName("form__error");
    while (elements.length > 0) {
        elements[0].parentNode.removeChild(elements[0]);
    }
};

const getErrorElement = error => {
    return `<div class="form__error">${error}</div>`;
};

const renderErrors = errors => {
    removeErrors();
    errors.forEach(error => {
        let {
            path
        } = error;
        path = path.includes(".") ? path.split(".")[1] : path;
        const {
            input
        } = formInputsPathMap.find(input => input.path === path);
        const element = document.getElementById(input);
        element.insertAdjacentHTML("afterend", getErrorElement(error.message));
    });
};

export const request = async (url, options) => {
    const res = await fetch(url, options);
    const data = await res.json();
    if (!res.ok) throw data;
    return data;
};

const modal = new tingle.modal({
    closeMethods: []
});

const setModalContent = (code, counter) => {
    const modalMessage = `<div>
        <p class="modal__text">Kanaal is aangemaakt. De kanaalcode is:
            <span class="modal__bold-text modal__bold-text--highlighted">kanaal ${code}</span>
        </p>
        <p class="modal__text modal__text--small">Je wordt automatisch doorgestuurd naar kanalen overzicht pagina in
            <span class="modal__bold-text">${counter}</span>
        seconden</p>
    </div>`;
    modal.setContent(modalMessage);
};

const startModalCountdown = code => {
    let counter = 5;
    setModalContent(code, counter);
    modal.open();
    const countDownInterval = setInterval(() => {
        setModalContent(code, counter);
        if (counter-- === 0) {
            clearInterval(countDownInterval);
            modal.close();
            window.location.href = "/kanalen";
        }
    }, 1000);
};

const submitForm = async formData => {
    try {
        const {
            code
        } = await request("/kanalen", {
            method: "POST",
            body: JSON.stringify(formData),
            headers: {
                "Content-Type": "application/json"
            }
        });
        startModalCountdown(code);
    } catch (e) {
        if (e.inner) {
            renderErrors(e.inner);
        }
    }
};

saveChannelBtn.addEventListener("click", e => {
    e.preventDefault();
    const formData = serialize(formChannel, {
        hash: true
    });
    submitForm(formData);
});
