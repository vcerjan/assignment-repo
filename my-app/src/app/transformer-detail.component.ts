import 'rxjs/add/operator/switchMap';

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';

import { TransformerService } from './transformer.service';
import { Transformer } from './model/Transformer';
import { Faction } from './model/Faction';
import { Vehicle } from './model/Vehicle';

@Component({
    selector: 'transformer-detail',
    templateUrl: './transformer-detail.component.html',
    styleUrls: [ './transformer-detail.component.css']
})

export class TransformerDetailComponent implements OnInit{
    
    transformer: Transformer;
    factions: Faction[];
    vehTypes: Vehicle[];
    vehicleGroups: string[];
    vehicleTypes: string[];
    vehicleModels: string[];
    gear: string[];
    selectedGear: string;
    status: string[];

    constructor(
        private transformerService: TransformerService,
        private route: ActivatedRoute,
        private location: Location
    ) {}

    ngOnInit(): void {
        this.route.paramMap
            .switchMap((params: ParamMap) => this.transformerService.getTransformer(+params.get('id')))
            .subscribe(transformer => this.transformer = transformer)

        this.transformerService
            .getFactions()
            .then((factions: Faction[]) => this.factions = factions)
        
        this.transformerService
            .getGear()
            .then((gear: string[]) => this.gear = gear)

        this.transformerService
            .getVehicleTypes()
            .then((vehTypes: Vehicle[]) => {
                this.vehTypes = vehTypes;
                /*
                    const t = vehTypes.map(vehType => vehType.group);
                    const s = new Set(t);
                    const a = Array.from(s);
                    this.vehicleGroups = a;
                */
                this.vehicleGroups = Array.from(new Set(vehTypes.map(vehType => vehType.group)));
                this.vehicleTypes = Array.from(new Set(vehTypes.map(vehType => vehType.type)));
                this.vehicleModels = Array.from(new Set(vehTypes.map(vehType => vehType.model)));
            })
        
        this.transformerService
            .getTransformerStatus()
            .then((status: string[]) => this.status = status)
    }

    selectGear(target): void {
        this.selectedGear = target.value;
        console.log(this.selectedGear);
    }
    
    addSelectedGear(): void {
        this.transformer.gear.push(this.selectedGear);
    }

    removeGear(target): void {
        this.transformer.gear.splice(+target.dataset.index, 1);
    }

    save(): void {
        this.transformerService
            .saveTransformer(this.transformer)
            .then(result => console.log(result));
    }

    goBack(): void {
        this.location.back();
    }

    stringCompare(item1: string, item2: string): boolean {
        return item1 === item2;
    }

    filterVehicleTypes(vehicleTypes: string[]): string[] {
        if(!this.vehTypes) {
            return [];
        }
        const group = this.transformer.vehicleGroup;
        const filteredVehs = this.vehTypes.filter(vehType => vehType.group === group);
        return Array.from(new Set(filteredVehs.map(vehType => vehType.type)));
    }

    filterVehicleModels(vehicleModels: string[]): string[] {
        if(!this.vehTypes) {
            return [];
        }
        const type = this.transformer.vehicleType;
        const filteredVehs = this.vehTypes.filter(vehType => vehType.type === type);
        return Array.from(new Set(filteredVehs.map(vehType => vehType.model)));
    }
}