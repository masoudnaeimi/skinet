import { ShopParams } from './../shared/models/shopParams';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { IType } from './../shared/models/productType';
import { IBrand } from './../shared/models/brand';
import { IPagination } from './../shared/models/pagination';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ShopService {
  baseUrl = 'https://localhost:5001/api/';

  constructor(private http: HttpClient) {}

  getproducts(shopParams: ShopParams) {
    let params = new HttpParams();
    if (shopParams.brandId) {
      params = params.append('brandId', shopParams.brandId.toString());
    }
    if (shopParams.typeId) {
      params = params.append('typeId', shopParams.typeId.toString());
    }

    if (shopParams.sort) {
      params = params.append('sort', shopParams.sort);
    }

    if(shopParams.search){
      params = params.append('search', shopParams.search);
    }

    params = params.append('pageSize', shopParams.pageSize.toString());

    params = params.append('pageIndex', shopParams.pageIndex.toString());

    return this.http
      .get<IPagination>(this.baseUrl + 'products', {
        observe: 'response',
        params,
      })
      .pipe(
        map((response) => {
          return response.body;
        })
      );
  }

  getBrands() {
    return this.http.get<IBrand[]>(this.baseUrl + 'products/brands');
  }

  getTypes() {
    return this.http.get<IType[]>(this.baseUrl + 'products/types');
  }
}
