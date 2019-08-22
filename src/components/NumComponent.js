import {NumControl} from "./NumControl"

class NumComponent extends Rete.Component {
    constructor(editor, vueComponent, numSocket){
        super('工作任务项');
        this.editor = editor
        this.vueComponent = vueComponent
        this.numSocket = numSocket
    }

    builder(node) {
        console.log('++++++++++++')
        var inp1 = new Rete.Input('num1',"输入", this.numSocket, true); // 下同，第四个参数表示允许多个连接
        var out = new Rete.Output('num2', "输出", this.numSocket, true);
        inp1.addControl(new NumControl(this.editor, 'num'))
        return node
            .addInput(inp1)
            .addControl(new NumControl(this.editor, 'preview', this.vueComponent))
            .addOutput(out)
    }

    worker(node, inputs, outputs){
        console.log('---------')
        console.log(node)
        console.log(inputs)
        console.log(outputs)
    }
}

export {NumComponent}
