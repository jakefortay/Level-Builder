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
    floors = floors.filter(floor => floor.id != id);
    hazards = hazards.filter(hazard => hazard.id != id);
    endPoints = endPoints.filter(endPoint => endPoint.id != id);
    document.getElementById(id).remove();
}

function updateShapePosition(id, input) {
    let obj = getObjectToModify(id);
    obj[input.dataset.point] = parseInt(input.value);
}

function updateShapeTag(id, input) {
    let obj = getObjectToModify(id);
    obj.tag = input.value;
}

function getObjectToModify(id) {
    let floorsToModify = floors.filter(floor => floor.id == id);
    if (floorsToModify.length > 0) return floorsToModify[0];

    let hazardsToModify = hazards.filter(hazard => hazard.id == id);
    if (hazardsToModify.length > 0) return hazardsToModify[0];

    let endPointsToModify = endPoints.filter(endPoint => endPoint.id == id);
    if (endPointsToModify.length > 0) return endPointsToModify[0];
}