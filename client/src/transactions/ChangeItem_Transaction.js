import jsTPS_Transaction from "../common/jsTPS.js"
/**
 * ChangeItem_Transaction
 * 
 * This class represents a transaction that works with item editing. 
 * It will be managed by the transaction stack
    
    @author McKilla Gorilla
    @author Ishan Arefin
 */
export default class ChangeItem_Transaction extends jsTPS_Transaction {
    constructor(initStore, initOldItem, initNewItem, index) {
        super();
        this.store = initStore;
        this.oldItemName = initOldItem;
        this.newItemName = initNewItem;
        this.index = index;
    }

    doTransaction() {
        this.store.changeItemName(this.index, this.newItemName);
    }
    
    undoTransaction() {
        this.store.changeItemName(this.index, this.oldItemName);
    }
}