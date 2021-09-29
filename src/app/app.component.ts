import { Component, VERSION } from "@angular/core";

@Component({
  selector: "my-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  name = "Angular " + VERSION.major;

  constructor() {
    var obj = [
      { id: 1, boy: 5, c: 9 },
      { id: 2, boy: 6, c: 10 },
      { id: 3, boy: 7, c: 11 },
      { id: 4, boy: 8, c: 12 }
    ];
    const mapped = obj.map(({ id, boy,c }) => ({ id, boy,c }));

    console.log(mapped, "mapped");
  }
}
