import { defineStore } from "pinia";

export const useStore = defineStore({
    id: 'cartStore',
    state: () => ({
        cart: [],
        favourite: JSON.parse(localStorage.getItem("favourite"))
    }),
    actions: {
        addToCart(id, name, ingredients){
            const cartToAdd = 
                {
                    id: id,
                    name: name,
                    ingredients: ingredients
                }
            this.cart.push(cartToAdd)
        },
        deleteItem(index){
            this.cart.splice(index,1)
        },
        deleteIngredients(inFood, index){
            this.cart[inFood].ingredients.splice(index,1)
            if(this.cart[inFood].ingredients.length == 0){
                this.deleteItem(inFood)
            }
        },
        addFavourite(id, name, image, ingredients){
            if(this.favourite === null){
                this.favourite = []
            }
            const favourite = 
                {
                    id: id,
                    name: name,
                    image: image,
                    ingredients: ingredients
                }
            this.favourite.push(favourite)
            localStorage.setItem("favourite", JSON.stringify(this.favourite));
        },
        deleteFromFavourite(id){
            let index = this.favourite.findIndex(item => item.id === id)
            if(index === -1)return
            this.favourite.splice(index,1)
            localStorage.setItem("favourite", JSON.stringify(this.favourite));
        }
    }
})