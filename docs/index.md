# Multi-Tagger Bookmarklet for WorkFlowy
- Append/Prepend tags or text to multiple bullets at once.
- Use WorkFlowy's multi-select feature to select bullets. *Alt+Click or Cmd+Click*
- Activate and enter your tag or text into the input box.
- Click *Append* or *Prepend*
- Tip: A tag character `#|@` is not required to trigger the tag picker.
- Tip: Pressing *Enter* while in the input box is the same as clicking *Append*. 

![multiTagger](https://i.imgur.com/63F5hzZ.png)

## Installation: Drag this link to your bookmarks bar:

<a href="javascript:(function multiTagger_2_8(){function toastMsg(str,sec,err){WF.showMessage(str.bold(),err);setTimeout(()=&gt;WF.hideMessage(),(sec||2)*1e3)}function itemNameHasTag(item,Tag){return WF.getItemNameTags(item).some(t=&gt;t.tag.toLowerCase()===Tag.toLowerCase())}function pendOmatic(items,input,prePend){const inputTag=input.match(/[#@][a-zA-Z0-9][\w:-]*/);const inputTagTxt=inputTag?inputTag[0].replace(/:{1,2}$/,&quot;&quot;):&quot;&quot;;const inputHasTagBorder=inputTag?prePend?input.endsWith(inputTagTxt):input.startsWith(inputTagTxt):false;input=htmlEscapeTextForContent(input);const pend=inputHasTagBorder?prePend?`${input} `:` ${input}`:input;WF.editGroup(()=&gt;{items.forEach(item=&gt;{if(!inputTag||!itemNameHasTag(item,inputTagTxt)){var nuName=prePend?pend+item.getName().trimLeft():item.getName().trimRight()+pend;WF.setItemName(item,nuName)}})})}function createAllTagsDataList(){const options=getRootDescendantTagCounts().getTagList().map(Tag=&gt;`&lt;option value=&quot;${Tag.tag} &quot;&gt;`);return`&lt;datalist id=&quot;tagPicker&quot;&lt;option value=&quot;&quot;&gt;${options.join('')}&lt;/datalist&gt;`}function multiTagAlert(bodyHtml){const inputStyle='#inputBx{width:95%;height:20px;display:block;margin-top:5px;border:1px solid #ccc;border-radius:4px;padding:5px}';const buttonStyle='.btnX{font-size:18px;background-color:#49baf2;border:2px solid;border-radius:20px;color:#fff;padding:5px 15px;margin-top:16px;margin-right:16px}.btnX:focus{border-color:#c4c4c4}';const box=`&lt;div&gt;&lt;input id=&quot;inputBx&quot; type=&quot;text&quot; spellcheck=&quot;false&quot; list=&quot;tagPicker&quot;&gt;${createAllTagsDataList()}&lt;/div&gt;`;const b1=`&lt;button type=&quot;button&quot; class=&quot;btnX&quot; id=&quot;btn1&quot;&gt;Append &amp;#8614;&lt;/button&gt;`;const b2=`&lt;button type=&quot;button&quot; class=&quot;btnX&quot; id=&quot;btn2&quot;&gt;&amp;#8612; Prepend&lt;/button&gt;`;WF.showAlertDialog(`&lt;style&gt;${htmlEscapeText(inputStyle+buttonStyle)}&lt;/style&gt;&lt;div&gt;${bodyHtml}&lt;/div&gt;${box}&lt;div&gt;${b1+b2}&lt;/div&gt;`,&quot;Enter tag or text:&quot;);setTimeout(()=&gt;{let userInput;const inputBx=document.getElementById(&quot;inputBx&quot;);const btn1=document.getElementById(&quot;btn1&quot;);const btn2=document.getElementById(&quot;btn2&quot;);inputBx.select();inputBx.addEventListener(&quot;keyup&quot;,event=&gt;{if(event.key===&quot;Enter&quot;)btn1.click()});btn1.onclick=(()=&gt;{userInput=inputBx.value;WF.hideDialog();setTimeout(()=&gt;pendOmatic(selections,userInput),50)});btn2.onclick=(()=&gt;{userInput=inputBx.value;WF.hideDialog();setTimeout(()=&gt;pendOmatic(selections,userInput,true),50)})},100)}const selections=WF.getSelection().filter(item=&gt;!item.isReadOnly());if(selections.length===0){return void toastMsg(`Use WorkFlowy's multi-select to select bullets, and try again. &lt;i&gt;(Alt+Click or Cmd+Click)&lt;/i&gt;`,3,true)}multiTagAlert(`&lt;i&gt;${selections.length} items&lt;/i&gt;`)})();">multiTagger</a>


## Links:
- [Source code](https://github.com/rawbytz/multi-tagger/blob/master/multiTagger.js)
- [rawbytz Blog](https://rawbytz.wordpress.com)


## Version Notes:
- v2.8 (2019-06-11) Minor cosmetic bug fix
- v2.7 (2019-06-04) Fixes for API changes
- v2.6 (2019-05-29) Bug fix: Read only selections are ignored
- v2.4 (2019-01-07) Minor bug fixes, removed duplicate option
- v2.3 (2018-12-29) Minor bug fixes
- v2.2 (2018-12-18) Add Tag picker to input box
- v2.1 (2018-12-14) Remove deprecated code
- v2.0 (2018-11-06) Fix broken buttons
- v1.9 (2018-10-27) Added visual arrows to buttons, and Shift+Enter keyboard shortcut for Prepend.


<!-- 
LINKS REFERENCING THIS
@BLOGGER https://www.blogger.com/blogger.g?blogID=6597785605721546133#editor/target=page;pageID=8185578935534960183

@SOFTWARE https://rawbytz.wordpress.com/software/

@WFBLOG https://blog.workflowy.com/2018/10/11/multi-tag/
 -->
