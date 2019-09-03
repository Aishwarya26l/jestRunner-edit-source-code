//getContents.js

//Shown Block - Test - layoutItems[1]
//Editable Block - JS Source code - layoutItems[0]
function getContents() {
  const indexPage = `
  <html>
  <head>
    <meta charset="utf-8" />
    <meta
      content="width=device-width,initial-scale=1,minimal-ui"
      name="viewport"
    />
    <link
      rel="shortcut icon"
      href="data:image/x-icon;base64,AAABAAEAEBAAAAEAIABoBAAAFgAAACgAAAAQAAAAIAAAAAEAIAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP/////////////////////////+AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP/////6+fv/W0KZ/1tCmf9bQpn//v7+///////////+AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/////W0KZ/1tCmf9bQpn/W0KZ/1tCmf9bQpn//v7//////////////////Y+PjzkAAAAAAAAAAAAAAAAAAAAA/////1tCmf9bQpn//////1tCmf9bQpn/W0KZ/1tCmf9bQpn/W0GZ/0gTkv/+/v7//////wAAAAAAAAAAAAAAAP////9bQpn//////////9r/////opDE/1tCmf9bQpn/W0KZ/1tCmf9bQpn/W0KZ/1o+mv//////AAAAAAAAAAD/////Z1Ke//////8AAAAAAAAAAP////+FcrL/W0KZ/1tCmf9bQpn/W0KZ/1tCmf9bQpn//////wAAAAAAAAAAAAAAAP//////////////SwAAAAAAAAAA//////////9bQpn/W0KZ/19Hm/////////////////8AAAAAAAAAAP////v/////W0KZ//////8AAAAA/////04jlf9cRJr//////1tCmf//////W0KZ/+nn8P/////+AAAAAAAAAAD////5nYvB/1tCmf//////AAAAAP////9bQpn/W0KZ/////////////////1tCmf9fR5v//////wAAAAAAAAAAAAAAAP//////////////+wAAAADf398F//////////////94AAAAAP////v//////////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP////9YO5j//////wAAAAD//////////////8oAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/////W0KZ////////////8O71/1pBmf//////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAQEAC/////1tCmf9bQpn//////1tCmf9bQpn//////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/////1o/mf9bQpn/W0KZ//////9bQpn/W0KZ///////////gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP////9bQpn/W0KZ/1tCmf9bQpn/W0KZ/1tCmf9bQZn//////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAL+/vwL///////////////////////////////////////////////8AAAAAwf8AAIB/AACADwAAgAMAAIABAACMAQAAzgEAAIQBAACEAQAAxmMAAP4jAAD+AwAA/gMAAPwBAAD8AQAA/AEAAA=="
    />
    <link
      rel="stylesheet"
      href="https://unpkg.com/vue-material@beta/dist/vue-material.min.css"
    />
    <link
      rel="stylesheet"
      href="https://unpkg.com/vue-material@beta/dist/theme/default.css"
    />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.32.0/codemirror.min.css" />
  </head>
    <body>
    <div id="app">
        <div class="md-layout">
          <div class="md-layout-item">
            <h1 style="padding: 0px;">Javascript Activity : Edit the source code to pass the tests</h1>
          </div>
        </div>
        <md-tabs>
          <md-tab v-for="question in questions" :key=question.name v-bind:md-label=question.name+question.status>
            <jest-activity v-bind:layout-things=question.layoutItems v-bind:question-name=question.name  @questionhandler="toggleQuestionStatus"/>
          </md-tab>
        </md-tabs>
      </div>
    </body> 
    <script src="https://unpkg.com/vue"></script>
    <script src="https://unpkg.com/vue-material@beta"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.32.0/codemirror.min.js"></script>

    <script src="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.48.4/mode/javascript/javascript.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/vue-codemirror@4.0.6/dist/vue-codemirror.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/js-beautify/1.10.2/beautify.min.js"></script>
    <script>
    Vue.use(VueMaterial.default)
    Vue.use(window.VueCodemirror)
    Vue.component('jest-activity', {
        props: ['layoutThings', 'questionName'],
        data: function () {
            return {
            answer:"",
            layoutItems: this.layoutThings,
            isHidden: true,
            submitText: "Submit",
            isCorrectColor: "#ff5252",
            cmOptions: {
              mode: 'javascript',
              lineNumbers: true
            },
            cmReadOnly: {
              lineNumbers: true,
              mode:  "javascript",
              readOnly: true
            }
        }
        },
        methods: {
            postContents: function () {
            // comment: leaving the gatewayUrl empty - API will post back to itself
            const gatewayUrl = '';
            this.submitText = "Loading...";
            this.answer = "";
            this.isHidden = true;
            fetch(gatewayUrl, {
        method: "POST",
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
        },
        body: JSON.stringify({userToken: "ABCDE", shown:{0:this.layoutItems[1].vModel},editable:{0:this.layoutItems[0].vModel},hidden: {0: this.layoutItems[2].vModel}})
        }).then(response => {
            return response.json()
        }).then(data => {
            this.answer = JSON.parse(JSON.stringify(data));
              this.isHidden = false;
              this.submitText = "Submit";
              if (this.answer && this.answer.isComplete) {
                this.isCorrectColor = "green";
              } else {
                this.isCorrectColor = "#ff5252";
              }
            return this.$emit('questionhandler',{data, questionName:this.questionName})
            })
         }
        },
        template:  
        \`
      <div class="md-layout">
        <div class="md-layout-item md-size-100">
          <md-card class="input-card">
            <md-card-header>
              <md-card-header-text>
                <div class="md-layout md-gutter">
                  <div class="md-layout-item md-size-50">
                    <button class="button" id="submit" v-on:click="postContents">
                      <span>{{ submitText }}</span>
                    </button>
                    <button
                      class="button"
                      v-bind:class="{ hidden: isHidden}"
                      v-bind:style="{ background: isCorrectColor}"
                    >
                      <span>{{
                        answer && answer.isComplete ? "Passed" : "Failed"
                      }}</span>
                    </button>
                  </div>
                </div>
              </md-card-header-text>
            </md-card-header>
            <md-card-content>
              <div class="md-layout md-gutter">
                <div class="md-layout-item md-size-33">
                  <div style="border: 1px solid #eeeeee">
                    <label><b>[Edit your code] : example.js</b></label>
                    <codemirror class="editableTextarea" v-model="layoutItems[0].vModel" :options="cmOptions"></codemirror>
                  </div>
                </div>
                <div class="md-layout-item md-size-33">
                  <div style="border: 1px solid #eeeeee">
                    <label><b>example.test.js</b></label>
                    <codemirror class="shownTextarea" v-model="layoutItems[1].vModel" :options="cmReadOnly"></codemirror>
                  </div>
                </div>
                <div class="md-layout-item md-size-33">
                  <div style="border: 1px solid #eeeeee">
                    <label><b>config</b></label>
                    <codemirror class="hiddenTextarea" v-model="layoutItems[2].vModel" :options="cmReadOnly"></codemirror>
                  </div>
                </div>
              </div>
            </md-card-content>
          </md-card>
        </div>
        <div class="md-layout-item md-size-100 output-card">
          <md-card>
            <md-card-header>
              <md-card-header-text>
                <div class="md-title">Results</div>
              </md-card-header-text>
            </md-card-header>
            <md-card-content>
              <md-field>
                <md-tabs>
                  <md-tab id="tab-htmlResults" md-label="HTML results">
                    <div class="output-tab" v-html="answer.htmlFeedback"></div>
                  </md-tab>
                  <md-tab id="tab-jsonResults" md-label="JSON results">
                    <md-textarea
                      class="output-tab"
                      v-model="answer.jsonFeedback"
                      readonly
                    ></md-textarea>
                  </md-tab>
                  <md-tab id="tab-textResults" md-label="Text results">
                    <md-textarea
                      class="output-tab"
                      v-model="answer.textFeedback"
                      readonly
                    ></md-textarea>
                  </md-tab>
                </md-tabs>
              </md-field>
            </md-card-content>
          </md-card>
        </div>
      </div>
    \`
    })
    new Vue({
      el: "#app",
      data: function () {
            return {
            questions:[
                {name:"question 1", layoutItems: [
                {vModel: js_beautify(\`//example.js \\n function sum(a,b){return a}module.exports=sum;\`)},
                {vModel: js_beautify(\`//example.test.js \\n const sum=require("./example");test("2 + 0 = 2",()=>{expect(sum(2,0)).toBe(2)});test("2 + 2 = 4",()=>{expect(sum(2,2)).toBe(4)});test("2 + (-1) = 1",()=>{expect(sum(2,-1)).toBe(1)});\`)},  
                {vModel: js_beautify(\`{\\n"scripts":{ "test":"jest" }\\n}\`)}                  
                ], status:" 🔴"},
                {name:"question 2", layoutItems: [
                {vModel: js_beautify(\`//example.js \\n function fizzBuzz(a){return"Fizz"}module.exports=fizzBuzz;\`)},
                {vModel: js_beautify(\`//example.test.js \\n const fizzBuzz=require("./example");test("Fizz for multiple of 3",()=>{expect(fizzBuzz(6)).toBe("Fizz")});test("Buzz for multiple of 5",()=>{expect(fizzBuzz(10)).toBe("Buzz")});test("FizzBuzz for multiple of 3 and 5",()=>{expect(fizzBuzz(15)).toBe("FizzBuzz")});test("Nothing if not multiple of 3 or 5",()=>{expect(fizzBuzz(2)).toBe("Nothing")});\`)},  
                {vModel: js_beautify(\`{\\n"scripts":{ "test":"jest" }\\n}\`)}                
                ], status:" 🔴"},    
                {name:"question 3", layoutItems: [
                {vModel: js_beautify(\`//example.js \\n function isOdd(a){return true}module.exports=isOdd;\`)},
                {vModel: js_beautify(\`//example.test.js \\n const isOdd=require("./example");test("3 is Odd = true",()=>{expect(isOdd(3)).toBe(true)});test("4 is Odd = false",()=>{expect(isOdd(4)).toBe(false)});\`)},
                {vModel: js_beautify(\`{\\n"scripts":{ "test":"jest" }\\n}\`)}               
                ], status:" 🔴"},
                {name:"question 4", layoutItems: [
                {vModel: js_beautify(\`//example.js \\n function isEqual(a,b){return false}module.exports=isEqual;\`)},
                {vModel: js_beautify(\`//example.test.js \\n const isEqual=require("./example");test("2 equals 2 = true",()=>{expect(isEqual(2,2)).toBe(true)});test("2 equals 3 = false",()=>{expect(isEqual(2,3)).toBe(false)});test("-3 equals 3 = false",()=>{expect(isEqual(-3,3)).toBe(false)});\`)},
                {vModel: js_beautify(\`{\\n"scripts":{ "test":"jest" }\\n}\`)}         
                ], status:" 🔴"},
                {name:"question 5", layoutItems: [
                {vModel: js_beautify(\`//example.js \\n function mapDouble(a){return a.map(item=>item+2)}module.exports=mapDouble;\`)},
                {vModel: js_beautify(\`//example.test.js \\n const mapDouble=require("./example");test("mapDouble([1,2]) to equal [2,4]",()=>{expect(mapDouble([1,2])).toStrictEqual([2,4])});test("mapDouble([2,4]) to equal [4,8]",()=>{expect(mapDouble([2,4])).toStrictEqual([4,8])});test("mapDouble([1,1]) to equal [2,2]",()=>{expect(mapDouble([1,1])).toStrictEqual([2,2])});\`)},
                {vModel: js_beautify(\`{\\n"scripts":{ "test":"jest" }\\n}\`)}               
                ], status:" 🔴"}  
                ]
            }
      },
      methods: {
        toggleQuestionStatus (response) {
          const {data, questionName} = response
          if (data.isComplete) {
            this.questions.find(item => item.name === questionName).status = " ✔️";
            
          }
          else {
          this.questions.find(item => item.name === questionName).status = " 🔴";
          }
        }
      }       
    });
  </script>
  <style lang="scss" scoped>
    textarea {
      font-size: 1rem !important;
      height: 100%;
    }
    .md-card-header {
      padding-top: 0px;
    }
    .md-tabs {
      width: 100%;
    }
    .md-tab {
      min-height: 800px;
    }
    .md-content {
      min-height: 1200px !important;
    }
    .md-card {
      overflow: hidden;
    }
    .input-card {
      height: 400px;
    }
    .output-card > .md-card > .md-card-content > .md-field {
      padding-top: 0px;
    }
    .button {
      display: inline-block;
      border-radius: 4px;
      background-color: #0099ff;
      border: none;
      color: #ffffff;
      text-align: center;
      font-size: 20px;
      padding: 10;
      transition: all 0.5s;
      cursor: pointer;
      margin-top: 5px;
    }
    #submit span {
      cursor: pointer;
      display: inline-block;
      position: relative;
      transition: 0.5s;
    }
    #submit span:after {
      content: ">";
      position: absolute;
      opacity: 0;
      top: 0;
      right: -20px;
      transition: 0.5s;
    }
    #submit:hover span {
      padding-right: 25px;
    }
    #submit:hover span:after {
      opacity: 1;
      right: 0;
    }
    .hidden {
      display: none;
    }
    .output-tab {
      min-height: 1000px !important;
    }
    h1{
        margin-top: 1rem;
        padding:20px;
        text-align: center
    }  
  </style>
</html>
`;
  return indexPage;
}

module.exports = getContents;
