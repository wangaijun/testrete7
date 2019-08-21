import {NumControl} from "./NumControl"

class NumComponent extends Rete.Component {
    constructor(numSocket, editor, vueComponent){
        super('Number');
        this.numSocket = numSocket
        this.editor = editor
        this.vueComponent = vueComponent
    }

    builder(node) {
        let out = new Rete.Output('Number',this.numSocket);

        node.addControl(new NumControl(this.editor, 'num', this.vueComponent)).addOutput(out);
    }

    worker(node, inputs, outputs){
        outputs[0] = node.data.num;
    }
}

export {NumComponent}
