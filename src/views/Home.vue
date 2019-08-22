<template>

    <div id="rete" ref="rete"></div>

</template>

<script>
  import Rete from "rete";
  import ConnectionPlugin from 'rete-connection-plugin';
  import VueRenderPlugin from 'rete-vue-render-plugin';

  import {NumComponent} from "../components/NumComponent"
  import VueNumControl from "../components/VueNumControl"

  const numSocket = new Rete.Socket('Number value');

export default {
  name: 'home',
  components: {
    VueNumControl
  },
  data () {
    return {
      container: null,
      editor: null,
      engine: null,
      numComponent: null,
    }
  },
  mounted() {
    (async () => {
      this.container = this.$refs.rete

      this.editor = new Rete.NodeEditor('demo@0.1.0', this.container);
      this.editor.use(ConnectionPlugin);
      this.editor.use(VueRenderPlugin)
      this.editor.use(ContextMenuPlugin.default);
      this.editor.use(AreaPlugin);
      this.editor.use(CommentPlugin.default);
      this.editor.use(HistoryPlugin);
      this.editor.use(ConnectionMasteryPlugin.default);

      this.numComponent = new NumComponent(this.editor, VueNumControl, numSocket);

      this.engine = new Rete.Engine('demo@0.1.0');

      this.editor.register(this.numComponent);
      this.engine.register(this.numComponent)

      const n1 = await this.numComponent.createNode({num: 2});
      const n2 = await this.numComponent.createNode({num: 4});
      n1.position = [0,200];
      n2.position = [380, 400];
      this.editor.addNode(n1)
      this.editor.addNode(n2)

      this.editor.connect(n1.outputs.get('num2'), n2.inputs.get('num1'));

      this.editor.on('process nodecreated noderemoved connectioncreated connectionremoved', async () => {
        await this.engine.abort();
        await this.engine.process(this.editor.toJSON());
      });

      this.editor.on('connectioncreate', res => {
          console.log('connectionremoved')
          console.log(res.output)
          console.log(res.input)
      } )

      this.editor.on('error', ({ message, data }) => {
          console.log('engine: err ->')
          console.log(message)
          console.log(data)
      });

      this.editor.view.resize();
      AreaPlugin.zoomAt(this.editor);
      this.editor.trigger('process');

      let data = this.editor.toJSON()
      console.log(data)
    })();
  }
}
</script>

<style>
  html, body {
    height: 100%;
    width: 100%;
  }
</style>
