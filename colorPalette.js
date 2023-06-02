function addColor() {
    const picker = document.getElementById("color-picker");
    const newColor = hexToRgb(picker.value);
    const existingColorDisplays = Array.from(document.querySelectorAll(".color-display"))
    const existingColorValues = existingColorDisplays.map(node => node.dataset.color);
    if (existingColorValues.includes(newColor)) {
        let existingColor = existingColorDisplays[existingColorValues.indexOf(newColor)];
        existingColor.classList.add("highlighted-color");
        setTimeout(() => existingColor.classList.remove("highlighted-color"), 350);
        return;
    }

    const colorDisplayTemplate = document.querySelector("#color-display-template");
    
    let colorDisplay = colorDisplayTemplate.content.cloneNode(true).querySelector("#new-color");
    colorDisplay.id = crypto.randomUUID();
    colorDisplay.setAttribute("data-color", newColor);
    colorDisplay.style.backgroundColor = picker.value;

    let palette = document.getElementById("color-palette");
    palette.appendChild(colorDisplay);
}

function selectColor(selected) {
    const selectColorClassName = "selected-color"
    
    if (Array.from(selected.classList).includes(selectColorClassName)) {
        selected.classList.remove(selectColorClassName);
        currentColor = COLORS.SOLID.BLACK;
        return;
    }

    let currentSelected = Array.from(document.querySelectorAll(".color-display"))
        .filter(colorDisplay => Array.from(colorDisplay.classList).includes(selectColorClassName));

    currentSelected.forEach(colorDisplay => colorDisplay.classList.remove(selectColorClassName));
    selected.classList.add(selectColorClassName);

    currentColor = selected.dataset.color;
}

function hexToRgb(hex) {
    hex = hex.replace('#', '');

    let bigint = parseInt(hex, 16);

    let r = (bigint >> 16) & 255;
    let g = (bigint >> 8) & 255;
    let b = bigint & 255;

    return `rgb(${r}, ${g}, ${b})`;
}