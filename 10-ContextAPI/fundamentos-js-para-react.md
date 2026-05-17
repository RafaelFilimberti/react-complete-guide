# Fundamentos JavaScript para React

Material de estudo baseado no código real do projeto (Context API + useReducer).
Cada conceito é explicado com exemplos do carrinho de compras que você já conhece.

---

## 1. Arrow Functions

Uma arrow function é uma forma curta de escrever uma função.

### Forma tradicional vs arrow function

```js
// Forma tradicional
function somar(a, b) {
    return a + b;
}

// Arrow function — exatamente a mesma coisa
const somar = (a, b) => a + b;
```

### Como ler uma arrow function

```js
(cartItem) => cartItem.id === 3

// Leia assim:
// "Recebo um cartItem, e retorno se cartItem.id é igual a 3"

// É equivalente a:
function verificar(cartItem) {
    return cartItem.id === 3;
}
```

### No seu código

```js
// Reducer/index.jsx
updatedItems.findIndex(
    (cartItem) => cartItem.id === action.payload
);

// Leia assim:
// "Para cada cartItem do array, retorna se cartItem.id é igual ao payload"
```

---

## 2. Callbacks — Funções que você passa para outra função

### Analogia

Imagine que você contrata um assistente para procurar um arquivo numa pilha de pastas.
Você diz para ele: **"Para cada pasta, olhe o nome e me diga se é 'Shoes'."**

Você não olha as pastas — o assistente olha cada uma e aplica a sua regra.

O `findIndex` é o assistente. O callback `(cartItem) => cartItem.id === 3` é a sua regra.

### Como o findIndex usa o callback

```js
const items = [
    { id: 1, name: 'Shirt' },
    { id: 2, name: 'Hat' },
    { id: 3, name: 'Shoes' },
];

// Você passa uma função (callback) que diz como encontrar o item
const index = items.findIndex((cartItem) => cartItem.id === 3);

// O findIndex faz isso internamente:
// Pega items[0] → chama seu callback com { id:1, name:'Shirt' } → retorna false
// Pega items[1] → chama seu callback com { id:2, name:'Hat' }   → retorna false
// Pega items[2] → chama seu callback com { id:3, name:'Shoes' } → retorna true ✓
// Encontrou no índice 2 → retorna 2

console.log(index); // 2
```

### De onde vem o `cartItem`?

Essa é a dúvida mais comum. O `cartItem` não vem de você — o próprio `findIndex` passa cada elemento do array para o seu callback automaticamente.

```js
// Você escreve isso:
items.findIndex((cartItem) => cartItem.id === 3);
//               ↑
//   Você escolhe o nome — poderia ser "item", "x", "elemento"
//   O findIndex vai colocar cada elemento do array aqui

// Funciona igual com qualquer nome:
items.findIndex((item) => item.id === 3);
items.findIndex((x) => x.id === 3);
items.findIndex((qualquerCoisa) => qualquerCoisa.id === 3);
```

---

## 3. Métodos de Array

### findIndex — encontra a posição

```js
const items = [
    { id: 1, name: 'Shirt', quantity: 2 },
    { id: 2, name: 'Hat',   quantity: 1 },
    { id: 3, name: 'Shoes', quantity: 1 },
];

// Retorna o ÍNDICE (posição) do primeiro item que satisfaz a condição
const index = items.findIndex((item) => item.id === 2);
// index = 1  (Hat está na posição 1)

const naoAchou = items.findIndex((item) => item.id === 99);
// naoAchou = -1  (convenção: -1 significa "não encontrou")
```

### find — encontra o elemento

```js
// Retorna o ELEMENTO em si, não o índice
const item = items.find((item) => item.id === 2);
// item = { id:2, name:'Hat', quantity:1 }

// No seu reducer — usado para pegar o produto do DUMMY_PRODUCTS
const product = DUMMY_PRODUCTS.find((product) => product.id === action.payload);
// product = { id:3, title:'Shoes', price:99, ... }
```

### push — adiciona ao final

```js
const arr = [1, 2, 3];
arr.push(4);
// arr = [1, 2, 3, 4]

// No seu reducer — adiciona novo produto ao carrinho
updatedItems.push({
    id: action.payload,
    name: product.title,
    price: product.price,
    quantity: 1,
});
```

### splice — remove por índice

```js
const arr = ['a', 'b', 'c', 'd'];

// splice(índice, quantos remover)
arr.splice(1, 1);
// arr = ['a', 'c', 'd']  — removeu 1 elemento na posição 1 ('b')

// No seu reducer — remove item quando quantity chega a 0
if (updatedItem.quantity <= 0) {
    updatedItems.splice(updatedItemIndex, 1); // remove 1 item na posição encontrada
}
```

### map — transforma cada elemento

```js
const numeros = [1, 2, 3];
const dobrados = numeros.map((n) => n * 2);
// dobrados = [2, 4, 6]
// o array original não é modificado

// No App.jsx — transforma cada produto em um elemento JSX
DUMMY_PRODUCTS.map((product) => (
    <li key={product.id}>
        <Product {...product} />
    </li>
))
```

---

## 4. Spread Operator (`...`)

### Analogia — Fotocopiadora vs. apontar para o papel

Imagine uma folha com a lista do carrinho.

- `const copia = lista` → você aponta para a **mesma folha**. Qualquer rabisco em `copia` aparece na `lista` original também.
- `const copia = [...lista]` → você **fotocopia** a folha. São duas folhas independentes agora.

### Copiar arrays

```js
const original = [
    { id: 1, name: 'Shirt' },
    { id: 2, name: 'Hat' },
];

// ❌ Errado — mesma referência
const errado = original;
errado.push({ id: 3, name: 'Shoes' });
// original também foi modificado! Os dois apontam para o mesmo array.

// ✅ Correto — cópia independente
const correto = [...original];
correto.push({ id: 3, name: 'Shoes' });
// original continua intocado: [ {id:1}, {id:2} ]
// correto agora tem: [ {id:1}, {id:2}, {id:3} ]

// No seu reducer:
const updatedItems = [...state.items]; // cópia independente
```

### Copiar objetos

```js
const state = {
    items: [{ id: 1, name: 'Shirt' }],
    discount: 0.1,
    coupon: 'PROMO10',
};

// Quero atualizar só o items, preservando o resto
const novoState = {
    ...state,          // copia: items, discount, coupon
    items: updatedItems, // sobrescreve só o items
};

// novoState = {
//     items: updatedItems,  ← novo
//     discount: 0.1,        ← preservado do ...state
//     coupon: 'PROMO10',    ← preservado do ...state
// }

// Sem o spread — ERRADO, perderia discount e coupon:
const errado = { items: updatedItems };
// errado = { items: updatedItems }  ← discount e coupon sumiram!
```

### Copiar item do array (spread em objeto)

```js
const item = { id: 2, name: 'Hat', quantity: 1 };

// Cria cópia do item e muda só o quantity
const itemAtualizado = {
    ...item,           // copia id, name, quantity
    quantity: item.quantity + 1, // sobrescreve quantity
};

// itemAtualizado = { id:2, name:'Hat', quantity:2 }
// item original = { id:2, name:'Hat', quantity:1 }  ← intocado

// No seu reducer:
const updatedItem = {
    ...existingCartItem,
    quantity: existingCartItem.quantity + 1,
};
```

---

## 5. Por que imutabilidade importa no React

### Como o React decide re-renderizar

O React não olha o conteúdo do array para decidir se algo mudou — ele compara a **referência** (o endereço na memória).

```js
// Analogia: dois endereços de casa
// Se o endereço mudou → React re-renderiza
// Se o endereço é o mesmo → React acha que nada mudou (mesmo que você trocou os móveis)

// ❌ Modificar o array original — React não detecta a mudança
state.items.push({ id: 3, name: 'Shoes' });
// state.items ainda aponta para o mesmo endereço
// React vê: "mesmo endereço, nada mudou" → não re-renderiza ← BUG!

// ✅ Criar array novo — React detecta a mudança
const updatedItems = [...state.items];
updatedItems.push({ id: 3, name: 'Shoes' });
return { ...state, items: updatedItems };
// updatedItems é um novo endereço
// React vê: "endereço diferente, algo mudou" → re-renderiza ✓
```

---

## 6. Lendo o shoppingCartReducer completo

Agora com tudo que aprendeu, vamos ler a função inteira:

```js
export function shoppingCartReducer(state, action) {
// state  = { items: [ {id:1, name:'Shirt', quantity:2}, {id:2, name:'Hat', quantity:1} ] }
// action = { type: 'ADD_ITEM', payload: 3 }

    if (action.type === 'ADD_ITEM') {

        // Spread operator — cria cópia independente do array
        const updatedItems = [...state.items];
        // updatedItems = [ {id:1,...}, {id:2,...} ]  (cópia, não o original)

        // findIndex com callback — procura o produto 3 no carrinho
        const existingCartItemIndex = updatedItems.findIndex(
            (cartItem) => cartItem.id === action.payload
            // findIndex passa cada elemento para o callback:
            // cartItem = {id:1,...} → 1 === 3? false
            // cartItem = {id:2,...} → 2 === 3? false
            // não achou → retorna -1
        );
        // existingCartItemIndex = -1

        const existingCartItem = updatedItems[-1];
        // existingCartItem = undefined (índice -1 não existe)

        if (existingCartItem) {
            // undefined é falsy → NÃO entra aqui
            const updatedItem = {
                ...existingCartItem,              // copia todos os campos do item
                quantity: existingCartItem.quantity + 1, // sobrescreve só quantity
            };
            updatedItems[existingCartItemIndex] = updatedItem; // substitui no array
        } else {
            // ENTRA AQUI — produto novo

            // find com callback — pega o produto no catálogo
            const product = DUMMY_PRODUCTS.find(
                (product) => product.id === action.payload // id === 3
            );
            // product = { id:3, title:'Shoes', price:99 }

            // push — adiciona novo item ao array copiado
            updatedItems.push({
                id: action.payload,  // 3
                name: product.title, // 'Shoes'
                price: product.price, // 99
                quantity: 1,          // começa com 1
            });
            // updatedItems = [ {id:1,...}, {id:2,...}, {id:3, name:'Shoes', quantity:1} ]
        }

        // Spread em objeto — retorna novo state preservando outros campos
        return {
            ...state,            // copia tudo do state (ex: discount, coupon se existissem)
            items: updatedItems, // sobrescreve só items com o array atualizado
        };
        // Retorno = { items: [ {id:1,...}, {id:2,...}, {id:3,...} ] }
        // React detecta novo endereço → re-renderiza os componentes
    }

    if (action.type === 'UPDATE_ITEM') {

        const updatedItems = [...state.items]; // cópia do array

        // findIndex — acha a posição do produto a atualizar
        const updatedItemIndex = updatedItems.findIndex(
            (item) => item.id === action.payload.productId
        );

        // Spread — cria cópia do item sem modificar o original
        const updatedItem = {
            ...updatedItems[updatedItemIndex],
        };

        // Atualiza quantity (+ para adicionar, - para remover)
        updatedItem.quantity += action.payload.amount;

        if (updatedItem.quantity <= 0) {
            // splice — remove 1 elemento na posição encontrada
            updatedItems.splice(updatedItemIndex, 1);
        } else {
            // Substitui o item antigo pelo atualizado
            updatedItems[updatedItemIndex] = updatedItem;
        }

        return {
            ...state,
            items: updatedItems, // novo array → React re-renderiza
        };
    }

    // Fallback — action desconhecida: devolve state sem alterar
    // Mesmo objeto → React não re-renderiza
    return state;
}
```

---

## Resumo — Cheat Sheet

| Conceito | O que faz | Exemplo |
|---|---|---|
| Arrow function | Função curta | `(x) => x.id === 3` |
| Callback | Função passada para outra | `findIndex((item) => ...)` |
| `findIndex` | Retorna índice, -1 se não achar | `items.findIndex((i) => i.id === 3)` |
| `find` | Retorna o elemento | `items.find((i) => i.id === 3)` |
| `push` | Adiciona ao final do array | `arr.push(novoItem)` |
| `splice` | Remove por índice | `arr.splice(index, 1)` |
| `map` | Transforma cada elemento | `items.map((i) => <li>{i.name}</li>)` |
| `[...arr]` | Cópia independente do array | `const copia = [...original]` |
| `{...obj}` | Cópia independente do objeto | `const novo = {...antigo, campo: valor}` |
| Imutabilidade | Sempre criar cópias, nunca modificar o original | Necessário para o React re-renderizar |
