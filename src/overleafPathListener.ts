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
    private clickNavigationListener:EventListener;
    public startListening() {
        this.clickNavigationListener = () => this.clickListener();
        document.querySelector("div.file-tree-inner").addEventListener("click", this.clickNavigationListener)
    }

    public stopListening() {
        document.querySelector("div.file-tree-inner").removeEventListener("click", this.clickNavigationListener)
    }

    private clickListener() {
        console.log("Click clocked");
        let newPosition = OverleafPath.getCurrentPath();
        if(this.currentLocation != newPosition) {
            this.currentLocation = newPosition;
            this.callOnPathChangeFuncs(newPosition);
        }
    }
}