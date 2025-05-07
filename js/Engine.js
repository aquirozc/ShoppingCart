class CartController{

    cart = document.getElementById("lista-carrito").querySelector("tbody");
    freq = new Map(Object.entries(JSON.parse(localStorage.getItem('cart') ?? "{}")));
    
    constructor(){
        document.querySelectorAll(".agregar-carrito")
                .forEach(n => n.addEventListener('click',e => this.PushItemToCart(e)));
        document.getElementById("vaciar-carrito")
                .addEventListener('click', e => this.WipeCart(e));
        this.DrawCart();
    }

    DrawCart(){
        this.cart.innerHTML = "";
        
        this.freq.forEach((value, key) => {
            let row = document.createElement("tr");
            row.innerHTML = `
                <td>
                    <img src="${value.img}" height="50px" alt="imagen">
                </td>
                <td>${value.name}</td>
                <td>${value.price}</td>
                <td>
                    <input type="number" min="1" value="${value.count}"></input>
                </td>
                <td>
                    <input type="button" value="Borrar"></input>
                </td>
            `;

            row.querySelector("input[type='number']")
                .addEventListener('change', e => this.ModifyItemCount(key,e));

            row.querySelector("input[type='button']")
                .addEventListener('click', e => this.RemoveItemFromCart(key,e));

            this.cart.appendChild(row);
        });
    }

    ModifyItemCount(id, event){
        this.freq.get(id).count = parseInt(event.target.value);
        this.SaveCart();
    }

    PushItemToCart(event){
        event.preventDefault();

        let root = event.target.parentElement.parentElement;
        let id = event.target.getAttribute('data-id');

        let item  = {
            name : root.querySelector(".info-card h4").innerText,
            img : root.querySelector(".imagen-curso").src,
            price : root.querySelector(".precio span").innerText,
        };

        this.freq.set(id, {
            ...item,
            count: parseInt((this.freq.get(id)?.count || 0) + 1)
        });

        this.SaveCart();
        this.DrawCart();
        
    }

    RemoveItemFromCart(id,event){
        this.freq.delete(id);
        event.target.parentElement.parentElement.remove();
        this.SaveCart();
    }

    SaveCart(){
        localStorage.setItem('cart',JSON.stringify(Object.fromEntries(this.freq)));
    }

    WipeCart(event){
        event.preventDefault();
        this.cart.innerHTML="";
        this.freq.clear();
        this.SaveCart();
    }

}

new CartController();