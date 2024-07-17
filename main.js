import { v4 as uuidv4 } from "https://jspm.dev/uuid";
import {
  clearBtn,
  container,
  displayAlert,
  form,
  grocery,
  list,
  submitBtn,
} from "./js/helpers.js";

let editElement;
let editFlag = false;
let editID = "";

//! fonksiyonlar
const deleteItem = (e) => {
    const element = e.currentTarget.closest(".grocery-item");
    list.removeChild(element);
    displayAlert("Başarıyla kaldırıldı","danger");
};

const editItem = (e) => {
    const element = e.currentTarget.closest(".grocery-item");
    editElement = e.target.parentElement.parentElement.previousElementSibling;
    grocery.value = editElement.innerHTML;
    editFlag = true;
    editID = element.dataset.id;
    submitBtn.textContent = "Düzenle";
};

const clearItems = ()=> {
    const items = document.querySelectorAll(".grocery-item");
    if (items.length>0){
        items.forEach((item)=>list.removeChild(item));
    }
   container.classList.remove("show-container");
};

const getLocalStorage = ()=>{
    return localStorage.getItem("list") ? JSON.parse(localStorage.getItem("list")):[];
}; //neden objeye çevirdik ? neden list i kullanarak getirmeyi denedik örnek veriyorum container olmaz mıydı ?

const addToLocalStorage = (id, value) => {
    const grocery = { id, value };
    let items = getLocalStorage();
    items.push(grocery);
    console.log(items);
    localStorage.setItem("list", JSON.stringify(items));
  }; // neden iki parametre kullandık ?  grocery i neden push ladık? neden string e çevirdik en son?
  
  //* localStoragedan idye göre silme işlemi
  const removeFromLocalStorage = (id) => {
    let items = getLocalStorage();
  
    items = items.filter((item) => item.id !== id);
    //* localStorage a güncellenmiş veriyi gönder
    localStorage.setItem("list", JSON.stringify(items));
  };
  
  const editLocalStorage = (id, value) => {
    let items = getLocalStorage();
  
    // items = items.map((item) => {
    //   if (item.id === id) {
    //     item.value = value;
    //   }
    //   return item;
    // });
    items = items.map((item) => (item.id === id ? { ...item, value } : item));
  
    localStorage.setItem("list", JSON.stringify(items));
  };
