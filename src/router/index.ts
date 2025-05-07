import { createRouter, createWebHistory } from 'vue-router'
import WineCollection from '../views/WineCollection.vue'
import NamedWine from '../views/NamedWine.vue'
import Tastings from '../views/Tastings.vue'
import Subscription from '../views/Subscription.vue'
import WineSets from '../views/WineSets.vue'
import WineDetails from "@/components/WineDetails.vue";
import Cart from "@/components/Cart.vue";
import AdditionalPages from "@/components/AdditionalPages.vue";
import Contacts from "@/components/Contacts.vue";

const routes = [
  { path: '/', name: 'Menu', component: WineCollection },
  { path: '/collection', name: 'Collection', component: WineCollection },
  { path: '/named', name: 'NamedWine', component: NamedWine },
  { path: '/tastings', name: 'Tastings', component: Tastings },
  { path: '/subscription', name: 'Subscription', component: Subscription },
  { path: '/sets', name: 'WineSets', component: WineSets },
  { path: '/wine/:id', component: WineDetails, name: 'wine-details' },
  { path: '/cart', component: Cart, name: 'cart' },
  { path: '/additional', component: AdditionalPages, name: 'additional' },
  { path: '/contacts', component: Contacts, name: 'contacts' },

]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
