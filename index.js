
import {initializeApp} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import{getDatabase,ref,push,onValue,remove} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings={
databaseURL : "https://addnotes-54a2a-default-rtdb.asia-southeast1.firebasedatabase.app/"
};
const app = initializeApp(appSettings);
const database = getDatabase(app);
const textInDb = ref(database,"textData");

const items_txt=document.getElementById("items-txt");
const btn=document.getElementById("btn");
const txt_list=document.getElementById("txt-list");

onValue(textInDb,function(snapshot){
    if(snapshot.exists()){
        let txtItemsArray=Object.entries(snapshot.val());
        txt_list.innerHTML="";
        for (let i = 0; i < txtItemsArray.length; i++) {
            let currentTxt = txtItemsArray[i];
            let currentId = currentTxt[0];
            let currentVal = currentTxt[1];
            addItemToTxtList(currentTxt);
        }
    }
    else{
        txt_list.innerHTML = "No text items here.........."
    }
    
});

btn.addEventListener('click',function(){
push(textInDb,items_txt.value);
clear(items_txt);
});

function clear(para2){
    para2.value="";
}
function addItemToTxtList(para){
    // txt_list.innerHTML+=`<li>${para}</li>`;
    let newEl=document.createElement("li");
    newEl.textContent=para[1];
    newEl.addEventListener("click", function() {
        // Challenge: Make a let variable called 'exactLocationOfItemInDB' and set it equal to ref(database, something) where you substitute something with the code that will give you the exact location of the item in question.
        let exactLocationOfItemInDB = ref(database, `textData/${para[0]}`)
        
        // Challenge: Use the remove function to remove the item from the database
        remove(exactLocationOfItemInDB)
    })
    txt_list.append(newEl);

}
