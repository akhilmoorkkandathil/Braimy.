import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { ApiResponse } from '../../interfaces/apiResponse';
import { apiUrls } from '../../API';

@Injectable({
  providedIn: 'root'
})
export class TutorService {
  http = inject(HttpClient)

  constructor() { }

  getTutors() {
    return this.http.get<ApiResponse>(`${apiUrls.tutorsApi}getTutors`,{withCredentials:true});
  }

searchTutor(term: string) {
  return this.http.get<ApiResponse>(`${apiUrls.tutorsApi}searchTutor`, {
    params: { term }
  });
}

}