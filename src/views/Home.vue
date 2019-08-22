<template>

    <div id="rete" ref="rete"></div>
<!--    <div>{{ret}}</div>-->

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
      const n3 = await this.numComponent.createNode({num: 8});
      n1.position = [0,200];
      n2.position = [380, 400];
      n3.position = [500, 240]
      this.editor.addNode(n1)
      this.editor.addNode(n2)
      this.editor.addNode(n3)

      this.editor.connect(n1.outputs.get('num2'), n2.inputs.get('num1'));
      this.editor.connect(n2.outputs.get('num2'), n3.inputs.get('num1'));

      this.editor.on('process nodecreated noderemoved connectioncreated connectionremoved', async () => {
        await this.engine.abort();
        await this.engine.process(this.editor.toJSON());
      });

      this.editor.view.resize();
      AreaPlugin.zoomAt(this.editor);
      this.editor.trigger('process');

      let data = this.editor.toJSON()
      console.log(data)
      this.ret = 0
    })();
  },
  data () {
    return {
      ret: -1
    }
  }
}
</script>

<style>
  html, body {
    height: 100%;
    width: 100%;
  }
  .socket.number{
    background: #96b38a
  }
  /*.home {*/
  /*  width: 100%;*/
  /*  height: 100%;*/
  /*}*/
  /*.home .node-editor{*/
  /*  !*height: 800px;*!*/
  /*}*/
</style>
