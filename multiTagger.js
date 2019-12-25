(function multiTagger_2_9() {
  function toastMsg(str, sec, err) {
    WF.showMessage(str, err);
    setTimeout(WF.hideMessage, (sec || 2) * 1000);
  }
  const itemNameHasTag = (item, Tag) => WF.getItemNameTags(item).some(t => t.tag.toLowerCase() === Tag.toLowerCase());
  const htmlEscTextForContent = str => str.replace(/&/g, "&amp;").replace(/>/g, "&gt;").replace(/</g, "&lt;").replace(/\u00A0/g, " ");
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
  function multiTagAlert(bodyHtml) {
    const inputStyle = '#inputBx{width:95%;height:20px;display:block;margin-top:5px;border:1px solid #ccc;border-radius:4px;padding:5px}';
    const buttonStyle = '.btnX{font-size:18px;background-color:#49baf2;border:2px solid;border-radius:20px;color:#fff;padding:5px 15px;margin-top:16px;margin-right:16px}.btnX:focus{border-color:#c4c4c4}';
    const box = `<div><input id="inputBx" type="text" spellcheck="false" list="tagPicker">${createAllTagsDataList()}</div>`;
    const b1 = `<button type="button" class="btnX" id="btn1">Append &#8614;</button>`;
    const b2 = `<button type="button" class="btnX" id="btn2">&#8612; Prepend</button>`;
    WF.showAlertDialog(`<style>${htmlEscapeText(inputStyle + buttonStyle)}</style><div>${bodyHtml}</div>${box}<div>${b1 + b2}</div>`, "Enter tag or text:");
    setTimeout(() => {
      let userInput;
      const inputBx = document.getElementById("inputBx");
      const btn1 = document.getElementById("btn1");
      const btn2 = document.getElementById("btn2");
      inputBx.select();
      inputBx.addEventListener("keyup", (event) => {
        if (event.key === "Enter") btn1.click();
      });
      btn1.onclick = () => {
        userInput = inputBx.value;
        WF.hideDialog();
        setTimeout(() => pendOmatic(selections, userInput), 50);
      };
      btn2.onclick = () => {
        userInput = inputBx.value;
        WF.hideDialog();
        setTimeout(() => pendOmatic(selections, userInput, true), 50);
      };
    }, 100);
  }
  const selections = WF.getSelection().filter(item => !item.isReadOnly());
  if (selections.length === 0) {
    return void toastMsg(`Use WorkFlowy's multi-select to select bullets, and try again. <i>(Alt+Click or Cmd+Click)</i>`, 3, true);
  }
  multiTagAlert(`<i>${selections.length} items</i>`);
})();