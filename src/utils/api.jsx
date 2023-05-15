const GET_API = (id, page) => {
    return {
        getToys: `/toys?page=${page}`,
        getToyByID: `/toys/${id}`,
        getCategory: `/category?page=${page}`,
        getStore: "/store",
        getInventory: `/inventory?page=${page}`,
        getUser: "/user/current",
        getCart:"/cart",
    }
}

const POST_API = () => {
    return {
        createToy: "/toys",
        createCategory: "/category",
        createStore: "/store",
        createInventory: "/inventory",
        registerUser: "/user/register",
        login: "/user/login",
        createCart: "/cart"
    }
}

const UPDATE_API = (id) => {
    return {
        updateToy: `/toys/${id}`,
        updateCategory: `/category/${id}`,
        updateStore: `/store/${id}`,
        updateInventory: `/inventory/${id}`,
        updateUser: `/user/${id}`,
        updateCart: `cart/${id}`,
    }
}

const DELETE_API = (id) => {
    return {
        deleteToy: `/toys/${id}`,
        deleteCategory: `/category/${id}`,
        deleteStore: `/store/${id}`,
        deleteInventory: `/inventory/${id}`,
        deleteCartItem: `/cart/${id}`,
    }
}

export { GET_API, POST_API, UPDATE_API, DELETE_API }