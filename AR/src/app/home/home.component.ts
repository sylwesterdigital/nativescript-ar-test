import { Component, OnInit } from "@angular/core";
import { registerElement } from "nativescript-angular/element-registry";
import { AR, ARNode, ARMaterial, ARPlaneTappedEventData } from "nativescript-ar";
import { Color } from "tns-core-modules/color";

registerElement("AR", () => require("nativescript-ar").AR);

@Component({
  selector: "argh",
  moduleId: module.id,
  template: `
<ActionBar title="NativeScript AR"></ActionBar>

<GridLayout class="page">
  <AR *ngIf="loaded"
    debugLevel="FEATURE_POINTS"
    detectPlanes="true"
    [planeMaterial]="planeMaterial"
    (planeTapped)="onPlaneTapped($event)">
  </AR>
</GridLayout>
`
})
export class HomeComponent implements OnInit {
  loaded = false;
  ngOnInit() {
    setTimeout(() => { this.loaded = true; }, 1000);
  }

  planeMaterial = <ARMaterial>{
    diffuse: new Color("white"),
    transparency: 0.2
  };

  onPlaneTapped(args: ARPlaneTappedEventData): void {
    console.log('onPlaneTaooed')
    const ar: AR = args.object;
    ar.addModel({
      name: "Models.scnassets/Car.dae",
      position: {
        x: args.position.x,
        y: args.position.y,
        z: args.position.z
      },
      scale: 1,
      mass: 20
    });
  }
}
