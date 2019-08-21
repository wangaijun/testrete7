import {NumControl} from "./NumControl"

class NumComponent extends Rete.Component {
    constructor(numSocket, editor, vueComponent){
        super('Number');
        this.numSocket = numSocket
        this.editor = editor
        this.vueComponent = vueComponent
    }

    builder(node) {
        node.addControl(new NumControl(this.editor, 'num', this.vueComponent));
    }

    worker(node, inputs, outputs){
        outputs[0] = node.data.num;
    }
}

export {NumComponent}
