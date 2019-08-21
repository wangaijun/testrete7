class NumControl extends Rete.Control {

    constructor(emitter, key, vueNumControl, readonly) {
        super(key);
        this.component = vueNumControl;
        this.props = { emitter, ikey: key, readonly };
    }

    setValue(val) {
        this.vueContext.value = val;
    }
}

export {NumControl}
