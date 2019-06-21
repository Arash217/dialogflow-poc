const serialize = require('form-serialize');

const saveChannelBtn = document.getElementById('button_save_channel');
const formChannel = document.getElementById('form_channel');

const choices = new Choices('#form_lists', {
    removeItemButton: true,
    placeholderValue: 'Kies een lijst...',
    loadingText: 'Laden...',
    noResultsText: 'Geen resultaten gevonden',
    noChoicesText: 'Geen lijsten',
    itemSelectText: '',

});

const submitForm = async formData => {
    const res = await fetch('/kanalen', {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: {"Content-Type": "application/json"}
    });

    const content = await res.json();

    console.log(content)
};

saveChannelBtn.addEventListener('click', e => {
    e.preventDefault();
    const formData = serialize(formChannel,{ hash: true });
    submitForm(formData)
});
