import {NumControl} from "./NumControl"

class NumComponent extends Rete.Component {
    constructor(editor, vueComponent){
        super('工作任务项');
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
