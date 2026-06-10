interface UserData {
  name: string;
  about: string;
}

interface UserInfoSelectors {
  nameSelector: string;
  aboutSelector: string;
}

export default class UserInfo {
  private nameElement: HTMLElement;
  private aboutElement: HTMLElement;

  constructor({ nameSelector, aboutSelector }: UserInfoSelectors) {
    this.nameElement = document.querySelector<HTMLElement>(nameSelector)!;
    this.aboutElement = document.querySelector<HTMLElement>(aboutSelector)!;
  }

  public getUserInfo(): UserData {
    return {
      name: this.nameElement.textContent || "",
      about: this.aboutElement.textContent || "",
    };
  }

  public setUserInfo({ name, about }: UserData): void {
    this.nameElement.textContent = name;
    this.aboutElement.textContent = about;
  }
}
