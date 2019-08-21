<template>

    <div id="rete"></div>
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
  mounted() {
    const container = document.querySelector('#rete');

    const editor = new Rete.NodeEditor('demo@0.1.0', container);
    editor.use(ConnectionPlugin);
    editor.use(VueRenderPlugin)
    editor.use(ContextMenuPlugin.default);
    editor.use(AreaPlugin);
    editor.use(CommentPlugin.default);
    editor.use(HistoryPlugin);
    editor.use(ConnectionMasteryPlugin.default);

    const numComponent = new NumComponent(editor, VueNumControl, numSocket);

    const engine = new Rete.Engine('demo@0.1.0');

    editor.register(numComponent);

    (async () => {
      engine.register(numComponent)

      const n1 = await numComponent.createNode({num: 2});
      const n2 = await numComponent.createNode({num: 4});
      const n3 = await numComponent.createNode({num: 8});
      n1.position = [0,200];
      n2.position = [380, 400];
      n3.position = [500, 240]
      editor.addNode(n1)
      editor.addNode(n2)
      editor.addNode(n3)

      editor.connect(n1.outputs.get('num2'), n2.inputs.get('num1'));
      editor.connect(n2.outputs.get('num2'), n3.inputs.get('num1'));

      editor.on('process nodecreated noderemoved connectioncreated connectionremoved', async () => {
        await engine.abort();
        await engine.process(editor.toJSON());
      });

      editor.view.resize();
      AreaPlugin.zoomAt(editor);
      editor.trigger('process');

      let data = editor.toJSON()
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
