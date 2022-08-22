(function multiTagger_3_1() {
  function toastMsg(str, sec, err) {
    WF.showMessage(str, err);
    setTimeout(WF.hideMessage, (sec || 2) * 1000);
  }
  const itemNameHasTag = (item, Tag) => WF.getItemNameTags(item).some(t => t.tag.toLowerCase() === Tag.toLowerCase());
  const htmlEscTextForContent = str => str.replace(/&/g, "&amp;").replace(/>/g, "&gt;").replace(/</g, "&lt;").replace(/\u00A0/g, " ");
  const htmlEscText = str => str.replace(/&/g, "&amp;").replace(/>/g, "&gt;").replace(/</g, "&lt;").replace(/"/g, "&quot;");
  function pendOmatic(items, input, prePend) {
    const inputTag = input.match(/[#@][a-zA-Z0-9][\w:-]*/);
    const inputTagTxt = inputTag ? inputTag[0].replace(/:{1,2}$/, "") : "";
    const inputHasTagBorder = inputTag ? prePend ? input.endsWith(inputTagTxt) : input.startsWith(inputTagTxt) : false;
    input = htmlEscTextForContent(input);
    const pend = inputHasTagBorder ? prePend ? `${input} ` : ` ${input}` : input;
    WF.editGroup(() => {
      items.forEach((item) => {
        if (!inputTag || !itemNameHasTag(item, inputTagTxt)) {
          var nuName = prePend ? pend + item.getName().trimLeft() : item.getName().trimRight() + pend;
          WF.setItemName(item, nuName);
        }
      });
    });
  }
  function createAllTagsDataList() {
    const options = getRootDescendantTagCounts().getTagList().map(Tag => `<option value="${Tag.tag} ">`);
    return `<datalist id="tagPicker"<option value="">${options.join('')}</datalist>`;
  }
  function getColors() {
    const p = document.querySelector(".page.active");
    return p ? `color:${getComputedStyle(p).color};background:${getComputedStyle(p).backgroundColor};` : "";
  }
  function multiTagAlert(bodyHtml) {
    const addButton = (num, name) => `<button type="button" class="btnX" id="btn${num.toString()}">${name}</button>`;
    const inputStyle = `#inputBx{${getColors()}width:95%;height:20px;display:block;margin-top:5px;border:1px solid #ccc;border-radius:4px;padding:5px}`;
    const buttonStyle = '.btnX{font-size:18px;background-color:steelblue;border:2px solid;border-radius:20px;color:#fff;padding:5px 15px;margin-top:16px;margin-right:16px}.btnX:focus{border-color:#c4c4c4}';
    const box = `<div><input id="inputBx" type="text" spellcheck="false" list="tagPicker">${createAllTagsDataList()}</div>`;
    const buttons = addButton(1, "Append &#8614;") + addButton(2, "&#8612; Prepend");
    WF.showAlertDialog(`<style>${htmlEscText(inputStyle + buttonStyle)}</style><div>${bodyHtml}</div>${box}<div>${buttons}</div>`, "Enter tag or text:");
    const intervalId = setInterval(function () {
      let inputBx = document.getElementById("inputBx");
      if (inputBx) {
        clearInterval(intervalId);
        let userInput;
        const btn1 = document.getElementById("btn1");
        const btn2 = document.getElementById("btn2");
        inputBx.select();
        inputBx.addEventListener("keyup", (event) => {
          if (event.key === "Enter") btn1.click();
        });
        btn1.onclick = () => {
          userInput = inputBx.value;
          WF.hideDialog();
          setTimeout(() => {
            pendOmatic(selections, userInput);
            WF.setSelection(selections);
          }, 50);
        };
        btn2.onclick = () => {
          userInput = inputBx.value;
          WF.hideDialog();
          setTimeout(() => {
            pendOmatic(selections, userInput, true);
            WF.setSelection(selections);
          }, 50);
        };
      }
    }, 50);
  }
  const selections = WF.getSelection().filter(item => !item.isReadOnly());
  if (selections.length === 0) {
    return void toastMsg(`Use WorkFlowy's multi-select to select bullets, and try again. <i>(Alt+Click or Cmd+Click)</i>`, 3, true);
  }
  WF.setSelection([]);  // Clear selections so arrow keys work
  multiTagAlert(`<i>${selections.length} items</i>`);
})();