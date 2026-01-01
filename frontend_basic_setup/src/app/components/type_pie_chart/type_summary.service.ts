import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, switchMap } from 'rxjs';
import { TypeSummaryModel } from 'src/app/models/type_summary.model';

@Injectable({providedIn: 'root',})
  export class TypeSummaryService {
    private apiUrl = "https://localhost:7283/api/transactions/summary/type";
    private http = inject(HttpClient);

    private refresh$ = new BehaviorSubject<void>(undefined)

    getAllTypeSummaries(): Observable<TypeSummaryModel[]> {
      return this.refresh$.pipe(
          switchMap(() =>this.http.get<TypeSummaryModel[]>(this.apiUrl))
    );

    }

    triggerRefresh() {
      this.refresh$.next();
    }
  }
