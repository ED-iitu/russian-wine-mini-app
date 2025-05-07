import { defineStore } from 'pinia'

export const useCartStore = defineStore('cart', {
    state: () => ({
        items: [],
    }),
    actions: {
        loadCart() {
            const stored = localStorage.getItem('cart')
            this.items = stored ? JSON.parse(stored) : []
        },
        saveCart() {
            localStorage.setItem('cart', JSON.stringify(this.items))
        },
        add(wine) {
            const existing = this.items.find(item => item.id === wine.id)
            if (existing) {
                existing.quantity += 1
            } else {
                this.items.push({ ...wine, quantity: 1 })
            }
            this.saveCart()
        },
        remove(id) {
            this.items = this.items.filter(item => item.id !== id)
            this.saveCart()
        },
        clear() {
            this.items = []
            this.saveCart()
        },
    },
})
