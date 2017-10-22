import { Injectable } from '@angular/core'
import { Http, Response } from '@angular/http'
import { Observable } from 'rxjs/Observable'
import { Configuration } from '../models/configuration'
import 'rxjs/add/operator/map'

@Injectable()
export class ConfigurationService {

  constructor(private http: Http) {
  }

  get(): Observable<Configuration> {
    return this.http
      .get('/api/configuration')
      .map(res => res.json())
      .map(Configuration.fromJSON)
  }

  save(config: Configuration): Observable<Response> {
    return this.http.put('/api/configuration', config)
  }
}
