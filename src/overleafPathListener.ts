import { OverleafPath } from "./overleafPath";

export class OverleafPathListener {
    constructor() {

    }

    private onPathChangeFuncs:((path:OverleafPath)=>any)[] = [];
    public addOnPathChange(func:((path:OverleafPath)=>any)) {
        this.onPathChangeFuncs.push(func);
    }

    private callOnPathChangeFuncs(path:OverleafPath) {
        for(let onPathChange of this.onPathChangeFuncs)
            onPathChange(path);
    }


    private currentLocation:OverleafPath;

    private timerId:number;
    public startListening() {
        this.timerId = setInterval(() => {
            let newPosition = OverleafPath.getCurrentPath();
            if(this.currentLocation != newPosition) {
                this.currentLocation = newPosition;
                this.callOnPathChangeFuncs(newPosition);
            }
        }, 1000);
    }

    public stopListening() {
        clearInterval(this.timerId);
    }

}