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
    engine.register(numComponent)

    numComponent.createNode({num: 2})
        .then(numNode => {
            numNode.position = [80,200];
            editor.addNode(numNode)

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
        })

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
    height: 200px;
  }
</style>
