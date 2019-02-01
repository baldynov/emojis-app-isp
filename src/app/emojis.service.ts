import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmojisService {

  constructor(private http: HttpClient) {
    this.http.get(this.emojisUrl).subscribe(res => {
      this.dataList = res;
      this.getVisibleItems();
    });
   }

   private emojisUrl = 'https://api.github.com/emojis'; 
   feathing: boolean = false;
   filter: string = 'main';
   dataList = {};
   visibleItems = new BehaviorSubject <IVisibleItems[]>([]);
   searchText: string = "";
   title: object = {
     main: 'Все',
     favorite: 'Любимые',
     deleted: 'Удаленные'
   };

   //получение отфильтрованного массива объектов
   getVisibleItems() {
    let data = this.dataList;
    const deleted: string[] = JSON.parse(localStorage.getItem('deleted')) || [];
    const favorite: string[] = JSON.parse(localStorage.getItem('favorite')) || [];

    if (this.filter !== 'main') {
      const storage: string[] = JSON.parse(localStorage.getItem(this.filter));
      let temp = {};
      Object.keys(data).forEach((key) => {
        if (storage && storage.includes(key)) temp[key] = data[key];
      });
      data = temp;
    }

    let visible = Object.keys(data).map((key) => {
      const item: IVisibleItems = {
        name: key, 
        url: data[key],
        isFavorite: favorite.includes(key)
      };
      return item;
    });
    if (deleted && this.filter !== 'deleted') visible = visible.filter(item => !deleted.includes(item.name));
    if (this.searchText !== "") {
      visible = visible.filter(item => {
        return item.name.toLowerCase().indexOf(this.searchText.toLowerCase()) !== -1
      });
    }
    this.visibleItems.next(visible);
  }

  changePage(type) {
    this.filter = type.slice(1);
    this.getVisibleItems();
  }

  changeFilter(item, type) {
    let newItems: string[] = JSON.parse(localStorage.getItem(type)) || [];
    switch (this.filter) {
      case 'main':
        if (!newItems.includes(item.name)) {
          newItems.push(item.name)
        }else {
          newItems = newItems.filter(value => value !== item.name);
        }
        break;
      case 'favorite':
        if (type === 'deleted') {
          newItems = JSON.parse(localStorage.getItem('favorite')) || [];
          newItems = newItems.filter(value => value !== item.name);
          type = 'favorite';
        } 
        break;
      case 'deleted':
        newItems = newItems.filter(value => value !== item.name);
        break; 
    }
    localStorage.setItem(type, JSON.stringify(newItems))
    this.getVisibleItems();
  }

  handlerSearch(text: string) {
    this.searchText = text;
    this.getVisibleItems();
  }
}

interface IVisibleItems {name: string, url: string, isFavorite: boolean}

