class NumComponent extends Rete.Component {
    constructor(numSocket){
        super('Number');
        this.numSocket = numSocket
    }

    builder(node) {
        let out = new Rete.Output('Number',this.numSocket);

        node.addOutput(out);
    }

    worker(node, inputs, outputs){
        outputs[0] = node.data.num;
    }
}

export {NumComponent}
