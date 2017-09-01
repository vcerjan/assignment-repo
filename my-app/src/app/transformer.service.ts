import { Component, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Transformer } from './model/Transformer';
import { Faction } from './model/Faction';
import { Vehicle } from './model/Vehicle'

@Component({
    selector: 'my-service'
})

@Injectable()

export class TransformerService {

    transformers: Transformer[];

    constructor(private http: HttpClient) {}

    getTransformers(): Promise<Transformer[]> {
        return new Promise((resolve, reject) => {
            this.http
                .get('http://localhost:3000/transformers')
                .subscribe((res: Transformer[]) => {
                    resolve(res);
                })
        })
    }

    getTransformer(id: number): Promise<Transformer> {
        return this.getTransformers()
            .then(transformers => transformers.find(transformer => transformer.id === id))
    }

    saveTransformer(transformer: Transformer): Promise<Transformer> {
        return new Promise((resolve, reject) => {
            this.http
                .put(`http://localhost:3000/transformers/${transformer.id}`, transformer)
                .subscribe((res: Transformer) => {
                    resolve(res);
                })
        })
    }

    createTransformer(transformer: Transformer): Promise<Transformer> {
        return new Promise((resolve, reject) => {
            this.http
                .post(`http://localhost:3000/transformers`, transformer)
                .subscribe((res: Transformer) => {
                    resolve(res);
                })
        })
    }


    getFactions(): Promise<Faction[]> {
        return new Promise((resolve, reject) => {
            this.http
                .get('http://localhost:3000/factions')
                .subscribe((res: Faction[]) => {
                    const extendedFactions = res.concat({ id: 2, name: '-' })
                    resolve(extendedFactions);
                })
        })
    }

    getVehicleTypes(): Promise<Vehicle[]> {
        return new Promise((resolve, reject) => {
            this.http
                .get('http://localhost:3000/vehicleTypes')
                .subscribe((res: Vehicle[]) => {
                    resolve(res);
                })
        })
    }

    getTransformerStatus(): Promise<string[]> {
        return Promise.resolve([
            'OK',
            'MIA',
            'INJURED'
        ])
    }

    getGear(): Promise<string[]> {
        return Promise.resolve([
            'sword',
            'shield',
            'lazor',
            'machine gun',
            'cannon',
            'sling shot',
            'bow',
            'some arrows',
            'Chuck Norris',
            'burning flame edge blade of redundancy'
        ])
    }
}