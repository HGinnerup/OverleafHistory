export class OverleafPath {
    constructor(element:HTMLElement) {
        this.element = element;
    }

    element:HTMLElement;
    public getElement():HTMLElement {
        return this.element;
    }

    parent?:OverleafPath;
    public getParent():OverleafPath {
        if(!this.parent) {
            if(this.element.parentElement.classList.contains("file-tree-list")) // Top element of entire file structure
                return null;
        
            //@ts-ignore
            this.parent = new OverleafPath(this.element.parentElement.previousSibling);
        }
            

        return this.parent;
    }

    public navigateTo():void {
        this.element.click();
    }

    public getName():string {
        return this.element.getAttribute("aria-label");
    }

    public getPathString():string {
        if(!this.getParent())
            return this.getName();
        
        return `${this.getParent().getPathString()}/${this.getName()}`;
    }

    public getIsLeaf():boolean {
        return this.element.getAttribute("aria-expanded") === null;
    }

    public static getCurrentPath():OverleafPath {
        return new OverleafPath(document.querySelector("li.selected[role=treeitem]"));
    }

    public static getPathFromString(pathStr:string):OverleafPath {

        let elm = document.querySelector("div.file-tree-inner " + pathStr.split("/").map(label => `*>[aria-label='${label}']`).join("+"));

        //@ts-ignore
        return new OverleafPath(elm);
    }

    public equals(object:any):boolean {
        if(!(object instanceof OverleafPath))
            return false;

        return this.element == object.element;
    }
}