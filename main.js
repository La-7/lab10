const API = 'https://pokeapi.co/api/v2/pokemon/';

const $list = document.querySelector('.search-form .ls-drop-container > ul');
const $field = document.querySelector('.search-form > input');

let list = [];

function listGenerator(list) {
    let template = '';
    if (list.length != 0) {
        for (let i = 0; i < list.length; i++) {
            template += '<li>' + list[i].name + '</li>';
        }

    } else {
        template = '<li class = "notFound"> Not found </li>';
    }

    $list.innerHTML = template;
}

fetch(API)
    .then(function(responce) {
        return responce.json()
    })
    .then(function(data) {
        list = data.results;
        listGenerator(list);
    });


$field.addEventListener('input', function() {
    let query = this.value.toLowerCase();
    let buffer = list;

    buffer = buffer.filter(function(element) {
        return element.name.toLowerCase().indexOf(query) + 1;
    });

    listGenerator(buffer);
});

$list.addEventListener('click', function(e) {

    let str = e.target.outerHTML.replace();

    let template = '';
    let name = '';
    for (let i = 0; i < list.length; i++) {
        template = '<li>' + list[i].name + '</li>';
        if (template == str) {
            name = list[i].name;
            break;
        }
    }
    
    document.getElementById('txt').value = name;
});

$field.addEventListener('focus', function() {
    this.parentNode.classList.add('active');
});

$field.addEventListener('blur', function() {
    this.parentNode.classList.remove('active');
});
