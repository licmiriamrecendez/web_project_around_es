import type { CardData, CardFormData } from "./Card.js";

export interface UserData {
  _id: string;
  name: string;
  about: string;
  avatar: string;
}

export interface UserFormData {
  name: string;
  about: string;
}

export interface AvatarFormData {
  avatar: string;
}

interface ApiOptions {
  baseUrl: string;
  headers: {
    authorization: string;
    "Content-Type": string;
  };
}

export class Api {
  private baseUrl: string;
  private headers: ApiOptions["headers"];

  constructor(options: ApiOptions) {
    this.baseUrl = options.baseUrl;
    this.headers = options.headers;
  }

  private async handleResponse<T>(
  response: Response
): Promise<T> {
  if (!response.ok) {
    throw new Error(
      `API Error: ${response.status}`
    );
  }

  return response.json();
}

  async getUserInfo(): Promise<UserData> {
    const response = await fetch(`${this.baseUrl}/users/me`, {
     headers: this.headers,
});

    return this.handleResponse<UserData>(response);
  }

 async getInitialCards(): Promise<CardData[]> {
  const response = await fetch(`${this.baseUrl}/cards`, {
    headers: this.headers,
  });

  return this.handleResponse<CardData[]>(response);
}

  //Editar perfil de usuario 
async editUserInfo(data: UserFormData): Promise<UserData> {
  const response = await fetch(`${this.baseUrl}/users/me`, {
    method: "PATCH",
    headers: this.headers,
    body: JSON.stringify(data),
  });

  return this.handleResponse<UserData>(response);
}

// Agregar una nueva tarjeta
async addCard(data: CardFormData): Promise<CardData> {
  const response = await fetch(`${this.baseUrl}/cards`, {
    method: "POST",
    headers: this.headers,
    body: JSON.stringify(data),
  });

  return this.handleResponse<CardData>(response);
}

//Eliminar una tarjeta
async deleteCard(cardId: string): Promise<CardData> {
  const response = await fetch(
    `${this.baseUrl}/cards/${cardId}`,
    {
      method: "DELETE",
      headers: this.headers,
    }
  );

  return this.handleResponse<CardData>(response);
}

//Like
async addLike(cardId: string): Promise<CardData> {
  const response = await fetch(
    `${this.baseUrl}/cards/${cardId}/likes`,
    {
      method: "PUT",
        headers: this.headers,
 });

  return this.handleResponse<CardData>(response);
}


//Remove Like
async removeLike(cardId: string): Promise<CardData> {
  const response = await fetch(
    `${this.baseUrl}/cards/${cardId}/likes`,
    {
      method: "DELETE",
         headers: this.headers,
 });

  return this.handleResponse<CardData>(response);
}

//Actualizar foto de perfil

async updateAvatar(data: AvatarFormData): Promise<UserData> {
  const response = await fetch(
    `${this.baseUrl}/users/me/avatar`,
    {
      method: "PATCH",
        headers: this.headers,
      body: JSON.stringify(data),
     });

  return this.handleResponse<UserData>(response);
}
}
