import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  // private dicInfo: Map<string, any> = new Map<string, any>();

  constructor() { }

  public setItem(key: string, value: any) {
    // this.dicInfo.set(key, value);
    localStorage.setItem(key, value);
  }

  public removeItem(key: string) {
    // this.dicInfo.delete(key);
    localStorage.removeItem(key);
  }

  public getItem(key: string): any {
    // return this.dicInfo.get(key);
    return localStorage.getItem(key);
  }
}
