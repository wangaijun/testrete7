<template>
  <div class="home">
    <div id="rete" class="node-editor"></div>
    <div>{{ret}}</div>
  </div>
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
    editor.use(VueRenderPlugin)

    const numComponent = new NumComponent(editor, VueNumControl);

    const engine = new Rete.Engine('demo@0.1.0');

    editor.register(numComponent);

    (async () => {
      engine.register(numComponent)

      const n1 = await numComponent.createNode({num: 2});
      const n2 = await numComponent.createNode({num: 4});
      n1.position = [80,200];
      n2.position = [80, 400];
      editor.addNode(n1)
      editor.addNode(n2)

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
  .socket.number{
    background: #96b38a
  }
  .home {

  }
  .home .node-editor{
    height: 400px;
  }
</style>
