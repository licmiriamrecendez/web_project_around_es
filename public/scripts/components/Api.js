export class Api {
    baseUrl;
    headers;
    constructor(options) {
        this.baseUrl = options.baseUrl;
        this.headers = options.headers;
    }
    async handleResponse(response) {
        if (!response.ok) {
            throw new Error(`API Error: ${response.status}`);
        }
        return response.json();
    }
    async getUserInfo() {
        const response = await fetch(`${this.baseUrl}/users/me`, {
            headers: this.headers,
        });
        return this.handleResponse(response);
    }
    async getInitialCards() {
        const response = await fetch(`${this.baseUrl}/cards`, {
            headers: this.headers,
        });
        return this.handleResponse(response);
    }
    //Editar perfil de usuario 
    async editUserInfo(data) {
        const response = await fetch(`${this.baseUrl}/users/me`, {
            method: "PATCH",
            headers: this.headers,
            body: JSON.stringify(data),
        });
        return this.handleResponse(response);
    }
    // Agregar una nueva tarjeta
    async addCard(data) {
        const response = await fetch(`${this.baseUrl}/cards`, {
            method: "POST",
            headers: this.headers,
            body: JSON.stringify(data),
        });
        return this.handleResponse(response);
    }
    //Eliminar una tarjeta
    async deleteCard(cardId) {
        const response = await fetch(`${this.baseUrl}/cards/${cardId}`, {
            method: "DELETE",
            headers: this.headers,
        });
        return this.handleResponse(response);
    }
    //Like
    async addLike(cardId) {
        const response = await fetch(`${this.baseUrl}/cards/${cardId}/likes`, {
            method: "PUT",
            headers: this.headers,
        });
        return this.handleResponse(response);
    }
    //Remove Like
    async removeLike(cardId) {
        const response = await fetch(`${this.baseUrl}/cards/${cardId}/likes`, {
            method: "DELETE",
            headers: this.headers,
        });
        return this.handleResponse(response);
    }
    //Actualizar foto de perfil
    async updateAvatar(data) {
        const response = await fetch(`${this.baseUrl}/users/me/avatar`, {
            method: "PATCH",
            headers: this.headers,
            body: JSON.stringify(data),
        });
        return this.handleResponse(response);
    }
}
//# sourceMappingURL=Api.js.map