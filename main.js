////////////////////////////////
//////// global variables

const statusCounter = qS(".status");
const textField = qS(".enter-field");
const enterBtn = qS(".enter-btn");
const itemsHolder = qS(".items-holder");
const itemCheckedNum = qS(".a");
const itemCurrentNum = qS(".b");
const dateBtn = qS(".date-btn");
const skinsBtn = qS(".skins-btn");
const deleteAll = qS(".delete-all-btn");
const itemTitle = qS(".item-title");
const orangeBtn =qS(".orange");
const blueBtn = qS(".blue");
const redBtn = qS(".red");
const goldBtn = qS(".gold");
const silverBtn = qS(".silver");

let itemExist = false;
let isEditing = false;
////////////////////////////////
//////// functions definintions

function qS(elementClass)
{
    return document.querySelector(elementClass);
};

function cE(element)
{
    return document.createElement(element);
};



function enterItem()
{
    let inputData = textField.value;
    
    if(inputData == false)
    {
        alert("text field is empty! please, write a task!");
    } else {
        const nItem = cE("li");
        nItem.classList.add("item");
        
        itemsHolder.appendChild(nItem);

        const nTitleSect = cE("div");
        nTitleSect.classList.add("title-sect");
        nItem.appendChild(nTitleSect);

        const nTitleSectCont0 = cE("div");
        nTitleSectCont0.classList.add("title-sect-cont-0");
        nTitleSect.appendChild(nTitleSectCont0);

        const nTitleSectCont1 = cE("div");
        nTitleSectCont1.classList.add("title-sect-cont-1");
        nTitleSectCont0.appendChild(nTitleSectCont1);

        const nDate = cE("p");
        nDate.classList.add("date");
        const d = new Date();
        nDate.innerText = d.getDate() + "-" + (d.getMonth()+1) + "-" + d.getFullYear();
        nTitleSectCont1.appendChild(nDate);

        const nTitleSectCont2 = cE("div");
        nTitleSectCont2.classList.add("title-sect-cont-2");
        nTitleSectCont0.appendChild(nTitleSectCont2);

        //const nItemNum = cE("p");
        //nItemNum.classList.add("item-num");
        //nTitleSectCont2.appendChild(nItemNum);

        const nItemTitle = cE("p");
        nItemTitle.classList.add("item-title");
        nItemTitle.innerText = inputData;
        nTitleSectCont2.appendChild(nItemTitle);
        


        const nUtility = cE("div");
        nUtility.classList.add("utility");
        nTitleSect.appendChild(nUtility);


        const nCheck = cE("div");
        nCheck.classList.add("check-btn");
        nCheck.innerText = "ok";
        nUtility.appendChild(nCheck);
        nCheck.addEventListener("click", ()=>
        {
            
           if(isEditing == true)
           {
            return;
           } else{
                nItemTitle.classList.toggle("checked");
                nItem.classList.toggle("item-checked");
                if(nItem.classList.contains("item-checked"))
                    {
                        itemCheckedNum.innerText++;
                        toggleAllDone()
                    } else {
                            itemCheckedNum.innerText--;
                            toggleAllDone()
                            }
           }
        })

        const nUtilityCont = cE("div");
        nUtilityCont.classList.add("utility-cont");
        nUtility.appendChild(nUtilityCont);

        const nEdit = cE("div");
        nEdit.classList.add("edit-btn", "utility-btn");
        nEdit.innerText = "E";
        nUtilityCont.appendChild(nEdit);
        nEdit.addEventListener("click", ()=>
        {
            if(isEditing == true)
            {
                return;
            }
            else
            {
                nItem.classList.toggle("editing-now");
                nItem.classList.toggle("item");

                let titleBox;
                let dateBox;

                dateBox = nDate.innerText;
                console.log(dateBox);
                //nDate.remove();
                nDate.style.display = "none";
                const editingDate = cE("input");
                editingDate.classList.add("editing-date");
                editingDate.setAttribute("type", "date");
                editingDate.value = dateBox;
                nTitleSectCont1.appendChild(editingDate);
                

                titleBox = nItemTitle.innerText;
                //nItemTitle.remove();
                nItemTitle.style.display = "none";
                const editingTitle = cE("textarea");
                editingTitle.classList.add("editing-title");
                nTitleSectCont2.appendChild(editingTitle);
                editingTitle.innerText = titleBox;

                isEditing = true;

                const finishEdit = cE("input");
                finishEdit.classList.add("finish-edit");
                finishEdit.setAttribute("type", "button");
                finishEdit.value = "- OK -";
                nUtility.appendChild(finishEdit);
                finishEdit.addEventListener("click", ()=>
                    {
                        isEditing = false;
                        titleBox = editingTitle.value;
                        console.log(titleBox);
                        dateBox = editingDate.value;
                        console.log(dateBox);

                        nItem.classList.toggle("editing-now");
                        nItem.classList.toggle("item");


                        editingDate.remove();
                        editingTitle.remove();


                        nDate.style.display = "unset";
                        nDate.innerText = dateBox;
                        
                        nItemTitle.style.display = "unset";
                        nItemTitle.innerText = titleBox;

                        finishEdit.remove();
                    })
            }
            
        })


        const nRemove = cE("div");
        nRemove.classList.add("remove-btn", "utility-btn");
        nRemove.innerText = "X";
        nRemove.addEventListener("click", ()=>
        {
            isEditing = false;

            nItem.remove();
            if(nItem.classList.contains("item-checked")){
            itemCurrentNum.innerText--;
            itemCheckedNum.innerText--;
            toggleAllDone()
            } else{
                itemCurrentNum.innerText--;
                toggleAllDone()
            }
            if(itemCurrentNum.innerText == 0){
                toggleStatus()
            }
        })
        nUtilityCont.appendChild(nRemove);



        textField.value = null;
        itemCurrentNum.innerText++;
    }
}
function toggleStatus()
{
    checkItemExist()
    if(itemExist == false)
    {
        statusCounter.style.transform = "translateX(0px)";
    } else{
        statusCounter.style.transform = "translateX(95px)";
    }

    function checkItemExist(){
        if(itemsHolder.innerHTML == false)
        {
            itemExist = false;
        } else {
            itemExist = true;
        }
    }
}
function toggleAllDone(){
    //console.log("toggleAllDone()");
    //console.log("--------");
    if(itemCheckedNum.innerText > 0 && itemCheckedNum.innerText == itemCurrentNum.innerText)
    {
        qS(".task-num-holder").classList.add("all-done-holder");
        itemCheckedNum.classList.add("all-done");
        itemCurrentNum.classList.add("all-done");
    } else{
        //console.log("toggle all done - ELSE -");
        qS(".task-num-holder").classList.remove("all-done-holder");
        itemCheckedNum.classList.remove("all-done");
        itemCurrentNum.classList.remove("all-done");
    }
}
function removeItems()
{
    itemsHolder.innerHTML = null;
    itemCurrentNum.innerText = 0;
    itemCheckedNum.innerText = 0;
    isEditing = false;
}

function doSkin(object, color)
{
    qS(object).style.background = color;
}

////////////////////////////////
//////// start

textField.addEventListener("keydown", ()=>
{
    let key = event.key;
    if(key == "Enter")
    {
        enterItem()
        toggleStatus()
        toggleAllDone()
    }
})

enterBtn.addEventListener("click",()=>
{
    enterItem()
    toggleStatus()
    toggleAllDone()
});



deleteAll.addEventListener("click", ()=>
{
    removeItems();
    toggleStatus();
    toggleAllDone()
})

////////////////////////////////
//////// skins
skinsBtn.addEventListener("click", ()=>
{
    qS(".skins-pad").classList.toggle("skins-pad-active")
})
orangeBtn.addEventListener("click", ()=> 
{
    //qS(".logo").style.background = "orange";
    doSkin(".logo", "linear-gradient(90deg, rgb(102, 41, 17), tomato)");
    doSkin(".status", "linear-gradient(90deg, rgb(102, 41, 17), tomato)");
    doSkin(".main-pad", "linear-gradient(90deg, rgb(102, 41, 17), tomato)");
    doSkin(".chain", "linear-gradient(90deg, rgb(102, 41, 17), tomato)");
    doSkin(".sect-c", "linear-gradient(90deg, rgb(102, 41, 17), tomato)");
})
blueBtn.addEventListener("click", ()=> 
{
    doSkin(".logo", "linear-gradient(90deg, rgb(17, 30, 102), rgb(71, 172, 255))");
    doSkin(".status", "linear-gradient(90deg, rgb(17, 30, 102), rgb(71, 172, 255))");
    doSkin(".main-pad", "linear-gradient(90deg, rgb(17, 30, 102), rgb(71, 172, 255))");
    doSkin(".chain", "linear-gradient(90deg, rgb(17, 30, 102), rgb(71, 172, 255))");
    doSkin(".sect-c", "linear-gradient(90deg, rgb(17, 30, 102), rgb(71, 172, 255))");
})
redBtn.addEventListener("click", ()=> 
{
    doSkin(".logo", "linear-gradient(90deg, rgb(102, 17, 17), rgb(255, 71, 95))");
    doSkin(".status", "linear-gradient(90deg, rgb(102, 17, 17), rgb(255, 71, 95))");
    doSkin(".main-pad", "linear-gradient(90deg, rgb(102, 17, 17), rgb(255, 71, 95))");
    doSkin(".chain", "linear-gradient(90deg, rgb(102, 17, 17), rgb(255, 71, 95))");
    doSkin(".sect-c", "linear-gradient(90deg, rgb(102, 17, 17), rgb(255, 71, 95))");
})
goldBtn.addEventListener("click", ()=> 
{
    doSkin(".logo", "linear-gradient(90deg, rgb(102, 79, 17), rgb(255, 193, 58))");
    doSkin(".status", "linear-gradient(90deg, rgb(102, 79, 17), rgb(255, 193, 58))");
    doSkin(".main-pad", "linear-gradient(90deg, rgb(102, 79, 17), rgb(255, 193, 58))");
    doSkin(".chain", "linear-gradient(90deg, rgb(102, 79, 17), rgb(255, 193, 58))");
    doSkin(".sect-c", "linear-gradient(90deg, rgb(102, 79, 17), rgb(255, 193, 58))");
})
silverBtn.addEventListener("click", ()=> 
{
    doSkin(".logo", "linear-gradient(90deg, rgb(94, 94, 94), rgb(235, 235, 235))");
    doSkin(".status", "linear-gradient(90deg, rgb(94, 94, 94), rgb(235, 235, 235))");
    doSkin(".main-pad", "linear-gradient(90deg, rgb(94, 94, 94), rgb(235, 235, 235))");
    doSkin(".chain", "linear-gradient(90deg, rgb(94, 94, 94), rgb(235, 235, 235))");
    doSkin(".sect-c", "linear-gradient(90deg, rgb(94, 94, 94), rgb(235, 235, 235))");
})
qS(".day").addEventListener("click", ()=>
{
    document.getElementsByTagName("body")[0].style = "background: linear-gradient(rgb(245, 245, 245), gray);"
})
qS(".night").addEventListener("click", ()=>
{
    document.getElementsByTagName("body")[0].style = "background: linear-gradient(rgb(35, 34, 37), gray);"
    
})