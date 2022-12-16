import { OverleafPath } from "./overleafPath"

export class OverleafHistoryManager {
    private node:HistoryNode
    constructor(currentLocation: OverleafPath) {
        this.node = new HistoryNode(currentLocation);
    }

    public setLocation(location: OverleafPath):void {
        this.node.next = new HistoryNode(location);
        this.node.next.previous = this.node;
        this.node = this.node.next;
    }

    public getLocation():OverleafPath {
        return this.node.path;
    }

    

    public goNext():OverleafPath {
        if(this.node.next === null)
            throw "No next";
        
        this.node = this.node.next;
        return this.node.path;
    }

    public goBack():OverleafPath {
        if(this.node.previous === null)
            throw "No previous";
        
        this.node = this.node.previous;
        return this.node.path;
    }

}

class HistoryNode {
    constructor(element:OverleafPath, previous?:HistoryNode) {
        this.path = element;
        this.previous = previous;
    }

    public path: OverleafPath;
    public previous?:HistoryNode
    public next?:HistoryNode
}