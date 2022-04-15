import { createStore, Store } from "vuex";

declare module "@vue/runtime-core" {
  // declare your own store states
  interface State {
    cart: {
      items: Item[];
    };
    isAuthenticated: boolean;
    token: string;
    isLoading: boolean;
  }

  // provide typings for `this.$store`
  interface ComponentCustomProperties {
    $store: Store<State>;
  }
}

interface Item {
  quantity: number;
  product: {
    id: number;
    category: string;
    name: string;
    slug: string;
    description: string;
    price: number;
    image: string;
    thumbnail: string;
    date_added: Date;
  };
}

interface StateType {
  cart: {
    items: Item[];
  };
  isAuthenticated: boolean;
  token: string;
  isLoading: boolean;
}

export default createStore({
  state: {
    cart: {
      items: [],
    },
    isAuthenticated: false,
    token: "",
    isLoading: false,
  },
  getters: {},
  mutations: {
    initializeStore(state: StateType) {
      const cart = localStorage.getItem("cart");
      if (cart === null) {
        localStorage.setItem("cart", JSON.stringify(state.cart));
      } else {
        state.cart = JSON.parse(cart);
      }
    },
    addToCart(state: StateType, item: Item) {
      const exists: Item[] = state.cart.items.filter(
        (i: Item) => i.product.id === item.product.id
      );
      if (exists.length) {
        exists[0].quantity = exists[0].quantity + item.quantity;
      } else {
        state.cart.items.push(item);
      }
      localStorage.setItem("cart", JSON.stringify(state.cart));
    },
    setIsLoading(state: StateType, status: boolean) {
      state.isLoading = status;
    },
  },
  actions: {},
  modules: {},
});
