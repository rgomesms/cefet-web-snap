const controlsContainer = document.getElementsByClassName('controles')[0];

// Exercicio 0
const visibilityCheckbox = controlsContainer.querySelector('#visibilidade-das-marcacoes');

visibilityCheckbox.addEventListener('change', (e) => {
	const main = document.querySelector("body > main");
	main.classList.toggle(visibilityCheckbox.value)
})

// Exercicio 1
const popup = document.querySelector('#balaozinho');
const marks = document.querySelectorAll('.marcacao');

function editPopup({ title, content, color }) {
	popup.innerHTML = `<h2>${title}</h2><p>${content}</>`
	popup.style.color = color
}

function movePopup(x, y) {
	let left = `${x}px`
	let top = `${y}px`
	popup.style.left = left;
	popup.style.top = top;
}

function clearPopup() {
	popup.innerHTML = ``;
	popup.style = ``;
}

function getMarkData(mark) {
	let title = mark.getAttribute('data-titulo');
	let content = mark.getAttribute('data-conteudo');
	let color = mark.getAttribute('data-cor');
	let format = mark.getAttribute('data-formato');
	return { title, content, color, format };
}

marks.forEach((mark) => {
	mark.addEventListener('mouseover', () => {
		const data = getMarkData(mark);
		editPopup(data);
	})
	mark.addEventListener('mousemove', ({ pageX, pageY }) => {
		movePopup(pageX, pageY)
	})
	mark.addEventListener('mouseout', () => {
		clearPopup();
	})
});


// Exercicio 2
const controls = {
	x: controlsContainer.querySelector('#x-da-marcacao'),
	y: controlsContainer.querySelector('#y-da-marcacao'),
	width: controlsContainer.querySelector('#largura-da-marcacao'),
	height: controlsContainer.querySelector('#altura-da-marcacao'),
	title: controlsContainer.querySelector('#titulo-da-marcacao'),
	content: controlsContainer.querySelector('#conteudo-da-marcacao'),
	color: controlsContainer.querySelector('#cor-da-marcacao'),
	rectShape: controlsContainer.querySelector('input[value="formato-retangular"]'),
	ovalShape: controlsContainer.querySelector('input[value="formato-oval"]'),

}

function switchSelectedMark(mark) {
	let selectedMark = document.querySelector('.marcacao.selecionada')
	if (selectedMark)
		selectedMark.classList.remove('selecionada')
	mark.classList.add('selecionada')
}

function updateControls(mark) {
	// Preenche os campos de section.controles
	controls.x.value = parseInt(mark.style.left);
	controls.y.value = parseInt(mark.style.left);
	controls.width.value = parseInt(mark.style.width);
	controls.height.value = parseInt(mark.style.width);

	let { title, content, color, format } = getMarkData(mark)
	controls.title.value = title
	controls.content.value = content
	controls.color.value = color

	format == "formato-retangular" ? controls.rectShape.checked = true : controls.ovalShape.checked = true;

}
marks.forEach((mark) => {
	mark.addEventListener('click', (e) => {
		switchSelectedMark(mark);
		updateControls(e.target);
	})
})


// Exercicio 3
function updateMark(mark, data) {
	// Preenche os campos de mark
	mark.style.left = `${data.x.value}px`
	mark.style.top = `${data.y.value}px`
	mark.style.width = `${data.width.value}px`
	mark.style.height = `${data.height.value}px`

	mark.setAttribute('data-titulo', data.title.value)
	mark.setAttribute('data-conteudo', data.content.value)
	mark.setAttribute('data-cor', data.color.value)

	// Reseta os estilos do formato e atribui o que esta selecionado
	mark.classList.remove(controls.rectShape.value)
	mark.classList.remove(controls.ovalShape.value)

	let shape = document.querySelector('input[type="radio"]:checked').value;
	mark.setAttribute('data-formato', shape)
	mark.classList.add(shape)


}

Object.values(controls).forEach((control) => {
	control.addEventListener('change', () => {
		updateMark(document.querySelector('.marcacao.selecionada'), controls)
	})
})

// Exercicio 4
const filter = document.querySelector('#filtro-da-photo');
const photo = document.querySelector('.photo-anotada > img');

filter.addEventListener('change', () => {
	photo.style.filter = filter.value;
})

//Exercicio 5
const fileInput = document.querySelector('#imagem');
fileInput.addEventListener('change', (e) => {
	const file = e.target.files[0];

	if (file.type && !file.type.startsWith('image/')) {
		console.log('File is not an image.', file.type, file);
		return;
	}

	const reader = new FileReader();
	reader.addEventListener('load', (event) => {
		let src = event.target.result;
		if (src)
			photo.image = src;
	});
	reader.readAsDataURL(file);

	console.log(reader);

})

function readImage(file) {
	// Check if the file is an image.
	if (file.type && !file.type.startsWith('image/')) {
		console.log('File is not an image.', file.type, file);
		return;
	}
}

// Atribuindo os valores padrões, durante a primeira execução
// A ideia é passar por todos os marks, atribuindo suas propriedades
marks.forEach((mark) => {
	updateControls(mark);
	updateMark(mark, controls);
})
updateControls(document.querySelector('.marcacao.selecionada'))
