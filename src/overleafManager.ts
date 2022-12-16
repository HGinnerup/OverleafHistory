import { OverleafHistoryManager } from "./overleafHistory";
import { OverleafPath } from "./overleafPath";
import { OverleafPathListener } from "./overleafPathListener";

export class OverleafManager {

    pathListener = new OverleafPathListener();

    private getPathString() {
        return window.location.hash.substring(1);
    }

    constructor() {
        if(window.location.hash == "")
            window.location.hash = OverleafPath.getCurrentPath().getPathString();

        this.pathListener.addOnPathChange(path => this.onPathChange(path));

        window.addEventListener("popstate", _ => this.onUserNavigation(), false);

        this.pathListener.startListening();
    }

    public getProjectName():string {
        //@ts-ignore
        return document.querySelector(".name").innerText;
    }

    public getNewTitle(path?:OverleafPath) {
        if(!path)
            return document.querySelector("title").innerText;

        return `${this.getProjectName()} - ${path.getName()} - Overleaf`
    }

    private onPathChange(newPath:OverleafPath):void {
        let pathStr = newPath.getPathString();

        if(pathStr !== this.getPathString()) {
            let newTitle = this.getNewTitle(newPath);
            window.history.pushState(null, newTitle, `${window.location.pathname}#${pathStr}`)
            document.title = newTitle;
        }
    }

    private onUserNavigation() {
        this.pathListener.stopListening();

        OverleafPath.getPathFromString(this.getPathString()).navigateTo();

        this.pathListener.startListening();
    }
}

