function addShapeToDomList(shape) {
    let list = document.getElementById("object-list");
    let listItemTemplate = document.querySelector("#list-item-template");

    let item = listItemTemplate.content.cloneNode(true).querySelector("#list-item-id");
    item.id = shape.id;
    item.querySelector("button").onclick = () => removeShapeFromDomList(shape.id);

    let inputList = item.querySelectorAll("input.object-position-input");
    inputList.forEach(input => {
        input.dataset.id = shape.id;
        input.step = GRID_SPACING;
        input.value = shape[input.dataset.point];
        input.onchange = () => updateShapePosition(shape.id, input);
    });

    let tagNameInput = item.querySelectorAll("input.object-tag-input")[0];
    tagNameInput.dataset.id = shape.id;
    tagNameInput.value = shape.tag;
    tagNameInput.onchange = () => updateShapeTag(shape.id, tagNameInput);

    list.appendChild(item);
}

function removeShapeFromDomList(id) {
    gameObjects = gameObjects.filter(obj => obj.id != id)
    document.getElementById(id).remove();
}

function updateShapePosition(id, input) {
    let obj = getObjectToModify(id);

    if (input.dataset.point === "dir") {
        obj[input.dataset.point] = input.value; 
    } else {
        obj[input.dataset.point] = parseInt(input.value); 
    }
}

function updateShapeTag(id, input) {
    let obj = getObjectToModify(id);
    obj.tag = input.value;
}

function getObjectToModify(id) {
    return gameObjects.filter(obj => obj.id == id)[0];
}