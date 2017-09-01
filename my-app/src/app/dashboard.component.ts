import { Component, OnInit } from '@angular/core';

import { Transformer } from './model/Transformer';
import { TransformerService } from './transformer.service'
import { Faction } from "./model/Faction";
import { Vehicle } from "./model/Vehicle";

@Component({
    selector: 'my-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: [ './dashboard.component.css']
})

export class DashboardComponent implements OnInit {
    transformer: Transformer;

    factions: Faction[];
    vehTypes: Vehicle[];
    vehicleGroups: string[];
    vehicleTypes: string[];
    vehicleModels: string[];
    gear: string[];
    selectedGear: string;
    status: string[];

    constructor(private transformerService: TransformerService) {}

    ngOnInit(): void {
        this.transformer = {
            name: '',
            vehicleGroup: 'Air',
            vehicleType: '',
            vehicleModel: '',
            gear: [],
            status: 'OK'
        };

        this.transformer.vehicleGroup = 'Air';
        console.log(this.transformer);

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

    create(): void {
        this.transformerService
            .createTransformer(this.transformer)
            .then(result => console.log(result));
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