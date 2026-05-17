import { DUMMY_PRODUCTS } from "../dummy-products";

export function shoppingCartReducer(state, action) {
    if (action.type === 'ADD_ITEM') {
         // PASSO 1: cria uma cópia do array atual
          const updatedItems = [...state.items];
          // updatedItems = [ {id:1, name:'Shirt', quantity:2}, {id:2, name:'Hat', quantity:1} ]

          // PASSO 2: verifica se o produto já está no carrinho
            const existingCartItemIndex = updatedItems.findIndex(
                (cartItem) => cartItem.id === action.payload // action.payload = 3 (o id)
            );
            const existingCartItem = updatedItems[existingCartItemIndex];

            if (existingCartItem) {
                 // SE o produto JÁ está no carrinho → só incrementa a quantidade
                const updatedItem = {
                    ...existingCartItem,
                    quantity: existingCartItem.quantity + 1,
                };
                updatedItems[existingCartItemIndex] = updatedItem;
            } else {
                 // SE o produto NÃO está no carrinho → adiciona novo
                const product = DUMMY_PRODUCTS.find((product) => product.id === action.payload);
                // product = { id:3, title:'Shoes', price:99 }
                updatedItems.push({
                    id: action.payload,
                    name: product.title,
                    price: product.price,
                    quantity: 1,
                });
            }

            return {
                ...state,  // copia tudo do state antigo (outros campos além de items)
                items: updatedItems, // sobrescreve APENAS o campo items com a versão atualizada
            };
        }

    if (action.type === 'UPDATE_ITEM') {
            const updatedItems = [...state.items];
            const updatedItemIndex = updatedItems.findIndex(
                (item) => item.id === action.payload.productId
            );

            const updatedItem = {
                ...updatedItems[updatedItemIndex],
            };

            updatedItem.quantity += action.payload.amount;

            if (updatedItem.quantity <= 0) {
                updatedItems.splice(updatedItemIndex, 1);
            } else {
                updatedItems[updatedItemIndex] = updatedItem;
            }

            return {
                ...state,
                items: updatedItems,
            };
    }
    return state;
}