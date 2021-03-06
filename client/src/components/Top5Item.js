import { React, useContext, useState } from "react";
import { GlobalStoreContext } from '../store'
/*
    This React component represents a single item in our
    Top 5 List, which can be edited or moved around.
    
    @author McKilla Gorilla
*/
function Top5Item(props) {
    const { store } = useContext(GlobalStoreContext);
    const [draggedTo, setDraggedTo] = useState(0);
    const [text, setText ] = useState("");
    const [ editActive, setEditActive ] = useState(false);

    function handleDragStart(event) {
        if(!store.isItemEditActive){
            event.dataTransfer.setData("item", event.target.id);
        }
    }

    function handleDragOver(event) {
        if(!store.isItemEditActive){
            event.preventDefault();
        }
    }

    function handleDragEnter(event) {
        if(!store.isItemEditActive){
            event.preventDefault();
            setDraggedTo(true);
        }
    }

    function handleDragLeave(event) {
        if(!store.isItemEditActive){
            event.preventDefault();
            setDraggedTo(false);
        }
    }

    function handleDrop(event) {
        if(!store.isItemEditActive){
            event.preventDefault();
            let target = event.target;
            let targetId = target.id;
            targetId = targetId.substring(target.id.indexOf("-") + 1);
            let sourceId = event.dataTransfer.getData("item");
            sourceId = sourceId.substring(sourceId.indexOf("-") + 1);
            setDraggedTo(false);

            // UPDATE THE LIST
            store.addMoveItemTransaction(sourceId, targetId);
        }
    }

    function handleEditItem(event){
        if(!store.isItemEditActive){
            document.getElementById("undo-button").style.opacity = 0.2;
            document.getElementById("close-button").style.opacity = 0.2;
            document.getElementById("redo-button").style.opacity = 0.2;
            //event.preventDefault();
            //event.stopPropagation();
            let idd = event.target.id.charAt(10);
            setText(store.currentList.items[idd]);
            store.setIsItemEditActive();
            toggleItemEdit();
            let id = event.target.id;
            //console.log(event.target.id); this gives you "edit-item-01, 11, 21, 32, 41"
        }
    }

    function toggleItemEdit() {
        let newActive = !editActive;
        setEditActive(newActive);
    }

    function handleKeyPress(event){
        if(event.code === "Enter"){
            let index = event.target.id.charAt(10); //gives you the item number we are working on 
            //store.changeItemName(index, text);
            store.addChangeItemTransaction(index, text);
            toggleItemEdit();
        }
    }

    function handleUpdateText(event){
        setText(event.target.value);
    }

    let { index } = props;
    let itemClass = "top5-item";
    if (draggedTo) {
        itemClass = "top5-item-dragged-to";
    }
    let itemElement = 
        <div
            id={'item-' + (index + 1)}
            className={itemClass}
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            draggable="true"
        >
            <input
                type="button"
                id={"edit-item-" + index + 1}
                className="list-card-button"
                onClick={handleEditItem}
                value={"\u270E"}
            />
            {props.text}
        </div> 

    if(editActive){
        itemElement = 
            <input
                id={"edit-item-" + index + 1}
                className={itemClass}
                type='text'
                defaultValue={text}
                onKeyPress={handleKeyPress}
                onChange={handleUpdateText}
            /> 
    }



    return (
        itemElement
        );
}

export default Top5Item;