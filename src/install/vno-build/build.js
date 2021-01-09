// deno-lint-ignore-file
import Vue from "https://cdn.jsdelivr.net/npm/vue@2.6.12/dist/vue.esm.browser.js";

const HelloVno = Vue.component(
  "hello-vno",
  {
    template:
      `<div class="hello"><h1>{{ msg }}</h1><p><br></p><h3><a href="https://vno.land" target="_blank" rel="noopener">vno.land</a> & <a href="https://github.com/oslabs-beta/vno" target="_blank" rel="noopener">github</a></h3><ul><br></ul></div>`,
    name: "hello-vno",
    props: { msg: String },
  },
);
const App = new Vue(
  {
    template:
      ` <div id="app"> <img src="https://svgshare.com/i/SNz.svg" alt="image" border="0" width="450" height="450" /> <HelloVno msg="you are building: your project with vno" /> </div>`,
    name: "app",
    components: { HelloVno },
    /* another comment */ data: () => ({
      code: `#!/bin/shhostnameuptimeuname -a`,
    }),
  },
);

App.$mount("#app");
export default App;
