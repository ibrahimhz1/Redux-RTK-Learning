import axios from "axios"

export function fetchItems(){
    return axios.get(`http://localhost:3344/cart`)
}

export function addItem(item){
    return axios.post(`http://localhost:3344/cart`, item);
}

export function updateItem(id, itemUpdate){
    return axios.patch(`http://localhost:3344/cart/${id}`, itemUpdate);
}

export function deleteItem(id){
    return axios.delete(`http://localhost:3344/cart/${id}`);
}

