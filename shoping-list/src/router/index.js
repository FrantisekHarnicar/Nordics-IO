import {createRouter, createWebHistory} from "vue-router"
import SearchView from "../views/Search.vue"
import CartView from "../views/Cart.vue"
import FavouriteView from "../views/Favourite.vue"
import MealView from "../views/Meal.vue"

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition
          } else {
            return { top: 0 }
          }
      },
    routes: [
        {
            path: "/",
            name: "search",
            component: SearchView
        },
        {
            path: "/cart",
            name: "cart",
            component: CartView
        },
        {
            path: "/favourite",
            name: "favourite",
            component: FavouriteView
        },
        {
            path: "/meal/:id",
            props:  true,
            name: "meal",
            component: MealView
        },
    ]
})

export default router